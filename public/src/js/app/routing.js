var Routing = (function() {

	var currentPage = 0,
		currentDig = 0;

    function init() {

        currentPage = Ui.getCurrentPage();
        
        window.history.replaceState({page: currentPage}, 'Page ' + currentPage, getPageUrl(currentPage));
        window.onpopstate = onPopState;
	}

	function changePage(page, pushState) {

		if (pushState) {

			var url = getPageUrl(page);
			window.history.pushState({page: page}, 'Page ' + page, url);

		}

		currentPage = page;
		Ui.onPageChange(page);

	}

	function changeDig(slug) {

		var url = getPageUrl(currentPage, slug);
		console.log('url', url);
		window.history.replaceState({page: currentPage}, 'Page ' + currentPage, url);

	}

	function onPopState(event) {

		if (event.state && event.state.page >= 1) {

			currentPage = event.state.page;
			App.loadPage(currentPage);
			
		}
	}

	function getPageUrl(page, digSlug) {

		return (page === 1 ? '/' : '/page/' + page) + ( digSlug ? 'digs/' + digSlug : '');

	}

	function getCurrentPage() {

		return currentPage;

	}

	return {
        init: init,
        changePage: changePage,
        changeDig: changeDig,
        getCurrentPage: getCurrentPage,
    };

})();