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
  var regPattern = /(\d+)_(\d+).*\.js/;
  for (var i = 0; i < files.length; i++) {
    var matches = files[i].match(regPattern);
    if (matches != null || matches != undefined) {
      splits.push({
        filename: matches[0],
        chapter: parseInt(matches[1]),
        section: parseInt(matches[2])
      })
    }
  }
  var latestChapter = Math.max(...splits.map(x => x.chapter));
  var latestSection = Math.max(...splits.filter(x => x.chapter == latestChapter).map(x => x.section));
  var latestFile = splits.filter(x => x.chapter === latestChapter && x.section === latestSection)[0];

  // console.log(latestChapter + " - " + latestSection); res.send('See Console');
  res.render('cp', {
    title: `D3 Testing: ${latestFile.chapter}_${latestFile.section}`,
    javascriptFile: latestFile.filename
  });
  // req.params.name })  ;
})

router.get('/cp/:name', function (req, res, next) {
  var files = fs.readdirSync(path.join("public", "cp"));
  var nameMatches = req
    .params
    .name
    .match(/(\d+)_(\d+)/);
  var searchObj = {
    chapter: parseInt(nameMatches[1]),
    section: parseInt(nameMatches[2])
  };
  var resultObj = undefined;
  var filePattern = /(\d+)_(\d+).*\.js/;
  for (var i = 0; i < files.length; i++) {
    var fileMatch = files[i].match(filePattern);

    if (fileMatch != null || fileMatch != undefined) {
      if (parseInt(fileMatch[1]) === searchObj.chapter && parseInt(fileMatch[2]) === searchObj.section) {
        resultObj = {
          filename: fileMatch[0],
          chapter: parseInt(fileMatch[1]),
          section: parseInt(fileMatch[2])
        };
        break;
      }
    }
  }

  if (resultObj === undefined) {
    res.send(`Couldn't find ${req.params.name}. Ask an adult for some help!`)
  } else {
    res.render('cp', {
      title: `D3 Testing: ${resultObj.chapter} ${resultObj.section}`,
      javascriptFile: resultObj.filename
    })
  }
});

module.exports = router;
