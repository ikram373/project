const { rejects } = require('assert');
const mongoose=require('mongoose');
const { resolve } = require('path');
const User=require('./User');
var url="mongodb://localhost:27017/AlgCrafters"
module.exports.ajouter_pub=(id,img,desc)=>{
    return new Promise((resolve,rejects)=>{
        mongoose.connect(url,{useNewUrlParser:true,useUnifiedTopology:true}).then(async()=>{
           await User.updateOne({_id:id},{$push:{pub:[img,desc]},$inc:{nombre_pub:1}})
            resolve('bien')
        }).catch((err)=>{
            console.log(err);
        })
    })

}