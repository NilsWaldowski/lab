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

	// async JS is fully loaded
	$('body').addClass('js-loaded');

	// used for ajax content call and transition effect
	$('header').on('click', function() {
		//$('body').addClass('js-page-change');
	});


	/*
	var siteUrl = 'http://'+(document.location.hostname||document.location.host);

	$(document).delegate('a[href^="/"],a[href^="'+siteUrl+'"]', "click", function(e) {

		e.preventDefault();
		//History.pushState({}, "", this.pathname);
		console.log(siteUrl);

	});
	*/

	var siteUrl = 'http://'+(document.location.hostname||document.location.host);

	// Make sure that all clicked links that link to your internal website
	// don't just reload the page but execute a History.pushState call
	$(document).delegate('a.g-ajax', "click", function(e) {
	//$(document).delegate('a[href^="/"],a[href^="'+siteUrl+'"]', "click", function(e) {
		e.preventDefault();
		History.pushState({}, "", this.pathname);
	});


	// Catch all History stateChange events
	History.Adapter.bind(window, 'statechange', function(){
		var State = History.getState();

		// Load the new state's URL via an Ajax Call
		$.get(State.url, function(data){
			// Replace the "<title>" tag's content
			document.title = $(data).find("title").text();

			console.log($(data));

			// Replace the content of the main container (.content)
			// If you're using another div, you should change the selector
			$('.g-main-content').html($(data));
			$('.g-main-content').html('test');

			// If you're using Google analytics, make sure the pageview is registered!
			//_gaq.push(['_trackPageview', State.url]);
		});
	});


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