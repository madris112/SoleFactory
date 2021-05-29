const express  = require('express');
const passport = require('passport');
const router   = new express.Router();
const user     = require('../models/user');
const productRating = require('../models/productRating');
const productRatingIpDetails = require('../models/productRatingIpDetails');
const product    = require('../models/product');

// router.post('/product/getrating', function(req,res){

//    productRating.findOne({ prodid: req.body.prodid},function(err,doc){
//      if(err) throw err;
//      if (!doc) {
//          res.status(200).send({
//              message:"user not found!"

//          })
//      } else{
//         // console.log("findingratinggg")
//          res.status(200).send({
//              prodrate: doc.rating
//          })

//      }
//    })

// });

router.post('/product/getrating', function(req,res){

  product.findOne({ _id: req.body.prodid},function(err,doc){
    if(err) throw err;
    if (!doc) {
        res.status(200).send({
            message:"user not found!"
        })
    } else{
        res.status(200).send({
            prodrate: doc.Rating
        })
    }
  })

});

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
  console.log(req.user);
  res.status(200).send({
    message : "Logout Successful!",
    redirect: "/",
  });
});

router.get('/getuser', function(req,res){
  console.log(req.query.usrname);
   user.findOne({
         username: req.query.usrname,
     }).then((doc) => {
         if (!doc) {
             res.status(200).send({
                 message:"user not found!"

             })
         } else{

             res.status(200).send({
                 retuser: doc
             })

         }
     });

});

router.post("/update",(req, res)=>{

  console.log(req.body);
  console.log("inside update");
  try {

    var coinval = "0";
    if(req.body.isngo){
      coinval = "1000";
    }

    user.updateOne({
        username: req.body.username,
    }, {
        firstname: req.body.firstname,
        lastname : req.body.lastname,
        mobile   : req.body.mobile,
        gstno    : req.body.gstno,
        ngoid    : req.body.ngoid,
        Type     : req.body.isngo,
        CoinAmt  : coinval,
        IsActivated: "1"
    }
    , (err) => {
       if(err){
           res.status(400).send({
             message:"something went wrong",
           });
       }
    });

    res.status(200).send({
      message:"Information updated successfully",
      redirect:"/home"
    })

  } catch (error) {

  }
})


module.exports = router;
