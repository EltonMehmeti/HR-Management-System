const dotenv = require('dotenv');
const jwt = require('jsonwebtoken');
dotenv.config();



const generateToken = (id) => {
    return jwt.sign({ _id: id }, process.env.SECRET_KEY);
};


module.exports = generateToken;