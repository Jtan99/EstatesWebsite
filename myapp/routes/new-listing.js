var express = require('express');
var router = express.Router();
var currSession = require('/myapp/routes/session');
var db = require('/myapp/routes/connection');

/* GET new listing page. */
router.get('/', currSession.checkSessionStatus, function(req, res, next) {
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
        res.render('new-listing', {full_name: user_info.full_name});
      }
    });
    
    
});
module.exports = router;
