module.exports = function(app, config) {

	app.locals.displayArtists = function(artists) {
		if (artists) {
			return artists.length && artists.join ? artists.join(', ') : artists;
		} else {
			return ''
		}
	}

	app.locals.getPageTitle = function(dig, pageId) {
		var title;

		if (dig) {
			title = dig.artists.join(', ') + ' - ' + dig.title + ' | Digging Into Hip Hop';
		} else {
			title = 'Digging Into Hip Hop | Underground hip hop & 90\'s classics';
		}

		if (pageId && pageId > 1) {
			title += ' - Page ' + pageId;
		}

		return title;
	}

	app.locals.getDigTitle = function(dig) {
		return dig ? dig.artists.join(', ') + ' - ' + dig.title + ' (' + dig.year + ') - ' + dig.label :
			'';
	}

	app.locals.getCanonicalUrl = function(dig, pageId) {
		var url = 'http://' + config.twitter.shareUrl + '/';
		if (pageId && pageId > 1) {
			url += 'page/' + pageId + '/';
		}
		if (dig) {
			url += 'digs/' + dig.slug;
		}
		return url;
	}

	app.locals.getImageUrl = function(dig) {
		if (dig) {
			return 'http://' + config.twitter.shareUrl + '/uploads/' + dig.cover;
		} else {
			return 'http://' + config.twitter.shareUrl + '/img/share.png';
		}
	}

	app.locals.getDescription = function(dig) {

		var description;

		if (dig) {

			description =  'Digging ' + dig.artists.join(', ') + ' - ' + dig.title + ' (' + dig.year + '), released under label : ' + dig.label + '. ';

			if (dig.description) {
				description += dig.description + ' - ';
			}
			description += 'Digging Into Hip Hop - Listen & discover more hip hop records on dihh.io - Underground hip hop & 90\'s classics';

		} else {
			description = 'Digging Into Hip Hop - Listen & discover hip hop records on dihh.io - Underground hip hop & 90\'s classics';
		}

		return description;
	}

	app.locals.getAnalyticsId = function() {
		return config.googleAnalyticsId;
	}

}
