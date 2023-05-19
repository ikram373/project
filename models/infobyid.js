const { rejects } = require('assert');
const mongoose=require('mongoose');
const { resolve } = require('path');
const User=require('./User')
var url="mongodb://localhost:27017/AlgCrafters"
module.exports.info=(id)=>{
    return new Promise((resolve,rejects)=>{
        mongoose.connect(url,{useNewUrlParser:true,useUnifiedTopology:true}).then(async()=>{
return await User.findOne({_id:id})
        }).then((user)=>{
            resolve(user)
        }).catch((err)=>{
            console.log(err)
        })

    })
}
module.exports.infoadmin=()=>{
    new Promise((resolve,rejects)=>{
        mongoose.connect(url,{useNewUrlParser:true,useUnifiedTopology:true}).then(async()=>{
            return await User.findOne({email:'ikrammimi373@gmail.com'})
        }).then((user)=>{
            resolve(user);

        }).catch((err)=>{
            confirm.log(err);
        })

    })
};