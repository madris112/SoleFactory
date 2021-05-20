const express  = require('express');
const user     = require('../models/user');
const router   = new express.Router();
const passport = require('passport');


//local passport
router.post('/auth/signin', 
  passport.authenticate('local', { failureRedirect: 'http://localhost:3000/',}),
  function(req, res,next) {
      

      if(req.user) {
          res.status(200).send({
              message    : "login succesful!",
              redirect   : "/home",
              successcode: "1",
              user       : req.user,
              cookies    : req.cookies
          });
          
      }

      
  });


//authorize with google
router.get('/auth/google', passport.authenticate('google',{scope: ['email', 'profile']}));


router.get('/auth/google/callback', passport.authenticate('google'), (req, res) =>{

    res.redirect('http://localhost:3000/home');
  

});



router.get('/auth/login-success',(req, res, next) =>{
  console.log(req.session);
  res.status(200).send({
    message: "done",
  });
})


module.exports = router;