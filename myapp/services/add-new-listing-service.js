// var mysql = require('mysql');
var db = require('/myapp/app');

function addNewListing(data) {
    console.log('db', db)
    var sql = 'INSERT INTO listing (title, price, listing_type, description) VALUES ($title, $price, $listing_type, $description)'
    values = [data.title, data.price, data.listing_type, data.description];

    db.con.query(sql, values, (err, results, fields) => {
        if (err) console.log('ERR:', err.message)
        else console.log('res', results, 'fields', fields)
    });
    // app.connection.query('select * from listing', err => {
    //     if (err) console.log(err.message)
    //     else console.log()
    // })
}

module.exports.addNewListing = addNewListing;