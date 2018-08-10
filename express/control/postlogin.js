const conn = require('../model/connect _resume')
const queryString = require('querystring')

const handler = (req,res) => {
    const userInfo = queryString.parse(req.body.userInfo)
    const query = 'select * from users where user_name=? and user_pwd=?'
    conn.query(query,[userInfo.userName,userInfo.userPwd],(err,result) => {  
        if(err) return res.send({status: 500,msg: 'query Err!'})
        if(result.length == 0) return res.send({status: 501,msg: 'login Failed'})
        if(userInfo.saveInfo == 1) {      
            req.session.userInfo = result[0].id
        }
        res.send({status: 200, msg: '登录成功!'})
    })
}

module.exports = handler