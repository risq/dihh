var Dig = require('../models/dig');

module.exports = {

	getDigById: function(id, done) {
		Dig.findById(id, done);
	},

	getDigs: function(done) {
		Dig.find(done);
	},

	getDigsByCreatorId: function(userId, done) {
		Dig.find(done);
	},

	createDig: function(data, creator, done) {
		var dig = new Dig();

		dig.title         = data.title;
		dig.artists       = data.artists;
		dig.year          = data.year;
		dig.links.youtube = data.youtube;
		dig.cover 		  = data.cover;
		dig.creator       = creator;

		dig.save(done); 
	},

	removeDigById: function(id, done) {
		Dig.remove({
            _id: id
        }, done);
	}

}