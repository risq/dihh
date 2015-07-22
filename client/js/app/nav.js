var Routing = require('./routing'),
	Player = require('./player'),
	Api = require('./api'),
	Crates = require('./crates'),
	Ui = require('./ui'),
	Intro = require('./intro');

function init() {

	loadPage({
		pageId: Routing.getCurrentPageId(), 
		digId: Routing.getCurrentDigId(), 
		pushState: false, 
		playTrack: true, 
		onGetSuccess: Intro.startIntro
	});

}

function loadPage( options ) {

	options.pushState = options.pushState || false;

	console.log( 'loadPage', options );

	Api.getDigs({

		page: options.pageId

	}, function( digs ) {

		if (options.onGetSuccess) {

			options.onGetSuccess();
		
		}

		Crates.loadDigs( digs, function() {

			Routing.changePage( options.pageId, options.digId, options.pushState );

		});

	}, function(data) {

		console.log( 'Error', data );

	});
}

function onPageChange( pageId ) {

	loadPage({
		pageId: pageId
	});

}

function onPrevPage() {

	loadPage({
		pageId: Routing.getCurrentPageId() - 1, 
		pushState: true
	});

}

function onNextPage() {

	loadPage({
		pageId: Routing.getCurrentPageId() + 1, 
		pushState: true
	});

}

function onListenDig() {

	var dig = Crates.getSelectedRecordData();

	Player.loadTrack( dig, true );
	Routing.changeDig( dig );
	Ui.updateTrackView( dig )

}

function onPrevTrack() {

	var dig = Player.getPrevTrack();

	Player.loadTrack( dig, true );
	Routing.changeDig( dig );
	Ui.updateTrackView( dig )
	
}

function onNextTrack() {
	
	var dig = Player.getNextTrack();

	Player.loadTrack( dig, true );
	Routing.changeDig( dig );
	Ui.updateTrackView( dig )
}

module.exports = {
	init: init,
	onPageChange: onPageChange,
	onPrevPage: onPrevPage,
	onNextPage: onNextPage,
	onListenDig: onListenDig,
	onPrevTrack: onPrevTrack,
	onNextTrack: onNextTrack
};
