var express = require('express');
var router = express.Router();
var models = require('../../models');
var multer  =   require('multer');
var nodemailer = require('nodemailer');
var bcrypt = require('bcrypt');
//var md5 = require('md5');

/*******************************************/
/*** Récupère la la liste des postulants ***/
/*******************************************/
router.get('', function(req, res, next){
	models.postulant.findAll({
        attributes: ['code_p','nom','prenom','ville','tel1','tel2','email','cv','vivier'],
		where: {profil: 'U'}
	}).then(function(result){
		if(result == null){
			res.status(404);
			res.json({'listPostulant':result});
		}
		else {
			res.status(200);
			res.json({'listPostulant':result, 'auth': '1'});
		}
	});
});

/*********************************************************************/
/*** Récupère toutes les infos d'un postulant à l'aide de son ID ***/
/*********************************************************************/
router.post('/getUserById', function(req, res, next){
    models.postulant.belongsTo(models.experience, {foreignKey: 'code_p', targetKey:'code_p'});
    models.postulant.belongsTo(models.connu, {foreignKey: 'code_p', targetKey:'code_p'});
    models.connu.belongsTo(models.connaissance, {foreignKey: 'code_c', targetKey:'code_c'});

    models.postulant.find({
		where: {code_p: req.body.id},
		include: [{model:models.experience},{model:models.connu}]
	}).then(function(resultat){
		res.status(200);
		res.json({'userInfos': resultat, 'auth': '1'});
	});
});


/************************************/
/*** Création d'un nouvel employé ***/
/************************************/
router.post('/createPostulant', function(req, res, next){
	//var mdp = md5.createHash(req.body.postulant.mdp);
	//var mdp = bcrypt.hashSync(req.body.postulant.mdp);
	bcrypt.genSalt(10, function(err, salt) {
	    bcrypt.hash(req.body.mdp, salt, function(err, hash) {
			models.postulant.create({
				log: req.body.log,
				mdp: hash,
				sel: salt,
				nom: req.body.nom,
				prenom: req.body.prenom,
				profil: req.body.profil
			});
		});
	});
	res.status(200);
	res.json({'auth':'1'});
});

/***************************************/
/*** Mise à jour des infos postulant ***/
/***************************************/
router.put('/updateCompte', function(req, res, next){
	models.postulant.update({
		log: req.body.log,
		mdp: req.body.mdp,
		nom: req.body.nom,
		prenom: req.body.prenom
	},{
		where: {code_p: req.body.code_p}
	});
	res.status(200);
	res.json({'auth':'1'});
});

/*********************************************/
/*** Met à jours les information de l'user ***/
/*********************************************/
router.put('/updateUser', function(req, res, next){
	models.postulant.belongsTo(models.connu, {foreignKey: 'code_p', targetKey:'code_p'});
	models.connu.belongsTo(models.connaissance, {foreignKey: 'code_c', targetKey:'code_c'});

	models.postulant.update({
		nom: req.body.nom,
		prenom: req.body.prenom,
		nationalite: req.body.nationalite,
		adresse: req.body.adresse,
		codePostal: req.body.codePostal,
		ville: req.body.ville,
		tel1: req.body.tel1,
		tel2: req.body.tel2,
		email: req.body.email,
		naissDate: req.body.naissDate,
		naissLieu: req.body.naissLieu,
		numSecu: req.body.numSecu,
		situationMari: req.body.situationMari,
		metierConj: req.body.metierConj,
		photo: req.body.photo,
		cv: req.body.cv,
		motiv: req.body.motiv,
		nbEnfant: req.body.nbEnfant,
		naissEnfant: req.body.naissEnfant,
		situationPro: req.body.situationPro,
		source: req.body.source,
		poste: req.body.poste,
		remun: req.body.remun,
		mobNor: (req.body.mobNor == true) ? '1' : '0',
		mobEst: (req.body.mobEst == true) ? '1' : '0',
		mobRa: (req.body.mobRa == true) ? '1' : '0',
		mobSud: (req.body.mobSud == true) ? '1' : '0',
		mobIdf: (req.body.mobIdf == true) ? '1' : '0',
		mobInt: (req.body.mobInt == true) ? '1' : '0',
		mobDemen: (req.body.mobDemen == true) ? '1' : '0',
		mobGd: (req.body.mobGd == true) ? '1' : '0',
		mobLocal: req.body.mobLocal,
		etam: (req.body.etam == true) ? '1' : '0',
		cadre: (req.body.cadre == true) ? '1' : '0',
		cdi: (req.body.cdi == true) ? '1' : '0',
		cdd: (req.body.cdd == true) ? '1' : '0',
		nego: (req.body.nego == true) ? '1' : '0',
		dispo: req.body.dispo,
		nonConcu: (req.body.nonConcu == true) ? '1' : '0',
		convColl: req.body.convColl,
		dateEntretien: req.body.dateEntretien,
		documents: req.body.documents,
		vivier: (req.body.vivier == true) ? '1' : '0'
	}, {
		where: {code_p: req.body.code_p},
		include: [{model:models.connu}]
	});

	res.status(200);
	res.json({'auth':'1'});
});

/***************************************/
/*** Upload une image sur le serveur ***/
/***************************************/
router.put('/uploadPhoto', function(req, res, next){
	 upload(req,res,function(err){
        if(err){
             res.json({error_code:1,err_desc:err});
             return;
        }

	  	models.postulant.update({
		    	photo: 'test'
		        }, {
		        	where: {code_p: req.body.code_p}
	  		});

	  	res.json({error_code:0,err_desc:null});
    })
});

/****************************************************/
/*** Récupère la photo de profil d'un utilisateur ***/
/****************************************************/
router.get('/getProfilePicture', function(req, res, next){
	models.postulant.find({
		where: {code_p: req.query.code_p},
		attributes: ['photo']
	}).then(function(img){
		res.status(200);
		if(img.photo != "" && img.photo != null){
			res.json({'image': "/images/" + img.photo, 'auth':'1'});
		}
		else
		{
			res.json({'image': "/images/empty-user.png", 'auth':'1'});
		}
	});
});

module.exports = router;
