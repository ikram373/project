const jwt=require('jsonwebtoken');
const jwt_secret='this is jsonwebtokn scret of my webapp djnujefbcycjdfbgf'
const veriferConnecte=(req,res,next)=>{
   
        const token=req.cookies.jwt;
        if(!token){
            next();
        }else{
            jwt.verify(token,jwt_secret,(err,decodedToken)=>{
                if(err){
                    next();
                }else{
                    res.redirect('/accueil');
                }
            })
        }
    

}
module.exports=veriferConnecte;