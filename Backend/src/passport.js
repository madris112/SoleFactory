require('dotenv').config();
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const LocalStrategy = require('passport-local').Strategy;
const User = require('./models/user');
const sha = require('sha256');

passport.serializeUser((user, done) => {
  done(null, user.username);
});

passport.deserializeUser((user_name, done) => {

    const getuser = User.findOne({
        username: user_name
    });

    done(null, getuser);

});

// passport.use(new LocalStrategy({

//     function(user_name,pass,cb){

//          try {

//             User.findOne({username: user_name,}).then((doc) => {
//                 if (!doc) {
//                     try {

//                     const nweuser = User.create({
//                      username: profile.id,
//                      firstname:profile.name.givenName,
//                      lastname:profile.name.familyName,
//                      email:profile.emails[0].value,
//                      mobile:"0000000000",
//                      password:sha(profile.id + profile.name.givenName),
//                      gstno:"currentGst"
//                         }).then((docs) => {
//                             console.log(docs);
                            
//                         });

//                         return cb(null, newuser);
//                     } catch (error) {

//                         console.log('error wapsa');
                        
//                     }
//                 } else{

//                     return cb(null, doc);
                    
//                 }
//             });
            
            
//         } catch (error) {

//             console.log('error');
            
//         }

//     }

// }));

passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: process.env.CALLBACK_URL
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
               username: profile.id,
               firstname:profile.name.givenName,
               lastname:profile.name.familyName,
               email:profile.emails[0].value,
               mobile:"0000000000",
               password:sha(profile.id + profile.name.givenName),
               gstno:"currentGst"
                        }).then((docs) => {
                            console.log(docs);
                            
                        });

                        return cb(null, newuser);
                    } catch (error) {

                        console.log('error wapsa');
                        
                    }
                } else{

                    return cb(null, doc);
                    
                }
            });
            
            
        } catch (error) {

            console.log('error');
            
        }


      

      
     }));