(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["AccessibleSubmenu"] = factory();
	else
		root["AccessibleSubmenu"] = factory();
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _AccessibleSubmenu = __webpack_require__(1);

var _AccessibleSubmenu2 = _interopRequireDefault(_AccessibleSubmenu);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Main export.
 */
module.exports = _AccessibleSubmenu2.default;

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); // expandableMenus.js


var _randomId = __webpack_require__(2);

var _randomId2 = _interopRequireDefault(_randomId);

var _extend = __webpack_require__(3);

var _extend2 = _interopRequireDefault(_extend);

var _dom = __webpack_require__(4);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

// keyboard keyCodes
var keys = { tab: 9, enter: 13, esc: 27, space: 32 };

/**
 * Controls Expandable Menus
 *
 * MIND Patterns defines these as "Fake Menus" and we follow the rules here
 * @see https://goo.gl/PU5oiP
 */

var AccessibleSubmenu = function () {
  /**
   * Constructor
   *
   * @param {HTMLLIElement} el The element containing the button and submenu
   */
  function AccessibleSubmenu(el, opts) {
    _classCallCheck(this, AccessibleSubmenu);

    var defaults = {
      // the css seelctor for the button
      buttonSelector: '.js-submenu-expand',

      // the submenu menu
      submenuSelector: '.js-submenu',

      // this class will be applied to the root element when submenu is open
      stylingClass: 'js-submenu-expanded',

      // apple aria-current="page" to links that point to the current page
      applyAriaCurrent: true,

      // whether or not to close on tab out
      closeOnTabOut: true,

      // focus the first link when submenu opens
      focusFirstLink: true,

      // onClose callback
      onClose: null,

      // onOpen callback
      onOpen: null
    };

    // merge options
    this.options = (0, _extend2.default)(defaults, opts, true);

    this.dom = {
      el: el,
      button: el.querySelector(this.options.buttonSelector),
      submenu: el.querySelector(this.options.submenuSelector)
    };

    // make sure we have everything we need
    if (el && this.dom.button && this.dom.submenu) {
      // build some extra dom stuff
      this.build();

      // bind events
      this.bindEvents();
    }
  }

  /**
   * Handles linking the button and submenu with ID and aria attribute
   */


  _createClass(AccessibleSubmenu, [{
    key: 'build',
    value: function build() {
      // If you require a fake menu that is opened by hovering on a link, rather
      // than clicking on a button, then append a stealth button immediately after
      // the anchor tag. This button will appear, and receive focus, as soon as the
      // user tabs past the hyperlink.
      // connect the button to the submenu
      // to the sub menu with the aria attributes and IDs
      // create unique ID
      this.id = this.dom.submenu.id || this.generateUniqueID();
      if (!this.dom.button.getAttribute('aria-expanded')) {
        this.dom.button.setAttribute('aria-expanded', false);
      }
      if (!this.dom.submenu.id) {
        this.dom.submenu.id = this.id;
      }
      this.dom.submenu.role = 'navigation';
    }

    /**
     * Clicking and hitting keys on the keyboard are handled here :)
     */

  }, {
    key: 'bindEvents',
    value: function bindEvents() {
      var _this = this;

      // Click / ENTER on button will open submenu
      this.dom.button.addEventListener('click', this.handleExpandClick.bind(this));

      // SPACEBAR on button will open submenu
      this.dom.button.addEventListener('keyup', function (event) {
        if (event.keyCode === keys.space) {
          _this.toggleOpenClose();
        }
      });

      // ESC will close the submenu and return focus to the button.
      document.addEventListener('keyup', function (event) {
        if (event.keyCode === keys.esc) {
          if (_this.isExpanded()) {
            _this.close();
            _this.dom.button.focus();
          }
        }
      });
    }

    /**
     * Blur event handler
     * Tabbing out of the list should close the list.
     */

  }, {
    key: 'handleBlur',
    value: function handleBlur(event) {
      if (event.keyCode === keys.tab) {
        if ((0, _dom.closest)('' + this.options.submenuSelector, document.activeElement) !== this.dom.submenu) {
          this.close();
        }
      }
    }

    /**
     * This function should be the event handler for a click on the .js-expand element.
     * It will toggle the display of the sub menu.
     */

  }, {
    key: 'handleExpandClick',
    value: function handleExpandClick(event) {
      event.stopPropagation();
      event.preventDefault();
      this.toggleOpenClose();
    }

    /**
     * Toggles the open / closed state. Useful for a switch.
     */

  }, {
    key: 'toggleOpenClose',
    value: function toggleOpenClose() {
      if (this.isExpanded()) {
        this.close();
      } else {
        this.open();
      }
    }
  }, {
    key: 'open',
    value: function open() {
      this.dom.button.setAttribute('aria-expanded', true);
      // The aria-controls attribute should only be present when aria-expanded state is true.
      this.dom.button.setAttribute('aria-controls', this.id);
      // focus first available link element
      if (this.options.focusFirstLink) {
        var firstLink = this.dom.submenu.querySelector('a');
        if (firstLink) {
          firstLink.focus();
        }
      }

      // Add styling class when opened
      this.dom.el.classList.add(this.options.stylingClass);

      // TABBING out of submenu will close submenu.
      if (this.options.closeOnTabOut) {
        document.addEventListener('keyup', this.handleBlur.bind(this));
      }

      // callback if provided
      if (typeof this.options.onOpen === 'function') {
        this.options.onOpen(this);
      }
    }
  }, {
    key: 'close',
    value: function close() {
      this.dom.button.setAttribute('aria-expanded', false);
      this.dom.button.removeAttribute('aria-controls');
      this.dom.el.classList.remove(this.options.stylingClass);

      if (this.options.closeOnTabOut) {
        document.removeEventListener('keyup', this.handleBlur.bind(this));
      }

      // callback if provided
      if (typeof this.options.onClose === 'function') {
        this.options.onClose(this);
      }
    }

    /**
     * Generate unique menu id (not already used on page)
     */

  }, {
    key: 'generateUniqueID',
    value: function generateUniqueID() {
      var id = 'js-submenu-' + (0, _randomId2.default)(6, 0);
      if (document.getElementById(id)) {
        id = this.generateUniqueID();
      }
      return id;
    }

    /**
     * Check the expanded status
     */

  }, {
    key: 'isExpanded',
    value: function isExpanded() {
      return this.dom.button.getAttribute('aria-expanded') === 'true';
    }

    // @todo fill out

  }, {
    key: 'destroy',
    value: function destroy() {
      // unbind all event handlers
      // remove any added functionality?
    }
  }]);

  return AccessibleSubmenu;
}();

