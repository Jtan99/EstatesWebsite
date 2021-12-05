var express = require('express');
var router = express.Router();
var addNewListing = require('/myapp/services/add-new-listing-service').addNewListing;
var db = require('/myapp/routes/connection');

/* GET new listing page. */
router.get('/new', currSession.checkSessionStatus, function(req, res, next) {
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

/* POST new listing. */
addNewListingCallback = (data, req, res) => {
    return new Promise((resolve, reject) => {
        resolve(addNewListing(data, req, res));
    });
};

router.post('/new-listing', async function(req, res, next) {
  var data = req.body;
  await addNewListingCallback(data);
  res.redirect('/')
});

router.get('/edit', function(req, res, next) {
  db.connection.query()
});


router.post('/update-listing', function(req, res, next) {
  var query = `SELECT full_name, role FROM Users WHERE username=? AND password=?`;
  var input = [req.body.username, req.body.password];
  console.log("req.body is", req.body);
  db.connection.query(query, input , (err, user) => {
    //here goes to homepage
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

router.post('/delete-listing', function(req, res, next) {
});

module.exports = router;