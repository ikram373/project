

const path  = require('path')
const bcrypt=require('bcrypt');
const jwt =require('jsonwebtoken');
const mongoose=require('mongoose');
const { resolve } = require('path');
// const ajouter=require('./ajouterUser');
// ajouter=require('../models/ajouter');
const ajouter=require('./ajouter');
User=require('../models/User');
var url="mongodb://localhost:27017/AlgCrafters"

module.exports.get_Artisan=async(id)=>{
    return new Promise((resolve,reject)=>{
        mongoose.connect(url,{useNewUrlParser:true,useUnifiedTopology:true}).then(()=>{
            return User.findOne({_id:id})
        }
        ).then((user)=>{
            resolve(user);

        }).catch((err)=>{
            reject(err);

        })

    }) 
   

}
module.exports.signupFunctionModel=async(email,fullname,password,passwordConf)=>{
    return new Promise ((resolve,reject)=>{
        mongoose.connect(url,{useNewUrlParser:true,useUnifiedTopology:true}).then(()=>{
             return User.findOne({email:email})
        }).then( (User)=>{
            if(User){
                mongoose.disconnect();
                reject('email existe')
            }else{
             if(password==passwordConf) {
                return( bcrypt.hash(password,8));
            }else{
                reject('password are not the same')}}
        }).then((hpassword)=>{
            if(hpassword.length>0){
            let user=new User({
                email:email,
                fullname:fullname,
                password:hpassword,
                role:"user",
                nbrbanneier:0,
                photo_profille:'user.jpg',
                desctive:false
            })
            return user.save();
        }}).then(async(user)=>{  
       resolve(user._id)
        mongoose.disconnect();
          await ajouter.ajouteruser();  
        }).catch((err)=>{
            mongoose.disconnect();
            reject(err);
        })})}



module.exports.loginFunctionModel=(email,password)=>{
    return new Promise((resolve,reject)=>{
        mongoose.connect(url,{useNewUrlParser:true,useUnifiedTopology:true}).then(()=>{
            return User.findOne({email:email})
        }).then((user)=>{
            
            if (user){
                if(user.desctive){
                    reject("votre copmte n'existe pas")
                }else{
                bcrypt.compare(password,user.password).then((verif)=>{
                    if(verif){
                        resolve(user._id);
                       

                    }else{

                        mongoose.disconnect();
                        reject('mot pase incorrect')
                        
                    }

                })
            }}else{
                mongoose.disconnect();
                reject('email incorrect')
            }
        }
        ).catch((err)=>{
            mongoose.disconnect();
            reject(err);
        })
    }
    )
}

