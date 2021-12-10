var connection = require("/myapp/services/db");
var express = require("express");
var router = express.Router();

router.get("/:id", function (req, res, next) {
	// get from db:
	connection.query(
		`SELECT *
		FROM (SELECT *
			  FROM listing
			  WHERE listingid=?) AS listing
		INNER JOIN building ON listing.buildingid=building.buildingid
		INNER JOIN property ON listing.propertyid=property.propertyid
		INNER JOIN location ON listing.locationid=location.locationid`,
		[req.params.id],
		(err, results) => {
			if (err) {
				res.status(500).send({ message: "Error" });
			} else if (!results.length) {
				res.status(404).send({ message: "Not Found" });
			} else {
				console.log("Results", results[0])
                res.render("view-home-listing", { listing: results[0], API_KEY: "AIzaSyAytC_TusuhG7kpNQ19hMrCzXDIUjd307o" });
			}
		}
    );
	// let listing = {
	// 	listingid: 1,
	// 	buildingid: 1,
	// 	propertyid: 1,
	// 	locationid: 1,
	// 	title: 'House1',
	// 	price: 13223,
	// 	listing_type: 'rental',
	// 	description: 'huge mansion',
	// 	bathrooms: 312,
	// 	bedrooms: 132,
	// 	floor_space: 31222,
	// 	building_type: 'mansion',
	// 	storeys: 132,
	// 	appliances: 'everything',
	// 	property_age: 231,
	// 	annual_property_tax: 312332,
	// 	parking_type: '12 car garage',
	// 	amenities: 'all',
	// 	country: 'canada',
	// 	province_state: 'bc',
	// 	address: 'sfu burnaby',
	// 	postal_code: 'v82jsd2'
	//   }
	//   res.render("view-home-listing", { listing: listing });
});

module.exports = router;
