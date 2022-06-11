const express=require('express');
const router=express.Router();
const authController=require('../controller/authController');
const b=require('express').urlencoded({extends:true});
const requireAuth=require('../middleware/authMiddleware')
router.post('/connect',b,authController.post_login),
router.post('/inscrire',b,authController.post_signup),
router.get('/accueil',authController.get_home)
router.get('/connect',authController.get_login)
router.get('/inscrire',authController.get_sginup);

router.get('/logout',authController.get_logout)
router.post('/service',authController.service);

router.get('/profileUser',requireAuth,authController.get_profil);


router.get('/modifierprofile',requireAuth,(req,res)=>{
    res.render('modifierprofile')

})
router.get('/modificationC',(req,res)=>{
    res.render('modificationC');
})

router.get('/profile/:id',requireAuth,authController.get_profileArtisan)

router.all('/recherche',authController.post_recherche)
router.post('/modifierprofile',authController.post_modifier)
router.get('/posteService',authController.post_service)
// router.get('/modifier',authController.modifier)

router.get('/admin',(req,res)=>{
    res.render('admin');

})
router.get('/desc6',(req,res)=>{
    res.render('desc6');

})
router.get('/desc7',(req,res)=>{
res.render('desc7');
})


module.exports=router; 