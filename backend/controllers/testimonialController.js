const Testimonial = require('../models/Testimonial');

// @desc    Get all active testimonials
// @route   GET /api/testimonials
// @access  Public
exports.getTestimonials = async (req, res) => {
    try {
        const testimonials = await Testimonial.find({ isActive: true }).sort('-createdAt');
        res.json(testimonials);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Get all testimonials (including inactive)
// @route   GET /api/testimonials/admin/all
// @access  Admin
exports.getAdminTestimonials = async (req, res) => {
    try {
        const testimonials = await Testimonial.find().sort('-createdAt');
        res.json(testimonials);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Create Testimonial
// @route   POST /api/testimonials
// @access  Admin
exports.createTestimonial = async (req, res) => {
    try {
        const { name, role, quote, rating, isActive } = req.body;
        const newTestimonial = new Testimonial({
            name,
            role,
            quote,
            rating,
            isActive: isActive !== undefined ? isActive : true
        });
        const savedTestimonial = await newTestimonial.save();
        res.status(201).json(savedTestimonial);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Update Testimonial
// @route   PUT /api/testimonials/:id
// @access  Admin
exports.updateTestimonial = async (req, res) => {
    try {
        const { name, role, quote, rating, isActive } = req.body;
        const testimonial = await Testimonial.findByIdAndUpdate(
            req.params.id,
            { name, role, quote, rating, isActive },
            { new: true, runValidators: true }
        );
        if (!testimonial) {
            return res.status(404).json({ message: 'Testimonial not found' });
        }
        res.json(testimonial);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Delete Testimonial
// @route   DELETE /api/testimonials/:id
// @access  Admin
exports.deleteTestimonial = async (req, res) => {
    try {
        const testimonial = await Testimonial.findByIdAndDelete(req.params.id);
        if (!testimonial) {
            return res.status(404).json({ message: 'Testimonial not found' });
        }
        res.json({ message: 'Testimonial deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
