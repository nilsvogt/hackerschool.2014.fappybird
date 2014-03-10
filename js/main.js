/**
 * main.js
 * This file is intended for education purposes only
 * 2014  Nils Vogt, Michael Indyk
 * v.0.1
 *
 * TODOs:
 * ------
 *  - hero (bird), 
 *  - pipes (obstacles), 
 *  - collision detection
 *  - count scores
 *
 * Changelog:
 *  - preload, create, update
 *  - evtlistener for KEY_CODE_SPACE
 */

// Zunächst definieren wir alle Variablen, die wir
// für das Erstellen des Spieles benötigen
var stage, context,
    images = {},
    queued_images = 0;

// nun definieren wir die Variable, die wir für das
// Steuern des Spiels benötigen
var position_background, position_bird;

var KEY_CODE_SPACE = 32;

/**
 * Preload grafics
 */
function loadImage( image_name, image_path ){
  var image = new Image();

  queued_images = queued_images + 1; // queued_images++;

  image.onload = function () {
      images[ image_name ] = this;
      queued_images = queued_images - 1; // queued_images--;
      
      if(queued_images === 0){
        loadedAllImages();
      }
  };
  image.src = image_path;
}

function loadedAllImages(){
  // mit setInterval können wir eine Prozedur in einem definierten
  // Zeitabstand immer wieder aufrufen. In unserem Fall ist das die
  // update-Funcktion
  setInterval(update, 1000/60);
}

/**
 * create the game
 */
function create(){
  // Zuerst benötigen wir eine Bühne, in der unser Spiel angezeigt wird
  stage = document.createElement('canvas');
  // Natürlich müssen wir nun auch die Höhe und Breite des Spieles angeben
  stage.width  = 1024;
  stage.height = 768;
  // mit  "stage.style.border" können wir unserer Bühne einen Rahmen geben, 
  // damit wir sie auch dann erkennen, wenn sie leer ist. Dies kann passieren,
  // wenn ein Fehler auftritt.
  stage.style.border   = "1px solid black";

  // mit "document.body.appendChild" können wir nun unsere erstellte Bühne
  // der Seite hinzufügen
  document.body.appendChild(stage);

  // Nun wird es Zeit unsere Grafiken zu laden
  loadImage('background', 'img/bg.png');
  loadImage('bird', 'img/flappyBird.png');
  

  // I am not yet sure how to explain the context. Maybe this needs to stay
  // unexplained for the first session? feel free to enhance anything here.
  context = stage.getContext("2d");

  // Nun setzen wir die Variablen, die wir in unserem GameLoop benötigen
  position_background = 0;
  position_bird = stage.height / 2;

  // beim Drücken der Leertaste soll der Vogel nach oben fliegen:
  document.onkeypress = function(e){
    e = e || window.event;
    var key = e.keyCode || e.which;

    // nun vergleichen wir den Tastencode der gedrückten Taste mit
    // der Konstante KEY_CODE_SPACE, welche dem Wert 32 entspricht
    if(key === KEY_CODE_SPACE){
      // dieser Teil des Code wird nur dann ausgeführt, wenn 
      // der vergleich stimmt!
      alert(':)');
    }
  };
}

/**
 * game loop
 */

function update(){
  // Zwei Hintergrundbilder, für endlosschleife
  position_background = position_background -5;
  if(position_background < -1024) position_background = 0;

  

  position_bird = position_bird + 1;
  
  // Zeichnen: erst löschen, dann aktualisieren
  context.clearRect(0,0,1024,768);
  context.drawImage(images['background'], position_background, 0, stage.width, stage.height);
  context.drawImage(images['background'], 1024 + position_background, 0, stage.width, stage.height);

  context.drawImage(images['bird'], stage.width/2, position_bird, 35, 25);
}

create();