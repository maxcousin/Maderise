var _this = module.exports = {
	/************************************/
	/*** Retourne le numéro de semaine **/
	/************************************/
	getWeekNumber: function(d) {
	    d = new Date(+d);
	    d.setHours(0,0,0);
	    d.setDate(d.getDate() + 4 - (d.getDay()||7));
	    var yearStart = new Date(d.getFullYear(),0,1);
	    var weekNo = Math.ceil(( ( (d - yearStart) / 86400000) + 1)/7);
	    return weekNo;
	},

	/***********************************************************/
	/*** Permet de trier un oject json à l'aide d'un élement ***/
	/***********************************************************/
	sortByKey: function(array, key) {
	    return array.sort(function(a, b) {
	        var x = a[key]; var y = b[key];
	        return ((x < y) ? -1 : ((x > y) ? 1 : 0));
	    });
	},

    /********************************/
    /*** Récupérer le nom du mois ***/
    /********************************/
    getNameMonth: function(numA){
    	var num = parseInt(numA);
        switch(num){
            case 1:
            return "Janvier";
            break;
            case 2:
            return "Février";
            break;
            case 3:
            return "Mars";
            break;
            case 4:
            return "Avril";
            break;
            case 5:
            return "Mai";
            break;
            case 6:
            return "Juin";
            break;
            case 7:
            return "Juillet";
            break;
            case 8:
            return "Aout";
            break;
            case 9:
            return "Septembre";
            break;
            case 10:
            return "Octobre";
            break;
            case 11:
            return "Novembre";
            break;
            case 12:
            return "Décembre";
            break;
        }
    },

	/********************************************************************************/
	/*** Fonction qui permet de déterminer si un tableau dans un tableau est vide ***/
	/********************************************************************************/
	isEmpty: function(tabDayTook, index){
		var compteur = 0;

		for(var j = 0; j < tabDayTook.length; j++){
			if(tabDayTook[j].day == ""){
				compteur++;
			}
		}

		if(compteur >= index){
			return true;
		}
		else
		{
			return false;
		}
	},

	/***********************************************************************/
	/*** Fonction qui permet de chercher une valeur dans un tableau json ***/
	/***********************************************************************/
	findIndexByKeyValue: function(obj, key, value)
	{
	    for (var i = 0; i < obj.length; i++) {
	        if (new Date(obj[i][key]).getTime() == new Date(value).getTime()) {
	            return i;
	        }
	    }
	    return null;
	},

	findIndexByKeyValueNbr: function(obj, key, value)
	{
	    for (var i = 0; i < obj.length; i++) {
	        if (obj[i][key] == value) {
	            return i;
	        }
	    }
	    return null;
	},

	/** On remplit l'entete du tableau **/
	remplirTableau: function(start, end, mois, year, tableSem){
		for(var i = start; i <= end; i++)
		{
			var dateT = new Date(year, mois, i);

			numSemaine = _this.getWeekNumber(dateT);

			if(dateT.getDay() != 0 && dateT.getDay() != 6){
				if(_this.findIndexByKeyValue(tableSem, "numSemaine", numSemaine) != null){
					tableSem[_this.findIndexByKeyValue(tableSem, "numSemaine", numSemaine)].day.push(i);
				}
				else
				{
					tableSem.push({'numSemaine':numSemaine, 'day':[i]});
				}
			}
		}
	},

	/******************************************************************/
	/*** Calcul du temps total pointée sur une affaire dans le mois ***/
	/******************************************************************/
	getTotalAffaire: function(affaire){
		var sommeTotal = 0;

		for(var i = 0; i < affaire.pointages.length; i++){
			if(affaire.pointages[i] != ""){
				sommeTotal += parseFloat(affaire.pointages[i].temps);
			}
		}

		return sommeTotal;
	},

	/***********************************************************************/
	/*** Fonction qui permet de retourner le nom du mois selon son index ***/
	/***********************************************************************/
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
	},
	// Fonction qui retourne le nombre de jours dans un mois
	numberDaysInMonth: function(month, year){
		return new Date(year, month, 0).getDate();
	},
	// Function qui permet d'ajuster les valeurs des frais. (Si la valeur est égal à 0, on vide la case, sinon on affecte le symbole '€')
	ajusterFrais: function(frais){
		if(frais.Diner == 0){ frais.Diner = "";}else{frais.Diner = frais.Diner.toFixed(2) + " €";}
		if(frais.Fuel == 0){ frais.Fuel = "";}else{frais.Fuel = frais.Fuel.toFixed(2) + " €";}
		if(frais.Hotel == 0){ frais.Hotel = "";}else{frais.Hotel = frais.Hotel.toFixed(2) + " €";}
		if(frais.Parking == 0){ frais.Parking = "";}else{frais.Parking = frais.Parking.toFixed(2) + " €";}
		if(frais.Gate == 0){ frais.Gate = "";}else{frais.Gate = frais.Gate.toFixed(2) + " €";}
		if(frais.Taxi == 0){ frais.Taxi = "";}else{frais.Taxi = frais.Taxi.toFixed(2) + " €";}
		if(frais.TrainPlane == 0){ frais.TrainPlane = "";}else{frais.TrainPlane = frais.TrainPlane.toFixed(2) + " €";}
		if(frais.Diverse == 0){ frais.Diverse = "";}else{frais.Diverse = frais.Diverse.toFixed(2) + " €";}
		if(frais.ik == 0){ frais.ik = "";}else{frais.ik = frais.ik + " km";}
		if(frais.ik_costs == 0){ frais.ik_costs = "";}else{frais.ik_costs = frais.ik_costs + " €";}
	},
	// Permet d'ajouter un '0' devant un nombre passé en paramètre
	ajouterZero: function(nbr){
		if(nbr < 10){
			nbr = "0" + nbr;
		}

		return nbr;
	},
	// Calcul les frais TOTAL 1 et les frais TOTAL 2 du tableau des frais
	calculFrais: function(tab){
		var repasTotal = 0;
		var carburantTotal = 0;
		var hotelTotal = 0;
		var parkingTotal = 0;
		var peageTotal = 0;
		var taxiTotal = 0;
		var trainAvionTotal = 0;
		var diversTotal = 0;
		var kmTotal = 0;
		var tauxTotal = 0;
		var totalTotal = 0;
		var totalAffaireTotal = 0;
		var t = {};

		for(var i = 0; i < tab.length; i++){
			repasTotal += (tab[i].repas != "") ? parseFloat(tab[i].repas) : 0;
			carburantTotal += (tab[i].carburant) ? parseFloat(tab[i].carburant) : 0;
			hotelTotal += (tab[i].hotel) ? parseFloat(tab[i].hotel) : 0;
			parkingTotal += (tab[i].parking) ? parseFloat(tab[i].parking) : 0;
			peageTotal += (tab[i].peage) ? parseFloat(tab[i].peage) : 0;
			taxiTotal += (tab[i].taxi) ? parseFloat(tab[i].taxi) : 0;
			trainAvionTotal += (tab[i].trainAvion) ? parseFloat(tab[i].trainAvion) : 0;
			diversTotal += (tab[i].divers) ? parseFloat(tab[i].divers) : 0;
			kmTotal += (tab[i].ik) ? parseFloat(tab[i].ik) : 0;
			tauxTotal = (tauxTotal == 0) ? ((tab[i].taux) ? parseFloat(tab[i].taux) : 0) : tauxTotal;
			totalTotal += (tab[i].total) ? parseFloat(tab[i].total) : 0;
			totalAffaireTotal += (tab[i].totalAffaire) ? parseFloat(tab[i].totalAffaire) : 0;
		}



		t = {'repas': repasTotal.toFixed(2),
				'carburant': carburantTotal.toFixed(2),
				'hotel': hotelTotal.toFixed(2),
				'parking': parkingTotal.toFixed(2),
				'peage': peageTotal.toFixed(2),
				'taxi': taxiTotal.toFixed(2),
				'trainAvion': trainAvionTotal.toFixed(2),
				'divers': diversTotal.toFixed(2),
				'ik': kmTotal,
				'taux': tauxTotal.toFixed(3),
				'total': totalTotal.toFixed(2),
				'totalAffaire': totalAffaireTotal.toFixed(2)}

		return t;
	},
	// Calcul les frais total du mois (TOTAL 1 + TOTAL 2)
	calculFraisTotal: function(tab1, tab2){
		var tabTotal = {};

		if(tab1 == null){
			return tab2;
		}
		if(tab2 == null){
			return tab1;
		}

		tabTotal.repas = (tab1.repas + tab2.repas != null) ? parseFloat(tab1.repas) + parseFloat(tab2.repas) : 0;
		tabTotal.carburant = (tab1.carburant + tab2.carburant != null) ? parseFloat(tab1.carburant) + parseFloat(tab2.carburant) : 0;
		tabTotal.hotel = (tab1.hotel + tab2.hotel != null) ? parseFloat(tab1.hotel) + parseFloat(tab2.hotel) : 0;
		tabTotal.parking = (tab1.parking + tab2.parking != null) ? parseFloat(tab1.parking) + parseFloat(tab2.parking) : 0;
		tabTotal.peage = (tab1.peage + tab2.peage != null) ? parseFloat(tab1.peage) + parseFloat(tab2.peage) : 0;
		tabTotal.taxi = (tab1.taxi + tab2.taxi != null) ? parseFloat(tab1.taxi) + parseFloat(tab2.taxi) : 0;
		tabTotal.trainAvion = (tab1.trainAvion + tab2.trainAvion != null) ? parseFloat(tab1.trainAvion) + parseFloat(tab2.trainAvion) : 0;
		tabTotal.divers = (tab1.divers + tab2.divers != null) ? parseFloat(tab1.divers) + parseFloat(tab2.divers) : 0;
		tabTotal.ik = (tab1.ik + tab2.ik != null) ? tab1.ik + tab2.ik : 0;
		tabTotal.taux = (tab1.taux + tab2.taux != null) ? tab1.taux + tab2.taux : 0;
		tabTotal.total = (tab1.total + tab2.total != null) ? parseFloat(tab1.total) + parseFloat(tab2.total) : 0;
		tabTotal.totalAffaire = (tab1.totalAffaire + tab2.totalAffaire != null) ? parseFloat(tab1.totalAffaire) + parseFloat(tab2.totalAffaire) : 0;

		// On arrondit à deux chiffre après la virgule
		tabTotal.repas = tabTotal.repas.toFixed(2);
		tabTotal.carburant = tabTotal.carburant.toFixed(2);
		tabTotal.hotel = tabTotal.hotel.toFixed(2);
		tabTotal.peage = tabTotal.peage.toFixed(2);
		tabTotal.parking = tabTotal.parking.toFixed(2);
		tabTotal.taxi = tabTotal.taxi.toFixed(2);
		tabTotal.trainAvion = tabTotal.trainAvion.toFixed(2);
		tabTotal.divers = tabTotal.divers.toFixed(2);
		tabTotal.total = tabTotal.total.toFixed(2);
		tabTotal.totalAffaire = tabTotal.totalAffaire.toFixed(2);

		return tabTotal;
	},
	fillTabMonth: function(tab, nbrRow, taux){
		var tabMonth = [];

		/**************************************/
		/*** On remplit le tableau de frais ***/
		/**************************************/
		for(var i = 0; i < tab.length; i++){
			var dateTemp = new Date(tab[i].tcDate);

			if(isNaN(parseInt(tab[i].ik_costs))){tab[i].ik_costs = 0;}
			var totalAffaire = parseFloat(tab[i].Diner) + parseFloat(tab[i].Fuel) + parseFloat(tab[i].Hotel) + parseFloat(tab[i].Parking) + parseFloat(tab[i].Gate) + parseFloat(tab[i].Taxi) + parseFloat(tab[i].TrainPlane) + parseFloat(tab[i].Diverse) + parseFloat(tab[i].ik_costs);


			// On supprime les cases vide et ajoute le symbole '€'
			_this.ajusterFrais(tab[i]);

			var strCost = tab[i].ik_costs.toString();
			var strCostCut = 0;

			if(strCost == "" || strCost == "null €"){
				strCost = "0";
			}
			else{
				var strCostCut = strCost.substring(0, strCost.length - 2);
			}


			// On ajoute le montant kilométrique des voitures perso à celui des voitures pro
			var resultTotal = parseFloat(strCostCut);

			tabMonth.push({'date': _this.ajouterZero(dateTemp.getDate()) + "/" + _this.ajouterZero((dateTemp.getMonth()+1)) + "/" + dateTemp.getFullYear(), 'dossier': tab[i].Affaire + " - " + tab[i].hr_affaire.Libelle, 'client': (tab[i].hr_affaire.hr_owner != undefined ) ? tab[i].hr_affaire.hr_owner.Name : "", 'objet': '', 'repas': tab[i].Diner, 'carburant': tab[i].Fuel, 'hotel': tab[i].Hotel,
						 'parking': tab[i].Parking, 'peage': tab[i].Gate, 'taxi': tab[i].Taxi, 'trainAvion': tab[i].TrainPlane, 'divers': tab[i].Diverse, 'ik': tab[i].ik, 'taux': (tab[i].ik != 0) ? taux.toFixed(3) : "",'total': (resultTotal == 0) ? (resultTotal = "") : (resultTotal = resultTotal.toFixed(2) + " €"),
						 'totalAffaire': totalAffaire.toFixed(2) + " €"});
		}

		/***************************************************/
		/*** On affiche au moins 'nbrRow' lignes minimun ***/
		/***************************************************/
		if(tabMonth.length <= nbrRow){
			var tailleTemps = tabMonth.length;
			for(var i = 0; i < (nbrRow - tailleTemps); i++){
				tabMonth.push({'date': '', 'dossier': '', 'client': '', 'objet': '', 'repas': '', 'carburant': '', 'hotel': '',
						 'parking': '', 'peage': '', 'taxi': '', 'train-avion': '', 'divers': '', 'ik': '', 'taux': '','total': '', 'totalAffaire': ''});
			}
		}

		return tabMonth;
	},
	// Retourne la note total du mois souhaité
	getNoteTotal: function(tab){
		return parseFloat(tab.totalAffaire).toFixed(2);
	}
};
