
const mongoose=require('mongoose');
const { resolve } = require('path');
const getInfo = require('./infUser');

Artisan=require('./User');
var url="mongodb://localhost:27017/AlgCrafters";
exports.getartisan=(wly,met)=>{
    console.log(wly,met);
    return new Promise((resolve,reject)=>{
    
    mongoose.connect(url,{useNewUrlParser:true,useUnifiedTopology:true}).then(()=>{
        if((wly==0 && met==0)||(!wly && !met)){
        return Artisan.find({role:"artisan"},{fullname:1,metier:1,_id:1,wilaya:1});
        }else{
            if(met==0){
                return Artisan.find({role:"artisan",wilaya:wly},{fullname:1,_id:1,metier:1,wilaya:1});
            }else{
                if(wly==0){

                    return Artisan.find({role:"artisan",metier:met},{fullname:1,_id:1,metier:1,wilaya:1})
                }else{
                    return Artisan.find({role:"artisan",metier:met,wilaya:wly},{fullname:1,_id:1,metier:1,_id:1,wilaya:1});
                }}}
    }
    ).then(artrouve=>{
        mongoose.disconnect();
        resolve(artrouve);
    }).catch(err=>{
        console.log(err);
        mongoose.disconnect();
        reject(err);

    } ) 
})}
exports.getArtisanName=(name)=>{
    return new Promise((resolve,reject)=>{
        mongoose.connect(url,{useNewUrlParser:true,useUnifiedTopology:true}).then(async()=>{
            
            if(!name){
            return await Artisan.find({role:"artisan"})
        }else{
            
            return await Artisan.find({fullname:name,role:"artisan"})
        }
        }).then((artisan)=>{
            resolve(artisan)
        }).catch((err)=>{
            console.log(err);
        })

    })
}

