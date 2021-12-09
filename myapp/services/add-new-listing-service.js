var db = require('/myapp/routes/connection');
const multer = require("multer");

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

// storePhoto = (req, res) => {
//     return new Promise((resolve, reject) => {
//         console.log('file', req.file)
//         upload.single("photo");
//         console.log('file after', req.file)
//         const tempPath = req.file.path;
//         const targetPath = path.join(__dirname, "./uploads/image.png");

//         if (path.extname(req.file.originalname).toLowerCase() === ".png") {
//             fs.rename(tempPath, targetPath, err => {
//                 if (err) reject(err)
//                 else resolve('File uploaded')
//             });
//         } 
//         else {
//             fs.unlink(tempPath, err => {
//             if (err) reject(err);
//             else reject('Incorrect file type')
//             });
//         }
//     })
// }

// fileStorageEngine = multer.diskStorage({
//     destination: (req, file, cb) => {
//       cb(null, '/public/user-uploads')
//     },
//     filename: (req, file, cb) => {
//       cb(null, Date.now() + '--' + file.originalname)
//     }
//   });
  
// upload = multer({storage: fileStorageEngine})

async function addNewListing(data){
    for (var key in data) {
        if (data[key] == '') data[key] = null;
    }
    var buildingSql = 'INSERT INTO building (bathrooms, bedrooms, floor_space, building_type, storeys, appliances) VALUES (?, ?, ?, ?, ?, ?)'
    var buildingValues = [data.bathrooms, data.bedrooms, data.floor_space, data.building_type, data.storeys, data.appliances];

    var propertySql = 'INSERT INTO property (property_age, annual_property_tax, parking_type, amenities) VALUES (?, ?, ?, ?)'
    var propertyValues = [data.property_age, data.annual_property_tax, data.parking_type, data.amenities];

    var locationSql = 'INSERT INTO location (country, province_state, city, address, postal_code) VALUES (?, ?, ?, ?, ?)'
    var locationValues = [data.country, data.province_state, data.city, data.address, data.postal_code];

    var insertIds = [];

    try {
        insertIds = await insertBuilding(buildingSql, buildingValues, insertIds)
        insertIds = await insertProperty(propertySql, propertyValues, insertIds)
        insertIds = await insertLocation(locationSql, locationValues, insertIds)

        var listingSql = 'INSERT INTO listing (buildingid, propertyid, locationid, title, price, listing_type, description) VALUES (?, ?, ?, ?, ?, ?, ?)';
        var listingValues = [insertIds[0], insertIds[1], insertIds[2], data.title, data.price, data.listing_type, data.description];
       
        res = await insertListing(listingSql, listingValues)
        // res2 = await storePhoto(req, res)
    } catch(error) {
        console.log('Promsise rejected:', error)
    }

}

module.exports.addNewListing = addNewListing;