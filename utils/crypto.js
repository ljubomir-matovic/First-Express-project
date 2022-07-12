const bcrypt=require("bcrypt");
const createHash=async(password)=>{
    try{
    let crypted=await bcrypt.hash(password,10);
    return crypted;
    }catch(err){}
}
async function verifyPassword(passwordForm,passwordDB){
    return await bcrypt.compare(passwordForm,passwordDB);
}
module.exports={
    createHash,
    verifyPassword
};