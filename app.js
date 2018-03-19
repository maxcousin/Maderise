process.env.NODE_ENV = 'test';

var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var expressSession = require('express-session');
var bodyParser = require('body-parser');
var begin = require('./routes/begin');
var login = require('./routes/login');
var index = require('./routes/index');
var users = require('./routes/users');
var indexAdmin = require('./routes/indexAdmin');
var logout = require('./routes/API/logout');
var authentification = require('./routes/API/authentification');
var connaissance = require('./routes/API/connaissance');
var connu = require('./routes/API/connu');
var experience = require('./routes/API/experience');
var postulant = require('./routes/API/postulant');
var users = require('./routes/API/users');
var passport = require('passport');
var flash = require('connect-flash');
var bcrypt = require('bcrypt');

require('./config/passport')(passport);

var app = express();

// view engine setup
//app.set('views', path.join(__dirname, 'views'));
//app.set('view engine', 'jade');
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'html');
app.engine('html', require('ejs').renderFile);

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));

//app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(expressSession({
    secret:'kl#dsl1q*/ml',
    cookie:{maxAge:90000000000000},
    resave: true,
    saveUninitialized: true})); //900000
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions
app.use(flash()); // use connect-flash for flash messages stored in session
app.use(express.static(path.join(__dirname, 'public')));
 app.use(function(req, res, next) {
        res.header("Access-Control-Allow-Origin", "http://localhost");
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
        next();
    });

var isAuth = function(req, res, next){
      //if (!req.isAuthenticated()){
      if (!$cookies.getObject('cookieUser')){
        //res.send(401);
        //res.redirect('/');
        res.clearCookie('cookieUser');
        //res.json({auth: null});
        res.redirect('/login');
      }
      else
        next();
};

// Routes
app.use('/', begin);
app.use('/login', login);
app.use('/index',  index);
app.use('/admin/index', indexAdmin);

// Partial Routes
app.use('/index/details', isAuth, index);
app.use('/index/profil', isAuth, index);
app.use('/index/postulant', isAuth, index);

app.use('/admin/index/ficheNewPostulant', isAuth, indexAdmin);
app.use('/admin/index/ficheUpdatePostulant', isAuth, indexAdmin);
app.use('/admin/index/listEmploye', isAuth, indexAdmin);
app.use('/admin/index/listEmployeLeaving', isAuth, indexAdmin);
app.use('/admin/index/triEmploye', isAuth, indexAdmin);
app.use('/admin/index/profil', isAuth, indexAdmin);
app.use('/admin/index/uploadFacture', isAuth, indexAdmin);

// API
app.use('/logout', logout);
app.use('/authentification', authentification);
app.use('/connaissance', connaissance);
app.use('/connu', connu);
app.use('/experience', experience);
app.use('/postulant', postulant);
app.use('/users', isAuth, users);

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
