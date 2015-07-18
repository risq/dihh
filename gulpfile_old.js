// Load Gulp
var gulp    = require('gulp'),
    gutil   = require('gulp-util');
    plugins = require('gulp-load-plugins')();

var browserSync = require('browser-sync');

var reload = browserSync.reload;

var files = {
    js: {
        libs: [
            'public/src/js/libs/jquery/jquery.js',
            'public/src/js/libs/classie/classie.js',
            'public/src/js/libs/threejs/three.js',
            'public/src/js/libs/tween.js/Tween.js',
            'public/src/js/libs/stats.js/stats.min.js',
            'public/src/js/libs/dat-gui/dat.gui.js',
            'public/src/js/libs/nprogress/nprogress.js',
            'public/src/js/libs/vivus/vivus.js',
            'public/src/js/libs/cratedigger.js/threejs_modules.min.js',
            'public/src/js/libs/cratedigger.js/cratedigger.min.js',
        ],
        headLibs: [
            'public/src/js/libs/modernizr/modernizr.js'
        ],
        app: 'public/src/js/app/**/*.js'
    },
    less: {
        entry: 'public/src/less/style.less',
        watch: 'public/src/less/**/*.less'
    },
    images: 'public/src/img/**/*',
    fonts: 'public/src/fonts/**/*',
    adminAssets: 'public/src/admin/**/*'
}

gulp.task('default', ['watch']);

gulp.task('build-libs', function() {
  return gulp.src(files.js.libs)
    .pipe(plugins.uglifyjs('libs.min.js', {
        mangle: false
    }))
    .pipe(gulp.dest('public/dist'));
});

gulp.task('build-head-libs', function() {
  return gulp.src(files.js.headLibs)
    .pipe(plugins.concat('head.libs.js'))
    .pipe(gulp.dest('public/dist'));
});

gulp.task('build-app', function() {
  return gulp.src(files.js.app)
    .pipe(plugins.jshint())
    .pipe(plugins.jshint.reporter('jshint-stylish'))
    .pipe(plugins.uglifyjs('app.min.js', {
        outSourceMap: true,
        sourceRoot: './',
        output : {
          ascii_only : true
        }
      }))
    .pipe(gulp.dest('public/dist'))
    .pipe(reload({ stream: true }));
});

gulp.task('copy-images', function() {
  return gulp.src(files.images)
    .pipe(gulp.dest('public/dist/img'));
});

gulp.task('copy-fonts', function() {
  return gulp.src(files.fonts)
    .pipe(gulp.dest('public/dist/fonts'));
});

gulp.task('copy-admin-assets', function() {
  return gulp.src(files.adminAssets)
    .pipe(gulp.dest('public/dist/admin/assets'));
});

gulp.task('build-css', function() {
    return gulp.src(files.less.entry)
        .pipe(plugins.plumber())
        .pipe(plugins.less())
        .on('error', function (err) {
            gutil.log(err);
            this.emit('end');
        })
        .pipe(plugins.autoprefixer(
            {
                browsers: [
                    '> 1%',
                    'last 2 versions',
                    'firefox >= 4',
                    'safari 7',
                    'safari 8',
                    'IE 8',
                    'IE 9',
                    'IE 10',
                    'IE 11'
                ],
                cascade: false
            }
        ))
        .pipe(plugins.cssmin())
        .pipe(gulp.dest('public/dist')).on('error', gutil.log)
        .pipe(reload({ stream: true }));
});

gulp.task('build', ['build-libs', 'build-app', 'build-css', 'build-head-libs', 'copy-images', 'copy-admin-assets', 'copy-fonts']);

gulp.task('watch', ['build'], function() {
    browserSync({
        server: {
            baseDir: 'public/dist',
            middleware: function(req, res, next) {
                require('./server')(req, res, next);
            }
        }
    });
    gulp.watch(files.js.libs, ['build-libs']);
    gulp.watch(files.js.headLibs, ['build-head-libs']);
    gulp.watch(files.js.app, ['build-app']);
    gulp.watch(files.less.watch, ['build-css']);
    gulp.watch(files.images, ['copy-images']);
    gulp.watch(files.fonts, ['copy-fonts']);
    gulp.watch(files.adminAssets, ['copy-admin-assets']);
});