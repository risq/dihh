/* Notes:
   - gulp/tasks/browserify.js handles js recompiling with watchify
   - gulp/tasks/browserSync.js watches and reloads compiled files
*/

var gulp     = require('gulp');
var config   = require('../config');

gulp.task('watch', ['watchify','browserSync'], function() {
  gulp.watch(config.less.src,   ['less']);
  gulp.watch(config.images.src, ['images']);
  gulp.watch(config.fonts.src, ['fonts']);
  gulp.watch(config.adminAssets.src, ['adminAssets']);
  // Watchify will watch and recompile our JS, so no need to gulp.watch it
});
