var $ = require('jquery');


function init() {

    $.ajaxSetup({ cache: false });

}

function getDigs(options, done, fail) {

	var page = options.page || 0;

	NProgress.start();

	$.getJSON('/digs/page/' + page)
		.done(function(data) {

			done(formatDigs(data));

		})
		.fail(fail)
		.always(function() {

			NProgress.done();

		});
}

function formatDigs(digs) {

	return $.each(digs, function(index, dig) {

		dig.artist = dig.artists.join(', ');
		dig.cover = dig.cover.indexOf('http://') > -1 ? dig.cover : '/uploads/' + dig.cover;

		dig.links = dig.links || {};

		dig.links.youtube = '//www.youtube.com/watch?v=' + dig.youtubeId;

	}).reverse();
}

module.exports = {
    init: init,
    getDigs: getDigs
};
