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
        $trackYear,
        $trackLabel,
        $trackDescription,
        $trackLinks,
        $buttonPrevTrack,
        $buttonNextTrack,

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
        $trackYear = $( '.track .track-year' );
        $trackLabel = $( '.track .track-label' );
        $trackDescription = $( '.track .track-description' );
        $trackLinks = $( '.track .track-links' );

		$buttonPrevTrack = $( '.button-prev-track' );
        $buttonNextTrack = $( '.button-next-track' );



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

		$buttonPrevTrack.on( 'click', onButtonPrevTrackClick);

		$buttonNextTrack.on( 'click', onButtonNextTrackClick);

	}

	function updateTrackView(trackData, playTrack) {

		if ( curentTrackId !== trackData._id ) {

			var trackArtists = trackData.artists.join( ',' );
			var trackFullTitle = trackArtists + ' - ' + trackData.title;

			curentTrackId = trackData._id;

			$trackArtist.text( trackArtists );
			$trackTitle.text( trackData.title );
			$trackYear.text( trackData.year );
			$trackLabel.text( trackData.label || '' );
			$trackDescription.text( trackData.description || '' );

			$trackLinks.empty();

			for ( var link in trackData.links ) {

            	if ( trackData.links.hasOwnProperty( link ) ) {

            		$trackLinks.append('<a href="' + trackData.links[link] + '" class="button button-black button-small" target="_blank">' + link + '</a>');

            	}
            }

			Comments.loadCommentsForTrack( trackData._id, trackFullTitle );

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

	function onButtonPrevTrackClick() {

		updateTrackView( Player.getPrevTrack(), true);

	}

	function onButtonNextTrackClick() {

		updateTrackView( Player.getNextTrack(), true);

	}



	return {
        init: init,
        onInfoPanelOpened: onInfoPanelOpened,
		onInfoPanelClosed: onInfoPanelClosed
    };

})();