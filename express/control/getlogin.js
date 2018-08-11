const conn = require('../model/connect _resume')
const config = require('../config')

const handler = (req,res) => {
    if(!req.session||!req.session.userInfo) return res.send({data: null})
    const id = req.session.userInfo
    const query = 'select * from users where id=?'
    conn.query(query,id,(err,result) => {
        if(err) return res.send({status: 500,msg: 'query Err!'})
        if(result.length == 0) 
            return res.send({status: 501,msg: 'fetch Err!'})
        res.send({status: 200, msg: 'fetch success!',data: {
            userName: result[0].user_name,
            userPwd: result[0].user_pwd,
            userAvatar: result[0].avatar || [config.root,'static','images','avatar1.jpg'].join('/')
        }})
    })
}

module.exports = handler