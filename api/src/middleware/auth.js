import jwt from 'jsonwebtoken';

// Load the JWT secret from environment variables
const { JWT_SECRET } = process.env;

// Middleware function for JWT authentication
const auth = (req, res, next) => {
    // Extract user information and JWT token from headers
    const id = req.headers['x-user-id'];
    const username = req.headers['x-user-username'];
    const avatar_url = req.headers['x-user-avatar'];
    const jwt_token = req.headers['authorization'];

    // Check if required headers are present
    if (!jwt_token || !id || !username) {
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
        const decoded = jwt.verify(token, `${JWT_SECRET}-${id}`);

        // Check if the token has expired
        if (isTokenExpired(decoded.exp)) {
            return res.status(401).json({
                success: false,
                status: 401,
                message: "Token expired"
            });
        }

        // Attach decoded information to the request object
        req.username = decoded.username;
        req.id = decoded.id;
        req.avatar_url = avatar_url;
    } catch (err) {
        return res.status(401).json({
            success: false,
            status: 401,
            message: "Authorization Error"
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
