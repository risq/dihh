var Intro = require('./intro'),
	Ui = require('./ui'),
	Routing = require('./routing'),
	Player = require('./player'),
	Api = require('./api'),
	Nav = require('./nav'),
	Crates = require('./crates');

function init() {

	Ui.init();
	Crates.init(Ui);
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