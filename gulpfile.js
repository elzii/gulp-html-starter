var gulp         = require('gulp'),
    sass         = require('gulp-ruby-sass'),
    autoprefixer = require('gulp-autoprefixer'),
    compass      = require('gulp-compass'),
    minifycss    = require('gulp-minify-css'),
    concat       = require('gulp-concat'),
    wrap         = require('gulp-wrap'),
    rename       = require('gulp-rename'),
    sourcemaps   = require('gulp-sourcemaps'),
    gutil        = require('gulp-util'),
    uglify       = require('gulp-uglify'),
    babel        = require('gulp-babel'),
    sourcemaps   = require('gulp-sourcemaps'),
    path         = require('path'),
    fileinclude  = require('gulp-file-include'),
    tinylr;


var config    = require('./config/config'),
    functions = require('./config/functions');




// var task_express = require('./config/tasks/express.js')





/**
 * TASK: Express & LiveReload
 */
gulp.task('express', function() {
  var express   = require('express'),
      app       = express()

  app.use(require('connect-livereload')({ port: config.ports.livereload }))
  app.use(express.static(__dirname + '/app'))

  // LISTEN
  app.listen( config.ports.express )

  gutil.log( gutil.colors.black.bgYellow( ' EXPRESS SERVER RUNNING ' ), gutil.colors.bgCyan.black( ' http://localhost:' + config.ports.express + ' ') )
})

gulp.task('livereload', function (event) {
  tinylr = require('tiny-lr')()
  tinylr.listen( config.ports.livereload )

  gutil.log( gutil.colors.black.bgMagenta( ' LIVERELOAD ' ), gutil.colors.bgCyan.black( ' http://localhost:' + config.ports.livereload + ' ') )
})






/**
 * TASK: Styles
 */
gulp.task('styles', function() {

  // Minify CSS
  if ( config.options.minify_css ) {
    return sass( config.paths.css, { style: 'expanded' })
      .on('error', functions.logError)
      .pipe(sourcemaps.init())
      .pipe(rename({suffix: '.min'}))
      .pipe(minifycss())
      .pipe(gulp.dest( config.paths.css ))
  } else {
    return sass( config.paths.css, { style: 'expanded' })
      .on('error', functions.logError)
      .pipe(sourcemaps.init())
      .pipe(gulp.dest( config.paths.css ))
  }
})







/**
 * TASK: Partials
 */
gulp.task('partials', function() {
  return gulp.src([ config.paths.src + '**/*.tpl.html'])
    .pipe(fileinclude({
      prefix: '@@',
      basepath: config.paths.partials,
      // context: {
      //   use_custom_css: false,
      //   use_custom_js: false,
      // }
    }))
    .pipe(rename({
      extname : ''
    }))
    .pipe(rename({
      extname : '.html'
    }))
    .pipe(gulp.dest( config.paths.app ))
})





/**
 * TASK: Babel
 */
gulp.task('babel', function() {
  return gulp.src('app/assets/es6/**/*.js')
    .pipe(sourcemaps.init())
    .pipe(babel({
      presets: ['es2015']
    }))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('app/assets/js'));
})



/**
 * TASK: Uglify JS
 */
gulp.task('uglify-js', function() {
  
  return gulp.src( config.paths.js + '**/*.js' )
    // .pipe(concat('components.min.js'))
    .pipe(uglify())
    .pipe(rename({suffix: '.min'}))
    .pipe(gulp.dest( config.paths.js + 'min/' ))

})


/**
 * TASK: Concatenate Javascript
 */
gulp.task('concat-js', function() {
  
  return gulp.src( config.paths.js + '**/*.js' )
    .pipe(concat('all.min.js'))
    .pipe(uglify())
    .pipe(gulp.dest( config.paths.js + 'min/' ))

})







/**
 * TASK: Build
 */
gulp.task('build', function() {
  
})







/**
 * TASK: Watch
 */
gulp.task('watch', function() {
  gulp.watch([ config.paths.css + '/**/*.scss'], ['styles'], functions.notifyLiveReload)
  gulp.watch([
    config.paths.src + '*.tpl.html',
    config.paths.partials + '*.tpl.html',
  ], ['partials'])
  gulp.watch([ config.paths.css + '/**/*.css'], functions.notifyLiveReload)
  gulp.watch([ config.paths.js + '/**/*.js'], functions.notifyLiveReload)
  gulp.watch([ config.paths.es6 + '/**/*.js'], functions.notifyLiveReload)
})

gulp.task('default', [
  'express', 
  'livereload', 
  'styles', 
  'babel', 
  'partials',
  'watch'
], function() {
  // Do stuff during default task

})




