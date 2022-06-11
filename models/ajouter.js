const { rejects } = require('assert');
const mongoose=require('mongoose');
const { resolve } = require('path');
const User=require('../models/User');
var url="mongodb://localhost:27017/AlgCrafters"
module.exports.ajouterartisan=()=>{
    return new Promise((resolve,rejects)=>{
        mongoose.connect(url,{useNewUrlParser:true,useUnifiedTopology:true}).then(async()=>{
            // return User.findOne({email:'ikrammimi373@gmail.com'})
//         }).then(async(admin)=>{
// console.log(admin)
            // let nb=admin.nbartisan;
            // console.log(nb);
            // nb++;
            await User.updateOne({email:'ikramimi373@gmail.com'},{$inc:{nbartisan:1}})

        }).catch((err)=>{
            console.log(err);
        })
    })
}
module.exports.ajouteruser=()=>{
    return new Promise((resolve,rejects)=>{
        mongoose.connect(url,{useNewUrlParser:true,useUnifiedTopology:true}).then(async()=>{
        //     return User.findOne({email:'ikrammimi373@gmail.com'})
        // }).then(async(admin)=>{
        //     let nb=admin.nbuser;
        //     nb++
        await User.updateOne({email:'ikramimi373@gmail.com'},{$inc:{nbuser:1}})
         let nb= 5;
resolve(nb);
        }).catch((err)=>{
            console.log(err);
        })

    })
}
