const handler = (req,res) => {
    if(req.session.isLogin) 
        res.send({status: 200,msg: '已登录'})
    res.send({status: 500,msg: '未登录!'})
}

module.exports = handler