var dest = './public/dist';
var src = './client';
var bowerComponents = './bower_components';

module.exports = {
  adminAssets: {
    src: src + '/admin/**',
    dest: dest + '/admin/assets'
  },
  bower: {
    dest: dest + '/',
    filename: 'libs.min.js',
    libs: [
      bowerComponents + '/modernizr/modernizr.js',
      bowerComponents + '/threejs/build/three.js',
      bowerComponents + '/dat-gui/build/dat.gui.js',
      bowerComponents + '/nprogress/nprogress.js',
      bowerComponents + '/vivus/dist/vivus.js'
    ]
  },
  browserSync: {
    server: {
      baseDir: 'public/dist',
      middleware: function(req, res, next) {
        require('../server')(req, res, next);
      }
    }
  },
  fonts: {
    src: src + '/fonts/**',
    dest: dest + '/fonts'
  },
  less: {
    entry: src + '/less/style.less',
    src: src + '/styles/*.css',
    dest: dest + '/'
  },
  images: {
    src: src + '/img/**',
    dest: dest + '/img'
  },
  browserify: {
    // A separate bundle will be generated for each
    // bundle config in the list below
    bundleConfigs: [{
      entries: src + '/js/main.js',
      dest: dest,
      outputName: 'main.js'
    }]
  },
  production: {
    cssSrc: dest + '/*.css',
    jsSrc: dest + '/*.js',
    dest: dest
  }
};
