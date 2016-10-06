/**
 * Utils JS
 * Javascript and DOM Utils
 *
 * @public
 * @class
 */
var Utils = function(element) {


    /**
     * General Util
     * For iterating over Arrays and array-like objects (NodeLists, HTML Collections etc)
     *
     * @public
     * @method each
     * @param {Array|NodeList|HTMLCollection} iterable
     * @param {Function} callback
     * @return void
     */
    Utils.each = function(iterable, callback) {

        for(var i = 0; i < iterable.length; i++) {
            if(callback(iterable[i], i)) break;
        }

    };


    /**
     * General Util
     * For iterating over an Object and retrieving the keys/values
     *
     * @public
     * @method forEach
     * @param {Object} obj
     * @param {Function} callback
     * @return void
     */
    Utils.forEach = function(obj, callback) {

        for(var key in obj) {
            if (obj.hasOwnProperty(key)) {

                var value = obj[key];

                if(callback(key, value)) break;
            }
        }

    };


    /**
     * General Util
     * Getting the distance between two objects of x and y positions
     *
     * @public
     * @method distanceBetween
     * @param {Object} objA
     * @param {Object} objB
     * @return {Number}
     */
    Utils.distanceBetween = function(objA, objB) {

        var diffX = objA.x - objB.x;
        var diffY = objA.y - objB.y;

        return Math.sqrt(diffX * diffX + diffY * diffY);

    };


	/**
     * DOM Util
     * Checking whether DOM Element is Node
     *
     * @public
     * @method isNode
     * @param {HTML Element} el  HTML Element
     * @return {Bool}
     */
    Utils.isNode = function(el) {

        return (
            typeof Node === 'object' ? el instanceof Node :
            el && typeof el === 'object' && typeof el.nodeType === 'number' && typeof el.nodeName === 'string'
        );

    };


    /**
     * DOM Util
     * Checking whether DOM Element is NodeList
     *
     * @public
     * @method isNodeList
     * @param {HTML Element} el  HTML Element
     * @return {Bool}
     */
    Utils.isNodeList = function(el) {

        return (
            typeof Node === 'object' ? el instanceof Node :
            el && typeof el === 'object' && typeof el.nodeType === 'number' && typeof el.nodeName === 'string'
        );

    };


    /**
     * DOM Util
     * Checking whether DOM Element is HTML Collection
     *
     * @public
     * @method isCollection
     * @param {HTML Element} el  HTML Element
     * @return function
     */
    Utils.isCollection = function(el) {

        return NodeList.prototype.isPrototypeOf(el);

    };
	

    /**
     * DOM Util
     * Appending class to DOM Element
     *
     * @public
     * @method addClass
	 * @param {HTMLElement} el  DOM Element
	 * @param {String} cls  CSS Class
	 * @return void
	 */
	Utils.addClass = function(el, cls) {

		if(Utils.containsClass(el, cls)) {
            return false;
        } else {
            var classes = el.className.split(' ');
            classes.push(cls);
            el.className = classes.join(' ');
        }

	};


    /**
     * DOM Util
     * Toggling class of a DOM Element
     *
     * @public
     * @method toggleClass
     * @param {HTMLElement} el  DOM Element
     * @param {String} cls  CSS Class
     * @return void
     */
    Utils.toggleClass = function(el, cls) {

        if(Utils.containsClass(el, cls)) {
            Utils.removeClass(el, cls);
        } else {
            Utils.addClass(el, cls);
        }

    };


	/**
	 * DOM Util
     * Removing class of a DOM Element
     *
     * @public
     * @method removeClass
	 * @param  {HTMLElement} el  DOM Element
	 * @param  {String} cls  CSS CLass
	 * @return void
	 */
	Utils.removeClass = function(el, cls) {

		var classes = el.className.split(' ');
        var count = classes.length;

        while (--count >= 0) {
            if (classes[count] === cls)
                classes.splice(count, 1);
        }

        el.className = classes.join(' ');

	};


	/**
	 * DOM Util
     * Checking if DOM Element contains a class
     *
     * @public
     * @method containsClass
	 * @param  {String} cls  CSS Class
	 * @return {Bool}
	 */
	Utils.containsClass = function(el, cls) {

        return (' ' + el.className + ' ').indexOf(' ' + cls + ' ') > -1;
        
    };


    /**
     * DOM Util
     * Short hand for obtaining DOM Elements.
     * 
     * '.example', if exists will return you a single DOM Element if it is singular
     * Or a HTML Collection is multiple classes.
     *
     * '#example', if exists will return you an ID'd DOM Element.
     *
     * @public
     * @method getElement
     * @param  {HTMLElement} el
     * @return {HTMLElement} element
     */
    Utils.getElement = function(el) {

        return Utils._validateElementString(el);

    };


    /**
     * DOM Util
     * Creating an element with the option of passing initial attributes to it.
     *
     * @todo Sanitize element attributes and style properties before appending to the element
     * 
     * @public
     * @method createElement
     * @param {HTMLElement} el
     * @param {Object} attr
     * @return {HTMLElement} element
     */
    Utils.createElement = function(el, attributes) {

        var element = Utils.isNode(document.createElement(el)) === true ? document.createElement(el) : false;

        if(attributes) {

            Utils.forEach(attributes, function(prop, val) {

                if(prop === 'style') Utils.style(element, val);
                    else element.setAttribute(prop, val);

            });            

        }

        return element === false ? console.warn('Couldn\'t create element', el) : element;

    };


    /**
     * DOM Util
     * Remove an element from the DOM
     * 
     * @public
     * @method removeElement
     * @param  {String} el
     * @return {HTMLElement} element
     */
    Utils.removeElement = function(el) {

        var element = Utils.getElement(el);
        var parent = element.parentElement;

        parent.removeChild(element);

        return element;

    };


    /**
     * DOM Util
     * Add HTML to element
     * 
     * @public
     * @method html
     * @param  {HTMLElement} el
     * @param {String} str
     * @return {HTMLElement} element
     */
    Utils.html = function(el, str) {

        var element;

        if(!Utils.isNode(el)) element = Utils.getElement(el);
            else element = el;

        element.innerHTML = str;

        return element;

    };


    /**
     * DOM Util
     * Adds styles to DOM Element
     * 
     * @param {String|HTMLElement} el
     * @param {Object} obj
     */
    Utils.style = function(el, obj) {

        var element = Utils._checkElement(el);
        var stylesObj = Utils._validateStyleObj(obj) ? obj : null;

        if(stylesObj) {
            
            Utils.forEach(stylesObj, function(styleName, styleValue) {
                element.style[styleName] = styleValue;
            });

        }

    };


    /**
     * Add multiple events to single DOM element
     * 
     * @param {HTMLElement} el
     * @param {String} evts
     * @param {Function} func
     */
    Utils.addEventListener = function(el, evts, func) {

        var evtsArray = evts.split(' ');
        
        Utils.each(evtsArray, function(evt, i) {
            el.addEventListener(evt, func);
        });

    };


    /**
     * AJAX Call wrapper
     *
     * @public
     * @function AJAX 
     * @param {String} url
     * @param {Function} successCallback
     * @param {Function} failCallback
     */
    Utils.AJAX = function(url, successCallback, failCallback) {

        var xhr = new XMLHttpRequest();

        xhr.onreadystatechange = function() {

            console.log([xhr]);

            if(xhr.readyState === 4) {
                successCallback(xhr.responseText);
            } else {
                failCallback(xhr.responseText);
            }

        };

        xhr.open('GET', url, true);


    };


    /**
     * Internal Util
     * Sanitize an object of CSS styles
     *
     * @private
     * @function validateStyleObj
     * @param {String} Property
     * @param {String} Value
     */
    Utils._validateStyleObj = function(prop, val) {

        var el = document.createElement('div');
        var _old = el.style = prop + ':' + val + ';';
        el.style = prop + ':' + val + ';';
        var _new = el.style = prop + ':' + val + ';';
        return (_old == _new);

    };


    /** 
     * Internal Util
     * Check what element we're dealing with and if it exists
     *
     * @private
     * @function validateElementString
     * @param {String} str
     */
	Utils._validateElementString = function(str) {

        var element;

        // Classes
        if(Utils._startsWith('.', str)) {

            var collection = document.querySelectorAll(str);
            
            if(collection.length > 0 && collection.length > 1) {
                element = collection;
            } else if(collection.length === 1) {
                element = collection[0];
            } else {
                Utils._invalidElement(str);
            }

        } else if(Utils._startsWith('#', str)) {

            var newStr = str.substring(1);
            element = document.getElementById(newStr);

            if(element === null || element === undefined) Utils._invalidElement(str);

        } else {

            var tagCollection = document.querySelectorAll(str);

            if(tagCollection.length > 0 && tagCollection.length > 1) {
                element = tagCollection;
            } else if(tagCollection.length === 1) {
                element = tagCollection[0];
            } else {
                Utils._invalidElement(str);
            }

            if(element === null || element === undefined) Utils._invalidElement(str);

        }

        return element;

    };


    /**
     * Internal Util
     * Checks whether what is being passed in is an element, or a string
     *
     * @private
     * @function checkElement
     * @param  {String|HTMLElement} el
     * @return {HTMLElement} element
     */
    Utils._checkElement = function(el) {

        var element;

        if(Utils.isNode(el)) element = el; 
            else element = Utils._validateElementString(el);

        return element;

    };


    /**
     * Internal Util
     * Call if invalid elemnt
     *
     * @private
     * @function invalidElement
     * @param {String} str
     * @return {Bool} false
     */
    Utils._invalidElement = function(str) {

        return console.warn('Element -', str, 'not found in DOM.');

    };


    /**
     * Internal Util
     * Cross browser solution to .startsWith()
     * 
     * @param {String} needle
     * @param {String} Haystack
     * @return {Bool}
     */
    Utils._startsWith = function(needle, haystack) {

        return (haystack.substr(0, needle.length) == needle);

    };


	/**
     * API
     * Returns Public Utils
     *
     * @return {Object} Public Utils
	 */
    return {
        forEach: Utils.forEach,
        each: Utils.each,
        distanceBetween: Utils.distanceBetween,
        isNode: Utils.isNode,
        isNodeList: Utils.isNodeList,
        isCollection: Utils.isCollection,
        addClass: Utils.addClass,
        removeClass: Utils.removeClass,
        toggleClass: Utils.toggleClass,
        containsClass: Utils.containsClass,
        getElement: Utils.getElement,
        createElement: Utils.createElement,
        removeElement: Utils.removeElement,
        AJAX: Utils.AJAX,
        addEventListener: Utils.addEventListener,
        style: Utils.style,
        html: Utils.html
    };

};

module.exports = Utils;