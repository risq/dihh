var digs = require('../controllers/digs');
var router = require('../router');

module.exports = function(app) {

	app.get('/', function(req, res) {

		router.main(res, {
			pageId: 1
		});

	});

	app.get('/digs', function(req, res) {

		router.main(res, {
			pageId: 1
		});

	});

	app.get('/page/:page(\\d+)', function(req, res) {

		router.main(res, {
			pageId: req.params.page
		});

	});

	app.get('/digs/:digSlug', function(req, res) {

		router.main(res, {
			digSlug: req.params.digSlug
		});

	});

	app.get('/page/:page(\\d+)/digs/:digSlug', function(req, res) {

		router.main(res, {
			digSlug: req.params.digSlug
		});

	});

}
