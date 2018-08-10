const express=require('express')
const fs = require('fs')
const path = require('path')
const bodyParser = require('body-parser')
const session = require('express-session')
const cors = require('cors');

var app=express();

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