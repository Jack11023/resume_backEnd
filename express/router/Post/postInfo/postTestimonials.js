const express = require('express')
const router = express.Router()
const handler = require('../../../control/Testimonials/postTestimonials')
 
router.post('/postTestimonials', handler);  

module.exports = router