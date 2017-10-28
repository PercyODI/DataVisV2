var express = require('express');
var fs = require('fs');
var path = require('path');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', {title: 'Express'});
});

router.get('/cp/latest', function (req, res, next) {
  var files = fs.readdirSync(path.join("public", "cp"));

  var splits = [];
  for (var i = 0; i < files.length; i++) {
    splits.push(files[i].split(/(\d+)_(\d+)/));
  }
  var latestChapter = Math.max(...splits.map(x => parseInt(x[1])));
  var latestSection = Math.max(...splits.filter(x => x[1] == latestChapter).map(x => x[2]));

  // console.log(latestChapter + " - " + latestSection);
  // res.send('See Console');
  res.render('cp', { 
    title: 'D3 Testing: ' + req.params.name, 
    name: `${latestChapter}_${latestSection}`
  });
  // req.params.name })  ;
})

router.get('/cp/:name', function (req, res, next) {
  res.render('cp', {
    title: 'D3 Testing: ' + req.params.name,
    name: req.params.name
  })
})

module.exports = router;
