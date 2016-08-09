/**
 * Index.js
 */

var ExposureUtils = require('./Utils');

document.addEventListener('DOMContentLoaded', function() {

	var $ = new ExposureUtils();

	var dom = document.querySelectorAll('.test');
	var arr = [5, 3, 2, 8];	
	var obj = {
		prop1: 'Property 1',
		prop2: 'Property 2',
		prop3: {
			'prop 3.1': 'Property 3.1'
		}
	};

	var test = $.el('.test');
	var test2 = $.el('#test2');
	var test3 = $.el('[data-test]');

	$.removeClass(test, 'testing');


});