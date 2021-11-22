var express = require('express');
var router = express.Router();
var addNewListing = require('/myapp/services/add-new-listing-service').addNewListing;

/* POST add new listing. */
router.post('/', function(req, res, next) {
    var data = req.body;
    addNewListing(data);
});

module.exports = router;
