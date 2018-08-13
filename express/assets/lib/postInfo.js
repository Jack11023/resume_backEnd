const conn = require(`../../model/connect _resume`)
var formidable = require('formidable')

//该函数返回指定回调callback的promise对象
const getPro = function (callback) {
    return new Promise(callback)
}
const handler = (sheet) => {
    if (Object.prototype.toString.call(sheet) !== '[object String]')
        return -1
    return (req, res) => {
        var form = new formidable.IncomingForm(); //创建上传表单
        form.encoding = 'utf-8'; //设置编辑
        form.parse(req, function (err, fields) {
            const userName = fields.userName
            const userPwd = fields.userPwd
            const html = fields.html
            var id
            //创建promise实例解决回调地狱问题,难点: 
            //1.抽离promise对象的构造函数出来,已达到实时创建promise,防止数据库查询错位
            //2.一个promise对象创建完毕后才执行下一个promise对象创建 ps:可以借此改变全局变量值已达到传值
            const q1 = 'select * from users where user_name=?and user_pwd=?'
            const prom1 = function (resolve, reject) {
                conn.query(q1, [userName, userPwd], (err, result) => {
                    if (err) return reject({
                        status: 500,
                        msg: '数据库查询失败!'
                    })
                    if (result.length == 0)
                        return reject({
                            status: 501,
                            msg: '用户名或密码错误!'
                        })
                    id = result[0].id
                    resolve()
                })
            }
            const q2 = `select * from ${sheet} where user_id=?`
            const prom2 = function (resolve, reject) {
                conn.query(q2, id, (err, result) => {
                    if (err) return reject({
                        status: 300,
                        msg: '数据库查询失败!'
                    })
                    if (result.length == 0)
                        return resolve('insert')
                    resolve('update')
                })
            }
            const q3 = `insert into ${sheet} set user_name=?,html=?,user_id=?`
            const prom3 = function (resolve, reject) {
                conn.query(q3, [userName, html, id], (err, result) => {
                    if (err) return reject({
                        status: 301,
                        msg: '数据库查询失败!'
                    })
                    if (result.affectedRows == 0)
                        return reject({
                            status: 502,
                            msg: '保存失败!'
                        })
                    resolve({
                        status: 200,
                        msg: '保存成功!'
                    })
                })
            }
            const q4 = `update ${sheet} set html=? where user_id=?`
            const prom4 = function (resolve, reject) {
                conn.query(q4, [html, id], (err, result) => {
                    if (err) return reject({
                        status: 302,
                        msg: '数据库查询失败!'
                    })
                    if (result.affectedRows == 0)
                        return reject({
                            status: 503,
                            msg: '修改失败!'
                        })
                    resolve({
                        status: 200,
                        msg: '修改成功!'
                    })
                })
            }
            // 实现数据库操作逻辑:
            // 1.查询users表是否用户名密码正确
            // 2.查询home表判断下步执行insert还是update操作
            // 3.根据上一步查询结果执行insert/update home表操作
            getPro(prom1)
                .then(() => {
                    return getPro(prom2)
                }, err => res.send(err))
                .then(msg => {
                    if (msg == 'insert')
                        return getPro(prom3)
                    else return getPro(prom4)
                }, err => res.send(err))
                .then(result => {
                    res.send(result)
                }, err => res.send(err))
        })
    }
}


module.exports = handler