var path = require('path');
var digs = require('../controllers/digs');
var multer = require('multer');
var pages = require('../controllers/pages');


module.exports = function(app, passport) {


	// PUBLIC =============================
	app.get('/admin/logout', function(req, res) {

		req.logout();
		res.redirect('/');

	});

	// SECURED ============================
	app.get('/admin', isLoggedIn, function(req, res) {
		pages.admin(res, {
			user: req.user,
			flashMessage: req.flash('digMessage'),
			formData: req.flash('formData')
		});

	});

	// LOGIN ===============================
	// show the login form
	app.get('/admin/login', function(req, res) {

		pages.login(res, {
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

		pages.signup(res, {
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
