var express = require('express');
var router = express.Router();
var models = require('../../models');
var multer  =   require('multer');
var nodemailer = require('nodemailer');

var storage = multer.diskStorage({
        destination: function (req, file, cb) {
            cb(null, './public/images/profilePicture/')
        },
        filename: function (req, file, cb) {
        	var datetimestamp = Date.now();
        	req.session.dateActu = datetimestamp;
        	req.session.randomNumber = Math.floor((Math.random () * 1000000000) + 1);
            cb(null, req.session.randomNumber + '-' + req.session.dateActu + '.' + file.originalname.split('.')[file.originalname.split('.').length -1])
        }
});

var upload = multer({ storage : storage}).single('file');


/*******************************************************/
/*** Récupère la classe d'employées d'un utilisateur ***/
/*******************************************************/
router.get('', function(req, res, next){
	models.hr_user.belongsTo(models.hr_employeeClass, {foreignKey: 'EmployeeClass', targetKey:'Code'});

	models.hr_user.findAll({
		where: {Code: req.query.id},
		include: [{model:models.hr_employeeClass}]
	}).then(function(result){
		res.status(200);
		res.json({'infoProfil':result[0], 'auth': '1'});
	});
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

	  	models.hr_user.update({
		    	profilePicture: req.session.randomNumber + '-' + req.session.dateActu + '.' + req.file.originalname.split('.')[req.file.originalname.split('.').length -1]
		        }, {
		        	where: {Code: req.body.user}
	  		});

	  	res.json({error_code:0,err_desc:null});
    })
});


/*****************************************************/
/*** Récupère la photo de profile d'un utilisateur ***/
/*****************************************************/
router.get('/getProfilePicture', function(req, res, next){
	models.hr_user.find({
		where: {Code: req.query.id},
		attributes: ['profilePicture']
	}).then(function(img){
		res.status(200);
		if(img.profilePicture != "" && img.profilePicture != null){
			res.json({'image': "/images/profilePicture/" + img.profilePicture, 'auth':'1'});
		}
		else
		{
			res.json({'image': "/images/empty-user.png", 'auth':'1'});
		}
	});
});

/********************************************/
/*** Récupère la liste des administrateur ***/
/********************************************/
router.get('/getUsersAdmin', function(req, res, next){
	models.hr_user.findAll({
		order: [['Name', 'ASC']],
		where: { $or: [{Profil:'C', Society: req.query.society},{ MultiSoc:'Y'}], Leaving:'N'}
	}).then(function(resultat){
		res.status(200);
		res.json({'listeUsers':resultat, 'auth':'1'});
	});
});

/*************************/
/*** Envoyer une email ***/
/*************************/
router.post('/sendEmail', function(req, res, next){
	var transporter = nodemailer.createTransport({
		host: '192.168.203.30',
		port: '25',
		auth: {
			user: 'smtp_ext',
			pass: 'torUt5ship2'
		}
	});

	var text = req.body.msg;

	var mailOptions = {
		from: 'nicolas.cazenave95@gmail.com',
		to: 'cazemontaury@gmail.com',
		subject: req.body.object,
		text: text
	};

	transporter.sendMail(mailOptions, function(error, info){
		res.status(200);
		if(error){
			console.log(error);
			res.json({msg: 'Erreur lors de l\'envoie', 'auth':'1'});
		}
		else{
			console.log('Message sent : ' + info.response);
			res.json({msg: info.response, 'auth':'1'});
		}
	});
});

/**********************************************/
/*** Récupère la liste des chargé d'affaire ***/
/**********************************************/
router.get('/getChargeAffaire', function(req, res, next){
	models.hr_user.findAll({
		order: [['Name','ASC']],
		where: {Profil: 'C', Leaving: 'N'}
	}).then(function(resultat){
		res.status(200);
		res.json({'chargeAffaire':resultat, 'auth':'1'});
	});
});

/*********************************************************************/
/*** Récupère toutes les infos d'un utilisateur à l'aide de son ID ***/
/*********************************************************************/
router.get('/getInfosUserById', function(req, res, next){
	models.hr_user.find({
		where: {Code: req.query.id}
	}).then(function(resultat){
		res.status(200);
		res.json({'userInfos': resultat, 'auth': '1'});
	});
});

