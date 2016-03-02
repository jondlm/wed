/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	var h = __webpack_require__(1);
	var React = __webpack_require__(3);
	var Topbar = __webpack_require__(4);
	var mount = __webpack_require__(5).mount;

	var Index = React.createClass({
	  render() {
	    return (
	      h('div', [
	        h(Topbar)
	      ])
	    );
	  }
	});

	mount(Index);

	// Support server side rendering
	module.exports = {
	  title: 'Mert',
	  component: Index
	};


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var parseTag = __webpack_require__(2);
	var React = __webpack_require__(3);

	module.exports = h;

	function h(componentOrTag, properties, children) {
	  // If a child array or text node are passed as the second argument, shift them
	  if (!children && isChildren(properties)) {
	    children = properties;
	    properties = {};
	  }

	  properties = properties || {};

	  // When a selector, parse the tag name and fill out the properties object
	  if (typeof componentOrTag === 'string') {
	    componentOrTag = parseTag(componentOrTag, properties);
	  }

	  // Create the element
	  var args = [componentOrTag, properties].concat(children);
	  return React.createElement.apply(React, args);
	}

	function isChildren(x) {
	  return typeof x === 'string' || typeof x === 'number' || Array.isArray(x);
	}


/***/ },
/* 2 */
/***/ function(module, exports) {

	var classIdSplit = /([\.#]?[a-zA-Z0-9_:-]+)/
	var notClassId = /^\.|#/

	module.exports = parseTag

	function parseTag(tag, props) {
	    if (!tag) {
	        return "div"
	    }

	    var noId = !("id" in props)

	    var tagParts = tag.split(classIdSplit)
	    var tagName = null

	    if (notClassId.test(tagParts[1])) {
	        tagName = "div"
	    }

	    var classes, part, type, i
	    for (i = 0; i < tagParts.length; i++) {
	        part = tagParts[i]

	        if (!part) {
	            continue
	        }

	        type = part.charAt(0)

	        if (!tagName) {
	            tagName = part
	        } else if (type === ".") {
	            classes = classes || []
	            classes.push(part.substring(1, part.length))
	        } else if (type === "#" && noId) {
	            props.id = part.substring(1, part.length)
	        }
	    }

	    if (classes) {
	        if (props.className) {
	            classes.push(props.className)
	        }

	        props.className = classes.join(" ")
	    }

	    return tagName ? tagName.toLowerCase() : "div"
	}


/***/ },
/* 3 */
/***/ function(module, exports) {

	module.exports = React;

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	var h = __webpack_require__(1);
	var React = __webpack_require__(3);

	var Index = React.createClass({
	  render() {
	    return (
	      h('div.Topbar', [
	        h('header.Topbar-content', [
	          'Wed',
	        ])
	      ])
	    );
	  }
	});

	module.exports = Index;


/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	var React = __webpack_require__(3);
	var ReactDOM = __webpack_require__(6);

	module.exports = {
	  mount: function(Component) {
	    // Support client side rendering
	    if (typeof document === 'object') {
	      ReactDOM.render(
	        React.createElement(Component),
	        document.querySelector('#react-mount') //eslint-ignore
	      );
	    }
	  }
	};


/***/ },
/* 6 */
/***/ function(module, exports) {

	module.exports = ReactDOM;

/***/ }
/******/ ]);