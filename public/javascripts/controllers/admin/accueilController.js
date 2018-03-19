/***
Controlleur permettant de gérer la page d'accueil du menu chargé d'affaire/admin
Partial: /admin/accueil.html
***/
app.controller('accueilController', ['$scope', '$http', 'sharedData', '$cookies', '$window', '$location','ngDialog', function($scope, $http, sharedData, $cookies, $window, $location, ngDialog) {
	$scope.selectedName = '0';
	$scope.tabSociety = [];
	//$scope.Progression = '48';
	$scope.isLoading = true;

	var url = "";

	if($cookies.getObject('cookieUser').user.MultiSoc == "Y"){
		/***
			Requète AJAX permettant de récupérer toutes les sociétés
			Paramètres:
			Sortie: "allSociety" => tableau d'objet contenant la liste de toutes les sociétés du groupe EH
					"auth" => Variable permettant d'indiquer qu'une requète a été effectué
		***/
		url = '/society/getAllSociety';
	}
	else
	{
		/***
			Requète AJAX permettant de récupérer une ou plusieurs société où l'utilisateur est associé
			Paramètres: "user" => id de l'utilisateur
			Sortie: "numGroup" => Objet ou tableau d'objet contenant la ou les sociétés de l'utilisateur
					"auth" => Variable permettant d'indiquer qu'une requète a été effectué
		***/
		url = '/roles?user=' + $cookies.getObject('cookieUser').user.Code;
	}

	getNameSociety(url);

	/**************************************************************/
	/*** Function permettant de changer l'élément actif du menu ***/
	/**************************************************************/
	$scope.setActive = function(name){

		$scope.isLoading = true;
		$scope.selectedName = name;
	}

	/****************************************************************/
	/*** Function permettant d'afficher les details d'une affaire ***/
	/****************************************************************/
	$scope.openDetailsAffaire = function(id){
		// Envoie variable par URL
		$location.path('/admin/index/detailsAffaire/').search({idAffaire: id});
	}

	/***************************************************************************************/
	/*** Function permettant de modifier à la volée l'avancement théorique d'une affaire ***/
	/***************************************************************************************/
	$scope.openModifProgress = function(id){
		/*$location.path('/admin/index/detailsAffaire/').search({idAffaire: id});*/
		ngDialog.open({
			scope: $scope,
			template: '../../javascripts/partials/pop-up/templateProgress.html',
			controller: $controller('editAffaireController', {
				$scope: $scope,
				idAffaire: id,
				progress: $scope.Progression
			})
		});
	}



	/********************************/
	/*** Récupe nom d'une société ***/
	/********************************/
	function getNameSociety(url){
		$http({
			url: url,
			method: 'GET',
			datatype: 'json',
			contentType: 'text/plain',
			headers: {'Content-Type': 'application/json'}
		})
		.success(function(result){
			if(result.auth == null){
				$window.location.href="/?timeOut";

				return;
			}

			/** Déclaration Variable **/
			var groupID = [];
			var numIndex = 0;

			/** Si l'utilisateur a accès à toute les société **/
			if($cookies.getObject('cookieUser').user.MultiSoc == "Y"){
				groupID = result.allSociety;

				for(var i = 0; i < groupID.length; i++){
					$scope.tabSociety.push({'name': groupID[i].Name, 'index':i, 'id':groupID[i].Code});
				}
			}
			else /** Si l'utilisateur n'a accès qu'a certaines société **/
			{
				groupID = result.numGroup;

				for(var i = 0; i < groupID.length; i++){
					$scope.tabSociety.push({'name':groupID[i].hr_groupe.Grp_Libelle, 'index':i, 'id':groupID[i].hr_groupe.Society});
				}
			}

			numIndex = groupID.length;

			/** On ajoute 'Administratif' pour certain profil **/
			if($cookies.getObject('cookieUser').user.Profil == "A" || $cookies.getObject('cookieUser').user.MultiSoc == "Y"){
				$scope.tabSociety.push({'name': 'Administratif', 'index':groupID.length, 'id':'ADMINI'});
				numIndex++;
			}

			$scope.tabSociety.push({'name': 'Prévisionnelle', 'index':numIndex, 'id':'PREV'});
			$scope.tabSociety.push({'name': 'Mes Affaires', 'index':numIndex + 1, 'id':'MYAFF'});

			$scope.loadAffaire($scope.tabSociety[0].id);
		})
		.error(function(result){
			console.log("Impossible de récupérer les ID des sociétés");
		});
	}

	$scope.loadAffaire = function(id){
		$scope.tabAffaires = [];

		/****************************/
		/*** Onglet administratif ***/
		/****************************/
		if(id == "ADMINI"){
			$scope.tabAffaires = [];
			/***
				Requète AJAX permettant de récupérer la liste des affaires administratives et des clients associés
				Paramètres:
				Sortie: "listeAdminist" => tableau contenant la liste des affaires administratives et des clients associés
						"auth" => Variable permettant d'indiquer qu'une requète a été effectué
			***/
			$http({
				url: '/affaires/getAffairesAdministAndOwners',
				method: 'GET',
				datatype: 'json',
				contentType: 'text/plain',
				headers: {'Content-Type': 'application/json'}
			})
			.success(function(result){
				$scope.tabAffaires = [];

				if(result.auth == null){
					$window.location.href="/?timeOut";

					return;
				}

				$scope.isLoading = false;

				for(var i = 0; i < result.listeAdminist.length; i++){
					$scope.tabAffaires.push({'Affaire':result.listeAdminist[i].Code,
									  'Client': (result.listeAdminist[i].hr_owner != null) ? result.listeAdminist[i].hr_owner.Name : "",
									  'Libelle': result.listeAdminist[i].Libelle,
									  'Montant':'',
									  'Facture':'',
									  'CoutTemps':'',
									  'TPrevue':'',
									  'TPasse':'',
									  'Reste':'',
									  'AvancementReel': '',
									  'AvancementTheorique': '',
									  'haveTask': (result.listeAdminist[i].HaveTask == "Y") ? true : false,
									  'haveMateriel': false,
									  'haveStats': false,
									  'isAdmini': true});
				}
			})
			.error(function(result){
				console.log("Impossible de charger les affaires administrative");
			});
		}
		/*****************************/
		/*** Onglet prévisionnelle ***/
		/*****************************/
		else if(id == "PREV"){
			$scope.tabAffaires = [];
			/***
				Requète AJAX permettant de récupérer la liste des affaires prévisionnelles
				Paramètres:
				Sortie: "affairesPrev" => tableau contenant les affaires affaires prévisionnelles
						"auth" => Variable permettant d'indiquer qu'une requète a été effectué
			***/
			$http({
				url: '/affaires/getAffairePrevisionnelle',
				method: 'GET',
				datatype: 'json',
				contentType: 'text/plain',
				headers: {'Content-Type': 'application/json'}
			})
			.success(function(result){
				$scope.tabAffaires = [];

				if(result.auth == null){
					$window.location.href="/?timeOut";

					return;
				}

				$scope.isLoading = false;

				for(var i = 0; i < result.affairesPrev.length; i++){

					var valueAvancementReel = 0;

					if(result.affairesPrev[i].avancementReel > 100){
						valueAvancementReel = 100;
					}
					else{
							valueAvancementReel = result.affairesPrev[i].avancementReel;
					}

					$scope.tabAffaires.push({'Affaire':result.affairesPrev[i].Code,
									  'Client': (result.affairesPrev[i].hr_owner != null) ? result.affairesPrev[i].hr_owner.Name : "",
									  'Libelle': result.affairesPrev[i].Libelle,
									  'Montant':(result.affairesPrev[i].Montant == 0) ? "" : result.affairesPrev[i].Montant,
									  'Facture':(result.affairesPrev[i].sumPrice == 0) ? "" : result.affairesPrev[i].sumPrice,
									  'CoutTemps':(result.affairesPrev[i].coutTemps == 0) ? "" : result.affairesPrev[i].coutTemps,
									  'TPrevue':(result.affairesPrev[i].tPrevu == 0) ? "" : result.affairesPrev[i].tPrevu,
									  'TPasse':(result.affairesPrev[i].tempsPasse == 0) ? "" : result.affairesPrev[i].tempsPasse,
									  'Reste':(result.affairesPrev[i].reste == 0) ? "" : result.affairesPrev[i].reste,
									  'AvancementReel': {'value':valueAvancementReel, 'couleurFond':(result.affairesPrev[i].avancementReel > 100) ? "progress-bar-red" : "", 'couleur':(result.affairesPrev[i].avancementReel > 60) ? 'txt-white':'txt-black', 'txt':(result.affairesPrev[i].avancementReel == null) ? 0 : result.affairesPrev[i].avancementReel},
									  'AvancementTheorique': {'value':(result.affairesPrev[i].Progression == null) ? 0 : result.affairesPrev[i].Progression, 'couleur':(result.affairesPrev[i].Progression > 60) ? 'txt-white' : 'txt-black'},
									  'haveTask': (result.affairesPrev[i].HaveTask == "Y") ? true : false,
									  'haveMateriel': (result.affairesPrev[i].HaveTask == "Y") ? true : ((result.affairesPrev[i].BusinessGroup == "Y") ? false : true),
									  'haveStats': true,
									  'isAdmini': false});
				}
			})
			.error(function(result){
				console.log("Impossible de charger les affaires prévisionnelle");
			})
		}
		/**************************/
		/*** Onglet Mes Affaire ***/
		/**************************/
		else if(id == "MYAFF"){
			$scope.tabAffaires = [];
			/***
				Requète AJAX permettant de récupérer les affaires propre à un utilisateur
				Paramètres: "code" => identifiant de l'utilisateur
				Sortie: "affaires" => liste des affaires
						"auth" => Variable permettant d'indiquer qu'une requète a été effectué
			***/
			$http({
				url: '/affaires/getAllAffaireByUser?user=' + $cookies.getObject('cookieUser').user.Code,
				method: 'GET',
				datatype: 'json',
				contentType: 'text/plain',
				headers: {'Content-Type': 'application/json'}
			})
			.success(function(result){
				$scope.tabAffaires = [];

				if(result.auth == null){
					$window.location.href="/?timeOut";

					return;
				}

				$scope.isLoading = false;

				for(var i = 0; i < result.affaires.length; i++){

					var valueAvancementReel = 0;

					if(result.affaires[i].avancementReel > 100){
						valueAvancementReel = 100;
					}
					else{
							valueAvancementReel = result.affaires[i].avancementReel;
					}

					$scope.tabAffaires.push({'Affaire':result.affaires[i].Code,
										  'Client': (result.affaires[i].hr_owner != null) ? result.affaires[i].hr_owner.Name : "",
										  'Libelle': result.affaires[i].Libelle,
										  'Montant':(result.affaires[i].Montant == 0) ? "" : result.affaires[i].Montant,
										  'Facture':(result.affaires[i].sumPrice == 0) ? "" : result.affaires[i].sumPrice,
										  'CoutTemps':(result.affaires[i].coutTemps == 0) ? "" : result.affaires[i].coutTemps,
										  'TPrevue':(result.affaires[i].tPrevu == 0) ? "" : result.affaires[i].tPrevu,
										  'TPasse':(result.affaires[i].tempsPasse == 0) ? "" : result.affaires[i].tempsPasse,
										  'Reste':(result.affaires[i].reste == 0) ? "" : result.affaires[i].reste,
										  'AvancementReel': {'value':valueAvancementReel, 'couleurFond':(result.affaires[i].avancementReel > 100) ? "progress-bar-red" : "", 'couleur':(result.affaires[i].avancementReel > 60) ? 'txt-white':'txt-black', 'txt':(result.affaires[i].avancementReel == null) ? 0 : result.affaires[i].avancementReel},
										  'AvancementTheorique': {'value':(result.affaires[i].Progression == null) ? 0 : result.affaires[i].Progression, 'couleur':(result.affaires[i].Progression > 60) ? 'txt-white' : 'txt-black'},
										  'haveTask': (result.affaires[i].HaveTask == "Y") ? true : false,
										  'haveMateriel': (result.affaires[i].HaveTask == "Y") ? true : ((result.affaires[i].BusinessGroup == "Y") ? false : true),
										  'haveStats': true ,
										  'isAdmini':false});
				}
			})
			.error(function(result){
				console.log("Impossible de charger les affaires de l'utilisateur");
			});
		}
		/**********************/
		/*** Onglet Affaire ***/
		/**********************/
		else
		{
			$scope.tabAffaires = [];
			/***
				Requète AJAX permettant de récupérer les affaires par société
				Paramètres: "id" => id de la societé
				Sortie: "affaires" => liste des affaires
						"auth" => Variable permettant d'indiquer qu'une requète a été effectué
			***/
			$http({
				url: '/affaires/getAffaireBySociety2?id=' + id,
				method: 'GET',
				datatype: 'json',
				contentType: 'text/plain',
				headers: {'Content-Type': 'application/json'}
			})
			.success(function(result){
				$scope.tabAffaires = [];

				if(result.auth == null){
					$window.location.href="/?timeOut";

					return;
				}

				$scope.isLoading = false;

				for(var i = 0; i < result.affaires.length; i++){
					// Ajustement barre de progression
					var valueAvancementReel = 0;

					if(result.affaires[i].avancementReel > 100){
						valueAvancementReel = 100;
					}
					else{
							valueAvancementReel = result.affaires[i].avancementReel;
					}


					$scope.tabAffaires.push({'Affaire':result.affaires[i].Code,
									  'Client': (result.affaires[i].Name != null) ? result.affaires[i].Name : "",
									  'Libelle': result.affaires[i].Libelle,
									  'Montant':(result.affaires[i].Montant == 0) ? "" : result.affaires[i].Montant,
									  'Facture':(result.affaires[i].sumPrice == 0) ? "" : result.affaires[i].sumPrice,
									  'CoutTemps':(result.affaires[i].coutTemps == 0) ? "" : result.affaires[i].coutTemps,
									  'TPrevue':(result.affaires[i].tPrevu == 0) ? "" : result.affaires[i].tPrevu,
									  'TPasse':(result.affaires[i].tempsPasse == 0) ? "" : result.affaires[i].tempsPasse,
									  'Reste':(result.affaires[i].reste == 0) ? "" : result.affaires[i].reste,
									  'AvancementReel': {'value':valueAvancementReel, 'couleurFond':(result.affaires[i].avancementReel > 100) ? "progress-bar-red" : "", 'couleur':(result.affaires[i].avancementReel > 60) ? 'txt-white':'txt-black', 'txt':(result.affaires[i].avancementReel == null) ? 0 : result.affaires[i].avancementReel},
									  'AvancementTheorique': {'value':(result.affaires[i].Progression == null) ? 0 : result.affaires[i].Progression, 'couleur':(result.affaires[i].Progression > 60) ? 'txt-white' : 'txt-black'},
									  'haveTask': (result.affaires[i].HaveTask == "Y") ? true : false,
									  'haveMateriel': (result.affaires[i].HaveTask == "Y") ? true : ((result.affaires[i].BusinessGroup == "Y") ? false : true),
									  'haveStats': true ,
									  'isAdmini':false});
				}
			})
			.error(function(result){
				console.log("Impossible de charger les affaires de la société");
			});
		}
	}
}]);
