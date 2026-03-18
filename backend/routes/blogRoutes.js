const express = require('express');
const router = express.Router();
const { getBlogs, getAdminBlogs, getBlogBySlug, createBlog, updateBlog, deleteBlog } = require('../controllers/blogController');

// Public routes
router.get('/', getBlogs); // /api/blogs
router.get('/:slug', getBlogBySlug);

// Admin routes
router.get('/admin/all', getAdminBlogs);
router.post('/', createBlog);
router.put('/:id', updateBlog);
router.delete('/:id', deleteBlog);

module.exports = router;
