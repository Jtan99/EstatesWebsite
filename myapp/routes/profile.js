var express = require('express');
var router = express.Router();
var currSession = require('/myapp/routes/session');
var db = require('/myapp/routes/connection');

/* GET user Profile. */
router.get('/', currSession.checkSessionStatus, (req, res) => {
  // var user_name = req.session.user[0]["username"];
  // console.log("this is username: " + user_name);
  var query = `SELECT * FROM user WHERE username=?`;
  var input = [req.session.user[0]["username"]];
  db.connection.query(query, input, (err, results) => {
    if (err) console.log('ERRN:', err.message)
    else 
    // console.log('res', results);
    // console.log('info', results[0].username);
    var user_info = results[0];
    res.render('profile', {username: user_info.username, email: user_info.email, password: user_info.password, full_name: user_info.full_name, role: user_info.role});
  
  });
});




module.exports = router;