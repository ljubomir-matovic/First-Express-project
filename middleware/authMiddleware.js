require("dotenv").config();
const { STATUS_CODES } = require("../utils");
const jwt=require("jsonwebtoken");
const AuthMiddleware=(req,res,next)=>{
    let token=request.headers["authorization"];
    if(!token)
        return res.status(STATUS_CODES.Unauthorized).send("Authorization needed");
    token=(token.startsWith("Bearer "))? token.split(" ")[1]:null;
    if(token==null)
        return res.status(STATUS_CODES.BadRequest).send("Bad token");
    let verified=jwt.verify(token,process.env.JWT_SECRET_TOKEN);
    if(verified)
        next();
    else res.status(STATUS_CODES.Unauthorized).send("Token is not valid");
};
module.exports={
    AuthMiddleware
};