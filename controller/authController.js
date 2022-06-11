
const mongoose=require('mongoose');
const express=require('express');
const bcrypt=require('bcrypt');
const authModels=require('../models/authModel');
const jwt =require('jsonwebtoken');
const cookie=require('cookie-parser');
const session=require('express-session');
// const flash=require('connect-flash');
const artisan=require('../models/trouve'); 
const metier=require('../models/metierWilaya');
const wilaya=require('../models/metierWilaya');
const modifier=require('../models/modifierprofile');
const { render } = require('ejs');
const app=express();
const info=require('../models/infUser');
app.use(express.json())
const service=require('../models/post');
var users;
var role;
let id;
var met;
var wly;
const ajouter=require('../models/ajouter')
metier.getmetier().then((m)=>{
    met=m;
    
})
wilaya.getwilaya().then((w)=>{
wly=w;
})


const jwt_secret='this is jsonwebtokn scret of my webapp djnujefbcycjdfbgf'
const maxage=3*24*60*60;
const creatToken=(id)=>{
    return jwt.sign({id},jwt_secret,{expiresIn:maxage});
}
module.exports.get_login=(req,res)=>{
    res.render('connect',{message:req.flash('error')});
    // console.log(req.flash('error'));
}
module.exports.get_sginup=(req,res)=>{
    res.render('inscrire',{message:req.flash('error')});
}
module.exports.get_home=(req,res)=>{
    // metier.getmetier().then((met)=>{
        // wilaya.getwilaya().then((wly)=>{
        res.render('accueil',{verifUser:req.cookies.jwt,metiers:met,wilaya:wly});
    // })
    // })

}
module.exports.post_modifier=(async(req,res)=>{

   await info(req.cookies.jwt).then((info)=>{
       console.log(info.id)
    modifier.profileU(info.id,req.body.nom,req.body.password,req.body.passwordConf).then((mesg)=>{
        
        res.redirect('profileUser')
    }).catch(()=>{
        res.redirect('profileUser');
    })
    
    // modifier.profileU(id,req.body.nom,req.body.password,req.body.passwordConf).then((mesg)=>{
    //     console.log(mesg);
    //     res.redirect('profileUser');
    // }).catch((err)=>{
    //     console.log(err);
    // })

})
})
module.exports.get_profil=async(req,res)=>{
       await info(req.cookies.jwt).then((info)=>{
        
     users=info;

     console.log(users);

    })
    if(users.role=="artisan"){
        res.render('Profile-crafter',{users})
    }else{
        if(users.role=="user"){
    res.render('profileUser',{users});
        }else{
            let total=users.nbartisan+users.nbuser;
            res.render('admin',{users,total});
        }
    }
    

}
// module.exports.modifier=async(req,res)=>{
//    await info(req.cookies.jwt).then((info)=>{
// modifier.profileA(info.id,req.body.nom,req.body.password,req.body.passwordConf).then(()=>)
//    })
// }
module.exports.get_logout=(req,res)=>{{}
    res.cookie('jwt','',{maxage:1});
    res.redirect('connect');
}
module.exports.post_recherche=async(req,res)=>{
    
    artisan.getartisan(req.body.wlychoose,req.body.metchoose).then(async(artouve)=>{
       
       if(req.cookies.jwt){ await info(req.cookies.jwt).then((info)=>{

            role=info.role;
           })}
        res.render('recherche',{verifUser:req.cookies.jwt,art:artouve,metiers:met,wilaya:wly,role:role})
    
    // })
    // })
    }).catch((err)=>{
        console.log(err);
    })}
    module.exports.service=(req,res)=>{
        console.log(req.body.wlychoose,req.body.metchoose,req.body.number);
      service(req.cookies.jwt,req.body.wlychoose,req.body.metchoose,req.body.number).then(async()=>{
         
          res.redirect('profileUser')
          await ajouter.ajouterartisan();
      }).catch(()=>{
          res.redirect('posteService');
      }) 
    }
module.exports.get_profileArtisan=(req,res)=>{
    let id=req.params.id;
    // metier.getmetier().then((met)=>{})
    authModels.get_Artisan(id).then((artisan)=>{
        // console.log(artisan)
        res.render('profile',{artisan:artisan});
    })
    

}
module.exports.post_service=(req,res)=>{
    res.render('posteService',{metiers:met,wilayas:wly})

}
module.exports.post_signup=async(req,res)=>{
    authModels.signupFunctionModel(req.body.email,req.body.fullname,req.body.password,req.body.passwordConf).then((userid)=>{
        
        const token=creatToken(userid);
        res.cookie('jwt',token,{httpOnly:true,maxAge:maxage*1000});
       
        id=userid;
        res.redirect('profileUser');
    }).catch((err)=>{
         console.log(err);
        req.flash('error',err)
        res.redirect('inscrire');
    })
    

} 
module.exports.post_login=(req,res)=>{
    authModels.loginFunctionModel(req.body.email,req.body.password).then((userid)=>{

        const token=creatToken(userid);
        res.cookie('jwt',token,{httpOnly:true,maxAge:maxage*1000});
       
        id=userid;
       
        res.redirect('profileUser');
    
        
        
      

    }).catch((err)=>{
        console.log(err);
       
        req.flash('error',err);
        res.redirect('connect');
    })
}
