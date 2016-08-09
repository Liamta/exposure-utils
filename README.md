# Dom and Javascript Utilites
A lightweight, modern javascript utility node module, for simplifying some basic functions and providing a cross browser dom manipulation API.

____________________________________________________________

### Install

```Javascript
	// Might need to install with Admin privileges (sudo).
	npm install exposure-utils
```

____________________________________________________________

### Useage

Require the package and immediately invoke it to have access to the API.

```Javascript
	var utils = require('exposure-utils')();
```

Equally you can instantiate it with the ``` new ``` keyword. Here's an example.

```Javascript
    var Utils = require('exposure-utils');
    var $ = new Utils();
    
    var array = ['item 1', 'item 2', 'item 3'];
    $.each(array, function(item, index) {
        console.log(item, index);
    });
    
    /**
    Output -
    item 1, 0
    item 2, 1
    item 3, 2
    **/
```

### Browser Support
IE 9+

### API
API docs here, [API Reference](https://github.com/Liamta/exposure-utils/wiki/API-Reference)
