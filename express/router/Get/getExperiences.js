const express = require('express')
const router = express.Router()
const handler = require('../../control/Experiences/experiences')
 
router.get('/getExperiences', handler);  

module.exports = router