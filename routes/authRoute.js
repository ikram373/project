const express=require('express');
const router=express.Router();
const authController=require('../controller/authController');
const b=require('express').urlencoded({extends:true});
const requireAuth=require('../middleware/authMiddleware')
const auth=require('../middleware/auth')
const authArtisan=require('../middleware/authArtisan')
const authUser=require('../middleware/authUser')
const authAdmin=require('../middleware/authAdmin')
const multer=require('multer')
const storage=multer.diskStorage({
    destination:function(request,file,callback){
        callback(null,'./public/images')
    },
    
        filename:function(request,file,callback){
        callback(null,Date.now()+file.originalname);
        },
});
const uploade=multer({
    storage:storage,
    limits:{
        fileSize:1024*1024*3
    },
    
})
router.post('/posterPub',uploade.single('image'),authController.post_pub)
router.post('/connect',b,authController.post_login),
router.post('/inscrire',b,authController.post_signup),
router.get('/accueil',authController.get_home)
router.get('/connect',auth,authController.get_login)
router.get('/inscrire',auth,authController.get_sginup);

router.get('/logout',authController.get_logout)
router.post('/service',authController.service);

router.get('/profileUser',requireAuth,authController.get_profil);
router.get('/modifierprofile',requireAuth,authArtisan,authController.get_modifier);

// router.get('/modifierprofile',requireAuth,(req,res)=>{
//     res.render('modifierprofile')

// })
router.get('/modificationC',authUser,authController.get_modificationC);
router.post('/modificationC',requireAuth,uploade.single('image'),authController.post_modificationC);
router.get('/profile',authController.get_profileArtisan)
router.get('/profile/:id',requireAuth,authController.get_profileArtisan)

router.all('/recherche',authController.post_recherche)
router.post('/modifierprofile',requireAuth,uploade.single("image"),authController.post_modifier)
router.get('/posteService',requireAuth,authArtisan,authController.post_service)


router.get('/admin',requireAuth,authAdmin,authController.get_profil)
// router.get('/desc6',(req,res)=>{
//     res.render('desc6');

// })
// router.get('/desc7',(req,res)=>{
// res.render('desc7');
// })

router.post('/Sabonner',authController.abonneArtisan);
router.post('/Sedesabonner',authController.sedesabonnerArtisan)
router.post('/SedesabonnerU',authController.sedesabonnerA);
router.get('/users',authController.get_users);
router.post('/commentaire',authController.commentaire);
router.post('/signale1',requireAuth,(req,res)=>{
    // res.render('signale',{id:req.body.id})
    res.render('signale',{id:req.body.id})
    // console.log(req.body.id);
})
// router.get('/signale',)
router.post('/signale',authController.signale)
router.get('/abonement',authController.get_abonnement);
    
router.get('/commentaire',authController.get_commentaire);
router.get('/posterPub',requireAuth,authUser,(req,res)=>{
    res.render('posterPub')
})
// router.get('/addcatego',requireAuth,authAdmin,(req,res)=>{
//     res.render('addcatego')
// })
// 
router.get('/addcatego',requireAuth,authAdmin,authController.get_catego)
router.post('/addCategorie',uploade.single('image'),authController.add_catego);
router.post('/rechFullname',authController.rechFullname);
router.get('/bannir',authController.bannir
    
)
router.post('/verifie',authController.Verifie)
router.post('desctive',authController.desctive)






module.exports=router; 