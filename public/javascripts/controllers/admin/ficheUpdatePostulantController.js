app.directive('datepicker', function() {
     return {
        restrict: 'A',
        require: 'ngModel',
        compile: function() {
           return {
              pre: function(scope, element, attrs, ngModelCtrl) {
                 var format, dateObj;
                 format = (!attrs.dpFormat) ? 'yyyy/mm/dd' : attrs.dpFormat;
                 if (!attrs.initDate && !attrs.dpFormat) {
                    dateObj = new Date();
                    scope[attrs.ngModel] = dateObj.getDate() + '/' + (dateObj.getMonth() + 1) + '/' + dateObj.getFullYear();
                 } else if (!attrs.initDate) {
                    scope[attrs.ngModel] = attrs.initDate;
                 } else {
                 	;
                 }
                 /***********************************/
                 /*** On définit le language "fr" ***/
                 /***********************************/
                 $.fn.datepicker.dates['fr'] = {
				    days: ["Dimanche", "Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi", "Samedi"],
				    daysShort: ["Dim", "Lun", "Mar", "Mer", "Jeu", "Ven", "Sam"],
				    daysMin: ["Di", "Lu", "Ma", "Me", "Je", "Ve", "Sa"],
				    months: ["Janvier", "Fevrier", "Mars", "Avril", "Mai", "Juin", "Juillet", "Août", "Septembre", "Octobre", "Novembre", "Décembre"],
				    monthsShort: ["Janv", "Fevr", "Mars", "Avril", "Mai", "Juin", "Juil", "Août", "Sept", "Oct", "Nov", "Dec"],
				    today: "Aujourd'hui",
				    clear: "Vider",
				    format: "mm/dd/yyyy",
				    titleFormat: "MM yyyy",
				    weekStart: 1
				};

                 $(element).datepicker({
                    format: format,
                    language: 'fr',
                    todayHighlight: true
                 }).on('changeDate', function(ev) {
                    scope.$apply(function () {
                       ngModelCtrl.$setViewValue(ev.format(format));
                    });
                 });
              }
           }
        }
     }
 });

