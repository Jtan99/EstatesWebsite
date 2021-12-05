// var mysql = require('mysql');
var db = require('/myapp/routes/connection');

function addNewListing(data) {

    for (var key in data) {
        if (data[key] == '') data[key] = null;
    }

    var listingSql = 'INSERT INTO listing (title, price, listing_type, description) VALUES (?, ?, ?, ?)'
    listingValues = [data.title, data.price, data.listing_type, data.description];

    var buildingSql = 'INSERT INTO building (bathrooms, bedrooms, floor_space, building_type, storeys, appliances) VALUES (?, ?, ?, ?, ?, ?)'
    buildingValues = [data.bathrooms, data.bedrooms, data.floor_space, data.building_type, data.storeys, data.appliances];

    var propertySql = 'INSERT INTO property (property_age, annual_property_tax, parking_type, amenities) VALUES (?, ?, ?, ?)'
    propertyValues = [data.property_age, data.annual_property_tax, data.parking_type, data.amenities];

    var locationSql = 'INSERT INTO location (country, province_state, address, postal_code) VALUES (?, ?, ?, ?)'
    locationValues = [data.country, data.province_state, data.address, data.postal_code];
    
    var sqlObj = {};
    sqlObj[buildingSql] = buildingValues;
    sqlObj[propertySql] = propertyValues;
    sqlObj[locationSql] = locationValues;
    sqlObj[listingSql] = listingValues;
        
    for (var sql in sqlObj) {    
        db.connection.query(sql, sqlObj[sql], (err, results, fields) => {
            if (err) console.log('ERR:', err.message)
            else console.log('res', results, 'fields', fields)
        });
    }

    db.connection.query('select * from listing', (err, results) => {
        if (err) console.log('ERRN:', err.message)
        else console.log('res', results)
    });

}

module.exports.addNewListing = addNewListing;