module.exports = function(config){
  config.set({

    basePath : './',

    files : [
      'src/cronen_admin/static/bower_components/angular/angular.js',
      'src/cronen_admin/static/bower_components/angular-route/angular-route.js',
      'src/cronen_admin/static/bower_components/angular-mocks/angular-mocks.js',
      'src/cronen_admin/static/bower_components/underscore/underscore.js',
      'src/cronen_admin/static/components/**/*.js',
      'src/cronen_admin/static/js/**/*.js',
      'src/cronen_admin/static/app.js',
      'src/cronen_admin/static/view*/**/*.js',
      'test/static/view*/*.js'
    ],

    autoWatch : true,

    frameworks: ['jasmine'],

    browsers : ['Chrome'],

    plugins : [
            'karma-chrome-launcher',
            'karma-firefox-launcher',
            'karma-jasmine',
            'karma-junit-reporter'
            ],

    junitReporter : {
      outputFile: 'test_out/unit.xml',
      suite: 'unit'
    }

  });
};
