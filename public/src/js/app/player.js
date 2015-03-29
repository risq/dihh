var Player = (function() {

	var player;

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

	function playTrack(data) {

		console.log(data);
		player.loadVideoById(data.links.youtube);
		player.playVideo();

	}

	function onPlayerReady(event) {
		// event.target.playVideo();
	}


	function onPlayerStateChange(event) {
		console.log('onPlayerStateChange', event);
	}


	return {
        init: init,
        playTrack: playTrack
    };

})();
