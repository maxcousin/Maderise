var express = require('express');
var router = express.Router();  
var passport = require('passport');

var maSession;

/* GET home page. */
router.get('/', function(req, res, next) {   
  if(req.cookies.cookieUser){
  	res.redirect('/index');
  }
  else
  {
  	res.render('login');	
  }
});

module.exports = router;  
  