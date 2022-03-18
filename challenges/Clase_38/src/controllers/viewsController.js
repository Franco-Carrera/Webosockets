import usersService from '../models/users.js'
const indexView = (req,res) =>{
    res.render('index');
}
const usersView = async(req,res)=>{
    let users = await usersService.find().lean();
    res.render('users',{users});
}
const loginView = async(req,res)=>{
    res.render('login');
}
const profileView = async(req,res)=>{
    let user = req.user;
    console.log(user);
    res.render('profile',{user:user});
}

export default {
    indexView,
    usersView,
    loginView,
    profileView
}