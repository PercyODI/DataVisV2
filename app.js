var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var sassMiddleware = require('node-sass-middleware');
var liveReload = require('livereload');
var liveReloadMiddleware = require('connect-livereload');
var browserify = require('browserify-middleware');
var tsify = require('tsify');
var fs = require('fs');

var index = require('./routes/index');
var users = require('./routes/users');

var app = express();

// livereload server
const hotServer = liveReload.createServer({
  exts: [
    'json',
    'js',
    'ts',
    'html',
    'pug',
    'css',
    'sass'
  ],
  debug: true
});

// livereload server folders to watch
hotServer.watch(__dirname)

// inject livereload script into pages
app.use(liveReloadMiddleware());

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// uncomment after placing your favicon in /public
// app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());
app.use(sassMiddleware({
  src: path.join(__dirname, 'public'),
  dest: path.join(__dirname, 'public'),
  indentedSyntax: true, // true = .sass and false = .scss
  sourceMap: true
}));
app.use(express.static('public'));

app.use('/node_modules', express.static('node_modules'));
app.use('/js/:name.js', function (req, res, next) {
  var basicPath = path.join('public', 'cp');
  if (fs.existsSync(path.join(basicPath, `${req.params.name}.js`))) {
    var absPath = fs.realpathSync(path.join(basicPath, `${req.params.name}.js`));
    res.send(fs.readFileSync(path.join('node_modules', 'd3', 'build', 'd3.min.js'), {encoding: 'utf-8'}) + fs.readFileSync(absPath, {encoding: 'utf-8'}));
  } else {
    browserify(path.join(basicPath, `${req.params.name}.ts`), {
      plugins: [
        {
          plugin: 'tsify'
        }
      ]
    })(req, res, next);

  }
});

app.use('/', index);
app.use('/users', users);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req
    .app
    .get('env') === 'development'
    ? err
    : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
