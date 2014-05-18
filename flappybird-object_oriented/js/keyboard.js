var Keyboard = (function(){
  var KEY_CODE_SPACE = 32;

  !function init(){
    _bindEvents();    
  }();

  function _bindEvents(){
    // beim Drücken der Leertaste soll der Vogel nach oben fliegen:
    document.onkeypress = function(e){
      e.preventDefault();
      e = e || window.event;
      var key = e.keyCode || e.which;

      // nun vergleichen wir den Tastencode der gedrückten Taste mit
      // der Konstante KEY_CODE_SPACE, welche dem Wert 32 entspricht
      if(key === KEY_CODE_SPACE){
        // dieser Teil des Code wird nur dann ausgeführt, wenn
        // der vergleich stimmt!

        if(typeof GamePlayScene.onKeyPress == 'function'){
          GamePlayScene.onKeyPress();
        }
      }
    };
  }
}());