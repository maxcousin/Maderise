var express = require('express');
var router = express.Router();
var models = require('../../models');
//var md5 = require('md5');


/******************************/
/*** Ajout d'une expérience ***/
/******************************/
router.post('/addExperience', function(req, res, next){
	models.experience.create({
		fonction: req.body.fonction,
    	debut: req.body.debut,
    	fin: req.body.fin,
    	remun: req.body.remun,
    	interess: req.body.interess,
    	avantage: req.body.avantage,
    	motifDepart: req.body.motifDepart,
    	vehFonc: req.body.vehFonc,
    	vehServ: req.body.vehServ,
    	indemnDepl: req.body.indemnDepl,
    	repas: req.body.repas,
    	prime: req.body.prime,
    	autrePrime: req.body.autrePrime,
    	problem: req.body.problem,
    	objectif: req.body.objectif,
    	activite: req.body.activite,
    	resultat: req.body.resultat,
    	nomSoc: req.body.nomSoc,
    	lieuSoc: req.body.lieuSoc,
    	caSoc: req.body.caSoc,
    	nbSalSoc: req.body.nbSalSoc,
    	nomContact: req.body.nomContact,
    	prenomContact: req.body.prenomContact,
    	fctContact: req.body.fctContact,
    	numContact: req.body.numContact,
    	permContact: req.body.permContact,
    	dernierJob: req.body.dernierJob,
        code_p: req.body.id
	});
	res.status(200);
	res.json({'auth':'1'});
});

module.exports = router;
