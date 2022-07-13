const express=require("express");
const router=express.Router();
const ProductController=require("../controllers/productController");
const {body}=require("express-validator");

router.get("/",ProductController.getAll);
//TODO: Only moderators can add products
router.post("/",
    body("name").notEmpty({ignore_whitespace:true}).withMessage("Must have name"),
    body("price").isFloat({gt:0.001}).withMessage("Must be float"),
    ProductController.insert);

module.exports=router;