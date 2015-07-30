var Routing = require('./routing'),
	Player = require('./player'),
	Api = require('./api'),
	Crates = require('./crates'),
	Ui = require('./ui'),
	Intro = require('./intro');

function init() {

	loadPage({
		pageId: Routing.getCurrentPageId(),
		digId: Routing.getCurrentDigId(),
		pushState: false,
		playTrack: true,
		onGetSuccess: Intro.startIntro
	});

	Ui.on('page:prev', onPrevPage);
	Ui.on('page:next', onNextPage);
	Ui.on('dig:listen', onListenDig);
	Ui.on('track:prev', onPrevTrack);
	Ui.on('track:next', onNextTrack);

	Player.on('track:end', onTrackEnd);

	Crates.on('infoPanel:open', onInfoPanelOpen);
	Crates.on('infoPanel:close', onInfoPanelClose);
}

function loadPage( options ) {

	Api.getDigs({

		page: options.pageId

	}, function( digs ) {

		if (options.onGetSuccess) {

			options.onGetSuccess();

		}

		Crates.loadDigs( digs, function() {

			Routing.changePage( options.pageId, options.digId, options.pushState );

			if (options.playTrack && options.digId) {

				var record = Crates.getRecordById(options.digId);

				if (record.dig) {

					Player.loadTrack( record.dig, false );

				}
			}
		});

	}, function(data) {

		console.log( 'Error', data );

	});
}

function onPageChange( pageId ) {

	loadPage({
		pageId: pageId
	});

}

function onPrevPage() {

	loadPage({
		pageId: Routing.getCurrentPageId() - 1,
		pushState: true
	});

}

function onNextPage() {

	loadPage({
		pageId: Routing.getCurrentPageId() + 1,
		pushState: true
	});

}

function onListenDig() {

	var dig = Crates.getSelectedRecordData();

	Player.loadTrack( dig, true );
	Routing.changeDig( dig );
	Ui.updateTrackView( dig );
	Crates.flipBackSelectedRecord();

}

function onPrevTrack() {

	var dig = Player.getPrevTrack();

	Player.loadTrack( dig, true );
	Routing.changeDig( dig );
	Ui.updateTrackView( dig );

}

function onNextTrack() {

	var dig = Player.getNextTrack();

	Player.loadTrack( dig, true );
	Routing.changeDig( dig );
	Ui.updateTrackView( dig );
}

function onTrackEnd() {

	if (Ui.getAutoplay()) {
		setTimeout(onNextTrack, 2000);
	}

}

function onInfoPanelOpen() {
	Ui.fillInfoPanel(Crates.getSelectedRecordData());
	Ui.hideBottomBar();
	Ui.hideTrackPanel();

}
function onInfoPanelClose() {

	Ui.showBottomBar();

}

module.exports = {
	init: init,
	onPageChange: onPageChange,
	onPrevPage: onPrevPage,
	onNextPage: onNextPage,
	onListenDig: onListenDig,
	onPrevTrack: onPrevTrack,
	onNextTrack: onNextTrack
};
