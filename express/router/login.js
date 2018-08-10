const express = require('express')
const router = express.Router()
const posthandler = require('../control/postlogin')
const gethandler = require('../control/getlogin')

router.post('/postlogin',posthandler)

router.get('/getlogin',gethandler)

module.exports = router