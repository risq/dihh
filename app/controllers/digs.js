var Dig = require('../models/dig');

var digsPerPage = 48;

module.exports = {

	getDigById: function(id, done) {
		Dig.findById(id, done);
	},

	getDigs: function(skip, limit, done) {
		Dig.find({
			published: true
		})
			.sort('-created_at')
			.skip(skip)
			.limit(limit)
			.exec(done);
	},

	getDigsPage: function(page, done) {
		this.getDigs((page - 1) * digsPerPage, digsPerPage, done);
	},

	getDigsByCreatorId: function(userId, done) {
		Dig.find({
			published: true,
			creator: userId
		})
			.sort('-created_at')
			.exec(done);
	},

	createDig: function(data, creator, done) {
		var dig = new Dig();

		dig.title         = data.title;
		dig.artists       = data.artists;
		dig.year          = data.year;
		dig.cover 		  = data.cover;
		dig.label 		  = data.label;
		dig.youtubeId 	  = data.youtube;
		dig.published 	  = true;
		dig.creator       = creator;

		dig.save(done); 
	},

	removeDigById: function(id, done) {
		Dig.remove({
            _id: id
        }, done);
	},

	getDigsCount: function(done) {
		Dig.count({}, done);
	}

}