const express = require('express')
const router = express.Router()
const handler = require('../../control/Testimonials/testimonials')
 
router.get('/getTestimonials', handler);  

module.exports = router