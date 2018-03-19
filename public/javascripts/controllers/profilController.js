/***
Controlleur permettant de gérer la page de profil d'un utilisateur
Partial: profil.html
***/
app.controller('profilController', ['$scope', 'md5', '$window', '$cookies', '$http', 'Upload', '$rootScope', function($scope, md5, $window, $cookies, $http, Upload, $rootScope) {  
	$scope.monTxt = "Mot de passe";
	$scope.oldMdp = "";
	$scope.newMdp = "";
	$scope.confNewMdp = "";
	$scope.msgErrorMdp = "";
	$scope.user = {};
	$scope.progress = 0;

    $scope.submit = function(){ //function to call on form submit    	        
        if ($scope.upload_form2.file.$valid && $scope.file) { //check if from is valid
            $scope.upload($scope.file); //call upload function
        }
    }

	chargerProfil();
	chargerProfilePicture();

	/*******************************************************/
	/*** Function permettant de modifier le mot de passe ***/
	/*******************************************************/
	$scope.updateMdp = function(){
		if($scope.oldMdp == "" && $scope.newMdp == "" && $scope.confNewMdp == ""){
			$scope.msgErrorMdp = "Veuillez remplir tout les champs.";
		}
		else
		{
			/***
				Requète AJAX permettant de récupérer l'ancien mot de passe
				Paramètres: "user" => id de l'utilisateur
				Sortie: "resPwd.Password" => Ancien mot de passe
						"auth" => Variable permettant d'indiquer qu'une requète a été effectué
			***/
			$http({
				url: '/authentification/getPassword?user=' + $cookies.getObject('cookieUser').user.Code,
				method: 'GET',
				datatype: 'json',
				contentType: 'text/plain',
				headers: {'Content-Type': 'application/json'}
			})
			.success(function(res){
				if(res.auth == null){
					$window.location.href="/?timeOut";

					return;
				}

				if(md5.createHash("*/d" + $scope.oldMdp + "5ds") == res.resPwd.Password)
				{
					if($scope.newMdp == $scope.confNewMdp){
						if($scope.oldMdp == $scope.newMdp){
							$scope.msgErrorMdp = {'msg':'Veuillez saisir un mot de passe différent de l\'ancien.', 'class':'mdp-red'};
						}
						else
						{
							var nouveauMdp =  md5.createHash("*/d" + $scope.newMdp + "5ds");

							/***
								Requète AJAX permettant d'enregistrer le nouveau mot de passe
								Paramètres: "user" => id de l'utilisateur
											"newMdp" => nouveau mot de passe
								Sortie: "auth" => Variable permettant d'indiquer qu'une requète a été effectué
							***/
							$http({
								url: '/authentification/updateMdp',
								method: 'PUT',
								datatype: 'json',
								data: {'user': $cookies.getObject('cookieUser').user.Code, 'newMdp': nouveauMdp},
								contentType: 'text/plain',
								headers: {'Content-Type': 'application/json'}
							})
							.success(function(res){
								if(res.auth == null){
									$window.location.href="/?timeOut";

									return;
								}

								$scope.oldMdp = "";
								$scope.newMdp = "";
								$scope.confNewMdp = "";

								$scope.msgErrorMdp = {'msg':'Votre mot de passe a bien été modifié', 'class':'mdp-green'};
							})
							.error(function(res){
								$scope.msgErrorMdp = {'msg':'Impossible de modifier le mot de passe (Erreur serveur)', 'class':'mdp-red'};
								console.log("Impossible de modifier le mot de passe");
							});
						}
					}
					else
					{
						$scope.msgErrorMdp = {'msg':'Les mot de passes ne sont pas identiques.', 'class':'mdp-red'};
					}
				}
				else
				{
					$scope.msgErrorMdp = {'msg':'Votre mot de passe existant est incorrect.', 'class':'mdp-red'};
				}

			})
			.error(function(res){
				console.log("Impossible de récupérer le mot de passe existant");
			});
		}
	}


	function chargerProfil(){
			var user = {};

			/***
				Requète AJAX permettant de récupérer le profil d'un utilisateur
				Paramètres: "id" => id de l'utilisateur
				Sortie: "infoProfil" => Objet regroupant toutes les informations de l'utilisateur
						"auth" => Variable permettant d'indiquer qu'une requète a été effectué
			***/
			$http({
				url: '/users?id=' + $cookies.getObject('cookieUser').user.Code,
				method: 'GET',
				datatype: 'json',
				contentType: 'text/plain',
				headers: {'Content-Type': 'multipart/form-data'}
			})
			.success(function(res){
				if(res.auth == null){
					$window.location.href="/?timeOut";

					return;
				}

				user = {'name': res.infoProfil.Surname + " " + res.infoProfil.Name, 'email': res.infoProfil.email, 'status': res.infoProfil.hr_employeeClass.Libelle};

				$scope.user = user;
			})
			.error(function(res){
				console.log("Impossible de charger le profil");
			})
	}

    $scope.upload = function (file) {
    	/***
			Requète AJAX permettant d'envoyer une image au serveur
			Paramètres: "user" => id de l'utilisateur
						"file" => Image choisit par l'utilisateur
			Sortie: "data" => Message indiquant l'état de l'upload
					"auth" => Variable permettant d'indiquer qu'une requète a été effectué
		***/
        Upload.upload({
            url: '/users/uploadPhoto',
            method: 'PUT',
            data:{file:file, user: $cookies.getObject('cookieUser').user.Code}
        }).then(function (resp) { 
            if(resp.data.error_code === 0){
                $scope.msgInfos = {'msg':"Votre nouvelle photo a bien été enregistré", 'class':'mdp-green'};

                $rootScope.$broadcast("refreshProfilePicture");
                chargerProfilePicture();
            } else {
                $scope.msgInfos = {'msg':"Impossible de modifier votre photo", 'class':'mdp-red'};
            }
        }, function (resp) { 
            $scope.msgInfos = {'msg':"Impossible de modifier votre photo", 'class':'mdp-red'};
        }, function (evt) {
            var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
            $scope.progress = progressPercentage;
            console.log($scope.progress);
        });
    };

    function chargerProfilePicture(){
    	/***
			Requète AJAX permettant de récupérer la photo de profil de l'utilisateur
			Paramètres: "id" => id de l'utilisateur
			Sortie: "image" => Variable contenant le chemin de la photo de profil de l'utilisateur
					"auth" => Variable permettant d'indiquer qu'une requète a été effectué
		***/
		$http({
			url: '/users/getProfilePicture?id=' + $cookies.getObject('cookieUser').user.Code,
			method: 'GET',
			datatype: 'json',
			contentType: 'text/plain',
			headers: {'Content-Type': 'application/json'}
		})
		.success(function(res){
			if(res.auth == null){
				$window.location.href="/?timeOut";

				return;
			}

			$scope.oldPhoto = res.image;
		})
		.error(function(res){

		});
	}
}]);