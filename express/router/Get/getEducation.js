const express = require('express')
const router = express.Router()
const handler = require('../../control/Education/education')
 
router.get('/getEducation', handler);  

module.exports = router