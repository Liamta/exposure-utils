/**
 * Index.js
 */

var $ = require('./Utils')();

document.addEventListener('DOMContentLoaded', function() {

	var body = $.getElement('body');
	
	var test = $.createElement('img', {
		class: 'test',
		dataid: 0,
		style: {
			marginLeft: '50px',
			height: '500px',
			width: '500px',
			backgroundColor: 'grey'
		}
	});

	var data = $.AJAX('http://httpbin.org/get', function(res) {
		console.log('me is success');
	}, function(res) {
		console.log('failed');
	});

	body.appendChild(test);

});