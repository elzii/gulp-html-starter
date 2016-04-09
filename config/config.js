/**
 * Configuration
 *
 * paths
 * ports
 * options
 */
var config = {
  paths: {
    app:      './app/',
    src:      './app/src/',
    css:      './app/assets/css/',
    js:       './app/assets/js/',  
    partials: './app/partials/',
  },
  ports: {
    express: 4000,
    livereload: 4002
  },
  options: {
    minify_css: false
  }
}

module.exports = config;