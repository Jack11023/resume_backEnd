const express = require('express')
const router = express.Router()
const handler = require('../../../control/Education/postEducation')
 
router.post('/postEducation', handler);  

module.exports = router