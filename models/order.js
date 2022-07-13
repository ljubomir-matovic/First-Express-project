const {execute}=require("../db");

class Order{
    constructor({userId,products=[]}){
        this.userId=userId;
        this.products=products;
    }
    async addOrder(){
        try{
            let sql=`INSERT INTO orders(user_id) VALUES(${this.userId})`;
            let inserted=await execute(sql);
            let {insertId}=inserted;
            let products=[];
            for(let p of this.products){
                let keys=Object.keys(p);
                if(!keys.includes("productId") && !keys.includes("amount"))
                    continue;
                let index=products.findIndex(pr=>pr.productId==p.productId);
                if(index==-1){
                    products.push(p);
                }else products[index].amount+=p.amount;
            }
            for(let p of products){
                sql=`INSERT INTO orders_list(order_id,product_id,amount) VALUES(${insertId||null},${p.productId||null},${p.amount||null})`;
                try{
                    await execute(sql);
                }
                catch(err){}
            }
        }
        catch(err){throw err;}
    }
    static async getMyOrders(id){
        try{
            let sql=`
            SELECT o.id as orderId,ol.product_id as productId, time,amount,name,price
            FROM orders o 
            JOIN orders_list ol ON o.user_id=${id} AND o.id=ol.order_id
            JOIN products p ON p.id=ol.product_id
            `;
            let result=await execute(sql);
            if(!result || result.lenght==0)
                return false;
            let output=[];
            let total=0;
            for(let r of result){
                let index=output.findIndex((v,i)=>v.id==r.orderId);
                total+=r.amount*r.price;
                if(index==-1){
                    output.push({id:r.orderId,time:r.time,products:[{id:r.productId,name:r.name,amount:r.amount,price:r.price}]});
                }
                else 
                    output[index].products.push({id:r.productId,name:r.name,amount:r.amount,price:r.price});
            }
            console.log(JSON.stringify(output));
            return {orders:output,total};
        }
        catch(err){
            throw err;
        }
    }
}

module.exports=Order;