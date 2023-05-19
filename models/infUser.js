const mongoose=require("mongoose");
const jwt=require('jsonwebtoken');
const { resolve } = require("path");
const { rejects } = require("assert");
var id;
let role;

const jwt_secret='this is jsonwebtokn scret of my webapp djnujefbcycjdfbgf'

User=require('./User');
var url="mongodb://localhost:27017/AlgCrafters"
const getInfo=async(token)=>{
    return new Promise(async(resolve,rejects)=>{
if(token){
       await jwt.verify(token,jwt_secret,(err,decodedToken)=>{
        console.log(decodedToken)
           
        id=decodedToken.id
        
            
            
        })
        mongoose.connect(url,{useNewUrlParser:true,useUnifiedTopology:true}).then(async()=>{
                 return  await User.findById(id);
        }).then((user)=>{
            
            role=user.role;
            resolve(user);
        }).catch((err)=>{
            console.log(err);

        })
}})
   

}


module.exports=getInfo;

