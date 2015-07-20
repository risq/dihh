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

	tweet: function(message, url) {

		if ( client ) {

			var formattedMessage = url ? this.truncate(message, 115) + ' ' + url :
								   this.truncate(message, 140);
			
			client.post('statuses/update', {
				status: formattedMessage
			}, function(error, tweet, response){

				if ( error ) {
					console.log(error, tweet);
				}
				
			});

		}
	},

	tweetDig: function(dig) {
		var message = dig.artists.join(', ') + ' - ' + dig.title + ' (' + dig.year + ')',
			url = shareUrl + '/digs/' + dig.slug;
		this.tweet(message, url);
	},

	// http://snipplr.com/view/16108/truncate-a-string-to-a-set-length-breaking-at-word-boundaries/
	truncate: function (str, limit) {
	    var bits, i;
	    if ('string' !== typeof str) {
	        return '';
	    }
	    bits = str.split('');
	    if (bits.length > limit) {
	        for (i = bits.length - 1; i > -1; --i) {
	            if (i > limit - 4) {
	                bits.length = i;
	            }
	            else if (' ' === bits[i]) {
	                bits.length = i;
	                break;
	            }
	        }
	        bits.push('...');
	    }
	    return bits.join('');
	}

};