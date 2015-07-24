var async = require('async');
var digs = require('./controllers/digs');

function main( res, data ) {

	data.pageId = data.pageId || 1;

	var queries = {
		count: digs.getDigsCount
	};

	if ( data.digSlug ) {
		queries.dig = function ( done ) {
			digs.getDigBySlug( data.digSlug, done );
		}
	}

	async.parallel( queries, function( err, results ) {
  		
		if (err) {
        
			error( res, err );

		} else {

			res.render('index.ejs', {
				pageId: results.dig ? results.dig.page + 1 : data.pageId,
				count: results.count,
				pagesCount: Math.floor(results.count / 48) + 1,
				dig: results.dig
			});
		}

	});
}

function admin( res, data ) {

	digs.getDigsByCreatorId(data.user._id, function(err, digs) {

        if (err) {
            
			error( res, err );

		} else {

	        res.render('admin.ejs', {
				user: data.user,
				digs: digs,
				message: data.flashMessage,
				formData: data.formData ? data.formData : {},
				page: data.page || 'home'
			});
	    }

    });
}

function login( res, data ) {

	res.render('login.ejs', { 
		message: data.flashMessage 
	});

}

function signup( res, data ) {

	res.render('signup.ejs', { 
		message: data.flashMessage 
	});

}

function error( res, err ) {

	res.send(err);

}

function sitemap( res ) {

	var queries = {
		count: digs.getDigsCount,
		digs: function ( done ) {
			digs.getDigs( 0, 0, done );
		}
	};

	async.parallel( queries, function( err, results ) {

		if (err) {
            
			error( res, err );

		} else {

			res.header('Content-Type', 'application/xml');
			res.render('sitemap.ejs', {
				digs: results.digs,
				pagesCount: Math.floor(results.count / 48) + 1,
				lastModificationDate: results.digs[0].created_at
			});
		}
		
	})
}

module.exports = {

	main: main,
	admin: admin,
	login: login,
	signup: signup,
	error: error,
	sitemap: sitemap

};