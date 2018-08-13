const express = require('express')
const router = express.Router()
const handler = require('../../../control/Portfolio/postPortfolio')
 
router.post('/postPortfolio', handler);  

module.exports = router