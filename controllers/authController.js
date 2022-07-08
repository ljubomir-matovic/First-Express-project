//const {request,response}=require("express");
const {execute,executePrepared}=require("../db");
const UserService=require("../services/user");
const {BY_EMAIL,BY_ID}=require("../consts");

class AuthController{
    static async login(req,res){
    const {email,password}=req.body;
    let user=await UserService.getUser({value:email,by:BY_EMAIL});
    console.log(user);
    if(!user)return res.status(404).send("Bezuspesno");
    if(await UserService.verifyPassword(password,user.password))
        res.status(200).send("Uspesno");
    else res.status(404).send("Bezuspesno");
    }
}
module.exports=AuthController;