var fileModule = angular.module('fileModule', []);
var app = angular.module('postulant', ['ngRoute', 'ngDialog', 'ngCookies', 'angular-md5', 'ngFileUpload', 'ui.bootstrap', 'fileModule', 'uiSwitch']);

app.config(['ngDialogProvider', function (ngDialogProvider) {
            ngDialogProvider.setDefaults({
                className: 'ngdialog-theme-default',
                plain: false,
                showClose: true,
                closeByDocument: true,
                closeByEscape: true,
                appendTo: false,
                preCloseCallback: function () {
                    console.log('default pre-close callback');
                }
            });
        }]);

app.config(['$routeProvider', '$locationProvider',
	function($routeProvider, $locationProvider){

		$routeProvider.
			when('/index/pointage', {
				templateUrl : '/javascripts/partials/pointage.html',
				controller : 'pointageController'
			}).
			when('/index/', {
				templateUrl : '/javascripts/partials/index.html',
				controller : 'indexController'
			}).
			when('/index/impression', {
				templateUrl : '/javascripts/partials/impression.html',
				controller : 'impressionController'
			}).
			when('/index/note_frais', {
				templateUrl : '/javascripts/partials/note_frais.html',
				controller : 'noteFraisController'
			}).
			when('/index/listeConges', {
				templateUrl: '/javascripts/partials/listeConges.html',
				controller: 'listeCongesController'
			}).
			when('/index/planningConges', {
				templateUrl : '/javascripts/partials/planningConges.html',
				controller : 'planningCongesController'
			}).
			when('/index/message', {
				templateUrl : '/javascripts/partials/message.html',
				controller : 'messageController'
			}).
			when('/index/notes', {
				templateUrl : '/javascripts/partials/notes.html',
				controller : 'notesController'
			}).
			when('/index/profil', {
				templateUrl : '/javascripts/partials/profil.html',
				controller : 'profilController'
			}).
			when('/index/tickets', {
				templateUrl : '/javascripts/partials/tickets.html',
				controller : 'ticketsController'
			}).
			when('/index/postulant', {
				templateUrl : '/javascripts/partials/postulant.html',
				controller : 'postulantController'
			}).
			when('/index/details', {
				templateUrl : '/javascripts/partials/details.html',
				controller : 'detailsController'
			}).
			when('/admin/index/', {
				templateUrl : '/javascripts/partials/admin/accueil.html',
				controller : 'indexAdminController'
			}).
			when('/admin/index/feuilleFrais', {
				templateUrl: '/javascripts/partials/admin/feuilleFrais.html',
				controller: 'feuilleFraisController'
			}).
			when('/admin/index/newAffaire', {
				templateUrl : '/javascripts/partials/admin/newAffaire.html',
				controller : 'newAffaireController'
			}).
			when('/admin/index/grpAffaire', {
				templateUrl : '/javascripts/partials/admin/grpAffaire.html',
				controller : 'grpAffaireController'
			}).
			when('/admin/index/archive', {
				templateUrl : '/javascripts/partials/admin/archive.html',
				controller : 'archiveController'
			}).
			when('/admin/index/tableHeures', {
				templateUrl : '/javascripts/partials/admin/tableHeures.html',
				controller : 'tableHeuresController'
			}).
			when('/admin/index/recapClassAffaire', {
				templateUrl : '/javascripts/partials/admin/recapClassAffaire.html',
				controller : 'recapClassAffaireController'
			}).
			when('/admin/index/recapHoursAffaire', {
				templateUrl : '/javascripts/partials/admin/recapHoursAffaire.html',
				controller : 'recapHoursAffaireController'
			}).
			when('/admin/index/recapHoursSalaries', {
				templateUrl : '/javascripts/partials/admin/recapHoursSalaries.html',
				controller : 'recapHoursSalariesController'
			}).
			when('/admin/index/gstConges', {
				templateUrl : '/javascripts/partials/planningConges.html',
				controller : 'planningCongesController'
			}).
			when('/admin/index/ficheNewEmploye', {
				templateUrl : '/javascripts/partials/admin/ficheNewEmploye.html',
				controller : 'ficheNewEmployeController'
			}).
			when('/admin/index/listEmploye', {
				templateUrl : '/javascripts/partials/admin/listEmploye.html',
				controller : 'listEmployeController'
			}).
			when('/admin/index/listEmployeLeaving', {
				templateUrl : '/javascripts/partials/admin/listEmployeLeaving.html',
				controller : 'listEmployeLeavingController'
			}).
			when('/admin/index/triEmploye', {
				templateUrl : '/javascripts/partials/admin/triEmploye.html',
				controller : 'triEmployeController'
			}).
			when('/admin/index/tableFactureStock', {
				templateUrl : '/javascripts/partials/admin/tableFactureStock.html',
				controller : 'tableFactureStockController'
			}).
			when('/admin/index/uploadFacture', {
				templateUrl : '/javascripts/partials/admin/uploadFacture.html',
				controller : 'uploadFactureController'
			}).
			when('/admin/index/noteEmployes', {
				templateUrl : '/javascripts/partials/admin/noteEmployes.html',
				controller : 'noteEmployesController'
			}).
			when('/admin/index/mensuelConges', {
				templateUrl : '/javascripts/partials/admin/mensuelConges.html',
				controller : 'mensuelCongesController'
			}).
			when('/admin/index/annuelFrais', {
				templateUrl : '/javascripts/partials/admin/annuelFrais.html',
				controller : 'annuelFraisController'
			}).
			when('/admin/index/clients', {
				templateUrl : '/javascripts/partials/admin/clients.html',
				controller : 'clientsController'
			}).
			when('/admin/index/contacts', {
				templateUrl : '/javascripts/partials/admin/contacts.html',
				controller : 'contactsController'
			}).
			when('/admin/index/editAffaire', {
				templateUrl : '/javascripts/partials/admin/editAffaire.html',
				controller : 'editAffaireController'
			}).
			when('/admin/index/qualifEmloyes', {
				templateUrl : '/javascripts/partials/admin/qualifEmloyes.html',
				controller : 'qualifEmloyesController'
			}).
			when('/admin/index/typesTache', {
				templateUrl : '/javascripts/partials/admin/typesTache.html',
				controller : 'typesTacheController'
			}).
			when('/admin/index/statutAffaire', {
				templateUrl : '/javascripts/partials/admin/statutAffaire.html',
				controller : 'statutAffaireController'
			}).
			when('/admin/index/gstModeles', {
				templateUrl : '/javascripts/partials/admin/gstModeles.html',
				controller : 'gstModelesController'
			}).
			when('/admin/index/gstMateriel', {
				templateUrl : '/javascripts/partials/admin/gstMateriel.html',
				controller : 'gstMaterielController'
			}).
			when('/admin/index/detailsAffaire', {
				templateUrl: '/javascripts/partials/admin/detailsAffaire.html',
				controller: 'detailsAffaireController'
			}).
			when('/admin/index/analyseAffaire', {
				templateUrl: '/javascripts/partials/admin/analyseAffaire.html',
				controller: 'analyseAffaireController'
			}).
			when('/admin/index/addTask', {
				templateUrl: '/javascripts/partials/admin/addTask.html',
				controller: 'addTaskController'
			}).
			when('/admin/index/addNewModel', {
				templateUrl: '/javascripts/partials/admin/addNewModel.html',
				controller: 'addNewModelController'
			}).
			when('/admin/index/profil', {
				templateUrl : '/javascripts/partials/profil.html',
				controller : 'profilController'
			}).
			when('/admin/index/newPostulant', {
				templateUrl : '/javascripts/partials/pop-up/ficheNewPostulant.html',
				controller : 'ficheNewPostulantController'
			}).
			when('/admin/index/updatePostulant', {
				templateUrl : '/javascripts/partials/pop-up/ficheUpdatePostulant.html',
				controller : 'ficheUpdatePostulantController'
			}).
			otherwise({
				redirectTo: '/index'
			});

			$locationProvider.html5Mode({
				enabled: true,
				requireBase: false
			});
}]);
