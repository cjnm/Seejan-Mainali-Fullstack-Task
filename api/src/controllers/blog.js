import { saveBlog, getAllItems, getAllItemsByUser, deleteItemById, updateItem } from "../model/Blog.js";

// Save a blog
const createBlog = async (id, username, title, content, avatar_url) => {
    try {
        await saveBlog(id, username, title, content, avatar_url);
        return { success: true };
    } catch (error) {
        // return error
        return { success: false, message: 'Cannot save blog' };
    }
}

// Get all blogs
const getAllBlogs = async () => {
    try {
        const response = await getAllItems();
        return { success: true, data: response };
    } catch (error) {
        // return error
        return { success: false, message: 'Cannot get blogs' };
    }
}

// Get all blogs by user
const getAllBlogsByUser = async (user_id) => {
    try {
        const response = await getAllItemsByUser(user_id);
        return { success: true, data: response };
    } catch (error) {
        // return error
        return { success: false, message: 'Cannot get blogs' };
    }
}

// Delete a blog by id
const deleteBlogById = async (blog_id, user_id) => {
    try {
        const response = await deleteItemById(blog_id, user_id);
        return { success: true, data: response };
    } catch (error) {
        // return error
        return { success: false, message: 'Cannot delete blog' };
    }
}

// Update a blog by id
const updateBlog = async (title, content, blog_id, user_id) => {
    try {
        const response = await updateItem(title, content, blog_id, user_id);
        return { success: true, data: response };
    } catch (error) {
        // return error
        return { success: false, message: 'Cannot delete blog' };
    }
}

export { createBlog, getAllBlogs, getAllBlogsByUser, deleteBlogById, updateBlog };
