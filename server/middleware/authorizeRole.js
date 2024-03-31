// roleAuthorizationMiddleware.js
const verifyToken  = require('../helper/verifyToken')


const authorizeRole = (allowedRoles) => async (req, res, next) => {
    try {
        const token = getTokenFromHeader(req.headers.authorization);
        const decodedToken = verifyToken(token);
        validateRoles(decodedToken, allowedRoles);
        req.user = decodedToken; 
        next();
    } catch (error) {
        console.error(error.message);
        res.status(403).json({ error: 'Unauthorized' });
    }
};

const getTokenFromHeader = (authorizationHeader) => {
    if (!authorizationHeader || !authorizationHeader.startsWith('Bearer ')) {
        throw new Error('Authorization header missing or invalid');
    }
    return authorizationHeader.replace('Bearer ', '');
};



const validateRoles = (decodedToken, allowedRoles) => {
    if (!decodedToken.role || !allowedRoles.includes(decodedToken.role)) {
        throw new Error('Unauthorized! Invalid role');
    }
};

module.exports = authorizeRole;
