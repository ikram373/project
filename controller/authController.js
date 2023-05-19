
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
const abonne=require('../models/abonne');
const getUsers=require('../models/allUsers')
const commenter=require('../models/commentaire')
const ajouterPub=require('../models/pub');
const addMetier=require('../models/metierWilaya');
const getinfo=require("../models/infobyid")
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
}
module.exports.get_sginup=(req,res)=>{
    res.render('inscrire',{message:req.flash('error')});
}
module.exports.get_home=async(req,res)=>{
    if(req.cookies.jwt){ await info(req.cookies.jwt).then((infoa)=>{

        role=infoa.role;
       })}
        res.render('accueil',{verifUser:req.cookies.jwt,metiers:met,wilaya:wly,role});
   

}
module.exports.get_modificationC=(req,res)=>{
    res.render('modificationC',{message:req.flash('mesg'),wilaya:wly});
}
module.exports.get_modifier=(req,res)=>{
    res.render('modifierprofile',{message:req.flash('mesg')})

}
module.exports.post_modificationC=(async(req,res)=>{
    await info(req.cookies.jwt).then((info)=>{
        modifier.profileA(info._id,req.file.filename,req.body.nom,req.body.password,req.body.passwordConf,req.body.number,req.body.wlychoose).then((mesg)=>{
            
        
            req.flash('mesg',mesg);
        
            res.redirect('profileUser')
        }).catch((err)=>{
            req.flash('mesg',err);
            res.redirect('profileUser');
        })   
    })
})
module.exports.post_modifier=(async(req,res)=>{
    

   await info(req.cookies.jwt).then((info)=>{
    modifier.profileU(info.id,req.body.nom,req.body.password,req.body.passwordConf,req.file.filename).then((mesg)=>{
        req.flash('mesg',mesg);
        res.redirect('profileUser')
    }).catch((err)=>{
        req.flash('mesg',err);
        res.redirect('modifierprofile');
    })
})

// {
 
//     await info(req.cookies.jwt).then(async(users)=>{
//         let tab =[];
//             let i=0;
//             let length=users.abonnements.length;
//             for(let i=0;i<length;i++){
//                await abonne.abonnements(users.abonnements[i]).then((infoA)=>{
//                 tab[i]=infoA;
            
//               })
            
//             }
            
//             res.render('abonnements',{users,tab})
//     })
//    }
})
module.exports.get_profil=async(req,res)=>{
       await info(req.cookies.jwt).then(async(info)=>{
        
     users=info;
    if(users.role=="artisan"){
        let tab =[];
                    let i=0;
                    let length=info.abonnements.length;
                    for(let i=0;i<length;i++){
                       await abonne.abonnements(info.abonnements[i]).then((infoA)=>{
                        tab[i]=infoA;
                    
                      })
                    
                    }
        res.render('Profile-crafter',{users,wilaya:wly,tab,message:req.flash('mesg')})
    }else{
        if(users.role=="user"){
            let tab =[];
            let i=0;
            let length=users.abonnements.length;
            for(let i=0;i<length;i++){
               await abonne.abonnements(users.abonnements[i]).then((infoA)=>{
                tab[i]=infoA;
            
              })
            
            }
            res.render('profileUser',{users,tab});
        }else{
            // let total=users.nbartisan+users.nbuser;
            // res.render('admin',{users,total});
            res.render('admin',{users});
        }}})}

module.exports.get_logout=(req,res)=>{{}
    res.cookie('jwt','',{maxage:1});
    res.redirect('connect');
}
module.exports.post_recherche=async(req,res)=>{ 
    await artisan.getartisan(req.body.wlychoose,req.body.metchoose).then(async(artouve)=>{
       if(req.cookies.jwt){ await info(req.cookies.jwt).then((infoa)=>{
            role=infoa.role;
           })}
        res.render('recherche',{verifUser:req.cookies.jwt,art:artouve,metiers:met,wilaya:wly,role:role})
    }).catch((err)=>{
        console.log(err);
    })}
    module.exports.service=(req,res)=>{
        
      service(req.cookies.jwt,req.body.wlychoose,req.body.metchoose,req.body.number).then(async()=>{
         
          res.redirect('profileUser')
          await ajouter.ajouterartisan()
          
      }).catch((err)=>{
        req.flash('mesg',err);
        res.redirect('posteService')
        console.log(err)
        
      }) 
    }
   
module.exports.get_profileArtisan=async(req,res)=>{
    let id=req.params.id;
    await info(req.cookies.jwt).then((info)=>{
        

    authModels.get_Artisan(id).then((artisan)=>{
        
       var verifierAbo=abonne.verAbonne(info.abonnements,req.params.id);
       
        res.render('profile',{artisan:artisan,verifierAbo:verifierAbo});
    })
})}

module.exports.sedesabonnerArtisan=async(req,res)=>{
    
    await info(req.cookies.jwt).then((info)=>{
        abonne.SedesabonnerA(req.body.id,info._id).then(async(mesg)=>{
       
          await authModels.get_Artisan(req.body.id).then(async(artisan)=>{
           
           
          await authModels.get_Artisan(info._id).then((infoUser)=>{
        
               var verifierAbo=abonne.verAbonne(infoUser.abonnements,req.body.id);
    
                res.render('profile',{artisan:artisan,verifierAbo:verifierAbo});
            })
           
        })
       })
        .catch((err)=>{
            console.log(err)
        })

    })
}
module.exports.sedesabonnerA=async(req,res)=>{
    await info(req.cookies.jwt).then((info)=>{
        abonne.SedesabonnerA(req.body.id,info._id).then((mesg)=>{
            res.redirect('profileUser')
        }).catch((err)=>{
            console.log(err)
        })

    })
}

