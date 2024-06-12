import axios from 'axios';
import { buildAuthHeaders } from '../auth.js';

const createNewBlog = async (title, content) => {
    const headers = buildAuthHeaders();
    try {
        const response = await axios.post(
            `${process.env.REACT_APP_API_URL}/blog/new`,
            { title, content },
            headers
        )

        return response.data;
    } catch (error) {
        console.log(error);
    }

}

const updateBlog = async (title, content, blog_id) => {
    const headers = buildAuthHeaders();
    try {
        const response = await axios.put(
            `${process.env.REACT_APP_API_URL}/blog/${blog_id}`,
            { title, content },
            headers
        )

        return response.data;
    } catch (error) {
        console.log(error);
    }

}

const deleteBlogById = async (id) => {
    const headers = buildAuthHeaders();
    try {
        const response = await axios.delete(
            `${process.env.REACT_APP_API_URL}/blog/${id}`,
            headers
        )

        return response.data;
    } catch (error) {
        console.log(error);
    }

}

const getAllBlogs = async () => {
    try {
        const response = await axios.get(
            `${process.env.REACT_APP_API_URL}/blog`,
        )

        return response.data;
    } catch (error) {
        console.log(error);
        return [];
    }

}

const getAllBlogsByUser = async (user_id) => {
    try {
        const headers = buildAuthHeaders();
        const response = await axios.get(
            `${process.env.REACT_APP_API_URL}/blog/user/${user_id}`,
            headers
        )

        return response.data;
    } catch (error) {
        console.log(error);
        return [];
    }

}

export { createNewBlog, getAllBlogs, getAllBlogsByUser, deleteBlogById, updateBlog };
