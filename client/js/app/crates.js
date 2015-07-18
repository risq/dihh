var cratedigger = require('cratedigger.js');

function init(Ui) {

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

function loadDigs(digs, done) {

	cratedigger.loadRecords( digs, false, done);

}

function selectRecord( index ) {

	setTimeout(function() {

		cratedigger.selectRecord( index );
		
	}, 1500);

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

function getSelectedRecordData() {

	return cratedigger.getSelectedRecord().data;

}

function selectPrevRecord() {

	cratedigger.selectPrevRecord();

}

function showRecord() {

	if (cratedigger.getSelectedRecord()) {

		cratedigger.flipSelectedRecord();

	} else {

		cratedigger.selectNextRecord();
		
	}
}

function selectNextRecord() {

	cratedigger.selectNextRecord();

}


module.exports = {
	init: init,
	loadDigs: loadDigs,
	selectRecord: selectRecord,
	getRecordById: getRecordById,
	getSelectedRecordData: getSelectedRecordData,
	selectPrevRecord: selectPrevRecord,
	showRecord: showRecord,
	selectNextRecord: selectNextRecord
}