const { rejects } = require('assert');
const mongoose=require('mongoose');
const { resolve } = require('path');
const User=require('./User');
var url="mongodb://localhost:27017/AlgCrafters"
module.exports.ajouterCommentaire=(idC,idU,commenter)=>{
    return new Promise((resolve,rejects)=>{
        console.log('dfjvbjfvb')
        mongoose.connect(url,{useNewUrlParser:true,useUnifiedTopology:true}).then(async()=>{
            // console.log(idC);
            // console.log(idU);
            console.log(commenter)
           await User.updateOne({_id:idC},{$push:{commenter:[commenter,idU]}})
           resolve('bien')


        }).catch((err)=>{
            console.log(err);
        })

    })
}
