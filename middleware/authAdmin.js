const { rejects } = require('assert');

const { resolve } = require('path');
const { nextTick } = require('process');

const info=require('../models/infUser');
const siAdmin=async(req,res,next)=>{
    
    const token=req.cookies.jwt;
   await info(token).then((infou)=>{
        if(infou.role=='admin'){
            
           next();
        }else{
            res.redirect('accueil')
        }

    })
}
module.exports=siAdmin;