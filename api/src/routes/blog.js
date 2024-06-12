import express from 'express';
const blogRouter = express.Router();

import {
    createBlog,
    getAllBlogs,
    deleteBlogById,
    updateBlog
} from '../controllers/blog.js';


// Create a blog
blogRouter.post('/new', async (req, res) => {
    try {
        const { title, content } = req.body;

        if (!title || !content) {
            return res.status(401).json({ success: false, status: 401, message: 'Cannot save empty contents.' });
        }

        const response = await createBlog(title, content);

        if (response.success) {
            res.status(200).json({ ...response, status: 200 });
        } else {
            res.status(401).json({ ...response, status: 401 });
        }
    } catch (error) {
        res.status(500).json({ success: false, status: 500, message: 'Error creating blog.' });
    }
})


// Delete a blog by id
blogRouter.delete('/:blog_id', async (req, res) => {
    try {
        const { blog_id } = req.params;

        let response = await deleteBlogById(blog_id);

        if (response.success) {
            return res.status(200).json({ ...response, status: 200 });
        } else {
            return res.status(401).json({ ...response, status: 401 });
        }
    } catch (error) {
        res.status(500).json({ success: false, status: 500, message: 'Error deleting blog.' });
    }
})

// Update a blog by id
blogRouter.put('/:blog_id', async (req, res) => {
    try {
        const { blog_id } = req.params;
        const { title, content } = req.body;

        if (!title || !content) {
            return res.status(401).json({ success: false, status: 401, message: 'Cannot update blog with empty contents.' });
        }

        let response = await updateBlog(title, content, blog_id);

        if (response.success) {
            return res.status(200).json({ ...response, status: 200 });
        } else {
            return res.status(401).json({ ...response, status: 401 });
        }
    } catch (error) {
        res.status(500).json({ success: false, status: 500, message: 'Error updating blog.' });
    }
})

// Get all blogs
blogRouter.get('/', async (req, res) => {
    try {
        let response = await getAllBlogs();

        if (response.success) {
            res.status(200).json({ ...response, status: 200 });
        } else {
            res.status(401).json({ ...response, status: 401 });
        }
    } catch (error) {
        res.status(500).json({ success: false, status: 500, message: 'Error fetching blog' });
    }

})

export default blogRouter;