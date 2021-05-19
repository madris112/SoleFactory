const express = require('express');
const bodyparser = require('body-parser');
const cookieSession = require('cookie-session');
const authRoute = require('./routes/auth');
const mongoose = require('mongoose');
const passport = require('passport');
const cors = require('cors');
require('./passport');

const app = express();

app.use(bodyparser.urlencoded({ extended: true }))

app.use(
  cors({
    origin: "http://localhost:3000", // allow to server to accept request from different origin
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    credentials: true // allow session cookie from browser to pass through
  })
);

app.use(
  cookieSession({
    name: "session",
    keys: ["myCookie"],
    maxAge: 24 * 60 * 60 * 100
  })
);



app.use(passport.initialize());
app.use(passport.session());

app.use(authRoute);



app.listen(4000, () => {
    console.log(`Server started on port:4000`);
});