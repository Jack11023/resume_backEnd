const conn = require('../../model/connect _resume')

const handler = (req,res) => {
    const userName = req.body.userName
    const userPwd = req.body.userPwd
    const saveInfo = req.body.saveInfo
    const query = 'select * from users where user_name=? and user_pwd=?'
    conn.query(query,[userName,userPwd],(err,result) => {  
        if(err) return res.send({status: 500,msg: 'query Err!'})
        if(result.length == 0) return res.send({status: 501,msg: 'login Failed'})
        if(saveInfo == 1) {      
            req.session.userInfo = result[0].id
        }
        req.session.isLogin = true
        res.send({status: 200, msg: '登录成功!',userName: result[0].user_name})
    })
}

module.exports = handler