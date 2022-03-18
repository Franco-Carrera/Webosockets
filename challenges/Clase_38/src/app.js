import express from 'express';
import handlebars from 'express-handlebars';
import __dirname from './utils.js';
import viewsRouter from './routes/views.js';
import usersRouter from './routes/users.js';
import sessionRouter from './routes/sessions.js';
import cookieParser from 'cookie-parser';
import mongoose from 'mongoose';
import passport from 'passport';
import initializePassport from './config/passport.js';

const app = express();
mongoose.connect('mongodb+srv://Mauricio:123@academiccluster.6bfqh.mongodb.net/basePruebaCoder?retryWrites=true&w=majority')

app.engine('handlebars',handlebars.engine())
app.set('views',__dirname+'/views')
app.set('view engine','handlebars')

app.use(express.static(__dirname+'/public'))

app.use(express.json());
app.use(express.urlencoded({extended:true}))
app.use(cookieParser());
initializePassport();
app.use(passport.initialize());
app.use('/',viewsRouter);
app.use('/api/users/',usersRouter);
app.use('/api/sessions/',sessionRouter);
const server = app.listen(8080,()=>console.log("Now listening"))