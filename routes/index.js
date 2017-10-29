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
  var regPattern = /(\d+)_(\d+).js/;
  for (var i = 0; i < files.length; i++) {
    var matches = files[i].match(regPattern);
    if(matches != null || matches != undefined) {
      splits.push({chapter: matches[1], section: matches[2]})
    }
  }
  var latestChapter = Math.max(...splits.map(x => parseInt(x.chapter)));
  var latestSection = Math.max(...splits.filter(x => x.chapter == latestChapter).map(x => x.section));

  // console.log(latestChapter + " - " + latestSection);
  // res.send('See Console');
  res.render('cp', { 
    title: `D3 Testing: ${latestChapter}_${latestSection}`, 
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
