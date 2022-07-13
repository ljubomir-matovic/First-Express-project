require("dotenv").config();
const express=require("express");
const app=express();
const bodyParser=require("body-parser");

//protection
const xss=require("xss-clean");
const helmet=require("helmet");
const cors=require("cors");
app.use(cors(),xss(),helmet());

//middleware
app.use(express.static("./public"));
app.use(bodyParser.json());

//routes
const authRouter=require("./routes/authRoutes");
const productRouter=require("./routes/productRoutes");
const orderRouter=require("./routes/orderRoutes");

app.use("/api/auth/",authRouter);
app.use("/api/products",productRouter);
app.use("/api/orders",orderRouter);

//Connect with db and listen port
const {openConnection,closeConnection}=require("./db");
const start=async ()=>{
    try{
        openConnection();
        const port=process.env.PORT || 8080;
        app.listen(port,()=>{console.log(`Server listening on port ${port}...`)});
    }
    catch(e){
        console.error(e);
        closeConnection();
    }
};
start();