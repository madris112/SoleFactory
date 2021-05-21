const express       = require('express');
const bodyparser    = require('body-parser');
const cookieSession = require('cookie-session');
const session       = require("express-session");
const authRoute     = require('./routes/auth');
const product       = require('./routes/allproduct');
const mongoose      = require('mongoose');
const passport      = require('passport');
const cors          = require('cors');
const cookieParser  = require('cookie-parser');
const User          = require('./models/user');
require('./passport');

const app = express();

app.use(bodyparser.urlencoded({ extended: true }))

app.use(express.json());

app.use(
  cors({
    origin     : "http://localhost:3000",            // allow to server to accept request from different origin
    methods    : "GET,HEAD,PUT,PATCH,POST,DELETE",
    credentials: true                                // allow session cookie from browser to pass through
  })
);
// app.use(function (req, res, next) {
//     res.header("Access-Control-Allow-Origin", "*");
//     res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE");
//     res.header("Access-Control-Allow-Headers", "Content-Type");
//     next();// Unhandled 'error' event
// });

app.use(
  cookieSession({
    name  : "session",
    keys  : ["myCookie","onemore"],
    maxAge: 24 * 60 * 60 * 100
  })
);

app.use(cookieParser());



app.use(passport.initialize());
app.use(passport.session());

app.use(
  cors({
    origin     : "http://localhost:3000",            // allow to server to accept request from different origin
    methods    : "GET,HEAD,PUT,PATCH,POST,DELETE",
    credentials: true                                // allow session cookie from browser to pass through
  })
);

// app.get('/localcheck?id',(req, res)=>{
//   User.findOne({
//       field: filter,
//   }).then((doc) => {
//       if (!doc) {
//           console.log("message")
//       } else{
          
//       }
//   });
// })

app.use(authRoute);
app.use(product);

const authcheck = (req,res,next) => {
  console.log("called");
  if(!req.user){
    console.log(req.user);
    res.status(200).send({
      message : "Unauthorized Access!",
      redirect: "/"
    });
  } else {
    next();
  }
};

app.get('/check',authcheck,(req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");

  console.log("check also called");

  res.status(200).send({
    message: "Authorized Access",

  });

});



app.listen(4000, () => {
    console.log(`Server started on port:4000`);
});