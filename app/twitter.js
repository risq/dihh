var Twitter = require('twitter');
 
var client;


module.exports = {

	init: function(crendentials) {

		client = new Twitter({
			consumer_key: crendentials.consumerKey,
			consumer_secret: crendentials.consumerSecret,
			access_token_key: crendentials.accessTokenKey,
			access_token_secret: crendentials.accessTokenSecret
		});

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