var express = require('express');
var router = express.Router();
var db = require('/myapp/routes/connection');
var currSession = require('/myapp/routes/session');


router.get("/", currSession.checkSessionStatus, function (req, res, next) {
    res.render('roommates-home');
});

router.get("/listings", currSession.checkSessionStatus, function (req, res, next) {
    res.render('display-roommate-listings', {});
});

router.get("/listings/:id", currSession.checkSessionStatus, function (req, res, next) {
    res.render('display-roommate-listing', {});
});

router.get("/new-listing", currSession.checkSessionStatus, function (req, res, next) {
    // display listing form
    res.render('roommates-form');
});

router.post("/new-listing", currSession.checkSessionStatus, function (req, res, next) {
    // post to database
    res.redirect('listings/');
});

module.exports = router;
