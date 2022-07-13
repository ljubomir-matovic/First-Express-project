const Order=require("../models/order");
const { STATUS_CODES } = require("../utils");

class OrderController{
    static async insertOrder(req,res){
        const {products}=req.body;
        let order=new Order({userId:req.userId,products:products});
        try{
            let result=await order.addOrder();
            res.send("Order added");
        }
        catch(err){
            res.status(STATUS_CODES.BadRequest).send("Bad request");
        }
    }
    static async getMyOrders(req,res){
        try{
            let result=await Order.getMyOrders(req.userId);
            res.send(result);
        }
        catch(err){
            res.status(STATUS_CODES.BadRequest).send("Bad request");
        }
    }
}

module.exports=OrderController;