/***
Controlleur permettant de gérer l'authentification d'un utilisateur
View: login.html
***/
app.controller('ficheUpdatePostulantController', ['$scope', '$http', '$window', '$cookies', '$location', function($scope, $http, $window, $cookies, $location) {



    	var fieldsT = [{name:'T1', niveau:'', duree:''}];
    	$scope.formDataT = {};
    	$scope.formDataT.dynamicFields = fieldsT;

    	var fieldsS = [{name:'S1', duree:''}];
    	$scope.formDataS = {};
    	$scope.formDataS.dynamicFields = fieldsS;

    	var fieldsI = [{name:'I1', val:1}];
    	$scope.formDataI = {};
    	$scope.formDataI.dynamicFields = fieldsI;

    	var fieldsH = [{name:'H1', val:1}];
    	$scope.formDataH = {};
    	$scope.formDataH.dynamicFields = fieldsH;

    	$scope.SentValues;

    	$scope.submit = function(){ //function to call on form submit
            if ($scope.upload_form2.file.$valid && $scope.file) { //check if from is valid
    			console.log($scope.file, $scope.userInfos.code_p);
                $scope.upload($scope.file, $scope.userInfos.code_p); //call upload function
            }
        }

    	//console.log($cookies.getObject('cookieUser')['id']);
    	//getUser($cookies.getObject('cookieUser')['id']);
        //console.log($scope.id);
        getUser($scope.id);
    	getT();//Techniques
    	getS();//Secteurs
    	getI();//Informatiques
    	getH();//Habilitations
    	//console.log($scope.userInfos);
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
    		.success(function(res){
    			if(res.auth == null){
    				$window.location.href="/?timeOut";

    				return;
    			}

    			$cookies.remove('cookieUser');

    			$window.location = '/';
    		})
    		.error(function(res){
    			console.log("Impossible de se deconnecter");
    		});
    	}


    	/***************************************************/
    	/*** Fonctions gérant les compétences techniques ***/
    	/***************************************************/
    	$scope.addT=function(){
    	    var newTNum = $scope.formDataT.dynamicFields.length+1;
    	    $scope.formDataT.dynamicFields.push( {name: 'T'+newTNum, niveau: '', duree: ''});
    	}

    	$scope.remT=function(id){
    	    $scope.formDataT.dynamicFields.pop();
    	}

    	function majChampT(nb){
    	    $scope.myT = [];
    	    for (var i = 1; i < nb; i++){
    	        var myT = 'myT_' + i;
    	        $scope.myT.push(myT);
    	    }
    	    return myT;
    	}

    	/*************************************/
    	/*** Fonctions gérant les secteurs ***/
    	/*************************************/
    	$scope.addS=function(){
    	    var newSNum = $scope.formDataS.dynamicFields.length+1;
    	    $scope.formDataS.dynamicFields.push( {name: 'S'+newSNum, duree: ''});
    	}

    	$scope.remS=function(id){
    	    $scope.formDataS.dynamicFields.pop();
    	}

    	function majChampS(nb){
    	    $scope.myS = [];
    	    for (var j = 1; j < nb; j++){
    	        var myS = 'myS_' + j;
    	        $scope.myS.push(myS);
    	    }
    	    return myS;
    	}

    	/**************************************/
    	/*** Fonctions gérant les logiciels ***/
    	/**************************************/
    	$scope.addI=function(){
    	    var newINum = $scope.formDataI.dynamicFields.length+1;
    	    $scope.formDataI.dynamicFields.push( {name: 'I'+newINum, niveau: '', duree: ''});
    	}

    	$scope.remI=function(id){
    	    $scope.formDataI.dynamicFields.pop();
    	}

    	function majChampI(nb){
    	    $scope.myI = [];
    	    for (var k = 1; k < nb; k++){
    	        var myI = 'myI_' + k;
    	        $scope.myI.push(myI);
    	    }
    	    return myI;
    	}

    	/******************************************/
    	/*** Fonctions gérant les habilitations ***/
    	/******************************************/
    	$scope.addH=function(){
    	    var newHNum = $scope.formDataH.dynamicFields.length+1;
    	    $scope.formDataH.dynamicFields.push( {name: 'H'+newHNum, obtention: '', expire: ''});
    	}

    	$scope.remH=function(id){
    	    $scope.formDataH.dynamicFields.pop();
    	}

    	function majChampH(nb){
    	    $scope.myH = [];
    	    for (var l = 1; l < nb; l++){
    	        var myH = 'myH_' + l;
    	        $scope.myH.push(myH);
    	    }
    	    return myH;
    	}

    	$scope.sendFormValues= function(formValues){
           $scope.SentValues=formValues.dynamicFields;
       }

    	  /*********************************************************/
    	  /*** Chargement des connaissances techniques existants ***/
    	  /*********************************************************/
    	  function getT(){
    	      /***
    	          Requète AJAX permettant de charger la liste de toutes les compétences techniques
    	          Paramètres:
    	          Sortie: "listeT" => tableau contenant toutes les compétences techniques
    	                  "auth" => Variable permettant d'indiquer qu'une requète a été effectué
    	      ***/
    	      $http({
    	          url: '/connaissance/getT',
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

    	          $scope.listeT = res.listeT;
    	          var myT = majChampT($scope.formDataT.dynamicFields.length);
    	          $scope.$watch(myT,majChampT($scope.formDataT.dynamicFields.length));


    	      })
    	      .error(function(res){
    	          console.log("Impossible de récupérer la liste des compétences techniques existantes");
    	      });
    	  }

    	  /*********************************************************/
    	  /*** Ajout des connaissances techniques ***/
    	  /*********************************************************/
    	  function learnT(){
    	      /***
    	          Requète AJAX permettant d'insérer les compétences techniques de l'utilisateur
    	          Paramètres:"listeT" => tableau contenant toutes les compétences techniques
    	          Sortie: "auth" => Variable permettant d'indiquer qu'une requète a été effectué
    	      ***/
    		  for(var i = 0; i < listeT.length; i++){
    		      $http({
    		          url: '/connu/addCompetence',
    		          method: 'POST',
    		          datatype: 'json',
    				  data: {code_p: code_p, code_c: listeT[i], duree: duree, niveau: niveau, obtention: obtention, expire: expire, lieu: lieu},
    		          contentType: 'text/plain',
    		          headers: {'Content-Type': 'application/json'}
    		      })
    		      .success(function(res){
    		          if(res.auth == null){
    		              $window.location.href="/?timeOut";

    		              return;
    		          }

    		      })
    		      .error(function(res){
    		          console.log("Impossible d'ajouter la liste des compétences techniques");
    		      });
    	  }}

    	  /*********************************************************/
    	  /*** Chargement des secteurs existants ***/
    	  /*********************************************************/
    	  function getS(){
    	  	/***
    	  		Requète AJAX permettant de charger la liste de tous les secteurs
    	  		Paramètres:
    	  		Sortie: "listeS" => tableau contenant toutes les secteurs
    	  				"auth" => Variable permettant d'indiquer qu'une requète a été effectué
    	  	***/
    	  	$http({
    	  		url: '/connaissance/getS',
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

    	  		$scope.listeS = res.listeS;
    	  		var myS = majChampS($scope.formDataS.dynamicFields.length);
    	  		$scope.$watch(myS,majChampS($scope.formDataS.dynamicFields.length));


    	  	})
    	  	.error(function(res){
    	  		console.log("Impossible de récupérer la liste des secteurs existants");
    	  	});
    	  }


      	  /*********************************************************/
      	  /*** Chargement des logiciels existants ***/
      	  /*********************************************************/
      	  function getI(){
      	  	/***
      	  		Requète AJAX permettant de charger la liste de tous les logiciels
      	  		Paramètres:
      	  		Sortie: "listeI" => tableau contenant toutes les secteurs
      	  				"auth" => Variable permettant d'indiquer qu'une requète a été effectué
      	  	***/
      	  	$http({
      	  		url: '/connaissance/getI',
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

      	  		$scope.listeI = res.listeI;
      	  		var myI = majChampI($scope.formDataI.dynamicFields.length);
      	  		$scope.$watch(myI,majChampI($scope.formDataI.dynamicFields.length));


      	  	})
      	  	.error(function(res){
      	  		console.log("Impossible de récupérer la liste des logiciels existants");
      	  	});
      	  }

    	  /*********************************************************/
      	  /*** Chargement des habilitations existantes ***/
      	  /*********************************************************/
      	  function getH(){
      	  	/***
      	  		Requète AJAX permettant de charger la liste de toutes les habilitations
      	  		Paramètres:
      	  		Sortie: "listeH" => tableau contenant toutes les secteurs
      	  				"auth" => Variable permettant d'indiquer qu'une requète a été effectué
      	  	***/
      	  	$http({
      	  		url: '/connaissance/getH',
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

      	  		$scope.listeH = res.listeH;
      	  		var myH = majChampH($scope.formDataH.dynamicFields.length);
      	  		$scope.$watch(myH,majChampH($scope.formDataH.dynamicFields.length));

      	  	})
      	  	.error(function(res){
      	  		console.log("Impossible de récupérer la liste des habilitations existantes");
      	  	});
      	  }

    	  /*********************************************************/
      	  /*** Chargement des habilitations existantes ***/
      	  /*********************************************************/
      	  function getUser(id){
      	  	/***
      	  		Requète AJAX permettant de charger les infos d'un utilisateur
      	  		Paramètres:
      	  		Sortie: "userInfos" => tableau contenant toutes les infos de l'utilisateur
      	  				"auth" => Variable permettant d'indiquer qu'une requète a été effectué
      	  	***/
      	  	$http({
      	  		url: '/postulant/getUserById',
      	  		method: 'POST',
    			data: {'id': id},
      	  		datatype: 'json',
      	  		contentType: 'text/plain',
      	  		headers: {'Content-Type': 'application/json'}
      	  	})
      	  	.success(function(res){
      	  		if(res.auth == null){
      	  			$window.location.href="/?timeOut";

      	  			return;
      	  		}

      	  		$scope.userInfos = res.userInfos;

      	  	})
      	  	.error(function(res){
      	  		console.log("Impossible de récupérer les infos de l'utilisateur");
      	  	});
      	  }

    	/******************************/
      	/*** Modification un user   ***/
      	/******************************/
      	$scope.updateUser = function(){
      		/***
      			Requète AJAX permettant de modifier un client à l'aide de son ID
      			Paramètres: "id" => id du client
      						"name" => nom du client
      						"adresse" => adresse du client
      						...
      			Sortie:	"auth" => Variable permettant d'indiquer qu'une requète a été effectué
      		***/
      		$http({
      			url: '/postulant/updateUser',
      			method: 'PUT',
      			datatype: 'json',
      			data: {	'code_p': $scope.userInfos.code_p,//
    					'nom':$scope.userInfos.nom,//
    					'prenom':$scope.userInfos.prenom,//
    					'nationalite':$scope.userInfos.nationalite,//
    					'adresse':$scope.userInfos.adresse,//
    					'codePostal':$scope.userInfos.codePostal,//
    					'ville':$scope.userInfos.ville,//
    					'tel1':$scope.userInfos.tel1,//
    					'tel2':$scope.userInfos.tel2,//
    					'email':$scope.userInfos.email,//
    					'naissDate':$scope.userInfos.naissDate,//
    					'naissLieu':$scope.userInfos.naissLieu,//
    					'numSecu':$scope.userInfos.numSecu,
    					'situationMari':$scope.userInfos.situationMari,//
    					'metierConj':$scope.userInfos.metierConj,//
    					'photo':'',
    					'cv':'',
    					'motiv':$scope.userInfos.motiv,//
    					'nbEnfant':$scope.userInfos.nbEnfant,//
    					'naissEnfant':$scope.userInfos.naissEnfant,//
    					'situationPro':$scope.userInfos.situationPro,//
    					'source':'',
    					'poste':$scope.userInfos.poste,//
    					'remun':$scope.userInfos.remun,//
    					'mobNor':$scope.userInfos.mobNor,//
    					'mobEst':$scope.userInfos.mobEst,//
    					'mobRa':$scope.userInfos.mobRa,///
    					'mobSud':$scope.userInfos.mobSud,//
    					'mobIdf':$scope.userInfos.mobIdf,//
    					'mobInt':$scope.userInfos.mobInt,//
    					'mobDemen':$scope.userInfos.mobDemen,//
    					'mobGd':$scope.userInfos.mobGd,//
    					'mobLocal':$scope.userInfos.mobLocal,//
    					'etam':$scope.userInfos.etam,//
    					'cadre':$scope.userInfos.cadre,//
    					'cdi':$scope.userInfos.cdi,//
    					'cdd':$scope.userInfos.cdd,//
    					'nego':$scope.userInfos.nego,//
    					'dispo':$scope.userInfos.dispo,//
    					'nonConcu':$scope.userInfos.nonConcu,//
    					'convColl':$scope.userInfos.convColl,//
    					'dateEntretien':$scope.userInfos.dateEntretien,//
    					'documents':'',
    					'vivier':$scope.userInfos.vivier//
    				},
      			contentType: 'text/plain',
      			headers: {'Content-Type': 'application/json'}
      		})
      		.success(function(res){
      			if(res.auth == null){
      				$window.location.href="/?timeOut";


      				return;
      			}
    /**************************************************************/
    /**************AJOUT DES COMPETENCES TECHNIQUES****************/
    /**************************************************************/
    		for(i=0;i<$scope.formDataT.dynamicFields.length;i++){
    			$http({
    	  			url: '/connu/addCompetence',
    	  			method: 'POST',
    	  			datatype: 'json',
    	  			data: {	'code_p': $scope.userInfos.code_p,
    						'code_c': $scope.formDataT.dynamicFields[i]['name'],
    						'duree': $scope.formDataT.dynamicFields[i]['duree'],
    						'niveau': $scope.formDataT.dynamicFields[i]['niveau'],
    						'obtention': 0,
    						'expire': 0,
    						'lieu':''
    					},
    	  			contentType: 'text/plain',
    	  			headers: {'Content-Type': 'application/json'}
    	  		})
    	  		.success(function(res){
    	  			if(res.auth == null){
    	  				$window.location.href="/?timeOut";
    	  				return;
    	  			}
    	  		})
    	  		.error(function(res){
    	  			console.log("Impossible d'ajouter la compétence'");
    	  		});
    		}
    /************************************************/
    /**************AJOUT DES SECTEURS****************/
    /************************************************/
    		for(i=0;i<$scope.formDataS.dynamicFields.length;i++){
    			$http({
    	  			url: '/connu/addCompetence',
    	  			method: 'POST',
    	  			datatype: 'json',
    	  			data: {	'code_p': $scope.userInfos.code_p,
    						'code_c': $scope.formDataS.dynamicFields[i]['name'],
    						'duree': $scope.formDataS.dynamicFields[i]['duree'],
    						'niveau': '',
    						'obtention': 0,
    						'expire': 0,
    						'lieu':''
    					},
    	  			contentType: 'text/plain',
    	  			headers: {'Content-Type': 'application/json'}
    	  		})
    	  		.success(function(res){
    	  			if(res.auth == null){
    	  				$window.location.href="/?timeOut";
    	  				return;
    	  			}
    	  		})
    	  		.error(function(res){
    	  			console.log("Impossible d'ajouter la compétence'");
    	  		});
    		}
    /**************************************************************/
    /**************AJOUT DES COMPETENCES INFORMATIQUES*************/
    /**************************************************************/
    		for(i=0;i<$scope.formDataI.dynamicFields.length;i++){
    			$http({
    	  			url: '/connu/addCompetence',
    	  			method: 'POST',
    	  			datatype: 'json',
    	  			data: {	'code_p': $scope.userInfos.code_p,
    						'code_c': $scope.formDataI.dynamicFields[i]['name'],
    						'duree': $scope.formDataI.dynamicFields[i]['duree'],
    						'niveau': $scope.formDataI.dynamicFields[i]['niveau'],
    						'obtention': 0,
    						'expire': 0,
    						'lieu':''
    					},
    	  			contentType: 'text/plain',
    	  			headers: {'Content-Type': 'application/json'}
    	  		})
    	  		.success(function(res){
    	  			if(res.auth == null){
    	  				$window.location.href="/?timeOut";
    	  				return;
    	  			}
    	  		})
    	  		.error(function(res){
    	  			console.log("Impossible d'ajouter la compétence'");
    	  		});
    		}
    /**************************************************/
    /**************AJOUT DES HABILITATIONS*************/
    /**************************************************/
    		for(i=0;i<$scope.formDataH.dynamicFields.length;i++){
    			$http({
    	  			url: '/connu/addCompetence',
    	  			method: 'POST',
    	  			datatype: 'json',
    	  			data: {	'code_p': $scope.userInfos.code_p,
    						'code_c': $scope.formDataH.dynamicFields[i]['name'],
    						'duree': 0,
    						'niveau': '',
    						'obtention': $scope.formDataH.dynamicFields[i]['obtention'],
    						'expire': $scope.formDataH.dynamicFields[i]['expire'],
    						'lieu':''
    					},
    	  			contentType: 'text/plain',
    	  			headers: {'Content-Type': 'application/json'}
    	  		})
    	  		.success(function(res){
    	  			if(res.auth == null){
    	  				$window.location.href="/?timeOut";
    	  				return;
    	  			}
    	  		})
    	  		.error(function(res){
    	  			console.log("Impossible d'ajouter la compétence'");
    	  		});
    		}

      			$rootScope.$broadcast('refresh');
      		})
      		.error(function(res){
      			console.log("Impossible de mettre à jour l'utilisateur");
      		});
      	}

    	/******************************/
      	/*** Upload de photo   ***/
      	/******************************/
    	$scope.upload = function (file, code_p) {
        	/***
    			Requète AJAX permettant d'envoyer une image au serveur
    			Paramètres: "user" => id de l'utilisateur
    						"file" => Image choisit par l'utilisateur
    			Sortie: "data" => Message indiquant l'état de l'upload
    					"auth" => Variable permettant d'indiquer qu'une requète a été effectué
    		***/
            Upload.upload({
                url: '/postulant/uploadPhoto',
                method: 'PUT',
                data:{ file:file, code_p: code_p}
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
    			url: '/postulant/getProfilePicture?id=' + code_p,
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

    $scope.sendFormValues= function(){
          //the form values ready to be sent , etc
           for(i=0;i<$scope.formDataT.dynamicFields.length;i++){
    	   console.log($scope.formDataT.dynamicFields[i]);
       }
    }

}]);