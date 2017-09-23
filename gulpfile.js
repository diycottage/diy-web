'use strict';

var gulp = require('gulp');
var gzip = require('gulp-gzip');
var sass = require('gulp-sass');
var serve = require('gulp-serve');

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
    .pipe(gulp.dest('./dist/assets/css'));
});

// Watch for project changes
gulp.task('watch', function() {
  gulp.watch('./assets/scss/**/*.scss', ['sass']);
});

gulp.task('serve', serve({
  root: ['.'],
  port: 1337,
}));

gulp.task('dev-server', ['serve', 'watch']);

