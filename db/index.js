require("dotenv").config();
const mysql=require("mysql");
const util=require("util");

const host=process.env.HOST;
const user=process.env.DB_USER;
const password=process.env.DB_PASSWORD;
const database=process.env.DB_NAME;
const connection=mysql.createConnection({
    host,
    user,
    password,
    database,
});
module.exports.connection=connection;

/**
 * 
 * @param {string} query 
 * @param {function(results,fields)} callback Function which process results
 * @returns mysql.Query
 */
module.exports.execute=async(query,callback)=>{
    try{
        let result=await util.promisify(connection.query).call(connection,query);
        return callback(result);
    }
    catch(err){
        console.error("Query execution:"+err);
        return null;
    }
};

/**
 * 
 * @param {string} query 
 * @param {Array} values
 * @param {function(results,fields)} callback Function which process results
 * @returns mysql.Query
 */
module.exports.executePrepared=async(query,values,callback)=>{
    try{
        let result=await util.promisify(connection.query).call(connection,{sql:query,values});
        return callback(result);
    }
    catch(err){
        console.error("Query execution:"+err);
        return null;
    }
};
module.exports.openConnection=()=>{
    if(connection.state=='disconnected')
        connection.connect(function(err){
            if(err){
                console.error("Connection:"+err);
                //throw new Error("Connection to db failed");
            }
        });
};
module.exports.closeConnection=()=>{connection.end();};
