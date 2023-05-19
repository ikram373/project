const jwt=require('jsonwebtoken');
const jwt_secret='this is jsonwebtokn scret of my webapp djnujefbcycjdfbgf'
// var token;
const verifyToken=(req,res,next)=>{
    const token=req.cookies.jwt;
    if(!token){
        res.redirect('/connect')
    }else{
        jwt.verify(token,jwt_secret,(err,decodedToken)=>{
            if(err){
                res.redirect('/connect')
            }else{
            
                next();
            }
        })
    }
}

module.exports=verifyToken;