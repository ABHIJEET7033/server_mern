const express=require('express');
const router=express.Router();
const bcrypt=require('bcryptjs');
const jwt=require('jsonwebtoken');
const authenticate=require('../Middleware/authenticate');
require('dotenv').config();

require('../db/conn');
const User=require('../model/userSchema');

router.get('/',(req,res) =>{
    res.send('hello world from server from router js');
});


router.post('/register',async(req,res) =>{
    
    const { name, email, phone, work, password, cpassword}=req.body;
    if(!name || !email || !phone || !work || !password || !cpassword){
        return res.status(422).json({message : "plz fill all fields correctly"});
    }


    try {
          let user_temp=await User.findOne({"email":email});
          console.log(user_temp);
          if(user_temp){
            
          return res.status(422).json({message:"Already registered"});
          }
        else if(password!==cpassword){
       
        return res.status(422).json({ error : "Password not matching "});
    }
    else{
            const user= await new User({name, email, phone,work, password, cpassword});
            console.log(user)

             user.save();

        return res.status(201).json({message : "User Registered Successfully"});
        
    }
}
    catch (error) {
        console.log(error);
    }
});






router.post('/signin',async(req,res)=>{
    try {
        
        const {email , password } =req.body;

        if(!email || !password){
        return res.status(400).json({ error : "plz fill the data"});
        }

        const userLogin = await  User.findOne({ email : email});

        if(userLogin){
            const isMatch= await bcrypt.compare(password,userLogin.password);

            const token= await userLogin.generateAuthToken();
            console.log(token);
            
             res.cookie("jwtoken", token,{
                expires:new Date(Date.now() + 25892000000),
                httpOnly:true
             });

        if(!isMatch){
        res.status(400).json({ error : "Invalid Credentials "});
        }
        else{
            res.status(201).json({ message : "User Sigin Successful"});
        }
        }
        
        
        else{
            res.status(400).json({ error : "Invalid Credentials "});
        }
        




    } catch (err) {
        console.log(err);
    }
});


router.get('/about',authenticate ,(req,res) =>{
    console.log('hello from about');
    res.send(req.rootUser);
});

router.get('/getdata',authenticate ,(req,res) =>{
    console.log('hello from about');
    res.send(req.rootUser);
});


router.post('/contact',authenticate ,async(req,res) =>{
    try {
        
        const { name ,email, phone, message } =req.body;

        if(!name || !email || !phone || !message){
             console.log("error in contact form ");
             return res.json({error : "Plz fill all fields properly "});
        }
        

        const userContact=await User.findOne({_id: req.userID });
        if(userContact){

            const userMessage = await userContact.addMessage(name,email,phone,message);

            await userContact.save();

            res.status(201).json({ message : "user contact successfully "});
        }


    } catch (error) {
        console.log(eror);
    }
});


router.get('/logout',authenticate,async(req,res) =>{
    console.log(`hello logout page`);
    res.clearCookie('jwtoken',{ path : '/'});
    res.status(200).send('User Logout');
});

module.exports=router;
