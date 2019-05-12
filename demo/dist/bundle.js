/******/ (function(modules) { // webpackBootstrap
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
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
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
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "../src/engine/mixins.js":
/*!*******************************!*\
  !*** ../src/engine/mixins.js ***!
  \*******************************/
/*! exports provided: addImage, addMovement */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"addImage\", function() { return addImage; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"addMovement\", function() { return addMovement; });\nfunction addImage(image, width, height) {\n  this.image = image;\n  this.width = width || 0;\n  this.height = height || 0;\n\n  this.updateImage = function (world) {\n    world.ctx.drawImage(this.image, this.x, this.y, this.width, this.height);\n  }\n\n  this.updaters.push(this.updateImage.bind(this));\n}\n  \nfunction addMovement() {\n  this.direction = null;\n  this.speed = 0;\n  this.easeInValue = 0;\n\n  this.move = function (direction, speed, options) {\n    this.options = options || {};\n    this.direction = direction;\n\n    if (speed !== undefined && speed !== null) {\n      this.speed = speed;\n    }\n  }\n  this.stop = function () {\n    this.direction = null;\n    this.speed = 0;\n    this.easeInValue = 0;\n  }\n  this.updateMovement = function () {\n    if (Number.isInteger(this.direction)) {\n      if (this.options.easeIn && this.easeInValue < 10) {\n        this.easeInValue += 1;\n      }\n\n      if (this.direction === 0) {\n        this.y = this.y - this.easeInValue - this.speed;\n      }\n      if (this.direction === 90) {\n        this.x = this.x + this.easeInValue + this.speed;\n      }\n      if (this.direction === 180) {\n        this.y = this.y + this.easeInValue + this.speed;\n      }\n      if (this.direction === 270) {\n        this.x = this.x - this.easeInValue - this.speed;\n      }\n    }\n  }\n  this.updaters.push(this.updateMovement.bind(this));\n}\n\n//# sourceURL=webpack:///../src/engine/mixins.js?");

/***/ }),

/***/ "../src/engine/objects.js":
/*!********************************!*\
  !*** ../src/engine/objects.js ***!
  \********************************/
/*! exports provided: GameObject, ImageObject */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"GameObject\", function() { return GameObject; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"ImageObject\", function() { return ImageObject; });\n/* harmony import */ var _mixins__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./mixins */ \"../src/engine/mixins.js\");\n\n\nclass GameObject {\n  constructor (x, y) {\n    this.x = x || 0;\n    this.y = y || 0;\n    this.updaters = [];\n  }\n\n  update(world) {\n    this.updaters.forEach(updater => updater(world, this));\n  }\n}\n\nclass ImageObject extends GameObject {\n  constructor(image, width, height) {\n    super();\n    \n    _mixins__WEBPACK_IMPORTED_MODULE_0__[\"addMovement\"].bind(this)();\n    _mixins__WEBPACK_IMPORTED_MODULE_0__[\"addImage\"].bind(this)(image, width, height);\n\n    // this.image = image;\n    // this.width = width;\n    // this.height = height;\n    // this.updaters.push(this.updateImage.bind(this));\n  }\n\n  // updateImage (world) {\n  //   world.ctx.drawImage(this.image, this.x, this.y, this.width, this.height);\n  // }\n}\n\n\n\n//# sourceURL=webpack:///../src/engine/objects.js?");

/***/ }),

/***/ "../src/engine/utils.js":
/*!******************************!*\
  !*** ../src/engine/utils.js ***!
  \******************************/
/*! exports provided: keyCodes */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"keyCodes\", function() { return keyCodes; });\nconst keyCodes = {\n    backspace: 8,\n    tab: 9,\n    enter: 13,\n    shiftleft: 16,\n    shiftright: 16,\n    ctrlleft: 17,\n    ctrlrigght: 17,\n    altleft: 18,\n    altright: 18,\n    pause: 19,\n    capslock: 20,\n    escape: 27,\n    pageup: 33,\n    pagedown: 34,\n    end: 35,\n    home: 36,\n    arrowleft: 37,\n    arrowup: 38,\n    arrowright: 39,\n    arrowdown: 40,\n    insert: 45,\n    delete: 46,\n    0: 48,\n    1: 49,\n    2: 50,\n    3: 51,\n    4: 52,\n    5: 53,\n    6: 54,\n    7: 55,\n    8: 56,\n    9: 57,\n    a: 65,\n    b: 66,\n    c: 67,\n    d: 68,\n    e: 69,\n    f: 70,\n    g: 71,\n    h: 72,\n    i: 73,\n    j: 74,\n    k: 75,\n    l: 76,\n    m: 77,\n    n: 78,\n    o: 79,\n    p: 80,\n    q: 81,\n    r: 82,\n    s: 83,\n    t: 84,\n    u: 85,\n    v: 86,\n    w: 87,\n    x: 88,\n    y: 89,\n    z: 90,\n    metaleft: 91,\n    metaright: 92,\n    select: 93,\n    numpad0: 96,\n    numpad1: 97,\n    numpad2: 98,\n    numpad3: 99,\n    numpad4: 100,\n    numpad5: 101,\n    numpad6: 102,\n    numpad7: 103,\n    numpad8: 104,\n    numpad9: 105,\n    numpadmultiply: 106,\n    numpadadd: 107,\n    numpadsubtract: 109,\n    numpaddecimal: 110,\n    numpaddivide: 111,\n    f1: 112,\n    f2: 113,\n    f3: 114,\n    f4: 115,\n    f5: 116,\n    f6: 117,\n    f7: 118,\n    f8: 119,\n    f9: 120,\n    f10: 121,\n    f11: 122,\n    f12: 123,\n    numlock: 144,\n    scrolllock: 145,\n    semicolon: 186,\n    equalsign: 187,\n    comma: 188,\n    minus: 189,\n    period: 190,\n    slash: 191,\n    backquote: 192,\n    bracketleft: 219,\n    backslash: 220,\n    braketright: 221,\n    quote: 222\n  };\n\n//# sourceURL=webpack:///../src/engine/utils.js?");

