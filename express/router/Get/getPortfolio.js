const express = require('express')
const router = express.Router()
const handler = require('../../control/Portfolio/portfolio')
 
router.get('/getPortfolio', handler);  

module.exports = router