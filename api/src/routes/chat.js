import express from 'express';
import { auth } from '../middleware/auth.js';
import { getMessages } from '../controllers/chat.js';

const chatRouter = express.Router();

// Get all messages
chatRouter.get('/', auth, async (req, res) => {
    try {
        let response = await getMessages();

        if (response.success) {
            res.status(200).json({ ...response, status: 200 });
        } else {
            res.status(401).json({ ...response, status: 401 });
        }
    } catch (error) {
        res.status(500).json({ success: false, status: 500, message: `Internal server error: ${error.message}` });
    }

})

export default chatRouter;
