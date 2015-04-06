var digs = require('./digs');

function main( res, data ) {

	data.pageId = data.pageId || 1;

	digs.getDigsCount(function(err, count) {

		if (err) {
            
			error( res, err );

		} else {

            res.render('index.ejs', {
				pageId: data.pageId,
				count: count,
				pagesCount: Math.floor(count / 48) + 1
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
				message: data.flashMessage
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