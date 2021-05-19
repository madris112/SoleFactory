const express = require('express');
const user = require('../models/user');
const router = new express.Router();
const passport = require('passport');




//authorize with google
router.get('/auth/google', passport.authenticate('google',{scope: ['email', 'profile']}));


router.get('/auth/google/callback', passport.authenticate('google'), (req, res) =>{

    res.redirect('http://localhost:3000/home');

    // if(req.user){
    //     res.send({
    //         req.user,
    //         succode:"1"
    //     });
    // }
    // else{

    //     res.send(401);
   // }    

});


module.exports = router;