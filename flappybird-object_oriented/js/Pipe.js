var Pipe = function( params ){
  var params = params || {};
  
  this.x = params.x || 1;
  this.y = params.y || 1;
  this.top = (typeof params.top != 'undefined') ? params.top : true;

  this.loadTexture('img/pipe.jpg', this.init);
}

Pipe.prototype.loadTexture = function( image_path, callback ){
  var image = new Image(),
      bird = this;

  image.onload = function () {
      bird.texture = this;

      callback.call(bird);
  };
  image.src = image_path;
}

Pipe.prototype.init = function(){
  
  this.width = this.texture.width;
  this.height = this.texture.height;

  if(this.top){
    this.y = 0;
  }else{
    this.y -= this.height;
  }
}

Pipe.prototype.update = function( world ){
  this.x -= world.speed;
  if(this.x < -this.width) this.x = world.width;
} 