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

  
  getLatestLocations = (latestLocationsSql) => {
    return new Promise((resolve, reject) => {
      db.connection.query(latestLocationsSql, (err, result) => {
        if (err) reject(err)
        else {
          console.log('res', result);
          resolve(result);
        }
      })
    })
  }
  
  getlatestListings = (latestListingsSql) => {
    return new Promise((resolve, reject) => {
      db.connection.query(latestListingsSql, (err, result) => {
        if (err) reject(err)
        else {
          console.log('res', result);
          resolve(result);
        }
      })
    })
  }
  
  loadPage = ( query, input, latestLocations, latestListings) => {
      return new Promise((resolve, reject) => {

        db.connection.query(query, input, (err, rows) => {
        if(err){
          res.json({ success: false, err })
          reject('failure')
        }
        else{
          var user_info = rows[0];
          res.render('home', {full_name: user_info.full_name, latestLocations: latestLocations, latestListings: latestListings});
          resolve('success')
        }
      })
    })
  }
  
  async function runHomepageFunctions(query, input) {
  
    var latestLocationsSql = 'SELECT * FROM location WHERE locationid = (SELECT max(locationid) FROM location)';
    var latestListingsSql = 'SELECT * FROM listing WHERE listingid = (SELECT max(listingid) FROM listing)';
    try {
      var latestLocations = await getLatestLocations(latestLocationsSql);
      var latestListings = await getlatestListings(latestListingsSql);
      var res = await loadPage(query, input, latestLocations, latestListings);
      console.log('vars', latestListings, latestLocations);
      return {result: res}
    } catch(error) {
      console.log('rejected bitch', error);
      return 0;
    }
  }

  var result = runHomepageFunctions(query, input);
});

module.exports = router;