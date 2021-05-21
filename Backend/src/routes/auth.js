const express  = require('express');
const user     = require('../models/user');
const router   = new express.Router();
const passport = require('passport');


router.get('/auth/failure',(req,res)=>{
     res.status(200).send({
         message: " wrong Credentials!"
     });
});


//local passport
router.post('/auth/signin', 
  passport.authenticate('local', { failureRedirect: '/auth/failure',}),
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

router.get('/logout', function(req, res){
  req.logout();
  res.status(200).send({
    message : "Logout Successful!",
    redirect: "/",
  })
});


module.exports = router;