/************************************/
/*** Création d'un nouvel employé ***/
/************************************/
router.post('/createEmploye', function(req, res, next){
	var lvlTemp = ((req.body.employe.typeProfil == 'U') ? '10' : ((req.body.employe.typeProfil == 'C') ? '1' : '0'));
	var dateSortie = new Date(req.body.employe.dateSortie.split('/')[2] + "-" + req.body.employe.dateSortie.split('/')[1] + "-" + req.body.employe.dateSortie.split('/')[0]);
	var naissDate = new Date(req.body.employe.dateNaiss.split('/')[2] + "-" + req.body.employe.dateNaiss.split('/')[1] + "-" + req.body.employe.dateNaiss.split('/')[0]);
	var VMDate = new Date(req.body.employe.dateVM.split('/')[2] + "-" + req.body.employe.dateVM.split('/')[1] + "-" + req.body.employe.dateVM.split('/')[0]);
	var nextVMDate = new Date(req.body.employe.nextDateVM.split('/')[2] + "-" + req.body.employe.nextDateVM.split('/')[1] + "-" + req.body.employe.nextDateVM.split('/')[0]);
	var entree = new Date(req.body.employe.dateEntree.split('/')[2] + "-" + req.body.employe.dateEntree.split('/')[1] + "-" + req.body.employe.dateEntree.split('/')[0]);
	var dCarteSejour = new Date(req.body.employe.dateCarteSejour.split('/')[2] + "-" + req.body.employe.dateCarteSejour.split('/')[1] + "-" + req.body.employe.dateCarteSejour.split('/')[0]);
	var dCarteTravail = new Date(req.body.employe.dateCarteTravail.split('/')[2] + "-" + req.body.employe.dateCarteTravail.split('/')[1] + "-" + req.body.employe.dateCarteTravail.split('/')[0]);
	var periodeEssai = new Date(req.body.employe.dateEssai.split('/')[2] + "-" + req.body.employe.dateEssai.split('/')[1] + "-" + req.body.employe.dateEssai.split('/')[0]);

	models.hr_user.create({
		Code: req.body.employe.nomUser,
		Pwd: '',
		Cout: (req.body.employe.coutReel == '') ? 0 : req.body.employe.coutReel,
		Society: req.body.employe.societe,
		Name: req.body.employe.nom,
		Surname: req.body.employe.prenom,
		OverTime: 'N',
		theme: 'default',
		Level: lvlTemp,
		Groupe: req.body.employe.groupe,
		cg_Admin: req.body.employe.gereConges,
		Profil: req.body.employe.typeProfil,
		Leaving: 'N',
		LeavingDate: (isNaN(dateSortie) == false) ? dateSortie : null,
		CarHorsePower: (req.body.employe.puissance == '') ? 0 : req.body.employe.puissance,
		SellingPrice: (req.body.employe.coutVendu == '') ? 0 : req.body.employe.coutVendu,
		EmployeeClass: req.body.employe.qualification,
		email: req.body.employe.email,
		CarHorsePowerClass: '1',
		MultiSoc: req.body.employe.multiSoc,
		IsAdminOfficer: req.body.employe.isResAdmini,
		AdminOfficer: req.body.employe.responsableAdmini,
		PartialTime: (req.body.employe.typeTravail == 'Partial') ? 'Y' : 'N',
		Password: req.body.employe.pwd,
		profilePicture: '',
		Adresse: req.body.employe.adresse,
		Tel1: req.body.employe.telUn,
		Tel2: req.body.employe.telDeux,
		ICE_nom: req.body.employe.nomICE,
		ICE_numero: req.body.employe.numICE,
		ICE_mail: req.body.employe.mailICE,
		Nom1: req.body.employe.nomJeuneFille,
		Prenoms: req.body.employe.prenoms,
		Naissance_date: (isNaN(naissDate) == false) ? naissDate : null,
		Naissance_lieu: req.body.employe.villeNaiss,
		Sexe: req.body.employe.sexe,
		Nationalite: req.body.employe.nationalite,
		Info2_Num: req.body.employe.numCarteSejour,
		Info2_Date: (isNaN(dCarteSejour) == false) ? dCarteSejour : null,
		Info3_Num: req.body.employe.numCarteTravail,
		Info3_Date: (isNaN(dCarteTravail) == false) ? dCarteTravail : null,
		Situation1: req.body.employe.situationFam,
		Enfants: (req.body.employe.nbrEnfant == '') ? 0 : req.body.employe.nbrEnfant,
		Info1: req.body.employe.numSecu,
		VM_date: (isNaN(VMDate) == false) ? VMDate : null,
		VM_infos: req.body.employe.conclVM,
		Next_VM_Date: (isNaN(nextVMDate) == false) ? nextVMDate : null,
		Nature_VM: req.body.employe.natureVM,
		Info3: req.body.employe.invalidite,
		Info4: (req.body.employe.tauxInvalidite == '') ? 0 : req.body.employe.tauxInvalidite,
		Info5: req.body.employe.surveillanceMedi,
		Contrat_type: req.body.employe.typeContrat,
		Contrat_duree: req.body.employe.dureeContrat,
		Contrat_essai: (isNaN(periodeEssai) == false) ? periodeEssai : null,
		Travail_type: req.body.employe.typeTravail,
		Travail_temps: (req.body.employe.tempsTravail == '') ? 0 : req.body.employe.tempsTravail,
		Remuneration1: (req.body.employe.remun == '') ? 0 : req.body.employe.remun,
		Remuneration2: req.body.employe.avantages,
		Entree: (isNaN(entree) == false) ? entree : null,
		Emploi: req.body.employe.emploi,
		Fonction: req.body.employe.fonction,
		Poste: req.body.employe.poste,
		Processus: req.body.employe.processus,
		Position: (req.body.employe.position == '') ? 0 : req.body.employe.position,
		Coefficient: (req.body.employe.coefficient == '') ? 0 : req.body.employe.coefficient,
		Locomotion: req.body.employe.moyenLocom,
		Vehicule_type: req.body.employe.typeLocom,
		Vehicule_immat: req.body.employe.imma,
		Permisc_type: req.body.employe.typePermis,
		Persmisc_num: req.body.employe.numPermis,
		Cartegrise_num: req.body.employe.numCarteGrise,
		Formation: '',
		Antenne: '',
		Commentaires: req.body.employe.commentaire,
		t_id_enr: '',
		t_statut: req.body.employe.statut,
		Categorie1: req.body.employe.categorie,
		Designation1: req.body.employe.initiales,
		Designation2: req.body.employe.designation,
		Ref: req.body.employe.references,
		t_etat: req.body.employe.etat,
		ICE_prenom: req.body.employe.prenomICE,
		AdressePlus: req.body.employe.adressePlus,
		CodePostal: req.body.employe.codePostal,
		Ville: req.body.employe.ville,
		Pays: req.body.employe.pays
	});

	res.status(200);
	res.json({'auth':'1'});
});

