const express=require("express");
const OrderController = require("../controllers/orderController");
const { authMiddleware } = require("../middleware/authMiddleware");
const router=express.Router();

router.post("/",authMiddleware,OrderController.insertOrder);
router.get("/",authMiddleware,OrderController.getMyOrders);

module.exports=router;