var Ui = (function() {

	var $bottomBar,
		$buttonPrev,
		$buttonShow,
		$buttonNext,
		$buttonPrevPage,
		$buttonNextPage,
		$buttonListen,
		$trackArtist,
        $trackTitle,

        curentTrackId;

    function init() {

		$bottomBar  = $('#bottom-bar');
		$buttonPrev = $bottomBar.find('.bottom-bar-prev-button');
		$buttonShow = $bottomBar.find('.bottom-bar-mid-button');
		$buttonNext = $bottomBar.find('.bottom-bar-next-button');

		$buttonPrevPage = $('.button-prev-page');
		$buttonNextPage = $('.button-next-page');

		$buttonListen = $( '#cratedigger-record-listen' );

		$trackArtist = $( '.track .track-artist' );
        $trackTitle = $( '.track .track-title' );



		$buttonPrev.on('click', cratedigger.selectPrevRecord);

		$buttonShow.on('click', cratedigger.flipSelectedRecord);

		$buttonNext.on('click', cratedigger.selectNextRecord);

		$buttonListen.on('click', function() {
			onButtonListenClick();
			return false;
		});

		$buttonPrevPage.on('click', function() {
			App.prevPage();
			return false;
		});

		$buttonNextPage.on('click', function() {
			App.nextPage();
			return false;
		});

	}

	function updateTrackView(trackData, playTrack) {

		console.log(trackData);

		if ( curentTrackId !== trackData.id ) {

			var trackArtists = trackData.artists.join( ',' );
			var trackFullTitle = trackArtists + ' - ' + trackData.title;

			curentTrackId = trackData.id;

			$trackArtist.text( trackArtists );
			$trackTitle.text( trackData.title );


			Comments.loadCommentsForTrack( trackData.id, trackFullTitle );

			if ( playTrack ) {

				Player.playTrack( trackData );

			}
		}
	}

	function onButtonListenClick( e ) {

        updateTrackView( cratedigger.getSelectedRecord().data, true );
        
    }

	function onInfoPanelOpened() {

		$bottomBar.addClass('closed');

	}

	function onInfoPanelClosed() {

		$bottomBar.removeClass('closed');
		
	}

	return {
        init: init,
        onInfoPanelOpened: onInfoPanelOpened,
		onInfoPanelClosed: onInfoPanelClosed
    };

})();