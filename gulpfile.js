'use strict';

var gulp = require( 'gulp' );
var jshint = require( 'gulp-jshint' );


gulp.task('jshint', function() {
    gulp.src( ['./scheduler.js', './test.js'] )
        .pipe( jshint('./.jshintrc') )
        .pipe( jshint.reporter( 'jshint-stylish' ) );
});

// will add tasks for min and other stuff
