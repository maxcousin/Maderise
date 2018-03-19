/***
Controlleur permettant de gérer la partie admin
View: indexAdmin.html
***/
app.controller('indexAdminController', ['$scope', '$http', 'sharedData', '$cookies', '$window', '$location', 'models', 'ngDialog', '$controller', '$rootScope', function($scope, $http, sharedData, $cookies, $window, $location, models, ngDialog, $controller, $rootScope) {

	$scope.viviers = models.viviers();
	listPostulant();


	/**************************************/
	/*** Fonction gérant la déconnexion ***/
	/**************************************/
	$scope.logout = function(){
		/***
			Requète AJAX permettant de déconnecter l'utilisateur
			Paramètres:
			Sortie: "auth" => Variable permettant d'indiquer qu'une requète a été effectué
		***/
		$http({
			url: '/logout',
			method: 'GET',
			datatype: 'json',
			contentType: 'text/plain',
			headers: {'Content-Type': 'application/json'}
		})
		.success(function(res, status){
			if(status == 200){
				if(res.auth == null){
					$window.location.href="/?timeOut";

					return;
				}

				$cookies.remove('cookieUser');

				$window.location = '/';
			}
		})
		.error(function(res){
			console.log("Impossible de se deconnecter");
		});
	}

	/***************************************/
	/*** Fonction listant les postulants ***/
	/***************************************/
	function listPostulant(){
		/***
			Requète AJAX permettant de lister les postulants
			Paramètres:
			Sortie: "auth" => Variable permettant d'indiquer qu'une requète a été effectué
		***/
		$http({
			url: '/postulant',
			method: 'GET',
			datatype: 'json',
			contentType: 'text/plain',
			headers: {'Content-Type': 'application/json'}
		})
		.success(function(res, status){
			if(status == 200){
				$scope.listPostulant = res.listPostulant;
			}
		})
		.error(function(res){
			console.log("Impossible d'accéder à la liste des postulants");
		})
	}

	/***************************************************/
    /*** Fonction popup formulaire d'ajout postulant ***/
    /***************************************************/
    $scope.addPostulant = function(){
        ngDialog.open({
			template: '../../javascripts/partials/pop-up/ficheNewPostulant.html',
			controller: $controller('ficheNewPostulantController', {
				$scope: $scope
			}),
			overlay:false
		});
    }

	// /****************************************************/
    // /*** Fonction popup formulaire de modif postulant ***/
    // /****************************************************/
    // $scope.updatePostulant = function(id){
	// 	$scope.id = id;
    //     ngDialog.open({
    //         template: '../../javascripts/partials/pop-up/ficheUpdatePostulant.html',
    //         controller: $controller('ficheUpdatePostulantController', {
	// 			$scope: $scope
	// 		}),
	// 		overflow: false,
	// 		overlay:false
    //     });
    // }

	/****************************************************/
    /*** Fonction popup formulaire de modif postulant ***/
    /****************************************************/
    $scope.updatePostulant = function(id){
		/***
			Requète AJAX permettant de modifier/consulter un postulants
			Paramètres:
			Sortie: "auth" => Variable permettant d'indiquer qu'une requète a été effectué
		***/

		$window.location = '/index/?3gh843r6th843r6th4x36th84=' + id;
    }

}]);
