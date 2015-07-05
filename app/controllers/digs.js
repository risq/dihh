var async = require('async');
var fs = require('fs');
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
	dig.artists       = formatArtists(data.artists);
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

			if ( dig.cover ) {

				fs.unlink('./public/uploads/' + dig.cover, function( unlinkErr ) {

					done( unlinkErr || err );
									
				});

			} else {

				done( err );

			}

		} else {

			updatePages( done );

		}

	}); 
}

function updateDig(dig, data, done) {

	var oldCover = data.updateCover ? dig.cover : null;

	dig.title         = data.title;
	dig.artists       = formatArtists(data.artists);
	dig.year          = data.year;
	dig.hasSleeve 	  = data.hasSleeve;
	dig.label 		  = data.label;
	dig.youtubeId 	  = data.youtubeId;
	dig.cover 		  = data.cover;
	dig.slug 	  	  = data.slug;
	dig.published 	  = true;

	dig.save( function(err) {

		if ( err ) {

			if ( data.updateCover ) {

				fs.unlink('./public/uploads/' + data.cover, function( unlinkErr ) {

					if ( unlinkErr ) {

						done( unlinkErr );

					} else {

						done( err );
						
					}			
				});

			} else {

				done( err );

			}

		} else {

			if (oldCover) {

				fs.unlink('./public/uploads/' + oldCover, function(err) {

					if ( err ) {

						done( err );

					} else {

						done();
						
					}			
				});

			} else {

				done();

			}
		}

	}); 
}

function removeDig(dig, done) {

	dig.remove(function(err) {

		if ( err ) {

			done( err );

		} else {

			fs.unlink('./public/uploads/' + dig.cover, function(err) {

				if ( err ) {

					done( err );

				} else {

					updatePages( done );
					
				}			
			});
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

function formatArtists(artistsStr) {
	var artists = [];

	artistsStr.split(',').forEach(function(artist, i) {
		artist = artist.trim();
		if (artist.length > 0 && artist !== '') {
			artists.push(artist);
		}
	});

	console.log(artists);

	return artists;
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