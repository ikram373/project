
const mongoose=require('mongoose');
// const schemaArt=mongoose.Schema({
//     fullname:String,
//     metier:String,
//     wilaya:String,
//     role:Boolean,
// })
// Artisan=mongoose.model('users',schemaArt);
Artisan=require('./User');
var url="mongodb://localhost:27017/AlgCrafters";
exports.getartisan=(wly,met)=>{
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
                }
            }
       
        }

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

