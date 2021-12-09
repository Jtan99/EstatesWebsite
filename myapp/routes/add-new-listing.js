var express = require('express');
var router = express.Router();
var addNewListing = require('/myapp/services/add-new-listing-service').addNewListing;


/* POST add new listing. */

addNewListingCallback = (data, req, res) => {
    return new Promise((resolve, reject) => {
        resolve(addNewListing(data, req, res));
    });
};

router.post('/', async function(req, res, next) {
    var data = req.body
    await addNewListingCallback(data, req, res)
    res.redirect('/')
});

module.exports = router;
