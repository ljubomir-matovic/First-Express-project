const express=require("express");
const AuthController = require("../controllers/authController");
const router=express.Router();
const {body}=require('express-validator');
router.post("/login",AuthController.login);
router.post("/register",
    body("email").isEmail().withMessage("Not email"),
    body("password").matches(/(?=^.{10,}$)(?=.*\d)(?=.*[!@#$%^&*-]+)(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/).withMessage("Password must contains minimum 10 character, one digit, one small and big letter and one special character"),
    body("name").isLength({min:2}).withMessage("Must exists"),
    AuthController.register);

module.exports=router;