var digs = require('../controllers/digs');
var pages = require('../controllers/pages');

module.exports = function(app) {

	app.param(function(name, fn) {
		
		if (fn instanceof RegExp) {

			return function(req, res, next, val) {

				var captures;

				if (captures = fn.exec(String(val))) {

					req.params[name] = captures;
					next();

				} else {

					next('route');

				}
			}
		}
	});

	app.get('/', function(req, res) {

		pages.main(res, {
			pageId: 1
		});

	});

	app.get('/page/:page(\\d+)', function(req, res) {

		pages.main(res, {
			pageId: req.params.page
		});

	});

	app.get('/digs/:digSlug', function(req, res) {

		pages.main(res, {
			digSlug: req.params.digSlug
		});

	});

	app.get('/page/:page(\\d+)/digs/:digSlug', function(req, res) {

		pages.main(res, {
			digSlug: req.params.digSlug
		});

	});

}
