var express = require('express');
var router = express.Router();
var path = require('path');
var currSession = require('/myapp/routes/session');

/* GET user homepage. */
router.get('/', currSession.checkSessionStatus, (req, res) => {
  console.log(req.session);
  currSession.connection.query('SELECT * FROM Users' , (err, rows) => {
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

module.exports = router;