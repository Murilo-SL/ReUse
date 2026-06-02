(function(){
  // Defina window.__REUSE_DEBUG = true no console do navegador para habilitar logs
  if (window.__REUSE_DEBUG !== true) {
    if (!window.console) window.console = {};
    var noop = function(){};
    try {
      console.log = noop;
      console.debug = noop;
      console.info = noop;
    } catch(e) {
      // ambiente restrito
    }
  }
})();
