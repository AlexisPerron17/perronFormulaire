/**
 * @author Alexis Perron <2140816@csfoy.ca>
 */


var validation = {
	//conserve la référence de l'élément de formulaire
	refFormulaire:null,
	//conserse le tableau des messages d'erreur
	tErreurs:[],
	//tableau des validités des champs
	tValide:[],

	/**
	 * Méthode d'initialisation de la validation du formulaire
	 */
	initialiser: function(){

		//si le javascript et activé, la classe js est placée dans le body indiquant au CSS qu'il est actif
		document.body.className = "js";

		//obtient la référence de la balise <form> en utilisant la classe formulaire
		this.refFormulaire = document.querySelector(".formulaire");

		//empêche la validation html quand il y a du javascript
		this.refFormulaire.setAttribute('novalidate', 'novalidate');

		//défini les écouteurs d'événement des boutons submit et reset
		this.refFormulaire.addEventListener('submit', this.validerFormulaire.bind(this));
		// this.refFormulaire.addEventListener('submit', this.validerBoutonRadio.bind(this));
		this.refFormulaire.addEventListener('reset', this.effacerFormulaire.bind(this));

		//défini les écouteurs d'évènements des éléments de texte du formulaire
		this.refFormulaire.querySelector("#prenom").addEventListener("blur", this.validerChampTexte.bind(this));
		this.refFormulaire.querySelector("#nom").addEventListener("blur", this.validerChampTexte.bind(this));
		this.refFormulaire.querySelector("#courriel").addEventListener("blur", this.validerChampTexte.bind(this));
		this.refFormulaire.querySelector("#adresse").addEventListener("blur", this.validerChampTexte.bind(this));
		this.refFormulaire.querySelector("#codepostal").addEventListener("blur", this.validerChampTexte.bind(this));
		this.refFormulaire.querySelector("#ville").addEventListener("blur", this.validerChampTexte.bind(this));
		this.refFormulaire.querySelector("#telephone").addEventListener("blur", this.validerChampTexte.bind(this));
		this.refFormulaire.querySelector("#titulaire").addEventListener("blur", this.validerChampTexte.bind(this));
		this.refFormulaire.querySelector("#carte").addEventListener("blur", this.validerChampTexte.bind(this));
		this.refFormulaire.querySelector("#cvv").addEventListener("blur", this.validerChampTexte.bind(this));
        this.refFormulaire.querySelector("#autre").addEventListener("click", this.afficherAutre.bind(this));
        this.refFormulaire.querySelector("#vingt").addEventListener("click", this.afficherAutre.bind(this));
        this.refFormulaire.querySelector("#cinquante").addEventListener("click", this.afficherAutre.bind(this));
        this.refFormulaire.querySelector("#soixantequainze").addEventListener("click", this.afficherAutre.bind(this));
        this.refFormulaire.querySelector("#cent").addEventListener("click", this.afficherAutre.bind(this));
		this.refFormulaire.querySelector("#pays").addEventListener("blur", this.validerSelect.bind(this));
		this.refFormulaire.querySelector("#provinces").addEventListener("blur", this.validerSelect.bind(this));
		this.refFormulaire.querySelector("#boutonsuivant1").addEventListener("click", this.validerBoutonRadio.bind(this));
		this.refFormulaire.querySelector("#boutonsuivant2").addEventListener("click", this.validerInfos.bind(this));
		this.refFormulaire.querySelector("#boutonsuivant3").addEventListener("click", this.afficherRemerciement.bind(this));
		this.refFormulaire.querySelector("#retour1").addEventListener("click", this.afficherDon.bind(this));
		this.refFormulaire.querySelector("#retour2").addEventListener("click", this.afficherInfo.bind(this));
		

		this.tValide["prenom"]=false;
		this.tValide["nom"]=false;
		this.tValide["courriel"]=false;
		this.tValide["adresse"]=false;
		this.tValide["codepostal"]=false;
		this.tValide["ville"]=false;
		this.tValide["telephone"]=false;
		this.tValide["titulaire"]=false;
		this.tValide["carte"]=false;
		this.tValide["cvv"]=false;	

	},

	chargeJSON: function(objJSON){
		//fonction fetch (chargement asynchrone du JSON)
		fetch(objJSON)
			.then(response => response.json()) //la prommesse retourne une réponse de type JSON
			.then(monJSON => this.tErreurs=monJSON); // une fois reçu, on stock le JSON dans la variable
	},

	//Affiche la section du choix du montant
	afficherDon: function() {
		let infos = document.getElementById("section__info");
		let don = document.getElementById("section__don");
		let step2 = document.getElementById("step2");

		infos.style.display = "none";
		don.style.display = "inline";
		step2.classList.remove("active");
	},

	//Affiche la section pour entrer les informations du donateur
	afficherInfo: function(evenement) {
		let infos = document.getElementById("section__info");
		let don = document.getElementById("section__don");
		let paiement = document.getElementById("section__paiement");
		let step2 = document.getElementById("step2");

		paiement.style.display = "none";
		don.style.display = "none";
		infos.style.display = "inline";
		step2.classList.add("active");
	},

	//Affiche la section pour les informations du moyen de paiement
	afficherPaiement: function(evenement) {
		let infos = document.getElementById("section__info");
		let paiement = document.getElementById("section__paiement");
		let step3 = document.getElementById("step3");

		infos.style.display = "none";
		paiement.style.display = "inline";
		step3.classList.add("active");
	},

	//Affiche le messaage de remerciement après le don
	afficherRemerciement: function(evenement) {
		let infos = document.getElementById("section__info");
		infos.style.display = "none";
	},
	

	//Valide les champs de texte de la section informations du donateur
	validerInfos: function(evenement) {
		let arrName = ["prenom", "nom", "adresse", "codepostal", "telephone", "ville", "courriel"];
		let objCible=evenement.currentTarget;
		valide = true;

		for (let cpt = 0; cpt < arrName.length; cpt++) {
			let id = arrName[cpt];
			let champ = document.getElementById(id);
			let strChaineExp=new RegExp(champ.getAttribute('pattern'));
			if (this.validerSiVide(champ) === true){
				this.afficherChampErreur(champ, this.tErreurs[champ.getAttribute("name")]["vide"]);
				valide = false;
			} else {
				if(champ.hasAttribute("pattern")) {
					if(strChaineExp.test(champ.value)) {
						this.effacerChampErreur(champ);
						valide = true;
					} else {
						this.afficherChampErreur(champ, this.tErreurs[champ.getAttribute("name")]["pattern"]);
						valide = false;
					}
				} else {
					this.effacerChampErreur(champ);
					valide  = true;
				}
			}
		}

		let pays = document.getElementById("pays");
		let provinces = document.getElementById("provinces");
		if (pays.value == ""){
			this.afficherChampErreur(pays, this.tErreurs[pays.getAttribute("name")]["vide"]);
			valide = false;
		} else {
			this.effacerChampErreur(pays);
			valide = true;
		}
		if (provinces.value == ""){
			this.afficherChampErreur(provinces, this.tErreurs[provinces.getAttribute("name")]["vide"]);
			valide = false;
		} else {
			this.effacerChampErreur(provinces);
			valide = true;
		}

		if (valide === true) {
			this.afficherPaiement();
		}
		
	},

	//Valide les listes déroulantes du pays et de la province
	validerSelect: function(evenement) {
		let pays = document.getElementById("pays");
		let provinces = document.getElementById("provinces");
		if (pays.value == ""){
			this.afficherChampErreur(pays, this.tErreurs[pays.getAttribute("name")]["vide"]);
		} else {
			this.effacerChampErreur(pays);
		}
		if (provinces.value == ""){
			this.afficherChampErreur(provinces, this.tErreurs[provinces.getAttribute("name")]["vide"]);
		} else {
			this.effacerChampErreur(provinces);
		}
	},




	/**
	 * Méthode de validation des champs de texte
	 * @param evenement
	 */

	//Affiche le champ de texte pour le montant personnalisé
	afficherAutre: function(evenement) {
		// let valide = false;
		let champAutre = document.getElementById("div_champAutre");
		let btnAutre = document.querySelector('input[id="autre"]:checked')
		if(btnAutre) {
			champAutre.classList.remove("hidden");
		} else {
			champAutre.classList.add("hidden");
		}
	},

	//Valide les boutons radios des montants prédéfinis
	validerBoutonRadio: function(evenement){
		let valide = true;
        let btnRadioMontant = document.getElementsByName("montant");
        for (let i = 0; i < btnRadioMontant.length; i++) {
            if (btnRadioMontant.item(i).checked === false) {
                valide = false;
                this.afficherChampErreur(btnRadioMontant[i], this.tErreurs[btnRadioMontant[i].getAttribute("name")]["vide"]);
            } else {
				valide = true;
			}
			if (valide == true){
				this.afficherInfo(evenement);
			}
        }
        
	},

	//Valide les boutons radios du type de paiement
	validerBoutonRadio2: function(evenement) {
		let btnRadioPaiement = document.getElementsByName("typepaiement");
		for (let i = 0; i < btnRadioPaiement.length; i++) {
            if (btnRadioPaiement.item(i).checked === true) {
            } else if(btnRadioPaiement.item(i).checked === false){
                this.afficherChampErreur(btnRadioPaiement[i], this.tErreurs[btnRadioPaiement[i].getAttribute("name")]["vide"]);
			}
        }
	},

	//Valide les champs de texte
	validerChampTexte: function(evenement){
		//champ invalide par défaut
		var valide=false;
		//objet du DOM déclancheur, initialise un objet jQuery
		var objCible=evenement.currentTarget;
		//retrouve le regexp de l'objet du DOM en lisant l'attribut pattern
		var strChaineExp=new RegExp(objCible.getAttribute('pattern'));
		//valide si pas vide
		if(this.validerSiVide(objCible)===true){
			//si vide, afficher le message d'erreur
			this.afficherChampErreur(objCible, this.tErreurs[objCible.getAttribute("name")]["vide"]);
			// objCible.innerHTML = 'aria-live="polite"';
		}else{
			if(objCible.hasAttribute("pattern")){
				//si pas vide, tester le pattern
				if (strChaineExp.test(objCible.value)) {
					//si pattern ok
					valide = true;
					//effacer le champ d'erreur
					this.effacerChampErreur(objCible);
				} else {
					//si pattern invalide afficher message détaillé
					this.afficherChampErreur(objCible, this.tErreurs[objCible.getAttribute("name")]["pattern"]);
					// objCible.innerHTML = 'aria-live="polite"';
				}
			}else{
				this.effacerChampErreur(objCible);
				valide = true;
				// this.afficherPaiement(evenement);
			}
		}
		//modifier le tableau des validitées
		this.modifierTableauValidation(objCible.getAttribute("name"),valide);
	},

	/**
	 * Méthode de validation finale du formulaire et d'envoi
	 * @param evenement
	 */
	validerFormulaire: function(evenement){
		//Par defaut, le formulaire est considé comme valide
		var valide = true;
		//Pour chacun des champs présent dans le tableau de validation
		for(var champ in this.tValide ){
			//Si un champ est invalide
			if (this.tValide[champ] === false) {
				//cible l'objet du DOM fautif
				var objCible=this.refFormulaire.querySelector("#"+champ);
				this.validerBoutonRadio2();
				//ici deux possibilité de message, vide ou pattern
				if(this.validerSiVide(objCible)===true){
					this.afficherChampErreur(objCible, this.tErreurs[objCible.getAttribute("name")]["vide"]);
				}else{
					if(objCible.hasAttribute("pattern")){
						var strChaineExp=new RegExp(objCible.getAttribute('pattern'));
						if(strChaineExp.test(objCible.value) ){
							//affiche que l'entrée n'est pas du bon format
							this.afficherChampErreur(objCible, this.tErreurs[objCible.getAttribute("name")]["pattern"]);
						}
					} else {
						//effacer le champ d'erreur
						this.effacerChampErreur(objCible);
					}
				}
				//Le formulaire contient des champs invalide, et n'est donc pas prêt à l'envoi
				valide=false;
			}
		}

		// si le formulaire n'est pas valide, on annule la soumission du formulaire de l'événement submit
		if(valide === false){
			evenement.preventDefault();
		}
	},


	//Méthodes utilitaires**********************************
	
	/**
	 * Méthode de validation de champs si vide
	 * @param objCible
	 * @returns {boolean}
	 */
	validerSiVide: function(objCible){
		let valide = false; //false = champ vide
		if(objCible.value === ""){
			valide = true; //si false, champ contient quelque chose
		}
		return valide;
	},

	/**
	 * Méthode d'affichage des messages d'erreur
	 * @param objCible
	 * @param message
	 */
	afficherChampErreur: function (objCible,message){
		let nom = "erreur_"+objCible.getAttribute("name");
		document.getElementById(nom).innerText=message;
		// let invalid = document.getElementById(nom).getAttribute("aria-invalid");
		// console.log(invalid)
		objCible.classList.add("erreur__input");
	},

	/**
	 * Méthode d'effacement des messages d'erreur
	 * @param objCible
	 */
	effacerChampErreur: function(objCible) {
		let nom = "erreur_"+objCible.getAttribute("name");
		document.getElementById(nom).innerHTML="";
		objCible.classList.remove("erreur__input");
	},

	/**
	 * Méthode de d'inscription de l'état des champs dans le tableau de validation
	 * @param nomChamp
	 * @param valide
	 */
	modifierTableauValidation:function(nomChamp,valide){
		this.tValide[nomChamp]=valide;
	},

	/**
	 * Méthode d'effacement des message d'erreur et de remise à zéro des champs du formulaire
	 */
	effacerFormulaire: function(){
		var liste=document.querySelectorAll(".formulaire__erreur")
		liste.forEach(function(objetCible){
			objetCible.innerHTML="";
			objetCible.parentNode.classList.remove("formulaire__item--erreur");
		});
		this.tValide["prenom"]=false;
		// this.tValide["nom"]=false;
		this.tValide["courriel"]=false;
		this.tValide["adresse"]=false;
		
	}
};
//Fin méthodes utilitaires**********************************

//*******************
// Écouteurs d'événements
//*******************
window.addEventListener('load', validation.initialiser.bind(validation));