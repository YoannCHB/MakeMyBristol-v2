/*
	VERSION DOM : 0.7.2
	VERSION SPEECH : 0.0.1
*/

window.onload = function(){
//ONLOAD
}

const lang = navigator.language; //LANGUE DU NAVIGATEUR
var titreValider = false;
var sauvegarde = "";
var zone = document.getElementById('zone1');
var titreName = "";
var vocalStat = false;
var tout = "";
var titreName = false;

function Lecture(){
	let paragraphe = document.getElementById('zone1').getElementsByTagName('p'); //On récupère toutes les zone de texte (paragraphe = <p>)
	let paragraphe2 = document.getElementById('zone2').getElementsByTagName('p');
	let texte = "";//Le texte
	for(var n in paragraphe){
		texte += paragraphe[n].innerHTML; //Ce qu'il y a d'écris dans chaque zone de texte
	}
	for(var n in paragraphe2){
		texte += paragraphe2[n].innerHTML; //Ce qu'il y a d'écris dans chaque zone de texte
	}
	texte = texte.split('undefined');
	texte = texte[0];
	let ssu = new SpeechSynthesisUtterance()
	ssu.lang = lang;
	ssu.text = texte;
	speechSynthesis.speak(ssu);
}


function validevocal(){
	if(vocalStat){
		vocal.stop();
		vocalStat = false;
	} else {
		vocal = new SpeechAPI(); //ON CREE L'ELEMENT
		vocal.start(function(event, final){ //SI ON A UN RESULTAT
			ai(event, final); //ON LANCE LA FONTION AI AVEC LE RESULTAT SOUS FORME DE TEXTE
		}) //FIN FONCTION
		vocal.speech.addEventListener('soundend', function(event) { 
			alert('Vocal recognition stopped')
			vocalStat = false;
		}); //SI la vocale s arrete toute seul
		vocalStat = true;
	}
}

