process.env.NODE_ENV = 'test';

var express = require('express');
var login = require('./routes/login');

require('./config/passport')(passport);

var maderiseApp = express();
// view engine setup
maderiseApp.set('views', path.join(__dirname, 'views'));
maderiseApp.set('view engine', 'html');
maderiseApp.engine('html', require('ejs').renderFile);

// uncomment after placing your favicon in /public
//maderiseApp.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
maderiseApp.use(logger('dev'));

maderiseApp.use(bodyParser.urlencoded({
  extended: false
}));
maderiseApp.use(bodyParser.json());
maderiseApp.use(cookieParser());
maderiseApp.use(expressSession({
    secret:'kl#dsl1q*/ml',
    cookie:{maxAge:90000000000000},
    resave: true,
    saveUninitialized: true})); //900000
maderiseApp.use(passport.initialize());
maderiseApp.use(passport.session()); // persistent login sessions
maderiseApp.use(flash()); // use connect-flash for flash messages stored in session
maderiseApp.use(express.static(path.join(__dirname, 'public')));
 maderiseApp.use(function(req, res, next) {
        res.header("Access-Control-Allow-Origin", "http://localhost");
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
        next();
    });

var isAuth = function(req, res, next){
  if (!req.isAuthenticated()){
    res.clearCookie('cookieUser');
    res.redirect('/login');
  }
  else
    next();
};

// Routes
maderiseApp.use('/', begin);
maderiseApp.use('/login', login);

// Partial Routes
maderiseApp.use('/index/details', isAuth, index);

// API
maderiseApp.use('/logout', logout);

// catch 404 and forward to error handler
maderiseApp.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (maderiseApp.get('env') === 'development') {
  maderiseApp.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
maderiseApp.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});

module.exports = maderiseApp;
