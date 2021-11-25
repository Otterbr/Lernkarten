// Eingabe-Taste löst Button aus:
var input = document.getElementById('antwort');
input.addEventListener("keyup", function(event) {
	if (event.keyCode === 13) {
		event.preventDefault();
		document.getElementById("koBtn").click();
}
});

//Schon vorgekommen Funktion - verhindert zunächst doppelte Abfragen, bis jede Frage gestellt wurde
var dagewesen = [];
function schonVor(x) {
	var ausgabe = 0;
	var warDrin = 0;
	for (i=0; i < dagewesen.length; i++) {
		if (dagewesen[i] == x){
			warDrin = 1;
			break
		}
	}
	if (warDrin == 1){
		ausgabe = 1;
	}
	else {
		dagewesen.push(x);
		ausgabe = 0;
	}
	if (dagewesen.length == fragen.length){
		ausgabe = 0;
	}
	return ausgabe;
}

//Globale Variablen
var gehtsschonlos = 0;
var items = fragen.length;

var anzRichtig = 0;
document.getElementById("anzAnzeig").innerHTML = anzRichtig;

var letztgegAntwo = "";

var aktuelleFrage = 0;

// Zufällige Frage
function schreibe_text() { 
	document.getElementById("antwort").value='';

	document.getElementById("korrekt").innerHTML = "";
	document.getElementById("korrekttxt").innerHTML = "";
	var g = 0;
	while (g == 0){
		var zahl = Math.floor(Math.random() * 100);
		if (zahl < items && schonVor(zahl)== 0){
			g = 1
		}
	}
	
	var rfrage = fragen[zahl];
	aktuelleFrage = zahl			
	document.getElementById('frage').innerHTML = '<h1>' + rfrage + '</h1>';
	document.getElementById("feedback").style.visibility = "hidden";
	gehtsschonlos = 1;
}

// Antwort Überprüfung
function korrekt(){
	if (gehtsschonlos == 1){
		var rantwort = document.getElementById('antwort').value;
		
		var rantwort = rantwort.replace(/\s+/g, '').toUpperCase(); 		// EINGABE IN GROßBUCHSTABENUNDOHNELEERZEICHEN
		var anwo = antworten[aktuelleFrage];
		anwo = anwo.replace(/\s+/g, '').toUpperCase();					// ANTWORT IN GROßBUCHSTABENUNDOHNELEERZEICHEN
		
		if (rantwort == anwo && rantwort != letztgegAntwo){
			document.getElementById("korrekt").innerHTML = '<img width="60px" height="60px" src="korrekt.png">';
			document.getElementById("korrekttxt").innerHTML = beschreibung[aktuelleFrage];
			document.getElementById("feedback").style.visibility = "visible";
			anzRichtig = anzRichtig + 1;
			document.getElementById("anzAnzeig").innerHTML = anzRichtig;
			letztgegAntwo = rantwort;
		}
		else if (rantwort == letztgegAntwo && rantwort == anwo){
			schreibe_text();
		}
		else {
			document.getElementById("korrekt").innerHTML = '<img width="60px" height="60px" src="falsch.png">';
			document.getElementById("korrekttxt").innerHTML = '<div class="falsch">' + antworten[aktuelleFrage] + '</div>';
			document.getElementById("feedback").style.visibility = "visible";				
		}
	}
	else {
		schreibe_text();
	}
}


// Zeigt Tabelle aller Inhalte an (mit IndexNr.)
/*  <= Hier / hinzufügen zum aktivieren, btw. / entfernen zum ausblenden
document.write('<button onclick="zeig();"> Quelle </button>');
document.write('<a  href="#liste0"><button onclick="daListe()"> was war schon Liste </button></a>');
document.write('Anzahl der Fragen (unique): ' + items );

document.write('<table><tr><td>');
document.write('<ul>');
for (x in fragen) {
	document.write('<li id="liste' + x +'"></li>');
}
document.write('</ul>');
document.write('</td><td>');

function daListe(){
	for (x in dagewesen){
		document.getElementById("liste" + x).innerHTML = '<li>' + dagewesen[x] + '</li>';
	}
}

document.write('<table style="border: 1px solid #ddd; padding: 8px;" id="quelle"><tr style="color: gray;"><td>ID</td><td>Fragen</td><td>Antworten</td><td>Beschreibung</td></tr><tr>');
for (x in fragen) {
	document.write('<tr><td>' + x + '</td>');
	document.write('<td style="border: 1px solid #ddd; padding: 8px;" id="lfragen">' + fragen[x] + '</td>');		
	document.write('<td style="border: 1px solid #ddd; padding: 8px;" id="lantworten">' + antworten[x] + '</td>');
	document.write('<td style="border: 1px solid #ddd; padding: 8px;" id="lbeschreibung">' + beschreibung[x] + '</td>');			
	document.write('</tr>');
}		
document.write('</table>');
document.write('</tr></table>');

var ganzei = 0;
function zeig() {
	if (ganzei == 0) {
		document.getElementById("quelle").style.visibility = "visible";
		ganzei = 1;
	} else {
		document.getElementById("quelle").style.visibility = "hidden";
		ganzei = 0;
	}
}
//*/