/*****************************************************************/
/*** Met à jours la table hr_user à l'aide de la fiche employé ***/
/*****************************************************************/
router.put('/updateInfosUser', function(req, res, next){
	var dateSortie = new Date(req.body.employe.dateSortie.split('/')[2] + "-" + req.body.employe.dateSortie.split('/')[1] + "-" + req.body.employe.dateSortie.split('/')[0]);
	var naissDate = new Date(req.body.employe.dateNaiss.split('/')[2] + "-" + req.body.employe.dateNaiss.split('/')[1] + "-" + req.body.employe.dateNaiss.split('/')[0]);
	var VMDate = new Date(req.body.employe.dateVM.split('/')[2] + "-" + req.body.employe.dateVM.split('/')[1] + "-" + req.body.employe.dateVM.split('/')[0]);
	var nextVMDate = new Date(req.body.employe.nextDateVM.split('/')[2] + "-" + req.body.employe.nextDateVM.split('/')[1] + "-" + req.body.employe.nextDateVM.split('/')[0]);
	var entree = new Date(req.body.employe.dateEntree.split('/')[2] + "-" + req.body.employe.dateEntree.split('/')[1] + "-" + req.body.employe.dateEntree.split('/')[0]);
	var dCarteSejour = new Date(req.body.employe.dateCarteSejour.split('/')[2] + "-" + req.body.employe.dateCarteSejour.split('/')[1] + "-" + req.body.employe.dateCarteSejour.split('/')[0]);
	var dCarteTravail = new Date(req.body.employe.dateCarteTravail.split('/')[2] + "-" + req.body.employe.dateCarteTravail.split('/')[1] + "-" + req.body.employe.dateCarteTravail.split('/')[0]);
	var periodeEssai = new Date(req.body.employe.periodeEssai.split('/')[2] + "-" + req.body.employe.periodeEssai.split('/')[1] + "-" + req.body.employe.periodeEssai.split('/')[0]);

	models.hr_user.update({
		Code: req.body.employe.nomUser,
		Password: req.body.employe.pwd,
		Profil: req.body.employe.typeProfil,
		cg_Admin: req.body.employe.gereConges,
		MultiSoc: req.body.employe.multiSoc,
		IsAdminOfficer: req.body.employe.isResAdmini,
		AdminOfficer: req.body.employe.responsableAdmini,
		Cout: req.body.employe.coutReel,
		SellingPrice: req.body.employe.coutVendu,
		Surname: req.body.employe.prenom,
		Name: req.body.employe.nom,
		Sexe: req.body.employe.sexe,
		Nom1: req.body.employe.nomJeuneFille,
		Prenoms: req.body.employe.prenoms,
		Adresse: req.body.employe.adresse,
		AdressePlus: req.body.employe.adressePlus,
		CodePostal: req.body.employe.codePostal,
		Ville: req.body.employe.ville,
		Pays: req.body.employe.pays,
		Tel1: req.body.employe.telUn,
		Tel2: req.body.employe.telDeux,
		email: req.body.employe.email,
		Naissance_date: (isNaN(naissDate) == false) ? naissDate : null,
		Naissance_lieu: req.body.employe.villeNaiss,
		Nationalite: req.body.employe.nationalite,
		Info2_Num: req.body.employe.numCarteSejour,
		Info2_Date: (isNaN(dCarteSejour) == false) ? dCarteSejour : null,
		Info3_Num: req.body.employe.numCarteTravail,
		Info3_Date: (isNaN(dCarteTravail) == false) ? dCarteTravail : null,
		Situation1: req.body.employe.situationFam,
		Enfants: req.body.employe.nbrEnfant,
		Info1: req.body.employe.numSecu,
		Society: req.body.employe.societe,
		Contrat_type: req.body.employe.typeContrat,
		Contrat_duree: req.body.employe.dureeContrat,
		Contrat_essai: (isNaN(periodeEssai) == false) ? periodeEssai : null,
		Travail_type: req.body.employe.typeTravail,
		Travail_temps: req.body.employe.tempsTravail,
		Categorie1: req.body.employe.categorie,
		Entree: (isNaN(entree) == false) ? entree : null,
		LeavingDate: (isNaN(dateSortie) == false) ? dateSortie : null,
		Emploi: req.body.employe.emploi,
		Fonction: req.body.employe.fonction,
		EmployeeClass: req.body.employe.qualification,
		Poste: req.body.employe.poste,
		Processus: req.body.employe.processus,
		Position: req.body.employe.position,
		Coefficient: req.body.employe.coefficient,
		Remuneration1: req.body.employe.remun,
		Remuneration2: req.body.employe.avantages,
		VM_date: (isNaN(VMDate) == false) ? VMDate : null,
		VM_infos: req.body.employe.conclVM,
		Next_VM_Date: (isNaN(nextVMDate) == false) ? nextVMDate : null,
		Nature_VM: req.body.employe.natureVM,
		Info3: req.body.employe.invalidite,
		Info4: req.body.employe.tauxInvalidite,
		Info5: req.body.employe.surveillanceMedi,
		Locomotion: req.body.employe.moyenLocom,
		Vehicule_type: req.body.employe.typeLocom,
		Vehicule_immat: req.body.employe.imma,
		CarHorsePower: req.body.employe.puissance,
		Permisc_type: req.body.employe.typePermis,
		Persmisc_num: req.body.employe.numPermis,
		Cartegrise_num: req.body.employe.numCarteGrise,
		ICE_prenom: req.body.employe.prenomICE,
		ICE_nom: req.body.employe.nomICE,
		ICE_numero: req.body.employe.numICE,
		ICE_mail: req.body.employe.mailICE,
		t_etat: req.body.employe.etat,
		t_statut: req.body.employe.statut,
		Ref: req.body.employe.references,
		Designation1: req.body.employe.initiales,
		Designation2: req.body.employe.designation,
		Commentaires: req.body.employe.commentaire,
		PartialTime: (req.body.employe.typeTravail == 'Partial') ? 'Y' : 'N'
	}, {
		where: {Code: req.body.employe.nomUser}
	});

	res.status(200);
	res.json({'auth':'1'});
});

