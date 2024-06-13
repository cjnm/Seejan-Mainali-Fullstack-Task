import axios from 'axios';
import { buildAuthHeaders } from '../auth.js';

const getAllChats = async () => {
    const headers = buildAuthHeaders();
    try {
        const response = await axios.get(
            `${process.env.REACT_APP_API_URL}/chat`,
            headers
        )

        return response.data;
    } catch (error) {
        console.log(error);
        return [];
    }

}

export { getAllChats };
