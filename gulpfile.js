'use strict';

var gulp        = require( 'gulp' );
var jshint      = require( 'gulp-jshint' );
var rename      = require( 'gulp-rename' );
var runSequence = require( 'run-sequence' );
var stylus      = require( 'gulp-stylus' );
var uglify      = require( 'gulp-uglify' );

// not sure if we'll use nib, but probably should add it
var nib = require( 'nib' );

var gulpConfig = require( './gulp/config' );

var paths = gulpConfig.paths;

var stylusOptions = {
    use: nib()
    , compress: false
};

gulp.task( 'default', function( cb ) {
    runSequence( 'jshint', 'release', cb );
});

gulp.task( 'release', [ 'stylus', 'stylus:compress', 'uglify', 'copySrcFiles' ] );

gulp.task( 'watch', function() {
    gulp.watch( paths.src.stylus + '**/*', [ 'stylus' ] );
});

gulp.task( 'jshint', function() {
    var files = [
        './gulpfile.js'
        , './test.js'
        , paths.src.js + 'scheduler.js'
    ];

    return gulp.src( files )
        .pipe( jshint( './.jshintrc' ) )
        .pipe( jshint.reporter( 'jshint-stylish' ) )
        .pipe( jshint.reporter( 'fail' ) );
});

gulp.task( 'uglify', function() {
    return gulp.src( [ paths.src.js + 'scheduler.js' ] )
        .pipe( uglify() )
        .pipe( rename({
            extname: '.min.js'
        }))
        .pipe( gulp.dest( paths.dist.js ) );
});

gulp.task( 'stylus', function() {
    stylusOptions.compress = false;

    return gulp.src( [ paths.src.stylus + 'scheduler.styl' ] )
        .pipe( stylus( stylusOptions ) )
        .pipe( gulp.dest( paths.src.css ) );
});

gulp.task( 'stylus:compress', function() {
    stylusOptions.compress = true;

    return gulp.src( [ paths.src.stylus + 'scheduler.styl' ] )
        .pipe( stylus( stylusOptions ) )
        .pipe( rename({
            extname: '.min.css'
        }))
        .pipe( gulp.dest( paths.dist.css ) );
});

gulp.task( 'copySrcFiles', function() {
    gulp.src( [ paths.src.js + '**/*'  ] )
        .pipe( gulp.dest( paths.dist.js ) );

    gulp.src( [ paths.src.css + '**/*'  ] )
        .pipe( gulp.dest( paths.dist.css ) );
});