function ai(phrase, fin){
	var phrase = phrase;
	tout = tout+" "+phrase+","; 
	
	choixBox();
	
	let word = phrase.trim().split(' '); //ON ENLEVE LES ESPACES EN TROP (TRIM()) ET ON FAIT UN TABLEAU GRACE AUX ESPACES QUI SEPARENT CHAQUE MOTS (SPLIT(' '))
	for(var n = 0; n < word.length; n++){ //POUR LE NOMBRE DE MOTS DANS LA PHRASE ON REPETE EN BOUCLE

		//COMPREHENSION
		if(word[n]+" "+word[n+1]+" "+word[n+2]+" "+word[n+3] == "hashtag mais en titre"){
			titre(phrase.replace("hashtag mais en titre", ""));
			phrase = false;
		}
		
		if(word[n]+" "+word[n+1]+" "+word[n+2]+" "+word[n+3] == "hashtag mets en titre"){
			titre(phrase.replace("hashtag mets en titre", ""));
			phrase = false;
		}

		if(word[n]+" "+word[n+1]+" "+word[n+2]+" "+word[n+3] == "hashtag à la ligne"){
			phrase = phrase.replace("hashtag à la ligne", "<br>");
		}
		
		if(word[n] == "tiret"){      // Définition du mot  
			phrase = phrase.replace("tiret", "-");//  remplacement du mot par le caractere
		}
		if(word[n] == "arobase"){   // Définition du mot 
			phrase = phrase.replace("arobase", "@");//  remplacement du mot par le caractere
		}
		if(word[n] == "point"){	// Définition du mot 
			phrase = phrase.replace("point", "."); //  remplacement du mot par le caractere
		}
		if(word[n] == "virgule"){		// Définition du mot 
			phrase = phrase.replace("virgule", ",");//  remplacement du mot par le caractere
		}
		if(word[n] == "plus"){// Définition du mot 
				phrase = phrase.replace("plus", "+");//  remplacement du mot par le caractere
		}
		if(word[n] == "moins"){// Définition du mot 
				phrase = phrase.replace("moins", "-");//  remplacement du mot par le caractere
		}
		if(word[n] == "égal"){// Définition du mot 
				phrase = phrase.replace("égal", "=");//  remplacement du mot par le caractere
		}
		if(word[n] == "slach"){// Définition du mot 
				phrase = phrase.replace("slach", "/");//  remplacement du mot par le caractere
		}
  	if(word[n] == "pourcent"){// Définition du mot 
				phrase = phrase.replace("pourcent", "%");//  remplacement du mot par le caractere
		}
		if(word[n]+" "+word[n+1]  == "ouvrir accolade"){ // Définition des mots// Définition des mots
				phrase = phrase.replace("ouvrir accolade", "{");//  remplacement du mot par le caractere
		}
		if(word[n]+" "+word[n+1]  == "fermer accolade"){// Définition des mots
				phrase = phrase.replace("fermer accolade", "}");//  remplacement du mot par le caractere
		}
		if(word[n]+" "+word[n+1] == "ouvrir crochet"){// Définition des mots
				phrase = phrase.replace("ouvrir crochet", "[");//  remplacement du mot par le caractere
		}
		if(word[n]+" "+word[n+1] == "fermer crochet "){// Définition des mots
				phrase = phrase.replace("fermer crochet ", "]");//  remplacement du mot par le caractere
		}
		if(word[n]+" "+word[n+1] == "ouvrir parenthèse"){// Définition des mots
				phrase = phrase.replace("ouvrir parenthèse ", "(");//  remplacement du mot par le caractere
		}
		if(word[n]+" "+word[n+1] == "fermer parenthèse "){// Définition des mots
				phrase = phrase.replace("fermer parenthèse ", ")");//  remplacement du mot par le caractere
		}
		if(word[n] == "et"){// Définition du mot
	  		phrase = phrase.replace("et", "&");//  remplacement du mot par le caractere
		}
		if(word[n] == "astérisque"){// Définition du mot
	  		phrase = phrase.replace("astérisque", "*");//  remplacement du mot par le caractere
		}
		if(word[n] === "diez"){// Définition du mot
				phrase = phrase.replace("diez", "#");//  remplacement du mot par le caractere
		}
		if(word[n]+" "+word[n+1] == "point d'exclamation"){// Définition des mots
				phrase = phrase.replace("point d'exclamation", "!");//  remplacement des mots par le caractere
		}
		if(word[n]+" "+word[n+1] == "point d'intérogation"){// Définition des mots
				phrase = phrase.replace("point d'intérogation", "?");//  remplacement des mots par le caractere
		}
		if(word[n]+" "+word[n+1] == "supérieur à"){// Définition des mots
	  		phrase = phrase.replace("supérieur à", ">");// remplacement des mots par le caractere
		}
		if(word[n]+" "+word[n+1] == "inférieur à"){// Définition des mots
	  		phrase = phrase.replace("inférieur à", "<");//  remplacement des mots par le caractere
		}	
		
		
		//COMMANDES
		if(word[n]+" "+word[n+1] == "hashtag rouge"){// Définition des mots
			phrase = phrase.replace('hashtag rouge', '<p style="color: Red; display: inline-block">&nbsp');
		}
		
		if(word[n]+" "+word[n+1] == "hashtag jaune"){// Définition des mots 
			phrase = phrase.replace('hashtag jaune', '<p style="color: Yellow; display: inline-block">&nbsp');
		}
		
		if(word[n]+" "+word[n+1] == "hashtag bleue"){// Définition des mots
			phrase = phrase.replace('hashtag bleue', '<p style="color: blue; display: inline-block">&nbsp');
		}
		
		if(word[n] == "#bleue"){// Définition des mots
			phrase = phrase.replace('#bleue', '<p style="color: blue; display: inline-block">&nbsp');
		}
		
			if(word[n]+" "+word[n+1] == "hashtag vert"){// Définition des mots
			phrase = phrase.replace('hashtag vert', '<p style="color: green; display: inline-block">&nbsp');
		}
		
					if(word[n]+" "+word[n+1] == "hashtag vers"){// Définition des mots
			phrase = phrase.replace('hashtag vers', '<p style="color: green; display: inline-block">&nbsp');
		}
		
					if(word[n]+" "+word[n+1] == "hashtag rose"){// Définition des mots
			phrase = phrase.replace('hashtag rose', '<p style="color: pink; display: inline-block">&nbsp');
		}
		
			if(word[n]+" "+word[n+1]+" "+word[n+2] == "hashtag fluo jaune"){// Définition des mots
			phrase = phrase.replace('hashtag fluo jaune', '<p style="background: yellow; display: inline-block">&nbsp');
		}
		
				if(word[n]+" "+word[n+1]+" "+word[n+2] == "hashtag fluo rouge"){// Définition des mots
			phrase = phrase.replace('hashtag fluo rouge', '<p style="background: red; display: inline-block">&nbsp');
		}
		 
		if(word[n]+" "+word[n+1]+" "+word[n+2] == "hashtag fluo rose"){// Définition des mots
			phrase = phrase.replace('hashtag fluo rose', '<p style="background: pink; display: inline-block">&nbsp');
		}
		
			if(word[n]+" "+word[n+1]+" "+word[n+2] == "hashtag fluo vert"){// Définition des mots
			phrase = phrase.replace('hashtag fluo vert', '<p style="background: green; display: inline-block">&nbsp');
		}
		
		if(word[n]+" "+word[n+1]+" "+word[n+2] == "hashtag fluo bleu"){// Définition des mots
			phrase = phrase.replace('hashtag fluo bleu', '<p style="background: blue; display: inline-block">&nbsp');
		}
		
			if(word[n]+" "+word[n+1]+" "+word[n+2] == "hashtag fluo violet"){// Définition des mots
			phrase = phrase.replace('hashtag fluo violet', '<p style="background: purple; display: inline-block">&nbsp');
		}
		
		
		
		//STOP
		if(word[n]+" "+word[n+1] == "hashtag arrêter"){// Définition des mots
			phrase = phrase.replace('hashtag arrêter', '&nbsp</p>');
		}
		
		if(word[n]+" "+word[n+1] == "hashtag stop"){// Définition des mots
			phrase = phrase.replace('hashtag stop', '&nbsp</p>');
		}
	
		/*
		//COMMANDE WIKIPEDIA
		if(word[n]+" "+word[n+1]+" "+word[n+2] == "hashtag recherche de"){// Définition des mots
			let w = 'hashtag recherche de';
			let s = phrase.substring(phrase.indexOf(w)+w.length, phrase.length);
			wikipedia(s.trim());
			phrase = phrase.replace('hashtag recherche de', ''); //Remplacement de "hashtag recherche de" par un vide
			//phrase = false;
		}
		if(word[n]+" "+word[n+1] == "hashtag recherche"){// Définition des mots
			let w = 'hashtag recherche';
			let s = phrase.substring(phrase.indexOf(w)+w.length, phrase.length);
			wikipedia(s.trim());
			phrase = phrase.replace('hashtag recherche ', '');//Remplacement de "hashtag recherche " par un vide //On doit definir ses deux phrases quasiment identiques à case du traducteur pour ne pas avoir de beug
			//phrase = false;
		}
*/
	}
	
	if(phrase){
		zone.innerHTML = "<p style='display: inline-block'>"+phrase+"</p><br>"; //écriture de la phrase
	}
}

