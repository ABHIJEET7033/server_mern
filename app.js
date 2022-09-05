const dotenv=require('dotenv');
const mongoose=require('mongoose');
const express=require('express');
const app=express();
const cors=require('cors');
const cookieparser=require('cookie-parser');

var corsOptions = {
    origin: 'https://magnificent-gecko-c40889.netlify.app',
    optionsSuccessStatus: 200,
    credentials:true,
    'Access-Control-Allow-Origin':'*',
    'Access-Control-Allow-Methods':'POST,PATCH,OPTIONS'
}

app.use(cors(corsOptions));
require('./db/conn');
dotenv.config();
app.use(express.json());
app.use(cookieparser());
app.use(require('./router/auth'));
const User=require('./model/userSchema');

const PORT=process.env.PORT || 3030;

const middleware=(req,res,next)=>{
           console.log('hello my middleware');
           next();
}
app.get('/about', middleware, (req, res) => {
    console.log(`Hello my About`);
    res.send(`Hello About world from the server`);
});

app.get('/contact', (req, res) => {
    res.send(`Hello Contact world from the server`);
});

app.get('/signin', (req, res) => {
    res.send(`Hello Login world from the server`);
});

app.get('/signup', (req, res) => {
    res.send(`Hello Registration world from the server`);
});

app.listen(PORT, () => {
    console.log(`server is runnig at port no ${PORT}`);
})
