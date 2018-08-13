const express = require('express')
const router = express.Router()
const handler = require('../../../control/Concat/postConcat')
 
router.post('/postConcat', handler);  

module.exports = router