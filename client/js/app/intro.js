var $ = require('jquery'),
	Vivus = require('vivus');

var $intro,

	vivus,
	introEnded;

function init() {

	$intro = $('.intro');

}

function startIntro() {

	introEnded = false;

	setTimeout(createVivus, 1000);

	setTimeout(function() {

		// Fallback
		onIntroEnd();

	}, 15000);
}

function createVivus() {

	vivus = new Vivus('intro-svg', {
		file: '/img/intro.svg',
	    type: 'delayed',
	    duration: 250,
        start: 'autostart'
	}, onIntroEnd);

}

function onIntroEnd() {

	if (!introEnded) {

		introEnded = true;

		setTimeout(function() {

			$intro.addClass('intro-hidden');

			setTimeout(function() {

				$intro.remove();

			}, 1250);

		}, 2000);
	}
}

module.exports = {
    init: init,
    startIntro: startIntro
};
