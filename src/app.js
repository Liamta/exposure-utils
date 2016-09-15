/**
 * Index.js
 */

var ExposureUtils = require('./Utils');

document.addEventListener('DOMContentLoaded', function() {

	var $ = new ExposureUtils();

	var body = $.getElement('body');
	console.log(body);


});