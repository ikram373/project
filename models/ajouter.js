const { rejects } = require('assert');
const mongoose=require('mongoose');
const { resolve } = require('path');
const User=require('../models/User');
var url="mongodb://localhost:27017/AlgCrafters"
module.exports.ajouterartisan=()=>{
    return new Promise((resolve,rejects)=>{
        mongoose.connect(url,{useNewUrlParser:true,useUnifiedTopology:true}).then(async()=>{
        console.log("aaa")
            await User.updateOne({email:'ikrammimi373@gmail.com'},{$inc:{nbartisan:1}})
            resolve('bien incr')

        }).catch((err)=>{
            console.log(err);
        })
    })
}
module.exports.ajouteruser=()=>{
    return new Promise((resolve,rejects)=>{
        mongoose.connect(url,{useNewUrlParser:true,useUnifiedTopology:true}).then(async()=>{
      
        await User.updateOne({email:'ikrammimi373@gmail.com'},{$inc:{nbuser:1}})
        

        }).catch((err)=>{
            console.log(err);
        })

    })
}
module.exports.ajoutersignale=(idu,ida,raison)=>{
    return new Promise((resolve,rejects)=>{
        mongoose.connect(url,{useNewUrlParser:true,useUnifiedTopology:true}).then(async()=>{
            if(!raison){
                rejects('il faut entre un raison')
                
            }else{
                await User.updateOne({email:'ikrammimi373@gmail.com'},{$push:{tab_signale:[idu,ida,raison]}})
        
                resolve('cbn')
            }
        })
        .catch((err)=>{
            console.log(err)
        })

    })
}
module.exports.nbbannir=(id)=>{
    return new Promise((resolve,rejects)=>{
        mongoose.connect(url,{useNewUrlParser:true,useUnifiedTopology:true}).then(async()=>{
          await  User.updateOne({_id:id},{$inc:{nbrbanneier:1}})
          resolve('bien')
        }).catch((err)=>{
            console.log(err)
        })

    })
}
module.exports.desctive=(id)=>{
    return new Promise((resolve,rejects)=>{
        mongoose.connect(url,{useNewUrlParser:true,useUnifiedTopology:true}).then(async()=>{
            await User.updateOne({_id:id},{desctive:true})
            resolve('bien')
        }).catch((err)=>{
            console.log(err)
        })

    })
}
