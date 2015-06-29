var App = (function() {

    function init() {

		Ui.init();
		Routing.init();
		Player.init();

    	initCratedigger();

    	loadPage(Routing.getCurrentPageId(), Routing.getCurrentDigId(), false, startIntro);
	
	}

	function initCratedigger() {

		cratedigger.init({

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

	function prevPage() {

		loadPage( Routing.getCurrentPageId() - 1, null, true );

	}

	function nextPage() {

		loadPage( Routing.getCurrentPageId() + 1, null, true );

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

			} );

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

	function startIntro() {

		setTimeout(function() {

			new Vivus('intro-svg', {
				file: '/img/intro.svg',
			    type: 'delayed',
			    duration: 250,
		        start: 'autostart'
			}, onIntroEnd);

		}, 1000);
	}

	function onIntroEnd() {

		setTimeout(function() {

			$('.intro').addClass('intro-hidden');

			setTimeout(function() {

				$('.intro').remove();

			}, 1250);

		}, 2000);
	}

	return {
        init: init,
        loadPage: loadPage,
        prevPage: prevPage,
        nextPage: nextPage,
        getRecordById: getRecordById,
        selectRecord: selectRecord
    };

})();