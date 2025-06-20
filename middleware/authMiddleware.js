// middleware/authMiddleware.js

const jwt = require('jsonwebtoken');
const User = require('../models/User.js');

const protect = async (req, res, next) => {
    let token;

    // Check if the request has an Authorization header and if it starts with 'Bearer'
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            // Get token from header (it's in the format 'Bearer TOKEN')
            token = req.headers.authorization.split(' ')[1];

            // Verify the token using your secret key
            const decoded = jwt.verify(token, process.env.JWT_SECRET);

            // Find the user by the ID that's encoded in the token
            // Attach the user to the request object, excluding the password
            req.user = await User.findById(decoded.id).select('-password');
            
            // Proceed to the next function (the actual controller)
            next();
        } catch (error) {
            console.error(error);
            res.status(401).json({ message: 'Not authorized, token failed' });
        }
    }

    if (!token) {
        res.status(401).json({ message: 'Not authorized, no token' });
    }
};

module.exports = { protect };