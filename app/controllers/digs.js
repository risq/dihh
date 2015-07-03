var async = require('async');
var Dig = require('../models/dig');

var digsPerPage = 48;

function getDigById(id, done) {
	Dig.findById(id, done);
}

function getDigBySlug(slug, done) {
	Dig.findOne({
		slug: slug
	})
	.exec(done);
}

function getDigs(skip, limit, done) {

	Dig.find({
		published: true
	})
		.sort( '-created_at' )
		.skip( skip )
		.limit( limit )
		.exec( done );
}

function getDigsPage(page, done) {

	Dig.find({
		page: page - 1
	})
		.sort( '-created_at' )
		.limit( digsPerPage )
		.exec( done );
}

function getDigsByCreatorId(userId, done) {
	Dig.find({
		published: true,
		creator: userId
	})
		.sort('-created_at')
		.exec(done);
}

function createDig(data, creator, done) {

	var dig = new Dig();

	dig.title         = data.title;
	dig.artists       = data.artists;
	dig.year          = data.year;
	dig.cover 		  = data.cover;
	dig.hasSleeve 	  = data.hasSleeve;
	dig.label 		  = data.label;
	dig.youtubeId 	  = data.youtubeId;
	dig.slug 	  	  = data.slug;
	dig.published 	  = true;
	dig.creator       = creator;

	dig.save( function(err) {

		if ( err ) {

			done( err );

		} else {

			updatePages( done );

		}

	}); 
}

function updateDig(dig, data, done) {

	dig.title         = data.title;
	dig.artists       = data.artists;
	dig.year          = data.year;
	dig.hasSleeve 	  = data.hasSleeve;
	dig.label 		  = data.label;
	dig.youtubeId 	  = data.youtubeId;
	dig.slug 	  	  = data.slug;
	dig.published 	  = true;

	if (dig.cover) {

		dig.cover = data.cover;

	}

	dig.save( function(err) {

		if ( err ) {

			done( err );

		} else {

			done();

		}

	}); 
}

function removeDig(dig, done) {

	dig.remove(function(err) {

		if ( err ) {

			done( err );

		} else {

			updatePages( done );
			
		}
	});
}

function getDigsCount(done) {

	Dig.count({}, done);

}

function updatePages(done) {
	
	getDigs( null, null, function(error, digs) {

		async.eachSeries(Object.keys(digs), function ( index, saveDone ) {

			var dig = digs[ index ],
				page = Math.floor( index / digsPerPage);

			dig.page = page;
			dig.save( saveDone );

		}, done);
	});
}

module.exports = {
	getDigById: getDigById,
	getDigBySlug: getDigBySlug,
	getDigs: getDigs,
	getDigsPage: getDigsPage,
	getDigsByCreatorId: getDigsByCreatorId,
	createDig: createDig,
	removeDig: removeDig,
	updateDig: updateDig,
	getDigsCount: getDigsCount,
	updatePages: updatePages,
};