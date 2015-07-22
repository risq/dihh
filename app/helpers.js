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
			title = 'Digging Into Hip Hop';
		}

		if (pageId && pageId > 1) { 
			title += ' - Page ' + pageId;
		}

		return title;
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
			description += 'Listen & discover more hip hop records on dihh.io.';

		} else {
			description = 'Listen & discover hip hop records on dihh.io.';
		}

		return description;
	}

}

