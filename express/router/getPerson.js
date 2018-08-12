const express = require('express')
const router = express.Router()
const handler = require('../control/UserInfo/perIntro')
 
router.get(/\/getPerson\/.*/, handler);  

module.exports = router