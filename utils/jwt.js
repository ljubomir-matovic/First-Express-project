require("dotenv").config();
const jwt = require('jsonwebtoken');

const createJWTAccess = (payload) => {
    console.log(payload);
    const token = jwt.sign(payload, process.env.JWT_SECRET_TOKEN,{expiresIn:"1h"});
    return token;
};

module.exports={
    createJWTAccess
};