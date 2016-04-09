var gutil  = require('gulp-util'),
    tinylr = require('tiny-lr')()


var config = require('./config')

/**
 * Tiny LR
 */
// tinylr.listen( config.ports.livereload )

/**
 * Private Methods
 *
 * notifyLiveReload()
 * logError()
 * formatError()
 */

var helpers = {

  notifyLiveReload: function(event) {
    var fileName = require('path').relative(__dirname + '/', event.path)

    // console.log('notifyLiveReload event', event)

    tinylr.changed({
      body: {
        files: [fileName]
      }
    })

    // Get filename from path
    var filename = event.path.match(/\/[^\/]+$/g)[0].replace('/', '')

    // Logging
    gutil.log( gutil.colors.black.bgGreen( ' ' + event.type.toUpperCase() + ' '), gutil.colors.yellow( filename ) )

  },

  /**
   * Log Error
   * 
   * @param  {Object} error 
   * @return {Object}  
   */
  logError: function(error) {

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

}

module.exports = helpers;