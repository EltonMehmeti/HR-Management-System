const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

// Load environment variables from .env file
dotenv.config();

const authenticate = (Model) => async (req, res, next) => {
    try {
        const token = req.header('Authorization').replace('Bearer ', '');
        console.log(token);
        const decoded = jwt.verify(token, process.env.SECRET_KEY);
        console.log(decoded.id,decoded.role);

        const modelInstance = await Model.findOne({
            _id: decoded.id,
            'tokens.token': token
        });
        if (!modelInstance) {
            throw new Error();
        }
        req.modelInstance = modelInstance;
        req.token = token;
        next();
    } catch (error) {
        res.status(401).send(error.message);
    }
};


module.exports = authenticate;