/********************************************************/
/*** Récupère la liste des responsable administrateur ***/
/********************************************************/
router.get('/getResponsableAdmin', function(req, res, next){
	models.hr_user.findAll({
		order: [['Name','ASC']],
		where: {isAdminOfficer: 'Y'}
	}).then(function(resultat){
		res.status(200);
		res.json({'listRespAdmin': resultat, 'auth':'1'});
	})
})

/******************************************************/
/*** Récupère la liste des tous les employés actifs ***/
/******************************************************/
router.get('/getListEmploye', function(req, res, next){
	models.sequelize.query("SELECT *, u.Name as NameUser, u.Code as CodeUser FROM hr_user u " +
		"INNER JOIN hr_society s ON s.Code = u.Society " +
		"LEFT JOIN hr_role r ON r.User = u.Code " +
		"INNER JOIN hr_groupe g ON g.Grp_Code = r.Group " +
		"LEFT JOIN hr_employeeClass e ON e.Code = u.EmployeeClass " +
		"Where u.Leaving = 'N' " +
		"Group By(u.Code) " +
		"ORDER BY u.Name ASC")
	.then(function(resultat){
		res.status(200);
		res.json({'listUser': resultat[0], 'auth': '1'});
	});
});

/*************************************************/
/*** Récupère la liste des utilisateurs actifs ***/
/*************************************************/
router.get('/getListUser', function(req, res, next){
	models.hr_user.findAll({
		attributes: ['Code'],
		order: [['Code', 'ASC']],
		where: {'Leaving': 'N'}
	}).then(function(resultat){
		res.status(200);
		res.json({'listUser': resultat, 'auth':'1'});
	});
});

