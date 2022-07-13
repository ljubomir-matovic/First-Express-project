const { validationResult } = require("express-validator");
const Product=require("../models/product");
const { STATUS_CODES } = require("../utils");

class ProductController{
    static async getAll(req,res){
        let products=await Product.getAllProducts();
        if(!products)
            return res.status(STATUS_CODES.InternalServerError).send("Server error");
        return res.send(products);
    }
    static async insert(req,res){
        try{
            const {name,price}=req.body;
            const err=validationResult(req);
            if(err && !err.isEmpty())
                return res.status(STATUS_CODES.BadRequest).send(err.errors.map(e=>({param:e.param,msg:e.msg})));
            let newProduct=new Product({name,price});
            let result=await newProduct.insert();
            if(!result)
                return res.status(STATUS_CODES.BadRequest).send("Bad request")
            res.status(STATUS_CODES.Created).send("Product is created");
        }
        catch(err){
            res.status(STATUS_CODES.BadRequest).send("Bad request");
        }
    }
}

module.exports=ProductController;