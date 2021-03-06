const express=require('express')
const fs = require('fs')
const path = require('path')
const bodyParser = require('body-parser')
const session = require('express-session')
const cors = require('cors');
const walk = require('./assets/lib/walkDir')

//配置静态资源托管
var app=express();
app.use('/static',express.static(path.join(__dirname,'./static')))

//配置跨域
var corsOptions = {
  origin: 'http://localhost:8080',
  credentials: true,
  maxAge: '1728000'
  //这一项是为了跨域专门设置的
}
app.use(cors(corsOptions))

//配置session
app.use(session({
    secret: 'film',
    resave: false,
    saveUninitialized: true,
    cookie: {
        maxAge: 1000 * 60 * 30, // harlf of hour
    },
}))

//配置bodyt-parser
app.use(bodyParser.urlencoded({extended : false}))

//利用第三方库配置路由
walk(path.join(__dirname,'router')).forEach((fname) => {
    const router = require(fname)
    app.use(router)
})


app.listen(9090,function() {
    console.log('http://localhost:9090');
})