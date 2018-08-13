const express = require('express')
const router = express.Router()
const handler = require('../../../control/skills/postSkills')
 
router.post('/postSkills', handler);  

module.exports = router