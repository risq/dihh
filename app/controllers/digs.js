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
	dig.label 		  = data.label;
	dig.youtubeId 	  = data.youtube;
	dig.slug 	  	  = data.slug;
	dig.published 	  = true;
	dig.creator       = creator;

	dig.save(done); 
}

function removeDigById(id, done) {
	Dig.remove({
        _id: id
    }, done);
}

function getDigsCount(done) {
	Dig.count({}, done);
}

function updatePages(done) {
	getDigs( null, null, function(error, digs) {

		async.eachSeries(Object.keys(digs), function ( index, done ) {

			var dig = digs[ index ],
				page = Math.floor( index / digsPerPage);

			dig.page = page;
			dig.save( done )

		}, function( err ) {

			console.log( 'done !' );

		});
	});
}

module.exports = {
	getDigById: getDigById,
	getDigBySlug: getDigBySlug,
	getDigs: getDigs,
	getDigsPage: getDigsPage,
	getDigsByCreatorId: getDigsByCreatorId,
	createDig: createDig,
	removeDigById: removeDigById,
	getDigsCount: getDigsCount,
	updatePages: updatePages,
};