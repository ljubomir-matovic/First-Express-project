const {execute}=require("../db");
const {BY_ID,BY_EMAIL}=require("../consts");
class User{
    constructor(name,password="",email,phoneNumber){
        this.name=name;
        this.email=email;
        this.phoneNumber=phoneNumber;
        this.password=password;
    }
    async insert(){
        if(this.password==="" || this.password===undefined){
            return false;
        }
        let sql=`INSERT INTO users(name,password,email,phone_number) VALUES ("${this.name}","${this.password}","${this.email}","${this.phoneNumber}")`;
        let output;
        await execute(sql,(result)=>{
            output=result;
            console.log(result);
        });
    }
    static async getUser({value,by}){
        let sql=`SELECT id,email,name,phone_number,password FROM users WHERE `;
        switch(by){
            case BY_ID:
                sql+="id";
                break;
            case BY_EMAIL:
                sql+="email";
                break;
            default:
                console.error("BAD ACTION");
                return null;
        }
        sql+=`="${value}"`;
        let output=await execute(sql,(result)=>{
            if(!result || result.length==0){
                return null;
            }
            result=result[0];
            if(result[0]!=null)
                return null;
            return new User(result.name,result.password,result.email,result.phoneNumber);
        });
        return output;
    }
}
module.exports=User;