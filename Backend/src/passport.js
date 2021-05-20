require('dotenv').config();
const passport       = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const LocalStrategy  = require('passport-local').Strategy;
const User           = require('./models/user');
const sha            = require('sha256');

passport.serializeUser((user, done) => {
  done(null, user.username);
});

passport.deserializeUser((user_name, done) => {

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
                try {
                     const newuser = User.create({
                     username : username,
                     firstname: req.body.firstname,
                     lastname : req.body.lastname,
                     email    : req.body.email,
                     mobile   : req.body.mobile,
                     password : sha(req.body.password),
                     gstno    : req.body.gstno
                    }).then((docs) => {
                        console.log(docs);
                        return done(null, docs);
                    });
                    
                } catch (error) {
                    console.log('Error Occured in CATCH' + error);
                }
            } else{
                console.log("passportjs: doc found");
                console.log(doc);
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
               username : profile.id,
               firstname: profile.name.givenName,
               lastname : profile.name.familyName,
               email    : profile.emails[0].value,
               mobile   : "0000000000",
               password : sha(profile.id + profile.name.givenName),
               gstno    : "currentGst"
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