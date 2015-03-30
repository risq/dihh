var Routing = (function() {

	var currentPage = 0,
		currentDig = 0,
		$cratedigger;

    function init() {

    	$cratedigger = $('#cratedigger');

        currentPage = parseInt($cratedigger.attr('data-cratedigger-page'));
        
        window.history.replaceState({page: currentPage}, 'Page ' + currentPage, currentPage === 0 ? '/' : '/page/' + currentPage);
        window.onpopstate = onPopState;
	}

	function getCurrentPage() {

		return currentPage;

	}

	function changePage(page, pushState) {

		if (pushState) {

			var url = page === 0 ? '/' : '/page/' + page;
			window.history.pushState({page: page}, 'Page ' + page, url);

		}

		currentPage = page;
		$cratedigger.attr('data-cratedigger-page', page);

	}

	function onPopState(event) {

		if (event.state && event.state.page >= 0) {

			currentPage = event.state.page;
			App.loadPage(currentPage);
			
		}
	}

	return {
        init: init,
        changePage: changePage,
        getCurrentPage: getCurrentPage,
    };

})();