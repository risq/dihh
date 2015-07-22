var Ui = require('./ui'),
	Crates = require('./crates');


var currentPageId = 0,
	currentDigId = null,
	currentDig,

	events;

function init(callbacks) {

	events = callbacks;

    currentPageId = Ui.getCurrentPageId();
    currentDigId  = Ui.getCurrentDigId();

    // window.history.replaceState({page: currentPageId}, 'Page ' + currentPageId, getPageUrl(currentPageId));
    window.onpopstate = onPopState;
}

function changePage(pageId, digId, pushState) {

	var record = digId ? Crates.getRecordById( digId ) : null,
		digSlug = record ? record.dig.slug : null;

	if (pushState) {

		var url = getPageUrl(pageId, digSlug);
		window.history.pushState({page: pageId}, 'Page ' + pageId, url);

	} else {

		var url = getPageUrl(pageId, digSlug);
		window.history.replaceState({page: pageId}, 'Page ' + pageId, url);

	}

	if ( record ) {

		Ui.updateTrackView(record.dig);
		Crates.selectRecord(record.index);
	}

	// If no record is passed, get current record
	currentRecord = record ? record.dig : currentDig;

	Ui.updateTitle( currentRecord, pageId );

	currentPageId = pageId;
	Ui.onPageChange(pageId);

}

function changeDig( dig ) {

	var url = getPageUrl(currentPageId, dig.slug);

	currentDig = dig;
	window.history.replaceState({page: currentPageId}, 'Page ' + currentPageId, url);
	Ui.updateTitle( dig, currentPageId );

}

function onPopState(event) {

	if (event.state && event.state.page >= 1) {

		currentPageId = event.state.page;
		events.onPageChange(currentPageId);
		
	}
}

function getPageUrl(page, digSlug) {

	return (page === 1 ? '/' : '/page/' + page + '/' ) + ( digSlug ? 'digs/' + digSlug : '');

}

function getCurrentPageId() {

	return currentPageId;

}

function getCurrentDigId() {

	return currentDigId;

}

module.exports = {
    init: init,
    changePage: changePage,
    changeDig: changeDig,
    getCurrentPageId: getCurrentPageId,
    getCurrentDigId: getCurrentDigId,
};