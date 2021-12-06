var express = require('express');
var router = express.Router();
var path = require('path');
var currSession = require('/myapp/routes/session');
var db = require('/myapp/routes/connection');

router.get("/", currSession.checkSessionLoggedIn, (req, res) => {
  res.redirect("/login");
})

router.get('/login', currSession.checkSessionLoggedIn, (req,res) => {
  console.log(path.join(__dirname, '../views/login.html'))
  res.sendFile(path.join(__dirname, '../views/login.html'));
});

router.post('/login', (req,res) => {
  var query = `SELECT username FROM user WHERE username=? AND password=?`;
  var input = [req.body.username, req.body.password];
  console.log("req.body is", req.body);
  db.connection.query(query, input , (err, user) => {
    //here goes to homepage
    console.log(user)
    if (user.length == 0) {
      //prompt user failure
      console.log("login failed")
      return;
    }
    //redirect to homepage here
    console.log("login successful")
    req.session.user = user;
    res.redirect("/homepage");
  });
});

router.get("/logout", (req, res) => {
  if (req.session.user && req.cookies.user_sid) {
    res.clearCookie("user_sid");
    res.redirect("/login");
  } else {
    res.redirect("/login");
  }
});

router.get('/register', (req, res)=> {
  res.sendFile(path.join(__dirname, '../views/register.html'));
});

router.post('/register', (req, res) =>{
  var query = "INSERT " +
    "INTO user(username, email, password, full_name, role) " +
    "VALUES(?,?,?,?,?)";
  var input = [
    req.body.username,
    req.body.email,
    req.body.password,
    req.body.full_name,
    "regular"
  ];
  db.connection.query(query, input , (err, user) => {
    //here goes to homepage
    console.log(user)
    if (err) {
      //prompt user failure
      console.log(err)
      return;
    }
    //redirect to homepage here
    console.log("added to db")
    res.redirect('/');
  });
});

module.exports = router;
