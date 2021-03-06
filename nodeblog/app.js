var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var session=require('express-session');
var multer  = require('multer');
var upload = multer({ dest: 'uploads/' }); //for file uploads
var messages=require('express-messages'); //displaying messages especially using forms
var flash=require('connect-flash');
var expressValidator=require('express-validator'); //validating forms
var moment=require('moment'); //for working with dates
var mongo=require('mongodb');
var db=require('monk')('localhost/nodeblog'); //monk alternative to mongoose for mongodb

var routes = require('./routes/index');
var posts = require('./routes/posts');
var categories=require('./routes/categories');

var app = express();

app.locals.moment=require('moment');

//function to truncate text
app.locals.truncateText=function(text,length){
  var textTruncated=text.substring(0,length);
  return textTruncated;
};

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//enabling db access to router
app.use(function(req,res,next){
  req.db=db;
  next();
});

//tying middelware to our app for use
//based on documentation for express-messages
app.use(require('connect-flash')());
app.use(function (req, res, next) {
  res.locals.messages = require('express-messages')(req, res);
  next();
});

//as per documentation for express-session 
app.use(session({
  secret: 'secret',
  resave: true,
  saveUninitialized: true,
}));

//based on documentation: making use of errorFormatter option
app.use(expressValidator({
  errorFormatter: function(param, msg, value) {
      var namespace = param.split('.')
      , root    = namespace.shift()
      , formParam = root;
 
    while(namespace.length) {
      formParam += '[' + namespace.shift() + ']';
    }
    return {
      param : formParam,
      msg   : msg,
      value : value
    };
  }
}));

app.use('/', routes);
app.use('/posts', posts);
app.use('/categories',categories);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
