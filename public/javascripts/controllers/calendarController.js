/***
Controlleur permettant de gérer les pointages effectué sur le calendrier
View: index.html
***/
app.controller('calendarController', ['$scope', '$http', 'sharedData', 'ngDialog', '$rootScope', '$cookies', '$timeout', '$window', function($scope, $http, sharedData, ngDialog, $rootScope, $cookies, $timeout, $window) {
	/*****************************************/
	/********* Déclaration variable **********/
	/*****************************************/
	$scope.trTable = "";
	$scope.dayOfWeek = ["Lu", "Ma", "Me", "Je", "Ve", "Sa", "Di"];
	$scope.numDay = 0;
	$scope.onlyNumbers = "^[0-9-]*$";

	var tableJourPointee = [];
	var semaineUne = [];
	var semaineDeux = [];
	var semaineTrois = [];
	var semaineQuatre = [];
	var semaineCinq = [];
	var semaineSix = [];
	var dateActuel = 0;

	if(sharedData.getDateActuel != null){
		dateActuel = sharedData.getDateActuel();
	}
	else
	{
		dateActuel = new Date(Date.now());
	}

	var pointages = sharedData.getTablePointage();
	var tempsTotalMois = 0;

	// On place notre calendrier de façon à voir le jour actuel
	if(dateActuel.getDate() >= 26)
	{
		dateActuel.setMonth(dateActuel.getMonth() + 1, 15);
	}
	else
	{
		dateActuel.setMonth(dateActuel.getMonth(), 15);
	}

	/*****************************************/
	/******* Construction calendrier *********/
	/*****************************************/
	buildCalendar(dateActuel);


	/*******************************************/
	/**** Chargement des pointages existants ***/
	/*******************************************/
	loadPointages();

	// Fonction permettant de rafraichir les pointages
	$rootScope.$on("refresh", function(event){
		// On charge les pointages afin d'afficher les nouveaux
		loadPointages();
	});
	
	// Fonction permettant de générer un calendrier du 26 au 25
	function buildCalendar(dateActuel)
	{
		// Affichage du mois actuel
		$scope.dateEntete = sharedData.getNameMonthByIndex(dateActuel.getMonth() + 1) + " " + dateActuel.getFullYear();
		
		// Le jours de la semaine correspondant au jour 26 (Première date du calendrier)
		var FirstDay = new Date(dateActuel.getFullYear(), (dateActuel.getMonth() - 1), 26);

		// Nombre de jours concernant le mois précedent
		var numberDayMonthPrevious = numberDaysInMonth(dateActuel.getMonth(), dateActuel.getFullYear());

		// On remplit les premières cases à vide si le calendrier ne démarre pas le lundi même.
		remplirCaseVideDebut(FirstDay.getDay());

		// On remplit le mois précedent (du 26 à la fin du mois)
		for(var i = 26; i <= numberDayMonthPrevious; i++)
		{	
			if(semaineUne.length < 7)
			{
				semaineUne.push(i);
			}
			else if(semaineDeux.length < 7)
			{
				semaineDeux.push(i);
			}
			
		}

		// On remplit le mois actuel (du 1 au 25)
		for(var j = 1; j <= 25; j++)
		{
			if(semaineUne.length < 7)
			{ 
				semaineUne.push(j);
			}
			else if(semaineDeux.length < 7)
			{
				semaineDeux.push(j);
			}
			else if(semaineTrois.length < 7)
			{
				semaineTrois.push(j);
			}
			else if(semaineQuatre.length < 7)
			{
				semaineQuatre.push(j);
			}
			else if(semaineCinq.length < 7)
			{
	 			semaineCinq.push(j);  
			}
			else if(semaineSix.length < 7)
			{
				semaineSix.push(j); 
			}	  
		} 

		// On finit de remplir nos semaine par des case vides
		remplirCaseVideFin(semaineCinq);
		remplirCaseVideFin(semaineSix);

		$scope.tableDays = [{index:0, semaine:semaineUne},
							{index:1, semaine:semaineDeux},
							{index:2, semaine:semaineTrois},
							{index:3, semaine:semaineQuatre},
							{index:4, semaine:semaineCinq},
							{index:5, semaine:semaineSix}]; 
	}
	/******************************************/
	/*** Cliquer sur un jour du calendrier ****/
	/******************************************/
	$scope.clickDate = function(index, day){
		if(angular.element(document.querySelector('#day' + day + '')).attr('class') != undefined){
			if(angular.element(document.querySelector('#day' + day + '')).attr('class').indexOf("week-end") == -1 
			&& angular.element(document.querySelector('#day' + day + '')).attr('class').indexOf("jour-ferier") == -1  
			&& angular.element(document.querySelector('#day' + day + '')).toString() != "[]"){
				// On ouvre la popup pour ajouter un nouveau pointage et non pour le modifier.
				// On attribue donc au pointageUpdate null
				sharedData.setPointageUpdate({id: null, jour: null, temps: null, idAffaire: null, idTache: null, comment: null});
	        	ngDialog.open({ template: 'templateId' });
			}
		}		

		sharedData.setDateActuel(dateActuel);

		if(day >= 26)
		{
			if(dateActuel.getMonth() == 0)
			{
				sharedData.setDatePointage(day + " " + sharedData.getNameMonthByIndex(12));
			}
			else
			{
				sharedData.setDatePointage(day + " " + sharedData.getNameMonthByIndex(dateActuel.getMonth()));
			}
		}
		else
		{
			sharedData.setDatePointage(day + " " + sharedData.getNameMonthByIndex(dateActuel.getMonth() + 1));
		}  

		sharedData.setDaySelect(day);
	}


	// Fonction qui retourne le nombre de jours dans un mois
	function numberDaysInMonth(month, year){
		return new Date(year, month, 0).getDate();
	}

	// Fonction qui remplit les premieres case vide du calendrier (< 26)
	function remplirCaseVideDebut(index){
		var nbrTour = 0;

		switch(index) {
			case 0:
				nbrTour = 6;
			break;
			case 1:
				nbrTour = 0; 
			break;
			case 2:
				nbrTour = 1;
			break;
			case 3:
				nbrTour = 2;
			break;
			case 4:
				nbrTour = 3;
			break;
			case 5:
				nbrTour = 4;
			break;
			case 6:
				nbrTour = 5;  
			break;
		}

		for(var j = 1; j <= nbrTour; j++){ 
			if(semaineUne.length < 7){
				semaineUne.push(" ");
			} 	
		}
	} 

	// Function qui remplit les dernières case vide du calendrier (> 25)
	function remplirCaseVideFin(semaine) {
		for(var i = 0; i < semaine.length; i++){
			if(semaine.length < 7){
				semaine.push(" ");
		    }
		}
	}   

	/**********************/
	/*** Mois précédent ***/
	/**********************/
	$scope.btnPrevious = function(){
		dateActuel.setMonth(dateActuel.getMonth() - 1);

		semaineUne = [];
		semaineDeux = [];
		semaineTrois = [];
		semaineQuatre = [];
		semaineCinq = []; 
		semaineSix = [];

		buildCalendar(dateActuel);

		// Envoyée au controlleur "indexController"
		$scope.$emit("datePointage", {'dateActu':dateActuel, 'totalMois':tempsTotalMois});
		sharedData.setDateActuel(dateActuel);

		loadPointages();
	}

	/**********************/
	/*** Mois Suivant ***/
	/**********************/
	$scope.btnNext = function(){
		dateActuel.setMonth(dateActuel.getMonth() + 1);

		semaineUne = [];
		semaineDeux = [];
		semaineTrois = [];
		semaineQuatre = [];
		semaineCinq = []; 
		semaineSix = [];

		buildCalendar(dateActuel);

		// Envoyée au controlleur "indexController"
		$scope.$emit("datePointage", {'dateActu':dateActuel, 'totalMois':tempsTotalMois});
		sharedData.setDateActuel(dateActuel);

		loadPointages();
	}

	/*************************************************************************************************/
	/***  Afficher le tableau de pointage selon le mois  (Tableau situé en dessous du calendrier)  ***/
	/*************************************************************************************************/
	function afficherPointageDuMois(table){ // Le tableau "table" contient tout les pointages de l'utilisateurs
		var pointagesTemp = [];

		for(var i = 0; i < table.length; i++){
			var dateT = new Date(table[i].dateComplete);
			if(dateT.getDate() >= 26){
				if(dateT.getMonth() == 11){
					if(dateActuel.getMonth() == 0 && dateT.getFullYear() + 1 == dateActuel.getFullYear()){
						// le tableau "table" contient la totalité des pointages
						table[i].affaires = table[i].affaires.split(" ")[0];
						pointagesTemp.push(table[i]);
					}
				}
				else
				{
					if(dateT.getMonth() + 1 == dateActuel.getMonth() && dateT.getFullYear() == dateActuel.getFullYear()){
						// le tableau "table" contient la totalité des pointages
						table[i].affaires = table[i].affaires.split(" ")[0];
						pointagesTemp.push(table[i]);
					}
				}
			}
			else
			{
				if(dateT.getMonth() == dateActuel.getMonth() && dateT.getFullYear() == dateActuel.getFullYear()){
					// le tableau "table" contient la totalité des pointages
					table[i].affaires = table[i].affaires.split(" ")[0];
					pointagesTemp.push(table[i]);
				}
			}
		}
		// On envoie le nouveau tableau à pointageController
		$scope.$emit("tabPointages", pointagesTemp);
	}

	/**********************************/
	/***** On bloque les week-end *****/
	/**********************************/
	function bloquerWeekEnd(m, y)
	{
		// Du 26 à la fin du mois précedent
    	for(var j = 26; j <= numberDaysInMonth(m, y); j++){

    		// Gérer case vide
    		if(angular.element(document.querySelector('#day' + j + '')).toString() != "[]"){
				angular.element(document.querySelector('#day' + j + '')).attr('class', "isNotEmpty");
			}

    		var d = new Date(y, m, j);

    		// On ajuste la date
    		if(d.getMonth() == 0){
    			d = new Date(y - 1, 11, j);
    		}
    		else
    		{
    			d = new Date(y, m - 1, j);
    		}

    		if(d.getDay() == 0 || d.getDay() == 6){
    			angular.element(document.querySelector('#day' + j + '')).attr('class',"week-end");
    		}    
    	}
    	// Du 1er au 26 du mois actuel
    	for(var i = 1; i < 26; i++){
    		// Gérer case vide
    		if(angular.element(document.querySelector('#day' + i + '')).toString() != "[]"){
				angular.element(document.querySelector('#day' + i + '')).attr('class', 'isNotEmpty');
			}

    		var d = new Date(y, m, i);

    		if(d.getDay() == 0 || d.getDay() == 6){
    			angular.element(document.querySelector('#day' + i + '')).attr('class',"week-end");
    		}
    	}
	}

	/************************************************************************************/
	/*** Affiche les dates pointées sur le calendrier (Seulement le mois sélectionné) ***/
	/************************************************************************************/
	function afficherDatePointee(table, month, year){
		for(var i = 0; i < table.length; i++)
		{
			var dateT = new Date(table[i].jour);
			if(dateT.getDate() >= 26)
			{
				if(dateT.getMonth() == 11)
				{
					if(month == 0 && dateT.getFullYear() + 1 == year)
					{
						daySelect = angular.element(document.querySelector('#day' + dateT.getDate() + '')).attr('class', '' + table[i].maClass + '');
					}
				}
				else
				{
					if(dateT.getMonth() + 1 == month && dateT.getFullYear() == year)
					{
						angular.element(document.querySelector('#day' + dateT.getDate() + '')).attr('class', '' + table[i].maClass + '');
					}
				}
			}
			else
			{
				if(dateT.getMonth() == month && dateT.getFullYear() == year)
				{
					angular.element(document.querySelector('#day' + dateT.getDate() + '')).attr('class', '' + table[i].maClass + '');
				}
			}
		}
	}
	/*************************************************/
	/*** Chargement des pointages de l'utilisateur ***/
	/*************************************************/
	function loadPointages(){
		var user = $cookies.getObject('cookieUser').user.Code;
		tempsTotalMois = 0;
		var yearTemp = dateActuel.getFullYear();
		var moisTemp = dateActuel.getMonth();
		sharedData.setDateActuel(dateActuel);

		if(dateActuel.getMonth() == 0){
			moisTemp = 12;
			yearTemp--;
		}
		/***
			Requète AJAX permettant de récupérer tous les pointages d'un utilisateur sur une période donnée
			Paramètres: "user" => id de l'utilisateur
						"dStart" => date de début
						"dEnd" => date de fin
						"order" => ordre de tri des pointages
			Sortie: "pointages" => Tableau contenant tout les pointages de l'utilisateur (Pour tableau situés sous le calendrier)
					"tableJourPointee" => Tableau contenant un tableau de pointage pour chaque jours pointée (Pour calendrier)
					"tempsTotalMois" => Temps total pointé dans le mois pour l'utilisateur authentifié
		***/
		$http({
			url: '/pointages/getPointage?user=' + user + "&order=Jour"
			+ "&dStart=" + yearTemp + "/" + moisTemp + "/26" 
			+ "&dEnd=" + dateActuel.getFullYear() + "/" + (dateActuel.getMonth() + 1) + "/25",
			method: 'GET',
			datatype: 'json',
			contentType: 'text/plain',
			headers:{'Content-type': 'application/json'}
		})
		.success(function(res, status){
			if(status == 200){
				if(res.auth == null){
					$window.location.href="/?timeOut";

					return;
				}

				pointages = res.pointages;
				tableJourPointee = res.tableJourPointee;
				tempsTotalMois = res.tempsTotalMois;

				afficherPointageDuMois(pointages);

				// On enregistre le tableau pointages dans un service afin de le transmettre à un autre contolleur.
				sharedData.setTablePointage(pointages);

				/**********************************************/
				/*** Attribution code couleur aux pointages ***/
				/**********************************************/
				var tempsMaxPartiel = 8;

				if($cookies.getObject('cookieUser').weekType == "O1"){
					tempsMaxPartiel = 7;	// Temps complet à 7h
				}
				else
				{
					tempsMaxPartiel = 8;    // Temps complet à 8h
				}

				for(var j = 0; j < tableJourPointee.length; j++){
					var dateTemp = new Date(tableJourPointee[j].jour);
					
					if(isFerier(new Date(tableJourPointee[j].jour))){
						if(dateTemp.getDay() != 0 && dateTemp.getDay() != 6){
							tableJourPointee[j].maClass = "jour-ferier";
						}	
					}
					else
					{
						if(tableJourPointee[j].temps > 10)
						{
							tableJourPointee[j].maClass = "point-sup-dix";
						}
						else if(tableJourPointee[j].temps >= tempsMaxPartiel){
							tableJourPointee[j].maClass = "point-complet";
						}
						else
						{
							// Si le pointage est un vendredi, le pointage complet est à 7 heures
							if(dateTemp.getDay() == 5){
								if(tableJourPointee[j].temps >= 7){
									tableJourPointee[j].maClass = "point-complet";
								}
								else
								{
									tableJourPointee[j].maClass = "point-partiel";
								}
							}
							else
							{
								tableJourPointee[j].maClass = "point-partiel";
							}
						}
					}
				}

				// On envoie ses données à un autre controlleur. "indexController"
				$scope.$emit("datePointage", {'dateActu':dateActuel, 'totalMois':tempsTotalMois});

				// On bloque les week ends uniquement concernant le mois actuel
				bloquerWeekEnd(dateActuel.getMonth(), dateActuel.getFullYear());

				// On affiche les jours ferié uniquement concernant le mois actuel
				gestionJoursFeriee(dateActuel);

				// On affiche les pointages du mois sur le calendrier
				afficherDatePointee(tableJourPointee, dateActuel.getMonth(), dateActuel.getFullYear());

				/******************************************************/
				/*** On identifie le jours actuel sur le calendrier ***/
				/******************************************************/
				var day = new Date(Date.now());

				if(day.getDate() >= 26){
					if(day.getMonth() == 11)
					{
						if(dateActuel.getMonth() == 0 && day.getFullYear() + 1 == dateActuel.getFullYear()){
							angular.element(document.querySelector('#day' + day.getDate() + '')).addClass("jour-actu");
						}
					}
					else
					{
						if(day.getMonth() + 1 == dateActuel.getMonth() && day.getFullYear() == dateActuel.getFullYear()){
							angular.element(document.querySelector('#day' + day.getDate() + '')).addClass("jour-actu");
						}
					}
				}
				else{
					if(day.getMonth() == dateActuel.getMonth() && day.getFullYear() == dateActuel.getFullYear()){
						angular.element(document.querySelector('#day' + day.getDate() + '')).addClass("jour-actu");
					}
				}
			}
		})
		.error(function(res){
			console.log("Pointage non récupéré");
		})
	}


	/**************************************************/
	/*** Calcul l'index du jours dans le calendrier ***/
	/**************************************************/
	$scope.getNumDay = function(ligne,col){
		return (6 * ligne)	+ (col + ligne);
	}

	/**********************************************/
	/*** Calcule tout les jours férié de l'année **/
	/**********************************************/
	function calculateDayFerier(){
		var joursFeriee = [];
		joursFeriee = [{ 'day': 1, 'month': 0},		// 1er janvier
						  {'day': 1, 'month':4},	// 1er mai
						  {'day': 8, 'month':4},	// 8 mai
						  {'day': 14, 'month':6},	// 14 juillet
						  {'day': 15, 'month':7},	// 15 aout
						  {'day': 1, 'month':10},	// 1er novembre
						  {'day': 11, 'month':10},  // 11 novembre
						  {'day': 25, 'month':11}];	// 25 décembre

		// Lundi de paques
		var datePaques = getDatePaques(dateActuel.getFullYear());
		//var dateP = new Date(datePaques.getFullYear(), datePaques.getMonth(), datePaques.getDate(), 2);

		// Ascension
		var dateAscension = new Date(datePaques.getFullYear(), datePaques.getMonth(), datePaques.getDate() + 38);

		// Pentecôte
		var datePentecote = new Date(dateAscension.getFullYear(), dateAscension.getMonth(), dateAscension.getDate() + 11);

		// On finis d'ajouter nos jour férié
		joursFeriee.push({'day':datePaques.getDate(), 'month':datePaques.getMonth()});
		joursFeriee.push({'day':dateAscension.getDate(), 'month':dateAscension.getMonth()});
		joursFeriee.push({'day':datePentecote.getDate(), 'month':datePentecote.getMonth()});

		return joursFeriee;
	}

	/***************************************************************************/
	/*** Retourne true si le jours passé en paramètre est férié, false sinon ***/
	/***************************************************************************/
	function isFerier(dateT){
		var joursFeriee = calculateDayFerier();

		for(var i = 0; i < joursFeriee.length; i++){
			if(joursFeriee[i].month == dateT.getMonth()){
				if(joursFeriee[i].day == dateT.getDate()){
					return true;
				}
			}
		}

		return false;
	}

	/*******************************/
	/*** Gestion des jours férié ***/
	/*******************************/
	function gestionJoursFeriee(dateActu){
		var joursFeriee = calculateDayFerier();
		var verif = new Date();
		var tabVerif = [];

		// On affiche les jours férié
		for(var i = 0; i < joursFeriee.length; i++){

			if(joursFeriee[i].day >= 26)
			{
				if(dateActu.getMonth() == 0){
					if(joursFeriee[i].month == 11){
						afficherJoursFeriee(dateActu, joursFeriee, i, tabVerif, verif);
					}
				}
				else
				{
					if((dateActu.getMonth() -1) == joursFeriee[i].month){
						afficherJoursFeriee(dateActu, joursFeriee, i, tabVerif, verif);
					}
				}
			}
			else
			{
				if(dateActu.getMonth() == joursFeriee[i].month){
					afficherJoursFeriee(dateActu, joursFeriee, i, tabVerif, verif);
				}
			}
		}

		/********************************************/
		/**** POINTER JOUR FERIER AUTOMATIQUEMENT ***/
		/********************************************/
		for(var i = 0; i < tabVerif.length; i++){
			if(tabVerif[i].getDay() != 0 && tabVerif[i].getDay() != 6){
				gererJourFerierBDD(i, tabVerif);
			}
		}

		for(var i = 0; i < joursFeriee.length; i++){
			if(dateActu.getMonth() == joursFeriee[i].month){
				verif = new Date(dateActu.getFullYear(), joursFeriee[i].month, joursFeriee[i].day, 0);

				if(verif.getDay() != 0 && verif.getDay() != 6){
					angular.element(document.querySelector('#day' + joursFeriee[i].day + '')).removeClass("isNotEmpty");
					angular.element(document.querySelector('#day' + joursFeriee[i].day + '')).addClass("jour-ferier");
				}
			}
		}
	}

	/*****************************************/
	/*** Permet d'afficher un jours fériée ***/
	/*****************************************/
	function afficherJoursFeriee(dateActu, joursFeriee, i, tabVerif, verif){
		// On vérifie si le jours férié tombe pendant un week end

		verif = new Date(dateActu.getFullYear(), joursFeriee[i].month, joursFeriee[i].day, 0);
		
		tabVerif.push(verif);

		if(verif.getDay() != 0 && verif.getDay() != 6){
			angular.element(document.querySelector('#day' + joursFeriee[i].day + '')).removeClass("isNotEmpty");
			angular.element(document.querySelector('#day' + joursFeriee[i].day + '')).addClass("jour-ferier");
		}
	}

	/********************************************************/
	/*** Vérifie dans la bdd, et/ou ajoute un jours férié ***/ 
	/********************************************************/
	function gererJourFerierBDD(i, tabVerif){
		/***
			Requète AJAX permettant de vérifier si un jour férié a déjà été pointé
			Paramètres: "id" => id de l'utilisateur
						"date" => la date du jours férié
			Sortie: "dateJF" => les informations du pointage
					"auth" => Variable permettant d'indiquer qu'une requète a été effectué
		***/
		$http({
				url: '/pointages/getJF?id=' + $cookies.getObject('cookieUser').user.Code + '&date=' + tabVerif[i],
				method: 'GET',
				datatype: 'json',
				contentType: 'text/plain',
				headers:{'Content-type': 'application/json'}
			})
			.success(function(res, status){
				if(status == 200){
					if(res.auth == null){
						$window.location.href="/?timeOut";

						return;
					}

					var dateTemp = new Date(tabVerif[i].getFullYear(), tabVerif[i].getMonth(), tabVerif[i].getDate(), 2);

					if(res.dateJF.length == 0){
						/***
							Requète AJAX permettant d'enregistrer un nouveau pointage sur un jour férié
							Paramètres: "id" => id de l'utilisateur
										"date" => date de pointage
										"temps" => Durée du pointage
							Sortie: "auth" => Variable permettant d'indiquer qu'une requète a été effectué
						***/
						$http({
							url: '/pointages/saveJF',
							method: 'POST',
							datatype: 'json',
							data: {'id': $cookies.getObject('cookieUser').user.Code, 'date':dateTemp, 'temps':($cookies.getObject('cookieUser').weekType == 'O1') ? 7 : (dateTemp.getDay() == 5) ? 7 : 8},
							contentType: 'text/plain',
							headers:{'Content-type': 'application/json'}
						})
						.success(function(result, stat){
							if(stat == 200){
								if(result.auth == null){
									$window.location.href="/?timeOut";

									return;
								}

								loadPointages();
							}
						})
						.error(function(result){
							console.log("Impossible de pointer les jours férié");
						})
					}
				}
			})
			.error(function(res){
				console.log("Impossible de récupérer le jours férié");
			})
	}

	/********************************/
	/*** Retourne jours de paques ***/
	/********************************/
	function getDatePaques(Y) {
	    var C = Math.floor(Y/100);
	    var N = Y - 19*Math.floor(Y/19);
	    var K = Math.floor((C - 17)/25);
	    var I = C - Math.floor(C/4) - Math.floor((C - K)/3) + 19*N + 15;
	    I = I - 30*Math.floor((I/30));
	    I = I - Math.floor(I/28)*(1 - Math.floor(I/28)*Math.floor(29/(I + 1))*Math.floor((21 - N)/11));
	    var J = Y + Math.floor(Y/4) + I + 2 - C + Math.floor(C/4);
	    J = J - 7*Math.floor(J/7);
	    var L = I - J;
	    var M = 3 + Math.floor((L + 40)/44);
	    var D = L + 28 - 31*Math.floor(M/4);

	    return new Date(Y, addZero(M-1), addZero(D+1));
	}

	/**********************************************************************/
	/*** Retourne un nombre avec un zéro devant s'il est inférieur à 10 ***/
	/**********************************************************************/
	function addZero(number) { return (number < 10) ? '0' + number : number; }
}]);