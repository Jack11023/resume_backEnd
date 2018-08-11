const express = require('express')
const router = express.Router()
const posthandler = require('../control/register')
var multipart = require('connect-multiparty');  
  
var multipartMiddleware = multipart();  
router.post('/register',  posthandler);  

module.exports = router