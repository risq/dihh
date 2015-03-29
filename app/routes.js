var path = require('path');
var digs = require('./controllers/digs');
var multer = require('multer');


module.exports = function(app, passport) {

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

// normal routes ===============================================================

	// show the home page (will also have our login links)
	app.get('/', function(req, res) {
        res.render('index.ejs', {
			pageId: 0
		});
	});

	app.param('page', /^\d+$/);

	app.get('/page/:page', function(req, res) {
		console.log('page' + req.params.page)
        res.render('index.ejs', {
			pageId: req.params.page
		});
	});

	// ADMIN =========================
	app.get('/admin', function(req, res) {
		res.render('admin.ejs', {
			user : req.user
		});
	});

	// PROFILE SECTION =========================
	app.get('/admin/home', isLoggedIn, function(req, res) {
		digs.getDigsByCreatorId(req.user._id, function(err, digs) {
            if (err)
                res.send(err);

            res.render('home.ejs', {
				user: req.user,
				digs: digs,
				message: req.flash('digMessage')
			});
        });
	});

	// LOGOUT ==============================
	app.get('/admin/logout', function(req, res) {
		req.logout();
		res.redirect('/');
	});

// =============================================================================
// AUTHENTICATE (FIRST LOGIN) ==================================================
// =============================================================================

	// LOGIN ===============================
	// show the login form
	app.get('/admin/login', function(req, res) {
		res.render('login.ejs', { message: req.flash('loginMessage') });
	});

	// process the login form
	app.post('/admin/login', passport.authenticate('local-login', {
		successRedirect : '/admin/home', // redirect to the secure profile section
		failureRedirect : '/admin/login', // redirect back to the signup page if there is an error
		failureFlash : true // allow flash messages
	}));

	// SIGNUP =================================
	// show the signup form
	app.get('/admin/signup', function(req, res) {
		res.render('signup.ejs', { message: req.flash('signupMessage') });
	});

	// process the signup form
	app.post('/admin/signup', passport.authenticate('local-signup', {
		successRedirect : '/admin/home', // redirect to the secure profile section
		failureRedirect : '/admin/signup', // redirect back to the signup page if there is an error
		failureFlash : true // allow flash messages
	}));

// =============================================================================
// DIGS ========================================================================
// =============================================================================
// 
	app.get('/digs', function(req, res) {
		digs.getDigsPage(0, function(err, digs) {
            if (err)
                res.send(err);

            res.json(digs);
        });
	});

	app.get('/digs/page/:page', function(req, res) {
		digs.getDigsPage(req.params.page, function(err, digs) {
            if (err)
                res.send(err);

            res.json(digs);
        });
	});
 	
	app.post('/digs', isLoggedIn, [ multer({ dest: './public/uploads/'}), function(req, res){
	    if (req.body.title && 
			req.body.artists && 
			req.body.year && 
			req.body.youtube &&
			req.files.cover) {

			digs.createDig({
				title: 		req.body.title,
				artists: 	req.body.artists,
				year: 		req.body.year,
				youtube: 	req.body.youtube,
				cover: 		req.files.cover.name
			}, req.user._id, function(err) {
	            if (err)
		            res.send(err);

		        req.flash('digMessage', 'Dig created !');
				res.redirect('/admin/home');
	        });
		}
		else {
			req.flash('digMessage', 'Missing field(s).');
			res.redirect('/admin/home');
		}
	}]);

	app.get('/digs/:dig_id/delete', isLoggedIn, function(req, res) {
		digs.getDigById(req.params.dig_id, function(err, dig) {	
			if (err)
	            res.send(err);

			if (req.user._id == dig.creator.toString()) {
		        digs.removeDigById(req.params.dig_id, function(err, dig) {
		            if (err)
		                res.send(err);

		            req.flash('digMessage', 'Dig deleted !');
					res.redirect('/admin/home');
		        });
			}
			else {
				req.flash('digMessage', 'Cannot delete this dig.');
				res.redirect('/admin/home');
			}
		});
    });

    app.get('/digs/generate', isLoggedIn, function(req, res) {

    	var faker = require('faker');

    	for(var i = 0; i < 100; i++) {
    		digs.createDig({
				title: 		i + ' - ' + faker.lorem.sentence(),
				artists: 	faker.name.firstName(),
				year: 		faker.finance.mask(),
				youtube: 	faker.internet.password(),
				cover: 		faker.image.abstract()
			}, req.user._id);
    	}


    });
}

// route middleware to ensure user is logged in
function isLoggedIn(req, res, next) {
	if (req.isAuthenticated())
		return next();

	res.redirect('/admin');
}
