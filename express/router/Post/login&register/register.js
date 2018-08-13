const express = require('express')
const router = express.Router()
const posthandler = require('../../../control/login&register/register')
 
router.post('/register',  posthandler);  

module.exports = router