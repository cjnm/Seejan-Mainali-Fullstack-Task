import jwt from 'jsonwebtoken';

// Function to check if the token is expired
const isTokenExpired = (expiry) => {
    if (!expiry) {
        return true; // If there is no expiry time, consider the token expired
    }

    // Compare the current time (in seconds) with the expiry time
    return (Math.floor((new Date).getTime() / 1000)) >= expiry;
}


//Fnction to decode token
const decodeToken = (token) => {
    // Load the JWT secret from environment variables
    const { JWT_SECRET } = process.env;

    return jwt.verify(token, JWT_SECRET);
}

export { isTokenExpired, decodeToken };
