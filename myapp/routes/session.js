var express = require('express');
var session = require("express-session");
var router = express.Router();

router.use(
  session({
    key: "user_sid",
    secret: "thisismySecretKEY",
    resave: false,
    saveUninitialized: false,
    cookie: {
      expires: 600000,
    },
  })
);

router.use((req, res, next) => {
  if (req.cookies.user_sid && !req.session.user) {
    res.clearCookie("user_sid");
  }
  next();
});

module.exports = router;