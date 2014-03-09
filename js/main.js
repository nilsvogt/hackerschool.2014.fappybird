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
 */

// Zunächst definieren wir all Variablen, die wir
// für das Erstellen des Spieles benötigen
var stage, context,
    images = {},
    queued_images = 0;

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
}

/**
 * game loop
 */
// Nun definieren wir die Variablen, die wir in unserem GameLoop benötigen
var background_position = 0;

function update(){
  background_position = background_position -5;
  if(background_position < -1024) background_position = 0;

  context.clearRect(0,0,1024,768);
  context.drawImage(images['background'], background_position, 0, stage.width, stage.height);
  context.drawImage(images['background'], 1024 + background_position, 0, stage.width, stage.height);
}

create();