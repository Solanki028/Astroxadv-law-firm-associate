const mongoose = require('mongoose');

const BlogSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    slug: {
        type: String,
        required: true,
        unique: true
    },
    content: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: false
    },
    isPublished: {
        type: Boolean,
        default: false
    }
}, { timestamps: true });

module.exports = mongoose.model('Blog', BlogSchema);
