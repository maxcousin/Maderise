var express = require('express');
var router = express.Router();
var models = require('../../models');

/********************************/
/*** Déconnecte l'utilisateur ***/
/********************************/
router.get('/', function(req, res, next){
	res.clearCookie('cookieUser');
	req.session.destroy();

	res.status(200);
	res.json({'auth': '1'});
});

module.exports = router;
