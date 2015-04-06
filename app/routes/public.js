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

	app.param('page', /^\d+$/);

	app.get('/page/:page', function(req, res) {

		pages.main(res, {
			pageId: req.params.page
		});

	});

}
