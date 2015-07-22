var disqusLoaded = false,
	disqusShortname = 'dihh';

function loadCommentsForTrack ( dig, trackFullTitle ) {

    if ( disqusLoaded ) {

    	reloadDisqus( dig._id, 'http://dihh.io/digs/' + dig.slug, trackFullTitle );

    } else {

    	loadDisqus( dig._id, 'http://dihh.io/digs/' + dig.slug, trackFullTitle );

    }
}

function loadDisqus ( disqusIdentifier, disqusUrl, disqusTitle ) {

	window.disqus_shortname = disqusShortname;
	window.disqus_identifier = disqusIdentifier;
	window.disqus_url = disqusUrl;
	window.disqus_title = disqusTitle;

	var dsq = document.createElement('script'); dsq.type = 'text/javascript'; dsq.async = true;
    dsq.src = '//' + disqusShortname + '.disqus.com/embed.js';
    (document.getElementsByTagName('head')[0] || document.getElementsByTagName('body')[0]).appendChild(dsq);

    disqusLoaded = true;

}

function reloadDisqus ( disqusIdentifier, disqusUrl, disqusTitle ) {

	if (DISQUS) {

		DISQUS.reset({
			reload: true,
			config: function () {  

				this.page.identifier = disqusIdentifier;  
				this.page.url = disqusUrl;
				this.page.title = disqusTitle;

			}
		});
	}
}

module.exports = {
    loadCommentsForTrack: loadCommentsForTrack,
};