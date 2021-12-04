var express = require('express');
var router = express.Router();
var currSession = require('/myapp/routes/session');

/* GET user Profile. */
router.get('/', currSession.checkSessionStatus, (req, res) => {
  res.render('profile');

  currSession.connection.query('select * from Users', (err, results) => {
    if (err) console.log('ERRN:', err.message)
    else 
    console.log('res', results)
  });
});

module.exports = router;