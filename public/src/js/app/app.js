var App = (function() {

    function init() {

		Routing.init();
		Ui.init();
		Player.init();

    	initCratedigger();

    	loadPage(Routing.getCurrentPage());
	
	}

	function initCratedigger() {

		cratedigger.init({

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

		    infoPanelOpened: Ui.onInfoPanelOpened,

			infoPanelClosed: Ui.onInfoPanelClosed
		});
	}

	function prevPage() {

		loadPage( Routing.getCurrentPage() - 1, true );

	}

	function nextPage() {

		loadPage( Routing.getCurrentPage() + 1, true );

	}

	function loadPage(page, pushState) {

		Api.getDigs({

			page: page

		}, function(digs) {

			cratedigger.loadRecords(digs, false);
			Routing.changePage(page, pushState);

		}, function(data) {

			console.log('Error', data);

		});
	}

	return {
        init: init,
        loadPage: loadPage,
        prevPage: prevPage,
        nextPage: nextPage
    };

})();