const mongoose=require('mongoose');
const jwt=require('jsonwebtoken');
const { resolve } = require('path');
const { rejects } = require('assert');
var  id;
const ajouter=require('./ajouter');
const jwt_secret='this is jsonwebtokn scret of my webapp djnujefbcycjdfbgf'
User=require('./User');
var url="mongodb://localhost:27017/AlgCrafters"
const service=(token,wly,met,num)=>{
    jwt.verify(token,jwt_secret,(err,decodedToken)=>{
        id=decodedToken.id;
    })
    return new Promise((resolve,reject)=>{
        mongoose.connect(url,{useNewUrlParser:true,useUnifiedTopology:true}).then(async()=>{
            if(wly==0||met==0||!num){
                reject("entre toute les information")
            }else{
                if(num.length!=10){
                    reject('numéro incorrect')
                }else{
                    

                    
                await User.update({_id:id},{$set:{role:"artisan",numero:num,wilaya:wly,metier:met,nombre_pub:0,nombre_abonnes:0,nombre_abonnement:0}})
               
                resolve('true')}}  
        }).catch((err)=>{
            console.log(err);
        })

    })

}
module.exports=service;