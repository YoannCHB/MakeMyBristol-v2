class SpeechAPI{
	constructor(json){
		let j = json || {};

		let vocal = window.SpeechRecognition || window.webkitSpeechRecognition || SpeechRecognition;
		this.speech = new vocal();
		this.speech.vocal = vocal || false;
		this.speech.lang = j.language || navigator.language;
		this.speech.continuous = j.continuous || true;
		this.speech.interimResults = j.interimResults || true;

		this.status = vocal ? true : false;
		this.started = false;
		this.permanent = null;
	}
}

SpeechAPI.prototype.start = function(callback){
	var objectSpeech = this;
	this.speech.onresult = function(event){
		let r = event.results[event.results.length-1][0].transcript;
		var final = "";
		var interim = "";
		for (var i = 0; i < event.results.length; i++) {
			if (event.results[i].final) {
				final += event.results[i][0].transcript;
			} else {
				interim += event.results[i][0].transcript;
			}
		}
		objectSpeech.permanent = interim || final;
		callback(interim || final, r);
	}
	try{
		this.speech.start();
		this.started = true;
	}
	catch(e){
		console.error('Impossible de lancer la reconaissance vocale.')
		this.speech = new this.vocal();
		this.started = false;
	}
}

SpeechAPI.prototype.stop = function(){
	this.started = false;
	this.speech.stop();
}

SpeechAPI.prototype.reset = function(){
	this.result = null;
	this.permanent = null;
	this.started = false
	try{
		this.stop();
	}
	catch(e){}
}

//PARTIE TESTE
/*
var g = new SpeechAPI({interimResults: true});
g.start(function(r){
	document.getElementById('fakebox-text').innerHTML = r;
	console.log(r);
});
*/