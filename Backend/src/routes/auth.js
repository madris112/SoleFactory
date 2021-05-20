const express  = require('express');
const user     = require('../models/user');
const router   = new express.Router();
const passport = require('passport');


//local passport
router.post('/auth/signin', 
  passport.authenticate('local', { failureRedirect: 'http://localhost:3000/' }),
  function(req, res) {
      res.setHeader("Access-Control-Allow-Origin", "*");
      console.log(res);
      try {
          res.status(200).send({
          message: "yes I am back"
      });
          
      } catch (error) {
          console.log(error);
      }
      
  });


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