exports.default = AccessibleSubmenu;

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

(function(){
	var randomID = function(len,pattern){
		var possibilities = ["abcdefghijklmnopqrstuvwxyz","ABCDEFGHIJKLMNOPQRSTUVWXYZ", "0123456789", "~!@#$%^&()_+-={}[];\',"];
		var chars = "";

		var pattern = pattern ? pattern : "aA0";
		pattern.split('').forEach(function(a){
			if(!isNaN(parseInt(a))){
				chars += possibilities[2];
			}else if(/[a-z]/.test(a)){
				chars += possibilities[0];
			}else if(/[A-Z]/.test(a)){
				chars += possibilities[1];
			}else{
				chars += possibilities[3];
			}
		});
		
		var len = len ? len : 30;

		var result = '';

		while(len--){ 
			result += chars.charAt(Math.floor(Math.random() * chars.length)); 
		};

		return result;
	};

	if(true){
		module.exports = randomID;
	} else {
		window["randomID"] = randomID;
	};

})();

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; /**
                                                                                                                                                                                                                                                                               * Extend objects
                                                                                                                                                                                                                                                                               */


exports.default = function (to, from, overwrite) {
  var prop, hasProp;
  for (prop in from) {
    hasProp = to[prop] !== undefined;
    if (hasProp && _typeof(from[prop]) === 'object' && from[prop] !== null && from[prop].nodeName === undefined) {
      if (isDate(from[prop])) {
        if (overwrite) {
          to[prop] = new Date(from[prop].getTime());
        }
      } else if (isArray(from[prop])) {
        if (overwrite) {
          to[prop] = from[prop].slice(0);
        }
      } else {
        to[prop] = extend({}, from[prop], overwrite);
      }
    } else if (overwrite || !hasProp) {
      to[prop] = from[prop];
    }
  }
  return to;
};

;

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.closest = closest;
// dom related utility functions

/* eslint-disable */

/**
 * Given a DOM node and CSS selector, this function looks up the tree until it
 * finds another DOM node that matches the provided CSS selector.
 *
 * Modified polyfill for Element.closest found on MDN
 * https://goo.gl/8VF5W1
 *
 * @param {String} CSS selector
 * @param {HTMLElement} el Element to search relative from
 */
function closest(selector, el) {
  var matches = document.querySelectorAll(selector),
      i = void 0;
  do {
    i = matches.length;
    while (--i >= 0 && matches.item(i) !== el) {};
  } while (i < 0 && (el = el.parentElement));
  return el;
}

/***/ })
/******/ ]);
});