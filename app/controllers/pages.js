var digs = require('./digs');
var async = require('async');

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

	        res.render('home.ejs', {
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

module.exports = {

	main: main,
	admin: admin,
	login: login,
	signup: signup,
	error: error

};