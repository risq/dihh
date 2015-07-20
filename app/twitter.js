var Twitter = require('twitter');

var client,
	shareUrl;


module.exports = {

	init: function(config) {

		if (config.enabled) {

			shareUrl = config.shareUrl;

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

				if ( error ) {
					console.log(error, tweet);
				}
				
			});

		}
	},

	tweetDig: function(dig) {
		this.tweet(dig.artists.join(', ') + ' - ' + dig.title + ' (' + dig.year + ') ' + shareUrl + '/digs/' + dig.slug);
	}

};