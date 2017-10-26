var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/cp/:name', function(req, res, next) {
  res.render('cp', { title: 'D3 Testing: ' + req.params.name, name: req.params.name })
})

module.exports = router;
