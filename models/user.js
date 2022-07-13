const {execute}=require("../db");
const {BY_ID,BY_EMAIL}=require("../consts");
const {createHash}=require("../utils");
//TODO: add roles
class User{
    constructor({id=0,name,password="",email,phoneNumber}){
        this.name=name;
        this.email=email;
        this.phoneNumber=phoneNumber;
        this.password=password;
        this.id=id;
    }
    async insert(){
        if(this.password=="" || this.password==undefined){
            return false;
        }
        let phoneNumber=(this.phoneNumber)?`"${this.phoneNumber}"`:null;
        let sql=`INSERT INTO users(name,password,email,phone_number) VALUES ("${this.name}","${await createHash(this.password)}","${this.email}",${phoneNumber})`;
        try{
        let output=await execute(sql);
        return output;
        }
        catch(err){
            return false;
        }
    }
    /**
     * 
     * @param {*} {value,by} 
     * @returns 
     */
    static async getUser({value,by}){
        let sql=`SELECT id,email,name,phone_number,password FROM users WHERE `;
        switch(by){
            case BY_ID:
                sql+=`id=${value}`;
                break;
            case BY_EMAIL:
                sql+=`email="${value}"`;
                break;
            default:
                console.error("BAD ACTION");
                return null;
        }
        try{
            let result=await execute(sql);
            if(!result || result.length==0){
                return null;
            }
            result=result[0];
            if(result[0]!=null)
                return null;
            return new User({id:result.id,name:result.name,password:result.password,email:result.email,phoneNumber:result.phoneNumber});
        }
        catch(err){
            return false;
        }
    }
    toString(){
        return "Id:"+this.id+"Password:"+this.password;
    }
}
module.exports=User;