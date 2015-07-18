var cratedigger = require('cratedigger.js'),

	Intro = require('./intro'),
	Ui = require('./ui'),
	Routing = require('./routing'),
	Player = require('./player'),
	Api = require('./api');

function init() {

	Intro.init();
	Ui.init({
		onPrevPage: onPrevPage,
		onNextPage: onNextPage,
		onListenDig: onListenDig,
		onPrevTrack: onButtonPrevTrack,
		onNextTrack: onButtonNextTrack
	});
	Routing.init();
	Player.init();

	initCratedigger();

	loadPage(Routing.getCurrentPageId(), Routing.getCurrentDigId(), false, Intro.startIntro);

}

function initCratedigger() {

	console.log(cratedigger)

	cratedigger.init({

		debug: false,
		postprocessing: false,

		sleeveMaskTexture: '/img/sleeve.png',
        crateTexture: '/img/wood.jpg',

	    elements: {
	        rootContainerId     : 'cratedigger',
	        canvasContainerId   : 'cratedigger-canvas',
	        loadingContainerId  : 'cratedigger-loading',
	        infoContainerId     : 'cratedigger-info',
	        titleContainerId    : 'cratedigger-record-title',
	        artistContainerId   : 'cratedigger-record-artist',
	        coverContainerId    : 'cratedigger-record-cover'
	    },

	    onInfoPanelOpened: Ui.onInfoPanelOpened,

		onInfoPanelClosed: Ui.onInfoPanelClosed
	});
}

function onPrevPage() {

	loadPage( Routing.getCurrentPageId() - 1, null, true );
	return false;

}

function onNextPage() {

	loadPage( Routing.getCurrentPageId() + 1, null, true );
	return false;

}

function loadPage( pageId, digId, pushState, done ) {

	Api.getDigs({

		page: pageId

	}, function( digs ) {

		if (done) {

			done();
		
		}

		cratedigger.loadRecords( digs, false, function() {

			Routing.changePage( pageId, digId, pushState );

		});

	}, function(data) {

		console.log( 'Error', data );

	});
}

function getRecordById( digId ) {

	var loadedRecords = cratedigger.getRecordsDataList(),
		digs = loadedRecords.slice(), 
		dig;

    while( dig = digs.pop() ) { // jshint ignore:line

        if ( dig._id === digId ) { 

        	return {
        		dig: dig,
        		index: digs.length
        	};
        }
    }

    return null;

}

function selectRecord( index ) {

	setTimeout(function() {

		cratedigger.selectRecord( index );
		
	}, 1500);

}

function onListenDig() {

	var dig = cratedigger.getSelectedRecord().data;

    Ui.updateTrackView( dig );
	Player.loadTrack( dig, true );

}

function onButtonPrevTrack() {

	var trackData = Player.getPrevTrack();

	Ui.updateTrackView( trackData );
	Player.loadTrack( trackData, true );
	
}

function onButtonNextTrack() {
	
	var trackData = Player.getNextTrack();

	Ui.updateTrackView( trackData );
	Player.loadTrack( trackData, true );
}

module.exports = {
    init: init,
    loadPage: loadPage,
    getRecordById: getRecordById,
    selectRecord: selectRecord
};