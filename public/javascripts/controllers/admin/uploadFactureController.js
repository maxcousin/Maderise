/***
Controlleur permettant d'uploader les factures'
Partial: /admin/uploadFacture.html
***/
app.controller('uploadFactureController', ['$scope', '$http', 'sharedData', '$cookies', '$window', '$location', 'Upload', function($scope, $http, sharedData, $cookies, $window, $location, Upload) {
	var dateActu = new Date(Date.now());

	$scope.dayNameDate = "1";
	$scope.monthNameDate = "1";
	$scope.yearNameDate = "" + dateActu.getFullYear();
	$scope.tableYear = [];
	$scope.tableMonth = [];
	$scope.tableDay = [];
	$scope.msg = {'txt': '', 'isGood': 'no'};
	$scope.excelTitle = "";

	/*** Fonction permettant de remplir la liste d'année en fonction de l'année actuelle ***/
    function setValueYear(year){
    	for(var i = year; i >= 2000 ; i--){
    		$scope.tableYear.push(i);
    	}
    }

    /*** Fonction permettant de remplir la liste des mois ***/
    function setValueMonth(){
    	$scope.tableMonth[0] = {'Cle': '1', 'Name': 'Janvier'};
    	$scope.tableMonth[1] = {'Cle': '2', 'Name': 'Février'};
    	$scope.tableMonth[2] = {'Cle': '3', 'Name': 'Mars'};
    	$scope.tableMonth[3] = {'Cle': '4', 'Name': 'Avril'};
    	$scope.tableMonth[4] = {'Cle': '5', 'Name': 'Mai'};
    	$scope.tableMonth[5] = {'Cle': '6', 'Name': 'Juin'};
    	$scope.tableMonth[6] = {'Cle': '7', 'Name': 'Juillet'};
    	$scope.tableMonth[7] = {'Cle': '8', 'Name': 'Aout'};
    	$scope.tableMonth[8] = {'Cle': '9', 'Name': 'Septembre'};
    	$scope.tableMonth[9] = {'Cle': '10', 'Name': 'Octobre'};
    	$scope.tableMonth[10] = {'Cle': '11', 'Name': 'Novembre'};
    	$scope.tableMonth[11] = {'Cle': '12', 'Name': 'Décembre'};
    }

    /*** Fonction apellé lorsque l'utilisateur clique sur le bouton "upload" ***/
	 $scope.submit = function(){ //function to call on form submit    	        
        if ($scope.upload_form2.file.$valid && $scope.file) { //check if from is valid
            $scope.upload($scope.file); //call upload function
        }
    }

    /*** Fonction permettant d'upload un fichier Excel sur le serveur ***/
    $scope.upload = function (file) {
    	/***
			Requète AJAX permettant d'envoyer un fichier excel au serveur
			Paramètres: "file" => Image choisit par l'utilisateur
			Sortie: "data" => Message indiquant l'état de l'upload
					"auth" => Variable permettant d'indiquer qu'une requète a été effectué
		***/
        Upload.upload({
            url: '/exportFactures/uploadExcelFile',
            method: 'PUT',
            data:{file:file, nameFile: $scope.excelTitle},
        }).then(function (resp) { 
			$scope.msg = {'txt':'Le fichier excel a bien été uploadé.', 'isGood': true};

        }, function (resp) { 
            $scope.msg = {'txt':'Impossible d\'uploader le fichier excel.', 'isGood': false};
        });
    };

}]);