var Api = (function() {

    function init() {
        $.ajaxSetup({ cache: false });
	}

	function getDigs(done) {
		return $.getJSON('/digs');
	}

	return {
        init: init,
        getDigs: getDigs
    };

})();