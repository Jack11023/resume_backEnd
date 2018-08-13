const express = require('express')
const router = express.Router()
const handler = require('../../../control/Experiences/postExperiences')
 
router.post('/postExperiences', handler);  

module.exports = router