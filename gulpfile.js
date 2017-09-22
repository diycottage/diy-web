'use strict';

var gulp = require('gulp');
var gzip = require('gulp-gzip');
var sass = require('gulp-sass');
var livereload = require('gulp-livereload');

// Compress files.
gulp.task('compress', function() {
  gulp.src('./assets/img/*.svg')
    .pipe(gzip())
    .pipe(gulp.dest('./assets/img/gzip'));
});

// Compile SCSS directory
gulp.task('sass', function() {
  return gulp.src('./assets/scss/**/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('./dist/assets/css'))
    .pipe(livereload());
});

// Watch for project changes
gulp.task('watch', function() {
  livereload.listen();
  gulp.watch('./assets/scss/**/*.scss', ['sass']);
});

