$(document).on('ready', function(){

	$(".button-collapse").sideNav();

	window.client = io.connect(window.location.origin + "/");

});