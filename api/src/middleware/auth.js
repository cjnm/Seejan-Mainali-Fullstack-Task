import jwt from 'jsonwebtoken';

const { JWT_SECRET } = process.env;

// Checks if the jwt token is valid
const auth = (req, res, next) => {
    const id = req.headers['x-user-id'];
    const username = req.headers['x-user-username'];
    const avatar_url = req.headers['x-user-avatar'];
    const jwt_token = req.headers['authorization'];

    if (!jwt_token || !id || !username) {
        return res.status(401).json({
            success: false,
            status: 401,
            message: "Unauthorized"
        });
    }

    // Remove `Bearer` from token
    const token = jwt_token.split(' ')[1];

    try {
        const decoded = jwt.verify(token, `${JWT_SECRET}-${id}`);

        if (isTokenExpired(decoded.exp)) {
            return res.status(401).json({
                success: false,
                status: 401,
                message: "Token expired"
            });
        }

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
    return next();
};

// Checks if the token is expired
const isTokenExpired = (expiry) => {
    if (!expiry) {
        return true;
    }

    return (Math.floor((new Date).getTime() / 1000)) >= expiry;
}

export { auth };
