var Player = (function() {

	var player,
		playerReady = false,
		currentTrack = null,
		playlist = [];

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

	function playTrack( trackData ) {

		if ( playerReady ) {

			player.loadVideoById( trackData.youtubeId );
			player.playVideo();

			currentTrack = trackData;			
		}
	}

	function initPlaylist() {

		// playlist = cratedigger.getRecordsDataList();
		console.log( 'playlist', playlist );

	}

	function onPlayerReady( event ) {
		// event.target.playVideo();
		playerReady = true;
	}


	function onPlayerStateChange( event ) {
		// console.log('onPlayerStateChange', event);
	}

	function getPrevTrack() {

		var loadedTracks = cratedigger.getRecordsDataList(),
		    currentTrackIndex = loadedTracks.indexOf( currentTrack );

		if (currentTrackIndex < 0) {
		    
			console.log( 'Track not found in current crate' );
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
		    
			console.log( 'Track not found in current crate' );
			return loadedTracks[ loadedTracks.length - 1 ];

		} else if ( currentTrackIndex === 0 ) {

			return loadedTracks[ loadedTracks.length - 1 ];

		} else {

			return loadedTracks[ currentTrackIndex - 1 ];

		}
	}

	return {
        init: init,
        playTrack: playTrack,
        getNextTrack: getNextTrack,
        getPrevTrack: getPrevTrack,
    };

})();
