var GamePlayScene = (function(){
  var world, bird, pipe, pipe2;

  !function initialize(){

    // -- 1. Keine Welt, kein Vogel und keine Pipes

    // -- 2. HackyBirds Welt erstellen:
    // --------------------------------------------------------
    world = new World({ gravity: 5 });

    // -- 3. HackyBird erstellen und ihn zur Welt bringen
    // --------------------------------------------------------
    // bird = new Bird( {texture: 'img/flappyBird.png', x: 100, y: 200 } );
    // world.addSprite( {sprite: bird, is_hero: true} );

    // -- 6. Erstes Hindernis erstellen und zur Welt bringen
    // --------------------------------------------------------
    // pipe = new Pipe( {texture: 'img/pipe.jpg', x: world.width, top: true} );
    // world.addSprite( {sprite: pipe} );

    // -- 7. Zweites Hindernis erstellen und zur Welt bringen
    // --------------------------------------------------------
    // pipe2 = new Pipe( { texture: 'img/pipe.jpg', x: 400, top: false, y: world.height } );
    // world.addSprite( {sprite: pipe2} );    
  }();

  function keyPress(){
    // -- 4. Bird flattert, wenn die Leertaste gedrückt wird
    // --------------------------------------------------------
    // bird.flap();
  }

  function update(){
    // -- 5. Vogel fliegt nach vorn
    // --------------------------------------------------------
    // bird.move( {speed: 5} );
  }

  return { onKeyPress: keyPress, onUpdate: update }
}());