const { STATUS_CODES } = require("../utils");
const {verifyToken}=require("../utils");
const authMiddleware=(req,res,next)=>{
    let token=req.headers["authorization"];
    if(!token)
        return res.status(STATUS_CODES.Unauthorized).send("Authorization needed");
    token=(token.startsWith("Bearer "))? token.split(" ")[1]:null;
    if(token==null)
        return res.status(STATUS_CODES.BadRequest).send("Bad token");
    try{
        let verified=verifyToken(token);
        req.userId=verified.userId;
        req.email=verified.email;
        next();
    }
    catch(err){
        res.status(STATUS_CODES.Unauthorized).send("Token is not valid");
    }
};
module.exports={
    authMiddleware
};