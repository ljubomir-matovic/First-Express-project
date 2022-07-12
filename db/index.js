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
 * @returns mysql.Query
 */
module.exports.execute=async(query)=>{
    try{
        let result=await util.promisify(connection.query).call(connection,query);
        return result;
    }
    catch(err){
        console.error("Query execution:"+err);
        throw err;
    }
};

/**
 * 
 * @param {string} query 
 * @param {Array} values
 * @returns mysql.Query
 */
module.exports.executePrepared=async(query,values)=>{
    try{
        let result=await util.promisify(connection.query).call(connection,{sql:query,values});
        return result;
    }
    catch(err){
        console.error("Query execution:"+err.message);
        throw err;
    }
};
module.exports.openConnection=()=>{
    if(connection.state=='disconnected')
        connection.connect(function(err){
            if(err){
                console.error("Connection:"+err.message);
                throw new Error("Connection to db failed");
            }
        });
};
module.exports.closeConnection=()=>{connection.end();};
