  function World( params ){
    var self   = this,
        params = params || {};

    this.gravity = params.gravity || 3;
    
    this.stage;
    this.images = [];
    this.speed  = 0;
    this.position_background;

    this.width  = 1024;
    this.height = 768;

    this._hero; // camera will follow the hero

    this._loop = null;

    this.initializeStage();

    // Nun setzen wir die Variablen, die wir in unserem WorldLoop benötigen
    this.context = this.stage.getContext("2d");
    this.position_background = 0;
    
    this.bodies = [];
    
    // Nun wird es Zeit unsere Grafiken zu laden
    this.loadImage('background', 'img/bg.png', function(){
      // auf gehts!
      self.start();
    });
  }

  World.prototype.initializeStage = function(){
    // Zuerst benötigen wir eine Bühne, in der unser Spiel angezeigt wird
    this.stage = document.createElement('canvas');
    // Natürlich müssen wir nun auch die Höhe und Breite des Spieles angeben
    this.stage.width  = this.width;
    this.stage.height = this.height;
    // mit  "stage.style.border" können wir unserer Bühne einen Rahmen geben,
    // damit wir sie auch dann erkennen, wenn sie leer ist. Dies kann passieren,
    // wenn ein Fehler auftritt.
    this.stage.style.border   = "1px solid black";

    document.body.appendChild(this.stage);
  }

  World.prototype.start = function(){
    var self = this;
    
    this._loop = setInterval(function(){
        self.tick.call(self);
    }, 1000/40);
  }

  World.prototype.pause = function(){
    clearInterval(this._loop);
  }

//////////////
// tick related methds
//////////////

  World.prototype.tick = function(){
    // haben wir einen Hero? 
    if(this.hero){
      // Dann folgen wir ihm!
      this.speed = this.hero.speed;
    }

    this.hitTests();

    this.updateWorld();
    this.updateBodies();

    // for now we call 'onUpdate' directly so no student needs to assign a callback
    if(typeof GamePlayScene.onUpdate == 'function'){
     GamePlayScene.onUpdate();
    }
  }

  World.prototype.hitTests = function(){
    var node, sibling;

    for( var i = 0; i < this.bodies.length; i++ ){
        node = this.bodies[i];

        for( var j = 0; j < this.bodies.length; j++ ){
            sibling = this.bodies[j];

            if(node === sibling) continue;

            if( (node.x + node.width ) > sibling.x && (node.x + node.width ) < (sibling.x + sibling.width ) 
             && (node.y + node.height) > sibling.y && (node.y + node.height) < (sibling.y + sibling.height) ){
                this.pause();
                break;
            }
        }
    }
  }

  World.prototype.updateWorld = function(){
    
    // Position des Hintergrundbildes für eine endlosschleife
    this.position_background = this.position_background - this.speed;
    if(this.position_background < -this.width) this.position_background = 0;
    
    if(this.hero){
      this.hero.x -= this.hero.speed;
    }
    
    // Zeichnen: erst löschen, dann aktualisieren
    this.context.clearRect(0,0,this.width,this.height);
    // Zeichnen der Hintergründe
    this.context.drawImage(this.images['background'], this.position_background, 0, this.stage.width, this.stage.height);
    this.context.drawImage(this.images['background'], this.width + this.position_background, 0, this.stage.width, this.stage.height);
  }

  World.prototype.updateBodies = function(){
    for (var i = 0; i < this.bodies.length; i++){
        var body = this.bodies[i];

        body.update( this );

        this.context.drawImage(body.texture, body.x, body.y, body.width, body.height);    
    }
  }

//////////////
// helper-methds
//////////////

  World.prototype.loadImage = function( image_name, image_path, calback ){
    var image = new Image(),
        self = this;

    image.onload = function () {
        self.images[ image_name ] = this;
        calback();
    };
    image.src = image_path;
  }

  /**
   * adds a sprite to the world and assigns hero if desired
   * the hero will be followed by the camera
   *
   * @param object params {object sprite [, bool is_hero]}
   * @return void
   */
  World.prototype.addSprite = function( params ){
    this.bodies.push( params.sprite );
    if( params.is_hero ){
        this.hero = params.sprite;
    }
  }
