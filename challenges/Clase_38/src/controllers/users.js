import usersService from "../models/users.js"
import { hashPassword,isValidPassword } from "../utils.js";
const getUsers = async(req,res) =>{
    let users = await usersService.find();
    res.send(users);
}
const saveUser = async(req,res)=>{

}
export default {
    getUsers,
    saveUser
}