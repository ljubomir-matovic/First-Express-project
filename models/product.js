const {execute}=require("../db");

class Product{
    constructor({id=0,name,price}){
        this.id=id;
        this.name=name;
        this.price=price;
    }
    async insert(){
        if(!(this.name && this.price))
            return false;
        let sql=`INSERT INTO products(name,price) VALUES ("${this.name}",${Number(this.price)})`;
        try{
        let output=await execute(sql);
        return output;
        }
        catch(err){
            return false;
        }
    }
    static async getAllProducts(){
        let sql=`SELECT * FROM products`;
        try{
            let result=await execute(sql);
            if(!result || result.length==0)
                return null;
            return result.map(r=>new Product(r));
        }
        catch(err){
            return false;
        }
    }
    static async getProduct(id){
        let sql=`SELECT * FROM products WHERE id=${Number(id)}`;
        try{
            let result=await execute(sql);
            if(!result || result.length==0)
                return null;
            return result.map(r=>new Product(r));
        }
        catch(err){
            return false;
        }
    }
}
module.exports=Product;