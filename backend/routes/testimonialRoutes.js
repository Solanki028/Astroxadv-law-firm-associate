const express = require('express');
const router = express.Router();
const { 
    getTestimonials, 
    getAdminTestimonials, 
    createTestimonial, 
    updateTestimonial, 
    deleteTestimonial 
} = require('../controllers/testimonialController');

// Public route to get active testimonials
router.get('/', getTestimonials);

// Admin routes for complete CRUD
router.get('/admin/all', getAdminTestimonials);
router.post('/', createTestimonial);
router.put('/:id', updateTestimonial);
router.delete('/:id', deleteTestimonial);

module.exports = router;
