(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
/**
 * Utils JS
 * Javascript and DOM Utils
 *
 * @public
 * @class
 */

var Utils = function() {

    'use strict';

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

                if(callback(key, value)) {
                    break;
                }
            }
        }

    };


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
            if(callback(iterable[i], i)) {
                break;
            }
        }

    };


	/**
     * DOM Util
     * Checking whether DOM Element is Node
     *
     * @public
     * @method isNode
     * @param {HTML Element} el  HTML Element
     * @return bool
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
     * @return bool
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

            if (classes[count] === cls) {
                classes.splice(count, 1);
            }

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
	 * @return bool
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
     * @method el
     * @param  {HTMLElement} el
     * @return {HTMLElement}
     */
    Utils.getEl = function(el) {

        var element = Utils._validateElementString(el);
        return element;

    };


    /**
     * DOM Util
     * Creating an element wit hthe option of passing
     * initial attributes to it.
     *
     * @todo Sanitize element attributes and style properties before appending to the element
     * 
     * @public
     * @method createEl
     * @param {HTMLElement} el
     * @param {Object} attr
     */
    Utils.createEl = function(el, attributes) {

        var element = Utils.isNode(document.createElement(el)) === true ? document.createElement(el) : false;

        if(attributes) {

            Utils.forEach(attributes, function(prop, val) {
                
                element.setAttribute(prop, val);

            });            

        }

        return element;

    };


    /**
     * Internal Util
     * Make sure our styles are valid
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
        if(str.startsWith('.')) {
            
            var collection = document.querySelectorAll(str);
            
            if(collection.length > 0 && collection.length > 1) {
                element = collection;
            } else if(collection.length === 1) {
                element = collection[0];
            } else {
                Utils._invalidElement(str);
            }

        } else if(str.startsWith('#')) {

            var newStr = str.substring(1);
            element = document.getElementById(newStr);

            if(element === null || element === undefined) {
                Utils._invalidElement(str);
            }

        } else if(str.startsWith('[') && str.endsWith(']')) {

            var dataCollection = document.querySelectorAll(str);

            if(dataCollection.length > 0 && dataCollection.length > 1) {
                element = dataCollection;
            } else if(dataCollection.length === 1) {
                element = dataCollection[0];
            } else {
                Utils._invalidElement(str);
            }

        } else {

            var tagCollection = document.querySelectorAll(str);

            if(tagCollection.length > 0 && tagCollection.length > 1) {
                element = tagCollection;
            } else if(tagCollection.length === 1) {
                element = tagCollection[0];
            } else {
                Utils._invalidElement(str);
            }

            if(element === null || element === undefined) {
                Utils._invalidElement(str);
            }

        }

        return element;

    };


    /**
     * Internal Util
     * Call if invalid elemnt
     *
     * @private
     * @function invalidElement
     * @param {String} str
     * @return void
     */
    Utils._invalidElement = function(str) {

        console.warn('Utils.el (', str, 'not found in DOM )');
        return false;

    };


	/**
     * API
     * 
	 * @description Return Utils
	 */
    return {
        forEach: Utils.forEach,
        each: Utils.each,
        isNode: Utils.isNode,
        isNodeList: Utils.isNodeList,
        isCollection: Utils.isCollection,
        addClass: Utils.addClass,
        removeClass: Utils.removeClass,
        toggleClass: Utils.toggleClass,
        containsClass: Utils.containsClass,
        getEl: Utils.getEl,
        createEl: Utils.createEl
    };

};

module.exports = Utils;
},{}],2:[function(require,module,exports){
/**
 * Index.js
 */

var ExposureUtils = require('./Utils');

document.addEventListener('DOMContentLoaded', function() {

	var $ = new ExposureUtils();

});
},{"./Utils":1}]},{},[2])