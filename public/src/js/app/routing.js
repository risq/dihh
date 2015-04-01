var Routing = (function() {

	var currentPage = 0,
		currentDig = 0;

    function init() {

        currentPage = Ui.getCurrentPage();
        
        window.history.replaceState({page: currentPage}, 'Page ' + currentPage, getPageUrl(currentPage));
        window.onpopstate = onPopState;
	}

	function getCurrentPage() {

		return currentPage;

	}

	function changePage(page, pushState) {

		if (pushState) {

			var url = getPageUrl(page);
			window.history.pushState({page: page}, 'Page ' + page, url);

		}

		currentPage = page;
		Ui.onPageChange(page);

	}

	function onPopState(event) {

		if (event.state && event.state.page >= 1) {

			currentPage = event.state.page;
			App.loadPage(currentPage);
			
		}
	}

	function getPageUrl(page) {

		return page === 1 ? '/' : '/page/' + page;

	}

	return {
        init: init,
        changePage: changePage,
        getCurrentPage: getCurrentPage,
    };

})();