app.service('sharedData', function(){
	var dateActuel = new Date();
	var datePointage = "";
	var daySelect = 0;
	var tablePointage = [];
	var idPointage = 0;
	var frais = {};
	var pointageUpdate = {};
	var idConges = 0;
	var affActu = "";

	return{
		getDateActuel: function(){
			return dateActuel;
		},
		setDateActuel: function(newDate){
			dateActuel = newDate;
		},
		getDatePointage: function(){
			return datePointage;
		},
		setDatePointage: function(newDate){
			datePointage = newDate;
		},
		setDaySelect: function(newDay){
			daySelect = newDay;
		},
		getIdPointage: function(){
			return idPointage;
		},
		setIdPointage: function(newId){
			idPointage = newId;
		},
		getPointageUpdate: function(){
			return pointageUpdate;
		},
		setPointageUpdate: function(newPoint){
			pointageUpdate = newPoint;
		},
		getDaySelect: function(){
			return daySelect;
		},
		getFrais: function(){
			return frais;
		},
		setFrais: function(newFrais){
			frais = newFrais;
		},
		getTablePointage: function(){
			return tablePointage;
		},
		setTablePointage: function(newTable){
			tablePointage = newTable;
		},
		getIdConges: function(){
			return idConges;
		},
		setIdConges: function(id){
			idConges = id;
		},
		getAffActu: function(){
			return affActu;
		},
		setAffActu: function(id){
			affActu = id;
		},
		getNameMonthByIndex: function(month){
			var nameMonth = ""; 

			switch(month)
			{
				case 1:
					nameMonth = "Janvier";
				break;
				case 2:
					nameMonth = "Février";
				break;
				case 3:
					nameMonth = "Mars";
				break;
				case 4:
					nameMonth = "Avril";
				break;
				case 5:
					nameMonth = "Mai";
				break;
				case 6:
					nameMonth = "Juin";
				break;
				case 7:
					nameMonth = "Juillet";
				break;
				case 8:
					nameMonth = "Aout";
				break;
				case 9:
					nameMonth = "Septembre";
				break;
				case 10:
					nameMonth = "Octobre";
				break;
				case 11:
					nameMonth = "Novembre";
				break;
				case 12:
					nameMonth = "Décembre";
				break;
			}

			return nameMonth;
		}
	}
});