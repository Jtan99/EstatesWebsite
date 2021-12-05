var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var sessionRouter = require('./routes/session');
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var newListingRouter = require('./routes/new-listing');
var addNewListingRouter = require('./routes/add-new-listing');
var viewProfileRouter = require('./routes/profile');
var viewHomePageRouter = require('./routes/home');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(sessionRouter)
app.use('/index', indexRouter);
app.use('/', usersRouter);
app.use('/new-listing', newListingRouter);
app.use('/add-new-listing', addNewListingRouter);
app.use('/profile', viewProfileRouter);
app.use('/homepage', viewHomePageRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports.app = app;
// module.exports.con = con;