/***/ }),

/***/ "../src/engine/world.js":
/*!******************************!*\
  !*** ../src/engine/world.js ***!
  \******************************/
/*! exports provided: GameWorld */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"GameWorld\", function() { return GameWorld; });\nclass GameWorld {\n  constructor (selector, options) {\n    options = options || {};\n\n    const container = document.querySelector(selector);\n    const canvas = document.createElement('canvas');\n    canvas.width = 1024;\n    canvas.height = 768;\n    canvas.className = 'world';\n\n    this.ctx = canvas.getContext(\"2d\");\n    this.width = canvas.width;\n    this.height = canvas.height;\n    this.gameObjects = [];\n    this.listeners = {};\n    \n    const resContainer = document.createElement('div');\n    resContainer.style.display = 'none';\n    \n    if (options.resources) {\n      options.resources.filter(r => r.type === 'image').forEach(r => {\n        const image = document.createElement('img');\n        image.src = r.src;\n        image.id = r.src;\n        image.dataset.name = r.name;\n        resContainer.append(image);\n      });\n    }\n\n    container.appendChild(resContainer);\n    container.appendChild(canvas);\n\n    document.addEventListener('keydown', (e) => {\n      if (this.listeners['keydown']) {\n        this.listeners['keydown'].forEach(listener => {\n          listener(e.keyCode);\n        });\n      }\n    });\n\n    document.addEventListener('keyup', (e) => {\n      if (this.listeners['keyup']) {\n        this.listeners['keyup'].forEach(listener => {\n          listener(e.keyCode);\n        });\n      }\n    });\n  }\n\n  getResource(name) {\n    const resource = document.querySelector(`[data-name='${name}']`);\n    if (!resource) {\n      throw new Error(`Couldn't find resource for: '${name}', please register this as an image resource!`);\n    }\n    return resource;\n  }\n\n  start() {\n    this.gameLoop();\n  }\n\n  clear() {\n    this.ctx.clearRect(0, 0, this.width, this.height)\n  }\n\n  gameLoop() {\n    this.clear();\n\n    this.gameObjects.forEach(gameObject => gameObject.update(this));\n\n    window.requestAnimationFrame(() => {\n      this.gameLoop();\n    });\n  }\n  insert(obj) {\n    this.gameObjects.push(obj);\n  }\n\n  on(type, cb) {\n    if (!this.listeners[type]) {\n      this.listeners[type] = [];\n    } \n    this.listeners[type].push(cb);\n    // return remove handler\n  }\n}\n\n\n//# sourceURL=webpack:///../src/engine/world.js?");

/***/ }),

/***/ "./index.js":
/*!******************!*\
  !*** ./index.js ***!
  \******************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _src_engine_world__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../src/engine/world */ \"../src/engine/world.js\");\n/* harmony import */ var _src_engine_objects__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../src/engine/objects */ \"../src/engine/objects.js\");\n/* harmony import */ var _src_engine_utils__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../src/engine/utils */ \"../src/engine/utils.js\");\n\n\n\n\n\nconst world = new _src_engine_world__WEBPACK_IMPORTED_MODULE_0__[\"GameWorld\"]('#container', {\n  resources: [\n    { type: 'image', name: 'background', src: 'static/background.jpg' },\n    { type: 'image', name: 'player', src: 'static/player.png' },\n  ]\n});\n\nconst background = new _src_engine_objects__WEBPACK_IMPORTED_MODULE_1__[\"ImageObject\"](world.getResource('background'), world.width, world.height);\nconst player = new _src_engine_objects__WEBPACK_IMPORTED_MODULE_1__[\"ImageObject\"](world.getResource('player'), 70, 83);\n\nworld.insert(background)\nworld.insert(player);\n\nworld.on('keydown', (keyCode) => {\n  if (keyCode === _src_engine_utils__WEBPACK_IMPORTED_MODULE_2__[\"keyCodes\"].arrowleft) {\n    player.move(270, 4, { easeIn: true });\n  }\n  if (keyCode === _src_engine_utils__WEBPACK_IMPORTED_MODULE_2__[\"keyCodes\"].arrowright) {\n    player.move(90, 4, { easeIn: true });\n  }\n  if (keyCode === _src_engine_utils__WEBPACK_IMPORTED_MODULE_2__[\"keyCodes\"].arrowdown) {\n    player.move(180, 4, { easeIn: true });\n  }\n  if (keyCode === _src_engine_utils__WEBPACK_IMPORTED_MODULE_2__[\"keyCodes\"].arrowup) {\n    player.move(0, 4, { easeIn: true });\n  }\n\n});\n\nworld.on('keyup', (keyCode) => {\n  if (keyCode === _src_engine_utils__WEBPACK_IMPORTED_MODULE_2__[\"keyCodes\"].arrowleft || keyCode === _src_engine_utils__WEBPACK_IMPORTED_MODULE_2__[\"keyCodes\"].arrowright ||\n    keyCode === _src_engine_utils__WEBPACK_IMPORTED_MODULE_2__[\"keyCodes\"].arrowup || keyCode === _src_engine_utils__WEBPACK_IMPORTED_MODULE_2__[\"keyCodes\"].arrowdown) {\n    player.stop();\n  }\n});\n\nworld.start();\n\n\n//# sourceURL=webpack:///./index.js?");

/***/ })

/******/ });