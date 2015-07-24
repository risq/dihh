var cratedigger = require('cratedigger.js'),
	EventEmitter = require('events').EventEmitter;

var player,
	playerReady = false,
	currentTrack = null,
	playlist = [],
	autoplay = true,
	emitter = new EventEmitter();

function init() {

	var tag = document.createElement('script');

	tag.src = "https://www.youtube.com/iframe_api";
	var firstScriptTag = document.getElementsByTagName('script')[0];
	firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

	window.onYouTubeIframeAPIReady = onYouTubeIframeAPIReady;

}

function onYouTubeIframeAPIReady() {

	player = new YT.Player('player', {
		height: '100%',
		width: '100%',
		playerVars: {
			autohide: 1,
			rel: 0,
			showinfo: 0,
			modestbranding: 1
		},
		events: {
			'onReady': onPlayerReady,
			'onStateChange': onPlayerStateChange
		}
	});
}

function loadTrack( trackData, play ) {

	if ( playerReady ) {

		player.cueVideoById( trackData.youtubeId );

		if( play ) {

			player.playVideo();
		}

		currentTrack = trackData;			
	}
}

function onPlayerReady( event ) {
	// event.target.playVideo();
	playerReady = true;
}


function onPlayerStateChange( event ) {
	if ( event.data === YT.PlayerState.ENDED ) {
		emitter.emit('track:end', currentTrack);
	}
}

function getPrevTrack() {

	var loadedTracks = cratedigger.getRecordsDataList(),
	    currentTrackIndex = loadedTracks.indexOf( currentTrack );

	if (currentTrackIndex < 0) {
	    
		// console.log( 'Track not found in current crate' );
		return loadedTracks[ 0 ];

	} else if ( currentTrackIndex >= loadedTracks.length - 1 ) {

		return loadedTracks[ 0 ];

	} else {

		return loadedTracks[ currentTrackIndex + 1 ];

	}
}

function getNextTrack() {

	var loadedTracks = cratedigger.getRecordsDataList(),
	    currentTrackIndex = loadedTracks.indexOf( currentTrack );

	if (currentTrackIndex < 0) {
	    
		// console.log( 'Track not found in current crate' );
		return loadedTracks[ loadedTracks.length - 1 ];

	} else if ( currentTrackIndex === 0 ) {

		return loadedTracks[ loadedTracks.length - 1 ];

	} else {

		return loadedTracks[ currentTrackIndex - 1 ];

	}
}

module.exports = {
    init: init,
    loadTrack: loadTrack,
    getNextTrack: getNextTrack,
    getPrevTrack: getPrevTrack,
    on: emitter.on.bind(emitter)
};

