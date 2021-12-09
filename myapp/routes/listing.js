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
  //TODO change hardcoded listingid once display listing page is set up
  var listingid = 1;

  var query = 
    `SELECT *
        FROM (SELECT *
            FROM listing
            WHERE listingid=?) AS listing
        INNER JOIN building ON listing.buildingid=building.buildingid
        INNER JOIN property ON listing.propertyid=property.propertyid
        INNER JOIN location ON listing.locationid=location.locationid
    `;
  input = [listingid]

  db.connection.query(query, input , (err, data) => {
    if (err) {
      res.json({success: false});
    }
    else{
      console.log(data)
      console.log("setting the initial");
      console.log('rental is', data[0].listing_type);
      console.log(data[0].listing_type == 'rental');
      res.render('edit-listing', {data:data[0]});
    }
  });
});

router.post('/update-listing', function(req, res, next) {
  var listing_query = 
    `
    UPDATE listing
    SET title=?, price=?, listing_type=?, description=?
    WHERE listingid=?
    `;
  var listing_input = [
    req.body.title, 
    req.body.price, 
    req.body.listing_type, 
    req.body.description,
    req.body.listingid
  ];
  var building_query = 
    `
    UPDATE building
    SET bathrooms=?, bedrooms=?, floor_space=?, buildingtype=?, storeys=?, appliances=?
    WHERE buildingid=?
    `;
  var building_input = [
    req.body.bathrooms,
    req.body.bedrooms,
    req.body.floor_space,
    req.body.building_type,
    req.body.storeys,
    req.body.appliances,
    req.body.buildingid
  ];
  var property_query = 
    `
    UPDATE building
    SET property_age=?, annual_property_tax=?, parking_type=?, amenities=?
    WHERE propertyid=?
    `;
  var property_input = [
    req.body.property_age,
    req.body.annual_property_tax,
    req.body.parking_type,
    req.body.amenities,
    req.body.propertyid
  ];
  var location_query = 
    `
    UPDATE building
    SET country=?, province_state=?, address=?, postal_code=?
    WHERE locationid=?
    `;
  var location_input = [
    req.body.country,
    req.body.province_state,
    req.body.address,
    req.body.postal_code,
    req.body.locationid
  ];

  var queries = {};
  query[listing_query] = listing_input;
  query[building_query] = building_input;
  query[property_query] = property_input;
  query[location_query] = location_input;

  for (var query in queries) {
    var input = queries[query]
      db.connection.query(query, input, (err, results, fields) => {
          if (err) {
            console.log('ERR:', err.message)
          }
          else {
            console.log('res', results, 'fields', fields)
          }
      });
  }
  console.log("successfully updated data")
  res.redirect('/homepage')
});

router.post('/delete-listing', function(req, res, next) {
  var listing_query = `DELETE FROM listing WHERE listingid=?`
  var listing_input = [req.body.listingid]

  var building_query = `DELETE FROM building WHERE buildingid=?`
  var building_input = [req.body.buildingid]

  var property_query = `DELETE FROM property WHERE propertyid=?`
  var property_input = [req.body.propertyid]

  var location_query = `DELETE FROM location WHERE locationid=?`
  var location_input = [req.body.locationid]

  var queries = {};
  query[listing_query] = listing_input;
  query[building_query] = building_input;
  query[property_query] = property_input;
  query[location_query] = location_input;

  for (var query in queries) {
    var input = queries[query]
      db.connection.query(query, input, (err, results, fields) => {
          if (err) {
            console.log('ERR:', err.message)
          }
          else {
            console.log('res', results, 'fields', fields)
          }
      });
  }
  console.log("successfully deleted")
  res.redirect('/homepage')
});

module.exports = router;