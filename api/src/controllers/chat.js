import { saveMessage, getAllMessages } from "../model/Chat.js";

// Save a messgae
const createMessage = async (id, username, message, avatar_url) => {
    try {
        await saveMessage(id, username, message, avatar_url);
        return { success: true };
    } catch (error) {
        // return error
        return { success: false, message: 'Cannot save chat' };
    }
}

// Get all messages
const getMessages = async () => {
    try {
        const response = await getAllMessages();
        return { success: true, data: response };
    } catch (error) {
        // return error
        return { success: false, message: 'Cannot get messages' };
    }
}

export { createMessage, getMessages };
