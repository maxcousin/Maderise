/***
Controlleur permettant de gérer l'authentification d'un utilisateur
View: login.html
***/
app.controller('ficheNewPostulantController', ['$scope', '$http', '$window', '$cookies', '$location', function($scope, $http, $window, $cookies, $location) {
    /********************************************/
	/*** Fonction créant un nouveau postulant ***/
	/********************************************/
	$scope.newPostulant = function(){
		/***
			Requète AJAX permettant de créer un nouveau postulant
			Paramètres:
			Sortie: "auth" => Variable permettant d'indiquer qu'une requète a été effectué
		***/

		$http({
			url: '/postulant/createPostulant',
			method: 'POST',
			datatype: 'json',
            data: {nom: $scope.nom, prenom: $scope.prenom, log: $scope.log, mdp: $scope.mdp, profil: $scope.profil},
			contentType: 'text/plain',
			headers: {'Content-Type': 'application/json'}
		})
		.success(function(res, status){
			if(status == 200){
				$window.location = '/admin/index/';
			}
		})
		.error(function(res){
			console.log("Impossible de créer un nouveau postulant");
		});
	}

    /**********************************************************/
	/*** Méthode permettant de revenir à la page précedente ***/
	/**********************************************************/
	$scope.retour = function(){
		//
	}

}]);
