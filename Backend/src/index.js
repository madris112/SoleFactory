const express       = require('express');
const bodyparser    = require('body-parser');
const cookieSession = require('cookie-session');
const authRoute     = require('./routes/auth');
const mongoose      = require('mongoose');
const passport      = require('passport');
const cors          = require('cors');
require('./passport');

const app = express();

app.use(bodyparser.urlencoded({ extended: true }))

app.use(express.json());

app.use(cors());

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE");
    res.header("Access-Control-Allow-Headers", "Content-Type");
    next();// Unhandled 'error' event
});

app.use(
  cookieSession({
    name  : "session",
    keys  : ["myCookie"],
    maxAge: 24 * 60 * 60 * 100
  })
);



app.use(passport.initialize());
app.use(passport.session());

app.use(authRoute);



app.listen(4000, () => {
    console.log(`Server started on port:4000`);
});