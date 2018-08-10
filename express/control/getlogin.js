const conn = require('../model/connect _resume')

const handler = (req,res) => {
    console.log(req.session)
    if(!req.session.userInfo) return res.send({data: null})
    const id = req.session.userInfo
    const query = 'select * from users where id=?'
    conn.query(query,id,(err,result) => {
        if(err) return res.send({status: 500,msg: 'query Err!'})
        if(result.length == 0) 
            return res.send({status: 501,msg: 'fetch Err!'})
        res.send({status: 200, msg: 'fetch success!',data: {
            userName: result.user_name,
            userPwd: result.pwd,
            userAvatar: result.avatar
        }})
    })
}

module.exports = handler