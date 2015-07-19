var gulp = require('gulp');

// Run this to compress all the things!
gulp.task('production', ['bower', 'less', 'fonts', 'adminAssets', 'images', 'uglifyJs']);
