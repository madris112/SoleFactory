require('dotenv').config();
const passport       = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const LocalStrategy  = require('passport-local').Strategy;
const User           = require('./models/user');
const sha            = require('sha256');

passport.serializeUser((user, done) => {
 console.log("in serializeUser");
    done(null, user.username);
    
});

passport.deserializeUser((user_name, done) => {

    console.log("deserialized called");

    const getuser = User.findOne({
        username: user_name
    });



    done(null, getuser);

});

passport.use(new LocalStrategy({
  passReqToCallback: true
  },
  function(req,username,password,done){

      

      console.log("passport function");
    try {
        User.findOne({username: username,}).then((doc) => {
            if (!doc) {
                
                if(req.body.email == null){
                    

                    return done(null, false);

                }else{

                    let coinval = "0";

                    if(req.body.isngo === "1"){

                        coinval = "100";
                    }
                try {
                     const newuser = User.create({
                     username   : req.body.username,
                     firstname  : req.body.firstname,
                     lastname   : req.body.lastname,
                     email      : req.body.email,
                     mobile     : req.body.mobile,
                     password   : sha(req.body.password),
                     gstno      : req.body.gstno,
                     ngoid      : req.body.ngoid,
                     IsActivated: "1",
                     IsOauth    : "0",
                     Type       : req.body.isngo,
                     CoinAmt    : coinval
                    }).then((docs) => {
                        // console.log(docs);
                        return done(null, docs);
                    });
                    
                } catch (error) {
                    console.log('Error Occured in CATCH' + error);
                    return done(null,false);         
                }
            }
            } else{
                console.log("passportjs: doc found");
                // console.log(doc);
              const pass = doc.password;
              if(pass === sha(password))
                return done(null, doc);
              else {
                console.log('Password does not match!')
              }
            }
        });
    } catch (error) {
      console.log('Error returns !');
    }

  }));

passport.use(new GoogleStrategy({
    clientID    : process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL : process.env.CALLBACK_URL
  },

  function(accessToken, refereshToken , profile, cb) {

    //   console.log(profile);
    //   cb(null,profile);

            //   const newuser = new User({


 
        try {

            User.findOne({email: profile.emails[0].value,}).then((doc) => {
                if (!doc) {
                    try {

                        const nweuser = User.create({
                        username   : profile.id,
                        firstname  : profile.name.givenName,
                        lastname   : profile.name.familyName,
                        email      : profile.emails[0].value,
                        mobile     : "0000000000",
                        password   : sha(profile.id + profile.name.givenName),
                        gstno      : "currentGst",
                        ngoid      : "0",
                        IsActivated: "0",
                        IsOauth    : "1",
                        Type       : "0",
                        CoinAmt    : "0",
                        }).then((docs) => {
                            console.log(docs);
                            
                        });

                        return cb(null, newuser);
                    } catch (error) {

                        console.log('creating user document failed[passport.js : 101] :' + error);
                        
                    }
                } else{

                    return cb(null, doc);
                    
                }
            });
            
            
        } catch (error) {

            console.log('error [passport.js : 114]' + error);
            
        }


      

      
     }));

    