var APP = (function () {


  /**
   * Modules
   */
  var app = window.APP || {}

  /**
   * Mini Helper Objects
   */
  var _w = {}, // Window
      _s = {}; // Screen

  /**
   * Module Properties
   *
   * config
   * data
   * $el
   * 
   */
  app = {

    // Config
    config : {
      environment : window.location.href.match(/(localhost)/g) ? 'development' : 'production',
      debug : window.location.href.match(/(localhost)/g) ? true : false
    },

    // Data
    data : {
      temp : null,
      binds : {}
    },

    // URLs
    urls : {
      social : {
        facebook : '',
        twitter : '',
        youtube : '',
        instagram : '',
        pinterest : '/'
      },

    },


    // Console (Client)
    console : {
      color : {
        'error'     : '#da1a1a',
        'event'     : '#3d8627',
        'function'  : '#3db330',
        'callback'  : '#6c6c6c',
        'object'    : '#ac07db',
        'animation' : '#c3028f',
        'control'   : '#d2a946',
        'plugin'    : '#e734d0',
        'waypoint'  : '#4e77c1',
        'hash'      : '#ad74ed',
        'number'    : '#1c1c1c',
      }
    },



    // Elements
    $el : {
      body : $('body'),
      container : $('#app'),

      header : $('#header'),

      hero : $('#hero'),

      loader : $('#loader'),

    },



  };



  /**
   * Init
   */
  app.init = function () {
    

    route('/', 'home', function () {});
    route('/page1', 'template1', function () {
      this.greeting = 'Hello world!';
      this.moreText = 'Bacon ipsum...';
      this.counter = 0;
      this.$on('.my-button', 'click', function () {
        this.counter += 1;
        this.$refresh();
      }.bind(this));
    });
    route('/page2', 'template2', function () {
      this.heading = 'I\'m page two!';
    });
    route('*', 'error404', function () {});



  }


  app.routes = function() {

    
  }




  
  app.init()
  
  return app;
}());
