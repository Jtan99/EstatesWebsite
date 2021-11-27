var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/test-map', (req, res, next) => {
  res.render('map2', {API_KEY: 'AIzaSyAytC_TusuhG7kpNQ19hMrCzXDIUjd307o', address: 'sfu burnaby' });
})


module.exports = router;
