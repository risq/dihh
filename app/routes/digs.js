var path = require('path');
var digs = require('../controllers/digs');
var multer = require('multer');


module.exports = function(app, passport) {

	// PUBLIC ==================================
	app.get('/digs', function(req, res) {
		digs.getDigsPage(0, function(err, digs) {
            if (err)
                res.send(err);

            res.json(digs);
        });
	});

	// app.get('/digs/:slug', function(req, res) {
	// 	digs.getDigsPageByDigSlug(req.params.slug, function(err, digs) {
	//            if (err)
	//                res.send(err);
	//                
	//            res.json(digs);
	//        });
	// });

	app.get('/digs/page/:page', function(req, res) {
		digs.getDigsPage(req.params.page, function(err, digs) {
            if (err)
                res.send(err);

            res.json(digs);
        });
	});
 	

 	// SECURED ==================================
	app.post('/digs', isLoggedIn, [ multer({ dest: './public/uploads/'}), function(req, res){
	    if (req.body.title && 
			req.body.artists && 
			req.body.year && 
			req.body.youtube &&
			req.body.label &&
			req.files.cover &&
			req.body.slug) {

			digs.createDig({
				title: 		req.body.title,
				artists: 	req.body.artists,
				year: 		req.body.year,
				youtube: 	req.body.youtube,
				label: 		req.body.label,
				cover: 		req.files.cover.name,
				slug: 		req.body.slug
			}, req.user._id, function(err) {
				console.log(err);

	            if (!err) {

                    twitter.tweet(req.body.artists + ' - ' + req.body.title + ' (' + req.body.year + ')');

		        	req.flash('digMessage', 'Dig created !');

				} else if (err.path) {

            		req.flash('digMessage', 'Error with field ' + err.path);

            	} else { 

	            	req.flash('digMessage', 'Error !');

	            }

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

function isLoggedIn(req, res, next) {
	if (req.isAuthenticated())
		return next();

	res.redirect('/admin');
}