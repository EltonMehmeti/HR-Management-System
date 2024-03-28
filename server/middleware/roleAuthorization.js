// roleAuthorizationMiddleware.js

const authorizeRole = (allowedRoles) => async (req, res, next) => {
    try {
        if (!req.hrPersonnel || !allowedRoles.includes(req.hrPersonnel.role)) {
            throw new Error('Unauthorized');
        }
        next();
    } catch (error) {
        res.status(403).send({ error: 'Unauthorized' });
    }
};


module.exports = authorizeRole;
