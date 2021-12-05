var express = require('express');
var router = express.Router();
var currSession = require('/myapp/routes/session');
var db = require('/myapp/routes/connection');

/* GET user Profile. */
router.get('/', currSession.checkSessionStatus, (req, res) => {
  res.render('profile');

  db.connection.query('select * from users', (err, results) => {
    if (err) console.log('ERRN:', err.message)
    else 
    console.log('res', results)
  });
});

module.exports = router;