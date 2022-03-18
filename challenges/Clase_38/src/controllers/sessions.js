import jwt from 'jsonwebtoken';
const register = async(req,res) =>{
    console.log(req.user);
    res.send({message:"Registered"})
}
const login = async(req,res)=>{
    let user = req.user;
    console.log(req.user);
    let token = jwt.sign(user,"123coder")
    res.cookie("MVC_JWT_COOKIE",token,{
        httpOnly:true,
        maxAge:60*60*1000
    })
    res.send({message:"Logged In"})
}



export default {
    register,
    login
}