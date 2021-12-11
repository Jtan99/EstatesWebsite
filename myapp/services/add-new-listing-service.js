var db = require('/myapp/routes/connection');
const path = require("path");
const fs = require("fs");

insertBuilding = (buildingSql, buildingValues, insertIds) => {
  return new Promise((resolve, reject) => {
    db.connection.query(buildingSql, buildingValues, (err, results, fields) => {
      if (err) {
        return reject(err)
      }
      else {
        insertIds.push(results.insertId)
        return resolve(insertIds)
      }
    })
  })
}

insertProperty = (propertySql, propertyValues, insertIds) => {
  return new Promise((resolve, reject) => {
    db.connection.query(propertySql, propertyValues, (err, results, fields) => {
      if (err) {
        return reject(err)
      }
      else {
        insertIds.push(results.insertId)
        return resolve(insertIds)
      }
    })
  })
}

insertLocation = (locationSql, locationValues, insertIds) => {
  return new Promise((resolve, reject) => {
    db.connection.query(locationSql, locationValues, (err, results, fields) => {
      if (err) {
        return reject(err)
      }
      else {
        insertIds.push(results.insertId)
        return resolve(insertIds)
      }
    })
  })
}

insertListing = (listingSql, listingValues) => {
  return new Promise((resolve, reject) => {
    db.connection.query(listingSql, listingValues, (err, results, fields) => {
      if (err) {
        reject(err)
      }
      else {
        resolve('Success')
      }
    })
  })
}

async function addNewListing(data, req, res){
  for (var key in data) {
      if (data[key] == '') data[key] = null;
  }
  var buildingSql = 'INSERT INTO building (bathrooms, bedrooms, floor_space, building_type, storeys, appliances) VALUES (?, ?, ?, ?, ?, ?)';
  var buildingValues = [data.bathrooms, data.bedrooms, data.floor_space, data.building_type, data.storeys, data.appliances];

  var propertySql = 'INSERT INTO property (property_age, annual_property_tax, parking_type, amenities) VALUES (?, ?, ?, ?)';
  var propertyValues = [data.property_age, data.annual_property_tax, data.parking_type, data.amenities];

  var locationSql = 'INSERT INTO location (country, province_state, city, address, postal_code) VALUES (?, ?, ?, ?, ?)';
  var locationValues = [data.country, data.province_state, data.city, data.address, data.postal_code];

  var insertIds = [];

  try {
    insertIds = await insertBuilding(buildingSql, buildingValues, insertIds);
    insertIds = await insertProperty(propertySql, propertyValues, insertIds);
    insertIds = await insertLocation(locationSql, locationValues, insertIds);

    var listingSql = 'INSERT INTO listing (buildingid, propertyid, locationid, title, price, listing_type, description, photo) VALUES (?, ?, ?, ?, ?, ?, ?, ?)';
    var listingValues = [insertIds[0], insertIds[1], insertIds[2], data.title, data.price, data.listing_type, data.description, data.photo];
    
    await insertListing(listingSql, listingValues);

  } catch(error) {
    console.log('Promsise rejected:', error);
  }
}

module.exports.addNewListing = addNewListing;