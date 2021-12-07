var express = require('express');
var router = express.Router();
var addNewListing = require('/myapp/services/add-new-listing-service').addNewListing;


/* POST add new listing. */
router.post('/', async function(req, res, next) {
    var data = req.body;
    addNewListing(data);
    res.redirect('/')
});

module.exports = router;
