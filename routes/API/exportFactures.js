var express = require('express');
var router = express.Router();
var models = require('../../models');
var multer  =   require('multer');
//XLSX = require('xlsx');

var storageExcel = multer.diskStorage({
	destination: function(req, file, cb){
		cb(null, './uploads/excelFile/')
	},
	filename: function(req, file, cb){
		var dateTimesTamp = Date.now();

		req.session.urlExcelFile = dateTimesTamp + "-" + Math.floor((Math.random () * 1000000000) + 1) + '.' + file.originalname.split('.')[file.originalname.split('.').length -1];

		cb(null, req.session.urlExcelFile)
	}
});

var uploadExcel = multer({ storage: storageExcel}).single('file');

/**********************************************/
/*** Upload un fichier excel sur le serveur ***/
/**********************************************/
router.put('/uploadExcelFile', function(req, res, next){
	 uploadExcel(req,res,function(err){
        if(err){
             res.json({error_code:1,err_desc:err});
             return;
        }


        models.hr_export_factures.create({
        	Name: req.body.nameFile,
        	URL: req.session.urlExcelFile
        });

	  	res.json({error_code:0,err_desc:null});
    })
});

/**************************************/
/*** Récupère la liste des factures ***/
/**************************************/
router.get('', function(req, res, next){
	/*var workbook = XLSX.readFile('./uploads/excelFile/1504081704262-427589786.xls');
	var sheet_name_list = workbook.SheetNames;
	var xlDAta = XLSX.utils.sheet_to_json(workbook.Sheets[sheet_name_list[0]]);*/

	models.hr_export_factures.findAll({
		order: [['Code', 'ASC']]
	})
	.then(function(resultat){
		res.status(200);
		res.json({'listeFacture': resultat, 'auth':'1'});
	})
});

/*************************************************************************************************/
/*** Récupère une facture à l'aide de son ID et le numéro d'affaire à l'aide de l'export Excel ***/
/*************************************************************************************************/
router.get('/getFactureByCode', function(req, res, next){
	// On effectue une requète dans le but de récupérer une facture de la base de données à l'aide de son ID
	models.hr_export_factures.find({
		where: {Code: req.query.codeFacture}
	})
	.then(function(resultat){
		models.hr_affaire.belongsTo(models.hr_owners, {foreignKey: 'OwnerID'});

		models.hr_affaire.findAll({
			order: [['Code', 'ASC']],
			include: [{model:models.hr_owners}]
		})
		.then(function(listeAffaire){
			// Déclaration Variable
			var tabCodeAffaire = [];
			var affaires = [];
			var strCodeAffaire = "";
			var strMontant = "";

			// On récupère l'URL de l'export excel depuis la base de données
			var workbook = XLSX.readFile('./uploads/excelFile/' + resultat.URL);

			// On récupère le nombre de ligne à l'aide de l'object Json récupéré
			var nbrRow = workbook.Sheets.Sheet['!rows'].length - 2; // -2 Pour enlever la première et dernière ligne qui nous sont inutile

			// On boucle selon le nombre de ligne
			for(var i = 2; i < nbrRow; i++){
				// On récupère toutes les cases en H: Par exemple : H1, H2, H3, ...
				strCodeAffaire = workbook.Sheets.Sheet['H' + i];
				strMontant = workbook.Sheets.Sheet['D' + i];

				// Detection si la case est vide
				if(strCodeAffaire != undefined){
					// On supprime le préfixe 'DV ' de chaque ligne
					strCodeAffaire.w = strCodeAffaire.w.replace("DV ","");

					// On supprime le suffixe '\n' de chaque ligne
					strCodeAffaire.w = strCodeAffaire.w.replace("\n", "");

					// On enregistre notre code d'affaire dans un tableau afin de les lister
					tabCodeAffaire.push({'codeAffaire':strCodeAffaire.w, 'montant': strMontant.w});
				}
			}

			for(var i = 0; i < listeAffaire.length; i++){
				for(var j = 0; j < tabCodeAffaire.length; j++){
					if(listeAffaire[i].Code == tabCodeAffaire[j].codeAffaire){
						affaires.push({'affaire':listeAffaire[i], 'montant': tabCodeAffaire[j].montant});
					}
				}
			}

			// On indique le status de la requète (200 => Succès de la requète)
			res.status(200);

			// On retourne au client la facture récupérer, ainsi que le tableau contenant la liste des 'code affaire'
			res.json({'facture': resultat, 'tabCodeAffaire': affaires, 'auth':'1'});
		})
	})
});

module.exports = router;
