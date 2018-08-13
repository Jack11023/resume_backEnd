const express = require('express')
const router = express.Router()
const handler = require('../../control/skills/skills')
 
router.get('/getSkills', handler);  

module.exports = router