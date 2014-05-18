function Bird ( params ){
  params = params || {};

  this.x = params.x || 1;
  this.y = params.y || 1;

  this.velocity = 0;
  this.speed = params.speed || 0;

  this.loadTexture( params.texture );
}

Bird.prototype.loadTexture = function( image_path ){
  var image = new Image(),
      bird = this;

  image.onload = function () {
      bird.texture = this;
      bird.width = this.width;
      bird.height = this.height;
  };
  image.src = image_path;
}

Bird.prototype.flap = function(){
  this.velocity = 15;
}

Bird.prototype.update = function( world ){
  this.y = this.y + world.gravity - this.velocity;
  
  this.velocity += this.velocity > 0 ? -1 : 0;
}

/**
 * moves bird by passed speed and assigns local speed
 *
 * @param object params {float speed}
 * @return void
 */
Bird.prototype.move = function( params ){
  // move bird
  this.x = this.x + params.speed;

  // update resulting speed
  this.speed = params.speed
}
