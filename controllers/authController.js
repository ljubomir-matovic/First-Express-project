require("dotenv").config();
const {createJWTAccess,STATUS_CODES,verifyPassword}=require("../utils");
const {BY_EMAIL,BY_ID}=require("../consts");
const User = require("../models/user");
const {validationResult}=require("express-validator");
class AuthController{
    static async login(req,res){
        const {email,password}=req.body;
        if (!email || !password) {
            return res.status(STATUS_CODES.BadRequest).send('Please provide email and password');
        }
        let user=await User.getUser({value:email,by:BY_EMAIL});
        console.log(user);
        if(!user)return res.status(STATUS_CODES.NotFound).send("Bad credentials");
        if(await verifyPassword(password,user.password)){
            res.status(STATUS_CODES.OK).send({token:createJWTAccess({userId:user.id,email:user.email})});
        }
        else res.status(STATUS_CODES.NotFound).send("Bad credentials");
    }
    static async register(req,res){
        try{
            const err=validationResult(req);
            const {name,email,password,phoneNumber}=req.body;
            console.log(err);
            if(err && !err.isEmpty() || (!( phoneNumber==undefined || /\+?\d{9,13}/.test(phoneNumber) ) ) )
                return res.status(400).send(err.errors.map((e)=>{return{msg:e.msg,param:e.param};}));
            let newUser=new User({id:0,name,password,email,phoneNumber});
            let result=await newUser.insert();
            if(!result)
                return res.status(STATUS_CODES.BadRequest).send("Already exists user with this email");
            res.status(STATUS_CODES.Created).send("User successfuly added");
        }
        catch(e){
            res.status(STATUS_CODES.BadRequest).send(e);
        }
    }
}
module.exports=AuthController;