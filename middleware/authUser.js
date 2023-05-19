const { rejects } = require('assert');
const jwt=require('jsonwebtoken');
const { resolve } = require('path');
const { nextTick } = require('process');
const jwt_secret='this is jsonwebtokn scret of my webapp djnujefbcycjdfbgf'
const info=require('../models/infUser');

const siUser=async(req,res,next)=>{
    
    const token=req.cookies.jwt;
   await info(token).then((infou)=>{
   
        if(infou.role=='user'){
            
            res.redirect('accueil')
        }else{
            next()
        }

    })
}
module.exports=siUser;