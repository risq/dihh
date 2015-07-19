var path = require('path');
var digs = require('../controllers/digs');
var multer = require('multer');
var router = require('../router');


module.exports = function(app, passport) {


	// PUBLIC =============================
	app.get('/admin/logout', function(req, res) {

		req.logout();
		res.redirect('/');

	});

	// SECURED ============================
	app.get('/admin', isLoggedIn, function(req, res) {

		var formData = req.flash('formData');

		router.admin(res, {
			user: req.user,
			flashMessage: req.flash('digMessage'),
			formData: formData[0] ? formData[0] : null
		});

	});

	app.get('/admin/update/:dig_id', isLoggedIn, function(req, res) {

		digs.getDigById(req.params.dig_id, function(err, dig) {	

			if (err) {

	            res.send(err);

			} else if (req.user._id.toString() === dig.creator.toString()) {

				router.admin(res, {
					user: req.user,
					flashMessage: req.flash('digMessage'),
					formData: dig,
					page: 'update'
				});
		     
			} else {

				req.flash('digMessage', 'Cannot update this dig.');
				res.redirect('/admin');

			}
		});
    });

	// LOGIN ===============================
	// show the login form
	app.get('/admin/login', function(req, res) {

		router.login(res, {
			flashMessage: req.flash('loginMessage')
		});

	});

	// process the login form
	app.post('/admin/login', passport.authenticate('local-login', {
		successRedirect : '/admin',
		failureRedirect : '/admin/login',
		failureFlash : true
	}));

	// SIGNUP =================================
	// show the signup form
	app.get('/admin/signup', function(req, res) {

		router.signup(res, {
			flashMessage: req.flash('signupMessage')
		});

	});

	// process the signup form
	app.post('/admin/signup', passport.authenticate('local-signup', {
		successRedirect : '/admin',
		failureRedirect : '/admin/signup',
		failureFlash : true
	}));


}

function isLoggedIn(req, res, next) {
	if (req.isAuthenticated())
		return next();

	res.redirect('/admin/login');
}
