const mongoose=require('mongoose');
const bcrypt=require('bcrypt');
const { name } = require('ejs');
const { resolve } = require('path');
const { rejects } = require('assert');
   User=require('./User');
   var url="mongodb://localhost:27017/AlgCrafters"

module.exports.profileU=(id,name,password,passwordConf,image)=>{
    // console.log()
           return new Promise((resolve,rejects)=>{
            mongoose.connect(url,{useNewUrlParser:true,useUnifiedTopology:true}).then(async()=>{
                if(!password){
                    rejects('entre mot passe')
                }else{
                    return User.findOne({_id:id})

                }

            }).then((user)=>{
                console.log(user);
                if(user){
                    bcrypt.compare(password,user.password).then(async(ver)=>{
                        if(ver){
                            if(name){
                                await User.updateOne({_id:id},{$set:{fullname:name}});
                            }if(passwordConf){
                                bcrypt.hash(passwordConf,8,async(err,hash)=>{
                                    await User.updateOne({_id:id},{$set:{password:hash}})
                                })
                                

                            }if(image){
                                await User.updateOne({_id:id},{$set:{photo_profille:image}});
                            }
                            resolve('information enreg');
                        }else{
                            rejects("mot passe inccorect")
                        }
                    }).catch((err)=>{
                        console.log(err)
                    })
                   
                }

            })
        })}
        module.exports.profileA=(id,image,name,password,passwordConf,number,wilayatch)=>{
            return new Promise((resolve,rejects)=>{
             mongoose.connect(url,{useNewUrlParser:true,useUnifiedTopology:true}).then(async()=>{
                 if(!password){
                     rejects('entre mot passe')
                 }else{
                     return User.findOne({_id:id})
 
                 }
 
             }).then((user)=>{
                 console.log(user);
                 if(user){
                     bcrypt.compare(password,user.password).then(async(ver)=>{
                         if(ver){
                             if(name){
                                 await User.updateOne({_id:id},{$set:{fullname:name}});
                             }if(passwordConf){
                                 bcrypt.hash(passwordConf,8,async(err,hash)=>{
                                     await User.updateOne({_id:id},{$set:{password:hash}})
                                 })
                                 
 
                             } if(number){
                                await User.updateOne({_id:id},{$set:{numero:number}});
                            }if(wilayatch!=0){
                                await User.updateOne({_id:id},{$set:{wilaya:wilayatch}})
                            }if(image){
                                await User.updateOne({_id:id},{$set:{photo_profille:image}})
                            }
                             resolve('information enreg');
                         }else{
                             rejects("mot passe inccorect")
                         }
                     }).catch((err)=>{
                         console.log(err)
                     })
                     
                 }
 
             })
         })}
 

