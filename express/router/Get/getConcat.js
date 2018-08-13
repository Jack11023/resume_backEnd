const express = require('express')
const router = express.Router()
const handler = require('../../control/Concat/concat')
 
router.get('/getConcat', handler);  

module.exports = router