var Api = (function() {

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

		return $.map(digs, function(dig) {

			return {

				title: dig.title,
				artist: dig.artists.join(', '),
				year: dig.year,
				cover: dig.cover.indexOf('http://') > -1 ? dig.cover : '/uploads/' + dig.cover,
				hasSleeve: false

			};
		}).reverse();
	}

	return {
        init: init,
        getDigs: getDigs
    };

})();