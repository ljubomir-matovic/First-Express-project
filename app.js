require("dotenv").config();
const express=require("express");
const app=express();
const bodyParser=require("body-parser");

//middleware
app.use(express.static("./public"));
app.use(bodyParser.json());

//routes


//Connect with db and listen port
const {openConnection,closeConnection}=require("./db");
const start=async ()=>{
    try{
        openConnection();
        const port=process.env.PORT || 8080;
        app.listen(port);
    }
    catch(e){
        console.error(e);
        closeConnection();
    }
};
start();