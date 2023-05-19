
const { string } = require("joi");
const  mongoose  = require("mongoose");
const { resolve } = require("path");
const schemaMet=mongoose.Schema({
    id:String,
    metier:String,
    value:Number,
    icon:String,
    photo:String,
    // value:number,
    
})

Metier=mongoose.model('metiers',schemaMet);
var url="mongodb://localhost:27017/AlgCrafters";
exports.getmetier=()=>{
    return new Promise((resolve,reject)=>{
        mongoose.connect(url,{useNewUrlParser:true,useUnifiedTopology:true}).then(()=>{
            return Metier.find({});
        }).then((metier)=>{
            
            resolve(metier);
            mongoose.disconnect();
        }).catch((err)=>{
            mongoose.disconnect();
            reject(err);

        })
        
    })
}
const schemaWly=mongoose.Schema({
    id:String,
    nom:String,
    value:Number,
})
Wilaya=mongoose.model('wilayat',schemaWly);
exports.getwilaya=()=>{
    return new Promise((resolve,reject)=>{
        mongoose.connect(url,{useNewUrlParser:true,useUnifiedTopology:true}).then(()=>{
            return Wilaya.find({});
        }).then((wilaya)=>{
            resolve(wilaya);
            mongoose.disconnect();
        }).catch((err)=>{
            mongoose.disconnect();
            reject(err);

        })
        
    })
}

exports.add_met=(icon,name)=>{
    return new Promise((resolve,reject)=>{
        mongoose.connect(url,{useNewUrlParser:true,useUnifiedTopology:true}).then(()=>{
        
            if(!icon||!name){
                reject('entre touts les champs')
            }else{
                
                let met=new Metier({
                    metier:name,
                    icon:icon,
                })
                met.save();
                resolve('metier bien ajouter')
            }
        }).catch((err)=>{
            console.log(err)
        })

    })
}
