var express = require('express');
var router = express.Router();
var models = require('../../models');


/**************************************************/
/*** Récupère toutes les compétences techniques ***/
/**************************************************/
router.get('/getT', function(req, res, next) {
	models.connaissance.findAll({
		order: [['intitule', 'ASC']],
		where: {type:'T'}
	}).then(function (resultat){
		res.status(200);
		res.json({'listeT':resultat, 'auth': '1'});
	});
});

/***********************************************/
/*** Récupère toutes les compétences métiers ***/
/***********************************************/
router.get('/getM', function(req, res, next) {
	models.connaissance.findAll({
		order: [['intitule', 'ASC']],
		where: {type:'M'}
	}).then(function (resultat2){
		res.status(200);
		res.json({'listeM':resultat2, 'auth': '1'});
	});
});

/***********************************************/
/*** Récupère toutes les compétences métiers ***/
/***********************************************/
router.get('/getS', function(req, res, next) {
	models.connaissance.findAll({
		order: [['intitule', 'ASC']],
		where: {type:'S'}
	}).then(function (resultat3){
		res.status(200);
		res.json({'listeS':resultat3, 'auth': '1'});
	});
});

/***********************************************/
/*** Récupère toutes les compétences métiers ***/
/***********************************************/
router.get('/getI', function(req, res, next) {
	models.connaissance.findAll({
		order: [['intitule', 'ASC']],
		where: {type:'I'}
	}).then(function (resultat4){
		res.status(200);
		res.json({'listeI':resultat4, 'auth': '1'});
	});
});

/***********************************************/
/*** Récupère toutes les compétences métiers ***/
/***********************************************/
router.get('/getH', function(req, res, next) {
	models.connaissance.findAll({
		order: [['intitule', 'ASC']],
		where: {type:'H'}
	}).then(function (resultat5){
		res.status(200);
		res.json({'listeH':resultat5, 'auth': '1'});
	});
});



module.exports = router;
