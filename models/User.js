const mongoose=require('mongoose');
const schemaAuth=mongoose.Schema({
    email:String,
    fullname:String,
    password:String,
    role:String,
    numero:Number,
    wilaya:String,
    metier:String,
    nbuser:Number,
    nbartisan:Number,

})
User=mongoose.model('user',schemaAuth);
module.exports=User;