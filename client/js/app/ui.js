var $ = require('jquery');

var Comments = require('./comments');


var $cratedigger,
	$pageNumber,
	$bottomBar,
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

    curentTrackId,
    pagesCount,

    onPrevPage = function () {},
    onNextPage = function () {},
    onListenDig = function () {},
    onPrevTrack = function () {},
	onNextTrack = function () {};

function init(callbacks) {


	onPrevPage = callbacks.onPrevPage;
	onNextPage = callbacks.onNextPage;
	onListenDig = callbacks.onListenDig;
	onPrevTrack = callbacks.onPrevTrack;
	onNextTrack = callbacks.onNextTrack;

	$cratedigger = $('#cratedigger');
	$pageNumber = $('.page-number');

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

	$buttonShow.on('click', function() {

		if (cratedigger.getSelectedRecord()) {

			cratedigger.flipSelectedRecord();

		} else {

			cratedigger.selectNextRecord();
			
		}
	});

	$buttonNext.on('click', cratedigger.selectNextRecord);

	$buttonListen.on('click', function() {
		onButtonListenClick();
		return false;
	});

	$buttonPrevPage.on('click', onPrevPage);

	$buttonNextPage.on('click', onNextPage);

	$buttonPrevTrack.on( 'click', onButtonPrevTrackClick);

	$buttonNextTrack.on( 'click', onButtonNextTrackClick);

	pagesCount = getPagesCount();

}

function updateTrackView(trackData) {

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

	}
}

function onInfoPanelOpened() {

	$bottomBar.addClass('closed');

}

function onInfoPanelClosed() {

	$bottomBar.removeClass('closed');
	
}

function onButtonListenClick( e ) {

	onListenDig();
    
}

function onButtonPrevTrackClick() {

	onPrevTrack();

}

function onButtonNextTrackClick() {

	onNextTrack();

}

function onPageChange(pageId) {

	$cratedigger.attr('data-cratedigger-page', pageId);
	$pageNumber.text(pageId);

	if ( pageId === 1 ) {

		$buttonPrevPage.hide();

	} else if ( pageId === pagesCount ) {

		$buttonNextPage.hide();

	} else {

		$buttonPrevPage.show();
		$buttonNextPage.show();

	}
}

function updateTitle( dig, page ) {

	var title = 'Digging Into Hip Hop'

	if ( dig ) {

		title = dig.artist + ' - ' + dig.title + ' | ' + title;
		
	}

	if ( page && page > 1 ) {

		title = title + ' -¨Page ' + page;

	}

	document.title = title;
	
}

function getCurrentPageId() {
	return parseInt($cratedigger.attr('data-cratedigger-page'));
}

function getPagesCount() {
	return parseInt($cratedigger.attr('data-cratedigger-pages-count'));
}

function getCurrentDigId() {
	return $cratedigger.attr('data-cratedigger-record') || null;
}

module.exports =  {
    init: init,
    updateTrackView: updateTrackView,
    onInfoPanelOpened: onInfoPanelOpened,
	onInfoPanelClosed: onInfoPanelClosed,
	onPageChange: onPageChange,
	updateTitle: updateTitle,
	getCurrentPageId: getCurrentPageId,
	getPagesCount: getPagesCount,
	getCurrentDigId: getCurrentDigId,
};
