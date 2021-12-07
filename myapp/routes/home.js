var express = require('express');
var router = express.Router();
var path = require('path');
var currSession = require('/myapp/routes/session');
var db = require('/myapp/routes/connection');

/* GET user homepage. */
router.get('/', currSession.checkSessionStatus, (req, res) => {
  console.log(req.session);
  var query = `SELECT * FROM user WHERE username=?`;
  var input = [req.session.user[0]["username"]];
  db.connection.query(query, input, (err, rows) => {
    if(err){
      res.json({
        success: false,
        err
        });
    }
    else{
      var user_info = rows[0];
      res.render('home', {full_name: user_info.full_name});
      // res.sendFile(path.join(__dirname, '../views/home.html'));
      // res.json({
      //   success: true,
      //   rows
      //   });
    }
  });
});

module.exports = router;