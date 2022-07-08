require("dotenv").config();
const mysql=require("mysql");

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
 * @param {function} callback Function which process results
 * @returns void
 */
module.exports.execute=(query,callback)=>{
    connection.query(query,function(err,result,fields=[]){
        if(err){
            console.error("Query execution:"+err);
            throw new Error("Bad query");
        }
        connection.pause();
        callback(result,fields);
        connection.resume();
    });
};

/**
 * 
 * @param {string} query 
 * @param {Array} values
 * @param {function} callback Function which process results
 * @returns void
 */
module.exports.executePrepared=(query,values,callback)=>{
    connection.query({sql:query,values},function(err,result,fields=[]){
        if(err){
            console.error("Query execution:"+err);
            throw new Error("Bad query");
        }
        callback(result,fields);
    });
};
module.exports.openConnection=()=>{
    if(connection.state=='disconnected')
        connection.connect(function(err){
            if(err){
                console.error("Connection:"+err);
                throw new Error("Connection to db failed");
            }
        });
};
module.exports.closeConnection=()=>{connection.end();};
