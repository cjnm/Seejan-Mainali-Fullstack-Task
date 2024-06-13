import jwt from 'jsonwebtoken';
import { getUserInfo } from '../model/Users.js';

// Load the JWT secret from environment variables
const { JWT_SECRET } = process.env;

// Middleware function for JWT authentication
const auth = async (req, res, next) => {
    const jwt_token = req.headers['authorization'];

    // Check if required headers are present
    if (!jwt_token) {
        return res.status(401).json({
            success: false,
            status: 401,
            message: "Unauthorized"
        });
    }

    // Remove 'Bearer' prefix from token
    const token = jwt_token.split(' ')[1];

    try {
        // Verify the token using the secret and user-specific key
        const decoded = jwt.verify(token, JWT_SECRET);

        // Check if the token has expired
        if (isTokenExpired(decoded.exp)) {
            return res.status(401).json({
                success: false,
                status: 401,
                message: "Token expired"
            });
        }

        // get user from database and compare it with decoded user details
        const user = await getUserInfo(decoded.username);

        if(!Array.isArray(user) || !user.length || decoded.username !== user[0].username) {
            return res.status(401).json({
                success: false,
                status: 401,
                message: "Auth failed. User not found"
            });
        }

        // Attach decoded information to the request object
        req.username = user[0].username;
        req.id = user[0].id;
        req.avatar_url = user[0].avatar_url;
    } catch (err) {
        return res.status(401).json({
            success: false,
            status: 401,
            message: "Authorization Error" + err.message
        });
    }

    // Proceed to the next middleware function or route handler
    return next();
};

// Function to check if the token is expired
const isTokenExpired = (expiry) => {
    if (!expiry) {
        return true; // If there is no expiry time, consider the token expired
    }

    // Compare the current time (in seconds) with the expiry time
    return (Math.floor((new Date).getTime() / 1000)) >= expiry;
}

export { auth };
