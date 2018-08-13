const conn = require(`../../model/connect _resume`)

const handler = (sheet) => {
    if(Object.prototype.toString.call(sheet) !== '[object String]' )
        return -1
    return (req, res) => {
        const userName = req.query.userName
        const q = `select html from ${sheet} where user_name=?`
        conn.query(q, userName, (err, result) => {
            if (err) return res.send({
                status: 300,
                msg: '数据库查询失败!'
            })
            if (result.length == 0)
                return res.send({
                    status: 301,
                    msg: '未查询到实际内容'
                })
            res.send({
                status: 200,
                msg: 'ok!',
                data: result[0].html
            })
        })
    }
}
module.exports = handler