/******************************************************/
/*** Récupère la liste des tous les employés partis ***/
/******************************************************/
router.get('/getListEmployeLeaving', function(req, res, next){
	models.sequelize.query("SELECT *, u.Name as NameUser, u.Code as CodeUser FROM hr_user u " +
		"INNER JOIN hr_society s ON s.Code = u.Society " +
		"Where u.Leaving = 'Y' " +
		"Group By(u.Code) " +
		"ORDER BY u.Name ASC")
	.then(function(resultat){
		res.status(200);
		res.json({'listUserLeaving': resultat[0], 'auth': '1'});
	});
});


/************************************************************/
/*** Récupère la liste de tous les employés d'une société ***/
/************************************************************/
router.get('/getListEmployeBySoc', function(req, res, next){
	models.hr_user.findAll({
		order: [['Name', 'ASC']],
		where: {Society: req.query.idSoc, Leaving: 'N'}
	}).then(function(resultat){
		res.status(200);
		res.json({'listUser': resultat, 'auth':'1'});
	});
});

/******************************************************************************/
/*** Récupère la liste des employés correspondant aux critères de recherche ***/
/******************************************************************************/
router.get('/getEmployees', function(req, res, next){
	models.hr_user.findAll({
		order: [['Name','ASC']],
		where: {EmployeeClass: req.query.employe.qualification}
	}).then(function(resultat){
		res.status(200);
		res.json({'listEmployees': resultat, 'auth':'1'});
	})
})

module.exports = router;
