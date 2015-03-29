var Ui = (function() {

	var $bottomBar,
		$buttonPrev,
		$buttonShow,
		$buttonNext,
		$buttonPrevPage,
		$buttonNextPage;

    function init() {

		$bottomBar  = $('#bottom-bar');
		$buttonPrev = $bottomBar.find('.bottom-bar-prev-button');
		$buttonShow = $bottomBar.find('.bottom-bar-mid-button');
		$buttonNext = $bottomBar.find('.bottom-bar-next-button');

		$buttonPrevPage = $('.button-prev-page');
		$buttonNextPage = $('.button-next-page');

		$buttonPrev.on('click', cratedigger.selectPrevRecord);

		$buttonShow.on('click', cratedigger.flipSelectedRecord);

		$buttonNext.on('click', cratedigger.selectNextRecord);

		$buttonPrevPage.on('click', function() {
			App.prevPage();
			return false;
		});

		$buttonNextPage.on('click', function() {
			App.nextPage();
			return false;
		});

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