var Routing = require('./routing'),
	Player = require('./player'),
	Api = require('./api'),
	Crates = require('./crates'),
	Ui = require('./ui'),
	Intro = require('./intro');

function init() {

	loadPage(Routing.getCurrentPageId(), Routing.getCurrentDigId(), false, Intro.startIntro);

}

function loadPage( pageId, digId, pushState, done ) {

	Api.getDigs({

		page: pageId

	}, function( digs ) {

		if (done) {

			done();
		
		}

		console.log('loadPage')

		Crates.loadDigs( digs, function() {

			Routing.changePage( pageId, digId, pushState );

		});

	}, function(data) {

		console.log( 'Error', data );

	});
}

function onPageChange( pageId ) {

	loadPage( pageId );

}

function onPrevPage() {

	loadPage( Routing.getCurrentPageId() - 1, null, true );

}

function onNextPage() {

	loadPage( Routing.getCurrentPageId() + 1, null, true );

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
