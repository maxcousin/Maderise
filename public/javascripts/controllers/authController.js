/***
Controlleur permettant de gérer l'authentification d'un utilisateur
View: login.html
***/
app.controller('authController', ['$scope', '$http', '$window', '$cookies', '$location', 'md5', function($scope, $http, $window, $cookies, $location, md5) {
	/*** Fonction apellé lorsque l'utilisateur clique sur le bouton "Connexion" ***/
	$scope.authentifier = function(){
		/***
			Requète AJAX permettant d'authentifier un utilisateur
			Paramètres: "log" => Identifiant
						"mdp" => Mot de passe
			Sortie: "user" => Objet contenant des informations sur l'utilisateur
					"sid" => Numéro de session
		***/

		$http({
			url: '/authentification/getPassword',
			method: 'POST',
			datatype: 'json',
			data: {log: $scope.log, mdp: $scope.mdp},
			contentType: 'text/plain',
			headers: {'Content-Type': 'application/json'}
		})
	    .success(function(res, status){

			if(status == 200){

				//console.log(res.logger);
				var id = res.logger.code_p;
				var log = res.logger.log;
				var mdp = res.logger.mdp;
				var profil = res.logger.profil;
				var dateExpire = new Date();
				var minutes = 300;

				dateExpire.setTime(dateExpire.getTime() + (minutes * 60 * 1000));

				// Stockage de plusieurs données dans un cookie côté client
				$cookies.putObject('cookieUser', {id: id, log: log, profil: profil}, {expires: dateExpire});

				// Redirection vers l'index
				if(profil == 'A'){
					$window.location = '/admin/index/';
					//$location.path('/admin/index');
				}
				else {
					$window.location = '/index/';
				}
			}
		})
		.error(function(){
	    	// On remet les champs à vide
	        $scope.log = '';
		    $scope.mdp = '';
		    // On retourne un message d'erreur à la vue
	        $scope.msg = "Votre login ou votre mot de passe est incorrect.";
	    });
	}
}]);
