// Load plugins 
var gulp = require('gulp'),
    cssmin = require('gulp-cssmin'),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglify'),
    htmlmin = require('gulp-htmlmin')
    
// Minify HTML
gulp.task('html-compress', function() {
  return gulp.src('build/**/*.html')
    .pipe(htmlmin({collapseWhitespace: true}))
    .pipe(gulp.dest('build'))
});

// Make CSS Teeny-Tiny
gulp.task('css-compress', function() {
  return gulp.src('build/assets/css/**/*')
  .pipe(cssmin())
  .pipe(gulp.dest('build/assets/css'));
});

// Compress that JS
gulp.task('js-compress', function() {
  return gulp.src('build/assets/js/**/*.js')
  .pipe(uglify())
  .pipe(gulp.dest('build/assets/js'))
});

// Compress
gulp.task('compress', ['html-compress', 'css-compress', 'js-compress']);