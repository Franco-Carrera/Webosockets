import passport from 'passport';
import local from 'passport-local';
import jwt from 'passport-jwt';
import userService from '../models/users.js';
import { hashPassword, isValidPassword } from '../utils.js';
import { cookieExtractor } from '../utils.js';
const LocalStrategy = local.Strategy;
const JWTStrategy = jwt.Strategy;
const ExtractJwt = jwt.ExtractJwt;

const initializePassport = () =>{
    passport.use('register',new LocalStrategy({passReqToCallback:true,usernameField:"email",session:false},async(req,email,password,done)=>{
        let {first_name,last_name} = req.body;
        try{
            let user = await userService.findOne({email:email})
            if(user) return done(null,false,{message:"User Already existes"});
            const newUser ={
                first_name,
                last_name,
                email,
                password:hashPassword(password),
                role:"user"
            }
            let result = await userService.create(newUser)
            return done(null,result);
        }catch(error){
            console.log(error);
            return done(error);
        }
    }))
    passport.use('login',new LocalStrategy({usernameField:"email"},async(email,password,done)=>{
        try{
            const user = await userService.findOne({email:email}).lean();
            if(!user) return done(null,false,{messages:"User not found"})
            if(!isValidPassword(password,user)) return done(null,false,{messages:"Incorrect Password"})
            return done(null,user);
        }catch(err){
            return done(err);
        }
    }))
    passport.use('jwt',new JWTStrategy({jwtFromRequest:ExtractJwt.fromExtractors([cookieExtractor]),secretOrKey:"123coder"},async(jwt_payload,done)=>{
        try{
            if(jwt_payload.role==="admin") return done(null,jwt_payload);
            let user = await userService.findOne({_id:jwt_payload._id}).lean();
            if(!user) return done(null,false,{messages:"User not found"})
            return done(null,user);
        }catch(error){
            return done(error);
        }
    }))
}

export default initializePassport;