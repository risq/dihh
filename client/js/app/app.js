var Intro = require('./intro'),
	Ui = require('./ui'),
	Routing = require('./routing'),
	Player = require('./player'),
	Api = require('./api'),
	Nav = require('./nav'),
	Crates = require('./crates');

function init() {

	Crates.init();
	Ui.init({
		onPrevPage: Nav.onPrevPage,
		onNextPage: Nav.onNextPage,
		onListenDig: Nav.onListenDig,
		onPrevTrack: Nav.onPrevTrack,
		onNextTrack: Nav.onNextTrack
	});
	Player.init();
	Intro.init();
	Routing.init({
		onPageChange: Nav.onPageChange
	});
	Nav.init();

}

module.exports = {
    init: init
};