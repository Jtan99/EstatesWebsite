var express = require('express');
var router = express.Router();
var path = require('path');

var mysql = require('mysql');
var connection = mysql.createPool({
  connectionLimit: 10,
  host: process.env.MYSQL_HOST || 'localhost',
  user: process.env.MYSQL_USER || 'root',
  password: process.env.MYSQL_PASSWORD || 'password',
  database: process.env.MYSQL_DATABASE || 'mydb'
});

var sessionChecker = (req, res, next) => {
  if (req.session.user && req.cookies.user_sid) {
    console.log("no session will have to login first")
    res.redirect("/homepage");
  } else {
    next();
  }
};

router.get("/", sessionChecker, (req, res) => {
  res.redirect("/login");
})

/* GET users listing. */
router.get('/homepage', (req, res) => {
  console.log(req.session)
  connection.query('SELECT * FROM Users' , (err, rows) => {
    if(err){
      res.json({
        success: false,
        err
        });
    }
    else{
      res.sendFile(path.join(__dirname, '../views/home.html'));
      // res.json({
      //   success: true,
      //   rows
      //   });
    }
  });
});

router.get('/login', (req,res) => {
  console.log(path.join(__dirname, '../views/login.html'))
  res.sendFile(path.join(__dirname, '../views/login.html'));
});

router.post('/login', (req,res) => {
  var query = `SELECT full_name, role FROM Users WHERE username=? AND password=?`;
  var input = [req.body.username, req.body.password];
  console.log("req.body is", req.body);
  connection.query(query, input , (err, user) => {
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
    "INTO Users(username, email, password, full_name, role) " +
    "VALUES(?,?,?,?,?)";
  var input = [
    req.body.username,
    req.body.email,
    req.body.password,
    req.body.full_name,
    "regular"
  ];
  connection.query(query, input , (err, user) => {
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
