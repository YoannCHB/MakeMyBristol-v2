//LIBRAIRIE WIKIPEDIA
function Wiki(lang) { //On définies les paramètres du wiki
	let l = lang.split('-');
	this.lang = l[0] || "fr"; //On définie la langue (par défault fr pour français);
	this.inuse = false; //regarde si il n'est pas déjà en cour d'utilisation
}

Wiki.prototype.research = function(s, callback) { //On définie la fonction pour effectuer une recherche
	if (this.inuse) { //Vérifie que le programme n'est pas déjà en cours d'utilisation
		console.error("Wiki est déjà en cours d'utilisation !"); //On affiche si le programme est en cours d'utilisation
	} else { //sinon on effectue cette partie du code
		//this.inuse = true; (enlevé pour éviter les bugs)
		let r = new XMLHttpRequest(); //On créé une requête
		r.onload = function() { //Lorque on reçevra une réponse du site on effectue ce code
			Wiki.prototype.inuse = false; //On définie la requête comme terminer donc la fonction n'est plus en cours d'utilisation
			let j = JSON.parse(r.responseText); //On converti la réponse en du JSON en variables compréhensible
			for (var i = 0; i < j[2].length; i++) { //On effectue un test pour chaque recherche
				if (j[2][i] == "") { //On regarde si le contenue n'est pas vide
					//Sinon on le supprime
					delete j[1][i]; //supprime le prenom
					delete j[2][i]; //supprime le résumer
					delete j[3][i]; //supprime le lien wikipedia
				} //Fin de la vérification
			} // fin de la boucle for
			callback(j); //Sinon on renvoie la valeur du tableau avec les informations
		}
		r.open('GET', "https://" + this.lang + ".wikipedia.org/w/api.php?%20action=opensearch&format=json&origin=*&profile=normal&search=" + encodeURIComponent(s)); //On demande une requête pas la méthode GET à l'adresse de l'api wikipédia
		r.send(); //On envoie la requête
	}
}

function wikipedia(recherche) {
	var wiki = new Wiki(lang);
	console.log(recherche)
	wiki.research(recherche, function(resultat) {
		zone.innerHTML = zone.innerHTML.replace('hashtag recherche ', "<br><p>"+resultat[2][0]+"</p><br>");//Remplacement de "hashtag recherche " par un vide //On doit definir ses deux phrases quasiment identiques à case du traducteur pour ne pas avoir de beug
		zone.innerHTML = zone.innerHTML.replace('hashtag recherche de', "<br><p>"+resultat[2][0]+"</p><br>"); //Remplacement de "hashtag recherche de" par un vide
		//zone.innerHTML += "<br><p>"+resultat[2][0]+"</p><br>"; //écriture de la phrase
	});
}