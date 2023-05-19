const { rejects } = require('assert');
const mongoose=require('mongoose');
const { resolve } = require('path');
const User=require('./User');
var url="mongodb://localhost:27017/AlgCrafters"
getUsers=()=>{
    return new Promise((resolve,rejects)=>{
        mongoose.connect(url,{useNewUrlParser:true,useUnifiedTopology:true}).then(()=>{
            return User.find({$and:[{$or:[{role:'artisan'},{role:'user'}]},{desctive:false}]});
        }).then((users)=>{
            // console.log(users);
            resolve(users);
        }).catch((err)=>{
            rejects(err)
        })

    })
}
module.exports=getUsers;