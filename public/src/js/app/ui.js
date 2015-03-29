var Ui = (function() {

	var $bottomBar;
	var $buttonPrev;
	var $buttonShow;
	var $buttonNext;

    function init() {

		$bottomBar  = $('#bottom-bar');
		$buttonPrev = $bottomBar.find('.bottom-bar-prev-button');
		$buttonShow = $bottomBar.find('.bottom-bar-mid-button');
		$buttonNext = $bottomBar.find('.bottom-bar-next-button');

		$buttonPrev.on('click', cratedigger.selectPrevRecord);

		$buttonShow.on('click', cratedigger.flipSelectedRecord);

		$buttonNext.on('click', cratedigger.selectNextRecord);

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