const User=require("./User");
const mongoose=require('mongoose');
const { resolve } = require("path");
const { rejects } = require("assert");
var url="mongodb://localhost:27017/AlgCrafters"

module.exports.verAbonne=(tab,idA)=>{
    var i=0;
    
    
   while(i<tab.length && tab[i]!=idA){
    i++
   }
   if(i==tab.length){
    return false;

   }else{
    return true;
   }


}
module.exports.AbonneA=(idA,idU)=>{
    return new Promise((resolve,rejects)=>{
        mongoose.connect(url,{useNewUrlParser:true,useUnifiedTopology:true}).then(async()=>{
            
            await User.update({_id:idU},{$push:{abonnements:idA}})
            // resolve('bien')
            return idA
        }
        ).then(async(idA)=>{
            await User.update({_id:idA},{$inc:{nombre_abonnes:1}})
            resolve('bien')
        }).catch((err)=>{
            rejects(err);
        }
        )

    })

}
module.exports.SedesabonnerA=(idA,idU)=>{
    return new Promise((resolve,rejects)=>{
        mongoose.connect(url,{useNewUrlParser:true,useUnifiedTopology:true}).then(async()=>{
            
            await User.updateOne({_id:idU},{$pull:{abonnements:idA}})
        
            // resolve('bien')
            return idA
        

        }).then(async(idA)=>{
            await User.update({_id:idA},{$inc:{nombre_abonnes:-1}})
            resolve('bien')
        })
        .catch((err)=>{
            rejects(err)
        })

    })
}
module.exports.abonnements=(id)=>{
    return new Promise((resolve,rejects)=>{
        mongoose.connect(url,{useNewUrlParser:true,useUnifiedTopology:true}).then(async()=>{
            return await User.findOne({_id:id})
        }).then((user)=>{
            resolve(user);
        }).catch((err)=>{
            console.log(err);
        })

    })
}