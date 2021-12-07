var db = require('/myapp/routes/connection');

populateBuildingTable = (buildingSql, buildingValues, insertIds) => {
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

populatePropertyTable = (propertySql, propertyValues, insertIds) => {
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

populateLocationTable = (locationSql, locationValues, insertIds) => {
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

populateListingTable = (listingSql, listingValues, insertIds) => {
    console.log('in listing')
    return new Promise(resolve => {
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

async function addNewListing(data){
    for (var key in data) {
        if (data[key] == '') data[key] = null;
    }

    var buildingSql = 'INSERT INTO building (bathrooms, bedrooms, floor_space, building_type, storeys, appliances) VALUES (?, ?, ?, ?, ?, ?)'
    var buildingValues = [data.bathrooms, data.bedrooms, data.floor_space, data.building_type, data.storeys, data.appliances];

    var propertySql = 'INSERT INTO property (property_age, annual_property_tax, parking_type, amenities) VALUES (?, ?, ?, ?)'
    var propertyValues = [data.property_age, data.annual_property_tax, data.parking_type, data.amenities];

    var locationSql = 'INSERT INTO location (country, province_state, address, postal_code) VALUES (?, ?, ?, ?)'
    var locationValues = [data.country, data.province_state, data.address, data.postal_code];

    var insertIds = [];

    try {
        insertIds = await populateBuildingTable(buildingSql, buildingValues, insertIds)
        insertIds = await populatePropertyTable(propertySql, propertyValues, insertIds)
        insertIds = await populateLocationTable(locationSql, locationValues, insertIds)

        var listingSql = 'INSERT INTO listing (buildingid, propertyid, locationid, title, price, listing_type, description) VALUES (?, ?, ?, ?, ?, ?, ?)';
        var listingValues = [insertIds[0], insertIds[1], insertIds[2], data.title, data.price, data.listing_type, data.description];
       
        res = await populateListingTable(listingSql, listingValues, insertIds)
    } catch(error) {
        console.log('ERRZ:', error)
    }

}

module.exports.addNewListing = addNewListing;