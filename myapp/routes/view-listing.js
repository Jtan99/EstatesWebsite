var connection = require("/myapp/services/db");
var express = require("express");
var router = express.Router();

router.get("/:id", function (req, res, next) {
	// get from db
	connection.query(
		`SELECT *
        FROM listing
        INNER JOIN building ON listing.buildingid=building.buildingid
        INNER JOIN property ON listing.propertyid=property.propertyid
        INNER JOIN location ON listing.locationid=location.locationid
        WHERE listingid= ?`,
		[req.params.id],
		(err, results) => {
			if (err) {
				res.status(500).send({ message: "Error" });
			} else if (!results.length) {
				res.status(404).send({ message: "Not Found" });
			} else {
                res.render("view-home-listing", { listing: results[0] });
			}
		}
    );
});

module.exports = router;
