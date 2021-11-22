var express = require('express');
var router = express.Router();

/* GET new listing page. */
router.get('/', function(req, res, next) {
    res.render('new-listing', {title: 'New Listing'});
});
module.exports = router;
