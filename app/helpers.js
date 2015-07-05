module.exports = function(app) {

	app.locals.displayArtists = function(artists) {
		if (artists) {
			return artists.length && artists.join ? artists.join(', ') : artists;
		} else {
			return ''
		}
	}

}

