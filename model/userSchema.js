const jwt=require('jsonwebtoken');
const mongoose=require("mongoose");
const validator=require("validator");
const bcrypt=require("bcryptjs");
require('dotenv').config();
const userSchema=new mongoose.Schema({
    name:{
        type:String,
        required : true,
    },
    email:{
        type:String,
        required:true,
        validate(value)
        {

            if(!validator.isEmail(value))
            {
                throw new Error("invalid input");
            }
        }
    },
   phone:{
      type:Number,
      min:10,
      required:true
   },
   work:{
    type:String,
    required:true
},
password:{
    type:String,
    required:true
},
cpassword:{
    type:String,
    required:true
},
date:{
    type:Date,
    default:Date.now
},
messages:[
    {
        name:{
            type:String,
            required : true,
        },
        email:{
            type:String,
            required:true,
             },
       phone:{
          type:Number,
          required:true
       },
       message:{
        type:String,
        required:true
        }
    }
],
    tokens:[
        {
            token:{
                type: String,
                required:true,
                

            }
        }
    ]
    
})



userSchema.pre('save',async function (next){
    if(this.isModified('password')){
        this.password=await bcrypt.hash(this.password,12);
        this.cpassword=await bcrypt.hash(this.cpassword,12);
    }
    next();
});


userSchema.methods.generateAuthToken = async function (){
    try {
        let token = jwt.sign({ _id:this._id },'MYNAMEISABHIJEETKUMARWELCOMETOMYMERNPROJECT');
       
        this.tokens= this.tokens.concat({ token:token });
        await this.save();
        return token;
    } catch (error) {
        console.log(error);
    }
}

userSchema.methods.addMessage = async function(name,email,phone,message){
    try {
        this.messages= this.messages.concat({name,email,phone,message});
        await this.sve();
        return this.messages;


    } catch (error) {
        console.log(error);
    }

}
const User= mongoose.model('USER',userSchema);

module.exports=User;