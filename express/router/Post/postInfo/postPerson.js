const express = require('express')
const router = express.Router()
const handler = require('../../../control/UserInfo/postPerson')
 
router.post('/postHome', handler);  

module.exports = router