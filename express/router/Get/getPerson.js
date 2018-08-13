const express = require('express')
const router = express.Router()
const handler = require('../../control/UserInfo/perintro')
 
router.get('/getPerson', handler);  

module.exports = router