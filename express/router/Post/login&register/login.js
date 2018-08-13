const express = require('express')
const router = express.Router()
const posthandler = require('../../../control/login&register/postlogin')
const gethandler = require('../../../control/login&register/getlogin')
const isLogin = require('../../../control/login&register/isLogin')

router.post('/postlogin',posthandler)

router.get('/getlogin',gethandler)

router.get('/isLogin',isLogin)

module.exports = router