const conn = require(`../../model/connect _resume`)
var formidable = require('formidable')
const path = require('path')

const handler = (req, res) => {
    var form = new formidable.IncomingForm(); //创建上传表单
    form.encoding = 'utf-8'; //设置编辑
    form.parse(req, function (err, fields) {
        const userName = fields.userName
        const userPwd = fields.userPwd
        const html = fields.html
        const q1 = 'select * from users where user_name=?and user_pwd=?'
        conn.query(q1,[userName,userPwd],(err,result) => {
            if(err) return res.send({status: 500, msg: '数据库查询失败!'})
            if(result.length == 0) 
                return res.send({status: 501, msg: '保存失败!'})
        })
        res.send('ok!')
    })
}


module.exports = handler