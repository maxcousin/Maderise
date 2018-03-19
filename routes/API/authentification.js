var express = require('express');
var router = express.Router();
var models = require('../../models');
var passport = require('passport');
var bcrypt = require('bcrypt');

/****************************************************************************************/
/*** Vérifie et autorise ou non l'accès à l'application à l'aide d'un compte existant ***/
/****************************************************************************************/
router.post('/login', passport.authenticate('local'), function(req, res) {
		res.status(200);
    	res.json({'sid': req.sessionID, 'user': req.session.user});
});

/********************************************/
/*** Mise à jour du mot de passe existant ***/
/********************************************/
router.put('/updateMdp', function(req, res, next){
	models.hr_user.update({
		Password: req.body.newMdp,
	},
	{
		where: {Code: req.body.user}
	});
	res.status(200);
	res.json({'auth':'1'});
});

/**********************************************/
/*** Récupère le mot de passe déjà existant ***/
/**********************************************/
router.post('/getPassword', function(req, res){
	models.postulant.find({
		attributes: ['code_p','log','mdp','profil','sel'],
		where: {log: req.body.log}
	}).then(function(resultat){
		if(resultat == null){
			res.status(405);
			res.json({'logger':resultat});
		}
		else
		{
			bcrypt.hash(req.body.mdp, resultat['sel'], function(err, hash) {
				if(hash == resultat['mdp']){
					res.status(200);
					res.json({'logger':resultat, 'auth':'1'});
				}
				else{
					//console.log(resultat['sel'],'-',hash,'-',resultat['mdp'] );
					res.status(406);
					res.json({'logger':resultat});
				}
			});
		}
	});
});
module.exports = router;
