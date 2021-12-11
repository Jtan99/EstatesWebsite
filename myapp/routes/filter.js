var express = require('express');
var router = express.Router();
var db = require('/myapp/routes/connection');
var currSession = require('/myapp/routes/session');
var path = require('path');

router.get('/search', currSession.checkSessionStatus, (req, res) => {
  res.sendFile(path.join(__dirname, '../views', 'search-page.html'));
});

router.post('/search', currSession.checkSessionStatus, (req, res) => {
  var query =
  ` 
    SELECT *
    FROM listing
    WHERE locationid IN (SELECT locationid FROM location WHERE country=? OR city=?)
  `
  var input = [req.body.country, req.body.city];
  db.connection.query(query, input , (err, listings) => {
    if (err) {
      //prompt user failure
      res.json({success: false, err});
    }
    // console.log(listings)
    res.render('display-listings', {listings:listings})
  });
});

module.exports = router;