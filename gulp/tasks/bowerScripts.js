var gulp    = require('gulp');
var config  = require('../config').bower;
var size    = require('gulp-filesize');
var concat  = require('gulp-concat');
var uglify = require('gulp-uglify');

gulp.task('bower-scripts', function() {
  return gulp.src(config.libs)
    .pipe(uglify())
    .pipe(concat(config.filename))
    .pipe(gulp.dest(config.dest))
    .pipe(size());
});
