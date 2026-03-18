const Blog = require('../models/Blog');

// Get all blogs (Public - only published)
exports.getBlogs = async (req, res) => {
    try {
        const blogs = await Blog.find({ isPublished: true }).sort('-createdAt');
        res.json(blogs);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};

// Get all blogs (Admin - all)
exports.getAdminBlogs = async (req, res) => {
    try {
        const blogs = await Blog.find().sort('-createdAt');
        res.json(blogs);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};

// Get single blog by slug
exports.getBlogBySlug = async (req, res) => {
    try {
        const blog = await Blog.findOne({ slug: req.params.slug });
        if (!blog) {
            return res.status(404).json({ msg: 'Blog not found' });
        }
        res.json(blog);
    } catch (err) {
        console.error(err.message);
        if (err.kind === 'ObjectId') {
            return res.status(404).json({ msg: 'Blog not found' });
        }
        res.status(500).send('Server Error');
    }
};

// Create a blog
exports.createBlog = async (req, res) => {
    try {
        const { title, content, image, isPublished } = req.body;
        
        // Generate slug from title
        let slug = title.toLowerCase().replace(/[^a-zA-Z0-9]/g, '-');
        
        // Ensure slug is unique
        let existing = await Blog.findOne({ slug });
        if (existing) {
            slug = `${slug}-${Date.now()}`;
        }

        const newBlog = new Blog({
            title,
            slug,
            content,
            image,
            isPublished: isPublished || false
        });

        const blog = await newBlog.save();
        res.json(blog);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};

// Update a blog
exports.updateBlog = async (req, res) => {
    try {
        const { title, content, image, isPublished, slug } = req.body;

        const updatedFields = { title, content, image, isPublished };
        
        // If title changed and no specific slug provided, we can optionally regenerate.
        // For simplicity, we just use the provided title/content.
        if (slug) {
            updatedFields.slug = slug;
        }

        const blog = await Blog.findByIdAndUpdate(
            req.params.id,
            { $set: updatedFields },
            { new: true }
        );

        if (!blog) {
            return res.status(404).json({ msg: 'Blog not found' });
        }

        res.json(blog);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};

// Delete a blog
exports.deleteBlog = async (req, res) => {
    try {
        const blog = await Blog.findById(req.params.id);

        if (!blog) {
            return res.status(404).json({ msg: 'Blog not found' });
        }

        await blog.deleteOne();
        res.json({ msg: 'Blog removed' });
    } catch (err) {
        console.error(err.message);
        if (err.kind === 'ObjectId') {
            return res.status(404).json({ msg: 'Blog not found' });
        }
        res.status(500).send('Server Error');
    }
};
