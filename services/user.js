const bcrypt=require("bcrypt");
const User=require("../models/user");
class UserService{
    static async verifyPassword(passwordForm,passwordDB){
        return await bcrypt.compare(passwordForm,passwordDB);
    }
    static getUser({value,by}){
        return User.getUser({value,by});
    }
}
module.exports=UserService;