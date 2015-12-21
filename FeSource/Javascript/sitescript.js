/*---------------------------------------*\
	CUSTOM FUNCTIONS
\*---------------------------------------*/

/**
 * equa height
 */
jQuery.fn.setToMaxHeight = function () {
	return this.height(Math.max.apply(this, $.map(this, function (e) {
		return $(e).height()
	})));
};

/*---------------------------------------*\
	Avoid Error Function (no global scope)
\*---------------------------------------*/
function CpsItAvoidErrors() {

	/**
	 * "Global" vars
	 */
	var $document = $('document'),
		$body = $('body'),
		$window = $(window);

	/**
	 * EqualHeights triggering
	 */
	if ($(".equal-height").length) {
		jQuery('.equal-height').setToMaxHeight();
	}

	/**
	 * Plugin Usage (init plugin here)
	 */

}

/*---------------------------------------*\
	Dom Ready
\*---------------------------------------*/
$(document).ready(function () {
	/**
	 * BEGIN - debug the time spend for javascript to execute
	 */
	//console.time('debugTimer');

	CpsItAvoidErrors();

	/**
	 * END - debug the time spend for javascript to execute
	 */
	//console.timeEnd('debugTimer');
});