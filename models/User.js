const { array } = require('joi');
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
    abonnements:Array,
    nbrbanneier:Number,
    commenter:Array,
    pub:Array,
    photo_profille:String,
    nombre_pub:Number,
    nombre_abonnement:Number,
    nombre_abonnes:Number,
    tab_signale:Array,
    desctive:Boolean,



})
User=mongoose.model('user',schemaAuth);
module.exports=User;