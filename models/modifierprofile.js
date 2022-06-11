const mongoose=require('mongoose');
const bcrypt=require('bcrypt');
const { name } = require('ejs');
const { resolve } = require('path');
const { rejects } = require('assert');
   User=require('./User');
   var url="mongodb://localhost:27017/AlgCrafters"
//    module.exports.profileU=(id,name,password,passwordConf)=>{
//        return new Promise((resolve,rejects)=>{
//         mongoose.connect(url,{useNewUrlParser:true,useUnifiedTopology:true}).then(async()=>{
            
//             if(name&&password){
//                 if(password==passwordConf){
//                     bcrypt.hash(password,8,async(err,hash)=>{
//                         await User.updateOne({_id:id},{$set:{fullname:name,password:hash}})
//                     })
//                     resolve('bien')

//                 }else{
//                     rejects('password are not the same')
//                 }

//             }else{
            
//                 if(name){
//                     // console.log(id);
//                     await User.updateOne({_id:id},{$set:{fullname:name}});
                    
//                      resolve('true')

//                 }else{
//                 if(password){
//                     if(password==passwordConf){
//                         bcrypt.hash(password,8,async(err,hash)=>{
//                         await User.updateOne({_id:id},{$set:{password:hash}})
//                     })
//                     }
//                 }else{
//                     rejects('entre your information')
//                 }
//                 }
//             }
//         }).catch((err)=>{
//             console.log(err);
//         })

//        })
//    }
module.exports.profileU=(id,name,password,passwordConf)=>{
           return new Promise((resolve,rejects)=>{
            mongoose.connect(url,{useNewUrlParser:true,useUnifiedTopology:true}).then(async()=>{
                if(!passwordConf){
                    rejects('entre mot passe')
                }else{
                    return User.findOne({_id:id})

                }

            }).then((user)=>{
                if(user){
                    bcrypt.compare(passwordConf,user.password).thne(async(ver)=>{
                        if(ver){
                            if(name){
                                await User.updateOne({_id:id},{$set:{fullname:name}});
                            }if(password){
                                bcrypt.hash(password,8,async(err,hash)=>{
                                    await User.updateOne({_id:id},{$set:{password:hash}})
                                })
                                

                            }
                            resolve('information enreg');
                        }else{
                            rejects("mot passe inccorect")
                        }
                    }).catch((err)=>{
                        console.log(err)
                    })
                    // bcrypt.compare(password,user.password).then((verif)=>{
                }

            })
        })}

