var gutil = require('gulp-util')

/**
 * Private Methods
 *
 * notifyLiveReload()
 * logError()
 * formatError()
 */
var log = {}

log.notifyLiveReload = function(lr, event) {
  var fileName = require('path').relative(__dirname + '/', event.path)

  lr.changed({
    body: {
      files: [fileName]
    }
  })

  // Get filename from path
  // var filename = event.path.match(/\/[^\/]+$/g)[0].replace('/', '')

  // Logging
  gutil.log( gutil.colors.black.bgGreen( ' ' + event.type.toUpperCase() + ' '), gutil.colors.yellow( event.path ) )

}

/**
 * Log Error
 * 
 * @param  {Object} error 
 * @return {Object}  
 */
log.logError = function(error) {

    var err = formatError(error)

    // Logging
    gutil.log( gutil.colors.bgRed(' ERROR '), gutil.colors.bgBlue( ' ' + err.plugin + ' ' ), gutil.colors.black.bgWhite( ' ' + err.message + ' ' ) )
    gutil.beep()

    this.emit('end')

    function formatError(obj) {

      var obj     = obj || {},
          msg     = obj.message || obj[0],
          plugin  = obj.plugin || null

      // clean up
      msg = msg.replace('error ', '')

      return {
        message: msg,
        plugin : plugin
      }

    }
}

module.exports = log;