const express=require('express')
const fs = require('fs')
const path = require('path')
const bodyParser = require('body-parser')
const session = require('express-session')

var app=express();
app.use(function(req,res,next){
    // res.setHeader('Access-Control-Allow-Origin','*')
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
    res.header("X-Powered-By",' 3.2.1')
    res.header("Content-Type", "application/json;charset=utf-8");
    next();
})
//配置session
app.use(session({
    secret : 'key1212678876',
    cookie:{maxAge:1000602},
    resave : false,
    saveUninitialized : true
}))


//配置bodyt-parser
app.use(bodyParser.urlencoded({extended : false}))

fs.readdir(path.join(__dirname,'router'),(err,fnames) => {
    if(err) throw err
    fnames.forEach((fname) => {
        const router = require(path.join(__dirname,'router',fname))
        app.use(router)
    })
})

app.listen(9090,function() {
    console.log('http://localhost:9090');
})