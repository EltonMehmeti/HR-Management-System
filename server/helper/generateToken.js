const dotenv = require('dotenv');
const jwt = require('jsonwebtoken');
dotenv.config();



const generateToken = (userInfo) => {
    console.log(userInfo);
    return jwt.sign(userInfo, process.env.SECRET_KEY);
};


module.exports = generateToken;