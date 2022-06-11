
const { string } = require("joi");
const  mongoose  = require("mongoose");
const schemaMet=mongoose.Schema({
    id:String,
    metier:String,
    value:Number,
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
