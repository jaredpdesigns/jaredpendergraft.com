// Load plugins 
var gulp = require('gulp'),
    cssmin = require('gulp-cssmin'),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglify'),
    htmlmin = require('gulp-htmlmin')
    
// Minify HTML
gulp.task('html-compress', function() {
  return gulp.src('docs/**/*.html')
    .pipe(htmlmin({collapseWhitespace: true}))
    .pipe(gulp.dest('docs'))
});

// Make CSS Teeny-Tiny
gulp.task('css-compress', function() {
  return gulp.src('docs/assets/css/**/*')
  .pipe(cssmin())
  .pipe(gulp.dest('docs/assets/css'));
});

// Compress that JS
gulp.task('js-compress', function() {
  return gulp.src('docs/assets/js/**/*.js')
  .pipe(uglify())
  .pipe(gulp.dest('docs/assets/js'))
});

// Default Task
gulp.task('default',['html-compress', 'css-compress', 'js-compress']);