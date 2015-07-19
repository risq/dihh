var Twitter = require('twitter');
 
var client;


module.exports = {

	init: function(config) {

		if (config.enabled) {

			client = new Twitter({
				consumer_key: config.consumerKey,
				consumer_secret: config.consumerSecret,
				access_token_key: config.accessTokenKey,
				access_token_secret: config.accessTokenSecret
			});
		}

	},

	tweet: function(message) {

		if ( client ) {
			
			client.post('statuses/update', {
				status: message
			}, function(error, tweet, response){

				if ( !error ) {
					// console.log(tweet);
				}
				
			});

		}
	},

};