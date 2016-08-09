/**
 * Gulpfile
 */

var config = require('./config');

var gulp = require('gulp');
var browserify = require('gulp-browserify');
var plumber = require('gulp-plumber');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var size = require('gulp-filesize');

/**
 * TASK
 * Scripts
 */
gulp.task('scripts', function() {

    gulp.src(config.scripts.entry)
        .pipe(plumber())
        .pipe(browserify())
        .pipe(concat(config.scripts.distName + '.js'))
        .pipe(size())
        .pipe(gulp.dest(config.dist))
        .pipe(uglify())
        .pipe(concat(config.scripts.distName + '.min.js'))
        .pipe(size())
        .pipe(gulp.dest(config.dist));

});

/**
 * TASK
 * Watch
 */
gulp.task('watch', function() {

    gulp.watch(config.scripts.src, ['scripts']);

});

/**
 * TASK
 * Default
 */
gulp.task('default', ['watch']);