function titre(phrase){
	titreName = phrase[1].toUpperCase();
	titreName = titreName+phrase.substring(2, phrase.length);
	let d = document.getElementsByClassName('titreFeuille');
	d[0].innerHTML = titreName;
	d[1].innerHTML = titreName;
}

function choixBox(){
	let zonetexte1 = document.getElementById('zone1');
	let zonetexte2 = document.getElementById('zone2');
	let all = zonetexte1.scrollHeight;
	let inner = zonetexte1.innerHTML;
	let calc = Math.round(window.innerHeight*0.74); //74% (taille bloque)
	if(all > calc){
		zone = zonetexte2;
		zonetexte1.innerHTML = sauvegarde;
		zonetexte2.focus();
	} else {
		zone = zonetexte1;
		sauvegarde = inner;
	}
}

function enregistrer(){
	let zonetexte1 = document.getElementById('zone1');
	let zonetexte2 = document.getElementById('zone2');
	if(!titreName || titreName.trim() === ""){
		var all = " Pas de titre";
	} else {
		var all = " "+titreName.trim();
	}
	all += " {/CUT\} "+zonetexte1.innerHTML;
	all += " {/CUT\} "+zonetexte2.innerHTML;
	save(btoa(all), 'Ma fiche.txt', "text/plain"); //tout
}

function save(data, filename, type) {
    var file = new Blob([data], {type: type});
    if (window.navigator.msSaveOrOpenBlob) // IE10+
        window.navigator.msSaveOrOpenBlob(file, filename);
    else { // Others
        let a = document.createElement("a"),
        url = URL.createObjectURL(file);
        a.href = url;
        a.download = filename;
        document.body.appendChild(a);
        a.click();
        setTimeout(function() {
            document.body.removeChild(a);
            window.URL.revokeObjectURL(url);  
        }, 0); 
    }
}

function ouvrirFichier(file){
	let zonetexte1 = document.getElementById('zone1');
	let zonetexte2 = document.getElementById('zone2');
		let data = atob(file);
		data = data.split('{/CUT\}');
		titre(data[0]);
		if(data[1]){
			zonetexte1.innerHTML = data[1];
		}
		if(data[2]){
			zonetexte2.innerHTML = data[2];
		}
}

function openfile(event){
	let myFile = event.target.files[0];
	if(myFile.type == "text/plain"){
		var reader = new FileReader();
		reader.addEventListener('load', function (e) {
	  		ouvrirFichier(e.target.result);
		});
		reader.readAsBinaryString(myFile);
	} else {
		putImage(URL.createObjectURL(myFile))
	}
}

function putImage(src){
	zone.innerHTML += "<img style='width: 200px; height: auto; text-align: center' src='"+src+"'/>";
}

function base(color){
	let b = document.getElementById('fiche1');
	let c = document.getElementById('fiche2');
	b.src = color;
	c.src = color;
}

function closePopup(){
	let popup = document.getElementById('popup');
	popup.style.height = "0px";
}