module.exports.abonneArtisan=async(req,res)=>{
    
    await info(req.cookies.jwt).then((info)=>{
     abonne.AbonneA(req.body.id,info._id).then(async(mesg)=>{
       await authModels.get_Artisan(req.body.id).then( async(artisan)=>{
      authModels.get_Artisan(info._id).then((infoUser)=>{
            var verifierAbo=abonne.verAbonne(infoUser.abonnements,artisan._id);
            
             res.render('profile',{artisan:artisan,verifierAbo:verifierAbo});
            })
         })
    }).catch((err)=>{
        console.log(err);
    })
})
}
module.exports.post_pub=async(req,res)=>{
    
   await info(req.cookies.jwt).then(async(info)=>{
   await ajouterPub.ajouter_pub(info._id,req.file.filename,req.body.description).then(()=>{
    res.redirect('profileUser');
   })

   }).catch((err)=>{
    console.log(err)
   })
}
module.exports.get_users=async(req,res)=>{
    await getUsers().then((allUsers)=>{
        res.render('users',{users:allUsers})

    })


}

module.exports.add_catego=(req,res)=>{
    addMetier.add_met(req.file.filename,req.body.metier).then((mesg)=>{
        // metier.getmetier().then((m)=>{
        //     met=m;
            
        // })
        
        res.redirect('addcatego')

    }).catch((mesg)=>{
        res.redirect('/addcatego')
    })
}

module.exports.post_service=(req,res)=>{
    res.render('posteService',{metiers:met,wilayas:wly,message:req.flash('mesg')})

}
module.exports.commentaire=async(req,res)=>{
  
   
   await info(req.cookies.jwt).then(async(info)=>{
   
await commenter.ajouterCommentaire(req.body.id,info.fullname,req.body.commente).then((mesg)=>{
    })
      await authModels.get_Artisan(req.body.id).then((infoArtisan)=>{
        var verifierAbo=abonne.verAbonne(info.abonnements,infoArtisan._id);
            
             res.render('profile',{artisan:infoArtisan,verifierAbo:verifierAbo});
            })  
}) }
   module.exports.get_abonnement=async(req,res)=>{
 
    await info(req.cookies.jwt).then(async(users)=>{
        let tab =[];
            let i=0;
            let length=users.abonnements.length;
            for(let i=0;i<length;i++){
               await abonne.abonnements(users.abonnements[i]).then((infoA)=>{
                tab[i]=infoA;
            
              })
            
            }
            
            res.render('abonnements',{users,tab})
    })
   }
   module.exports.get_commentaire=async(req,res)=>{
    await info(req.cookies.jwt).then(async(users)=>{
        let tab=[];
        length=users.commenter.length;
        
       
            
            res.render('commentaire',{users})
        

    })

   }
   module.exports.rechFullname=async(req,res)=>{
  await  artisan.getArtisanName(req.body.fullname).then(async(artisan)=>{
    if(req.cookies.jwt){ await info(req.cookies.jwt).then((infoa)=>{

        role=infoa.role;
       })}
    res.render('recherche',{verifUser:req.cookies.jwt,art:artisan,metiers:met,wilaya:wly,role:role})


    })
   }
   module.exports.get_catego=async(req,res)=>{
    await metier.getmetier().then((m)=>{
        
        res.render('addcatego',{metiers:m})
        
    })
    
    res.render('addcatego',{metiers:met})
   }
   module.exports.signale=async(req,res)=>{
    console.log(req.body.id,req.body.checkedBoxes)
    await info(req.cookies.jwt).then(async(infoA)=>{
        
    await ajouter.ajoutersignale(infoA._id,req.body.ida,req.body.checkedvalues).then(async()=>{
        await authModels.get_Artisan(req.body.ida).then( async(artisan)=>{
            authModels.get_Artisan(infoA._id).then((infoUser)=>{
                  var verifierAbo=abonne.verAbonne(infoUser.abonnements,artisan._id);
                  
                   res.render('profile',{artisan:artisan,verifierAbo:verifierAbo});
                  })
               })
    }).catch((err)=>{
        console.log(err)
    })
})
   }
   module .exports.bannir=async(req,res)=>{
    
    await authModels.get_Artisan('629518f2972a81729e5eb754').then(async(infoAdmin)=>{
        let length=infoAdmin.tab_signale.length
        let tab=[];
        
        for (let i=0;i<length;i++){
            await authModels.get_Artisan(infoAdmin.tab_signale[i][0]).then(async(infoUser)=>{
              await  authModels.get_Artisan(infoAdmin.tab_signale[i][1]).then(async(infoArtisan)=>{
            tab[i]=[infoUser,infoArtisan,infoAdmin.tab_signale[i][2]]
    
              })
            })
            
        }
     

        
        res.render('bannir',{tab})
       
    })

   }
module.exports.Verifie=async(req,res)=>{
  await  ajouter.nbbannir(req.body.idartisan)
  res.redirect('/users')
    
}
module.exports.desctive=async(req,res)=>{
await ajouter.desctive(req.body.idartisan).then(()=>{
    res.redirect('/user')
})

}

module.exports.post_signup=async(req,res)=>{
    authModels.signupFunctionModel(req.body.email,req.body.fullname,req.body.password,req.body.passwordConf).then((userid)=>{
        
        const token=creatToken(userid);
        res.cookie('jwt',token,{httpOnly:true,maxAge:maxage*1000});
       
        id=userid;
        res.redirect('accueil');
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
