var gulp       = require('gulp'),
    contentful = require('contentful');




gulp.task('contentful', function() {
  
  var client = contentful.createClient({
    accessToken : keys.contentful.playground.accessToken,
    space : keys.contentful.playground.space_id
  })  

  client.entry('6M9lbETeOQqiwKwsCO2qGU')
    .then(function (res, err) {

      var cityName = res.fields.cityName;

      console.log( cityName  )
    })
  
})