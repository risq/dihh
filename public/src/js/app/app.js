var App = (function() {

    function init() {

		

    	initCratedigger();

		Ui.init();

		
		Api.getDigs({}, function(digs) {

			cratedigger.loadRecords(digs, false);

		}, function(data) {

			console.log("fail", data);

		});
	
	}

	function initCratedigger() {

		cratedigger.init({

		    elements: {
		        rootContainerId     : 'cratedigger',
		        canvasContainerId   : 'cratedigger-canvas',
		        loadingContainerId  : 'cratedigger-loading',
		        infoContainerId     : 'cratedigger-info',
		        titleContainerId    : 'cratedigger-record-title',
		        artistContainerId   : 'cratedigger-record-artist',
		        coverContainerId    : 'cratedigger-record-cover'
		    },

		    infoPanelOpened: Ui.onInfoPanelOpened,

			infoPanelClosed: Ui.onInfoPanelClosed
		});

	}

	return {
        init: init
    };

})();