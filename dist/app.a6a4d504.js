// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"node_modules/vue/dist/vue.common.dev.js":[function(require,module,exports) {
var global = arguments[3];
/*!
 * Vue.js v2.6.10
 * (c) 2014-2019 Evan You
 * Released under the MIT License.
 */
'use strict';

/*  */

var emptyObject = Object.freeze({});

// These helpers produce better VM code in JS engines due to their
// explicitness and function inlining.
function isUndef (v) {
  return v === undefined || v === null
}

function isDef (v) {
  return v !== undefined && v !== null
}

function isTrue (v) {
  return v === true
}

function isFalse (v) {
  return v === false
}

/**
 * Check if value is primitive.
 */
function isPrimitive (value) {
  return (
    typeof value === 'string' ||
    typeof value === 'number' ||
    // $flow-disable-line
    typeof value === 'symbol' ||
    typeof value === 'boolean'
  )
}

/**
 * Quick object check - this is primarily used to tell
 * Objects from primitive values when we know the value
 * is a JSON-compliant type.
 */
function isObject (obj) {
  return obj !== null && typeof obj === 'object'
}

/**
 * Get the raw type string of a value, e.g., [object Object].
 */
var _toString = Object.prototype.toString;

function toRawType (value) {
  return _toString.call(value).slice(8, -1)
}

/**
 * Strict object type check. Only returns true
 * for plain JavaScript objects.
 */
function isPlainObject (obj) {
  return _toString.call(obj) === '[object Object]'
}

function isRegExp (v) {
  return _toString.call(v) === '[object RegExp]'
}

/**
 * Check if val is a valid array index.
 */
function isValidArrayIndex (val) {
  var n = parseFloat(String(val));
  return n >= 0 && Math.floor(n) === n && isFinite(val)
}

function isPromise (val) {
  return (
    isDef(val) &&
    typeof val.then === 'function' &&
    typeof val.catch === 'function'
  )
}

/**
 * Convert a value to a string that is actually rendered.
 */
function toString (val) {
  return val == null
    ? ''
    : Array.isArray(val) || (isPlainObject(val) && val.toString === _toString)
      ? JSON.stringify(val, null, 2)
      : String(val)
}

/**
 * Convert an input value to a number for persistence.
 * If the conversion fails, return original string.
 */
function toNumber (val) {
  var n = parseFloat(val);
  return isNaN(n) ? val : n
}

/**
 * Make a map and return a function for checking if a key
 * is in that map.
 */
function makeMap (
  str,
  expectsLowerCase
) {
  var map = Object.create(null);
  var list = str.split(',');
  for (var i = 0; i < list.length; i++) {
    map[list[i]] = true;
  }
  return expectsLowerCase
    ? function (val) { return map[val.toLowerCase()]; }
    : function (val) { return map[val]; }
}

/**
 * Check if a tag is a built-in tag.
 */
var isBuiltInTag = makeMap('slot,component', true);

/**
 * Check if an attribute is a reserved attribute.
 */
var isReservedAttribute = makeMap('key,ref,slot,slot-scope,is');

/**
 * Remove an item from an array.
 */
function remove (arr, item) {
  if (arr.length) {
    var index = arr.indexOf(item);
    if (index > -1) {
      return arr.splice(index, 1)
    }
  }
}

/**
 * Check whether an object has the property.
 */
var hasOwnProperty = Object.prototype.hasOwnProperty;
function hasOwn (obj, key) {
  return hasOwnProperty.call(obj, key)
}

/**
 * Create a cached version of a pure function.
 */
function cached (fn) {
  var cache = Object.create(null);
  return (function cachedFn (str) {
    var hit = cache[str];
    return hit || (cache[str] = fn(str))
  })
}

/**
 * Camelize a hyphen-delimited string.
 */
var camelizeRE = /-(\w)/g;
var camelize = cached(function (str) {
  return str.replace(camelizeRE, function (_, c) { return c ? c.toUpperCase() : ''; })
});

/**
 * Capitalize a string.
 */
var capitalize = cached(function (str) {
  return str.charAt(0).toUpperCase() + str.slice(1)
});

/**
 * Hyphenate a camelCase string.
 */
var hyphenateRE = /\B([A-Z])/g;
var hyphenate = cached(function (str) {
  return str.replace(hyphenateRE, '-$1').toLowerCase()
});

/**
 * Simple bind polyfill for environments that do not support it,
 * e.g., PhantomJS 1.x. Technically, we don't need this anymore
 * since native bind is now performant enough in most browsers.
 * But removing it would mean breaking code that was able to run in
 * PhantomJS 1.x, so this must be kept for backward compatibility.
 */

/* istanbul ignore next */
function polyfillBind (fn, ctx) {
  function boundFn (a) {
    var l = arguments.length;
    return l
      ? l > 1
        ? fn.apply(ctx, arguments)
        : fn.call(ctx, a)
      : fn.call(ctx)
  }

  boundFn._length = fn.length;
  return boundFn
}

function nativeBind (fn, ctx) {
  return fn.bind(ctx)
}

var bind = Function.prototype.bind
  ? nativeBind
  : polyfillBind;

/**
 * Convert an Array-like object to a real Array.
 */
function toArray (list, start) {
  start = start || 0;
  var i = list.length - start;
  var ret = new Array(i);
  while (i--) {
    ret[i] = list[i + start];
  }
  return ret
}

/**
 * Mix properties into target object.
 */
function extend (to, _from) {
  for (var key in _from) {
    to[key] = _from[key];
  }
  return to
}

/**
 * Merge an Array of Objects into a single Object.
 */
function toObject (arr) {
  var res = {};
  for (var i = 0; i < arr.length; i++) {
    if (arr[i]) {
      extend(res, arr[i]);
    }
  }
  return res
}

/* eslint-disable no-unused-vars */

/**
 * Perform no operation.
 * Stubbing args to make Flow happy without leaving useless transpiled code
 * with ...rest (https://flow.org/blog/2017/05/07/Strict-Function-Call-Arity/).
 */
function noop (a, b, c) {}

/**
 * Always return false.
 */
var no = function (a, b, c) { return false; };

/* eslint-enable no-unused-vars */

/**
 * Return the same value.
 */
var identity = function (_) { return _; };

/**
 * Generate a string containing static keys from compiler modules.
 */
function genStaticKeys (modules) {
  return modules.reduce(function (keys, m) {
    return keys.concat(m.staticKeys || [])
  }, []).join(',')
}

/**
 * Check if two values are loosely equal - that is,
 * if they are plain objects, do they have the same shape?
 */
function looseEqual (a, b) {
  if (a === b) { return true }
  var isObjectA = isObject(a);
  var isObjectB = isObject(b);
  if (isObjectA && isObjectB) {
    try {
      var isArrayA = Array.isArray(a);
      var isArrayB = Array.isArray(b);
      if (isArrayA && isArrayB) {
        return a.length === b.length && a.every(function (e, i) {
          return looseEqual(e, b[i])
        })
      } else if (a instanceof Date && b instanceof Date) {
        return a.getTime() === b.getTime()
      } else if (!isArrayA && !isArrayB) {
        var keysA = Object.keys(a);
        var keysB = Object.keys(b);
        return keysA.length === keysB.length && keysA.every(function (key) {
          return looseEqual(a[key], b[key])
        })
      } else {
        /* istanbul ignore next */
        return false
      }
    } catch (e) {
      /* istanbul ignore next */
      return false
    }
  } else if (!isObjectA && !isObjectB) {
    return String(a) === String(b)
  } else {
    return false
  }
}

/**
 * Return the first index at which a loosely equal value can be
 * found in the array (if value is a plain object, the array must
 * contain an object of the same shape), or -1 if it is not present.
 */
function looseIndexOf (arr, val) {
  for (var i = 0; i < arr.length; i++) {
    if (looseEqual(arr[i], val)) { return i }
  }
  return -1
}

/**
 * Ensure a function is called only once.
 */
function once (fn) {
  var called = false;
  return function () {
    if (!called) {
      called = true;
      fn.apply(this, arguments);
    }
  }
}

var SSR_ATTR = 'data-server-rendered';

var ASSET_TYPES = [
  'component',
  'directive',
  'filter'
];

var LIFECYCLE_HOOKS = [
  'beforeCreate',
  'created',
  'beforeMount',
  'mounted',
  'beforeUpdate',
  'updated',
  'beforeDestroy',
  'destroyed',
  'activated',
  'deactivated',
  'errorCaptured',
  'serverPrefetch'
];

/*  */



var config = ({
  /**
   * Option merge strategies (used in core/util/options)
   */
  // $flow-disable-line
  optionMergeStrategies: Object.create(null),

  /**
   * Whether to suppress warnings.
   */
  silent: false,

  /**
   * Show production mode tip message on boot?
   */
  productionTip: "development" !== 'production',

  /**
   * Whether to enable devtools
   */
  devtools: "development" !== 'production',

  /**
   * Whether to record perf
   */
  performance: false,

  /**
   * Error handler for watcher errors
   */
  errorHandler: null,

  /**
   * Warn handler for watcher warns
   */
  warnHandler: null,

  /**
   * Ignore certain custom elements
   */
  ignoredElements: [],

  /**
   * Custom user key aliases for v-on
   */
  // $flow-disable-line
  keyCodes: Object.create(null),

  /**
   * Check if a tag is reserved so that it cannot be registered as a
   * component. This is platform-dependent and may be overwritten.
   */
  isReservedTag: no,

  /**
   * Check if an attribute is reserved so that it cannot be used as a component
   * prop. This is platform-dependent and may be overwritten.
   */
  isReservedAttr: no,

  /**
   * Check if a tag is an unknown element.
   * Platform-dependent.
   */
  isUnknownElement: no,

  /**
   * Get the namespace of an element
   */
  getTagNamespace: noop,

  /**
   * Parse the real tag name for the specific platform.
   */
  parsePlatformTagName: identity,

  /**
   * Check if an attribute must be bound using property, e.g. value
   * Platform-dependent.
   */
  mustUseProp: no,

  /**
   * Perform updates asynchronously. Intended to be used by Vue Test Utils
   * This will significantly reduce performance if set to false.
   */
  async: true,

  /**
   * Exposed for legacy reasons
   */
  _lifecycleHooks: LIFECYCLE_HOOKS
});

/*  */

/**
 * unicode letters used for parsing html tags, component names and property paths.
 * using https://www.w3.org/TR/html53/semantics-scripting.html#potentialcustomelementname
 * skipping \u10000-\uEFFFF due to it freezing up PhantomJS
 */
var unicodeRegExp = /a-zA-Z\u00B7\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u037D\u037F-\u1FFF\u200C-\u200D\u203F-\u2040\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD/;

/**
 * Check if a string starts with $ or _
 */
function isReserved (str) {
  var c = (str + '').charCodeAt(0);
  return c === 0x24 || c === 0x5F
}

/**
 * Define a property.
 */
function def (obj, key, val, enumerable) {
  Object.defineProperty(obj, key, {
    value: val,
    enumerable: !!enumerable,
    writable: true,
    configurable: true
  });
}

/**
 * Parse simple path.
 */
var bailRE = new RegExp(("[^" + (unicodeRegExp.source) + ".$_\\d]"));
function parsePath (path) {
  if (bailRE.test(path)) {
    return
  }
  var segments = path.split('.');
  return function (obj) {
    for (var i = 0; i < segments.length; i++) {
      if (!obj) { return }
      obj = obj[segments[i]];
    }
    return obj
  }
}

/*  */

// can we use __proto__?
var hasProto = '__proto__' in {};

// Browser environment sniffing
var inBrowser = typeof window !== 'undefined';
var inWeex = typeof WXEnvironment !== 'undefined' && !!WXEnvironment.platform;
var weexPlatform = inWeex && WXEnvironment.platform.toLowerCase();
var UA = inBrowser && window.navigator.userAgent.toLowerCase();
var isIE = UA && /msie|trident/.test(UA);
var isIE9 = UA && UA.indexOf('msie 9.0') > 0;
var isEdge = UA && UA.indexOf('edge/') > 0;
var isAndroid = (UA && UA.indexOf('android') > 0) || (weexPlatform === 'android');
var isIOS = (UA && /iphone|ipad|ipod|ios/.test(UA)) || (weexPlatform === 'ios');
var isChrome = UA && /chrome\/\d+/.test(UA) && !isEdge;
var isPhantomJS = UA && /phantomjs/.test(UA);
var isFF = UA && UA.match(/firefox\/(\d+)/);

// Firefox has a "watch" function on Object.prototype...
var nativeWatch = ({}).watch;

var supportsPassive = false;
if (inBrowser) {
  try {
    var opts = {};
    Object.defineProperty(opts, 'passive', ({
      get: function get () {
        /* istanbul ignore next */
        supportsPassive = true;
      }
    })); // https://github.com/facebook/flow/issues/285
    window.addEventListener('test-passive', null, opts);
  } catch (e) {}
}

// this needs to be lazy-evaled because vue may be required before
// vue-server-renderer can set VUE_ENV
var _isServer;
var isServerRendering = function () {
  if (_isServer === undefined) {
    /* istanbul ignore if */
    if (!inBrowser && !inWeex && typeof global !== 'undefined') {
      // detect presence of vue-server-renderer and avoid
      // Webpack shimming the process
      _isServer = global['process'] && global['process'].env.VUE_ENV === 'server';
    } else {
      _isServer = false;
    }
  }
  return _isServer
};

// detect devtools
var devtools = inBrowser && window.__VUE_DEVTOOLS_GLOBAL_HOOK__;

/* istanbul ignore next */
function isNative (Ctor) {
  return typeof Ctor === 'function' && /native code/.test(Ctor.toString())
}

var hasSymbol =
  typeof Symbol !== 'undefined' && isNative(Symbol) &&
  typeof Reflect !== 'undefined' && isNative(Reflect.ownKeys);

var _Set;
/* istanbul ignore if */ // $flow-disable-line
if (typeof Set !== 'undefined' && isNative(Set)) {
  // use native Set when available.
  _Set = Set;
} else {
  // a non-standard Set polyfill that only works with primitive keys.
  _Set = /*@__PURE__*/(function () {
    function Set () {
      this.set = Object.create(null);
    }
    Set.prototype.has = function has (key) {
      return this.set[key] === true
    };
    Set.prototype.add = function add (key) {
      this.set[key] = true;
    };
    Set.prototype.clear = function clear () {
      this.set = Object.create(null);
    };

    return Set;
  }());
}

/*  */

var warn = noop;
var tip = noop;
var generateComponentTrace = (noop); // work around flow check
var formatComponentName = (noop);

{
  var hasConsole = typeof console !== 'undefined';
  var classifyRE = /(?:^|[-_])(\w)/g;
  var classify = function (str) { return str
    .replace(classifyRE, function (c) { return c.toUpperCase(); })
    .replace(/[-_]/g, ''); };

  warn = function (msg, vm) {
    var trace = vm ? generateComponentTrace(vm) : '';

    if (config.warnHandler) {
      config.warnHandler.call(null, msg, vm, trace);
    } else if (hasConsole && (!config.silent)) {
      console.error(("[Vue warn]: " + msg + trace));
    }
  };

  tip = function (msg, vm) {
    if (hasConsole && (!config.silent)) {
      console.warn("[Vue tip]: " + msg + (
        vm ? generateComponentTrace(vm) : ''
      ));
    }
  };

  formatComponentName = function (vm, includeFile) {
    if (vm.$root === vm) {
      return '<Root>'
    }
    var options = typeof vm === 'function' && vm.cid != null
      ? vm.options
      : vm._isVue
        ? vm.$options || vm.constructor.options
        : vm;
    var name = options.name || options._componentTag;
    var file = options.__file;
    if (!name && file) {
      var match = file.match(/([^/\\]+)\.vue$/);
      name = match && match[1];
    }

    return (
      (name ? ("<" + (classify(name)) + ">") : "<Anonymous>") +
      (file && includeFile !== false ? (" at " + file) : '')
    )
  };

  var repeat = function (str, n) {
    var res = '';
    while (n) {
      if (n % 2 === 1) { res += str; }
      if (n > 1) { str += str; }
      n >>= 1;
    }
    return res
  };

  generateComponentTrace = function (vm) {
    if (vm._isVue && vm.$parent) {
      var tree = [];
      var currentRecursiveSequence = 0;
      while (vm) {
        if (tree.length > 0) {
          var last = tree[tree.length - 1];
          if (last.constructor === vm.constructor) {
            currentRecursiveSequence++;
            vm = vm.$parent;
            continue
          } else if (currentRecursiveSequence > 0) {
            tree[tree.length - 1] = [last, currentRecursiveSequence];
            currentRecursiveSequence = 0;
          }
        }
        tree.push(vm);
        vm = vm.$parent;
      }
      return '\n\nfound in\n\n' + tree
        .map(function (vm, i) { return ("" + (i === 0 ? '---> ' : repeat(' ', 5 + i * 2)) + (Array.isArray(vm)
            ? ((formatComponentName(vm[0])) + "... (" + (vm[1]) + " recursive calls)")
            : formatComponentName(vm))); })
        .join('\n')
    } else {
      return ("\n\n(found in " + (formatComponentName(vm)) + ")")
    }
  };
}

/*  */

var uid = 0;

/**
 * A dep is an observable that can have multiple
 * directives subscribing to it.
 */
var Dep = function Dep () {
  this.id = uid++;
  this.subs = [];
};

Dep.prototype.addSub = function addSub (sub) {
  this.subs.push(sub);
};

Dep.prototype.removeSub = function removeSub (sub) {
  remove(this.subs, sub);
};

Dep.prototype.depend = function depend () {
  if (Dep.target) {
    Dep.target.addDep(this);
  }
};

Dep.prototype.notify = function notify () {
  // stabilize the subscriber list first
  var subs = this.subs.slice();
  if (!config.async) {
    // subs aren't sorted in scheduler if not running async
    // we need to sort them now to make sure they fire in correct
    // order
    subs.sort(function (a, b) { return a.id - b.id; });
  }
  for (var i = 0, l = subs.length; i < l; i++) {
    subs[i].update();
  }
};

// The current target watcher being evaluated.
// This is globally unique because only one watcher
// can be evaluated at a time.
Dep.target = null;
var targetStack = [];

function pushTarget (target) {
  targetStack.push(target);
  Dep.target = target;
}

function popTarget () {
  targetStack.pop();
  Dep.target = targetStack[targetStack.length - 1];
}

/*  */

var VNode = function VNode (
  tag,
  data,
  children,
  text,
  elm,
  context,
  componentOptions,
  asyncFactory
) {
  this.tag = tag;
  this.data = data;
  this.children = children;
  this.text = text;
  this.elm = elm;
  this.ns = undefined;
  this.context = context;
  this.fnContext = undefined;
  this.fnOptions = undefined;
  this.fnScopeId = undefined;
  this.key = data && data.key;
  this.componentOptions = componentOptions;
  this.componentInstance = undefined;
  this.parent = undefined;
  this.raw = false;
  this.isStatic = false;
  this.isRootInsert = true;
  this.isComment = false;
  this.isCloned = false;
  this.isOnce = false;
  this.asyncFactory = asyncFactory;
  this.asyncMeta = undefined;
  this.isAsyncPlaceholder = false;
};

var prototypeAccessors = { child: { configurable: true } };

// DEPRECATED: alias for componentInstance for backwards compat.
/* istanbul ignore next */
prototypeAccessors.child.get = function () {
  return this.componentInstance
};

Object.defineProperties( VNode.prototype, prototypeAccessors );

var createEmptyVNode = function (text) {
  if ( text === void 0 ) text = '';

  var node = new VNode();
  node.text = text;
  node.isComment = true;
  return node
};

function createTextVNode (val) {
  return new VNode(undefined, undefined, undefined, String(val))
}

// optimized shallow clone
// used for static nodes and slot nodes because they may be reused across
// multiple renders, cloning them avoids errors when DOM manipulations rely
// on their elm reference.
function cloneVNode (vnode) {
  var cloned = new VNode(
    vnode.tag,
    vnode.data,
    // #7975
    // clone children array to avoid mutating original in case of cloning
    // a child.
    vnode.children && vnode.children.slice(),
    vnode.text,
    vnode.elm,
    vnode.context,
    vnode.componentOptions,
    vnode.asyncFactory
  );
  cloned.ns = vnode.ns;
  cloned.isStatic = vnode.isStatic;
  cloned.key = vnode.key;
  cloned.isComment = vnode.isComment;
  cloned.fnContext = vnode.fnContext;
  cloned.fnOptions = vnode.fnOptions;
  cloned.fnScopeId = vnode.fnScopeId;
  cloned.asyncMeta = vnode.asyncMeta;
  cloned.isCloned = true;
  return cloned
}

/*
 * not type checking this file because flow doesn't play well with
 * dynamically accessing methods on Array prototype
 */

var arrayProto = Array.prototype;
var arrayMethods = Object.create(arrayProto);

var methodsToPatch = [
  'push',
  'pop',
  'shift',
  'unshift',
  'splice',
  'sort',
  'reverse'
];

/**
 * Intercept mutating methods and emit events
 */
methodsToPatch.forEach(function (method) {
  // cache original method
  var original = arrayProto[method];
  def(arrayMethods, method, function mutator () {
    var args = [], len = arguments.length;
    while ( len-- ) args[ len ] = arguments[ len ];

    var result = original.apply(this, args);
    var ob = this.__ob__;
    var inserted;
    switch (method) {
      case 'push':
      case 'unshift':
        inserted = args;
        break
      case 'splice':
        inserted = args.slice(2);
        break
    }
    if (inserted) { ob.observeArray(inserted); }
    // notify change
    ob.dep.notify();
    return result
  });
});

/*  */

var arrayKeys = Object.getOwnPropertyNames(arrayMethods);

/**
 * In some cases we may want to disable observation inside a component's
 * update computation.
 */
var shouldObserve = true;

function toggleObserving (value) {
  shouldObserve = value;
}

/**
 * Observer class that is attached to each observed
 * object. Once attached, the observer converts the target
 * object's property keys into getter/setters that
 * collect dependencies and dispatch updates.
 */
var Observer = function Observer (value) {
  this.value = value;
  this.dep = new Dep();
  this.vmCount = 0;
  def(value, '__ob__', this);
  if (Array.isArray(value)) {
    if (hasProto) {
      protoAugment(value, arrayMethods);
    } else {
      copyAugment(value, arrayMethods, arrayKeys);
    }
    this.observeArray(value);
  } else {
    this.walk(value);
  }
};

/**
 * Walk through all properties and convert them into
 * getter/setters. This method should only be called when
 * value type is Object.
 */
Observer.prototype.walk = function walk (obj) {
  var keys = Object.keys(obj);
  for (var i = 0; i < keys.length; i++) {
    defineReactive$$1(obj, keys[i]);
  }
};

/**
 * Observe a list of Array items.
 */
Observer.prototype.observeArray = function observeArray (items) {
  for (var i = 0, l = items.length; i < l; i++) {
    observe(items[i]);
  }
};

// helpers

/**
 * Augment a target Object or Array by intercepting
 * the prototype chain using __proto__
 */
function protoAugment (target, src) {
  /* eslint-disable no-proto */
  target.__proto__ = src;
  /* eslint-enable no-proto */
}

/**
 * Augment a target Object or Array by defining
 * hidden properties.
 */
/* istanbul ignore next */
function copyAugment (target, src, keys) {
  for (var i = 0, l = keys.length; i < l; i++) {
    var key = keys[i];
    def(target, key, src[key]);
  }
}

/**
 * Attempt to create an observer instance for a value,
 * returns the new observer if successfully observed,
 * or the existing observer if the value already has one.
 */
function observe (value, asRootData) {
  if (!isObject(value) || value instanceof VNode) {
    return
  }
  var ob;
  if (hasOwn(value, '__ob__') && value.__ob__ instanceof Observer) {
    ob = value.__ob__;
  } else if (
    shouldObserve &&
    !isServerRendering() &&
    (Array.isArray(value) || isPlainObject(value)) &&
    Object.isExtensible(value) &&
    !value._isVue
  ) {
    ob = new Observer(value);
  }
  if (asRootData && ob) {
    ob.vmCount++;
  }
  return ob
}

/**
 * Define a reactive property on an Object.
 */
function defineReactive$$1 (
  obj,
  key,
  val,
  customSetter,
  shallow
) {
  var dep = new Dep();

  var property = Object.getOwnPropertyDescriptor(obj, key);
  if (property && property.configurable === false) {
    return
  }

  // cater for pre-defined getter/setters
  var getter = property && property.get;
  var setter = property && property.set;
  if ((!getter || setter) && arguments.length === 2) {
    val = obj[key];
  }

  var childOb = !shallow && observe(val);
  Object.defineProperty(obj, key, {
    enumerable: true,
    configurable: true,
    get: function reactiveGetter () {
      var value = getter ? getter.call(obj) : val;
      if (Dep.target) {
        dep.depend();
        if (childOb) {
          childOb.dep.depend();
          if (Array.isArray(value)) {
            dependArray(value);
          }
        }
      }
      return value
    },
    set: function reactiveSetter (newVal) {
      var value = getter ? getter.call(obj) : val;
      /* eslint-disable no-self-compare */
      if (newVal === value || (newVal !== newVal && value !== value)) {
        return
      }
      /* eslint-enable no-self-compare */
      if (customSetter) {
        customSetter();
      }
      // #7981: for accessor properties without setter
      if (getter && !setter) { return }
      if (setter) {
        setter.call(obj, newVal);
      } else {
        val = newVal;
      }
      childOb = !shallow && observe(newVal);
      dep.notify();
    }
  });
}

/**
 * Set a property on an object. Adds the new property and
 * triggers change notification if the property doesn't
 * already exist.
 */
function set (target, key, val) {
  if (isUndef(target) || isPrimitive(target)
  ) {
    warn(("Cannot set reactive property on undefined, null, or primitive value: " + ((target))));
  }
  if (Array.isArray(target) && isValidArrayIndex(key)) {
    target.length = Math.max(target.length, key);
    target.splice(key, 1, val);
    return val
  }
  if (key in target && !(key in Object.prototype)) {
    target[key] = val;
    return val
  }
  var ob = (target).__ob__;
  if (target._isVue || (ob && ob.vmCount)) {
    warn(
      'Avoid adding reactive properties to a Vue instance or its root $data ' +
      'at runtime - declare it upfront in the data option.'
    );
    return val
  }
  if (!ob) {
    target[key] = val;
    return val
  }
  defineReactive$$1(ob.value, key, val);
  ob.dep.notify();
  return val
}

/**
 * Delete a property and trigger change if necessary.
 */
function del (target, key) {
  if (isUndef(target) || isPrimitive(target)
  ) {
    warn(("Cannot delete reactive property on undefined, null, or primitive value: " + ((target))));
  }
  if (Array.isArray(target) && isValidArrayIndex(key)) {
    target.splice(key, 1);
    return
  }
  var ob = (target).__ob__;
  if (target._isVue || (ob && ob.vmCount)) {
    warn(
      'Avoid deleting properties on a Vue instance or its root $data ' +
      '- just set it to null.'
    );
    return
  }
  if (!hasOwn(target, key)) {
    return
  }
  delete target[key];
  if (!ob) {
    return
  }
  ob.dep.notify();
}

/**
 * Collect dependencies on array elements when the array is touched, since
 * we cannot intercept array element access like property getters.
 */
function dependArray (value) {
  for (var e = (void 0), i = 0, l = value.length; i < l; i++) {
    e = value[i];
    e && e.__ob__ && e.__ob__.dep.depend();
    if (Array.isArray(e)) {
      dependArray(e);
    }
  }
}

/*  */

/**
 * Option overwriting strategies are functions that handle
 * how to merge a parent option value and a child option
 * value into the final value.
 */
var strats = config.optionMergeStrategies;

/**
 * Options with restrictions
 */
{
  strats.el = strats.propsData = function (parent, child, vm, key) {
    if (!vm) {
      warn(
        "option \"" + key + "\" can only be used during instance " +
        'creation with the `new` keyword.'
      );
    }
    return defaultStrat(parent, child)
  };
}

/**
 * Helper that recursively merges two data objects together.
 */
function mergeData (to, from) {
  if (!from) { return to }
  var key, toVal, fromVal;

  var keys = hasSymbol
    ? Reflect.ownKeys(from)
    : Object.keys(from);

  for (var i = 0; i < keys.length; i++) {
    key = keys[i];
    // in case the object is already observed...
    if (key === '__ob__') { continue }
    toVal = to[key];
    fromVal = from[key];
    if (!hasOwn(to, key)) {
      set(to, key, fromVal);
    } else if (
      toVal !== fromVal &&
      isPlainObject(toVal) &&
      isPlainObject(fromVal)
    ) {
      mergeData(toVal, fromVal);
    }
  }
  return to
}

/**
 * Data
 */
function mergeDataOrFn (
  parentVal,
  childVal,
  vm
) {
  if (!vm) {
    // in a Vue.extend merge, both should be functions
    if (!childVal) {
      return parentVal
    }
    if (!parentVal) {
      return childVal
    }
    // when parentVal & childVal are both present,
    // we need to return a function that returns the
    // merged result of both functions... no need to
    // check if parentVal is a function here because
    // it has to be a function to pass previous merges.
    return function mergedDataFn () {
      return mergeData(
        typeof childVal === 'function' ? childVal.call(this, this) : childVal,
        typeof parentVal === 'function' ? parentVal.call(this, this) : parentVal
      )
    }
  } else {
    return function mergedInstanceDataFn () {
      // instance merge
      var instanceData = typeof childVal === 'function'
        ? childVal.call(vm, vm)
        : childVal;
      var defaultData = typeof parentVal === 'function'
        ? parentVal.call(vm, vm)
        : parentVal;
      if (instanceData) {
        return mergeData(instanceData, defaultData)
      } else {
        return defaultData
      }
    }
  }
}

strats.data = function (
  parentVal,
  childVal,
  vm
) {
  if (!vm) {
    if (childVal && typeof childVal !== 'function') {
      warn(
        'The "data" option should be a function ' +
        'that returns a per-instance value in component ' +
        'definitions.',
        vm
      );

      return parentVal
    }
    return mergeDataOrFn(parentVal, childVal)
  }

  return mergeDataOrFn(parentVal, childVal, vm)
};

/**
 * Hooks and props are merged as arrays.
 */
function mergeHook (
  parentVal,
  childVal
) {
  var res = childVal
    ? parentVal
      ? parentVal.concat(childVal)
      : Array.isArray(childVal)
        ? childVal
        : [childVal]
    : parentVal;
  return res
    ? dedupeHooks(res)
    : res
}

function dedupeHooks (hooks) {
  var res = [];
  for (var i = 0; i < hooks.length; i++) {
    if (res.indexOf(hooks[i]) === -1) {
      res.push(hooks[i]);
    }
  }
  return res
}

LIFECYCLE_HOOKS.forEach(function (hook) {
  strats[hook] = mergeHook;
});

/**
 * Assets
 *
 * When a vm is present (instance creation), we need to do
 * a three-way merge between constructor options, instance
 * options and parent options.
 */
function mergeAssets (
  parentVal,
  childVal,
  vm,
  key
) {
  var res = Object.create(parentVal || null);
  if (childVal) {
    assertObjectType(key, childVal, vm);
    return extend(res, childVal)
  } else {
    return res
  }
}

ASSET_TYPES.forEach(function (type) {
  strats[type + 's'] = mergeAssets;
});

/**
 * Watchers.
 *
 * Watchers hashes should not overwrite one
 * another, so we merge them as arrays.
 */
strats.watch = function (
  parentVal,
  childVal,
  vm,
  key
) {
  // work around Firefox's Object.prototype.watch...
  if (parentVal === nativeWatch) { parentVal = undefined; }
  if (childVal === nativeWatch) { childVal = undefined; }
  /* istanbul ignore if */
  if (!childVal) { return Object.create(parentVal || null) }
  {
    assertObjectType(key, childVal, vm);
  }
  if (!parentVal) { return childVal }
  var ret = {};
  extend(ret, parentVal);
  for (var key$1 in childVal) {
    var parent = ret[key$1];
    var child = childVal[key$1];
    if (parent && !Array.isArray(parent)) {
      parent = [parent];
    }
    ret[key$1] = parent
      ? parent.concat(child)
      : Array.isArray(child) ? child : [child];
  }
  return ret
};

/**
 * Other object hashes.
 */
strats.props =
strats.methods =
strats.inject =
strats.computed = function (
  parentVal,
  childVal,
  vm,
  key
) {
  if (childVal && "development" !== 'production') {
    assertObjectType(key, childVal, vm);
  }
  if (!parentVal) { return childVal }
  var ret = Object.create(null);
  extend(ret, parentVal);
  if (childVal) { extend(ret, childVal); }
  return ret
};
strats.provide = mergeDataOrFn;

/**
 * Default strategy.
 */
var defaultStrat = function (parentVal, childVal) {
  return childVal === undefined
    ? parentVal
    : childVal
};

/**
 * Validate component names
 */
function checkComponents (options) {
  for (var key in options.components) {
    validateComponentName(key);
  }
}

function validateComponentName (name) {
  if (!new RegExp(("^[a-zA-Z][\\-\\.0-9_" + (unicodeRegExp.source) + "]*$")).test(name)) {
    warn(
      'Invalid component name: "' + name + '". Component names ' +
      'should conform to valid custom element name in html5 specification.'
    );
  }
  if (isBuiltInTag(name) || config.isReservedTag(name)) {
    warn(
      'Do not use built-in or reserved HTML elements as component ' +
      'id: ' + name
    );
  }
}

/**
 * Ensure all props option syntax are normalized into the
 * Object-based format.
 */
function normalizeProps (options, vm) {
  var props = options.props;
  if (!props) { return }
  var res = {};
  var i, val, name;
  if (Array.isArray(props)) {
    i = props.length;
    while (i--) {
      val = props[i];
      if (typeof val === 'string') {
        name = camelize(val);
        res[name] = { type: null };
      } else {
        warn('props must be strings when using array syntax.');
      }
    }
  } else if (isPlainObject(props)) {
    for (var key in props) {
      val = props[key];
      name = camelize(key);
      res[name] = isPlainObject(val)
        ? val
        : { type: val };
    }
  } else {
    warn(
      "Invalid value for option \"props\": expected an Array or an Object, " +
      "but got " + (toRawType(props)) + ".",
      vm
    );
  }
  options.props = res;
}

/**
 * Normalize all injections into Object-based format
 */
function normalizeInject (options, vm) {
  var inject = options.inject;
  if (!inject) { return }
  var normalized = options.inject = {};
  if (Array.isArray(inject)) {
    for (var i = 0; i < inject.length; i++) {
      normalized[inject[i]] = { from: inject[i] };
    }
  } else if (isPlainObject(inject)) {
    for (var key in inject) {
      var val = inject[key];
      normalized[key] = isPlainObject(val)
        ? extend({ from: key }, val)
        : { from: val };
    }
  } else {
    warn(
      "Invalid value for option \"inject\": expected an Array or an Object, " +
      "but got " + (toRawType(inject)) + ".",
      vm
    );
  }
}

/**
 * Normalize raw function directives into object format.
 */
function normalizeDirectives (options) {
  var dirs = options.directives;
  if (dirs) {
    for (var key in dirs) {
      var def$$1 = dirs[key];
      if (typeof def$$1 === 'function') {
        dirs[key] = { bind: def$$1, update: def$$1 };
      }
    }
  }
}

function assertObjectType (name, value, vm) {
  if (!isPlainObject(value)) {
    warn(
      "Invalid value for option \"" + name + "\": expected an Object, " +
      "but got " + (toRawType(value)) + ".",
      vm
    );
  }
}

/**
 * Merge two option objects into a new one.
 * Core utility used in both instantiation and inheritance.
 */
function mergeOptions (
  parent,
  child,
  vm
) {
  {
    checkComponents(child);
  }

  if (typeof child === 'function') {
    child = child.options;
  }

  normalizeProps(child, vm);
  normalizeInject(child, vm);
  normalizeDirectives(child);

  // Apply extends and mixins on the child options,
  // but only if it is a raw options object that isn't
  // the result of another mergeOptions call.
  // Only merged options has the _base property.
  if (!child._base) {
    if (child.extends) {
      parent = mergeOptions(parent, child.extends, vm);
    }
    if (child.mixins) {
      for (var i = 0, l = child.mixins.length; i < l; i++) {
        parent = mergeOptions(parent, child.mixins[i], vm);
      }
    }
  }

  var options = {};
  var key;
  for (key in parent) {
    mergeField(key);
  }
  for (key in child) {
    if (!hasOwn(parent, key)) {
      mergeField(key);
    }
  }
  function mergeField (key) {
    var strat = strats[key] || defaultStrat;
    options[key] = strat(parent[key], child[key], vm, key);
  }
  return options
}

/**
 * Resolve an asset.
 * This function is used because child instances need access
 * to assets defined in its ancestor chain.
 */
function resolveAsset (
  options,
  type,
  id,
  warnMissing
) {
  /* istanbul ignore if */
  if (typeof id !== 'string') {
    return
  }
  var assets = options[type];
  // check local registration variations first
  if (hasOwn(assets, id)) { return assets[id] }
  var camelizedId = camelize(id);
  if (hasOwn(assets, camelizedId)) { return assets[camelizedId] }
  var PascalCaseId = capitalize(camelizedId);
  if (hasOwn(assets, PascalCaseId)) { return assets[PascalCaseId] }
  // fallback to prototype chain
  var res = assets[id] || assets[camelizedId] || assets[PascalCaseId];
  if (warnMissing && !res) {
    warn(
      'Failed to resolve ' + type.slice(0, -1) + ': ' + id,
      options
    );
  }
  return res
}

/*  */



function validateProp (
  key,
  propOptions,
  propsData,
  vm
) {
  var prop = propOptions[key];
  var absent = !hasOwn(propsData, key);
  var value = propsData[key];
  // boolean casting
  var booleanIndex = getTypeIndex(Boolean, prop.type);
  if (booleanIndex > -1) {
    if (absent && !hasOwn(prop, 'default')) {
      value = false;
    } else if (value === '' || value === hyphenate(key)) {
      // only cast empty string / same name to boolean if
      // boolean has higher priority
      var stringIndex = getTypeIndex(String, prop.type);
      if (stringIndex < 0 || booleanIndex < stringIndex) {
        value = true;
      }
    }
  }
  // check default value
  if (value === undefined) {
    value = getPropDefaultValue(vm, prop, key);
    // since the default value is a fresh copy,
    // make sure to observe it.
    var prevShouldObserve = shouldObserve;
    toggleObserving(true);
    observe(value);
    toggleObserving(prevShouldObserve);
  }
  {
    assertProp(prop, key, value, vm, absent);
  }
  return value
}

/**
 * Get the default value of a prop.
 */
function getPropDefaultValue (vm, prop, key) {
  // no default, return undefined
  if (!hasOwn(prop, 'default')) {
    return undefined
  }
  var def = prop.default;
  // warn against non-factory defaults for Object & Array
  if (isObject(def)) {
    warn(
      'Invalid default value for prop "' + key + '": ' +
      'Props with type Object/Array must use a factory function ' +
      'to return the default value.',
      vm
    );
  }
  // the raw prop value was also undefined from previous render,
  // return previous default value to avoid unnecessary watcher trigger
  if (vm && vm.$options.propsData &&
    vm.$options.propsData[key] === undefined &&
    vm._props[key] !== undefined
  ) {
    return vm._props[key]
  }
  // call factory function for non-Function types
  // a value is Function if its prototype is function even across different execution context
  return typeof def === 'function' && getType(prop.type) !== 'Function'
    ? def.call(vm)
    : def
}

/**
 * Assert whether a prop is valid.
 */
function assertProp (
  prop,
  name,
  value,
  vm,
  absent
) {
  if (prop.required && absent) {
    warn(
      'Missing required prop: "' + name + '"',
      vm
    );
    return
  }
  if (value == null && !prop.required) {
    return
  }
  var type = prop.type;
  var valid = !type || type === true;
  var expectedTypes = [];
  if (type) {
    if (!Array.isArray(type)) {
      type = [type];
    }
    for (var i = 0; i < type.length && !valid; i++) {
      var assertedType = assertType(value, type[i]);
      expectedTypes.push(assertedType.expectedType || '');
      valid = assertedType.valid;
    }
  }

  if (!valid) {
    warn(
      getInvalidTypeMessage(name, value, expectedTypes),
      vm
    );
    return
  }
  var validator = prop.validator;
  if (validator) {
    if (!validator(value)) {
      warn(
        'Invalid prop: custom validator check failed for prop "' + name + '".',
        vm
      );
    }
  }
}

var simpleCheckRE = /^(String|Number|Boolean|Function|Symbol)$/;

function assertType (value, type) {
  var valid;
  var expectedType = getType(type);
  if (simpleCheckRE.test(expectedType)) {
    var t = typeof value;
    valid = t === expectedType.toLowerCase();
    // for primitive wrapper objects
    if (!valid && t === 'object') {
      valid = value instanceof type;
    }
  } else if (expectedType === 'Object') {
    valid = isPlainObject(value);
  } else if (expectedType === 'Array') {
    valid = Array.isArray(value);
  } else {
    valid = value instanceof type;
  }
  return {
    valid: valid,
    expectedType: expectedType
  }
}

/**
 * Use function string name to check built-in types,
 * because a simple equality check will fail when running
 * across different vms / iframes.
 */
function getType (fn) {
  var match = fn && fn.toString().match(/^\s*function (\w+)/);
  return match ? match[1] : ''
}

function isSameType (a, b) {
  return getType(a) === getType(b)
}

function getTypeIndex (type, expectedTypes) {
  if (!Array.isArray(expectedTypes)) {
    return isSameType(expectedTypes, type) ? 0 : -1
  }
  for (var i = 0, len = expectedTypes.length; i < len; i++) {
    if (isSameType(expectedTypes[i], type)) {
      return i
    }
  }
  return -1
}

function getInvalidTypeMessage (name, value, expectedTypes) {
  var message = "Invalid prop: type check failed for prop \"" + name + "\"." +
    " Expected " + (expectedTypes.map(capitalize).join(', '));
  var expectedType = expectedTypes[0];
  var receivedType = toRawType(value);
  var expectedValue = styleValue(value, expectedType);
  var receivedValue = styleValue(value, receivedType);
  // check if we need to specify expected value
  if (expectedTypes.length === 1 &&
      isExplicable(expectedType) &&
      !isBoolean(expectedType, receivedType)) {
    message += " with value " + expectedValue;
  }
  message += ", got " + receivedType + " ";
  // check if we need to specify received value
  if (isExplicable(receivedType)) {
    message += "with value " + receivedValue + ".";
  }
  return message
}

function styleValue (value, type) {
  if (type === 'String') {
    return ("\"" + value + "\"")
  } else if (type === 'Number') {
    return ("" + (Number(value)))
  } else {
    return ("" + value)
  }
}

function isExplicable (value) {
  var explicitTypes = ['string', 'number', 'boolean'];
  return explicitTypes.some(function (elem) { return value.toLowerCase() === elem; })
}

function isBoolean () {
  var args = [], len = arguments.length;
  while ( len-- ) args[ len ] = arguments[ len ];

  return args.some(function (elem) { return elem.toLowerCase() === 'boolean'; })
}

/*  */

function handleError (err, vm, info) {
  // Deactivate deps tracking while processing error handler to avoid possible infinite rendering.
  // See: https://github.com/vuejs/vuex/issues/1505
  pushTarget();
  try {
    if (vm) {
      var cur = vm;
      while ((cur = cur.$parent)) {
        var hooks = cur.$options.errorCaptured;
        if (hooks) {
          for (var i = 0; i < hooks.length; i++) {
            try {
              var capture = hooks[i].call(cur, err, vm, info) === false;
              if (capture) { return }
            } catch (e) {
              globalHandleError(e, cur, 'errorCaptured hook');
            }
          }
        }
      }
    }
    globalHandleError(err, vm, info);
  } finally {
    popTarget();
  }
}

function invokeWithErrorHandling (
  handler,
  context,
  args,
  vm,
  info
) {
  var res;
  try {
    res = args ? handler.apply(context, args) : handler.call(context);
    if (res && !res._isVue && isPromise(res) && !res._handled) {
      res.catch(function (e) { return handleError(e, vm, info + " (Promise/async)"); });
      // issue #9511
      // avoid catch triggering multiple times when nested calls
      res._handled = true;
    }
  } catch (e) {
    handleError(e, vm, info);
  }
  return res
}

function globalHandleError (err, vm, info) {
  if (config.errorHandler) {
    try {
      return config.errorHandler.call(null, err, vm, info)
    } catch (e) {
      // if the user intentionally throws the original error in the handler,
      // do not log it twice
      if (e !== err) {
        logError(e, null, 'config.errorHandler');
      }
    }
  }
  logError(err, vm, info);
}

function logError (err, vm, info) {
  {
    warn(("Error in " + info + ": \"" + (err.toString()) + "\""), vm);
  }
  /* istanbul ignore else */
  if ((inBrowser || inWeex) && typeof console !== 'undefined') {
    console.error(err);
  } else {
    throw err
  }
}

/*  */

var isUsingMicroTask = false;

var callbacks = [];
var pending = false;

function flushCallbacks () {
  pending = false;
  var copies = callbacks.slice(0);
  callbacks.length = 0;
  for (var i = 0; i < copies.length; i++) {
    copies[i]();
  }
}

// Here we have async deferring wrappers using microtasks.
// In 2.5 we used (macro) tasks (in combination with microtasks).
// However, it has subtle problems when state is changed right before repaint
// (e.g. #6813, out-in transitions).
// Also, using (macro) tasks in event handler would cause some weird behaviors
// that cannot be circumvented (e.g. #7109, #7153, #7546, #7834, #8109).
// So we now use microtasks everywhere, again.
// A major drawback of this tradeoff is that there are some scenarios
// where microtasks have too high a priority and fire in between supposedly
// sequential events (e.g. #4521, #6690, which have workarounds)
// or even between bubbling of the same event (#6566).
var timerFunc;

// The nextTick behavior leverages the microtask queue, which can be accessed
// via either native Promise.then or MutationObserver.
// MutationObserver has wider support, however it is seriously bugged in
// UIWebView in iOS >= 9.3.3 when triggered in touch event handlers. It
// completely stops working after triggering a few times... so, if native
// Promise is available, we will use it:
/* istanbul ignore next, $flow-disable-line */
if (typeof Promise !== 'undefined' && isNative(Promise)) {
  var p = Promise.resolve();
  timerFunc = function () {
    p.then(flushCallbacks);
    // In problematic UIWebViews, Promise.then doesn't completely break, but
    // it can get stuck in a weird state where callbacks are pushed into the
    // microtask queue but the queue isn't being flushed, until the browser
    // needs to do some other work, e.g. handle a timer. Therefore we can
    // "force" the microtask queue to be flushed by adding an empty timer.
    if (isIOS) { setTimeout(noop); }
  };
  isUsingMicroTask = true;
} else if (!isIE && typeof MutationObserver !== 'undefined' && (
  isNative(MutationObserver) ||
  // PhantomJS and iOS 7.x
  MutationObserver.toString() === '[object MutationObserverConstructor]'
)) {
  // Use MutationObserver where native Promise is not available,
  // e.g. PhantomJS, iOS7, Android 4.4
  // (#6466 MutationObserver is unreliable in IE11)
  var counter = 1;
  var observer = new MutationObserver(flushCallbacks);
  var textNode = document.createTextNode(String(counter));
  observer.observe(textNode, {
    characterData: true
  });
  timerFunc = function () {
    counter = (counter + 1) % 2;
    textNode.data = String(counter);
  };
  isUsingMicroTask = true;
} else if (typeof setImmediate !== 'undefined' && isNative(setImmediate)) {
  // Fallback to setImmediate.
  // Techinically it leverages the (macro) task queue,
  // but it is still a better choice than setTimeout.
  timerFunc = function () {
    setImmediate(flushCallbacks);
  };
} else {
  // Fallback to setTimeout.
  timerFunc = function () {
    setTimeout(flushCallbacks, 0);
  };
}

function nextTick (cb, ctx) {
  var _resolve;
  callbacks.push(function () {
    if (cb) {
      try {
        cb.call(ctx);
      } catch (e) {
        handleError(e, ctx, 'nextTick');
      }
    } else if (_resolve) {
      _resolve(ctx);
    }
  });
  if (!pending) {
    pending = true;
    timerFunc();
  }
  // $flow-disable-line
  if (!cb && typeof Promise !== 'undefined') {
    return new Promise(function (resolve) {
      _resolve = resolve;
    })
  }
}

/*  */

var mark;
var measure;

{
  var perf = inBrowser && window.performance;
  /* istanbul ignore if */
  if (
    perf &&
    perf.mark &&
    perf.measure &&
    perf.clearMarks &&
    perf.clearMeasures
  ) {
    mark = function (tag) { return perf.mark(tag); };
    measure = function (name, startTag, endTag) {
      perf.measure(name, startTag, endTag);
      perf.clearMarks(startTag);
      perf.clearMarks(endTag);
      // perf.clearMeasures(name)
    };
  }
}

/* not type checking this file because flow doesn't play well with Proxy */

var initProxy;

{
  var allowedGlobals = makeMap(
    'Infinity,undefined,NaN,isFinite,isNaN,' +
    'parseFloat,parseInt,decodeURI,decodeURIComponent,encodeURI,encodeURIComponent,' +
    'Math,Number,Date,Array,Object,Boolean,String,RegExp,Map,Set,JSON,Intl,' +
    'require' // for Webpack/Browserify
  );

  var warnNonPresent = function (target, key) {
    warn(
      "Property or method \"" + key + "\" is not defined on the instance but " +
      'referenced during render. Make sure that this property is reactive, ' +
      'either in the data option, or for class-based components, by ' +
      'initializing the property. ' +
      'See: https://vuejs.org/v2/guide/reactivity.html#Declaring-Reactive-Properties.',
      target
    );
  };

  var warnReservedPrefix = function (target, key) {
    warn(
      "Property \"" + key + "\" must be accessed with \"$data." + key + "\" because " +
      'properties starting with "$" or "_" are not proxied in the Vue instance to ' +
      'prevent conflicts with Vue internals' +
      'See: https://vuejs.org/v2/api/#data',
      target
    );
  };

  var hasProxy =
    typeof Proxy !== 'undefined' && isNative(Proxy);

  if (hasProxy) {
    var isBuiltInModifier = makeMap('stop,prevent,self,ctrl,shift,alt,meta,exact');
    config.keyCodes = new Proxy(config.keyCodes, {
      set: function set (target, key, value) {
        if (isBuiltInModifier(key)) {
          warn(("Avoid overwriting built-in modifier in config.keyCodes: ." + key));
          return false
        } else {
          target[key] = value;
          return true
        }
      }
    });
  }

  var hasHandler = {
    has: function has (target, key) {
      var has = key in target;
      var isAllowed = allowedGlobals(key) ||
        (typeof key === 'string' && key.charAt(0) === '_' && !(key in target.$data));
      if (!has && !isAllowed) {
        if (key in target.$data) { warnReservedPrefix(target, key); }
        else { warnNonPresent(target, key); }
      }
      return has || !isAllowed
    }
  };

  var getHandler = {
    get: function get (target, key) {
      if (typeof key === 'string' && !(key in target)) {
        if (key in target.$data) { warnReservedPrefix(target, key); }
        else { warnNonPresent(target, key); }
      }
      return target[key]
    }
  };

  initProxy = function initProxy (vm) {
    if (hasProxy) {
      // determine which proxy handler to use
      var options = vm.$options;
      var handlers = options.render && options.render._withStripped
        ? getHandler
        : hasHandler;
      vm._renderProxy = new Proxy(vm, handlers);
    } else {
      vm._renderProxy = vm;
    }
  };
}

/*  */

var seenObjects = new _Set();

/**
 * Recursively traverse an object to evoke all converted
 * getters, so that every nested property inside the object
 * is collected as a "deep" dependency.
 */
function traverse (val) {
  _traverse(val, seenObjects);
  seenObjects.clear();
}

function _traverse (val, seen) {
  var i, keys;
  var isA = Array.isArray(val);
  if ((!isA && !isObject(val)) || Object.isFrozen(val) || val instanceof VNode) {
    return
  }
  if (val.__ob__) {
    var depId = val.__ob__.dep.id;
    if (seen.has(depId)) {
      return
    }
    seen.add(depId);
  }
  if (isA) {
    i = val.length;
    while (i--) { _traverse(val[i], seen); }
  } else {
    keys = Object.keys(val);
    i = keys.length;
    while (i--) { _traverse(val[keys[i]], seen); }
  }
}

/*  */

var normalizeEvent = cached(function (name) {
  var passive = name.charAt(0) === '&';
  name = passive ? name.slice(1) : name;
  var once$$1 = name.charAt(0) === '~'; // Prefixed last, checked first
  name = once$$1 ? name.slice(1) : name;
  var capture = name.charAt(0) === '!';
  name = capture ? name.slice(1) : name;
  return {
    name: name,
    once: once$$1,
    capture: capture,
    passive: passive
  }
});

function createFnInvoker (fns, vm) {
  function invoker () {
    var arguments$1 = arguments;

    var fns = invoker.fns;
    if (Array.isArray(fns)) {
      var cloned = fns.slice();
      for (var i = 0; i < cloned.length; i++) {
        invokeWithErrorHandling(cloned[i], null, arguments$1, vm, "v-on handler");
      }
    } else {
      // return handler return value for single handlers
      return invokeWithErrorHandling(fns, null, arguments, vm, "v-on handler")
    }
  }
  invoker.fns = fns;
  return invoker
}

function updateListeners (
  on,
  oldOn,
  add,
  remove$$1,
  createOnceHandler,
  vm
) {
  var name, def$$1, cur, old, event;
  for (name in on) {
    def$$1 = cur = on[name];
    old = oldOn[name];
    event = normalizeEvent(name);
    if (isUndef(cur)) {
      warn(
        "Invalid handler for event \"" + (event.name) + "\": got " + String(cur),
        vm
      );
    } else if (isUndef(old)) {
      if (isUndef(cur.fns)) {
        cur = on[name] = createFnInvoker(cur, vm);
      }
      if (isTrue(event.once)) {
        cur = on[name] = createOnceHandler(event.name, cur, event.capture);
      }
      add(event.name, cur, event.capture, event.passive, event.params);
    } else if (cur !== old) {
      old.fns = cur;
      on[name] = old;
    }
  }
  for (name in oldOn) {
    if (isUndef(on[name])) {
      event = normalizeEvent(name);
      remove$$1(event.name, oldOn[name], event.capture);
    }
  }
}

/*  */

function mergeVNodeHook (def, hookKey, hook) {
  if (def instanceof VNode) {
    def = def.data.hook || (def.data.hook = {});
  }
  var invoker;
  var oldHook = def[hookKey];

  function wrappedHook () {
    hook.apply(this, arguments);
    // important: remove merged hook to ensure it's called only once
    // and prevent memory leak
    remove(invoker.fns, wrappedHook);
  }

  if (isUndef(oldHook)) {
    // no existing hook
    invoker = createFnInvoker([wrappedHook]);
  } else {
    /* istanbul ignore if */
    if (isDef(oldHook.fns) && isTrue(oldHook.merged)) {
      // already a merged invoker
      invoker = oldHook;
      invoker.fns.push(wrappedHook);
    } else {
      // existing plain hook
      invoker = createFnInvoker([oldHook, wrappedHook]);
    }
  }

  invoker.merged = true;
  def[hookKey] = invoker;
}

/*  */

function extractPropsFromVNodeData (
  data,
  Ctor,
  tag
) {
  // we are only extracting raw values here.
  // validation and default values are handled in the child
  // component itself.
  var propOptions = Ctor.options.props;
  if (isUndef(propOptions)) {
    return
  }
  var res = {};
  var attrs = data.attrs;
  var props = data.props;
  if (isDef(attrs) || isDef(props)) {
    for (var key in propOptions) {
      var altKey = hyphenate(key);
      {
        var keyInLowerCase = key.toLowerCase();
        if (
          key !== keyInLowerCase &&
          attrs && hasOwn(attrs, keyInLowerCase)
        ) {
          tip(
            "Prop \"" + keyInLowerCase + "\" is passed to component " +
            (formatComponentName(tag || Ctor)) + ", but the declared prop name is" +
            " \"" + key + "\". " +
            "Note that HTML attributes are case-insensitive and camelCased " +
            "props need to use their kebab-case equivalents when using in-DOM " +
            "templates. You should probably use \"" + altKey + "\" instead of \"" + key + "\"."
          );
        }
      }
      checkProp(res, props, key, altKey, true) ||
      checkProp(res, attrs, key, altKey, false);
    }
  }
  return res
}

function checkProp (
  res,
  hash,
  key,
  altKey,
  preserve
) {
  if (isDef(hash)) {
    if (hasOwn(hash, key)) {
      res[key] = hash[key];
      if (!preserve) {
        delete hash[key];
      }
      return true
    } else if (hasOwn(hash, altKey)) {
      res[key] = hash[altKey];
      if (!preserve) {
        delete hash[altKey];
      }
      return true
    }
  }
  return false
}

/*  */

// The template compiler attempts to minimize the need for normalization by
// statically analyzing the template at compile time.
//
// For plain HTML markup, normalization can be completely skipped because the
// generated render function is guaranteed to return Array<VNode>. There are
// two cases where extra normalization is needed:

// 1. When the children contains components - because a functional component
// may return an Array instead of a single root. In this case, just a simple
// normalization is needed - if any child is an Array, we flatten the whole
// thing with Array.prototype.concat. It is guaranteed to be only 1-level deep
// because functional components already normalize their own children.
function simpleNormalizeChildren (children) {
  for (var i = 0; i < children.length; i++) {
    if (Array.isArray(children[i])) {
      return Array.prototype.concat.apply([], children)
    }
  }
  return children
}

// 2. When the children contains constructs that always generated nested Arrays,
// e.g. <template>, <slot>, v-for, or when the children is provided by user
// with hand-written render functions / JSX. In such cases a full normalization
// is needed to cater to all possible types of children values.
function normalizeChildren (children) {
  return isPrimitive(children)
    ? [createTextVNode(children)]
    : Array.isArray(children)
      ? normalizeArrayChildren(children)
      : undefined
}

function isTextNode (node) {
  return isDef(node) && isDef(node.text) && isFalse(node.isComment)
}

function normalizeArrayChildren (children, nestedIndex) {
  var res = [];
  var i, c, lastIndex, last;
  for (i = 0; i < children.length; i++) {
    c = children[i];
    if (isUndef(c) || typeof c === 'boolean') { continue }
    lastIndex = res.length - 1;
    last = res[lastIndex];
    //  nested
    if (Array.isArray(c)) {
      if (c.length > 0) {
        c = normalizeArrayChildren(c, ((nestedIndex || '') + "_" + i));
        // merge adjacent text nodes
        if (isTextNode(c[0]) && isTextNode(last)) {
          res[lastIndex] = createTextVNode(last.text + (c[0]).text);
          c.shift();
        }
        res.push.apply(res, c);
      }
    } else if (isPrimitive(c)) {
      if (isTextNode(last)) {
        // merge adjacent text nodes
        // this is necessary for SSR hydration because text nodes are
        // essentially merged when rendered to HTML strings
        res[lastIndex] = createTextVNode(last.text + c);
      } else if (c !== '') {
        // convert primitive to vnode
        res.push(createTextVNode(c));
      }
    } else {
      if (isTextNode(c) && isTextNode(last)) {
        // merge adjacent text nodes
        res[lastIndex] = createTextVNode(last.text + c.text);
      } else {
        // default key for nested array children (likely generated by v-for)
        if (isTrue(children._isVList) &&
          isDef(c.tag) &&
          isUndef(c.key) &&
          isDef(nestedIndex)) {
          c.key = "__vlist" + nestedIndex + "_" + i + "__";
        }
        res.push(c);
      }
    }
  }
  return res
}

/*  */

function initProvide (vm) {
  var provide = vm.$options.provide;
  if (provide) {
    vm._provided = typeof provide === 'function'
      ? provide.call(vm)
      : provide;
  }
}

function initInjections (vm) {
  var result = resolveInject(vm.$options.inject, vm);
  if (result) {
    toggleObserving(false);
    Object.keys(result).forEach(function (key) {
      /* istanbul ignore else */
      {
        defineReactive$$1(vm, key, result[key], function () {
          warn(
            "Avoid mutating an injected value directly since the changes will be " +
            "overwritten whenever the provided component re-renders. " +
            "injection being mutated: \"" + key + "\"",
            vm
          );
        });
      }
    });
    toggleObserving(true);
  }
}

function resolveInject (inject, vm) {
  if (inject) {
    // inject is :any because flow is not smart enough to figure out cached
    var result = Object.create(null);
    var keys = hasSymbol
      ? Reflect.ownKeys(inject)
      : Object.keys(inject);

    for (var i = 0; i < keys.length; i++) {
      var key = keys[i];
      // #6574 in case the inject object is observed...
      if (key === '__ob__') { continue }
      var provideKey = inject[key].from;
      var source = vm;
      while (source) {
        if (source._provided && hasOwn(source._provided, provideKey)) {
          result[key] = source._provided[provideKey];
          break
        }
        source = source.$parent;
      }
      if (!source) {
        if ('default' in inject[key]) {
          var provideDefault = inject[key].default;
          result[key] = typeof provideDefault === 'function'
            ? provideDefault.call(vm)
            : provideDefault;
        } else {
          warn(("Injection \"" + key + "\" not found"), vm);
        }
      }
    }
    return result
  }
}

/*  */



/**
 * Runtime helper for resolving raw children VNodes into a slot object.
 */
function resolveSlots (
  children,
  context
) {
  if (!children || !children.length) {
    return {}
  }
  var slots = {};
  for (var i = 0, l = children.length; i < l; i++) {
    var child = children[i];
    var data = child.data;
    // remove slot attribute if the node is resolved as a Vue slot node
    if (data && data.attrs && data.attrs.slot) {
      delete data.attrs.slot;
    }
    // named slots should only be respected if the vnode was rendered in the
    // same context.
    if ((child.context === context || child.fnContext === context) &&
      data && data.slot != null
    ) {
      var name = data.slot;
      var slot = (slots[name] || (slots[name] = []));
      if (child.tag === 'template') {
        slot.push.apply(slot, child.children || []);
      } else {
        slot.push(child);
      }
    } else {
      (slots.default || (slots.default = [])).push(child);
    }
  }
  // ignore slots that contains only whitespace
  for (var name$1 in slots) {
    if (slots[name$1].every(isWhitespace)) {
      delete slots[name$1];
    }
  }
  return slots
}

function isWhitespace (node) {
  return (node.isComment && !node.asyncFactory) || node.text === ' '
}

/*  */

function normalizeScopedSlots (
  slots,
  normalSlots,
  prevSlots
) {
  var res;
  var hasNormalSlots = Object.keys(normalSlots).length > 0;
  var isStable = slots ? !!slots.$stable : !hasNormalSlots;
  var key = slots && slots.$key;
  if (!slots) {
    res = {};
  } else if (slots._normalized) {
    // fast path 1: child component re-render only, parent did not change
    return slots._normalized
  } else if (
    isStable &&
    prevSlots &&
    prevSlots !== emptyObject &&
    key === prevSlots.$key &&
    !hasNormalSlots &&
    !prevSlots.$hasNormal
  ) {
    // fast path 2: stable scoped slots w/ no normal slots to proxy,
    // only need to normalize once
    return prevSlots
  } else {
    res = {};
    for (var key$1 in slots) {
      if (slots[key$1] && key$1[0] !== '$') {
        res[key$1] = normalizeScopedSlot(normalSlots, key$1, slots[key$1]);
      }
    }
  }
  // expose normal slots on scopedSlots
  for (var key$2 in normalSlots) {
    if (!(key$2 in res)) {
      res[key$2] = proxyNormalSlot(normalSlots, key$2);
    }
  }
  // avoriaz seems to mock a non-extensible $scopedSlots object
  // and when that is passed down this would cause an error
  if (slots && Object.isExtensible(slots)) {
    (slots)._normalized = res;
  }
  def(res, '$stable', isStable);
  def(res, '$key', key);
  def(res, '$hasNormal', hasNormalSlots);
  return res
}

function normalizeScopedSlot(normalSlots, key, fn) {
  var normalized = function () {
    var res = arguments.length ? fn.apply(null, arguments) : fn({});
    res = res && typeof res === 'object' && !Array.isArray(res)
      ? [res] // single vnode
      : normalizeChildren(res);
    return res && (
      res.length === 0 ||
      (res.length === 1 && res[0].isComment) // #9658
    ) ? undefined
      : res
  };
  // this is a slot using the new v-slot syntax without scope. although it is
  // compiled as a scoped slot, render fn users would expect it to be present
  // on this.$slots because the usage is semantically a normal slot.
  if (fn.proxy) {
    Object.defineProperty(normalSlots, key, {
      get: normalized,
      enumerable: true,
      configurable: true
    });
  }
  return normalized
}

function proxyNormalSlot(slots, key) {
  return function () { return slots[key]; }
}

/*  */

/**
 * Runtime helper for rendering v-for lists.
 */
function renderList (
  val,
  render
) {
  var ret, i, l, keys, key;
  if (Array.isArray(val) || typeof val === 'string') {
    ret = new Array(val.length);
    for (i = 0, l = val.length; i < l; i++) {
      ret[i] = render(val[i], i);
    }
  } else if (typeof val === 'number') {
    ret = new Array(val);
    for (i = 0; i < val; i++) {
      ret[i] = render(i + 1, i);
    }
  } else if (isObject(val)) {
    if (hasSymbol && val[Symbol.iterator]) {
      ret = [];
      var iterator = val[Symbol.iterator]();
      var result = iterator.next();
      while (!result.done) {
        ret.push(render(result.value, ret.length));
        result = iterator.next();
      }
    } else {
      keys = Object.keys(val);
      ret = new Array(keys.length);
      for (i = 0, l = keys.length; i < l; i++) {
        key = keys[i];
        ret[i] = render(val[key], key, i);
      }
    }
  }
  if (!isDef(ret)) {
    ret = [];
  }
  (ret)._isVList = true;
  return ret
}

/*  */

/**
 * Runtime helper for rendering <slot>
 */
function renderSlot (
  name,
  fallback,
  props,
  bindObject
) {
  var scopedSlotFn = this.$scopedSlots[name];
  var nodes;
  if (scopedSlotFn) { // scoped slot
    props = props || {};
    if (bindObject) {
      if (!isObject(bindObject)) {
        warn(
          'slot v-bind without argument expects an Object',
          this
        );
      }
      props = extend(extend({}, bindObject), props);
    }
    nodes = scopedSlotFn(props) || fallback;
  } else {
    nodes = this.$slots[name] || fallback;
  }

  var target = props && props.slot;
  if (target) {
    return this.$createElement('template', { slot: target }, nodes)
  } else {
    return nodes
  }
}

/*  */

/**
 * Runtime helper for resolving filters
 */
function resolveFilter (id) {
  return resolveAsset(this.$options, 'filters', id, true) || identity
}

/*  */

function isKeyNotMatch (expect, actual) {
  if (Array.isArray(expect)) {
    return expect.indexOf(actual) === -1
  } else {
    return expect !== actual
  }
}

/**
 * Runtime helper for checking keyCodes from config.
 * exposed as Vue.prototype._k
 * passing in eventKeyName as last argument separately for backwards compat
 */
function checkKeyCodes (
  eventKeyCode,
  key,
  builtInKeyCode,
  eventKeyName,
  builtInKeyName
) {
  var mappedKeyCode = config.keyCodes[key] || builtInKeyCode;
  if (builtInKeyName && eventKeyName && !config.keyCodes[key]) {
    return isKeyNotMatch(builtInKeyName, eventKeyName)
  } else if (mappedKeyCode) {
    return isKeyNotMatch(mappedKeyCode, eventKeyCode)
  } else if (eventKeyName) {
    return hyphenate(eventKeyName) !== key
  }
}

/*  */

/**
 * Runtime helper for merging v-bind="object" into a VNode's data.
 */
function bindObjectProps (
  data,
  tag,
  value,
  asProp,
  isSync
) {
  if (value) {
    if (!isObject(value)) {
      warn(
        'v-bind without argument expects an Object or Array value',
        this
      );
    } else {
      if (Array.isArray(value)) {
        value = toObject(value);
      }
      var hash;
      var loop = function ( key ) {
        if (
          key === 'class' ||
          key === 'style' ||
          isReservedAttribute(key)
        ) {
          hash = data;
        } else {
          var type = data.attrs && data.attrs.type;
          hash = asProp || config.mustUseProp(tag, type, key)
            ? data.domProps || (data.domProps = {})
            : data.attrs || (data.attrs = {});
        }
        var camelizedKey = camelize(key);
        var hyphenatedKey = hyphenate(key);
        if (!(camelizedKey in hash) && !(hyphenatedKey in hash)) {
          hash[key] = value[key];

          if (isSync) {
            var on = data.on || (data.on = {});
            on[("update:" + key)] = function ($event) {
              value[key] = $event;
            };
          }
        }
      };

      for (var key in value) loop( key );
    }
  }
  return data
}

/*  */

/**
 * Runtime helper for rendering static trees.
 */
function renderStatic (
  index,
  isInFor
) {
  var cached = this._staticTrees || (this._staticTrees = []);
  var tree = cached[index];
  // if has already-rendered static tree and not inside v-for,
  // we can reuse the same tree.
  if (tree && !isInFor) {
    return tree
  }
  // otherwise, render a fresh tree.
  tree = cached[index] = this.$options.staticRenderFns[index].call(
    this._renderProxy,
    null,
    this // for render fns generated for functional component templates
  );
  markStatic(tree, ("__static__" + index), false);
  return tree
}

/**
 * Runtime helper for v-once.
 * Effectively it means marking the node as static with a unique key.
 */
function markOnce (
  tree,
  index,
  key
) {
  markStatic(tree, ("__once__" + index + (key ? ("_" + key) : "")), true);
  return tree
}

function markStatic (
  tree,
  key,
  isOnce
) {
  if (Array.isArray(tree)) {
    for (var i = 0; i < tree.length; i++) {
      if (tree[i] && typeof tree[i] !== 'string') {
        markStaticNode(tree[i], (key + "_" + i), isOnce);
      }
    }
  } else {
    markStaticNode(tree, key, isOnce);
  }
}

function markStaticNode (node, key, isOnce) {
  node.isStatic = true;
  node.key = key;
  node.isOnce = isOnce;
}

/*  */

function bindObjectListeners (data, value) {
  if (value) {
    if (!isPlainObject(value)) {
      warn(
        'v-on without argument expects an Object value',
        this
      );
    } else {
      var on = data.on = data.on ? extend({}, data.on) : {};
      for (var key in value) {
        var existing = on[key];
        var ours = value[key];
        on[key] = existing ? [].concat(existing, ours) : ours;
      }
    }
  }
  return data
}

/*  */

function resolveScopedSlots (
  fns, // see flow/vnode
  res,
  // the following are added in 2.6
  hasDynamicKeys,
  contentHashKey
) {
  res = res || { $stable: !hasDynamicKeys };
  for (var i = 0; i < fns.length; i++) {
    var slot = fns[i];
    if (Array.isArray(slot)) {
      resolveScopedSlots(slot, res, hasDynamicKeys);
    } else if (slot) {
      // marker for reverse proxying v-slot without scope on this.$slots
      if (slot.proxy) {
        slot.fn.proxy = true;
      }
      res[slot.key] = slot.fn;
    }
  }
  if (contentHashKey) {
    (res).$key = contentHashKey;
  }
  return res
}

/*  */

function bindDynamicKeys (baseObj, values) {
  for (var i = 0; i < values.length; i += 2) {
    var key = values[i];
    if (typeof key === 'string' && key) {
      baseObj[values[i]] = values[i + 1];
    } else if (key !== '' && key !== null) {
      // null is a speical value for explicitly removing a binding
      warn(
        ("Invalid value for dynamic directive argument (expected string or null): " + key),
        this
      );
    }
  }
  return baseObj
}

// helper to dynamically append modifier runtime markers to event names.
// ensure only append when value is already string, otherwise it will be cast
// to string and cause the type check to miss.
function prependModifier (value, symbol) {
  return typeof value === 'string' ? symbol + value : value
}

/*  */

function installRenderHelpers (target) {
  target._o = markOnce;
  target._n = toNumber;
  target._s = toString;
  target._l = renderList;
  target._t = renderSlot;
  target._q = looseEqual;
  target._i = looseIndexOf;
  target._m = renderStatic;
  target._f = resolveFilter;
  target._k = checkKeyCodes;
  target._b = bindObjectProps;
  target._v = createTextVNode;
  target._e = createEmptyVNode;
  target._u = resolveScopedSlots;
  target._g = bindObjectListeners;
  target._d = bindDynamicKeys;
  target._p = prependModifier;
}

/*  */

function FunctionalRenderContext (
  data,
  props,
  children,
  parent,
  Ctor
) {
  var this$1 = this;

  var options = Ctor.options;
  // ensure the createElement function in functional components
  // gets a unique context - this is necessary for correct named slot check
  var contextVm;
  if (hasOwn(parent, '_uid')) {
    contextVm = Object.create(parent);
    // $flow-disable-line
    contextVm._original = parent;
  } else {
    // the context vm passed in is a functional context as well.
    // in this case we want to make sure we are able to get a hold to the
    // real context instance.
    contextVm = parent;
    // $flow-disable-line
    parent = parent._original;
  }
  var isCompiled = isTrue(options._compiled);
  var needNormalization = !isCompiled;

  this.data = data;
  this.props = props;
  this.children = children;
  this.parent = parent;
  this.listeners = data.on || emptyObject;
  this.injections = resolveInject(options.inject, parent);
  this.slots = function () {
    if (!this$1.$slots) {
      normalizeScopedSlots(
        data.scopedSlots,
        this$1.$slots = resolveSlots(children, parent)
      );
    }
    return this$1.$slots
  };

  Object.defineProperty(this, 'scopedSlots', ({
    enumerable: true,
    get: function get () {
      return normalizeScopedSlots(data.scopedSlots, this.slots())
    }
  }));

  // support for compiled functional template
  if (isCompiled) {
    // exposing $options for renderStatic()
    this.$options = options;
    // pre-resolve slots for renderSlot()
    this.$slots = this.slots();
    this.$scopedSlots = normalizeScopedSlots(data.scopedSlots, this.$slots);
  }

  if (options._scopeId) {
    this._c = function (a, b, c, d) {
      var vnode = createElement(contextVm, a, b, c, d, needNormalization);
      if (vnode && !Array.isArray(vnode)) {
        vnode.fnScopeId = options._scopeId;
        vnode.fnContext = parent;
      }
      return vnode
    };
  } else {
    this._c = function (a, b, c, d) { return createElement(contextVm, a, b, c, d, needNormalization); };
  }
}

installRenderHelpers(FunctionalRenderContext.prototype);

function createFunctionalComponent (
  Ctor,
  propsData,
  data,
  contextVm,
  children
) {
  var options = Ctor.options;
  var props = {};
  var propOptions = options.props;
  if (isDef(propOptions)) {
    for (var key in propOptions) {
      props[key] = validateProp(key, propOptions, propsData || emptyObject);
    }
  } else {
    if (isDef(data.attrs)) { mergeProps(props, data.attrs); }
    if (isDef(data.props)) { mergeProps(props, data.props); }
  }

  var renderContext = new FunctionalRenderContext(
    data,
    props,
    children,
    contextVm,
    Ctor
  );

  var vnode = options.render.call(null, renderContext._c, renderContext);

  if (vnode instanceof VNode) {
    return cloneAndMarkFunctionalResult(vnode, data, renderContext.parent, options, renderContext)
  } else if (Array.isArray(vnode)) {
    var vnodes = normalizeChildren(vnode) || [];
    var res = new Array(vnodes.length);
    for (var i = 0; i < vnodes.length; i++) {
      res[i] = cloneAndMarkFunctionalResult(vnodes[i], data, renderContext.parent, options, renderContext);
    }
    return res
  }
}

function cloneAndMarkFunctionalResult (vnode, data, contextVm, options, renderContext) {
  // #7817 clone node before setting fnContext, otherwise if the node is reused
  // (e.g. it was from a cached normal slot) the fnContext causes named slots
  // that should not be matched to match.
  var clone = cloneVNode(vnode);
  clone.fnContext = contextVm;
  clone.fnOptions = options;
  {
    (clone.devtoolsMeta = clone.devtoolsMeta || {}).renderContext = renderContext;
  }
  if (data.slot) {
    (clone.data || (clone.data = {})).slot = data.slot;
  }
  return clone
}

function mergeProps (to, from) {
  for (var key in from) {
    to[camelize(key)] = from[key];
  }
}

/*  */

/*  */

/*  */

/*  */

// inline hooks to be invoked on component VNodes during patch
var componentVNodeHooks = {
  init: function init (vnode, hydrating) {
    if (
      vnode.componentInstance &&
      !vnode.componentInstance._isDestroyed &&
      vnode.data.keepAlive
    ) {
      // kept-alive components, treat as a patch
      var mountedNode = vnode; // work around flow
      componentVNodeHooks.prepatch(mountedNode, mountedNode);
    } else {
      var child = vnode.componentInstance = createComponentInstanceForVnode(
        vnode,
        activeInstance
      );
      child.$mount(hydrating ? vnode.elm : undefined, hydrating);
    }
  },

  prepatch: function prepatch (oldVnode, vnode) {
    var options = vnode.componentOptions;
    var child = vnode.componentInstance = oldVnode.componentInstance;
    updateChildComponent(
      child,
      options.propsData, // updated props
      options.listeners, // updated listeners
      vnode, // new parent vnode
      options.children // new children
    );
  },

  insert: function insert (vnode) {
    var context = vnode.context;
    var componentInstance = vnode.componentInstance;
    if (!componentInstance._isMounted) {
      componentInstance._isMounted = true;
      callHook(componentInstance, 'mounted');
    }
    if (vnode.data.keepAlive) {
      if (context._isMounted) {
        // vue-router#1212
        // During updates, a kept-alive component's child components may
        // change, so directly walking the tree here may call activated hooks
        // on incorrect children. Instead we push them into a queue which will
        // be processed after the whole patch process ended.
        queueActivatedComponent(componentInstance);
      } else {
        activateChildComponent(componentInstance, true /* direct */);
      }
    }
  },

  destroy: function destroy (vnode) {
    var componentInstance = vnode.componentInstance;
    if (!componentInstance._isDestroyed) {
      if (!vnode.data.keepAlive) {
        componentInstance.$destroy();
      } else {
        deactivateChildComponent(componentInstance, true /* direct */);
      }
    }
  }
};

var hooksToMerge = Object.keys(componentVNodeHooks);

function createComponent (
  Ctor,
  data,
  context,
  children,
  tag
) {
  if (isUndef(Ctor)) {
    return
  }

  var baseCtor = context.$options._base;

  // plain options object: turn it into a constructor
  if (isObject(Ctor)) {
    Ctor = baseCtor.extend(Ctor);
  }

  // if at this stage it's not a constructor or an async component factory,
  // reject.
  if (typeof Ctor !== 'function') {
    {
      warn(("Invalid Component definition: " + (String(Ctor))), context);
    }
    return
  }

  // async component
  var asyncFactory;
  if (isUndef(Ctor.cid)) {
    asyncFactory = Ctor;
    Ctor = resolveAsyncComponent(asyncFactory, baseCtor);
    if (Ctor === undefined) {
      // return a placeholder node for async component, which is rendered
      // as a comment node but preserves all the raw information for the node.
      // the information will be used for async server-rendering and hydration.
      return createAsyncPlaceholder(
        asyncFactory,
        data,
        context,
        children,
        tag
      )
    }
  }

  data = data || {};

  // resolve constructor options in case global mixins are applied after
  // component constructor creation
  resolveConstructorOptions(Ctor);

  // transform component v-model data into props & events
  if (isDef(data.model)) {
    transformModel(Ctor.options, data);
  }

  // extract props
  var propsData = extractPropsFromVNodeData(data, Ctor, tag);

  // functional component
  if (isTrue(Ctor.options.functional)) {
    return createFunctionalComponent(Ctor, propsData, data, context, children)
  }

  // extract listeners, since these needs to be treated as
  // child component listeners instead of DOM listeners
  var listeners = data.on;
  // replace with listeners with .native modifier
  // so it gets processed during parent component patch.
  data.on = data.nativeOn;

  if (isTrue(Ctor.options.abstract)) {
    // abstract components do not keep anything
    // other than props & listeners & slot

    // work around flow
    var slot = data.slot;
    data = {};
    if (slot) {
      data.slot = slot;
    }
  }

  // install component management hooks onto the placeholder node
  installComponentHooks(data);

  // return a placeholder vnode
  var name = Ctor.options.name || tag;
  var vnode = new VNode(
    ("vue-component-" + (Ctor.cid) + (name ? ("-" + name) : '')),
    data, undefined, undefined, undefined, context,
    { Ctor: Ctor, propsData: propsData, listeners: listeners, tag: tag, children: children },
    asyncFactory
  );

  return vnode
}

function createComponentInstanceForVnode (
  vnode, // we know it's MountedComponentVNode but flow doesn't
  parent // activeInstance in lifecycle state
) {
  var options = {
    _isComponent: true,
    _parentVnode: vnode,
    parent: parent
  };
  // check inline-template render functions
  var inlineTemplate = vnode.data.inlineTemplate;
  if (isDef(inlineTemplate)) {
    options.render = inlineTemplate.render;
    options.staticRenderFns = inlineTemplate.staticRenderFns;
  }
  return new vnode.componentOptions.Ctor(options)
}

function installComponentHooks (data) {
  var hooks = data.hook || (data.hook = {});
  for (var i = 0; i < hooksToMerge.length; i++) {
    var key = hooksToMerge[i];
    var existing = hooks[key];
    var toMerge = componentVNodeHooks[key];
    if (existing !== toMerge && !(existing && existing._merged)) {
      hooks[key] = existing ? mergeHook$1(toMerge, existing) : toMerge;
    }
  }
}

function mergeHook$1 (f1, f2) {
  var merged = function (a, b) {
    // flow complains about extra args which is why we use any
    f1(a, b);
    f2(a, b);
  };
  merged._merged = true;
  return merged
}

// transform component v-model info (value and callback) into
// prop and event handler respectively.
function transformModel (options, data) {
  var prop = (options.model && options.model.prop) || 'value';
  var event = (options.model && options.model.event) || 'input'
  ;(data.attrs || (data.attrs = {}))[prop] = data.model.value;
  var on = data.on || (data.on = {});
  var existing = on[event];
  var callback = data.model.callback;
  if (isDef(existing)) {
    if (
      Array.isArray(existing)
        ? existing.indexOf(callback) === -1
        : existing !== callback
    ) {
      on[event] = [callback].concat(existing);
    }
  } else {
    on[event] = callback;
  }
}

/*  */

var SIMPLE_NORMALIZE = 1;
var ALWAYS_NORMALIZE = 2;

// wrapper function for providing a more flexible interface
// without getting yelled at by flow
function createElement (
  context,
  tag,
  data,
  children,
  normalizationType,
  alwaysNormalize
) {
  if (Array.isArray(data) || isPrimitive(data)) {
    normalizationType = children;
    children = data;
    data = undefined;
  }
  if (isTrue(alwaysNormalize)) {
    normalizationType = ALWAYS_NORMALIZE;
  }
  return _createElement(context, tag, data, children, normalizationType)
}

function _createElement (
  context,
  tag,
  data,
  children,
  normalizationType
) {
  if (isDef(data) && isDef((data).__ob__)) {
    warn(
      "Avoid using observed data object as vnode data: " + (JSON.stringify(data)) + "\n" +
      'Always create fresh vnode data objects in each render!',
      context
    );
    return createEmptyVNode()
  }
  // object syntax in v-bind
  if (isDef(data) && isDef(data.is)) {
    tag = data.is;
  }
  if (!tag) {
    // in case of component :is set to falsy value
    return createEmptyVNode()
  }
  // warn against non-primitive key
  if (isDef(data) && isDef(data.key) && !isPrimitive(data.key)
  ) {
    {
      warn(
        'Avoid using non-primitive value as key, ' +
        'use string/number value instead.',
        context
      );
    }
  }
  // support single function children as default scoped slot
  if (Array.isArray(children) &&
    typeof children[0] === 'function'
  ) {
    data = data || {};
    data.scopedSlots = { default: children[0] };
    children.length = 0;
  }
  if (normalizationType === ALWAYS_NORMALIZE) {
    children = normalizeChildren(children);
  } else if (normalizationType === SIMPLE_NORMALIZE) {
    children = simpleNormalizeChildren(children);
  }
  var vnode, ns;
  if (typeof tag === 'string') {
    var Ctor;
    ns = (context.$vnode && context.$vnode.ns) || config.getTagNamespace(tag);
    if (config.isReservedTag(tag)) {
      // platform built-in elements
      vnode = new VNode(
        config.parsePlatformTagName(tag), data, children,
        undefined, undefined, context
      );
    } else if ((!data || !data.pre) && isDef(Ctor = resolveAsset(context.$options, 'components', tag))) {
      // component
      vnode = createComponent(Ctor, data, context, children, tag);
    } else {
      // unknown or unlisted namespaced elements
      // check at runtime because it may get assigned a namespace when its
      // parent normalizes children
      vnode = new VNode(
        tag, data, children,
        undefined, undefined, context
      );
    }
  } else {
    // direct component options / constructor
    vnode = createComponent(tag, data, context, children);
  }
  if (Array.isArray(vnode)) {
    return vnode
  } else if (isDef(vnode)) {
    if (isDef(ns)) { applyNS(vnode, ns); }
    if (isDef(data)) { registerDeepBindings(data); }
    return vnode
  } else {
    return createEmptyVNode()
  }
}

function applyNS (vnode, ns, force) {
  vnode.ns = ns;
  if (vnode.tag === 'foreignObject') {
    // use default namespace inside foreignObject
    ns = undefined;
    force = true;
  }
  if (isDef(vnode.children)) {
    for (var i = 0, l = vnode.children.length; i < l; i++) {
      var child = vnode.children[i];
      if (isDef(child.tag) && (
        isUndef(child.ns) || (isTrue(force) && child.tag !== 'svg'))) {
        applyNS(child, ns, force);
      }
    }
  }
}

// ref #5318
// necessary to ensure parent re-render when deep bindings like :style and
// :class are used on slot nodes
function registerDeepBindings (data) {
  if (isObject(data.style)) {
    traverse(data.style);
  }
  if (isObject(data.class)) {
    traverse(data.class);
  }
}

/*  */

function initRender (vm) {
  vm._vnode = null; // the root of the child tree
  vm._staticTrees = null; // v-once cached trees
  var options = vm.$options;
  var parentVnode = vm.$vnode = options._parentVnode; // the placeholder node in parent tree
  var renderContext = parentVnode && parentVnode.context;
  vm.$slots = resolveSlots(options._renderChildren, renderContext);
  vm.$scopedSlots = emptyObject;
  // bind the createElement fn to this instance
  // so that we get proper render context inside it.
  // args order: tag, data, children, normalizationType, alwaysNormalize
  // internal version is used by render functions compiled from templates
  vm._c = function (a, b, c, d) { return createElement(vm, a, b, c, d, false); };
  // normalization is always applied for the public version, used in
  // user-written render functions.
  vm.$createElement = function (a, b, c, d) { return createElement(vm, a, b, c, d, true); };

  // $attrs & $listeners are exposed for easier HOC creation.
  // they need to be reactive so that HOCs using them are always updated
  var parentData = parentVnode && parentVnode.data;

  /* istanbul ignore else */
  {
    defineReactive$$1(vm, '$attrs', parentData && parentData.attrs || emptyObject, function () {
      !isUpdatingChildComponent && warn("$attrs is readonly.", vm);
    }, true);
    defineReactive$$1(vm, '$listeners', options._parentListeners || emptyObject, function () {
      !isUpdatingChildComponent && warn("$listeners is readonly.", vm);
    }, true);
  }
}

var currentRenderingInstance = null;

function renderMixin (Vue) {
  // install runtime convenience helpers
  installRenderHelpers(Vue.prototype);

  Vue.prototype.$nextTick = function (fn) {
    return nextTick(fn, this)
  };

  Vue.prototype._render = function () {
    var vm = this;
    var ref = vm.$options;
    var render = ref.render;
    var _parentVnode = ref._parentVnode;

    if (_parentVnode) {
      vm.$scopedSlots = normalizeScopedSlots(
        _parentVnode.data.scopedSlots,
        vm.$slots,
        vm.$scopedSlots
      );
    }

    // set parent vnode. this allows render functions to have access
    // to the data on the placeholder node.
    vm.$vnode = _parentVnode;
    // render self
    var vnode;
    try {
      // There's no need to maintain a stack becaues all render fns are called
      // separately from one another. Nested component's render fns are called
      // when parent component is patched.
      currentRenderingInstance = vm;
      vnode = render.call(vm._renderProxy, vm.$createElement);
    } catch (e) {
      handleError(e, vm, "render");
      // return error render result,
      // or previous vnode to prevent render error causing blank component
      /* istanbul ignore else */
      if (vm.$options.renderError) {
        try {
          vnode = vm.$options.renderError.call(vm._renderProxy, vm.$createElement, e);
        } catch (e) {
          handleError(e, vm, "renderError");
          vnode = vm._vnode;
        }
      } else {
        vnode = vm._vnode;
      }
    } finally {
      currentRenderingInstance = null;
    }
    // if the returned array contains only a single node, allow it
    if (Array.isArray(vnode) && vnode.length === 1) {
      vnode = vnode[0];
    }
    // return empty vnode in case the render function errored out
    if (!(vnode instanceof VNode)) {
      if (Array.isArray(vnode)) {
        warn(
          'Multiple root nodes returned from render function. Render function ' +
          'should return a single root node.',
          vm
        );
      }
      vnode = createEmptyVNode();
    }
    // set parent
    vnode.parent = _parentVnode;
    return vnode
  };
}

/*  */

function ensureCtor (comp, base) {
  if (
    comp.__esModule ||
    (hasSymbol && comp[Symbol.toStringTag] === 'Module')
  ) {
    comp = comp.default;
  }
  return isObject(comp)
    ? base.extend(comp)
    : comp
}

function createAsyncPlaceholder (
  factory,
  data,
  context,
  children,
  tag
) {
  var node = createEmptyVNode();
  node.asyncFactory = factory;
  node.asyncMeta = { data: data, context: context, children: children, tag: tag };
  return node
}

function resolveAsyncComponent (
  factory,
  baseCtor
) {
  if (isTrue(factory.error) && isDef(factory.errorComp)) {
    return factory.errorComp
  }

  if (isDef(factory.resolved)) {
    return factory.resolved
  }

  var owner = currentRenderingInstance;
  if (owner && isDef(factory.owners) && factory.owners.indexOf(owner) === -1) {
    // already pending
    factory.owners.push(owner);
  }

  if (isTrue(factory.loading) && isDef(factory.loadingComp)) {
    return factory.loadingComp
  }

  if (owner && !isDef(factory.owners)) {
    var owners = factory.owners = [owner];
    var sync = true;
    var timerLoading = null;
    var timerTimeout = null

    ;(owner).$on('hook:destroyed', function () { return remove(owners, owner); });

    var forceRender = function (renderCompleted) {
      for (var i = 0, l = owners.length; i < l; i++) {
        (owners[i]).$forceUpdate();
      }

      if (renderCompleted) {
        owners.length = 0;
        if (timerLoading !== null) {
          clearTimeout(timerLoading);
          timerLoading = null;
        }
        if (timerTimeout !== null) {
          clearTimeout(timerTimeout);
          timerTimeout = null;
        }
      }
    };

    var resolve = once(function (res) {
      // cache resolved
      factory.resolved = ensureCtor(res, baseCtor);
      // invoke callbacks only if this is not a synchronous resolve
      // (async resolves are shimmed as synchronous during SSR)
      if (!sync) {
        forceRender(true);
      } else {
        owners.length = 0;
      }
    });

    var reject = once(function (reason) {
      warn(
        "Failed to resolve async component: " + (String(factory)) +
        (reason ? ("\nReason: " + reason) : '')
      );
      if (isDef(factory.errorComp)) {
        factory.error = true;
        forceRender(true);
      }
    });

    var res = factory(resolve, reject);

    if (isObject(res)) {
      if (isPromise(res)) {
        // () => Promise
        if (isUndef(factory.resolved)) {
          res.then(resolve, reject);
        }
      } else if (isPromise(res.component)) {
        res.component.then(resolve, reject);

        if (isDef(res.error)) {
          factory.errorComp = ensureCtor(res.error, baseCtor);
        }

        if (isDef(res.loading)) {
          factory.loadingComp = ensureCtor(res.loading, baseCtor);
          if (res.delay === 0) {
            factory.loading = true;
          } else {
            timerLoading = setTimeout(function () {
              timerLoading = null;
              if (isUndef(factory.resolved) && isUndef(factory.error)) {
                factory.loading = true;
                forceRender(false);
              }
            }, res.delay || 200);
          }
        }

        if (isDef(res.timeout)) {
          timerTimeout = setTimeout(function () {
            timerTimeout = null;
            if (isUndef(factory.resolved)) {
              reject(
                "timeout (" + (res.timeout) + "ms)"
              );
            }
          }, res.timeout);
        }
      }
    }

    sync = false;
    // return in case resolved synchronously
    return factory.loading
      ? factory.loadingComp
      : factory.resolved
  }
}

/*  */

function isAsyncPlaceholder (node) {
  return node.isComment && node.asyncFactory
}

/*  */

function getFirstComponentChild (children) {
  if (Array.isArray(children)) {
    for (var i = 0; i < children.length; i++) {
      var c = children[i];
      if (isDef(c) && (isDef(c.componentOptions) || isAsyncPlaceholder(c))) {
        return c
      }
    }
  }
}

/*  */

/*  */

function initEvents (vm) {
  vm._events = Object.create(null);
  vm._hasHookEvent = false;
  // init parent attached events
  var listeners = vm.$options._parentListeners;
  if (listeners) {
    updateComponentListeners(vm, listeners);
  }
}

var target;

function add (event, fn) {
  target.$on(event, fn);
}

function remove$1 (event, fn) {
  target.$off(event, fn);
}

function createOnceHandler (event, fn) {
  var _target = target;
  return function onceHandler () {
    var res = fn.apply(null, arguments);
    if (res !== null) {
      _target.$off(event, onceHandler);
    }
  }
}

function updateComponentListeners (
  vm,
  listeners,
  oldListeners
) {
  target = vm;
  updateListeners(listeners, oldListeners || {}, add, remove$1, createOnceHandler, vm);
  target = undefined;
}

function eventsMixin (Vue) {
  var hookRE = /^hook:/;
  Vue.prototype.$on = function (event, fn) {
    var vm = this;
    if (Array.isArray(event)) {
      for (var i = 0, l = event.length; i < l; i++) {
        vm.$on(event[i], fn);
      }
    } else {
      (vm._events[event] || (vm._events[event] = [])).push(fn);
      // optimize hook:event cost by using a boolean flag marked at registration
      // instead of a hash lookup
      if (hookRE.test(event)) {
        vm._hasHookEvent = true;
      }
    }
    return vm
  };

  Vue.prototype.$once = function (event, fn) {
    var vm = this;
    function on () {
      vm.$off(event, on);
      fn.apply(vm, arguments);
    }
    on.fn = fn;
    vm.$on(event, on);
    return vm
  };

  Vue.prototype.$off = function (event, fn) {
    var vm = this;
    // all
    if (!arguments.length) {
      vm._events = Object.create(null);
      return vm
    }
    // array of events
    if (Array.isArray(event)) {
      for (var i$1 = 0, l = event.length; i$1 < l; i$1++) {
        vm.$off(event[i$1], fn);
      }
      return vm
    }
    // specific event
    var cbs = vm._events[event];
    if (!cbs) {
      return vm
    }
    if (!fn) {
      vm._events[event] = null;
      return vm
    }
    // specific handler
    var cb;
    var i = cbs.length;
    while (i--) {
      cb = cbs[i];
      if (cb === fn || cb.fn === fn) {
        cbs.splice(i, 1);
        break
      }
    }
    return vm
  };

  Vue.prototype.$emit = function (event) {
    var vm = this;
    {
      var lowerCaseEvent = event.toLowerCase();
      if (lowerCaseEvent !== event && vm._events[lowerCaseEvent]) {
        tip(
          "Event \"" + lowerCaseEvent + "\" is emitted in component " +
          (formatComponentName(vm)) + " but the handler is registered for \"" + event + "\". " +
          "Note that HTML attributes are case-insensitive and you cannot use " +
          "v-on to listen to camelCase events when using in-DOM templates. " +
          "You should probably use \"" + (hyphenate(event)) + "\" instead of \"" + event + "\"."
        );
      }
    }
    var cbs = vm._events[event];
    if (cbs) {
      cbs = cbs.length > 1 ? toArray(cbs) : cbs;
      var args = toArray(arguments, 1);
      var info = "event handler for \"" + event + "\"";
      for (var i = 0, l = cbs.length; i < l; i++) {
        invokeWithErrorHandling(cbs[i], vm, args, vm, info);
      }
    }
    return vm
  };
}

/*  */

var activeInstance = null;
var isUpdatingChildComponent = false;

function setActiveInstance(vm) {
  var prevActiveInstance = activeInstance;
  activeInstance = vm;
  return function () {
    activeInstance = prevActiveInstance;
  }
}

function initLifecycle (vm) {
  var options = vm.$options;

  // locate first non-abstract parent
  var parent = options.parent;
  if (parent && !options.abstract) {
    while (parent.$options.abstract && parent.$parent) {
      parent = parent.$parent;
    }
    parent.$children.push(vm);
  }

  vm.$parent = parent;
  vm.$root = parent ? parent.$root : vm;

  vm.$children = [];
  vm.$refs = {};

  vm._watcher = null;
  vm._inactive = null;
  vm._directInactive = false;
  vm._isMounted = false;
  vm._isDestroyed = false;
  vm._isBeingDestroyed = false;
}

function lifecycleMixin (Vue) {
  Vue.prototype._update = function (vnode, hydrating) {
    var vm = this;
    var prevEl = vm.$el;
    var prevVnode = vm._vnode;
    var restoreActiveInstance = setActiveInstance(vm);
    vm._vnode = vnode;
    // Vue.prototype.__patch__ is injected in entry points
    // based on the rendering backend used.
    if (!prevVnode) {
      // initial render
      vm.$el = vm.__patch__(vm.$el, vnode, hydrating, false /* removeOnly */);
    } else {
      // updates
      vm.$el = vm.__patch__(prevVnode, vnode);
    }
    restoreActiveInstance();
    // update __vue__ reference
    if (prevEl) {
      prevEl.__vue__ = null;
    }
    if (vm.$el) {
      vm.$el.__vue__ = vm;
    }
    // if parent is an HOC, update its $el as well
    if (vm.$vnode && vm.$parent && vm.$vnode === vm.$parent._vnode) {
      vm.$parent.$el = vm.$el;
    }
    // updated hook is called by the scheduler to ensure that children are
    // updated in a parent's updated hook.
  };

  Vue.prototype.$forceUpdate = function () {
    var vm = this;
    if (vm._watcher) {
      vm._watcher.update();
    }
  };

  Vue.prototype.$destroy = function () {
    var vm = this;
    if (vm._isBeingDestroyed) {
      return
    }
    callHook(vm, 'beforeDestroy');
    vm._isBeingDestroyed = true;
    // remove self from parent
    var parent = vm.$parent;
    if (parent && !parent._isBeingDestroyed && !vm.$options.abstract) {
      remove(parent.$children, vm);
    }
    // teardown watchers
    if (vm._watcher) {
      vm._watcher.teardown();
    }
    var i = vm._watchers.length;
    while (i--) {
      vm._watchers[i].teardown();
    }
    // remove reference from data ob
    // frozen object may not have observer.
    if (vm._data.__ob__) {
      vm._data.__ob__.vmCount--;
    }
    // call the last hook...
    vm._isDestroyed = true;
    // invoke destroy hooks on current rendered tree
    vm.__patch__(vm._vnode, null);
    // fire destroyed hook
    callHook(vm, 'destroyed');
    // turn off all instance listeners.
    vm.$off();
    // remove __vue__ reference
    if (vm.$el) {
      vm.$el.__vue__ = null;
    }
    // release circular reference (#6759)
    if (vm.$vnode) {
      vm.$vnode.parent = null;
    }
  };
}

function mountComponent (
  vm,
  el,
  hydrating
) {
  vm.$el = el;
  if (!vm.$options.render) {
    vm.$options.render = createEmptyVNode;
    {
      /* istanbul ignore if */
      if ((vm.$options.template && vm.$options.template.charAt(0) !== '#') ||
        vm.$options.el || el) {
        warn(
          'You are using the runtime-only build of Vue where the template ' +
          'compiler is not available. Either pre-compile the templates into ' +
          'render functions, or use the compiler-included build.',
          vm
        );
      } else {
        warn(
          'Failed to mount component: template or render function not defined.',
          vm
        );
      }
    }
  }
  callHook(vm, 'beforeMount');

  var updateComponent;
  /* istanbul ignore if */
  if (config.performance && mark) {
    updateComponent = function () {
      var name = vm._name;
      var id = vm._uid;
      var startTag = "vue-perf-start:" + id;
      var endTag = "vue-perf-end:" + id;

      mark(startTag);
      var vnode = vm._render();
      mark(endTag);
      measure(("vue " + name + " render"), startTag, endTag);

      mark(startTag);
      vm._update(vnode, hydrating);
      mark(endTag);
      measure(("vue " + name + " patch"), startTag, endTag);
    };
  } else {
    updateComponent = function () {
      vm._update(vm._render(), hydrating);
    };
  }

  // we set this to vm._watcher inside the watcher's constructor
  // since the watcher's initial patch may call $forceUpdate (e.g. inside child
  // component's mounted hook), which relies on vm._watcher being already defined
  new Watcher(vm, updateComponent, noop, {
    before: function before () {
      if (vm._isMounted && !vm._isDestroyed) {
        callHook(vm, 'beforeUpdate');
      }
    }
  }, true /* isRenderWatcher */);
  hydrating = false;

  // manually mounted instance, call mounted on self
  // mounted is called for render-created child components in its inserted hook
  if (vm.$vnode == null) {
    vm._isMounted = true;
    callHook(vm, 'mounted');
  }
  return vm
}

function updateChildComponent (
  vm,
  propsData,
  listeners,
  parentVnode,
  renderChildren
) {
  {
    isUpdatingChildComponent = true;
  }

  // determine whether component has slot children
  // we need to do this before overwriting $options._renderChildren.

  // check if there are dynamic scopedSlots (hand-written or compiled but with
  // dynamic slot names). Static scoped slots compiled from template has the
  // "$stable" marker.
  var newScopedSlots = parentVnode.data.scopedSlots;
  var oldScopedSlots = vm.$scopedSlots;
  var hasDynamicScopedSlot = !!(
    (newScopedSlots && !newScopedSlots.$stable) ||
    (oldScopedSlots !== emptyObject && !oldScopedSlots.$stable) ||
    (newScopedSlots && vm.$scopedSlots.$key !== newScopedSlots.$key)
  );

  // Any static slot children from the parent may have changed during parent's
  // update. Dynamic scoped slots may also have changed. In such cases, a forced
  // update is necessary to ensure correctness.
  var needsForceUpdate = !!(
    renderChildren ||               // has new static slots
    vm.$options._renderChildren ||  // has old static slots
    hasDynamicScopedSlot
  );

  vm.$options._parentVnode = parentVnode;
  vm.$vnode = parentVnode; // update vm's placeholder node without re-render

  if (vm._vnode) { // update child tree's parent
    vm._vnode.parent = parentVnode;
  }
  vm.$options._renderChildren = renderChildren;

  // update $attrs and $listeners hash
  // these are also reactive so they may trigger child update if the child
  // used them during render
  vm.$attrs = parentVnode.data.attrs || emptyObject;
  vm.$listeners = listeners || emptyObject;

  // update props
  if (propsData && vm.$options.props) {
    toggleObserving(false);
    var props = vm._props;
    var propKeys = vm.$options._propKeys || [];
    for (var i = 0; i < propKeys.length; i++) {
      var key = propKeys[i];
      var propOptions = vm.$options.props; // wtf flow?
      props[key] = validateProp(key, propOptions, propsData, vm);
    }
    toggleObserving(true);
    // keep a copy of raw propsData
    vm.$options.propsData = propsData;
  }

  // update listeners
  listeners = listeners || emptyObject;
  var oldListeners = vm.$options._parentListeners;
  vm.$options._parentListeners = listeners;
  updateComponentListeners(vm, listeners, oldListeners);

  // resolve slots + force update if has children
  if (needsForceUpdate) {
    vm.$slots = resolveSlots(renderChildren, parentVnode.context);
    vm.$forceUpdate();
  }

  {
    isUpdatingChildComponent = false;
  }
}

function isInInactiveTree (vm) {
  while (vm && (vm = vm.$parent)) {
    if (vm._inactive) { return true }
  }
  return false
}

function activateChildComponent (vm, direct) {
  if (direct) {
    vm._directInactive = false;
    if (isInInactiveTree(vm)) {
      return
    }
  } else if (vm._directInactive) {
    return
  }
  if (vm._inactive || vm._inactive === null) {
    vm._inactive = false;
    for (var i = 0; i < vm.$children.length; i++) {
      activateChildComponent(vm.$children[i]);
    }
    callHook(vm, 'activated');
  }
}

function deactivateChildComponent (vm, direct) {
  if (direct) {
    vm._directInactive = true;
    if (isInInactiveTree(vm)) {
      return
    }
  }
  if (!vm._inactive) {
    vm._inactive = true;
    for (var i = 0; i < vm.$children.length; i++) {
      deactivateChildComponent(vm.$children[i]);
    }
    callHook(vm, 'deactivated');
  }
}

function callHook (vm, hook) {
  // #7573 disable dep collection when invoking lifecycle hooks
  pushTarget();
  var handlers = vm.$options[hook];
  var info = hook + " hook";
  if (handlers) {
    for (var i = 0, j = handlers.length; i < j; i++) {
      invokeWithErrorHandling(handlers[i], vm, null, vm, info);
    }
  }
  if (vm._hasHookEvent) {
    vm.$emit('hook:' + hook);
  }
  popTarget();
}

/*  */

var MAX_UPDATE_COUNT = 100;

var queue = [];
var activatedChildren = [];
var has = {};
var circular = {};
var waiting = false;
var flushing = false;
var index = 0;

/**
 * Reset the scheduler's state.
 */
function resetSchedulerState () {
  index = queue.length = activatedChildren.length = 0;
  has = {};
  {
    circular = {};
  }
  waiting = flushing = false;
}

// Async edge case #6566 requires saving the timestamp when event listeners are
// attached. However, calling performance.now() has a perf overhead especially
// if the page has thousands of event listeners. Instead, we take a timestamp
// every time the scheduler flushes and use that for all event listeners
// attached during that flush.
var currentFlushTimestamp = 0;

// Async edge case fix requires storing an event listener's attach timestamp.
var getNow = Date.now;

// Determine what event timestamp the browser is using. Annoyingly, the
// timestamp can either be hi-res (relative to page load) or low-res
// (relative to UNIX epoch), so in order to compare time we have to use the
// same timestamp type when saving the flush timestamp.
// All IE versions use low-res event timestamps, and have problematic clock
// implementations (#9632)
if (inBrowser && !isIE) {
  var performance = window.performance;
  if (
    performance &&
    typeof performance.now === 'function' &&
    getNow() > document.createEvent('Event').timeStamp
  ) {
    // if the event timestamp, although evaluated AFTER the Date.now(), is
    // smaller than it, it means the event is using a hi-res timestamp,
    // and we need to use the hi-res version for event listener timestamps as
    // well.
    getNow = function () { return performance.now(); };
  }
}

/**
 * Flush both queues and run the watchers.
 */
function flushSchedulerQueue () {
  currentFlushTimestamp = getNow();
  flushing = true;
  var watcher, id;

  // Sort queue before flush.
  // This ensures that:
  // 1. Components are updated from parent to child. (because parent is always
  //    created before the child)
  // 2. A component's user watchers are run before its render watcher (because
  //    user watchers are created before the render watcher)
  // 3. If a component is destroyed during a parent component's watcher run,
  //    its watchers can be skipped.
  queue.sort(function (a, b) { return a.id - b.id; });

  // do not cache length because more watchers might be pushed
  // as we run existing watchers
  for (index = 0; index < queue.length; index++) {
    watcher = queue[index];
    if (watcher.before) {
      watcher.before();
    }
    id = watcher.id;
    has[id] = null;
    watcher.run();
    // in dev build, check and stop circular updates.
    if (has[id] != null) {
      circular[id] = (circular[id] || 0) + 1;
      if (circular[id] > MAX_UPDATE_COUNT) {
        warn(
          'You may have an infinite update loop ' + (
            watcher.user
              ? ("in watcher with expression \"" + (watcher.expression) + "\"")
              : "in a component render function."
          ),
          watcher.vm
        );
        break
      }
    }
  }

  // keep copies of post queues before resetting state
  var activatedQueue = activatedChildren.slice();
  var updatedQueue = queue.slice();

  resetSchedulerState();

  // call component updated and activated hooks
  callActivatedHooks(activatedQueue);
  callUpdatedHooks(updatedQueue);

  // devtool hook
  /* istanbul ignore if */
  if (devtools && config.devtools) {
    devtools.emit('flush');
  }
}

function callUpdatedHooks (queue) {
  var i = queue.length;
  while (i--) {
    var watcher = queue[i];
    var vm = watcher.vm;
    if (vm._watcher === watcher && vm._isMounted && !vm._isDestroyed) {
      callHook(vm, 'updated');
    }
  }
}

/**
 * Queue a kept-alive component that was activated during patch.
 * The queue will be processed after the entire tree has been patched.
 */
function queueActivatedComponent (vm) {
  // setting _inactive to false here so that a render function can
  // rely on checking whether it's in an inactive tree (e.g. router-view)
  vm._inactive = false;
  activatedChildren.push(vm);
}

function callActivatedHooks (queue) {
  for (var i = 0; i < queue.length; i++) {
    queue[i]._inactive = true;
    activateChildComponent(queue[i], true /* true */);
  }
}

/**
 * Push a watcher into the watcher queue.
 * Jobs with duplicate IDs will be skipped unless it's
 * pushed when the queue is being flushed.
 */
function queueWatcher (watcher) {
  var id = watcher.id;
  if (has[id] == null) {
    has[id] = true;
    if (!flushing) {
      queue.push(watcher);
    } else {
      // if already flushing, splice the watcher based on its id
      // if already past its id, it will be run next immediately.
      var i = queue.length - 1;
      while (i > index && queue[i].id > watcher.id) {
        i--;
      }
      queue.splice(i + 1, 0, watcher);
    }
    // queue the flush
    if (!waiting) {
      waiting = true;

      if (!config.async) {
        flushSchedulerQueue();
        return
      }
      nextTick(flushSchedulerQueue);
    }
  }
}

/*  */



var uid$2 = 0;

/**
 * A watcher parses an expression, collects dependencies,
 * and fires callback when the expression value changes.
 * This is used for both the $watch() api and directives.
 */
var Watcher = function Watcher (
  vm,
  expOrFn,
  cb,
  options,
  isRenderWatcher
) {
  this.vm = vm;
  if (isRenderWatcher) {
    vm._watcher = this;
  }
  vm._watchers.push(this);
  // options
  if (options) {
    this.deep = !!options.deep;
    this.user = !!options.user;
    this.lazy = !!options.lazy;
    this.sync = !!options.sync;
    this.before = options.before;
  } else {
    this.deep = this.user = this.lazy = this.sync = false;
  }
  this.cb = cb;
  this.id = ++uid$2; // uid for batching
  this.active = true;
  this.dirty = this.lazy; // for lazy watchers
  this.deps = [];
  this.newDeps = [];
  this.depIds = new _Set();
  this.newDepIds = new _Set();
  this.expression = expOrFn.toString();
  // parse expression for getter
  if (typeof expOrFn === 'function') {
    this.getter = expOrFn;
  } else {
    this.getter = parsePath(expOrFn);
    if (!this.getter) {
      this.getter = noop;
      warn(
        "Failed watching path: \"" + expOrFn + "\" " +
        'Watcher only accepts simple dot-delimited paths. ' +
        'For full control, use a function instead.',
        vm
      );
    }
  }
  this.value = this.lazy
    ? undefined
    : this.get();
};

/**
 * Evaluate the getter, and re-collect dependencies.
 */
Watcher.prototype.get = function get () {
  pushTarget(this);
  var value;
  var vm = this.vm;
  try {
    value = this.getter.call(vm, vm);
  } catch (e) {
    if (this.user) {
      handleError(e, vm, ("getter for watcher \"" + (this.expression) + "\""));
    } else {
      throw e
    }
  } finally {
    // "touch" every property so they are all tracked as
    // dependencies for deep watching
    if (this.deep) {
      traverse(value);
    }
    popTarget();
    this.cleanupDeps();
  }
  return value
};

/**
 * Add a dependency to this directive.
 */
Watcher.prototype.addDep = function addDep (dep) {
  var id = dep.id;
  if (!this.newDepIds.has(id)) {
    this.newDepIds.add(id);
    this.newDeps.push(dep);
    if (!this.depIds.has(id)) {
      dep.addSub(this);
    }
  }
};

/**
 * Clean up for dependency collection.
 */
Watcher.prototype.cleanupDeps = function cleanupDeps () {
  var i = this.deps.length;
  while (i--) {
    var dep = this.deps[i];
    if (!this.newDepIds.has(dep.id)) {
      dep.removeSub(this);
    }
  }
  var tmp = this.depIds;
  this.depIds = this.newDepIds;
  this.newDepIds = tmp;
  this.newDepIds.clear();
  tmp = this.deps;
  this.deps = this.newDeps;
  this.newDeps = tmp;
  this.newDeps.length = 0;
};

/**
 * Subscriber interface.
 * Will be called when a dependency changes.
 */
Watcher.prototype.update = function update () {
  /* istanbul ignore else */
  if (this.lazy) {
    this.dirty = true;
  } else if (this.sync) {
    this.run();
  } else {
    queueWatcher(this);
  }
};

/**
 * Scheduler job interface.
 * Will be called by the scheduler.
 */
Watcher.prototype.run = function run () {
  if (this.active) {
    var value = this.get();
    if (
      value !== this.value ||
      // Deep watchers and watchers on Object/Arrays should fire even
      // when the value is the same, because the value may
      // have mutated.
      isObject(value) ||
      this.deep
    ) {
      // set new value
      var oldValue = this.value;
      this.value = value;
      if (this.user) {
        try {
          this.cb.call(this.vm, value, oldValue);
        } catch (e) {
          handleError(e, this.vm, ("callback for watcher \"" + (this.expression) + "\""));
        }
      } else {
        this.cb.call(this.vm, value, oldValue);
      }
    }
  }
};

/**
 * Evaluate the value of the watcher.
 * This only gets called for lazy watchers.
 */
Watcher.prototype.evaluate = function evaluate () {
  this.value = this.get();
  this.dirty = false;
};

/**
 * Depend on all deps collected by this watcher.
 */
Watcher.prototype.depend = function depend () {
  var i = this.deps.length;
  while (i--) {
    this.deps[i].depend();
  }
};

/**
 * Remove self from all dependencies' subscriber list.
 */
Watcher.prototype.teardown = function teardown () {
  if (this.active) {
    // remove self from vm's watcher list
    // this is a somewhat expensive operation so we skip it
    // if the vm is being destroyed.
    if (!this.vm._isBeingDestroyed) {
      remove(this.vm._watchers, this);
    }
    var i = this.deps.length;
    while (i--) {
      this.deps[i].removeSub(this);
    }
    this.active = false;
  }
};

/*  */

var sharedPropertyDefinition = {
  enumerable: true,
  configurable: true,
  get: noop,
  set: noop
};

function proxy (target, sourceKey, key) {
  sharedPropertyDefinition.get = function proxyGetter () {
    return this[sourceKey][key]
  };
  sharedPropertyDefinition.set = function proxySetter (val) {
    this[sourceKey][key] = val;
  };
  Object.defineProperty(target, key, sharedPropertyDefinition);
}

function initState (vm) {
  vm._watchers = [];
  var opts = vm.$options;
  if (opts.props) { initProps(vm, opts.props); }
  if (opts.methods) { initMethods(vm, opts.methods); }
  if (opts.data) {
    initData(vm);
  } else {
    observe(vm._data = {}, true /* asRootData */);
  }
  if (opts.computed) { initComputed(vm, opts.computed); }
  if (opts.watch && opts.watch !== nativeWatch) {
    initWatch(vm, opts.watch);
  }
}

function initProps (vm, propsOptions) {
  var propsData = vm.$options.propsData || {};
  var props = vm._props = {};
  // cache prop keys so that future props updates can iterate using Array
  // instead of dynamic object key enumeration.
  var keys = vm.$options._propKeys = [];
  var isRoot = !vm.$parent;
  // root instance props should be converted
  if (!isRoot) {
    toggleObserving(false);
  }
  var loop = function ( key ) {
    keys.push(key);
    var value = validateProp(key, propsOptions, propsData, vm);
    /* istanbul ignore else */
    {
      var hyphenatedKey = hyphenate(key);
      if (isReservedAttribute(hyphenatedKey) ||
          config.isReservedAttr(hyphenatedKey)) {
        warn(
          ("\"" + hyphenatedKey + "\" is a reserved attribute and cannot be used as component prop."),
          vm
        );
      }
      defineReactive$$1(props, key, value, function () {
        if (!isRoot && !isUpdatingChildComponent) {
          warn(
            "Avoid mutating a prop directly since the value will be " +
            "overwritten whenever the parent component re-renders. " +
            "Instead, use a data or computed property based on the prop's " +
            "value. Prop being mutated: \"" + key + "\"",
            vm
          );
        }
      });
    }
    // static props are already proxied on the component's prototype
    // during Vue.extend(). We only need to proxy props defined at
    // instantiation here.
    if (!(key in vm)) {
      proxy(vm, "_props", key);
    }
  };

  for (var key in propsOptions) loop( key );
  toggleObserving(true);
}

function initData (vm) {
  var data = vm.$options.data;
  data = vm._data = typeof data === 'function'
    ? getData(data, vm)
    : data || {};
  if (!isPlainObject(data)) {
    data = {};
    warn(
      'data functions should return an object:\n' +
      'https://vuejs.org/v2/guide/components.html#data-Must-Be-a-Function',
      vm
    );
  }
  // proxy data on instance
  var keys = Object.keys(data);
  var props = vm.$options.props;
  var methods = vm.$options.methods;
  var i = keys.length;
  while (i--) {
    var key = keys[i];
    {
      if (methods && hasOwn(methods, key)) {
        warn(
          ("Method \"" + key + "\" has already been defined as a data property."),
          vm
        );
      }
    }
    if (props && hasOwn(props, key)) {
      warn(
        "The data property \"" + key + "\" is already declared as a prop. " +
        "Use prop default value instead.",
        vm
      );
    } else if (!isReserved(key)) {
      proxy(vm, "_data", key);
    }
  }
  // observe data
  observe(data, true /* asRootData */);
}

function getData (data, vm) {
  // #7573 disable dep collection when invoking data getters
  pushTarget();
  try {
    return data.call(vm, vm)
  } catch (e) {
    handleError(e, vm, "data()");
    return {}
  } finally {
    popTarget();
  }
}

var computedWatcherOptions = { lazy: true };

function initComputed (vm, computed) {
  // $flow-disable-line
  var watchers = vm._computedWatchers = Object.create(null);
  // computed properties are just getters during SSR
  var isSSR = isServerRendering();

  for (var key in computed) {
    var userDef = computed[key];
    var getter = typeof userDef === 'function' ? userDef : userDef.get;
    if (getter == null) {
      warn(
        ("Getter is missing for computed property \"" + key + "\"."),
        vm
      );
    }

    if (!isSSR) {
      // create internal watcher for the computed property.
      watchers[key] = new Watcher(
        vm,
        getter || noop,
        noop,
        computedWatcherOptions
      );
    }

    // component-defined computed properties are already defined on the
    // component prototype. We only need to define computed properties defined
    // at instantiation here.
    if (!(key in vm)) {
      defineComputed(vm, key, userDef);
    } else {
      if (key in vm.$data) {
        warn(("The computed property \"" + key + "\" is already defined in data."), vm);
      } else if (vm.$options.props && key in vm.$options.props) {
        warn(("The computed property \"" + key + "\" is already defined as a prop."), vm);
      }
    }
  }
}

function defineComputed (
  target,
  key,
  userDef
) {
  var shouldCache = !isServerRendering();
  if (typeof userDef === 'function') {
    sharedPropertyDefinition.get = shouldCache
      ? createComputedGetter(key)
      : createGetterInvoker(userDef);
    sharedPropertyDefinition.set = noop;
  } else {
    sharedPropertyDefinition.get = userDef.get
      ? shouldCache && userDef.cache !== false
        ? createComputedGetter(key)
        : createGetterInvoker(userDef.get)
      : noop;
    sharedPropertyDefinition.set = userDef.set || noop;
  }
  if (sharedPropertyDefinition.set === noop) {
    sharedPropertyDefinition.set = function () {
      warn(
        ("Computed property \"" + key + "\" was assigned to but it has no setter."),
        this
      );
    };
  }
  Object.defineProperty(target, key, sharedPropertyDefinition);
}

function createComputedGetter (key) {
  return function computedGetter () {
    var watcher = this._computedWatchers && this._computedWatchers[key];
    if (watcher) {
      if (watcher.dirty) {
        watcher.evaluate();
      }
      if (Dep.target) {
        watcher.depend();
      }
      return watcher.value
    }
  }
}

function createGetterInvoker(fn) {
  return function computedGetter () {
    return fn.call(this, this)
  }
}

function initMethods (vm, methods) {
  var props = vm.$options.props;
  for (var key in methods) {
    {
      if (typeof methods[key] !== 'function') {
        warn(
          "Method \"" + key + "\" has type \"" + (typeof methods[key]) + "\" in the component definition. " +
          "Did you reference the function correctly?",
          vm
        );
      }
      if (props && hasOwn(props, key)) {
        warn(
          ("Method \"" + key + "\" has already been defined as a prop."),
          vm
        );
      }
      if ((key in vm) && isReserved(key)) {
        warn(
          "Method \"" + key + "\" conflicts with an existing Vue instance method. " +
          "Avoid defining component methods that start with _ or $."
        );
      }
    }
    vm[key] = typeof methods[key] !== 'function' ? noop : bind(methods[key], vm);
  }
}

function initWatch (vm, watch) {
  for (var key in watch) {
    var handler = watch[key];
    if (Array.isArray(handler)) {
      for (var i = 0; i < handler.length; i++) {
        createWatcher(vm, key, handler[i]);
      }
    } else {
      createWatcher(vm, key, handler);
    }
  }
}

function createWatcher (
  vm,
  expOrFn,
  handler,
  options
) {
  if (isPlainObject(handler)) {
    options = handler;
    handler = handler.handler;
  }
  if (typeof handler === 'string') {
    handler = vm[handler];
  }
  return vm.$watch(expOrFn, handler, options)
}

function stateMixin (Vue) {
  // flow somehow has problems with directly declared definition object
  // when using Object.defineProperty, so we have to procedurally build up
  // the object here.
  var dataDef = {};
  dataDef.get = function () { return this._data };
  var propsDef = {};
  propsDef.get = function () { return this._props };
  {
    dataDef.set = function () {
      warn(
        'Avoid replacing instance root $data. ' +
        'Use nested data properties instead.',
        this
      );
    };
    propsDef.set = function () {
      warn("$props is readonly.", this);
    };
  }
  Object.defineProperty(Vue.prototype, '$data', dataDef);
  Object.defineProperty(Vue.prototype, '$props', propsDef);

  Vue.prototype.$set = set;
  Vue.prototype.$delete = del;

  Vue.prototype.$watch = function (
    expOrFn,
    cb,
    options
  ) {
    var vm = this;
    if (isPlainObject(cb)) {
      return createWatcher(vm, expOrFn, cb, options)
    }
    options = options || {};
    options.user = true;
    var watcher = new Watcher(vm, expOrFn, cb, options);
    if (options.immediate) {
      try {
        cb.call(vm, watcher.value);
      } catch (error) {
        handleError(error, vm, ("callback for immediate watcher \"" + (watcher.expression) + "\""));
      }
    }
    return function unwatchFn () {
      watcher.teardown();
    }
  };
}

/*  */

var uid$3 = 0;

function initMixin (Vue) {
  Vue.prototype._init = function (options) {
    var vm = this;
    // a uid
    vm._uid = uid$3++;

    var startTag, endTag;
    /* istanbul ignore if */
    if (config.performance && mark) {
      startTag = "vue-perf-start:" + (vm._uid);
      endTag = "vue-perf-end:" + (vm._uid);
      mark(startTag);
    }

    // a flag to avoid this being observed
    vm._isVue = true;
    // merge options
    if (options && options._isComponent) {
      // optimize internal component instantiation
      // since dynamic options merging is pretty slow, and none of the
      // internal component options needs special treatment.
      initInternalComponent(vm, options);
    } else {
      vm.$options = mergeOptions(
        resolveConstructorOptions(vm.constructor),
        options || {},
        vm
      );
    }
    /* istanbul ignore else */
    {
      initProxy(vm);
    }
    // expose real self
    vm._self = vm;
    initLifecycle(vm);
    initEvents(vm);
    initRender(vm);
    callHook(vm, 'beforeCreate');
    initInjections(vm); // resolve injections before data/props
    initState(vm);
    initProvide(vm); // resolve provide after data/props
    callHook(vm, 'created');

    /* istanbul ignore if */
    if (config.performance && mark) {
      vm._name = formatComponentName(vm, false);
      mark(endTag);
      measure(("vue " + (vm._name) + " init"), startTag, endTag);
    }

    if (vm.$options.el) {
      vm.$mount(vm.$options.el);
    }
  };
}

function initInternalComponent (vm, options) {
  var opts = vm.$options = Object.create(vm.constructor.options);
  // doing this because it's faster than dynamic enumeration.
  var parentVnode = options._parentVnode;
  opts.parent = options.parent;
  opts._parentVnode = parentVnode;

  var vnodeComponentOptions = parentVnode.componentOptions;
  opts.propsData = vnodeComponentOptions.propsData;
  opts._parentListeners = vnodeComponentOptions.listeners;
  opts._renderChildren = vnodeComponentOptions.children;
  opts._componentTag = vnodeComponentOptions.tag;

  if (options.render) {
    opts.render = options.render;
    opts.staticRenderFns = options.staticRenderFns;
  }
}

function resolveConstructorOptions (Ctor) {
  var options = Ctor.options;
  if (Ctor.super) {
    var superOptions = resolveConstructorOptions(Ctor.super);
    var cachedSuperOptions = Ctor.superOptions;
    if (superOptions !== cachedSuperOptions) {
      // super option changed,
      // need to resolve new options.
      Ctor.superOptions = superOptions;
      // check if there are any late-modified/attached options (#4976)
      var modifiedOptions = resolveModifiedOptions(Ctor);
      // update base extend options
      if (modifiedOptions) {
        extend(Ctor.extendOptions, modifiedOptions);
      }
      options = Ctor.options = mergeOptions(superOptions, Ctor.extendOptions);
      if (options.name) {
        options.components[options.name] = Ctor;
      }
    }
  }
  return options
}

function resolveModifiedOptions (Ctor) {
  var modified;
  var latest = Ctor.options;
  var sealed = Ctor.sealedOptions;
  for (var key in latest) {
    if (latest[key] !== sealed[key]) {
      if (!modified) { modified = {}; }
      modified[key] = latest[key];
    }
  }
  return modified
}

function Vue (options) {
  if (!(this instanceof Vue)
  ) {
    warn('Vue is a constructor and should be called with the `new` keyword');
  }
  this._init(options);
}

initMixin(Vue);
stateMixin(Vue);
eventsMixin(Vue);
lifecycleMixin(Vue);
renderMixin(Vue);

/*  */

function initUse (Vue) {
  Vue.use = function (plugin) {
    var installedPlugins = (this._installedPlugins || (this._installedPlugins = []));
    if (installedPlugins.indexOf(plugin) > -1) {
      return this
    }

    // additional parameters
    var args = toArray(arguments, 1);
    args.unshift(this);
    if (typeof plugin.install === 'function') {
      plugin.install.apply(plugin, args);
    } else if (typeof plugin === 'function') {
      plugin.apply(null, args);
    }
    installedPlugins.push(plugin);
    return this
  };
}

/*  */

function initMixin$1 (Vue) {
  Vue.mixin = function (mixin) {
    this.options = mergeOptions(this.options, mixin);
    return this
  };
}

/*  */

function initExtend (Vue) {
  /**
   * Each instance constructor, including Vue, has a unique
   * cid. This enables us to create wrapped "child
   * constructors" for prototypal inheritance and cache them.
   */
  Vue.cid = 0;
  var cid = 1;

  /**
   * Class inheritance
   */
  Vue.extend = function (extendOptions) {
    extendOptions = extendOptions || {};
    var Super = this;
    var SuperId = Super.cid;
    var cachedCtors = extendOptions._Ctor || (extendOptions._Ctor = {});
    if (cachedCtors[SuperId]) {
      return cachedCtors[SuperId]
    }

    var name = extendOptions.name || Super.options.name;
    if (name) {
      validateComponentName(name);
    }

    var Sub = function VueComponent (options) {
      this._init(options);
    };
    Sub.prototype = Object.create(Super.prototype);
    Sub.prototype.constructor = Sub;
    Sub.cid = cid++;
    Sub.options = mergeOptions(
      Super.options,
      extendOptions
    );
    Sub['super'] = Super;

    // For props and computed properties, we define the proxy getters on
    // the Vue instances at extension time, on the extended prototype. This
    // avoids Object.defineProperty calls for each instance created.
    if (Sub.options.props) {
      initProps$1(Sub);
    }
    if (Sub.options.computed) {
      initComputed$1(Sub);
    }

    // allow further extension/mixin/plugin usage
    Sub.extend = Super.extend;
    Sub.mixin = Super.mixin;
    Sub.use = Super.use;

    // create asset registers, so extended classes
    // can have their private assets too.
    ASSET_TYPES.forEach(function (type) {
      Sub[type] = Super[type];
    });
    // enable recursive self-lookup
    if (name) {
      Sub.options.components[name] = Sub;
    }

    // keep a reference to the super options at extension time.
    // later at instantiation we can check if Super's options have
    // been updated.
    Sub.superOptions = Super.options;
    Sub.extendOptions = extendOptions;
    Sub.sealedOptions = extend({}, Sub.options);

    // cache constructor
    cachedCtors[SuperId] = Sub;
    return Sub
  };
}

function initProps$1 (Comp) {
  var props = Comp.options.props;
  for (var key in props) {
    proxy(Comp.prototype, "_props", key);
  }
}

function initComputed$1 (Comp) {
  var computed = Comp.options.computed;
  for (var key in computed) {
    defineComputed(Comp.prototype, key, computed[key]);
  }
}

/*  */

function initAssetRegisters (Vue) {
  /**
   * Create asset registration methods.
   */
  ASSET_TYPES.forEach(function (type) {
    Vue[type] = function (
      id,
      definition
    ) {
      if (!definition) {
        return this.options[type + 's'][id]
      } else {
        /* istanbul ignore if */
        if (type === 'component') {
          validateComponentName(id);
        }
        if (type === 'component' && isPlainObject(definition)) {
          definition.name = definition.name || id;
          definition = this.options._base.extend(definition);
        }
        if (type === 'directive' && typeof definition === 'function') {
          definition = { bind: definition, update: definition };
        }
        this.options[type + 's'][id] = definition;
        return definition
      }
    };
  });
}

/*  */



function getComponentName (opts) {
  return opts && (opts.Ctor.options.name || opts.tag)
}

function matches (pattern, name) {
  if (Array.isArray(pattern)) {
    return pattern.indexOf(name) > -1
  } else if (typeof pattern === 'string') {
    return pattern.split(',').indexOf(name) > -1
  } else if (isRegExp(pattern)) {
    return pattern.test(name)
  }
  /* istanbul ignore next */
  return false
}

function pruneCache (keepAliveInstance, filter) {
  var cache = keepAliveInstance.cache;
  var keys = keepAliveInstance.keys;
  var _vnode = keepAliveInstance._vnode;
  for (var key in cache) {
    var cachedNode = cache[key];
    if (cachedNode) {
      var name = getComponentName(cachedNode.componentOptions);
      if (name && !filter(name)) {
        pruneCacheEntry(cache, key, keys, _vnode);
      }
    }
  }
}

function pruneCacheEntry (
  cache,
  key,
  keys,
  current
) {
  var cached$$1 = cache[key];
  if (cached$$1 && (!current || cached$$1.tag !== current.tag)) {
    cached$$1.componentInstance.$destroy();
  }
  cache[key] = null;
  remove(keys, key);
}

var patternTypes = [String, RegExp, Array];

var KeepAlive = {
  name: 'keep-alive',
  abstract: true,

  props: {
    include: patternTypes,
    exclude: patternTypes,
    max: [String, Number]
  },

  created: function created () {
    this.cache = Object.create(null);
    this.keys = [];
  },

  destroyed: function destroyed () {
    for (var key in this.cache) {
      pruneCacheEntry(this.cache, key, this.keys);
    }
  },

  mounted: function mounted () {
    var this$1 = this;

    this.$watch('include', function (val) {
      pruneCache(this$1, function (name) { return matches(val, name); });
    });
    this.$watch('exclude', function (val) {
      pruneCache(this$1, function (name) { return !matches(val, name); });
    });
  },

  render: function render () {
    var slot = this.$slots.default;
    var vnode = getFirstComponentChild(slot);
    var componentOptions = vnode && vnode.componentOptions;
    if (componentOptions) {
      // check pattern
      var name = getComponentName(componentOptions);
      var ref = this;
      var include = ref.include;
      var exclude = ref.exclude;
      if (
        // not included
        (include && (!name || !matches(include, name))) ||
        // excluded
        (exclude && name && matches(exclude, name))
      ) {
        return vnode
      }

      var ref$1 = this;
      var cache = ref$1.cache;
      var keys = ref$1.keys;
      var key = vnode.key == null
        // same constructor may get registered as different local components
        // so cid alone is not enough (#3269)
        ? componentOptions.Ctor.cid + (componentOptions.tag ? ("::" + (componentOptions.tag)) : '')
        : vnode.key;
      if (cache[key]) {
        vnode.componentInstance = cache[key].componentInstance;
        // make current key freshest
        remove(keys, key);
        keys.push(key);
      } else {
        cache[key] = vnode;
        keys.push(key);
        // prune oldest entry
        if (this.max && keys.length > parseInt(this.max)) {
          pruneCacheEntry(cache, keys[0], keys, this._vnode);
        }
      }

      vnode.data.keepAlive = true;
    }
    return vnode || (slot && slot[0])
  }
};

var builtInComponents = {
  KeepAlive: KeepAlive
};

/*  */

function initGlobalAPI (Vue) {
  // config
  var configDef = {};
  configDef.get = function () { return config; };
  {
    configDef.set = function () {
      warn(
        'Do not replace the Vue.config object, set individual fields instead.'
      );
    };
  }
  Object.defineProperty(Vue, 'config', configDef);

  // exposed util methods.
  // NOTE: these are not considered part of the public API - avoid relying on
  // them unless you are aware of the risk.
  Vue.util = {
    warn: warn,
    extend: extend,
    mergeOptions: mergeOptions,
    defineReactive: defineReactive$$1
  };

  Vue.set = set;
  Vue.delete = del;
  Vue.nextTick = nextTick;

  // 2.6 explicit observable API
  Vue.observable = function (obj) {
    observe(obj);
    return obj
  };

  Vue.options = Object.create(null);
  ASSET_TYPES.forEach(function (type) {
    Vue.options[type + 's'] = Object.create(null);
  });

  // this is used to identify the "base" constructor to extend all plain-object
  // components with in Weex's multi-instance scenarios.
  Vue.options._base = Vue;

  extend(Vue.options.components, builtInComponents);

  initUse(Vue);
  initMixin$1(Vue);
  initExtend(Vue);
  initAssetRegisters(Vue);
}

initGlobalAPI(Vue);

Object.defineProperty(Vue.prototype, '$isServer', {
  get: isServerRendering
});

Object.defineProperty(Vue.prototype, '$ssrContext', {
  get: function get () {
    /* istanbul ignore next */
    return this.$vnode && this.$vnode.ssrContext
  }
});

// expose FunctionalRenderContext for ssr runtime helper installation
Object.defineProperty(Vue, 'FunctionalRenderContext', {
  value: FunctionalRenderContext
});

Vue.version = '2.6.10';

/*  */

// these are reserved for web because they are directly compiled away
// during template compilation
var isReservedAttr = makeMap('style,class');

// attributes that should be using props for binding
var acceptValue = makeMap('input,textarea,option,select,progress');
var mustUseProp = function (tag, type, attr) {
  return (
    (attr === 'value' && acceptValue(tag)) && type !== 'button' ||
    (attr === 'selected' && tag === 'option') ||
    (attr === 'checked' && tag === 'input') ||
    (attr === 'muted' && tag === 'video')
  )
};

var isEnumeratedAttr = makeMap('contenteditable,draggable,spellcheck');

var isValidContentEditableValue = makeMap('events,caret,typing,plaintext-only');

var convertEnumeratedValue = function (key, value) {
  return isFalsyAttrValue(value) || value === 'false'
    ? 'false'
    // allow arbitrary string value for contenteditable
    : key === 'contenteditable' && isValidContentEditableValue(value)
      ? value
      : 'true'
};

var isBooleanAttr = makeMap(
  'allowfullscreen,async,autofocus,autoplay,checked,compact,controls,declare,' +
  'default,defaultchecked,defaultmuted,defaultselected,defer,disabled,' +
  'enabled,formnovalidate,hidden,indeterminate,inert,ismap,itemscope,loop,multiple,' +
  'muted,nohref,noresize,noshade,novalidate,nowrap,open,pauseonexit,readonly,' +
  'required,reversed,scoped,seamless,selected,sortable,translate,' +
  'truespeed,typemustmatch,visible'
);

var xlinkNS = 'http://www.w3.org/1999/xlink';

var isXlink = function (name) {
  return name.charAt(5) === ':' && name.slice(0, 5) === 'xlink'
};

var getXlinkProp = function (name) {
  return isXlink(name) ? name.slice(6, name.length) : ''
};

var isFalsyAttrValue = function (val) {
  return val == null || val === false
};

/*  */

function genClassForVnode (vnode) {
  var data = vnode.data;
  var parentNode = vnode;
  var childNode = vnode;
  while (isDef(childNode.componentInstance)) {
    childNode = childNode.componentInstance._vnode;
    if (childNode && childNode.data) {
      data = mergeClassData(childNode.data, data);
    }
  }
  while (isDef(parentNode = parentNode.parent)) {
    if (parentNode && parentNode.data) {
      data = mergeClassData(data, parentNode.data);
    }
  }
  return renderClass(data.staticClass, data.class)
}

function mergeClassData (child, parent) {
  return {
    staticClass: concat(child.staticClass, parent.staticClass),
    class: isDef(child.class)
      ? [child.class, parent.class]
      : parent.class
  }
}

function renderClass (
  staticClass,
  dynamicClass
) {
  if (isDef(staticClass) || isDef(dynamicClass)) {
    return concat(staticClass, stringifyClass(dynamicClass))
  }
  /* istanbul ignore next */
  return ''
}

function concat (a, b) {
  return a ? b ? (a + ' ' + b) : a : (b || '')
}

function stringifyClass (value) {
  if (Array.isArray(value)) {
    return stringifyArray(value)
  }
  if (isObject(value)) {
    return stringifyObject(value)
  }
  if (typeof value === 'string') {
    return value
  }
  /* istanbul ignore next */
  return ''
}

function stringifyArray (value) {
  var res = '';
  var stringified;
  for (var i = 0, l = value.length; i < l; i++) {
    if (isDef(stringified = stringifyClass(value[i])) && stringified !== '') {
      if (res) { res += ' '; }
      res += stringified;
    }
  }
  return res
}

function stringifyObject (value) {
  var res = '';
  for (var key in value) {
    if (value[key]) {
      if (res) { res += ' '; }
      res += key;
    }
  }
  return res
}

/*  */

var namespaceMap = {
  svg: 'http://www.w3.org/2000/svg',
  math: 'http://www.w3.org/1998/Math/MathML'
};

var isHTMLTag = makeMap(
  'html,body,base,head,link,meta,style,title,' +
  'address,article,aside,footer,header,h1,h2,h3,h4,h5,h6,hgroup,nav,section,' +
  'div,dd,dl,dt,figcaption,figure,picture,hr,img,li,main,ol,p,pre,ul,' +
  'a,b,abbr,bdi,bdo,br,cite,code,data,dfn,em,i,kbd,mark,q,rp,rt,rtc,ruby,' +
  's,samp,small,span,strong,sub,sup,time,u,var,wbr,area,audio,map,track,video,' +
  'embed,object,param,source,canvas,script,noscript,del,ins,' +
  'caption,col,colgroup,table,thead,tbody,td,th,tr,' +
  'button,datalist,fieldset,form,input,label,legend,meter,optgroup,option,' +
  'output,progress,select,textarea,' +
  'details,dialog,menu,menuitem,summary,' +
  'content,element,shadow,template,blockquote,iframe,tfoot'
);

// this map is intentionally selective, only covering SVG elements that may
// contain child elements.
var isSVG = makeMap(
  'svg,animate,circle,clippath,cursor,defs,desc,ellipse,filter,font-face,' +
  'foreignObject,g,glyph,image,line,marker,mask,missing-glyph,path,pattern,' +
  'polygon,polyline,rect,switch,symbol,text,textpath,tspan,use,view',
  true
);

var isPreTag = function (tag) { return tag === 'pre'; };

var isReservedTag = function (tag) {
  return isHTMLTag(tag) || isSVG(tag)
};

function getTagNamespace (tag) {
  if (isSVG(tag)) {
    return 'svg'
  }
  // basic support for MathML
  // note it doesn't support other MathML elements being component roots
  if (tag === 'math') {
    return 'math'
  }
}

var unknownElementCache = Object.create(null);
function isUnknownElement (tag) {
  /* istanbul ignore if */
  if (!inBrowser) {
    return true
  }
  if (isReservedTag(tag)) {
    return false
  }
  tag = tag.toLowerCase();
  /* istanbul ignore if */
  if (unknownElementCache[tag] != null) {
    return unknownElementCache[tag]
  }
  var el = document.createElement(tag);
  if (tag.indexOf('-') > -1) {
    // http://stackoverflow.com/a/28210364/1070244
    return (unknownElementCache[tag] = (
      el.constructor === window.HTMLUnknownElement ||
      el.constructor === window.HTMLElement
    ))
  } else {
    return (unknownElementCache[tag] = /HTMLUnknownElement/.test(el.toString()))
  }
}

var isTextInputType = makeMap('text,number,password,search,email,tel,url');

/*  */

/**
 * Query an element selector if it's not an element already.
 */
function query (el) {
  if (typeof el === 'string') {
    var selected = document.querySelector(el);
    if (!selected) {
      warn(
        'Cannot find element: ' + el
      );
      return document.createElement('div')
    }
    return selected
  } else {
    return el
  }
}

/*  */

function createElement$1 (tagName, vnode) {
  var elm = document.createElement(tagName);
  if (tagName !== 'select') {
    return elm
  }
  // false or null will remove the attribute but undefined will not
  if (vnode.data && vnode.data.attrs && vnode.data.attrs.multiple !== undefined) {
    elm.setAttribute('multiple', 'multiple');
  }
  return elm
}

function createElementNS (namespace, tagName) {
  return document.createElementNS(namespaceMap[namespace], tagName)
}

function createTextNode (text) {
  return document.createTextNode(text)
}

function createComment (text) {
  return document.createComment(text)
}

function insertBefore (parentNode, newNode, referenceNode) {
  parentNode.insertBefore(newNode, referenceNode);
}

function removeChild (node, child) {
  node.removeChild(child);
}

function appendChild (node, child) {
  node.appendChild(child);
}

function parentNode (node) {
  return node.parentNode
}

function nextSibling (node) {
  return node.nextSibling
}

function tagName (node) {
  return node.tagName
}

function setTextContent (node, text) {
  node.textContent = text;
}

function setStyleScope (node, scopeId) {
  node.setAttribute(scopeId, '');
}

var nodeOps = /*#__PURE__*/Object.freeze({
  createElement: createElement$1,
  createElementNS: createElementNS,
  createTextNode: createTextNode,
  createComment: createComment,
  insertBefore: insertBefore,
  removeChild: removeChild,
  appendChild: appendChild,
  parentNode: parentNode,
  nextSibling: nextSibling,
  tagName: tagName,
  setTextContent: setTextContent,
  setStyleScope: setStyleScope
});

/*  */

var ref = {
  create: function create (_, vnode) {
    registerRef(vnode);
  },
  update: function update (oldVnode, vnode) {
    if (oldVnode.data.ref !== vnode.data.ref) {
      registerRef(oldVnode, true);
      registerRef(vnode);
    }
  },
  destroy: function destroy (vnode) {
    registerRef(vnode, true);
  }
};

function registerRef (vnode, isRemoval) {
  var key = vnode.data.ref;
  if (!isDef(key)) { return }

  var vm = vnode.context;
  var ref = vnode.componentInstance || vnode.elm;
  var refs = vm.$refs;
  if (isRemoval) {
    if (Array.isArray(refs[key])) {
      remove(refs[key], ref);
    } else if (refs[key] === ref) {
      refs[key] = undefined;
    }
  } else {
    if (vnode.data.refInFor) {
      if (!Array.isArray(refs[key])) {
        refs[key] = [ref];
      } else if (refs[key].indexOf(ref) < 0) {
        // $flow-disable-line
        refs[key].push(ref);
      }
    } else {
      refs[key] = ref;
    }
  }
}

/**
 * Virtual DOM patching algorithm based on Snabbdom by
 * Simon Friis Vindum (@paldepind)
 * Licensed under the MIT License
 * https://github.com/paldepind/snabbdom/blob/master/LICENSE
 *
 * modified by Evan You (@yyx990803)
 *
 * Not type-checking this because this file is perf-critical and the cost
 * of making flow understand it is not worth it.
 */

var emptyNode = new VNode('', {}, []);

var hooks = ['create', 'activate', 'update', 'remove', 'destroy'];

function sameVnode (a, b) {
  return (
    a.key === b.key && (
      (
        a.tag === b.tag &&
        a.isComment === b.isComment &&
        isDef(a.data) === isDef(b.data) &&
        sameInputType(a, b)
      ) || (
        isTrue(a.isAsyncPlaceholder) &&
        a.asyncFactory === b.asyncFactory &&
        isUndef(b.asyncFactory.error)
      )
    )
  )
}

function sameInputType (a, b) {
  if (a.tag !== 'input') { return true }
  var i;
  var typeA = isDef(i = a.data) && isDef(i = i.attrs) && i.type;
  var typeB = isDef(i = b.data) && isDef(i = i.attrs) && i.type;
  return typeA === typeB || isTextInputType(typeA) && isTextInputType(typeB)
}

function createKeyToOldIdx (children, beginIdx, endIdx) {
  var i, key;
  var map = {};
  for (i = beginIdx; i <= endIdx; ++i) {
    key = children[i].key;
    if (isDef(key)) { map[key] = i; }
  }
  return map
}

function createPatchFunction (backend) {
  var i, j;
  var cbs = {};

  var modules = backend.modules;
  var nodeOps = backend.nodeOps;

  for (i = 0; i < hooks.length; ++i) {
    cbs[hooks[i]] = [];
    for (j = 0; j < modules.length; ++j) {
      if (isDef(modules[j][hooks[i]])) {
        cbs[hooks[i]].push(modules[j][hooks[i]]);
      }
    }
  }

  function emptyNodeAt (elm) {
    return new VNode(nodeOps.tagName(elm).toLowerCase(), {}, [], undefined, elm)
  }

  function createRmCb (childElm, listeners) {
    function remove$$1 () {
      if (--remove$$1.listeners === 0) {
        removeNode(childElm);
      }
    }
    remove$$1.listeners = listeners;
    return remove$$1
  }

  function removeNode (el) {
    var parent = nodeOps.parentNode(el);
    // element may have already been removed due to v-html / v-text
    if (isDef(parent)) {
      nodeOps.removeChild(parent, el);
    }
  }

  function isUnknownElement$$1 (vnode, inVPre) {
    return (
      !inVPre &&
      !vnode.ns &&
      !(
        config.ignoredElements.length &&
        config.ignoredElements.some(function (ignore) {
          return isRegExp(ignore)
            ? ignore.test(vnode.tag)
            : ignore === vnode.tag
        })
      ) &&
      config.isUnknownElement(vnode.tag)
    )
  }

  var creatingElmInVPre = 0;

  function createElm (
    vnode,
    insertedVnodeQueue,
    parentElm,
    refElm,
    nested,
    ownerArray,
    index
  ) {
    if (isDef(vnode.elm) && isDef(ownerArray)) {
      // This vnode was used in a previous render!
      // now it's used as a new node, overwriting its elm would cause
      // potential patch errors down the road when it's used as an insertion
      // reference node. Instead, we clone the node on-demand before creating
      // associated DOM element for it.
      vnode = ownerArray[index] = cloneVNode(vnode);
    }

    vnode.isRootInsert = !nested; // for transition enter check
    if (createComponent(vnode, insertedVnodeQueue, parentElm, refElm)) {
      return
    }

    var data = vnode.data;
    var children = vnode.children;
    var tag = vnode.tag;
    if (isDef(tag)) {
      {
        if (data && data.pre) {
          creatingElmInVPre++;
        }
        if (isUnknownElement$$1(vnode, creatingElmInVPre)) {
          warn(
            'Unknown custom element: <' + tag + '> - did you ' +
            'register the component correctly? For recursive components, ' +
            'make sure to provide the "name" option.',
            vnode.context
          );
        }
      }

      vnode.elm = vnode.ns
        ? nodeOps.createElementNS(vnode.ns, tag)
        : nodeOps.createElement(tag, vnode);
      setScope(vnode);

      /* istanbul ignore if */
      {
        createChildren(vnode, children, insertedVnodeQueue);
        if (isDef(data)) {
          invokeCreateHooks(vnode, insertedVnodeQueue);
        }
        insert(parentElm, vnode.elm, refElm);
      }

      if (data && data.pre) {
        creatingElmInVPre--;
      }
    } else if (isTrue(vnode.isComment)) {
      vnode.elm = nodeOps.createComment(vnode.text);
      insert(parentElm, vnode.elm, refElm);
    } else {
      vnode.elm = nodeOps.createTextNode(vnode.text);
      insert(parentElm, vnode.elm, refElm);
    }
  }

  function createComponent (vnode, insertedVnodeQueue, parentElm, refElm) {
    var i = vnode.data;
    if (isDef(i)) {
      var isReactivated = isDef(vnode.componentInstance) && i.keepAlive;
      if (isDef(i = i.hook) && isDef(i = i.init)) {
        i(vnode, false /* hydrating */);
      }
      // after calling the init hook, if the vnode is a child component
      // it should've created a child instance and mounted it. the child
      // component also has set the placeholder vnode's elm.
      // in that case we can just return the element and be done.
      if (isDef(vnode.componentInstance)) {
        initComponent(vnode, insertedVnodeQueue);
        insert(parentElm, vnode.elm, refElm);
        if (isTrue(isReactivated)) {
          reactivateComponent(vnode, insertedVnodeQueue, parentElm, refElm);
        }
        return true
      }
    }
  }

  function initComponent (vnode, insertedVnodeQueue) {
    if (isDef(vnode.data.pendingInsert)) {
      insertedVnodeQueue.push.apply(insertedVnodeQueue, vnode.data.pendingInsert);
      vnode.data.pendingInsert = null;
    }
    vnode.elm = vnode.componentInstance.$el;
    if (isPatchable(vnode)) {
      invokeCreateHooks(vnode, insertedVnodeQueue);
      setScope(vnode);
    } else {
      // empty component root.
      // skip all element-related modules except for ref (#3455)
      registerRef(vnode);
      // make sure to invoke the insert hook
      insertedVnodeQueue.push(vnode);
    }
  }

  function reactivateComponent (vnode, insertedVnodeQueue, parentElm, refElm) {
    var i;
    // hack for #4339: a reactivated component with inner transition
    // does not trigger because the inner node's created hooks are not called
    // again. It's not ideal to involve module-specific logic in here but
    // there doesn't seem to be a better way to do it.
    var innerNode = vnode;
    while (innerNode.componentInstance) {
      innerNode = innerNode.componentInstance._vnode;
      if (isDef(i = innerNode.data) && isDef(i = i.transition)) {
        for (i = 0; i < cbs.activate.length; ++i) {
          cbs.activate[i](emptyNode, innerNode);
        }
        insertedVnodeQueue.push(innerNode);
        break
      }
    }
    // unlike a newly created component,
    // a reactivated keep-alive component doesn't insert itself
    insert(parentElm, vnode.elm, refElm);
  }

  function insert (parent, elm, ref$$1) {
    if (isDef(parent)) {
      if (isDef(ref$$1)) {
        if (nodeOps.parentNode(ref$$1) === parent) {
          nodeOps.insertBefore(parent, elm, ref$$1);
        }
      } else {
        nodeOps.appendChild(parent, elm);
      }
    }
  }

  function createChildren (vnode, children, insertedVnodeQueue) {
    if (Array.isArray(children)) {
      {
        checkDuplicateKeys(children);
      }
      for (var i = 0; i < children.length; ++i) {
        createElm(children[i], insertedVnodeQueue, vnode.elm, null, true, children, i);
      }
    } else if (isPrimitive(vnode.text)) {
      nodeOps.appendChild(vnode.elm, nodeOps.createTextNode(String(vnode.text)));
    }
  }

  function isPatchable (vnode) {
    while (vnode.componentInstance) {
      vnode = vnode.componentInstance._vnode;
    }
    return isDef(vnode.tag)
  }

  function invokeCreateHooks (vnode, insertedVnodeQueue) {
    for (var i$1 = 0; i$1 < cbs.create.length; ++i$1) {
      cbs.create[i$1](emptyNode, vnode);
    }
    i = vnode.data.hook; // Reuse variable
    if (isDef(i)) {
      if (isDef(i.create)) { i.create(emptyNode, vnode); }
      if (isDef(i.insert)) { insertedVnodeQueue.push(vnode); }
    }
  }

  // set scope id attribute for scoped CSS.
  // this is implemented as a special case to avoid the overhead
  // of going through the normal attribute patching process.
  function setScope (vnode) {
    var i;
    if (isDef(i = vnode.fnScopeId)) {
      nodeOps.setStyleScope(vnode.elm, i);
    } else {
      var ancestor = vnode;
      while (ancestor) {
        if (isDef(i = ancestor.context) && isDef(i = i.$options._scopeId)) {
          nodeOps.setStyleScope(vnode.elm, i);
        }
        ancestor = ancestor.parent;
      }
    }
    // for slot content they should also get the scopeId from the host instance.
    if (isDef(i = activeInstance) &&
      i !== vnode.context &&
      i !== vnode.fnContext &&
      isDef(i = i.$options._scopeId)
    ) {
      nodeOps.setStyleScope(vnode.elm, i);
    }
  }

  function addVnodes (parentElm, refElm, vnodes, startIdx, endIdx, insertedVnodeQueue) {
    for (; startIdx <= endIdx; ++startIdx) {
      createElm(vnodes[startIdx], insertedVnodeQueue, parentElm, refElm, false, vnodes, startIdx);
    }
  }

  function invokeDestroyHook (vnode) {
    var i, j;
    var data = vnode.data;
    if (isDef(data)) {
      if (isDef(i = data.hook) && isDef(i = i.destroy)) { i(vnode); }
      for (i = 0; i < cbs.destroy.length; ++i) { cbs.destroy[i](vnode); }
    }
    if (isDef(i = vnode.children)) {
      for (j = 0; j < vnode.children.length; ++j) {
        invokeDestroyHook(vnode.children[j]);
      }
    }
  }

  function removeVnodes (parentElm, vnodes, startIdx, endIdx) {
    for (; startIdx <= endIdx; ++startIdx) {
      var ch = vnodes[startIdx];
      if (isDef(ch)) {
        if (isDef(ch.tag)) {
          removeAndInvokeRemoveHook(ch);
          invokeDestroyHook(ch);
        } else { // Text node
          removeNode(ch.elm);
        }
      }
    }
  }

  function removeAndInvokeRemoveHook (vnode, rm) {
    if (isDef(rm) || isDef(vnode.data)) {
      var i;
      var listeners = cbs.remove.length + 1;
      if (isDef(rm)) {
        // we have a recursively passed down rm callback
        // increase the listeners count
        rm.listeners += listeners;
      } else {
        // directly removing
        rm = createRmCb(vnode.elm, listeners);
      }
      // recursively invoke hooks on child component root node
      if (isDef(i = vnode.componentInstance) && isDef(i = i._vnode) && isDef(i.data)) {
        removeAndInvokeRemoveHook(i, rm);
      }
      for (i = 0; i < cbs.remove.length; ++i) {
        cbs.remove[i](vnode, rm);
      }
      if (isDef(i = vnode.data.hook) && isDef(i = i.remove)) {
        i(vnode, rm);
      } else {
        rm();
      }
    } else {
      removeNode(vnode.elm);
    }
  }

  function updateChildren (parentElm, oldCh, newCh, insertedVnodeQueue, removeOnly) {
    var oldStartIdx = 0;
    var newStartIdx = 0;
    var oldEndIdx = oldCh.length - 1;
    var oldStartVnode = oldCh[0];
    var oldEndVnode = oldCh[oldEndIdx];
    var newEndIdx = newCh.length - 1;
    var newStartVnode = newCh[0];
    var newEndVnode = newCh[newEndIdx];
    var oldKeyToIdx, idxInOld, vnodeToMove, refElm;

    // removeOnly is a special flag used only by <transition-group>
    // to ensure removed elements stay in correct relative positions
    // during leaving transitions
    var canMove = !removeOnly;

    {
      checkDuplicateKeys(newCh);
    }

    while (oldStartIdx <= oldEndIdx && newStartIdx <= newEndIdx) {
      if (isUndef(oldStartVnode)) {
        oldStartVnode = oldCh[++oldStartIdx]; // Vnode has been moved left
      } else if (isUndef(oldEndVnode)) {
        oldEndVnode = oldCh[--oldEndIdx];
      } else if (sameVnode(oldStartVnode, newStartVnode)) {
        patchVnode(oldStartVnode, newStartVnode, insertedVnodeQueue, newCh, newStartIdx);
        oldStartVnode = oldCh[++oldStartIdx];
        newStartVnode = newCh[++newStartIdx];
      } else if (sameVnode(oldEndVnode, newEndVnode)) {
        patchVnode(oldEndVnode, newEndVnode, insertedVnodeQueue, newCh, newEndIdx);
        oldEndVnode = oldCh[--oldEndIdx];
        newEndVnode = newCh[--newEndIdx];
      } else if (sameVnode(oldStartVnode, newEndVnode)) { // Vnode moved right
        patchVnode(oldStartVnode, newEndVnode, insertedVnodeQueue, newCh, newEndIdx);
        canMove && nodeOps.insertBefore(parentElm, oldStartVnode.elm, nodeOps.nextSibling(oldEndVnode.elm));
        oldStartVnode = oldCh[++oldStartIdx];
        newEndVnode = newCh[--newEndIdx];
      } else if (sameVnode(oldEndVnode, newStartVnode)) { // Vnode moved left
        patchVnode(oldEndVnode, newStartVnode, insertedVnodeQueue, newCh, newStartIdx);
        canMove && nodeOps.insertBefore(parentElm, oldEndVnode.elm, oldStartVnode.elm);
        oldEndVnode = oldCh[--oldEndIdx];
        newStartVnode = newCh[++newStartIdx];
      } else {
        if (isUndef(oldKeyToIdx)) { oldKeyToIdx = createKeyToOldIdx(oldCh, oldStartIdx, oldEndIdx); }
        idxInOld = isDef(newStartVnode.key)
          ? oldKeyToIdx[newStartVnode.key]
          : findIdxInOld(newStartVnode, oldCh, oldStartIdx, oldEndIdx);
        if (isUndef(idxInOld)) { // New element
          createElm(newStartVnode, insertedVnodeQueue, parentElm, oldStartVnode.elm, false, newCh, newStartIdx);
        } else {
          vnodeToMove = oldCh[idxInOld];
          if (sameVnode(vnodeToMove, newStartVnode)) {
            patchVnode(vnodeToMove, newStartVnode, insertedVnodeQueue, newCh, newStartIdx);
            oldCh[idxInOld] = undefined;
            canMove && nodeOps.insertBefore(parentElm, vnodeToMove.elm, oldStartVnode.elm);
          } else {
            // same key but different element. treat as new element
            createElm(newStartVnode, insertedVnodeQueue, parentElm, oldStartVnode.elm, false, newCh, newStartIdx);
          }
        }
        newStartVnode = newCh[++newStartIdx];
      }
    }
    if (oldStartIdx > oldEndIdx) {
      refElm = isUndef(newCh[newEndIdx + 1]) ? null : newCh[newEndIdx + 1].elm;
      addVnodes(parentElm, refElm, newCh, newStartIdx, newEndIdx, insertedVnodeQueue);
    } else if (newStartIdx > newEndIdx) {
      removeVnodes(parentElm, oldCh, oldStartIdx, oldEndIdx);
    }
  }

  function checkDuplicateKeys (children) {
    var seenKeys = {};
    for (var i = 0; i < children.length; i++) {
      var vnode = children[i];
      var key = vnode.key;
      if (isDef(key)) {
        if (seenKeys[key]) {
          warn(
            ("Duplicate keys detected: '" + key + "'. This may cause an update error."),
            vnode.context
          );
        } else {
          seenKeys[key] = true;
        }
      }
    }
  }

  function findIdxInOld (node, oldCh, start, end) {
    for (var i = start; i < end; i++) {
      var c = oldCh[i];
      if (isDef(c) && sameVnode(node, c)) { return i }
    }
  }

  function patchVnode (
    oldVnode,
    vnode,
    insertedVnodeQueue,
    ownerArray,
    index,
    removeOnly
  ) {
    if (oldVnode === vnode) {
      return
    }

    if (isDef(vnode.elm) && isDef(ownerArray)) {
      // clone reused vnode
      vnode = ownerArray[index] = cloneVNode(vnode);
    }

    var elm = vnode.elm = oldVnode.elm;

    if (isTrue(oldVnode.isAsyncPlaceholder)) {
      if (isDef(vnode.asyncFactory.resolved)) {
        hydrate(oldVnode.elm, vnode, insertedVnodeQueue);
      } else {
        vnode.isAsyncPlaceholder = true;
      }
      return
    }

    // reuse element for static trees.
    // note we only do this if the vnode is cloned -
    // if the new node is not cloned it means the render functions have been
    // reset by the hot-reload-api and we need to do a proper re-render.
    if (isTrue(vnode.isStatic) &&
      isTrue(oldVnode.isStatic) &&
      vnode.key === oldVnode.key &&
      (isTrue(vnode.isCloned) || isTrue(vnode.isOnce))
    ) {
      vnode.componentInstance = oldVnode.componentInstance;
      return
    }

    var i;
    var data = vnode.data;
    if (isDef(data) && isDef(i = data.hook) && isDef(i = i.prepatch)) {
      i(oldVnode, vnode);
    }

    var oldCh = oldVnode.children;
    var ch = vnode.children;
    if (isDef(data) && isPatchable(vnode)) {
      for (i = 0; i < cbs.update.length; ++i) { cbs.update[i](oldVnode, vnode); }
      if (isDef(i = data.hook) && isDef(i = i.update)) { i(oldVnode, vnode); }
    }
    if (isUndef(vnode.text)) {
      if (isDef(oldCh) && isDef(ch)) {
        if (oldCh !== ch) { updateChildren(elm, oldCh, ch, insertedVnodeQueue, removeOnly); }
      } else if (isDef(ch)) {
        {
          checkDuplicateKeys(ch);
        }
        if (isDef(oldVnode.text)) { nodeOps.setTextContent(elm, ''); }
        addVnodes(elm, null, ch, 0, ch.length - 1, insertedVnodeQueue);
      } else if (isDef(oldCh)) {
        removeVnodes(elm, oldCh, 0, oldCh.length - 1);
      } else if (isDef(oldVnode.text)) {
        nodeOps.setTextContent(elm, '');
      }
    } else if (oldVnode.text !== vnode.text) {
      nodeOps.setTextContent(elm, vnode.text);
    }
    if (isDef(data)) {
      if (isDef(i = data.hook) && isDef(i = i.postpatch)) { i(oldVnode, vnode); }
    }
  }

  function invokeInsertHook (vnode, queue, initial) {
    // delay insert hooks for component root nodes, invoke them after the
    // element is really inserted
    if (isTrue(initial) && isDef(vnode.parent)) {
      vnode.parent.data.pendingInsert = queue;
    } else {
      for (var i = 0; i < queue.length; ++i) {
        queue[i].data.hook.insert(queue[i]);
      }
    }
  }

  var hydrationBailed = false;
  // list of modules that can skip create hook during hydration because they
  // are already rendered on the client or has no need for initialization
  // Note: style is excluded because it relies on initial clone for future
  // deep updates (#7063).
  var isRenderedModule = makeMap('attrs,class,staticClass,staticStyle,key');

  // Note: this is a browser-only function so we can assume elms are DOM nodes.
  function hydrate (elm, vnode, insertedVnodeQueue, inVPre) {
    var i;
    var tag = vnode.tag;
    var data = vnode.data;
    var children = vnode.children;
    inVPre = inVPre || (data && data.pre);
    vnode.elm = elm;

    if (isTrue(vnode.isComment) && isDef(vnode.asyncFactory)) {
      vnode.isAsyncPlaceholder = true;
      return true
    }
    // assert node match
    {
      if (!assertNodeMatch(elm, vnode, inVPre)) {
        return false
      }
    }
    if (isDef(data)) {
      if (isDef(i = data.hook) && isDef(i = i.init)) { i(vnode, true /* hydrating */); }
      if (isDef(i = vnode.componentInstance)) {
        // child component. it should have hydrated its own tree.
        initComponent(vnode, insertedVnodeQueue);
        return true
      }
    }
    if (isDef(tag)) {
      if (isDef(children)) {
        // empty element, allow client to pick up and populate children
        if (!elm.hasChildNodes()) {
          createChildren(vnode, children, insertedVnodeQueue);
        } else {
          // v-html and domProps: innerHTML
          if (isDef(i = data) && isDef(i = i.domProps) && isDef(i = i.innerHTML)) {
            if (i !== elm.innerHTML) {
              /* istanbul ignore if */
              if (typeof console !== 'undefined' &&
                !hydrationBailed
              ) {
                hydrationBailed = true;
                console.warn('Parent: ', elm);
                console.warn('server innerHTML: ', i);
                console.warn('client innerHTML: ', elm.innerHTML);
              }
              return false
            }
          } else {
            // iterate and compare children lists
            var childrenMatch = true;
            var childNode = elm.firstChild;
            for (var i$1 = 0; i$1 < children.length; i$1++) {
              if (!childNode || !hydrate(childNode, children[i$1], insertedVnodeQueue, inVPre)) {
                childrenMatch = false;
                break
              }
              childNode = childNode.nextSibling;
            }
            // if childNode is not null, it means the actual childNodes list is
            // longer than the virtual children list.
            if (!childrenMatch || childNode) {
              /* istanbul ignore if */
              if (typeof console !== 'undefined' &&
                !hydrationBailed
              ) {
                hydrationBailed = true;
                console.warn('Parent: ', elm);
                console.warn('Mismatching childNodes vs. VNodes: ', elm.childNodes, children);
              }
              return false
            }
          }
        }
      }
      if (isDef(data)) {
        var fullInvoke = false;
        for (var key in data) {
          if (!isRenderedModule(key)) {
            fullInvoke = true;
            invokeCreateHooks(vnode, insertedVnodeQueue);
            break
          }
        }
        if (!fullInvoke && data['class']) {
          // ensure collecting deps for deep class bindings for future updates
          traverse(data['class']);
        }
      }
    } else if (elm.data !== vnode.text) {
      elm.data = vnode.text;
    }
    return true
  }

  function assertNodeMatch (node, vnode, inVPre) {
    if (isDef(vnode.tag)) {
      return vnode.tag.indexOf('vue-component') === 0 || (
        !isUnknownElement$$1(vnode, inVPre) &&
        vnode.tag.toLowerCase() === (node.tagName && node.tagName.toLowerCase())
      )
    } else {
      return node.nodeType === (vnode.isComment ? 8 : 3)
    }
  }

  return function patch (oldVnode, vnode, hydrating, removeOnly) {
    if (isUndef(vnode)) {
      if (isDef(oldVnode)) { invokeDestroyHook(oldVnode); }
      return
    }

    var isInitialPatch = false;
    var insertedVnodeQueue = [];

    if (isUndef(oldVnode)) {
      // empty mount (likely as component), create new root element
      isInitialPatch = true;
      createElm(vnode, insertedVnodeQueue);
    } else {
      var isRealElement = isDef(oldVnode.nodeType);
      if (!isRealElement && sameVnode(oldVnode, vnode)) {
        // patch existing root node
        patchVnode(oldVnode, vnode, insertedVnodeQueue, null, null, removeOnly);
      } else {
        if (isRealElement) {
          // mounting to a real element
          // check if this is server-rendered content and if we can perform
          // a successful hydration.
          if (oldVnode.nodeType === 1 && oldVnode.hasAttribute(SSR_ATTR)) {
            oldVnode.removeAttribute(SSR_ATTR);
            hydrating = true;
          }
          if (isTrue(hydrating)) {
            if (hydrate(oldVnode, vnode, insertedVnodeQueue)) {
              invokeInsertHook(vnode, insertedVnodeQueue, true);
              return oldVnode
            } else {
              warn(
                'The client-side rendered virtual DOM tree is not matching ' +
                'server-rendered content. This is likely caused by incorrect ' +
                'HTML markup, for example nesting block-level elements inside ' +
                '<p>, or missing <tbody>. Bailing hydration and performing ' +
                'full client-side render.'
              );
            }
          }
          // either not server-rendered, or hydration failed.
          // create an empty node and replace it
          oldVnode = emptyNodeAt(oldVnode);
        }

        // replacing existing element
        var oldElm = oldVnode.elm;
        var parentElm = nodeOps.parentNode(oldElm);

        // create new node
        createElm(
          vnode,
          insertedVnodeQueue,
          // extremely rare edge case: do not insert if old element is in a
          // leaving transition. Only happens when combining transition +
          // keep-alive + HOCs. (#4590)
          oldElm._leaveCb ? null : parentElm,
          nodeOps.nextSibling(oldElm)
        );

        // update parent placeholder node element, recursively
        if (isDef(vnode.parent)) {
          var ancestor = vnode.parent;
          var patchable = isPatchable(vnode);
          while (ancestor) {
            for (var i = 0; i < cbs.destroy.length; ++i) {
              cbs.destroy[i](ancestor);
            }
            ancestor.elm = vnode.elm;
            if (patchable) {
              for (var i$1 = 0; i$1 < cbs.create.length; ++i$1) {
                cbs.create[i$1](emptyNode, ancestor);
              }
              // #6513
              // invoke insert hooks that may have been merged by create hooks.
              // e.g. for directives that uses the "inserted" hook.
              var insert = ancestor.data.hook.insert;
              if (insert.merged) {
                // start at index 1 to avoid re-invoking component mounted hook
                for (var i$2 = 1; i$2 < insert.fns.length; i$2++) {
                  insert.fns[i$2]();
                }
              }
            } else {
              registerRef(ancestor);
            }
            ancestor = ancestor.parent;
          }
        }

        // destroy old node
        if (isDef(parentElm)) {
          removeVnodes(parentElm, [oldVnode], 0, 0);
        } else if (isDef(oldVnode.tag)) {
          invokeDestroyHook(oldVnode);
        }
      }
    }

    invokeInsertHook(vnode, insertedVnodeQueue, isInitialPatch);
    return vnode.elm
  }
}

/*  */

var directives = {
  create: updateDirectives,
  update: updateDirectives,
  destroy: function unbindDirectives (vnode) {
    updateDirectives(vnode, emptyNode);
  }
};

function updateDirectives (oldVnode, vnode) {
  if (oldVnode.data.directives || vnode.data.directives) {
    _update(oldVnode, vnode);
  }
}

function _update (oldVnode, vnode) {
  var isCreate = oldVnode === emptyNode;
  var isDestroy = vnode === emptyNode;
  var oldDirs = normalizeDirectives$1(oldVnode.data.directives, oldVnode.context);
  var newDirs = normalizeDirectives$1(vnode.data.directives, vnode.context);

  var dirsWithInsert = [];
  var dirsWithPostpatch = [];

  var key, oldDir, dir;
  for (key in newDirs) {
    oldDir = oldDirs[key];
    dir = newDirs[key];
    if (!oldDir) {
      // new directive, bind
      callHook$1(dir, 'bind', vnode, oldVnode);
      if (dir.def && dir.def.inserted) {
        dirsWithInsert.push(dir);
      }
    } else {
      // existing directive, update
      dir.oldValue = oldDir.value;
      dir.oldArg = oldDir.arg;
      callHook$1(dir, 'update', vnode, oldVnode);
      if (dir.def && dir.def.componentUpdated) {
        dirsWithPostpatch.push(dir);
      }
    }
  }

  if (dirsWithInsert.length) {
    var callInsert = function () {
      for (var i = 0; i < dirsWithInsert.length; i++) {
        callHook$1(dirsWithInsert[i], 'inserted', vnode, oldVnode);
      }
    };
    if (isCreate) {
      mergeVNodeHook(vnode, 'insert', callInsert);
    } else {
      callInsert();
    }
  }

  if (dirsWithPostpatch.length) {
    mergeVNodeHook(vnode, 'postpatch', function () {
      for (var i = 0; i < dirsWithPostpatch.length; i++) {
        callHook$1(dirsWithPostpatch[i], 'componentUpdated', vnode, oldVnode);
      }
    });
  }

  if (!isCreate) {
    for (key in oldDirs) {
      if (!newDirs[key]) {
        // no longer present, unbind
        callHook$1(oldDirs[key], 'unbind', oldVnode, oldVnode, isDestroy);
      }
    }
  }
}

var emptyModifiers = Object.create(null);

function normalizeDirectives$1 (
  dirs,
  vm
) {
  var res = Object.create(null);
  if (!dirs) {
    // $flow-disable-line
    return res
  }
  var i, dir;
  for (i = 0; i < dirs.length; i++) {
    dir = dirs[i];
    if (!dir.modifiers) {
      // $flow-disable-line
      dir.modifiers = emptyModifiers;
    }
    res[getRawDirName(dir)] = dir;
    dir.def = resolveAsset(vm.$options, 'directives', dir.name, true);
  }
  // $flow-disable-line
  return res
}

function getRawDirName (dir) {
  return dir.rawName || ((dir.name) + "." + (Object.keys(dir.modifiers || {}).join('.')))
}

function callHook$1 (dir, hook, vnode, oldVnode, isDestroy) {
  var fn = dir.def && dir.def[hook];
  if (fn) {
    try {
      fn(vnode.elm, dir, vnode, oldVnode, isDestroy);
    } catch (e) {
      handleError(e, vnode.context, ("directive " + (dir.name) + " " + hook + " hook"));
    }
  }
}

var baseModules = [
  ref,
  directives
];

/*  */

function updateAttrs (oldVnode, vnode) {
  var opts = vnode.componentOptions;
  if (isDef(opts) && opts.Ctor.options.inheritAttrs === false) {
    return
  }
  if (isUndef(oldVnode.data.attrs) && isUndef(vnode.data.attrs)) {
    return
  }
  var key, cur, old;
  var elm = vnode.elm;
  var oldAttrs = oldVnode.data.attrs || {};
  var attrs = vnode.data.attrs || {};
  // clone observed objects, as the user probably wants to mutate it
  if (isDef(attrs.__ob__)) {
    attrs = vnode.data.attrs = extend({}, attrs);
  }

  for (key in attrs) {
    cur = attrs[key];
    old = oldAttrs[key];
    if (old !== cur) {
      setAttr(elm, key, cur);
    }
  }
  // #4391: in IE9, setting type can reset value for input[type=radio]
  // #6666: IE/Edge forces progress value down to 1 before setting a max
  /* istanbul ignore if */
  if ((isIE || isEdge) && attrs.value !== oldAttrs.value) {
    setAttr(elm, 'value', attrs.value);
  }
  for (key in oldAttrs) {
    if (isUndef(attrs[key])) {
      if (isXlink(key)) {
        elm.removeAttributeNS(xlinkNS, getXlinkProp(key));
      } else if (!isEnumeratedAttr(key)) {
        elm.removeAttribute(key);
      }
    }
  }
}

function setAttr (el, key, value) {
  if (el.tagName.indexOf('-') > -1) {
    baseSetAttr(el, key, value);
  } else if (isBooleanAttr(key)) {
    // set attribute for blank value
    // e.g. <option disabled>Select one</option>
    if (isFalsyAttrValue(value)) {
      el.removeAttribute(key);
    } else {
      // technically allowfullscreen is a boolean attribute for <iframe>,
      // but Flash expects a value of "true" when used on <embed> tag
      value = key === 'allowfullscreen' && el.tagName === 'EMBED'
        ? 'true'
        : key;
      el.setAttribute(key, value);
    }
  } else if (isEnumeratedAttr(key)) {
    el.setAttribute(key, convertEnumeratedValue(key, value));
  } else if (isXlink(key)) {
    if (isFalsyAttrValue(value)) {
      el.removeAttributeNS(xlinkNS, getXlinkProp(key));
    } else {
      el.setAttributeNS(xlinkNS, key, value);
    }
  } else {
    baseSetAttr(el, key, value);
  }
}

function baseSetAttr (el, key, value) {
  if (isFalsyAttrValue(value)) {
    el.removeAttribute(key);
  } else {
    // #7138: IE10 & 11 fires input event when setting placeholder on
    // <textarea>... block the first input event and remove the blocker
    // immediately.
    /* istanbul ignore if */
    if (
      isIE && !isIE9 &&
      el.tagName === 'TEXTAREA' &&
      key === 'placeholder' && value !== '' && !el.__ieph
    ) {
      var blocker = function (e) {
        e.stopImmediatePropagation();
        el.removeEventListener('input', blocker);
      };
      el.addEventListener('input', blocker);
      // $flow-disable-line
      el.__ieph = true; /* IE placeholder patched */
    }
    el.setAttribute(key, value);
  }
}

var attrs = {
  create: updateAttrs,
  update: updateAttrs
};

/*  */

function updateClass (oldVnode, vnode) {
  var el = vnode.elm;
  var data = vnode.data;
  var oldData = oldVnode.data;
  if (
    isUndef(data.staticClass) &&
    isUndef(data.class) && (
      isUndef(oldData) || (
        isUndef(oldData.staticClass) &&
        isUndef(oldData.class)
      )
    )
  ) {
    return
  }

  var cls = genClassForVnode(vnode);

  // handle transition classes
  var transitionClass = el._transitionClasses;
  if (isDef(transitionClass)) {
    cls = concat(cls, stringifyClass(transitionClass));
  }

  // set the class
  if (cls !== el._prevClass) {
    el.setAttribute('class', cls);
    el._prevClass = cls;
  }
}

var klass = {
  create: updateClass,
  update: updateClass
};

/*  */

var validDivisionCharRE = /[\w).+\-_$\]]/;

function parseFilters (exp) {
  var inSingle = false;
  var inDouble = false;
  var inTemplateString = false;
  var inRegex = false;
  var curly = 0;
  var square = 0;
  var paren = 0;
  var lastFilterIndex = 0;
  var c, prev, i, expression, filters;

  for (i = 0; i < exp.length; i++) {
    prev = c;
    c = exp.charCodeAt(i);
    if (inSingle) {
      if (c === 0x27 && prev !== 0x5C) { inSingle = false; }
    } else if (inDouble) {
      if (c === 0x22 && prev !== 0x5C) { inDouble = false; }
    } else if (inTemplateString) {
      if (c === 0x60 && prev !== 0x5C) { inTemplateString = false; }
    } else if (inRegex) {
      if (c === 0x2f && prev !== 0x5C) { inRegex = false; }
    } else if (
      c === 0x7C && // pipe
      exp.charCodeAt(i + 1) !== 0x7C &&
      exp.charCodeAt(i - 1) !== 0x7C &&
      !curly && !square && !paren
    ) {
      if (expression === undefined) {
        // first filter, end of expression
        lastFilterIndex = i + 1;
        expression = exp.slice(0, i).trim();
      } else {
        pushFilter();
      }
    } else {
      switch (c) {
        case 0x22: inDouble = true; break         // "
        case 0x27: inSingle = true; break         // '
        case 0x60: inTemplateString = true; break // `
        case 0x28: paren++; break                 // (
        case 0x29: paren--; break                 // )
        case 0x5B: square++; break                // [
        case 0x5D: square--; break                // ]
        case 0x7B: curly++; break                 // {
        case 0x7D: curly--; break                 // }
      }
      if (c === 0x2f) { // /
        var j = i - 1;
        var p = (void 0);
        // find first non-whitespace prev char
        for (; j >= 0; j--) {
          p = exp.charAt(j);
          if (p !== ' ') { break }
        }
        if (!p || !validDivisionCharRE.test(p)) {
          inRegex = true;
        }
      }
    }
  }

  if (expression === undefined) {
    expression = exp.slice(0, i).trim();
  } else if (lastFilterIndex !== 0) {
    pushFilter();
  }

  function pushFilter () {
    (filters || (filters = [])).push(exp.slice(lastFilterIndex, i).trim());
    lastFilterIndex = i + 1;
  }

  if (filters) {
    for (i = 0; i < filters.length; i++) {
      expression = wrapFilter(expression, filters[i]);
    }
  }

  return expression
}

function wrapFilter (exp, filter) {
  var i = filter.indexOf('(');
  if (i < 0) {
    // _f: resolveFilter
    return ("_f(\"" + filter + "\")(" + exp + ")")
  } else {
    var name = filter.slice(0, i);
    var args = filter.slice(i + 1);
    return ("_f(\"" + name + "\")(" + exp + (args !== ')' ? ',' + args : args))
  }
}

/*  */



/* eslint-disable no-unused-vars */
function baseWarn (msg, range) {
  console.error(("[Vue compiler]: " + msg));
}
/* eslint-enable no-unused-vars */

function pluckModuleFunction (
  modules,
  key
) {
  return modules
    ? modules.map(function (m) { return m[key]; }).filter(function (_) { return _; })
    : []
}

function addProp (el, name, value, range, dynamic) {
  (el.props || (el.props = [])).push(rangeSetItem({ name: name, value: value, dynamic: dynamic }, range));
  el.plain = false;
}

function addAttr (el, name, value, range, dynamic) {
  var attrs = dynamic
    ? (el.dynamicAttrs || (el.dynamicAttrs = []))
    : (el.attrs || (el.attrs = []));
  attrs.push(rangeSetItem({ name: name, value: value, dynamic: dynamic }, range));
  el.plain = false;
}

// add a raw attr (use this in preTransforms)
function addRawAttr (el, name, value, range) {
  el.attrsMap[name] = value;
  el.attrsList.push(rangeSetItem({ name: name, value: value }, range));
}

function addDirective (
  el,
  name,
  rawName,
  value,
  arg,
  isDynamicArg,
  modifiers,
  range
) {
  (el.directives || (el.directives = [])).push(rangeSetItem({
    name: name,
    rawName: rawName,
    value: value,
    arg: arg,
    isDynamicArg: isDynamicArg,
    modifiers: modifiers
  }, range));
  el.plain = false;
}

function prependModifierMarker (symbol, name, dynamic) {
  return dynamic
    ? ("_p(" + name + ",\"" + symbol + "\")")
    : symbol + name // mark the event as captured
}

function addHandler (
  el,
  name,
  value,
  modifiers,
  important,
  warn,
  range,
  dynamic
) {
  modifiers = modifiers || emptyObject;
  // warn prevent and passive modifier
  /* istanbul ignore if */
  if (
    warn &&
    modifiers.prevent && modifiers.passive
  ) {
    warn(
      'passive and prevent can\'t be used together. ' +
      'Passive handler can\'t prevent default event.',
      range
    );
  }

  // normalize click.right and click.middle since they don't actually fire
  // this is technically browser-specific, but at least for now browsers are
  // the only target envs that have right/middle clicks.
  if (modifiers.right) {
    if (dynamic) {
      name = "(" + name + ")==='click'?'contextmenu':(" + name + ")";
    } else if (name === 'click') {
      name = 'contextmenu';
      delete modifiers.right;
    }
  } else if (modifiers.middle) {
    if (dynamic) {
      name = "(" + name + ")==='click'?'mouseup':(" + name + ")";
    } else if (name === 'click') {
      name = 'mouseup';
    }
  }

  // check capture modifier
  if (modifiers.capture) {
    delete modifiers.capture;
    name = prependModifierMarker('!', name, dynamic);
  }
  if (modifiers.once) {
    delete modifiers.once;
    name = prependModifierMarker('~', name, dynamic);
  }
  /* istanbul ignore if */
  if (modifiers.passive) {
    delete modifiers.passive;
    name = prependModifierMarker('&', name, dynamic);
  }

  var events;
  if (modifiers.native) {
    delete modifiers.native;
    events = el.nativeEvents || (el.nativeEvents = {});
  } else {
    events = el.events || (el.events = {});
  }

  var newHandler = rangeSetItem({ value: value.trim(), dynamic: dynamic }, range);
  if (modifiers !== emptyObject) {
    newHandler.modifiers = modifiers;
  }

  var handlers = events[name];
  /* istanbul ignore if */
  if (Array.isArray(handlers)) {
    important ? handlers.unshift(newHandler) : handlers.push(newHandler);
  } else if (handlers) {
    events[name] = important ? [newHandler, handlers] : [handlers, newHandler];
  } else {
    events[name] = newHandler;
  }

  el.plain = false;
}

function getRawBindingAttr (
  el,
  name
) {
  return el.rawAttrsMap[':' + name] ||
    el.rawAttrsMap['v-bind:' + name] ||
    el.rawAttrsMap[name]
}

function getBindingAttr (
  el,
  name,
  getStatic
) {
  var dynamicValue =
    getAndRemoveAttr(el, ':' + name) ||
    getAndRemoveAttr(el, 'v-bind:' + name);
  if (dynamicValue != null) {
    return parseFilters(dynamicValue)
  } else if (getStatic !== false) {
    var staticValue = getAndRemoveAttr(el, name);
    if (staticValue != null) {
      return JSON.stringify(staticValue)
    }
  }
}

// note: this only removes the attr from the Array (attrsList) so that it
// doesn't get processed by processAttrs.
// By default it does NOT remove it from the map (attrsMap) because the map is
// needed during codegen.
function getAndRemoveAttr (
  el,
  name,
  removeFromMap
) {
  var val;
  if ((val = el.attrsMap[name]) != null) {
    var list = el.attrsList;
    for (var i = 0, l = list.length; i < l; i++) {
      if (list[i].name === name) {
        list.splice(i, 1);
        break
      }
    }
  }
  if (removeFromMap) {
    delete el.attrsMap[name];
  }
  return val
}

function getAndRemoveAttrByRegex (
  el,
  name
) {
  var list = el.attrsList;
  for (var i = 0, l = list.length; i < l; i++) {
    var attr = list[i];
    if (name.test(attr.name)) {
      list.splice(i, 1);
      return attr
    }
  }
}

function rangeSetItem (
  item,
  range
) {
  if (range) {
    if (range.start != null) {
      item.start = range.start;
    }
    if (range.end != null) {
      item.end = range.end;
    }
  }
  return item
}

/*  */

/**
 * Cross-platform code generation for component v-model
 */
function genComponentModel (
  el,
  value,
  modifiers
) {
  var ref = modifiers || {};
  var number = ref.number;
  var trim = ref.trim;

  var baseValueExpression = '$$v';
  var valueExpression = baseValueExpression;
  if (trim) {
    valueExpression =
      "(typeof " + baseValueExpression + " === 'string'" +
      "? " + baseValueExpression + ".trim()" +
      ": " + baseValueExpression + ")";
  }
  if (number) {
    valueExpression = "_n(" + valueExpression + ")";
  }
  var assignment = genAssignmentCode(value, valueExpression);

  el.model = {
    value: ("(" + value + ")"),
    expression: JSON.stringify(value),
    callback: ("function (" + baseValueExpression + ") {" + assignment + "}")
  };
}

/**
 * Cross-platform codegen helper for generating v-model value assignment code.
 */
function genAssignmentCode (
  value,
  assignment
) {
  var res = parseModel(value);
  if (res.key === null) {
    return (value + "=" + assignment)
  } else {
    return ("$set(" + (res.exp) + ", " + (res.key) + ", " + assignment + ")")
  }
}

/**
 * Parse a v-model expression into a base path and a final key segment.
 * Handles both dot-path and possible square brackets.
 *
 * Possible cases:
 *
 * - test
 * - test[key]
 * - test[test1[key]]
 * - test["a"][key]
 * - xxx.test[a[a].test1[key]]
 * - test.xxx.a["asa"][test1[key]]
 *
 */

var len, str, chr, index$1, expressionPos, expressionEndPos;



function parseModel (val) {
  // Fix https://github.com/vuejs/vue/pull/7730
  // allow v-model="obj.val " (trailing whitespace)
  val = val.trim();
  len = val.length;

  if (val.indexOf('[') < 0 || val.lastIndexOf(']') < len - 1) {
    index$1 = val.lastIndexOf('.');
    if (index$1 > -1) {
      return {
        exp: val.slice(0, index$1),
        key: '"' + val.slice(index$1 + 1) + '"'
      }
    } else {
      return {
        exp: val,
        key: null
      }
    }
  }

  str = val;
  index$1 = expressionPos = expressionEndPos = 0;

  while (!eof()) {
    chr = next();
    /* istanbul ignore if */
    if (isStringStart(chr)) {
      parseString(chr);
    } else if (chr === 0x5B) {
      parseBracket(chr);
    }
  }

  return {
    exp: val.slice(0, expressionPos),
    key: val.slice(expressionPos + 1, expressionEndPos)
  }
}

function next () {
  return str.charCodeAt(++index$1)
}

function eof () {
  return index$1 >= len
}

function isStringStart (chr) {
  return chr === 0x22 || chr === 0x27
}

function parseBracket (chr) {
  var inBracket = 1;
  expressionPos = index$1;
  while (!eof()) {
    chr = next();
    if (isStringStart(chr)) {
      parseString(chr);
      continue
    }
    if (chr === 0x5B) { inBracket++; }
    if (chr === 0x5D) { inBracket--; }
    if (inBracket === 0) {
      expressionEndPos = index$1;
      break
    }
  }
}

function parseString (chr) {
  var stringQuote = chr;
  while (!eof()) {
    chr = next();
    if (chr === stringQuote) {
      break
    }
  }
}

/*  */

var warn$1;

// in some cases, the event used has to be determined at runtime
// so we used some reserved tokens during compile.
var RANGE_TOKEN = '__r';
var CHECKBOX_RADIO_TOKEN = '__c';

function model (
  el,
  dir,
  _warn
) {
  warn$1 = _warn;
  var value = dir.value;
  var modifiers = dir.modifiers;
  var tag = el.tag;
  var type = el.attrsMap.type;

  {
    // inputs with type="file" are read only and setting the input's
    // value will throw an error.
    if (tag === 'input' && type === 'file') {
      warn$1(
        "<" + (el.tag) + " v-model=\"" + value + "\" type=\"file\">:\n" +
        "File inputs are read only. Use a v-on:change listener instead.",
        el.rawAttrsMap['v-model']
      );
    }
  }

  if (el.component) {
    genComponentModel(el, value, modifiers);
    // component v-model doesn't need extra runtime
    return false
  } else if (tag === 'select') {
    genSelect(el, value, modifiers);
  } else if (tag === 'input' && type === 'checkbox') {
    genCheckboxModel(el, value, modifiers);
  } else if (tag === 'input' && type === 'radio') {
    genRadioModel(el, value, modifiers);
  } else if (tag === 'input' || tag === 'textarea') {
    genDefaultModel(el, value, modifiers);
  } else if (!config.isReservedTag(tag)) {
    genComponentModel(el, value, modifiers);
    // component v-model doesn't need extra runtime
    return false
  } else {
    warn$1(
      "<" + (el.tag) + " v-model=\"" + value + "\">: " +
      "v-model is not supported on this element type. " +
      'If you are working with contenteditable, it\'s recommended to ' +
      'wrap a library dedicated for that purpose inside a custom component.',
      el.rawAttrsMap['v-model']
    );
  }

  // ensure runtime directive metadata
  return true
}

function genCheckboxModel (
  el,
  value,
  modifiers
) {
  var number = modifiers && modifiers.number;
  var valueBinding = getBindingAttr(el, 'value') || 'null';
  var trueValueBinding = getBindingAttr(el, 'true-value') || 'true';
  var falseValueBinding = getBindingAttr(el, 'false-value') || 'false';
  addProp(el, 'checked',
    "Array.isArray(" + value + ")" +
    "?_i(" + value + "," + valueBinding + ")>-1" + (
      trueValueBinding === 'true'
        ? (":(" + value + ")")
        : (":_q(" + value + "," + trueValueBinding + ")")
    )
  );
  addHandler(el, 'change',
    "var $$a=" + value + "," +
        '$$el=$event.target,' +
        "$$c=$$el.checked?(" + trueValueBinding + "):(" + falseValueBinding + ");" +
    'if(Array.isArray($$a)){' +
      "var $$v=" + (number ? '_n(' + valueBinding + ')' : valueBinding) + "," +
          '$$i=_i($$a,$$v);' +
      "if($$el.checked){$$i<0&&(" + (genAssignmentCode(value, '$$a.concat([$$v])')) + ")}" +
      "else{$$i>-1&&(" + (genAssignmentCode(value, '$$a.slice(0,$$i).concat($$a.slice($$i+1))')) + ")}" +
    "}else{" + (genAssignmentCode(value, '$$c')) + "}",
    null, true
  );
}

function genRadioModel (
  el,
  value,
  modifiers
) {
  var number = modifiers && modifiers.number;
  var valueBinding = getBindingAttr(el, 'value') || 'null';
  valueBinding = number ? ("_n(" + valueBinding + ")") : valueBinding;
  addProp(el, 'checked', ("_q(" + value + "," + valueBinding + ")"));
  addHandler(el, 'change', genAssignmentCode(value, valueBinding), null, true);
}

function genSelect (
  el,
  value,
  modifiers
) {
  var number = modifiers && modifiers.number;
  var selectedVal = "Array.prototype.filter" +
    ".call($event.target.options,function(o){return o.selected})" +
    ".map(function(o){var val = \"_value\" in o ? o._value : o.value;" +
    "return " + (number ? '_n(val)' : 'val') + "})";

  var assignment = '$event.target.multiple ? $$selectedVal : $$selectedVal[0]';
  var code = "var $$selectedVal = " + selectedVal + ";";
  code = code + " " + (genAssignmentCode(value, assignment));
  addHandler(el, 'change', code, null, true);
}

function genDefaultModel (
  el,
  value,
  modifiers
) {
  var type = el.attrsMap.type;

  // warn if v-bind:value conflicts with v-model
  // except for inputs with v-bind:type
  {
    var value$1 = el.attrsMap['v-bind:value'] || el.attrsMap[':value'];
    var typeBinding = el.attrsMap['v-bind:type'] || el.attrsMap[':type'];
    if (value$1 && !typeBinding) {
      var binding = el.attrsMap['v-bind:value'] ? 'v-bind:value' : ':value';
      warn$1(
        binding + "=\"" + value$1 + "\" conflicts with v-model on the same element " +
        'because the latter already expands to a value binding internally',
        el.rawAttrsMap[binding]
      );
    }
  }

  var ref = modifiers || {};
  var lazy = ref.lazy;
  var number = ref.number;
  var trim = ref.trim;
  var needCompositionGuard = !lazy && type !== 'range';
  var event = lazy
    ? 'change'
    : type === 'range'
      ? RANGE_TOKEN
      : 'input';

  var valueExpression = '$event.target.value';
  if (trim) {
    valueExpression = "$event.target.value.trim()";
  }
  if (number) {
    valueExpression = "_n(" + valueExpression + ")";
  }

  var code = genAssignmentCode(value, valueExpression);
  if (needCompositionGuard) {
    code = "if($event.target.composing)return;" + code;
  }

  addProp(el, 'value', ("(" + value + ")"));
  addHandler(el, event, code, null, true);
  if (trim || number) {
    addHandler(el, 'blur', '$forceUpdate()');
  }
}

/*  */

// normalize v-model event tokens that can only be determined at runtime.
// it's important to place the event as the first in the array because
// the whole point is ensuring the v-model callback gets called before
// user-attached handlers.
function normalizeEvents (on) {
  /* istanbul ignore if */
  if (isDef(on[RANGE_TOKEN])) {
    // IE input[type=range] only supports `change` event
    var event = isIE ? 'change' : 'input';
    on[event] = [].concat(on[RANGE_TOKEN], on[event] || []);
    delete on[RANGE_TOKEN];
  }
  // This was originally intended to fix #4521 but no longer necessary
  // after 2.5. Keeping it for backwards compat with generated code from < 2.4
  /* istanbul ignore if */
  if (isDef(on[CHECKBOX_RADIO_TOKEN])) {
    on.change = [].concat(on[CHECKBOX_RADIO_TOKEN], on.change || []);
    delete on[CHECKBOX_RADIO_TOKEN];
  }
}

var target$1;

function createOnceHandler$1 (event, handler, capture) {
  var _target = target$1; // save current target element in closure
  return function onceHandler () {
    var res = handler.apply(null, arguments);
    if (res !== null) {
      remove$2(event, onceHandler, capture, _target);
    }
  }
}

// #9446: Firefox <= 53 (in particular, ESR 52) has incorrect Event.timeStamp
// implementation and does not fire microtasks in between event propagation, so
// safe to exclude.
var useMicrotaskFix = isUsingMicroTask && !(isFF && Number(isFF[1]) <= 53);

function add$1 (
  name,
  handler,
  capture,
  passive
) {
  // async edge case #6566: inner click event triggers patch, event handler
  // attached to outer element during patch, and triggered again. This
  // happens because browsers fire microtask ticks between event propagation.
  // the solution is simple: we save the timestamp when a handler is attached,
  // and the handler would only fire if the event passed to it was fired
  // AFTER it was attached.
  if (useMicrotaskFix) {
    var attachedTimestamp = currentFlushTimestamp;
    var original = handler;
    handler = original._wrapper = function (e) {
      if (
        // no bubbling, should always fire.
        // this is just a safety net in case event.timeStamp is unreliable in
        // certain weird environments...
        e.target === e.currentTarget ||
        // event is fired after handler attachment
        e.timeStamp >= attachedTimestamp ||
        // bail for environments that have buggy event.timeStamp implementations
        // #9462 iOS 9 bug: event.timeStamp is 0 after history.pushState
        // #9681 QtWebEngine event.timeStamp is negative value
        e.timeStamp <= 0 ||
        // #9448 bail if event is fired in another document in a multi-page
        // electron/nw.js app, since event.timeStamp will be using a different
        // starting reference
        e.target.ownerDocument !== document
      ) {
        return original.apply(this, arguments)
      }
    };
  }
  target$1.addEventListener(
    name,
    handler,
    supportsPassive
      ? { capture: capture, passive: passive }
      : capture
  );
}

function remove$2 (
  name,
  handler,
  capture,
  _target
) {
  (_target || target$1).removeEventListener(
    name,
    handler._wrapper || handler,
    capture
  );
}

function updateDOMListeners (oldVnode, vnode) {
  if (isUndef(oldVnode.data.on) && isUndef(vnode.data.on)) {
    return
  }
  var on = vnode.data.on || {};
  var oldOn = oldVnode.data.on || {};
  target$1 = vnode.elm;
  normalizeEvents(on);
  updateListeners(on, oldOn, add$1, remove$2, createOnceHandler$1, vnode.context);
  target$1 = undefined;
}

var events = {
  create: updateDOMListeners,
  update: updateDOMListeners
};

/*  */

var svgContainer;

function updateDOMProps (oldVnode, vnode) {
  if (isUndef(oldVnode.data.domProps) && isUndef(vnode.data.domProps)) {
    return
  }
  var key, cur;
  var elm = vnode.elm;
  var oldProps = oldVnode.data.domProps || {};
  var props = vnode.data.domProps || {};
  // clone observed objects, as the user probably wants to mutate it
  if (isDef(props.__ob__)) {
    props = vnode.data.domProps = extend({}, props);
  }

  for (key in oldProps) {
    if (!(key in props)) {
      elm[key] = '';
    }
  }

  for (key in props) {
    cur = props[key];
    // ignore children if the node has textContent or innerHTML,
    // as these will throw away existing DOM nodes and cause removal errors
    // on subsequent patches (#3360)
    if (key === 'textContent' || key === 'innerHTML') {
      if (vnode.children) { vnode.children.length = 0; }
      if (cur === oldProps[key]) { continue }
      // #6601 work around Chrome version <= 55 bug where single textNode
      // replaced by innerHTML/textContent retains its parentNode property
      if (elm.childNodes.length === 1) {
        elm.removeChild(elm.childNodes[0]);
      }
    }

    if (key === 'value' && elm.tagName !== 'PROGRESS') {
      // store value as _value as well since
      // non-string values will be stringified
      elm._value = cur;
      // avoid resetting cursor position when value is the same
      var strCur = isUndef(cur) ? '' : String(cur);
      if (shouldUpdateValue(elm, strCur)) {
        elm.value = strCur;
      }
    } else if (key === 'innerHTML' && isSVG(elm.tagName) && isUndef(elm.innerHTML)) {
      // IE doesn't support innerHTML for SVG elements
      svgContainer = svgContainer || document.createElement('div');
      svgContainer.innerHTML = "<svg>" + cur + "</svg>";
      var svg = svgContainer.firstChild;
      while (elm.firstChild) {
        elm.removeChild(elm.firstChild);
      }
      while (svg.firstChild) {
        elm.appendChild(svg.firstChild);
      }
    } else if (
      // skip the update if old and new VDOM state is the same.
      // `value` is handled separately because the DOM value may be temporarily
      // out of sync with VDOM state due to focus, composition and modifiers.
      // This  #4521 by skipping the unnecesarry `checked` update.
      cur !== oldProps[key]
    ) {
      // some property updates can throw
      // e.g. `value` on <progress> w/ non-finite value
      try {
        elm[key] = cur;
      } catch (e) {}
    }
  }
}

// check platforms/web/util/attrs.js acceptValue


function shouldUpdateValue (elm, checkVal) {
  return (!elm.composing && (
    elm.tagName === 'OPTION' ||
    isNotInFocusAndDirty(elm, checkVal) ||
    isDirtyWithModifiers(elm, checkVal)
  ))
}

function isNotInFocusAndDirty (elm, checkVal) {
  // return true when textbox (.number and .trim) loses focus and its value is
  // not equal to the updated value
  var notInFocus = true;
  // #6157
  // work around IE bug when accessing document.activeElement in an iframe
  try { notInFocus = document.activeElement !== elm; } catch (e) {}
  return notInFocus && elm.value !== checkVal
}

function isDirtyWithModifiers (elm, newVal) {
  var value = elm.value;
  var modifiers = elm._vModifiers; // injected by v-model runtime
  if (isDef(modifiers)) {
    if (modifiers.number) {
      return toNumber(value) !== toNumber(newVal)
    }
    if (modifiers.trim) {
      return value.trim() !== newVal.trim()
    }
  }
  return value !== newVal
}

var domProps = {
  create: updateDOMProps,
  update: updateDOMProps
};

/*  */

var parseStyleText = cached(function (cssText) {
  var res = {};
  var listDelimiter = /;(?![^(]*\))/g;
  var propertyDelimiter = /:(.+)/;
  cssText.split(listDelimiter).forEach(function (item) {
    if (item) {
      var tmp = item.split(propertyDelimiter);
      tmp.length > 1 && (res[tmp[0].trim()] = tmp[1].trim());
    }
  });
  return res
});

// merge static and dynamic style data on the same vnode
function normalizeStyleData (data) {
  var style = normalizeStyleBinding(data.style);
  // static style is pre-processed into an object during compilation
  // and is always a fresh object, so it's safe to merge into it
  return data.staticStyle
    ? extend(data.staticStyle, style)
    : style
}

// normalize possible array / string values into Object
function normalizeStyleBinding (bindingStyle) {
  if (Array.isArray(bindingStyle)) {
    return toObject(bindingStyle)
  }
  if (typeof bindingStyle === 'string') {
    return parseStyleText(bindingStyle)
  }
  return bindingStyle
}

/**
 * parent component style should be after child's
 * so that parent component's style could override it
 */
function getStyle (vnode, checkChild) {
  var res = {};
  var styleData;

  if (checkChild) {
    var childNode = vnode;
    while (childNode.componentInstance) {
      childNode = childNode.componentInstance._vnode;
      if (
        childNode && childNode.data &&
        (styleData = normalizeStyleData(childNode.data))
      ) {
        extend(res, styleData);
      }
    }
  }

  if ((styleData = normalizeStyleData(vnode.data))) {
    extend(res, styleData);
  }

  var parentNode = vnode;
  while ((parentNode = parentNode.parent)) {
    if (parentNode.data && (styleData = normalizeStyleData(parentNode.data))) {
      extend(res, styleData);
    }
  }
  return res
}

/*  */

var cssVarRE = /^--/;
var importantRE = /\s*!important$/;
var setProp = function (el, name, val) {
  /* istanbul ignore if */
  if (cssVarRE.test(name)) {
    el.style.setProperty(name, val);
  } else if (importantRE.test(val)) {
    el.style.setProperty(hyphenate(name), val.replace(importantRE, ''), 'important');
  } else {
    var normalizedName = normalize(name);
    if (Array.isArray(val)) {
      // Support values array created by autoprefixer, e.g.
      // {display: ["-webkit-box", "-ms-flexbox", "flex"]}
      // Set them one by one, and the browser will only set those it can recognize
      for (var i = 0, len = val.length; i < len; i++) {
        el.style[normalizedName] = val[i];
      }
    } else {
      el.style[normalizedName] = val;
    }
  }
};

var vendorNames = ['Webkit', 'Moz', 'ms'];

var emptyStyle;
var normalize = cached(function (prop) {
  emptyStyle = emptyStyle || document.createElement('div').style;
  prop = camelize(prop);
  if (prop !== 'filter' && (prop in emptyStyle)) {
    return prop
  }
  var capName = prop.charAt(0).toUpperCase() + prop.slice(1);
  for (var i = 0; i < vendorNames.length; i++) {
    var name = vendorNames[i] + capName;
    if (name in emptyStyle) {
      return name
    }
  }
});

function updateStyle (oldVnode, vnode) {
  var data = vnode.data;
  var oldData = oldVnode.data;

  if (isUndef(data.staticStyle) && isUndef(data.style) &&
    isUndef(oldData.staticStyle) && isUndef(oldData.style)
  ) {
    return
  }

  var cur, name;
  var el = vnode.elm;
  var oldStaticStyle = oldData.staticStyle;
  var oldStyleBinding = oldData.normalizedStyle || oldData.style || {};

  // if static style exists, stylebinding already merged into it when doing normalizeStyleData
  var oldStyle = oldStaticStyle || oldStyleBinding;

  var style = normalizeStyleBinding(vnode.data.style) || {};

  // store normalized style under a different key for next diff
  // make sure to clone it if it's reactive, since the user likely wants
  // to mutate it.
  vnode.data.normalizedStyle = isDef(style.__ob__)
    ? extend({}, style)
    : style;

  var newStyle = getStyle(vnode, true);

  for (name in oldStyle) {
    if (isUndef(newStyle[name])) {
      setProp(el, name, '');
    }
  }
  for (name in newStyle) {
    cur = newStyle[name];
    if (cur !== oldStyle[name]) {
      // ie9 setting to null has no effect, must use empty string
      setProp(el, name, cur == null ? '' : cur);
    }
  }
}

var style = {
  create: updateStyle,
  update: updateStyle
};

/*  */

var whitespaceRE = /\s+/;

/**
 * Add class with compatibility for SVG since classList is not supported on
 * SVG elements in IE
 */
function addClass (el, cls) {
  /* istanbul ignore if */
  if (!cls || !(cls = cls.trim())) {
    return
  }

  /* istanbul ignore else */
  if (el.classList) {
    if (cls.indexOf(' ') > -1) {
      cls.split(whitespaceRE).forEach(function (c) { return el.classList.add(c); });
    } else {
      el.classList.add(cls);
    }
  } else {
    var cur = " " + (el.getAttribute('class') || '') + " ";
    if (cur.indexOf(' ' + cls + ' ') < 0) {
      el.setAttribute('class', (cur + cls).trim());
    }
  }
}

/**
 * Remove class with compatibility for SVG since classList is not supported on
 * SVG elements in IE
 */
function removeClass (el, cls) {
  /* istanbul ignore if */
  if (!cls || !(cls = cls.trim())) {
    return
  }

  /* istanbul ignore else */
  if (el.classList) {
    if (cls.indexOf(' ') > -1) {
      cls.split(whitespaceRE).forEach(function (c) { return el.classList.remove(c); });
    } else {
      el.classList.remove(cls);
    }
    if (!el.classList.length) {
      el.removeAttribute('class');
    }
  } else {
    var cur = " " + (el.getAttribute('class') || '') + " ";
    var tar = ' ' + cls + ' ';
    while (cur.indexOf(tar) >= 0) {
      cur = cur.replace(tar, ' ');
    }
    cur = cur.trim();
    if (cur) {
      el.setAttribute('class', cur);
    } else {
      el.removeAttribute('class');
    }
  }
}

/*  */

function resolveTransition (def$$1) {
  if (!def$$1) {
    return
  }
  /* istanbul ignore else */
  if (typeof def$$1 === 'object') {
    var res = {};
    if (def$$1.css !== false) {
      extend(res, autoCssTransition(def$$1.name || 'v'));
    }
    extend(res, def$$1);
    return res
  } else if (typeof def$$1 === 'string') {
    return autoCssTransition(def$$1)
  }
}

var autoCssTransition = cached(function (name) {
  return {
    enterClass: (name + "-enter"),
    enterToClass: (name + "-enter-to"),
    enterActiveClass: (name + "-enter-active"),
    leaveClass: (name + "-leave"),
    leaveToClass: (name + "-leave-to"),
    leaveActiveClass: (name + "-leave-active")
  }
});

var hasTransition = inBrowser && !isIE9;
var TRANSITION = 'transition';
var ANIMATION = 'animation';

// Transition property/event sniffing
var transitionProp = 'transition';
var transitionEndEvent = 'transitionend';
var animationProp = 'animation';
var animationEndEvent = 'animationend';
if (hasTransition) {
  /* istanbul ignore if */
  if (window.ontransitionend === undefined &&
    window.onwebkittransitionend !== undefined
  ) {
    transitionProp = 'WebkitTransition';
    transitionEndEvent = 'webkitTransitionEnd';
  }
  if (window.onanimationend === undefined &&
    window.onwebkitanimationend !== undefined
  ) {
    animationProp = 'WebkitAnimation';
    animationEndEvent = 'webkitAnimationEnd';
  }
}

// binding to window is necessary to make hot reload work in IE in strict mode
var raf = inBrowser
  ? window.requestAnimationFrame
    ? window.requestAnimationFrame.bind(window)
    : setTimeout
  : /* istanbul ignore next */ function (fn) { return fn(); };

function nextFrame (fn) {
  raf(function () {
    raf(fn);
  });
}

function addTransitionClass (el, cls) {
  var transitionClasses = el._transitionClasses || (el._transitionClasses = []);
  if (transitionClasses.indexOf(cls) < 0) {
    transitionClasses.push(cls);
    addClass(el, cls);
  }
}

function removeTransitionClass (el, cls) {
  if (el._transitionClasses) {
    remove(el._transitionClasses, cls);
  }
  removeClass(el, cls);
}

function whenTransitionEnds (
  el,
  expectedType,
  cb
) {
  var ref = getTransitionInfo(el, expectedType);
  var type = ref.type;
  var timeout = ref.timeout;
  var propCount = ref.propCount;
  if (!type) { return cb() }
  var event = type === TRANSITION ? transitionEndEvent : animationEndEvent;
  var ended = 0;
  var end = function () {
    el.removeEventListener(event, onEnd);
    cb();
  };
  var onEnd = function (e) {
    if (e.target === el) {
      if (++ended >= propCount) {
        end();
      }
    }
  };
  setTimeout(function () {
    if (ended < propCount) {
      end();
    }
  }, timeout + 1);
  el.addEventListener(event, onEnd);
}

var transformRE = /\b(transform|all)(,|$)/;

function getTransitionInfo (el, expectedType) {
  var styles = window.getComputedStyle(el);
  // JSDOM may return undefined for transition properties
  var transitionDelays = (styles[transitionProp + 'Delay'] || '').split(', ');
  var transitionDurations = (styles[transitionProp + 'Duration'] || '').split(', ');
  var transitionTimeout = getTimeout(transitionDelays, transitionDurations);
  var animationDelays = (styles[animationProp + 'Delay'] || '').split(', ');
  var animationDurations = (styles[animationProp + 'Duration'] || '').split(', ');
  var animationTimeout = getTimeout(animationDelays, animationDurations);

  var type;
  var timeout = 0;
  var propCount = 0;
  /* istanbul ignore if */
  if (expectedType === TRANSITION) {
    if (transitionTimeout > 0) {
      type = TRANSITION;
      timeout = transitionTimeout;
      propCount = transitionDurations.length;
    }
  } else if (expectedType === ANIMATION) {
    if (animationTimeout > 0) {
      type = ANIMATION;
      timeout = animationTimeout;
      propCount = animationDurations.length;
    }
  } else {
    timeout = Math.max(transitionTimeout, animationTimeout);
    type = timeout > 0
      ? transitionTimeout > animationTimeout
        ? TRANSITION
        : ANIMATION
      : null;
    propCount = type
      ? type === TRANSITION
        ? transitionDurations.length
        : animationDurations.length
      : 0;
  }
  var hasTransform =
    type === TRANSITION &&
    transformRE.test(styles[transitionProp + 'Property']);
  return {
    type: type,
    timeout: timeout,
    propCount: propCount,
    hasTransform: hasTransform
  }
}

function getTimeout (delays, durations) {
  /* istanbul ignore next */
  while (delays.length < durations.length) {
    delays = delays.concat(delays);
  }

  return Math.max.apply(null, durations.map(function (d, i) {
    return toMs(d) + toMs(delays[i])
  }))
}

// Old versions of Chromium (below 61.0.3163.100) formats floating pointer numbers
// in a locale-dependent way, using a comma instead of a dot.
// If comma is not replaced with a dot, the input will be rounded down (i.e. acting
// as a floor function) causing unexpected behaviors
function toMs (s) {
  return Number(s.slice(0, -1).replace(',', '.')) * 1000
}

/*  */

function enter (vnode, toggleDisplay) {
  var el = vnode.elm;

  // call leave callback now
  if (isDef(el._leaveCb)) {
    el._leaveCb.cancelled = true;
    el._leaveCb();
  }

  var data = resolveTransition(vnode.data.transition);
  if (isUndef(data)) {
    return
  }

  /* istanbul ignore if */
  if (isDef(el._enterCb) || el.nodeType !== 1) {
    return
  }

  var css = data.css;
  var type = data.type;
  var enterClass = data.enterClass;
  var enterToClass = data.enterToClass;
  var enterActiveClass = data.enterActiveClass;
  var appearClass = data.appearClass;
  var appearToClass = data.appearToClass;
  var appearActiveClass = data.appearActiveClass;
  var beforeEnter = data.beforeEnter;
  var enter = data.enter;
  var afterEnter = data.afterEnter;
  var enterCancelled = data.enterCancelled;
  var beforeAppear = data.beforeAppear;
  var appear = data.appear;
  var afterAppear = data.afterAppear;
  var appearCancelled = data.appearCancelled;
  var duration = data.duration;

  // activeInstance will always be the <transition> component managing this
  // transition. One edge case to check is when the <transition> is placed
  // as the root node of a child component. In that case we need to check
  // <transition>'s parent for appear check.
  var context = activeInstance;
  var transitionNode = activeInstance.$vnode;
  while (transitionNode && transitionNode.parent) {
    context = transitionNode.context;
    transitionNode = transitionNode.parent;
  }

  var isAppear = !context._isMounted || !vnode.isRootInsert;

  if (isAppear && !appear && appear !== '') {
    return
  }

  var startClass = isAppear && appearClass
    ? appearClass
    : enterClass;
  var activeClass = isAppear && appearActiveClass
    ? appearActiveClass
    : enterActiveClass;
  var toClass = isAppear && appearToClass
    ? appearToClass
    : enterToClass;

  var beforeEnterHook = isAppear
    ? (beforeAppear || beforeEnter)
    : beforeEnter;
  var enterHook = isAppear
    ? (typeof appear === 'function' ? appear : enter)
    : enter;
  var afterEnterHook = isAppear
    ? (afterAppear || afterEnter)
    : afterEnter;
  var enterCancelledHook = isAppear
    ? (appearCancelled || enterCancelled)
    : enterCancelled;

  var explicitEnterDuration = toNumber(
    isObject(duration)
      ? duration.enter
      : duration
  );

  if (explicitEnterDuration != null) {
    checkDuration(explicitEnterDuration, 'enter', vnode);
  }

  var expectsCSS = css !== false && !isIE9;
  var userWantsControl = getHookArgumentsLength(enterHook);

  var cb = el._enterCb = once(function () {
    if (expectsCSS) {
      removeTransitionClass(el, toClass);
      removeTransitionClass(el, activeClass);
    }
    if (cb.cancelled) {
      if (expectsCSS) {
        removeTransitionClass(el, startClass);
      }
      enterCancelledHook && enterCancelledHook(el);
    } else {
      afterEnterHook && afterEnterHook(el);
    }
    el._enterCb = null;
  });

  if (!vnode.data.show) {
    // remove pending leave element on enter by injecting an insert hook
    mergeVNodeHook(vnode, 'insert', function () {
      var parent = el.parentNode;
      var pendingNode = parent && parent._pending && parent._pending[vnode.key];
      if (pendingNode &&
        pendingNode.tag === vnode.tag &&
        pendingNode.elm._leaveCb
      ) {
        pendingNode.elm._leaveCb();
      }
      enterHook && enterHook(el, cb);
    });
  }

  // start enter transition
  beforeEnterHook && beforeEnterHook(el);
  if (expectsCSS) {
    addTransitionClass(el, startClass);
    addTransitionClass(el, activeClass);
    nextFrame(function () {
      removeTransitionClass(el, startClass);
      if (!cb.cancelled) {
        addTransitionClass(el, toClass);
        if (!userWantsControl) {
          if (isValidDuration(explicitEnterDuration)) {
            setTimeout(cb, explicitEnterDuration);
          } else {
            whenTransitionEnds(el, type, cb);
          }
        }
      }
    });
  }

  if (vnode.data.show) {
    toggleDisplay && toggleDisplay();
    enterHook && enterHook(el, cb);
  }

  if (!expectsCSS && !userWantsControl) {
    cb();
  }
}

function leave (vnode, rm) {
  var el = vnode.elm;

  // call enter callback now
  if (isDef(el._enterCb)) {
    el._enterCb.cancelled = true;
    el._enterCb();
  }

  var data = resolveTransition(vnode.data.transition);
  if (isUndef(data) || el.nodeType !== 1) {
    return rm()
  }

  /* istanbul ignore if */
  if (isDef(el._leaveCb)) {
    return
  }

  var css = data.css;
  var type = data.type;
  var leaveClass = data.leaveClass;
  var leaveToClass = data.leaveToClass;
  var leaveActiveClass = data.leaveActiveClass;
  var beforeLeave = data.beforeLeave;
  var leave = data.leave;
  var afterLeave = data.afterLeave;
  var leaveCancelled = data.leaveCancelled;
  var delayLeave = data.delayLeave;
  var duration = data.duration;

  var expectsCSS = css !== false && !isIE9;
  var userWantsControl = getHookArgumentsLength(leave);

  var explicitLeaveDuration = toNumber(
    isObject(duration)
      ? duration.leave
      : duration
  );

  if (isDef(explicitLeaveDuration)) {
    checkDuration(explicitLeaveDuration, 'leave', vnode);
  }

  var cb = el._leaveCb = once(function () {
    if (el.parentNode && el.parentNode._pending) {
      el.parentNode._pending[vnode.key] = null;
    }
    if (expectsCSS) {
      removeTransitionClass(el, leaveToClass);
      removeTransitionClass(el, leaveActiveClass);
    }
    if (cb.cancelled) {
      if (expectsCSS) {
        removeTransitionClass(el, leaveClass);
      }
      leaveCancelled && leaveCancelled(el);
    } else {
      rm();
      afterLeave && afterLeave(el);
    }
    el._leaveCb = null;
  });

  if (delayLeave) {
    delayLeave(performLeave);
  } else {
    performLeave();
  }

  function performLeave () {
    // the delayed leave may have already been cancelled
    if (cb.cancelled) {
      return
    }
    // record leaving element
    if (!vnode.data.show && el.parentNode) {
      (el.parentNode._pending || (el.parentNode._pending = {}))[(vnode.key)] = vnode;
    }
    beforeLeave && beforeLeave(el);
    if (expectsCSS) {
      addTransitionClass(el, leaveClass);
      addTransitionClass(el, leaveActiveClass);
      nextFrame(function () {
        removeTransitionClass(el, leaveClass);
        if (!cb.cancelled) {
          addTransitionClass(el, leaveToClass);
          if (!userWantsControl) {
            if (isValidDuration(explicitLeaveDuration)) {
              setTimeout(cb, explicitLeaveDuration);
            } else {
              whenTransitionEnds(el, type, cb);
            }
          }
        }
      });
    }
    leave && leave(el, cb);
    if (!expectsCSS && !userWantsControl) {
      cb();
    }
  }
}

// only used in dev mode
function checkDuration (val, name, vnode) {
  if (typeof val !== 'number') {
    warn(
      "<transition> explicit " + name + " duration is not a valid number - " +
      "got " + (JSON.stringify(val)) + ".",
      vnode.context
    );
  } else if (isNaN(val)) {
    warn(
      "<transition> explicit " + name + " duration is NaN - " +
      'the duration expression might be incorrect.',
      vnode.context
    );
  }
}

function isValidDuration (val) {
  return typeof val === 'number' && !isNaN(val)
}

/**
 * Normalize a transition hook's argument length. The hook may be:
 * - a merged hook (invoker) with the original in .fns
 * - a wrapped component method (check ._length)
 * - a plain function (.length)
 */
function getHookArgumentsLength (fn) {
  if (isUndef(fn)) {
    return false
  }
  var invokerFns = fn.fns;
  if (isDef(invokerFns)) {
    // invoker
    return getHookArgumentsLength(
      Array.isArray(invokerFns)
        ? invokerFns[0]
        : invokerFns
    )
  } else {
    return (fn._length || fn.length) > 1
  }
}

function _enter (_, vnode) {
  if (vnode.data.show !== true) {
    enter(vnode);
  }
}

var transition = inBrowser ? {
  create: _enter,
  activate: _enter,
  remove: function remove$$1 (vnode, rm) {
    /* istanbul ignore else */
    if (vnode.data.show !== true) {
      leave(vnode, rm);
    } else {
      rm();
    }
  }
} : {};

var platformModules = [
  attrs,
  klass,
  events,
  domProps,
  style,
  transition
];

/*  */

// the directive module should be applied last, after all
// built-in modules have been applied.
var modules = platformModules.concat(baseModules);

var patch = createPatchFunction({ nodeOps: nodeOps, modules: modules });

/**
 * Not type checking this file because flow doesn't like attaching
 * properties to Elements.
 */

/* istanbul ignore if */
if (isIE9) {
  // http://www.matts411.com/post/internet-explorer-9-oninput/
  document.addEventListener('selectionchange', function () {
    var el = document.activeElement;
    if (el && el.vmodel) {
      trigger(el, 'input');
    }
  });
}

var directive = {
  inserted: function inserted (el, binding, vnode, oldVnode) {
    if (vnode.tag === 'select') {
      // #6903
      if (oldVnode.elm && !oldVnode.elm._vOptions) {
        mergeVNodeHook(vnode, 'postpatch', function () {
          directive.componentUpdated(el, binding, vnode);
        });
      } else {
        setSelected(el, binding, vnode.context);
      }
      el._vOptions = [].map.call(el.options, getValue);
    } else if (vnode.tag === 'textarea' || isTextInputType(el.type)) {
      el._vModifiers = binding.modifiers;
      if (!binding.modifiers.lazy) {
        el.addEventListener('compositionstart', onCompositionStart);
        el.addEventListener('compositionend', onCompositionEnd);
        // Safari < 10.2 & UIWebView doesn't fire compositionend when
        // switching focus before confirming composition choice
        // this also fixes the issue where some browsers e.g. iOS Chrome
        // fires "change" instead of "input" on autocomplete.
        el.addEventListener('change', onCompositionEnd);
        /* istanbul ignore if */
        if (isIE9) {
          el.vmodel = true;
        }
      }
    }
  },

  componentUpdated: function componentUpdated (el, binding, vnode) {
    if (vnode.tag === 'select') {
      setSelected(el, binding, vnode.context);
      // in case the options rendered by v-for have changed,
      // it's possible that the value is out-of-sync with the rendered options.
      // detect such cases and filter out values that no longer has a matching
      // option in the DOM.
      var prevOptions = el._vOptions;
      var curOptions = el._vOptions = [].map.call(el.options, getValue);
      if (curOptions.some(function (o, i) { return !looseEqual(o, prevOptions[i]); })) {
        // trigger change event if
        // no matching option found for at least one value
        var needReset = el.multiple
          ? binding.value.some(function (v) { return hasNoMatchingOption(v, curOptions); })
          : binding.value !== binding.oldValue && hasNoMatchingOption(binding.value, curOptions);
        if (needReset) {
          trigger(el, 'change');
        }
      }
    }
  }
};

function setSelected (el, binding, vm) {
  actuallySetSelected(el, binding, vm);
  /* istanbul ignore if */
  if (isIE || isEdge) {
    setTimeout(function () {
      actuallySetSelected(el, binding, vm);
    }, 0);
  }
}

function actuallySetSelected (el, binding, vm) {
  var value = binding.value;
  var isMultiple = el.multiple;
  if (isMultiple && !Array.isArray(value)) {
    warn(
      "<select multiple v-model=\"" + (binding.expression) + "\"> " +
      "expects an Array value for its binding, but got " + (Object.prototype.toString.call(value).slice(8, -1)),
      vm
    );
    return
  }
  var selected, option;
  for (var i = 0, l = el.options.length; i < l; i++) {
    option = el.options[i];
    if (isMultiple) {
      selected = looseIndexOf(value, getValue(option)) > -1;
      if (option.selected !== selected) {
        option.selected = selected;
      }
    } else {
      if (looseEqual(getValue(option), value)) {
        if (el.selectedIndex !== i) {
          el.selectedIndex = i;
        }
        return
      }
    }
  }
  if (!isMultiple) {
    el.selectedIndex = -1;
  }
}

function hasNoMatchingOption (value, options) {
  return options.every(function (o) { return !looseEqual(o, value); })
}

function getValue (option) {
  return '_value' in option
    ? option._value
    : option.value
}

function onCompositionStart (e) {
  e.target.composing = true;
}

function onCompositionEnd (e) {
  // prevent triggering an input event for no reason
  if (!e.target.composing) { return }
  e.target.composing = false;
  trigger(e.target, 'input');
}

function trigger (el, type) {
  var e = document.createEvent('HTMLEvents');
  e.initEvent(type, true, true);
  el.dispatchEvent(e);
}

/*  */

// recursively search for possible transition defined inside the component root
function locateNode (vnode) {
  return vnode.componentInstance && (!vnode.data || !vnode.data.transition)
    ? locateNode(vnode.componentInstance._vnode)
    : vnode
}

var show = {
  bind: function bind (el, ref, vnode) {
    var value = ref.value;

    vnode = locateNode(vnode);
    var transition$$1 = vnode.data && vnode.data.transition;
    var originalDisplay = el.__vOriginalDisplay =
      el.style.display === 'none' ? '' : el.style.display;
    if (value && transition$$1) {
      vnode.data.show = true;
      enter(vnode, function () {
        el.style.display = originalDisplay;
      });
    } else {
      el.style.display = value ? originalDisplay : 'none';
    }
  },

  update: function update (el, ref, vnode) {
    var value = ref.value;
    var oldValue = ref.oldValue;

    /* istanbul ignore if */
    if (!value === !oldValue) { return }
    vnode = locateNode(vnode);
    var transition$$1 = vnode.data && vnode.data.transition;
    if (transition$$1) {
      vnode.data.show = true;
      if (value) {
        enter(vnode, function () {
          el.style.display = el.__vOriginalDisplay;
        });
      } else {
        leave(vnode, function () {
          el.style.display = 'none';
        });
      }
    } else {
      el.style.display = value ? el.__vOriginalDisplay : 'none';
    }
  },

  unbind: function unbind (
    el,
    binding,
    vnode,
    oldVnode,
    isDestroy
  ) {
    if (!isDestroy) {
      el.style.display = el.__vOriginalDisplay;
    }
  }
};

var platformDirectives = {
  model: directive,
  show: show
};

/*  */

var transitionProps = {
  name: String,
  appear: Boolean,
  css: Boolean,
  mode: String,
  type: String,
  enterClass: String,
  leaveClass: String,
  enterToClass: String,
  leaveToClass: String,
  enterActiveClass: String,
  leaveActiveClass: String,
  appearClass: String,
  appearActiveClass: String,
  appearToClass: String,
  duration: [Number, String, Object]
};

// in case the child is also an abstract component, e.g. <keep-alive>
// we want to recursively retrieve the real component to be rendered
function getRealChild (vnode) {
  var compOptions = vnode && vnode.componentOptions;
  if (compOptions && compOptions.Ctor.options.abstract) {
    return getRealChild(getFirstComponentChild(compOptions.children))
  } else {
    return vnode
  }
}

function extractTransitionData (comp) {
  var data = {};
  var options = comp.$options;
  // props
  for (var key in options.propsData) {
    data[key] = comp[key];
  }
  // events.
  // extract listeners and pass them directly to the transition methods
  var listeners = options._parentListeners;
  for (var key$1 in listeners) {
    data[camelize(key$1)] = listeners[key$1];
  }
  return data
}

function placeholder (h, rawChild) {
  if (/\d-keep-alive$/.test(rawChild.tag)) {
    return h('keep-alive', {
      props: rawChild.componentOptions.propsData
    })
  }
}

function hasParentTransition (vnode) {
  while ((vnode = vnode.parent)) {
    if (vnode.data.transition) {
      return true
    }
  }
}

function isSameChild (child, oldChild) {
  return oldChild.key === child.key && oldChild.tag === child.tag
}

var isNotTextNode = function (c) { return c.tag || isAsyncPlaceholder(c); };

var isVShowDirective = function (d) { return d.name === 'show'; };

var Transition = {
  name: 'transition',
  props: transitionProps,
  abstract: true,

  render: function render (h) {
    var this$1 = this;

    var children = this.$slots.default;
    if (!children) {
      return
    }

    // filter out text nodes (possible whitespaces)
    children = children.filter(isNotTextNode);
    /* istanbul ignore if */
    if (!children.length) {
      return
    }

    // warn multiple elements
    if (children.length > 1) {
      warn(
        '<transition> can only be used on a single element. Use ' +
        '<transition-group> for lists.',
        this.$parent
      );
    }

    var mode = this.mode;

    // warn invalid mode
    if (mode && mode !== 'in-out' && mode !== 'out-in'
    ) {
      warn(
        'invalid <transition> mode: ' + mode,
        this.$parent
      );
    }

    var rawChild = children[0];

    // if this is a component root node and the component's
    // parent container node also has transition, skip.
    if (hasParentTransition(this.$vnode)) {
      return rawChild
    }

    // apply transition data to child
    // use getRealChild() to ignore abstract components e.g. keep-alive
    var child = getRealChild(rawChild);
    /* istanbul ignore if */
    if (!child) {
      return rawChild
    }

    if (this._leaving) {
      return placeholder(h, rawChild)
    }

    // ensure a key that is unique to the vnode type and to this transition
    // component instance. This key will be used to remove pending leaving nodes
    // during entering.
    var id = "__transition-" + (this._uid) + "-";
    child.key = child.key == null
      ? child.isComment
        ? id + 'comment'
        : id + child.tag
      : isPrimitive(child.key)
        ? (String(child.key).indexOf(id) === 0 ? child.key : id + child.key)
        : child.key;

    var data = (child.data || (child.data = {})).transition = extractTransitionData(this);
    var oldRawChild = this._vnode;
    var oldChild = getRealChild(oldRawChild);

    // mark v-show
    // so that the transition module can hand over the control to the directive
    if (child.data.directives && child.data.directives.some(isVShowDirective)) {
      child.data.show = true;
    }

    if (
      oldChild &&
      oldChild.data &&
      !isSameChild(child, oldChild) &&
      !isAsyncPlaceholder(oldChild) &&
      // #6687 component root is a comment node
      !(oldChild.componentInstance && oldChild.componentInstance._vnode.isComment)
    ) {
      // replace old child transition data with fresh one
      // important for dynamic transitions!
      var oldData = oldChild.data.transition = extend({}, data);
      // handle transition mode
      if (mode === 'out-in') {
        // return placeholder node and queue update when leave finishes
        this._leaving = true;
        mergeVNodeHook(oldData, 'afterLeave', function () {
          this$1._leaving = false;
          this$1.$forceUpdate();
        });
        return placeholder(h, rawChild)
      } else if (mode === 'in-out') {
        if (isAsyncPlaceholder(child)) {
          return oldRawChild
        }
        var delayedLeave;
        var performLeave = function () { delayedLeave(); };
        mergeVNodeHook(data, 'afterEnter', performLeave);
        mergeVNodeHook(data, 'enterCancelled', performLeave);
        mergeVNodeHook(oldData, 'delayLeave', function (leave) { delayedLeave = leave; });
      }
    }

    return rawChild
  }
};

/*  */

var props = extend({
  tag: String,
  moveClass: String
}, transitionProps);

delete props.mode;

var TransitionGroup = {
  props: props,

  beforeMount: function beforeMount () {
    var this$1 = this;

    var update = this._update;
    this._update = function (vnode, hydrating) {
      var restoreActiveInstance = setActiveInstance(this$1);
      // force removing pass
      this$1.__patch__(
        this$1._vnode,
        this$1.kept,
        false, // hydrating
        true // removeOnly (!important, avoids unnecessary moves)
      );
      this$1._vnode = this$1.kept;
      restoreActiveInstance();
      update.call(this$1, vnode, hydrating);
    };
  },

  render: function render (h) {
    var tag = this.tag || this.$vnode.data.tag || 'span';
    var map = Object.create(null);
    var prevChildren = this.prevChildren = this.children;
    var rawChildren = this.$slots.default || [];
    var children = this.children = [];
    var transitionData = extractTransitionData(this);

    for (var i = 0; i < rawChildren.length; i++) {
      var c = rawChildren[i];
      if (c.tag) {
        if (c.key != null && String(c.key).indexOf('__vlist') !== 0) {
          children.push(c);
          map[c.key] = c
          ;(c.data || (c.data = {})).transition = transitionData;
        } else {
          var opts = c.componentOptions;
          var name = opts ? (opts.Ctor.options.name || opts.tag || '') : c.tag;
          warn(("<transition-group> children must be keyed: <" + name + ">"));
        }
      }
    }

    if (prevChildren) {
      var kept = [];
      var removed = [];
      for (var i$1 = 0; i$1 < prevChildren.length; i$1++) {
        var c$1 = prevChildren[i$1];
        c$1.data.transition = transitionData;
        c$1.data.pos = c$1.elm.getBoundingClientRect();
        if (map[c$1.key]) {
          kept.push(c$1);
        } else {
          removed.push(c$1);
        }
      }
      this.kept = h(tag, null, kept);
      this.removed = removed;
    }

    return h(tag, null, children)
  },

  updated: function updated () {
    var children = this.prevChildren;
    var moveClass = this.moveClass || ((this.name || 'v') + '-move');
    if (!children.length || !this.hasMove(children[0].elm, moveClass)) {
      return
    }

    // we divide the work into three loops to avoid mixing DOM reads and writes
    // in each iteration - which helps prevent layout thrashing.
    children.forEach(callPendingCbs);
    children.forEach(recordPosition);
    children.forEach(applyTranslation);

    // force reflow to put everything in position
    // assign to this to avoid being removed in tree-shaking
    // $flow-disable-line
    this._reflow = document.body.offsetHeight;

    children.forEach(function (c) {
      if (c.data.moved) {
        var el = c.elm;
        var s = el.style;
        addTransitionClass(el, moveClass);
        s.transform = s.WebkitTransform = s.transitionDuration = '';
        el.addEventListener(transitionEndEvent, el._moveCb = function cb (e) {
          if (e && e.target !== el) {
            return
          }
          if (!e || /transform$/.test(e.propertyName)) {
            el.removeEventListener(transitionEndEvent, cb);
            el._moveCb = null;
            removeTransitionClass(el, moveClass);
          }
        });
      }
    });
  },

  methods: {
    hasMove: function hasMove (el, moveClass) {
      /* istanbul ignore if */
      if (!hasTransition) {
        return false
      }
      /* istanbul ignore if */
      if (this._hasMove) {
        return this._hasMove
      }
      // Detect whether an element with the move class applied has
      // CSS transitions. Since the element may be inside an entering
      // transition at this very moment, we make a clone of it and remove
      // all other transition classes applied to ensure only the move class
      // is applied.
      var clone = el.cloneNode();
      if (el._transitionClasses) {
        el._transitionClasses.forEach(function (cls) { removeClass(clone, cls); });
      }
      addClass(clone, moveClass);
      clone.style.display = 'none';
      this.$el.appendChild(clone);
      var info = getTransitionInfo(clone);
      this.$el.removeChild(clone);
      return (this._hasMove = info.hasTransform)
    }
  }
};

function callPendingCbs (c) {
  /* istanbul ignore if */
  if (c.elm._moveCb) {
    c.elm._moveCb();
  }
  /* istanbul ignore if */
  if (c.elm._enterCb) {
    c.elm._enterCb();
  }
}

function recordPosition (c) {
  c.data.newPos = c.elm.getBoundingClientRect();
}

function applyTranslation (c) {
  var oldPos = c.data.pos;
  var newPos = c.data.newPos;
  var dx = oldPos.left - newPos.left;
  var dy = oldPos.top - newPos.top;
  if (dx || dy) {
    c.data.moved = true;
    var s = c.elm.style;
    s.transform = s.WebkitTransform = "translate(" + dx + "px," + dy + "px)";
    s.transitionDuration = '0s';
  }
}

var platformComponents = {
  Transition: Transition,
  TransitionGroup: TransitionGroup
};

/*  */

// install platform specific utils
Vue.config.mustUseProp = mustUseProp;
Vue.config.isReservedTag = isReservedTag;
Vue.config.isReservedAttr = isReservedAttr;
Vue.config.getTagNamespace = getTagNamespace;
Vue.config.isUnknownElement = isUnknownElement;

// install platform runtime directives & components
extend(Vue.options.directives, platformDirectives);
extend(Vue.options.components, platformComponents);

// install platform patch function
Vue.prototype.__patch__ = inBrowser ? patch : noop;

// public mount method
Vue.prototype.$mount = function (
  el,
  hydrating
) {
  el = el && inBrowser ? query(el) : undefined;
  return mountComponent(this, el, hydrating)
};

// devtools global hook
/* istanbul ignore next */
if (inBrowser) {
  setTimeout(function () {
    if (config.devtools) {
      if (devtools) {
        devtools.emit('init', Vue);
      } else {
        console[console.info ? 'info' : 'log'](
          'Download the Vue Devtools extension for a better development experience:\n' +
          'https://github.com/vuejs/vue-devtools'
        );
      }
    }
    if (config.productionTip !== false &&
      typeof console !== 'undefined'
    ) {
      console[console.info ? 'info' : 'log'](
        "You are running Vue in development mode.\n" +
        "Make sure to turn on production mode when deploying for production.\n" +
        "See more tips at https://vuejs.org/guide/deployment.html"
      );
    }
  }, 0);
}

/*  */

var defaultTagRE = /\{\{((?:.|\r?\n)+?)\}\}/g;
var regexEscapeRE = /[-.*+?^${}()|[\]\/\\]/g;

var buildRegex = cached(function (delimiters) {
  var open = delimiters[0].replace(regexEscapeRE, '\\$&');
  var close = delimiters[1].replace(regexEscapeRE, '\\$&');
  return new RegExp(open + '((?:.|\\n)+?)' + close, 'g')
});



function parseText (
  text,
  delimiters
) {
  var tagRE = delimiters ? buildRegex(delimiters) : defaultTagRE;
  if (!tagRE.test(text)) {
    return
  }
  var tokens = [];
  var rawTokens = [];
  var lastIndex = tagRE.lastIndex = 0;
  var match, index, tokenValue;
  while ((match = tagRE.exec(text))) {
    index = match.index;
    // push text token
    if (index > lastIndex) {
      rawTokens.push(tokenValue = text.slice(lastIndex, index));
      tokens.push(JSON.stringify(tokenValue));
    }
    // tag token
    var exp = parseFilters(match[1].trim());
    tokens.push(("_s(" + exp + ")"));
    rawTokens.push({ '@binding': exp });
    lastIndex = index + match[0].length;
  }
  if (lastIndex < text.length) {
    rawTokens.push(tokenValue = text.slice(lastIndex));
    tokens.push(JSON.stringify(tokenValue));
  }
  return {
    expression: tokens.join('+'),
    tokens: rawTokens
  }
}

/*  */

function transformNode (el, options) {
  var warn = options.warn || baseWarn;
  var staticClass = getAndRemoveAttr(el, 'class');
  if (staticClass) {
    var res = parseText(staticClass, options.delimiters);
    if (res) {
      warn(
        "class=\"" + staticClass + "\": " +
        'Interpolation inside attributes has been removed. ' +
        'Use v-bind or the colon shorthand instead. For example, ' +
        'instead of <div class="{{ val }}">, use <div :class="val">.',
        el.rawAttrsMap['class']
      );
    }
  }
  if (staticClass) {
    el.staticClass = JSON.stringify(staticClass);
  }
  var classBinding = getBindingAttr(el, 'class', false /* getStatic */);
  if (classBinding) {
    el.classBinding = classBinding;
  }
}

function genData (el) {
  var data = '';
  if (el.staticClass) {
    data += "staticClass:" + (el.staticClass) + ",";
  }
  if (el.classBinding) {
    data += "class:" + (el.classBinding) + ",";
  }
  return data
}

var klass$1 = {
  staticKeys: ['staticClass'],
  transformNode: transformNode,
  genData: genData
};

/*  */

function transformNode$1 (el, options) {
  var warn = options.warn || baseWarn;
  var staticStyle = getAndRemoveAttr(el, 'style');
  if (staticStyle) {
    /* istanbul ignore if */
    {
      var res = parseText(staticStyle, options.delimiters);
      if (res) {
        warn(
          "style=\"" + staticStyle + "\": " +
          'Interpolation inside attributes has been removed. ' +
          'Use v-bind or the colon shorthand instead. For example, ' +
          'instead of <div style="{{ val }}">, use <div :style="val">.',
          el.rawAttrsMap['style']
        );
      }
    }
    el.staticStyle = JSON.stringify(parseStyleText(staticStyle));
  }

  var styleBinding = getBindingAttr(el, 'style', false /* getStatic */);
  if (styleBinding) {
    el.styleBinding = styleBinding;
  }
}

function genData$1 (el) {
  var data = '';
  if (el.staticStyle) {
    data += "staticStyle:" + (el.staticStyle) + ",";
  }
  if (el.styleBinding) {
    data += "style:(" + (el.styleBinding) + "),";
  }
  return data
}

var style$1 = {
  staticKeys: ['staticStyle'],
  transformNode: transformNode$1,
  genData: genData$1
};

/*  */

var decoder;

var he = {
  decode: function decode (html) {
    decoder = decoder || document.createElement('div');
    decoder.innerHTML = html;
    return decoder.textContent
  }
};

/*  */

var isUnaryTag = makeMap(
  'area,base,br,col,embed,frame,hr,img,input,isindex,keygen,' +
  'link,meta,param,source,track,wbr'
);

// Elements that you can, intentionally, leave open
// (and which close themselves)
var canBeLeftOpenTag = makeMap(
  'colgroup,dd,dt,li,options,p,td,tfoot,th,thead,tr,source'
);

// HTML5 tags https://html.spec.whatwg.org/multipage/indices.html#elements-3
// Phrasing Content https://html.spec.whatwg.org/multipage/dom.html#phrasing-content
var isNonPhrasingTag = makeMap(
  'address,article,aside,base,blockquote,body,caption,col,colgroup,dd,' +
  'details,dialog,div,dl,dt,fieldset,figcaption,figure,footer,form,' +
  'h1,h2,h3,h4,h5,h6,head,header,hgroup,hr,html,legend,li,menuitem,meta,' +
  'optgroup,option,param,rp,rt,source,style,summary,tbody,td,tfoot,th,thead,' +
  'title,tr,track'
);

/**
 * Not type-checking this file because it's mostly vendor code.
 */

// Regular Expressions for parsing tags and attributes
var attribute = /^\s*([^\s"'<>\/=]+)(?:\s*(=)\s*(?:"([^"]*)"+|'([^']*)'+|([^\s"'=<>`]+)))?/;
var dynamicArgAttribute = /^\s*((?:v-[\w-]+:|@|:|#)\[[^=]+\][^\s"'<>\/=]*)(?:\s*(=)\s*(?:"([^"]*)"+|'([^']*)'+|([^\s"'=<>`]+)))?/;
var ncname = "[a-zA-Z_][\\-\\.0-9_a-zA-Z" + (unicodeRegExp.source) + "]*";
var qnameCapture = "((?:" + ncname + "\\:)?" + ncname + ")";
var startTagOpen = new RegExp(("^<" + qnameCapture));
var startTagClose = /^\s*(\/?)>/;
var endTag = new RegExp(("^<\\/" + qnameCapture + "[^>]*>"));
var doctype = /^<!DOCTYPE [^>]+>/i;
// #7298: escape - to avoid being pased as HTML comment when inlined in page
var comment = /^<!\--/;
var conditionalComment = /^<!\[/;

// Special Elements (can contain anything)
var isPlainTextElement = makeMap('script,style,textarea', true);
var reCache = {};

var decodingMap = {
  '&lt;': '<',
  '&gt;': '>',
  '&quot;': '"',
  '&amp;': '&',
  '&#10;': '\n',
  '&#9;': '\t',
  '&#39;': "'"
};
var encodedAttr = /&(?:lt|gt|quot|amp|#39);/g;
var encodedAttrWithNewLines = /&(?:lt|gt|quot|amp|#39|#10|#9);/g;

// #5992
var isIgnoreNewlineTag = makeMap('pre,textarea', true);
var shouldIgnoreFirstNewline = function (tag, html) { return tag && isIgnoreNewlineTag(tag) && html[0] === '\n'; };

function decodeAttr (value, shouldDecodeNewlines) {
  var re = shouldDecodeNewlines ? encodedAttrWithNewLines : encodedAttr;
  return value.replace(re, function (match) { return decodingMap[match]; })
}

function parseHTML (html, options) {
  var stack = [];
  var expectHTML = options.expectHTML;
  var isUnaryTag$$1 = options.isUnaryTag || no;
  var canBeLeftOpenTag$$1 = options.canBeLeftOpenTag || no;
  var index = 0;
  var last, lastTag;
  while (html) {
    last = html;
    // Make sure we're not in a plaintext content element like script/style
    if (!lastTag || !isPlainTextElement(lastTag)) {
      var textEnd = html.indexOf('<');
      if (textEnd === 0) {
        // Comment:
        if (comment.test(html)) {
          var commentEnd = html.indexOf('-->');

          if (commentEnd >= 0) {
            if (options.shouldKeepComment) {
              options.comment(html.substring(4, commentEnd), index, index + commentEnd + 3);
            }
            advance(commentEnd + 3);
            continue
          }
        }

        // http://en.wikipedia.org/wiki/Conditional_comment#Downlevel-revealed_conditional_comment
        if (conditionalComment.test(html)) {
          var conditionalEnd = html.indexOf(']>');

          if (conditionalEnd >= 0) {
            advance(conditionalEnd + 2);
            continue
          }
        }

        // Doctype:
        var doctypeMatch = html.match(doctype);
        if (doctypeMatch) {
          advance(doctypeMatch[0].length);
          continue
        }

        // End tag:
        var endTagMatch = html.match(endTag);
        if (endTagMatch) {
          var curIndex = index;
          advance(endTagMatch[0].length);
          parseEndTag(endTagMatch[1], curIndex, index);
          continue
        }

        // Start tag:
        var startTagMatch = parseStartTag();
        if (startTagMatch) {
          handleStartTag(startTagMatch);
          if (shouldIgnoreFirstNewline(startTagMatch.tagName, html)) {
            advance(1);
          }
          continue
        }
      }

      var text = (void 0), rest = (void 0), next = (void 0);
      if (textEnd >= 0) {
        rest = html.slice(textEnd);
        while (
          !endTag.test(rest) &&
          !startTagOpen.test(rest) &&
          !comment.test(rest) &&
          !conditionalComment.test(rest)
        ) {
          // < in plain text, be forgiving and treat it as text
          next = rest.indexOf('<', 1);
          if (next < 0) { break }
          textEnd += next;
          rest = html.slice(textEnd);
        }
        text = html.substring(0, textEnd);
      }

      if (textEnd < 0) {
        text = html;
      }

      if (text) {
        advance(text.length);
      }

      if (options.chars && text) {
        options.chars(text, index - text.length, index);
      }
    } else {
      var endTagLength = 0;
      var stackedTag = lastTag.toLowerCase();
      var reStackedTag = reCache[stackedTag] || (reCache[stackedTag] = new RegExp('([\\s\\S]*?)(</' + stackedTag + '[^>]*>)', 'i'));
      var rest$1 = html.replace(reStackedTag, function (all, text, endTag) {
        endTagLength = endTag.length;
        if (!isPlainTextElement(stackedTag) && stackedTag !== 'noscript') {
          text = text
            .replace(/<!\--([\s\S]*?)-->/g, '$1') // #7298
            .replace(/<!\[CDATA\[([\s\S]*?)]]>/g, '$1');
        }
        if (shouldIgnoreFirstNewline(stackedTag, text)) {
          text = text.slice(1);
        }
        if (options.chars) {
          options.chars(text);
        }
        return ''
      });
      index += html.length - rest$1.length;
      html = rest$1;
      parseEndTag(stackedTag, index - endTagLength, index);
    }

    if (html === last) {
      options.chars && options.chars(html);
      if (!stack.length && options.warn) {
        options.warn(("Mal-formatted tag at end of template: \"" + html + "\""), { start: index + html.length });
      }
      break
    }
  }

  // Clean up any remaining tags
  parseEndTag();

  function advance (n) {
    index += n;
    html = html.substring(n);
  }

  function parseStartTag () {
    var start = html.match(startTagOpen);
    if (start) {
      var match = {
        tagName: start[1],
        attrs: [],
        start: index
      };
      advance(start[0].length);
      var end, attr;
      while (!(end = html.match(startTagClose)) && (attr = html.match(dynamicArgAttribute) || html.match(attribute))) {
        attr.start = index;
        advance(attr[0].length);
        attr.end = index;
        match.attrs.push(attr);
      }
      if (end) {
        match.unarySlash = end[1];
        advance(end[0].length);
        match.end = index;
        return match
      }
    }
  }

  function handleStartTag (match) {
    var tagName = match.tagName;
    var unarySlash = match.unarySlash;

    if (expectHTML) {
      if (lastTag === 'p' && isNonPhrasingTag(tagName)) {
        parseEndTag(lastTag);
      }
      if (canBeLeftOpenTag$$1(tagName) && lastTag === tagName) {
        parseEndTag(tagName);
      }
    }

    var unary = isUnaryTag$$1(tagName) || !!unarySlash;

    var l = match.attrs.length;
    var attrs = new Array(l);
    for (var i = 0; i < l; i++) {
      var args = match.attrs[i];
      var value = args[3] || args[4] || args[5] || '';
      var shouldDecodeNewlines = tagName === 'a' && args[1] === 'href'
        ? options.shouldDecodeNewlinesForHref
        : options.shouldDecodeNewlines;
      attrs[i] = {
        name: args[1],
        value: decodeAttr(value, shouldDecodeNewlines)
      };
      if (options.outputSourceRange) {
        attrs[i].start = args.start + args[0].match(/^\s*/).length;
        attrs[i].end = args.end;
      }
    }

    if (!unary) {
      stack.push({ tag: tagName, lowerCasedTag: tagName.toLowerCase(), attrs: attrs, start: match.start, end: match.end });
      lastTag = tagName;
    }

    if (options.start) {
      options.start(tagName, attrs, unary, match.start, match.end);
    }
  }

  function parseEndTag (tagName, start, end) {
    var pos, lowerCasedTagName;
    if (start == null) { start = index; }
    if (end == null) { end = index; }

    // Find the closest opened tag of the same type
    if (tagName) {
      lowerCasedTagName = tagName.toLowerCase();
      for (pos = stack.length - 1; pos >= 0; pos--) {
        if (stack[pos].lowerCasedTag === lowerCasedTagName) {
          break
        }
      }
    } else {
      // If no tag name is provided, clean shop
      pos = 0;
    }

    if (pos >= 0) {
      // Close all the open elements, up the stack
      for (var i = stack.length - 1; i >= pos; i--) {
        if (i > pos || !tagName &&
          options.warn
        ) {
          options.warn(
            ("tag <" + (stack[i].tag) + "> has no matching end tag."),
            { start: stack[i].start, end: stack[i].end }
          );
        }
        if (options.end) {
          options.end(stack[i].tag, start, end);
        }
      }

      // Remove the open elements from the stack
      stack.length = pos;
      lastTag = pos && stack[pos - 1].tag;
    } else if (lowerCasedTagName === 'br') {
      if (options.start) {
        options.start(tagName, [], true, start, end);
      }
    } else if (lowerCasedTagName === 'p') {
      if (options.start) {
        options.start(tagName, [], false, start, end);
      }
      if (options.end) {
        options.end(tagName, start, end);
      }
    }
  }
}

/*  */

var onRE = /^@|^v-on:/;
var dirRE = /^v-|^@|^:/;
var forAliasRE = /([\s\S]*?)\s+(?:in|of)\s+([\s\S]*)/;
var forIteratorRE = /,([^,\}\]]*)(?:,([^,\}\]]*))?$/;
var stripParensRE = /^\(|\)$/g;
var dynamicArgRE = /^\[.*\]$/;

var argRE = /:(.*)$/;
var bindRE = /^:|^\.|^v-bind:/;
var modifierRE = /\.[^.\]]+(?=[^\]]*$)/g;

var slotRE = /^v-slot(:|$)|^#/;

var lineBreakRE = /[\r\n]/;
var whitespaceRE$1 = /\s+/g;

var invalidAttributeRE = /[\s"'<>\/=]/;

var decodeHTMLCached = cached(he.decode);

var emptySlotScopeToken = "_empty_";

// configurable state
var warn$2;
var delimiters;
var transforms;
var preTransforms;
var postTransforms;
var platformIsPreTag;
var platformMustUseProp;
var platformGetTagNamespace;
var maybeComponent;

function createASTElement (
  tag,
  attrs,
  parent
) {
  return {
    type: 1,
    tag: tag,
    attrsList: attrs,
    attrsMap: makeAttrsMap(attrs),
    rawAttrsMap: {},
    parent: parent,
    children: []
  }
}

/**
 * Convert HTML string to AST.
 */
function parse (
  template,
  options
) {
  warn$2 = options.warn || baseWarn;

  platformIsPreTag = options.isPreTag || no;
  platformMustUseProp = options.mustUseProp || no;
  platformGetTagNamespace = options.getTagNamespace || no;
  var isReservedTag = options.isReservedTag || no;
  maybeComponent = function (el) { return !!el.component || !isReservedTag(el.tag); };

  transforms = pluckModuleFunction(options.modules, 'transformNode');
  preTransforms = pluckModuleFunction(options.modules, 'preTransformNode');
  postTransforms = pluckModuleFunction(options.modules, 'postTransformNode');

  delimiters = options.delimiters;

  var stack = [];
  var preserveWhitespace = options.preserveWhitespace !== false;
  var whitespaceOption = options.whitespace;
  var root;
  var currentParent;
  var inVPre = false;
  var inPre = false;
  var warned = false;

  function warnOnce (msg, range) {
    if (!warned) {
      warned = true;
      warn$2(msg, range);
    }
  }

  function closeElement (element) {
    trimEndingWhitespace(element);
    if (!inVPre && !element.processed) {
      element = processElement(element, options);
    }
    // tree management
    if (!stack.length && element !== root) {
      // allow root elements with v-if, v-else-if and v-else
      if (root.if && (element.elseif || element.else)) {
        {
          checkRootConstraints(element);
        }
        addIfCondition(root, {
          exp: element.elseif,
          block: element
        });
      } else {
        warnOnce(
          "Component template should contain exactly one root element. " +
          "If you are using v-if on multiple elements, " +
          "use v-else-if to chain them instead.",
          { start: element.start }
        );
      }
    }
    if (currentParent && !element.forbidden) {
      if (element.elseif || element.else) {
        processIfConditions(element, currentParent);
      } else {
        if (element.slotScope) {
          // scoped slot
          // keep it in the children list so that v-else(-if) conditions can
          // find it as the prev node.
          var name = element.slotTarget || '"default"'
          ;(currentParent.scopedSlots || (currentParent.scopedSlots = {}))[name] = element;
        }
        currentParent.children.push(element);
        element.parent = currentParent;
      }
    }

    // final children cleanup
    // filter out scoped slots
    element.children = element.children.filter(function (c) { return !(c).slotScope; });
    // remove trailing whitespace node again
    trimEndingWhitespace(element);

    // check pre state
    if (element.pre) {
      inVPre = false;
    }
    if (platformIsPreTag(element.tag)) {
      inPre = false;
    }
    // apply post-transforms
    for (var i = 0; i < postTransforms.length; i++) {
      postTransforms[i](element, options);
    }
  }

  function trimEndingWhitespace (el) {
    // remove trailing whitespace node
    if (!inPre) {
      var lastNode;
      while (
        (lastNode = el.children[el.children.length - 1]) &&
        lastNode.type === 3 &&
        lastNode.text === ' '
      ) {
        el.children.pop();
      }
    }
  }

  function checkRootConstraints (el) {
    if (el.tag === 'slot' || el.tag === 'template') {
      warnOnce(
        "Cannot use <" + (el.tag) + "> as component root element because it may " +
        'contain multiple nodes.',
        { start: el.start }
      );
    }
    if (el.attrsMap.hasOwnProperty('v-for')) {
      warnOnce(
        'Cannot use v-for on stateful component root element because ' +
        'it renders multiple elements.',
        el.rawAttrsMap['v-for']
      );
    }
  }

  parseHTML(template, {
    warn: warn$2,
    expectHTML: options.expectHTML,
    isUnaryTag: options.isUnaryTag,
    canBeLeftOpenTag: options.canBeLeftOpenTag,
    shouldDecodeNewlines: options.shouldDecodeNewlines,
    shouldDecodeNewlinesForHref: options.shouldDecodeNewlinesForHref,
    shouldKeepComment: options.comments,
    outputSourceRange: options.outputSourceRange,
    start: function start (tag, attrs, unary, start$1, end) {
      // check namespace.
      // inherit parent ns if there is one
      var ns = (currentParent && currentParent.ns) || platformGetTagNamespace(tag);

      // handle IE svg bug
      /* istanbul ignore if */
      if (isIE && ns === 'svg') {
        attrs = guardIESVGBug(attrs);
      }

      var element = createASTElement(tag, attrs, currentParent);
      if (ns) {
        element.ns = ns;
      }

      {
        if (options.outputSourceRange) {
          element.start = start$1;
          element.end = end;
          element.rawAttrsMap = element.attrsList.reduce(function (cumulated, attr) {
            cumulated[attr.name] = attr;
            return cumulated
          }, {});
        }
        attrs.forEach(function (attr) {
          if (invalidAttributeRE.test(attr.name)) {
            warn$2(
              "Invalid dynamic argument expression: attribute names cannot contain " +
              "spaces, quotes, <, >, / or =.",
              {
                start: attr.start + attr.name.indexOf("["),
                end: attr.start + attr.name.length
              }
            );
          }
        });
      }

      if (isForbiddenTag(element) && !isServerRendering()) {
        element.forbidden = true;
        warn$2(
          'Templates should only be responsible for mapping the state to the ' +
          'UI. Avoid placing tags with side-effects in your templates, such as ' +
          "<" + tag + ">" + ', as they will not be parsed.',
          { start: element.start }
        );
      }

      // apply pre-transforms
      for (var i = 0; i < preTransforms.length; i++) {
        element = preTransforms[i](element, options) || element;
      }

      if (!inVPre) {
        processPre(element);
        if (element.pre) {
          inVPre = true;
        }
      }
      if (platformIsPreTag(element.tag)) {
        inPre = true;
      }
      if (inVPre) {
        processRawAttrs(element);
      } else if (!element.processed) {
        // structural directives
        processFor(element);
        processIf(element);
        processOnce(element);
      }

      if (!root) {
        root = element;
        {
          checkRootConstraints(root);
        }
      }

      if (!unary) {
        currentParent = element;
        stack.push(element);
      } else {
        closeElement(element);
      }
    },

    end: function end (tag, start, end$1) {
      var element = stack[stack.length - 1];
      // pop stack
      stack.length -= 1;
      currentParent = stack[stack.length - 1];
      if (options.outputSourceRange) {
        element.end = end$1;
      }
      closeElement(element);
    },

    chars: function chars (text, start, end) {
      if (!currentParent) {
        {
          if (text === template) {
            warnOnce(
              'Component template requires a root element, rather than just text.',
              { start: start }
            );
          } else if ((text = text.trim())) {
            warnOnce(
              ("text \"" + text + "\" outside root element will be ignored."),
              { start: start }
            );
          }
        }
        return
      }
      // IE textarea placeholder bug
      /* istanbul ignore if */
      if (isIE &&
        currentParent.tag === 'textarea' &&
        currentParent.attrsMap.placeholder === text
      ) {
        return
      }
      var children = currentParent.children;
      if (inPre || text.trim()) {
        text = isTextTag(currentParent) ? text : decodeHTMLCached(text);
      } else if (!children.length) {
        // remove the whitespace-only node right after an opening tag
        text = '';
      } else if (whitespaceOption) {
        if (whitespaceOption === 'condense') {
          // in condense mode, remove the whitespace node if it contains
          // line break, otherwise condense to a single space
          text = lineBreakRE.test(text) ? '' : ' ';
        } else {
          text = ' ';
        }
      } else {
        text = preserveWhitespace ? ' ' : '';
      }
      if (text) {
        if (!inPre && whitespaceOption === 'condense') {
          // condense consecutive whitespaces into single space
          text = text.replace(whitespaceRE$1, ' ');
        }
        var res;
        var child;
        if (!inVPre && text !== ' ' && (res = parseText(text, delimiters))) {
          child = {
            type: 2,
            expression: res.expression,
            tokens: res.tokens,
            text: text
          };
        } else if (text !== ' ' || !children.length || children[children.length - 1].text !== ' ') {
          child = {
            type: 3,
            text: text
          };
        }
        if (child) {
          if (options.outputSourceRange) {
            child.start = start;
            child.end = end;
          }
          children.push(child);
        }
      }
    },
    comment: function comment (text, start, end) {
      // adding anyting as a sibling to the root node is forbidden
      // comments should still be allowed, but ignored
      if (currentParent) {
        var child = {
          type: 3,
          text: text,
          isComment: true
        };
        if (options.outputSourceRange) {
          child.start = start;
          child.end = end;
        }
        currentParent.children.push(child);
      }
    }
  });
  return root
}

function processPre (el) {
  if (getAndRemoveAttr(el, 'v-pre') != null) {
    el.pre = true;
  }
}

function processRawAttrs (el) {
  var list = el.attrsList;
  var len = list.length;
  if (len) {
    var attrs = el.attrs = new Array(len);
    for (var i = 0; i < len; i++) {
      attrs[i] = {
        name: list[i].name,
        value: JSON.stringify(list[i].value)
      };
      if (list[i].start != null) {
        attrs[i].start = list[i].start;
        attrs[i].end = list[i].end;
      }
    }
  } else if (!el.pre) {
    // non root node in pre blocks with no attributes
    el.plain = true;
  }
}

function processElement (
  element,
  options
) {
  processKey(element);

  // determine whether this is a plain element after
  // removing structural attributes
  element.plain = (
    !element.key &&
    !element.scopedSlots &&
    !element.attrsList.length
  );

  processRef(element);
  processSlotContent(element);
  processSlotOutlet(element);
  processComponent(element);
  for (var i = 0; i < transforms.length; i++) {
    element = transforms[i](element, options) || element;
  }
  processAttrs(element);
  return element
}

function processKey (el) {
  var exp = getBindingAttr(el, 'key');
  if (exp) {
    {
      if (el.tag === 'template') {
        warn$2(
          "<template> cannot be keyed. Place the key on real elements instead.",
          getRawBindingAttr(el, 'key')
        );
      }
      if (el.for) {
        var iterator = el.iterator2 || el.iterator1;
        var parent = el.parent;
        if (iterator && iterator === exp && parent && parent.tag === 'transition-group') {
          warn$2(
            "Do not use v-for index as key on <transition-group> children, " +
            "this is the same as not using keys.",
            getRawBindingAttr(el, 'key'),
            true /* tip */
          );
        }
      }
    }
    el.key = exp;
  }
}

function processRef (el) {
  var ref = getBindingAttr(el, 'ref');
  if (ref) {
    el.ref = ref;
    el.refInFor = checkInFor(el);
  }
}

function processFor (el) {
  var exp;
  if ((exp = getAndRemoveAttr(el, 'v-for'))) {
    var res = parseFor(exp);
    if (res) {
      extend(el, res);
    } else {
      warn$2(
        ("Invalid v-for expression: " + exp),
        el.rawAttrsMap['v-for']
      );
    }
  }
}



function parseFor (exp) {
  var inMatch = exp.match(forAliasRE);
  if (!inMatch) { return }
  var res = {};
  res.for = inMatch[2].trim();
  var alias = inMatch[1].trim().replace(stripParensRE, '');
  var iteratorMatch = alias.match(forIteratorRE);
  if (iteratorMatch) {
    res.alias = alias.replace(forIteratorRE, '').trim();
    res.iterator1 = iteratorMatch[1].trim();
    if (iteratorMatch[2]) {
      res.iterator2 = iteratorMatch[2].trim();
    }
  } else {
    res.alias = alias;
  }
  return res
}

function processIf (el) {
  var exp = getAndRemoveAttr(el, 'v-if');
  if (exp) {
    el.if = exp;
    addIfCondition(el, {
      exp: exp,
      block: el
    });
  } else {
    if (getAndRemoveAttr(el, 'v-else') != null) {
      el.else = true;
    }
    var elseif = getAndRemoveAttr(el, 'v-else-if');
    if (elseif) {
      el.elseif = elseif;
    }
  }
}

function processIfConditions (el, parent) {
  var prev = findPrevElement(parent.children);
  if (prev && prev.if) {
    addIfCondition(prev, {
      exp: el.elseif,
      block: el
    });
  } else {
    warn$2(
      "v-" + (el.elseif ? ('else-if="' + el.elseif + '"') : 'else') + " " +
      "used on element <" + (el.tag) + "> without corresponding v-if.",
      el.rawAttrsMap[el.elseif ? 'v-else-if' : 'v-else']
    );
  }
}

function findPrevElement (children) {
  var i = children.length;
  while (i--) {
    if (children[i].type === 1) {
      return children[i]
    } else {
      if (children[i].text !== ' ') {
        warn$2(
          "text \"" + (children[i].text.trim()) + "\" between v-if and v-else(-if) " +
          "will be ignored.",
          children[i]
        );
      }
      children.pop();
    }
  }
}

function addIfCondition (el, condition) {
  if (!el.ifConditions) {
    el.ifConditions = [];
  }
  el.ifConditions.push(condition);
}

function processOnce (el) {
  var once$$1 = getAndRemoveAttr(el, 'v-once');
  if (once$$1 != null) {
    el.once = true;
  }
}

// handle content being passed to a component as slot,
// e.g. <template slot="xxx">, <div slot-scope="xxx">
function processSlotContent (el) {
  var slotScope;
  if (el.tag === 'template') {
    slotScope = getAndRemoveAttr(el, 'scope');
    /* istanbul ignore if */
    if (slotScope) {
      warn$2(
        "the \"scope\" attribute for scoped slots have been deprecated and " +
        "replaced by \"slot-scope\" since 2.5. The new \"slot-scope\" attribute " +
        "can also be used on plain elements in addition to <template> to " +
        "denote scoped slots.",
        el.rawAttrsMap['scope'],
        true
      );
    }
    el.slotScope = slotScope || getAndRemoveAttr(el, 'slot-scope');
  } else if ((slotScope = getAndRemoveAttr(el, 'slot-scope'))) {
    /* istanbul ignore if */
    if (el.attrsMap['v-for']) {
      warn$2(
        "Ambiguous combined usage of slot-scope and v-for on <" + (el.tag) + "> " +
        "(v-for takes higher priority). Use a wrapper <template> for the " +
        "scoped slot to make it clearer.",
        el.rawAttrsMap['slot-scope'],
        true
      );
    }
    el.slotScope = slotScope;
  }

  // slot="xxx"
  var slotTarget = getBindingAttr(el, 'slot');
  if (slotTarget) {
    el.slotTarget = slotTarget === '""' ? '"default"' : slotTarget;
    el.slotTargetDynamic = !!(el.attrsMap[':slot'] || el.attrsMap['v-bind:slot']);
    // preserve slot as an attribute for native shadow DOM compat
    // only for non-scoped slots.
    if (el.tag !== 'template' && !el.slotScope) {
      addAttr(el, 'slot', slotTarget, getRawBindingAttr(el, 'slot'));
    }
  }

  // 2.6 v-slot syntax
  {
    if (el.tag === 'template') {
      // v-slot on <template>
      var slotBinding = getAndRemoveAttrByRegex(el, slotRE);
      if (slotBinding) {
        {
          if (el.slotTarget || el.slotScope) {
            warn$2(
              "Unexpected mixed usage of different slot syntaxes.",
              el
            );
          }
          if (el.parent && !maybeComponent(el.parent)) {
            warn$2(
              "<template v-slot> can only appear at the root level inside " +
              "the receiving the component",
              el
            );
          }
        }
        var ref = getSlotName(slotBinding);
        var name = ref.name;
        var dynamic = ref.dynamic;
        el.slotTarget = name;
        el.slotTargetDynamic = dynamic;
        el.slotScope = slotBinding.value || emptySlotScopeToken; // force it into a scoped slot for perf
      }
    } else {
      // v-slot on component, denotes default slot
      var slotBinding$1 = getAndRemoveAttrByRegex(el, slotRE);
      if (slotBinding$1) {
        {
          if (!maybeComponent(el)) {
            warn$2(
              "v-slot can only be used on components or <template>.",
              slotBinding$1
            );
          }
          if (el.slotScope || el.slotTarget) {
            warn$2(
              "Unexpected mixed usage of different slot syntaxes.",
              el
            );
          }
          if (el.scopedSlots) {
            warn$2(
              "To avoid scope ambiguity, the default slot should also use " +
              "<template> syntax when there are other named slots.",
              slotBinding$1
            );
          }
        }
        // add the component's children to its default slot
        var slots = el.scopedSlots || (el.scopedSlots = {});
        var ref$1 = getSlotName(slotBinding$1);
        var name$1 = ref$1.name;
        var dynamic$1 = ref$1.dynamic;
        var slotContainer = slots[name$1] = createASTElement('template', [], el);
        slotContainer.slotTarget = name$1;
        slotContainer.slotTargetDynamic = dynamic$1;
        slotContainer.children = el.children.filter(function (c) {
          if (!c.slotScope) {
            c.parent = slotContainer;
            return true
          }
        });
        slotContainer.slotScope = slotBinding$1.value || emptySlotScopeToken;
        // remove children as they are returned from scopedSlots now
        el.children = [];
        // mark el non-plain so data gets generated
        el.plain = false;
      }
    }
  }
}

function getSlotName (binding) {
  var name = binding.name.replace(slotRE, '');
  if (!name) {
    if (binding.name[0] !== '#') {
      name = 'default';
    } else {
      warn$2(
        "v-slot shorthand syntax requires a slot name.",
        binding
      );
    }
  }
  return dynamicArgRE.test(name)
    // dynamic [name]
    ? { name: name.slice(1, -1), dynamic: true }
    // static name
    : { name: ("\"" + name + "\""), dynamic: false }
}

// handle <slot/> outlets
function processSlotOutlet (el) {
  if (el.tag === 'slot') {
    el.slotName = getBindingAttr(el, 'name');
    if (el.key) {
      warn$2(
        "`key` does not work on <slot> because slots are abstract outlets " +
        "and can possibly expand into multiple elements. " +
        "Use the key on a wrapping element instead.",
        getRawBindingAttr(el, 'key')
      );
    }
  }
}

function processComponent (el) {
  var binding;
  if ((binding = getBindingAttr(el, 'is'))) {
    el.component = binding;
  }
  if (getAndRemoveAttr(el, 'inline-template') != null) {
    el.inlineTemplate = true;
  }
}

function processAttrs (el) {
  var list = el.attrsList;
  var i, l, name, rawName, value, modifiers, syncGen, isDynamic;
  for (i = 0, l = list.length; i < l; i++) {
    name = rawName = list[i].name;
    value = list[i].value;
    if (dirRE.test(name)) {
      // mark element as dynamic
      el.hasBindings = true;
      // modifiers
      modifiers = parseModifiers(name.replace(dirRE, ''));
      // support .foo shorthand syntax for the .prop modifier
      if (modifiers) {
        name = name.replace(modifierRE, '');
      }
      if (bindRE.test(name)) { // v-bind
        name = name.replace(bindRE, '');
        value = parseFilters(value);
        isDynamic = dynamicArgRE.test(name);
        if (isDynamic) {
          name = name.slice(1, -1);
        }
        if (
          value.trim().length === 0
        ) {
          warn$2(
            ("The value for a v-bind expression cannot be empty. Found in \"v-bind:" + name + "\"")
          );
        }
        if (modifiers) {
          if (modifiers.prop && !isDynamic) {
            name = camelize(name);
            if (name === 'innerHtml') { name = 'innerHTML'; }
          }
          if (modifiers.camel && !isDynamic) {
            name = camelize(name);
          }
          if (modifiers.sync) {
            syncGen = genAssignmentCode(value, "$event");
            if (!isDynamic) {
              addHandler(
                el,
                ("update:" + (camelize(name))),
                syncGen,
                null,
                false,
                warn$2,
                list[i]
              );
              if (hyphenate(name) !== camelize(name)) {
                addHandler(
                  el,
                  ("update:" + (hyphenate(name))),
                  syncGen,
                  null,
                  false,
                  warn$2,
                  list[i]
                );
              }
            } else {
              // handler w/ dynamic event name
              addHandler(
                el,
                ("\"update:\"+(" + name + ")"),
                syncGen,
                null,
                false,
                warn$2,
                list[i],
                true // dynamic
              );
            }
          }
        }
        if ((modifiers && modifiers.prop) || (
          !el.component && platformMustUseProp(el.tag, el.attrsMap.type, name)
        )) {
          addProp(el, name, value, list[i], isDynamic);
        } else {
          addAttr(el, name, value, list[i], isDynamic);
        }
      } else if (onRE.test(name)) { // v-on
        name = name.replace(onRE, '');
        isDynamic = dynamicArgRE.test(name);
        if (isDynamic) {
          name = name.slice(1, -1);
        }
        addHandler(el, name, value, modifiers, false, warn$2, list[i], isDynamic);
      } else { // normal directives
        name = name.replace(dirRE, '');
        // parse arg
        var argMatch = name.match(argRE);
        var arg = argMatch && argMatch[1];
        isDynamic = false;
        if (arg) {
          name = name.slice(0, -(arg.length + 1));
          if (dynamicArgRE.test(arg)) {
            arg = arg.slice(1, -1);
            isDynamic = true;
          }
        }
        addDirective(el, name, rawName, value, arg, isDynamic, modifiers, list[i]);
        if (name === 'model') {
          checkForAliasModel(el, value);
        }
      }
    } else {
      // literal attribute
      {
        var res = parseText(value, delimiters);
        if (res) {
          warn$2(
            name + "=\"" + value + "\": " +
            'Interpolation inside attributes has been removed. ' +
            'Use v-bind or the colon shorthand instead. For example, ' +
            'instead of <div id="{{ val }}">, use <div :id="val">.',
            list[i]
          );
        }
      }
      addAttr(el, name, JSON.stringify(value), list[i]);
      // #6887 firefox doesn't update muted state if set via attribute
      // even immediately after element creation
      if (!el.component &&
          name === 'muted' &&
          platformMustUseProp(el.tag, el.attrsMap.type, name)) {
        addProp(el, name, 'true', list[i]);
      }
    }
  }
}

function checkInFor (el) {
  var parent = el;
  while (parent) {
    if (parent.for !== undefined) {
      return true
    }
    parent = parent.parent;
  }
  return false
}

function parseModifiers (name) {
  var match = name.match(modifierRE);
  if (match) {
    var ret = {};
    match.forEach(function (m) { ret[m.slice(1)] = true; });
    return ret
  }
}

function makeAttrsMap (attrs) {
  var map = {};
  for (var i = 0, l = attrs.length; i < l; i++) {
    if (
      map[attrs[i].name] && !isIE && !isEdge
    ) {
      warn$2('duplicate attribute: ' + attrs[i].name, attrs[i]);
    }
    map[attrs[i].name] = attrs[i].value;
  }
  return map
}

// for script (e.g. type="x/template") or style, do not decode content
function isTextTag (el) {
  return el.tag === 'script' || el.tag === 'style'
}

function isForbiddenTag (el) {
  return (
    el.tag === 'style' ||
    (el.tag === 'script' && (
      !el.attrsMap.type ||
      el.attrsMap.type === 'text/javascript'
    ))
  )
}

var ieNSBug = /^xmlns:NS\d+/;
var ieNSPrefix = /^NS\d+:/;

/* istanbul ignore next */
function guardIESVGBug (attrs) {
  var res = [];
  for (var i = 0; i < attrs.length; i++) {
    var attr = attrs[i];
    if (!ieNSBug.test(attr.name)) {
      attr.name = attr.name.replace(ieNSPrefix, '');
      res.push(attr);
    }
  }
  return res
}

function checkForAliasModel (el, value) {
  var _el = el;
  while (_el) {
    if (_el.for && _el.alias === value) {
      warn$2(
        "<" + (el.tag) + " v-model=\"" + value + "\">: " +
        "You are binding v-model directly to a v-for iteration alias. " +
        "This will not be able to modify the v-for source array because " +
        "writing to the alias is like modifying a function local variable. " +
        "Consider using an array of objects and use v-model on an object property instead.",
        el.rawAttrsMap['v-model']
      );
    }
    _el = _el.parent;
  }
}

/*  */

function preTransformNode (el, options) {
  if (el.tag === 'input') {
    var map = el.attrsMap;
    if (!map['v-model']) {
      return
    }

    var typeBinding;
    if (map[':type'] || map['v-bind:type']) {
      typeBinding = getBindingAttr(el, 'type');
    }
    if (!map.type && !typeBinding && map['v-bind']) {
      typeBinding = "(" + (map['v-bind']) + ").type";
    }

    if (typeBinding) {
      var ifCondition = getAndRemoveAttr(el, 'v-if', true);
      var ifConditionExtra = ifCondition ? ("&&(" + ifCondition + ")") : "";
      var hasElse = getAndRemoveAttr(el, 'v-else', true) != null;
      var elseIfCondition = getAndRemoveAttr(el, 'v-else-if', true);
      // 1. checkbox
      var branch0 = cloneASTElement(el);
      // process for on the main node
      processFor(branch0);
      addRawAttr(branch0, 'type', 'checkbox');
      processElement(branch0, options);
      branch0.processed = true; // prevent it from double-processed
      branch0.if = "(" + typeBinding + ")==='checkbox'" + ifConditionExtra;
      addIfCondition(branch0, {
        exp: branch0.if,
        block: branch0
      });
      // 2. add radio else-if condition
      var branch1 = cloneASTElement(el);
      getAndRemoveAttr(branch1, 'v-for', true);
      addRawAttr(branch1, 'type', 'radio');
      processElement(branch1, options);
      addIfCondition(branch0, {
        exp: "(" + typeBinding + ")==='radio'" + ifConditionExtra,
        block: branch1
      });
      // 3. other
      var branch2 = cloneASTElement(el);
      getAndRemoveAttr(branch2, 'v-for', true);
      addRawAttr(branch2, ':type', typeBinding);
      processElement(branch2, options);
      addIfCondition(branch0, {
        exp: ifCondition,
        block: branch2
      });

      if (hasElse) {
        branch0.else = true;
      } else if (elseIfCondition) {
        branch0.elseif = elseIfCondition;
      }

      return branch0
    }
  }
}

function cloneASTElement (el) {
  return createASTElement(el.tag, el.attrsList.slice(), el.parent)
}

var model$1 = {
  preTransformNode: preTransformNode
};

var modules$1 = [
  klass$1,
  style$1,
  model$1
];

/*  */

function text (el, dir) {
  if (dir.value) {
    addProp(el, 'textContent', ("_s(" + (dir.value) + ")"), dir);
  }
}

/*  */

function html (el, dir) {
  if (dir.value) {
    addProp(el, 'innerHTML', ("_s(" + (dir.value) + ")"), dir);
  }
}

var directives$1 = {
  model: model,
  text: text,
  html: html
};

/*  */

var baseOptions = {
  expectHTML: true,
  modules: modules$1,
  directives: directives$1,
  isPreTag: isPreTag,
  isUnaryTag: isUnaryTag,
  mustUseProp: mustUseProp,
  canBeLeftOpenTag: canBeLeftOpenTag,
  isReservedTag: isReservedTag,
  getTagNamespace: getTagNamespace,
  staticKeys: genStaticKeys(modules$1)
};

/*  */

var isStaticKey;
var isPlatformReservedTag;

var genStaticKeysCached = cached(genStaticKeys$1);

/**
 * Goal of the optimizer: walk the generated template AST tree
 * and detect sub-trees that are purely static, i.e. parts of
 * the DOM that never needs to change.
 *
 * Once we detect these sub-trees, we can:
 *
 * 1. Hoist them into constants, so that we no longer need to
 *    create fresh nodes for them on each re-render;
 * 2. Completely skip them in the patching process.
 */
function optimize (root, options) {
  if (!root) { return }
  isStaticKey = genStaticKeysCached(options.staticKeys || '');
  isPlatformReservedTag = options.isReservedTag || no;
  // first pass: mark all non-static nodes.
  markStatic$1(root);
  // second pass: mark static roots.
  markStaticRoots(root, false);
}

function genStaticKeys$1 (keys) {
  return makeMap(
    'type,tag,attrsList,attrsMap,plain,parent,children,attrs,start,end,rawAttrsMap' +
    (keys ? ',' + keys : '')
  )
}

function markStatic$1 (node) {
  node.static = isStatic(node);
  if (node.type === 1) {
    // do not make component slot content static. this avoids
    // 1. components not able to mutate slot nodes
    // 2. static slot content fails for hot-reloading
    if (
      !isPlatformReservedTag(node.tag) &&
      node.tag !== 'slot' &&
      node.attrsMap['inline-template'] == null
    ) {
      return
    }
    for (var i = 0, l = node.children.length; i < l; i++) {
      var child = node.children[i];
      markStatic$1(child);
      if (!child.static) {
        node.static = false;
      }
    }
    if (node.ifConditions) {
      for (var i$1 = 1, l$1 = node.ifConditions.length; i$1 < l$1; i$1++) {
        var block = node.ifConditions[i$1].block;
        markStatic$1(block);
        if (!block.static) {
          node.static = false;
        }
      }
    }
  }
}

function markStaticRoots (node, isInFor) {
  if (node.type === 1) {
    if (node.static || node.once) {
      node.staticInFor = isInFor;
    }
    // For a node to qualify as a static root, it should have children that
    // are not just static text. Otherwise the cost of hoisting out will
    // outweigh the benefits and it's better off to just always render it fresh.
    if (node.static && node.children.length && !(
      node.children.length === 1 &&
      node.children[0].type === 3
    )) {
      node.staticRoot = true;
      return
    } else {
      node.staticRoot = false;
    }
    if (node.children) {
      for (var i = 0, l = node.children.length; i < l; i++) {
        markStaticRoots(node.children[i], isInFor || !!node.for);
      }
    }
    if (node.ifConditions) {
      for (var i$1 = 1, l$1 = node.ifConditions.length; i$1 < l$1; i$1++) {
        markStaticRoots(node.ifConditions[i$1].block, isInFor);
      }
    }
  }
}

function isStatic (node) {
  if (node.type === 2) { // expression
    return false
  }
  if (node.type === 3) { // text
    return true
  }
  return !!(node.pre || (
    !node.hasBindings && // no dynamic bindings
    !node.if && !node.for && // not v-if or v-for or v-else
    !isBuiltInTag(node.tag) && // not a built-in
    isPlatformReservedTag(node.tag) && // not a component
    !isDirectChildOfTemplateFor(node) &&
    Object.keys(node).every(isStaticKey)
  ))
}

function isDirectChildOfTemplateFor (node) {
  while (node.parent) {
    node = node.parent;
    if (node.tag !== 'template') {
      return false
    }
    if (node.for) {
      return true
    }
  }
  return false
}

/*  */

var fnExpRE = /^([\w$_]+|\([^)]*?\))\s*=>|^function\s*(?:[\w$]+)?\s*\(/;
var fnInvokeRE = /\([^)]*?\);*$/;
var simplePathRE = /^[A-Za-z_$][\w$]*(?:\.[A-Za-z_$][\w$]*|\['[^']*?']|\["[^"]*?"]|\[\d+]|\[[A-Za-z_$][\w$]*])*$/;

// KeyboardEvent.keyCode aliases
var keyCodes = {
  esc: 27,
  tab: 9,
  enter: 13,
  space: 32,
  up: 38,
  left: 37,
  right: 39,
  down: 40,
  'delete': [8, 46]
};

// KeyboardEvent.key aliases
var keyNames = {
  // #7880: IE11 and Edge use `Esc` for Escape key name.
  esc: ['Esc', 'Escape'],
  tab: 'Tab',
  enter: 'Enter',
  // #9112: IE11 uses `Spacebar` for Space key name.
  space: [' ', 'Spacebar'],
  // #7806: IE11 uses key names without `Arrow` prefix for arrow keys.
  up: ['Up', 'ArrowUp'],
  left: ['Left', 'ArrowLeft'],
  right: ['Right', 'ArrowRight'],
  down: ['Down', 'ArrowDown'],
  // #9112: IE11 uses `Del` for Delete key name.
  'delete': ['Backspace', 'Delete', 'Del']
};

// #4868: modifiers that prevent the execution of the listener
// need to explicitly return null so that we can determine whether to remove
// the listener for .once
var genGuard = function (condition) { return ("if(" + condition + ")return null;"); };

var modifierCode = {
  stop: '$event.stopPropagation();',
  prevent: '$event.preventDefault();',
  self: genGuard("$event.target !== $event.currentTarget"),
  ctrl: genGuard("!$event.ctrlKey"),
  shift: genGuard("!$event.shiftKey"),
  alt: genGuard("!$event.altKey"),
  meta: genGuard("!$event.metaKey"),
  left: genGuard("'button' in $event && $event.button !== 0"),
  middle: genGuard("'button' in $event && $event.button !== 1"),
  right: genGuard("'button' in $event && $event.button !== 2")
};

function genHandlers (
  events,
  isNative
) {
  var prefix = isNative ? 'nativeOn:' : 'on:';
  var staticHandlers = "";
  var dynamicHandlers = "";
  for (var name in events) {
    var handlerCode = genHandler(events[name]);
    if (events[name] && events[name].dynamic) {
      dynamicHandlers += name + "," + handlerCode + ",";
    } else {
      staticHandlers += "\"" + name + "\":" + handlerCode + ",";
    }
  }
  staticHandlers = "{" + (staticHandlers.slice(0, -1)) + "}";
  if (dynamicHandlers) {
    return prefix + "_d(" + staticHandlers + ",[" + (dynamicHandlers.slice(0, -1)) + "])"
  } else {
    return prefix + staticHandlers
  }
}

function genHandler (handler) {
  if (!handler) {
    return 'function(){}'
  }

  if (Array.isArray(handler)) {
    return ("[" + (handler.map(function (handler) { return genHandler(handler); }).join(',')) + "]")
  }

  var isMethodPath = simplePathRE.test(handler.value);
  var isFunctionExpression = fnExpRE.test(handler.value);
  var isFunctionInvocation = simplePathRE.test(handler.value.replace(fnInvokeRE, ''));

  if (!handler.modifiers) {
    if (isMethodPath || isFunctionExpression) {
      return handler.value
    }
    return ("function($event){" + (isFunctionInvocation ? ("return " + (handler.value)) : handler.value) + "}") // inline statement
  } else {
    var code = '';
    var genModifierCode = '';
    var keys = [];
    for (var key in handler.modifiers) {
      if (modifierCode[key]) {
        genModifierCode += modifierCode[key];
        // left/right
        if (keyCodes[key]) {
          keys.push(key);
        }
      } else if (key === 'exact') {
        var modifiers = (handler.modifiers);
        genModifierCode += genGuard(
          ['ctrl', 'shift', 'alt', 'meta']
            .filter(function (keyModifier) { return !modifiers[keyModifier]; })
            .map(function (keyModifier) { return ("$event." + keyModifier + "Key"); })
            .join('||')
        );
      } else {
        keys.push(key);
      }
    }
    if (keys.length) {
      code += genKeyFilter(keys);
    }
    // Make sure modifiers like prevent and stop get executed after key filtering
    if (genModifierCode) {
      code += genModifierCode;
    }
    var handlerCode = isMethodPath
      ? ("return " + (handler.value) + "($event)")
      : isFunctionExpression
        ? ("return (" + (handler.value) + ")($event)")
        : isFunctionInvocation
          ? ("return " + (handler.value))
          : handler.value;
    return ("function($event){" + code + handlerCode + "}")
  }
}

function genKeyFilter (keys) {
  return (
    // make sure the key filters only apply to KeyboardEvents
    // #9441: can't use 'keyCode' in $event because Chrome autofill fires fake
    // key events that do not have keyCode property...
    "if(!$event.type.indexOf('key')&&" +
    (keys.map(genFilterCode).join('&&')) + ")return null;"
  )
}

function genFilterCode (key) {
  var keyVal = parseInt(key, 10);
  if (keyVal) {
    return ("$event.keyCode!==" + keyVal)
  }
  var keyCode = keyCodes[key];
  var keyName = keyNames[key];
  return (
    "_k($event.keyCode," +
    (JSON.stringify(key)) + "," +
    (JSON.stringify(keyCode)) + "," +
    "$event.key," +
    "" + (JSON.stringify(keyName)) +
    ")"
  )
}

/*  */

function on (el, dir) {
  if (dir.modifiers) {
    warn("v-on without argument does not support modifiers.");
  }
  el.wrapListeners = function (code) { return ("_g(" + code + "," + (dir.value) + ")"); };
}

/*  */

function bind$1 (el, dir) {
  el.wrapData = function (code) {
    return ("_b(" + code + ",'" + (el.tag) + "'," + (dir.value) + "," + (dir.modifiers && dir.modifiers.prop ? 'true' : 'false') + (dir.modifiers && dir.modifiers.sync ? ',true' : '') + ")")
  };
}

/*  */

var baseDirectives = {
  on: on,
  bind: bind$1,
  cloak: noop
};

/*  */





var CodegenState = function CodegenState (options) {
  this.options = options;
  this.warn = options.warn || baseWarn;
  this.transforms = pluckModuleFunction(options.modules, 'transformCode');
  this.dataGenFns = pluckModuleFunction(options.modules, 'genData');
  this.directives = extend(extend({}, baseDirectives), options.directives);
  var isReservedTag = options.isReservedTag || no;
  this.maybeComponent = function (el) { return !!el.component || !isReservedTag(el.tag); };
  this.onceId = 0;
  this.staticRenderFns = [];
  this.pre = false;
};



function generate (
  ast,
  options
) {
  var state = new CodegenState(options);
  var code = ast ? genElement(ast, state) : '_c("div")';
  return {
    render: ("with(this){return " + code + "}"),
    staticRenderFns: state.staticRenderFns
  }
}

function genElement (el, state) {
  if (el.parent) {
    el.pre = el.pre || el.parent.pre;
  }

  if (el.staticRoot && !el.staticProcessed) {
    return genStatic(el, state)
  } else if (el.once && !el.onceProcessed) {
    return genOnce(el, state)
  } else if (el.for && !el.forProcessed) {
    return genFor(el, state)
  } else if (el.if && !el.ifProcessed) {
    return genIf(el, state)
  } else if (el.tag === 'template' && !el.slotTarget && !state.pre) {
    return genChildren(el, state) || 'void 0'
  } else if (el.tag === 'slot') {
    return genSlot(el, state)
  } else {
    // component or element
    var code;
    if (el.component) {
      code = genComponent(el.component, el, state);
    } else {
      var data;
      if (!el.plain || (el.pre && state.maybeComponent(el))) {
        data = genData$2(el, state);
      }

      var children = el.inlineTemplate ? null : genChildren(el, state, true);
      code = "_c('" + (el.tag) + "'" + (data ? ("," + data) : '') + (children ? ("," + children) : '') + ")";
    }
    // module transforms
    for (var i = 0; i < state.transforms.length; i++) {
      code = state.transforms[i](el, code);
    }
    return code
  }
}

// hoist static sub-trees out
function genStatic (el, state) {
  el.staticProcessed = true;
  // Some elements (templates) need to behave differently inside of a v-pre
  // node.  All pre nodes are static roots, so we can use this as a location to
  // wrap a state change and reset it upon exiting the pre node.
  var originalPreState = state.pre;
  if (el.pre) {
    state.pre = el.pre;
  }
  state.staticRenderFns.push(("with(this){return " + (genElement(el, state)) + "}"));
  state.pre = originalPreState;
  return ("_m(" + (state.staticRenderFns.length - 1) + (el.staticInFor ? ',true' : '') + ")")
}

// v-once
function genOnce (el, state) {
  el.onceProcessed = true;
  if (el.if && !el.ifProcessed) {
    return genIf(el, state)
  } else if (el.staticInFor) {
    var key = '';
    var parent = el.parent;
    while (parent) {
      if (parent.for) {
        key = parent.key;
        break
      }
      parent = parent.parent;
    }
    if (!key) {
      state.warn(
        "v-once can only be used inside v-for that is keyed. ",
        el.rawAttrsMap['v-once']
      );
      return genElement(el, state)
    }
    return ("_o(" + (genElement(el, state)) + "," + (state.onceId++) + "," + key + ")")
  } else {
    return genStatic(el, state)
  }
}

function genIf (
  el,
  state,
  altGen,
  altEmpty
) {
  el.ifProcessed = true; // avoid recursion
  return genIfConditions(el.ifConditions.slice(), state, altGen, altEmpty)
}

function genIfConditions (
  conditions,
  state,
  altGen,
  altEmpty
) {
  if (!conditions.length) {
    return altEmpty || '_e()'
  }

  var condition = conditions.shift();
  if (condition.exp) {
    return ("(" + (condition.exp) + ")?" + (genTernaryExp(condition.block)) + ":" + (genIfConditions(conditions, state, altGen, altEmpty)))
  } else {
    return ("" + (genTernaryExp(condition.block)))
  }

  // v-if with v-once should generate code like (a)?_m(0):_m(1)
  function genTernaryExp (el) {
    return altGen
      ? altGen(el, state)
      : el.once
        ? genOnce(el, state)
        : genElement(el, state)
  }
}

function genFor (
  el,
  state,
  altGen,
  altHelper
) {
  var exp = el.for;
  var alias = el.alias;
  var iterator1 = el.iterator1 ? ("," + (el.iterator1)) : '';
  var iterator2 = el.iterator2 ? ("," + (el.iterator2)) : '';

  if (state.maybeComponent(el) &&
    el.tag !== 'slot' &&
    el.tag !== 'template' &&
    !el.key
  ) {
    state.warn(
      "<" + (el.tag) + " v-for=\"" + alias + " in " + exp + "\">: component lists rendered with " +
      "v-for should have explicit keys. " +
      "See https://vuejs.org/guide/list.html#key for more info.",
      el.rawAttrsMap['v-for'],
      true /* tip */
    );
  }

  el.forProcessed = true; // avoid recursion
  return (altHelper || '_l') + "((" + exp + ")," +
    "function(" + alias + iterator1 + iterator2 + "){" +
      "return " + ((altGen || genElement)(el, state)) +
    '})'
}

function genData$2 (el, state) {
  var data = '{';

  // directives first.
  // directives may mutate the el's other properties before they are generated.
  var dirs = genDirectives(el, state);
  if (dirs) { data += dirs + ','; }

  // key
  if (el.key) {
    data += "key:" + (el.key) + ",";
  }
  // ref
  if (el.ref) {
    data += "ref:" + (el.ref) + ",";
  }
  if (el.refInFor) {
    data += "refInFor:true,";
  }
  // pre
  if (el.pre) {
    data += "pre:true,";
  }
  // record original tag name for components using "is" attribute
  if (el.component) {
    data += "tag:\"" + (el.tag) + "\",";
  }
  // module data generation functions
  for (var i = 0; i < state.dataGenFns.length; i++) {
    data += state.dataGenFns[i](el);
  }
  // attributes
  if (el.attrs) {
    data += "attrs:" + (genProps(el.attrs)) + ",";
  }
  // DOM props
  if (el.props) {
    data += "domProps:" + (genProps(el.props)) + ",";
  }
  // event handlers
  if (el.events) {
    data += (genHandlers(el.events, false)) + ",";
  }
  if (el.nativeEvents) {
    data += (genHandlers(el.nativeEvents, true)) + ",";
  }
  // slot target
  // only for non-scoped slots
  if (el.slotTarget && !el.slotScope) {
    data += "slot:" + (el.slotTarget) + ",";
  }
  // scoped slots
  if (el.scopedSlots) {
    data += (genScopedSlots(el, el.scopedSlots, state)) + ",";
  }
  // component v-model
  if (el.model) {
    data += "model:{value:" + (el.model.value) + ",callback:" + (el.model.callback) + ",expression:" + (el.model.expression) + "},";
  }
  // inline-template
  if (el.inlineTemplate) {
    var inlineTemplate = genInlineTemplate(el, state);
    if (inlineTemplate) {
      data += inlineTemplate + ",";
    }
  }
  data = data.replace(/,$/, '') + '}';
  // v-bind dynamic argument wrap
  // v-bind with dynamic arguments must be applied using the same v-bind object
  // merge helper so that class/style/mustUseProp attrs are handled correctly.
  if (el.dynamicAttrs) {
    data = "_b(" + data + ",\"" + (el.tag) + "\"," + (genProps(el.dynamicAttrs)) + ")";
  }
  // v-bind data wrap
  if (el.wrapData) {
    data = el.wrapData(data);
  }
  // v-on data wrap
  if (el.wrapListeners) {
    data = el.wrapListeners(data);
  }
  return data
}

function genDirectives (el, state) {
  var dirs = el.directives;
  if (!dirs) { return }
  var res = 'directives:[';
  var hasRuntime = false;
  var i, l, dir, needRuntime;
  for (i = 0, l = dirs.length; i < l; i++) {
    dir = dirs[i];
    needRuntime = true;
    var gen = state.directives[dir.name];
    if (gen) {
      // compile-time directive that manipulates AST.
      // returns true if it also needs a runtime counterpart.
      needRuntime = !!gen(el, dir, state.warn);
    }
    if (needRuntime) {
      hasRuntime = true;
      res += "{name:\"" + (dir.name) + "\",rawName:\"" + (dir.rawName) + "\"" + (dir.value ? (",value:(" + (dir.value) + "),expression:" + (JSON.stringify(dir.value))) : '') + (dir.arg ? (",arg:" + (dir.isDynamicArg ? dir.arg : ("\"" + (dir.arg) + "\""))) : '') + (dir.modifiers ? (",modifiers:" + (JSON.stringify(dir.modifiers))) : '') + "},";
    }
  }
  if (hasRuntime) {
    return res.slice(0, -1) + ']'
  }
}

function genInlineTemplate (el, state) {
  var ast = el.children[0];
  if (el.children.length !== 1 || ast.type !== 1) {
    state.warn(
      'Inline-template components must have exactly one child element.',
      { start: el.start }
    );
  }
  if (ast && ast.type === 1) {
    var inlineRenderFns = generate(ast, state.options);
    return ("inlineTemplate:{render:function(){" + (inlineRenderFns.render) + "},staticRenderFns:[" + (inlineRenderFns.staticRenderFns.map(function (code) { return ("function(){" + code + "}"); }).join(',')) + "]}")
  }
}

function genScopedSlots (
  el,
  slots,
  state
) {
  // by default scoped slots are considered "stable", this allows child
  // components with only scoped slots to skip forced updates from parent.
  // but in some cases we have to bail-out of this optimization
  // for example if the slot contains dynamic names, has v-if or v-for on them...
  var needsForceUpdate = el.for || Object.keys(slots).some(function (key) {
    var slot = slots[key];
    return (
      slot.slotTargetDynamic ||
      slot.if ||
      slot.for ||
      containsSlotChild(slot) // is passing down slot from parent which may be dynamic
    )
  });

  // #9534: if a component with scoped slots is inside a conditional branch,
  // it's possible for the same component to be reused but with different
  // compiled slot content. To avoid that, we generate a unique key based on
  // the generated code of all the slot contents.
  var needsKey = !!el.if;

  // OR when it is inside another scoped slot or v-for (the reactivity may be
  // disconnected due to the intermediate scope variable)
  // #9438, #9506
  // TODO: this can be further optimized by properly analyzing in-scope bindings
  // and skip force updating ones that do not actually use scope variables.
  if (!needsForceUpdate) {
    var parent = el.parent;
    while (parent) {
      if (
        (parent.slotScope && parent.slotScope !== emptySlotScopeToken) ||
        parent.for
      ) {
        needsForceUpdate = true;
        break
      }
      if (parent.if) {
        needsKey = true;
      }
      parent = parent.parent;
    }
  }

  var generatedSlots = Object.keys(slots)
    .map(function (key) { return genScopedSlot(slots[key], state); })
    .join(',');

  return ("scopedSlots:_u([" + generatedSlots + "]" + (needsForceUpdate ? ",null,true" : "") + (!needsForceUpdate && needsKey ? (",null,false," + (hash(generatedSlots))) : "") + ")")
}

function hash(str) {
  var hash = 5381;
  var i = str.length;
  while(i) {
    hash = (hash * 33) ^ str.charCodeAt(--i);
  }
  return hash >>> 0
}

function containsSlotChild (el) {
  if (el.type === 1) {
    if (el.tag === 'slot') {
      return true
    }
    return el.children.some(containsSlotChild)
  }
  return false
}

function genScopedSlot (
  el,
  state
) {
  var isLegacySyntax = el.attrsMap['slot-scope'];
  if (el.if && !el.ifProcessed && !isLegacySyntax) {
    return genIf(el, state, genScopedSlot, "null")
  }
  if (el.for && !el.forProcessed) {
    return genFor(el, state, genScopedSlot)
  }
  var slotScope = el.slotScope === emptySlotScopeToken
    ? ""
    : String(el.slotScope);
  var fn = "function(" + slotScope + "){" +
    "return " + (el.tag === 'template'
      ? el.if && isLegacySyntax
        ? ("(" + (el.if) + ")?" + (genChildren(el, state) || 'undefined') + ":undefined")
        : genChildren(el, state) || 'undefined'
      : genElement(el, state)) + "}";
  // reverse proxy v-slot without scope on this.$slots
  var reverseProxy = slotScope ? "" : ",proxy:true";
  return ("{key:" + (el.slotTarget || "\"default\"") + ",fn:" + fn + reverseProxy + "}")
}

function genChildren (
  el,
  state,
  checkSkip,
  altGenElement,
  altGenNode
) {
  var children = el.children;
  if (children.length) {
    var el$1 = children[0];
    // optimize single v-for
    if (children.length === 1 &&
      el$1.for &&
      el$1.tag !== 'template' &&
      el$1.tag !== 'slot'
    ) {
      var normalizationType = checkSkip
        ? state.maybeComponent(el$1) ? ",1" : ",0"
        : "";
      return ("" + ((altGenElement || genElement)(el$1, state)) + normalizationType)
    }
    var normalizationType$1 = checkSkip
      ? getNormalizationType(children, state.maybeComponent)
      : 0;
    var gen = altGenNode || genNode;
    return ("[" + (children.map(function (c) { return gen(c, state); }).join(',')) + "]" + (normalizationType$1 ? ("," + normalizationType$1) : ''))
  }
}

// determine the normalization needed for the children array.
// 0: no normalization needed
// 1: simple normalization needed (possible 1-level deep nested array)
// 2: full normalization needed
function getNormalizationType (
  children,
  maybeComponent
) {
  var res = 0;
  for (var i = 0; i < children.length; i++) {
    var el = children[i];
    if (el.type !== 1) {
      continue
    }
    if (needsNormalization(el) ||
        (el.ifConditions && el.ifConditions.some(function (c) { return needsNormalization(c.block); }))) {
      res = 2;
      break
    }
    if (maybeComponent(el) ||
        (el.ifConditions && el.ifConditions.some(function (c) { return maybeComponent(c.block); }))) {
      res = 1;
    }
  }
  return res
}

function needsNormalization (el) {
  return el.for !== undefined || el.tag === 'template' || el.tag === 'slot'
}

function genNode (node, state) {
  if (node.type === 1) {
    return genElement(node, state)
  } else if (node.type === 3 && node.isComment) {
    return genComment(node)
  } else {
    return genText(node)
  }
}

function genText (text) {
  return ("_v(" + (text.type === 2
    ? text.expression // no need for () because already wrapped in _s()
    : transformSpecialNewlines(JSON.stringify(text.text))) + ")")
}

function genComment (comment) {
  return ("_e(" + (JSON.stringify(comment.text)) + ")")
}

function genSlot (el, state) {
  var slotName = el.slotName || '"default"';
  var children = genChildren(el, state);
  var res = "_t(" + slotName + (children ? ("," + children) : '');
  var attrs = el.attrs || el.dynamicAttrs
    ? genProps((el.attrs || []).concat(el.dynamicAttrs || []).map(function (attr) { return ({
        // slot props are camelized
        name: camelize(attr.name),
        value: attr.value,
        dynamic: attr.dynamic
      }); }))
    : null;
  var bind$$1 = el.attrsMap['v-bind'];
  if ((attrs || bind$$1) && !children) {
    res += ",null";
  }
  if (attrs) {
    res += "," + attrs;
  }
  if (bind$$1) {
    res += (attrs ? '' : ',null') + "," + bind$$1;
  }
  return res + ')'
}

// componentName is el.component, take it as argument to shun flow's pessimistic refinement
function genComponent (
  componentName,
  el,
  state
) {
  var children = el.inlineTemplate ? null : genChildren(el, state, true);
  return ("_c(" + componentName + "," + (genData$2(el, state)) + (children ? ("," + children) : '') + ")")
}

function genProps (props) {
  var staticProps = "";
  var dynamicProps = "";
  for (var i = 0; i < props.length; i++) {
    var prop = props[i];
    var value = transformSpecialNewlines(prop.value);
    if (prop.dynamic) {
      dynamicProps += (prop.name) + "," + value + ",";
    } else {
      staticProps += "\"" + (prop.name) + "\":" + value + ",";
    }
  }
  staticProps = "{" + (staticProps.slice(0, -1)) + "}";
  if (dynamicProps) {
    return ("_d(" + staticProps + ",[" + (dynamicProps.slice(0, -1)) + "])")
  } else {
    return staticProps
  }
}

// #3895, #4268
function transformSpecialNewlines (text) {
  return text
    .replace(/\u2028/g, '\\u2028')
    .replace(/\u2029/g, '\\u2029')
}

/*  */



// these keywords should not appear inside expressions, but operators like
// typeof, instanceof and in are allowed
var prohibitedKeywordRE = new RegExp('\\b' + (
  'do,if,for,let,new,try,var,case,else,with,await,break,catch,class,const,' +
  'super,throw,while,yield,delete,export,import,return,switch,default,' +
  'extends,finally,continue,debugger,function,arguments'
).split(',').join('\\b|\\b') + '\\b');

// these unary operators should not be used as property/method names
var unaryOperatorsRE = new RegExp('\\b' + (
  'delete,typeof,void'
).split(',').join('\\s*\\([^\\)]*\\)|\\b') + '\\s*\\([^\\)]*\\)');

// strip strings in expressions
var stripStringRE = /'(?:[^'\\]|\\.)*'|"(?:[^"\\]|\\.)*"|`(?:[^`\\]|\\.)*\$\{|\}(?:[^`\\]|\\.)*`|`(?:[^`\\]|\\.)*`/g;

// detect problematic expressions in a template
function detectErrors (ast, warn) {
  if (ast) {
    checkNode(ast, warn);
  }
}

function checkNode (node, warn) {
  if (node.type === 1) {
    for (var name in node.attrsMap) {
      if (dirRE.test(name)) {
        var value = node.attrsMap[name];
        if (value) {
          var range = node.rawAttrsMap[name];
          if (name === 'v-for') {
            checkFor(node, ("v-for=\"" + value + "\""), warn, range);
          } else if (onRE.test(name)) {
            checkEvent(value, (name + "=\"" + value + "\""), warn, range);
          } else {
            checkExpression(value, (name + "=\"" + value + "\""), warn, range);
          }
        }
      }
    }
    if (node.children) {
      for (var i = 0; i < node.children.length; i++) {
        checkNode(node.children[i], warn);
      }
    }
  } else if (node.type === 2) {
    checkExpression(node.expression, node.text, warn, node);
  }
}

function checkEvent (exp, text, warn, range) {
  var stipped = exp.replace(stripStringRE, '');
  var keywordMatch = stipped.match(unaryOperatorsRE);
  if (keywordMatch && stipped.charAt(keywordMatch.index - 1) !== '$') {
    warn(
      "avoid using JavaScript unary operator as property name: " +
      "\"" + (keywordMatch[0]) + "\" in expression " + (text.trim()),
      range
    );
  }
  checkExpression(exp, text, warn, range);
}

function checkFor (node, text, warn, range) {
  checkExpression(node.for || '', text, warn, range);
  checkIdentifier(node.alias, 'v-for alias', text, warn, range);
  checkIdentifier(node.iterator1, 'v-for iterator', text, warn, range);
  checkIdentifier(node.iterator2, 'v-for iterator', text, warn, range);
}

function checkIdentifier (
  ident,
  type,
  text,
  warn,
  range
) {
  if (typeof ident === 'string') {
    try {
      new Function(("var " + ident + "=_"));
    } catch (e) {
      warn(("invalid " + type + " \"" + ident + "\" in expression: " + (text.trim())), range);
    }
  }
}

function checkExpression (exp, text, warn, range) {
  try {
    new Function(("return " + exp));
  } catch (e) {
    var keywordMatch = exp.replace(stripStringRE, '').match(prohibitedKeywordRE);
    if (keywordMatch) {
      warn(
        "avoid using JavaScript keyword as property name: " +
        "\"" + (keywordMatch[0]) + "\"\n  Raw expression: " + (text.trim()),
        range
      );
    } else {
      warn(
        "invalid expression: " + (e.message) + " in\n\n" +
        "    " + exp + "\n\n" +
        "  Raw expression: " + (text.trim()) + "\n",
        range
      );
    }
  }
}

/*  */

var range = 2;

function generateCodeFrame (
  source,
  start,
  end
) {
  if ( start === void 0 ) start = 0;
  if ( end === void 0 ) end = source.length;

  var lines = source.split(/\r?\n/);
  var count = 0;
  var res = [];
  for (var i = 0; i < lines.length; i++) {
    count += lines[i].length + 1;
    if (count >= start) {
      for (var j = i - range; j <= i + range || end > count; j++) {
        if (j < 0 || j >= lines.length) { continue }
        res.push(("" + (j + 1) + (repeat$1(" ", 3 - String(j + 1).length)) + "|  " + (lines[j])));
        var lineLength = lines[j].length;
        if (j === i) {
          // push underline
          var pad = start - (count - lineLength) + 1;
          var length = end > count ? lineLength - pad : end - start;
          res.push("   |  " + repeat$1(" ", pad) + repeat$1("^", length));
        } else if (j > i) {
          if (end > count) {
            var length$1 = Math.min(end - count, lineLength);
            res.push("   |  " + repeat$1("^", length$1));
          }
          count += lineLength + 1;
        }
      }
      break
    }
  }
  return res.join('\n')
}

function repeat$1 (str, n) {
  var result = '';
  if (n > 0) {
    while (true) { // eslint-disable-line
      if (n & 1) { result += str; }
      n >>>= 1;
      if (n <= 0) { break }
      str += str;
    }
  }
  return result
}

/*  */



function createFunction (code, errors) {
  try {
    return new Function(code)
  } catch (err) {
    errors.push({ err: err, code: code });
    return noop
  }
}

function createCompileToFunctionFn (compile) {
  var cache = Object.create(null);

  return function compileToFunctions (
    template,
    options,
    vm
  ) {
    options = extend({}, options);
    var warn$$1 = options.warn || warn;
    delete options.warn;

    /* istanbul ignore if */
    {
      // detect possible CSP restriction
      try {
        new Function('return 1');
      } catch (e) {
        if (e.toString().match(/unsafe-eval|CSP/)) {
          warn$$1(
            'It seems you are using the standalone build of Vue.js in an ' +
            'environment with Content Security Policy that prohibits unsafe-eval. ' +
            'The template compiler cannot work in this environment. Consider ' +
            'relaxing the policy to allow unsafe-eval or pre-compiling your ' +
            'templates into render functions.'
          );
        }
      }
    }

    // check cache
    var key = options.delimiters
      ? String(options.delimiters) + template
      : template;
    if (cache[key]) {
      return cache[key]
    }

    // compile
    var compiled = compile(template, options);

    // check compilation errors/tips
    {
      if (compiled.errors && compiled.errors.length) {
        if (options.outputSourceRange) {
          compiled.errors.forEach(function (e) {
            warn$$1(
              "Error compiling template:\n\n" + (e.msg) + "\n\n" +
              generateCodeFrame(template, e.start, e.end),
              vm
            );
          });
        } else {
          warn$$1(
            "Error compiling template:\n\n" + template + "\n\n" +
            compiled.errors.map(function (e) { return ("- " + e); }).join('\n') + '\n',
            vm
          );
        }
      }
      if (compiled.tips && compiled.tips.length) {
        if (options.outputSourceRange) {
          compiled.tips.forEach(function (e) { return tip(e.msg, vm); });
        } else {
          compiled.tips.forEach(function (msg) { return tip(msg, vm); });
        }
      }
    }

    // turn code into functions
    var res = {};
    var fnGenErrors = [];
    res.render = createFunction(compiled.render, fnGenErrors);
    res.staticRenderFns = compiled.staticRenderFns.map(function (code) {
      return createFunction(code, fnGenErrors)
    });

    // check function generation errors.
    // this should only happen if there is a bug in the compiler itself.
    // mostly for codegen development use
    /* istanbul ignore if */
    {
      if ((!compiled.errors || !compiled.errors.length) && fnGenErrors.length) {
        warn$$1(
          "Failed to generate render function:\n\n" +
          fnGenErrors.map(function (ref) {
            var err = ref.err;
            var code = ref.code;

            return ((err.toString()) + " in\n\n" + code + "\n");
        }).join('\n'),
          vm
        );
      }
    }

    return (cache[key] = res)
  }
}

/*  */

function createCompilerCreator (baseCompile) {
  return function createCompiler (baseOptions) {
    function compile (
      template,
      options
    ) {
      var finalOptions = Object.create(baseOptions);
      var errors = [];
      var tips = [];

      var warn = function (msg, range, tip) {
        (tip ? tips : errors).push(msg);
      };

      if (options) {
        if (options.outputSourceRange) {
          // $flow-disable-line
          var leadingSpaceLength = template.match(/^\s*/)[0].length;

          warn = function (msg, range, tip) {
            var data = { msg: msg };
            if (range) {
              if (range.start != null) {
                data.start = range.start + leadingSpaceLength;
              }
              if (range.end != null) {
                data.end = range.end + leadingSpaceLength;
              }
            }
            (tip ? tips : errors).push(data);
          };
        }
        // merge custom modules
        if (options.modules) {
          finalOptions.modules =
            (baseOptions.modules || []).concat(options.modules);
        }
        // merge custom directives
        if (options.directives) {
          finalOptions.directives = extend(
            Object.create(baseOptions.directives || null),
            options.directives
          );
        }
        // copy other options
        for (var key in options) {
          if (key !== 'modules' && key !== 'directives') {
            finalOptions[key] = options[key];
          }
        }
      }

      finalOptions.warn = warn;

      var compiled = baseCompile(template.trim(), finalOptions);
      {
        detectErrors(compiled.ast, warn);
      }
      compiled.errors = errors;
      compiled.tips = tips;
      return compiled
    }

    return {
      compile: compile,
      compileToFunctions: createCompileToFunctionFn(compile)
    }
  }
}

/*  */

// `createCompilerCreator` allows creating compilers that use alternative
// parser/optimizer/codegen, e.g the SSR optimizing compiler.
// Here we just export a default compiler using the default parts.
var createCompiler = createCompilerCreator(function baseCompile (
  template,
  options
) {
  var ast = parse(template.trim(), options);
  if (options.optimize !== false) {
    optimize(ast, options);
  }
  var code = generate(ast, options);
  return {
    ast: ast,
    render: code.render,
    staticRenderFns: code.staticRenderFns
  }
});

/*  */

var ref$1 = createCompiler(baseOptions);
var compile = ref$1.compile;
var compileToFunctions = ref$1.compileToFunctions;

/*  */

// check whether current browser encodes a char inside attribute values
var div;
function getShouldDecode (href) {
  div = div || document.createElement('div');
  div.innerHTML = href ? "<a href=\"\n\"/>" : "<div a=\"\n\"/>";
  return div.innerHTML.indexOf('&#10;') > 0
}

// #3663: IE encodes newlines inside attribute values while other browsers don't
var shouldDecodeNewlines = inBrowser ? getShouldDecode(false) : false;
// #6828: chrome encodes content in a[href]
var shouldDecodeNewlinesForHref = inBrowser ? getShouldDecode(true) : false;

/*  */

var idToTemplate = cached(function (id) {
  var el = query(id);
  return el && el.innerHTML
});

var mount = Vue.prototype.$mount;
Vue.prototype.$mount = function (
  el,
  hydrating
) {
  el = el && query(el);

  /* istanbul ignore if */
  if (el === document.body || el === document.documentElement) {
    warn(
      "Do not mount Vue to <html> or <body> - mount to normal elements instead."
    );
    return this
  }

  var options = this.$options;
  // resolve template/el and convert to render function
  if (!options.render) {
    var template = options.template;
    if (template) {
      if (typeof template === 'string') {
        if (template.charAt(0) === '#') {
          template = idToTemplate(template);
          /* istanbul ignore if */
          if (!template) {
            warn(
              ("Template element not found or is empty: " + (options.template)),
              this
            );
          }
        }
      } else if (template.nodeType) {
        template = template.innerHTML;
      } else {
        {
          warn('invalid template option:' + template, this);
        }
        return this
      }
    } else if (el) {
      template = getOuterHTML(el);
    }
    if (template) {
      /* istanbul ignore if */
      if (config.performance && mark) {
        mark('compile');
      }

      var ref = compileToFunctions(template, {
        outputSourceRange: "development" !== 'production',
        shouldDecodeNewlines: shouldDecodeNewlines,
        shouldDecodeNewlinesForHref: shouldDecodeNewlinesForHref,
        delimiters: options.delimiters,
        comments: options.comments
      }, this);
      var render = ref.render;
      var staticRenderFns = ref.staticRenderFns;
      options.render = render;
      options.staticRenderFns = staticRenderFns;

      /* istanbul ignore if */
      if (config.performance && mark) {
        mark('compile end');
        measure(("vue " + (this._name) + " compile"), 'compile', 'compile end');
      }
    }
  }
  return mount.call(this, el, hydrating)
};

/**
 * Get outerHTML of elements, taking care
 * of SVG elements in IE as well.
 */
function getOuterHTML (el) {
  if (el.outerHTML) {
    return el.outerHTML
  } else {
    var container = document.createElement('div');
    container.appendChild(el.cloneNode(true));
    return container.innerHTML
  }
}

Vue.compile = compileToFunctions;

module.exports = Vue;

},{}],"node_modules/vue/dist/vue.common.js":[function(require,module,exports) {
if ("development" === 'production') {
  module.exports = require('./vue.common.prod.js');
} else {
  module.exports = require('./vue.common.dev.js');
}
},{"./vue.common.dev.js":"node_modules/vue/dist/vue.common.dev.js"}],"C:/Users/38092/AppData/Roaming/npm/node_modules/parcel-bundler/src/builtins/bundle-url.js":[function(require,module,exports) {
var bundleURL = null;

function getBundleURLCached() {
  if (!bundleURL) {
    bundleURL = getBundleURL();
  }

  return bundleURL;
}

function getBundleURL() {
  // Attempt to find the URL of the current script and use that as the base URL
  try {
    throw new Error();
  } catch (err) {
    var matches = ('' + err.stack).match(/(https?|file|ftp|chrome-extension|moz-extension):\/\/[^)\n]+/g);

    if (matches) {
      return getBaseURL(matches[0]);
    }
  }

  return '/';
}

function getBaseURL(url) {
  return ('' + url).replace(/^((?:https?|file|ftp|chrome-extension|moz-extension):\/\/.+)\/[^/]+$/, '$1') + '/';
}

exports.getBundleURL = getBundleURLCached;
exports.getBaseURL = getBaseURL;
},{}],"C:/Users/38092/AppData/Roaming/npm/node_modules/parcel-bundler/src/builtins/css-loader.js":[function(require,module,exports) {
var bundle = require('./bundle-url');

function updateLink(link) {
  var newLink = link.cloneNode();

  newLink.onload = function () {
    link.remove();
  };

  newLink.href = link.href.split('?')[0] + '?' + Date.now();
  link.parentNode.insertBefore(newLink, link.nextSibling);
}

var cssTimeout = null;

function reloadCSS() {
  if (cssTimeout) {
    return;
  }

  cssTimeout = setTimeout(function () {
    var links = document.querySelectorAll('link[rel="stylesheet"]');

    for (var i = 0; i < links.length; i++) {
      if (bundle.getBaseURL(links[i].href) === bundle.getBundleURL()) {
        updateLink(links[i]);
      }
    }

    cssTimeout = null;
  }, 50);
}

module.exports = reloadCSS;
},{"./bundle-url":"C:/Users/38092/AppData/Roaming/npm/node_modules/parcel-bundler/src/builtins/bundle-url.js"}],"node_modules/vue-hot-reload-api/dist/index.js":[function(require,module,exports) {
var Vue // late bind
var version
var map = Object.create(null)
if (typeof window !== 'undefined') {
  window.__VUE_HOT_MAP__ = map
}
var installed = false
var isBrowserify = false
var initHookName = 'beforeCreate'

exports.install = function (vue, browserify) {
  if (installed) { return }
  installed = true

  Vue = vue.__esModule ? vue.default : vue
  version = Vue.version.split('.').map(Number)
  isBrowserify = browserify

  // compat with < 2.0.0-alpha.7
  if (Vue.config._lifecycleHooks.indexOf('init') > -1) {
    initHookName = 'init'
  }

  exports.compatible = version[0] >= 2
  if (!exports.compatible) {
    console.warn(
      '[HMR] You are using a version of vue-hot-reload-api that is ' +
        'only compatible with Vue.js core ^2.0.0.'
    )
    return
  }
}

/**
 * Create a record for a hot module, which keeps track of its constructor
 * and instances
 *
 * @param {String} id
 * @param {Object} options
 */

exports.createRecord = function (id, options) {
  if(map[id]) { return }

  var Ctor = null
  if (typeof options === 'function') {
    Ctor = options
    options = Ctor.options
  }
  makeOptionsHot(id, options)
  map[id] = {
    Ctor: Ctor,
    options: options,
    instances: []
  }
}

/**
 * Check if module is recorded
 *
 * @param {String} id
 */

exports.isRecorded = function (id) {
  return typeof map[id] !== 'undefined'
}

/**
 * Make a Component options object hot.
 *
 * @param {String} id
 * @param {Object} options
 */

function makeOptionsHot(id, options) {
  if (options.functional) {
    var render = options.render
    options.render = function (h, ctx) {
      var instances = map[id].instances
      if (ctx && instances.indexOf(ctx.parent) < 0) {
        instances.push(ctx.parent)
      }
      return render(h, ctx)
    }
  } else {
    injectHook(options, initHookName, function() {
      var record = map[id]
      if (!record.Ctor) {
        record.Ctor = this.constructor
      }
      record.instances.push(this)
    })
    injectHook(options, 'beforeDestroy', function() {
      var instances = map[id].instances
      instances.splice(instances.indexOf(this), 1)
    })
  }
}

/**
 * Inject a hook to a hot reloadable component so that
 * we can keep track of it.
 *
 * @param {Object} options
 * @param {String} name
 * @param {Function} hook
 */

function injectHook(options, name, hook) {
  var existing = options[name]
  options[name] = existing
    ? Array.isArray(existing) ? existing.concat(hook) : [existing, hook]
    : [hook]
}

function tryWrap(fn) {
  return function (id, arg) {
    try {
      fn(id, arg)
    } catch (e) {
      console.error(e)
      console.warn(
        'Something went wrong during Vue component hot-reload. Full reload required.'
      )
    }
  }
}

function updateOptions (oldOptions, newOptions) {
  for (var key in oldOptions) {
    if (!(key in newOptions)) {
      delete oldOptions[key]
    }
  }
  for (var key$1 in newOptions) {
    oldOptions[key$1] = newOptions[key$1]
  }
}

exports.rerender = tryWrap(function (id, options) {
  var record = map[id]
  if (!options) {
    record.instances.slice().forEach(function (instance) {
      instance.$forceUpdate()
    })
    return
  }
  if (typeof options === 'function') {
    options = options.options
  }
  if (record.Ctor) {
    record.Ctor.options.render = options.render
    record.Ctor.options.staticRenderFns = options.staticRenderFns
    record.instances.slice().forEach(function (instance) {
      instance.$options.render = options.render
      instance.$options.staticRenderFns = options.staticRenderFns
      // reset static trees
      // pre 2.5, all static trees are cached together on the instance
      if (instance._staticTrees) {
        instance._staticTrees = []
      }
      // 2.5.0
      if (Array.isArray(record.Ctor.options.cached)) {
        record.Ctor.options.cached = []
      }
      // 2.5.3
      if (Array.isArray(instance.$options.cached)) {
        instance.$options.cached = []
      }

      // post 2.5.4: v-once trees are cached on instance._staticTrees.
      // Pure static trees are cached on the staticRenderFns array
      // (both already reset above)

      // 2.6: temporarily mark rendered scoped slots as unstable so that
      // child components can be forced to update
      var restore = patchScopedSlots(instance)
      instance.$forceUpdate()
      instance.$nextTick(restore)
    })
  } else {
    // functional or no instance created yet
    record.options.render = options.render
    record.options.staticRenderFns = options.staticRenderFns

    // handle functional component re-render
    if (record.options.functional) {
      // rerender with full options
      if (Object.keys(options).length > 2) {
        updateOptions(record.options, options)
      } else {
        // template-only rerender.
        // need to inject the style injection code for CSS modules
        // to work properly.
        var injectStyles = record.options._injectStyles
        if (injectStyles) {
          var render = options.render
          record.options.render = function (h, ctx) {
            injectStyles.call(ctx)
            return render(h, ctx)
          }
        }
      }
      record.options._Ctor = null
      // 2.5.3
      if (Array.isArray(record.options.cached)) {
        record.options.cached = []
      }
      record.instances.slice().forEach(function (instance) {
        instance.$forceUpdate()
      })
    }
  }
})

exports.reload = tryWrap(function (id, options) {
  var record = map[id]
  if (options) {
    if (typeof options === 'function') {
      options = options.options
    }
    makeOptionsHot(id, options)
    if (record.Ctor) {
      if (version[1] < 2) {
        // preserve pre 2.2 behavior for global mixin handling
        record.Ctor.extendOptions = options
      }
      var newCtor = record.Ctor.super.extend(options)
      record.Ctor.options = newCtor.options
      record.Ctor.cid = newCtor.cid
      record.Ctor.prototype = newCtor.prototype
      if (newCtor.release) {
        // temporary global mixin strategy used in < 2.0.0-alpha.6
        newCtor.release()
      }
    } else {
      updateOptions(record.options, options)
    }
  }
  record.instances.slice().forEach(function (instance) {
    if (instance.$vnode && instance.$vnode.context) {
      instance.$vnode.context.$forceUpdate()
    } else {
      console.warn(
        'Root or manually mounted instance modified. Full reload required.'
      )
    }
  })
})

// 2.6 optimizes template-compiled scoped slots and skips updates if child
// only uses scoped slots. We need to patch the scoped slots resolving helper
// to temporarily mark all scoped slots as unstable in order to force child
// updates.
function patchScopedSlots (instance) {
  if (!instance._u) { return }
  // https://github.com/vuejs/vue/blob/dev/src/core/instance/render-helpers/resolve-scoped-slots.js
  var original = instance._u
  instance._u = function (slots) {
    try {
      // 2.6.4 ~ 2.6.6
      return original(slots, true)
    } catch (e) {
      // 2.5 / >= 2.6.7
      return original(slots, null, true)
    }
  }
  return function () {
    instance._u = original
  }
}

},{}],"src/g-icon.vue":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
//
//
//
//
//
var _default = {
  props: ['iconsvg']
};
exports.default = _default;
        var $9d6a6b = exports.default || module.exports;
      
      if (typeof $9d6a6b === 'function') {
        $9d6a6b = $9d6a6b.options;
      }
    
        /* template */
        Object.assign($9d6a6b, (function () {
          var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c("svg", { staticClass: "icon-svg" }, [
    _c("use", { attrs: { "xlink:href": "#icon-" + _vm.iconsvg } })
  ])
}
var staticRenderFns = []
render._withStripped = true

          return {
            render: render,
            staticRenderFns: staticRenderFns,
            _compiled: true,
            _scopeId: "data-v-9d6a6b",
            functional: undefined
          };
        })());
      
    /* hot reload */
    (function () {
      if (module.hot) {
        var api = require('vue-hot-reload-api');
        api.install(require('vue'));
        if (api.compatible) {
          module.hot.accept();
          if (!module.hot.data) {
            api.createRecord('$9d6a6b', $9d6a6b);
          } else {
            api.reload('$9d6a6b', $9d6a6b);
          }
        }

        
        var reloadCSS = require('_css_loader');
        module.hot.dispose(reloadCSS);
        module.hot.accept(reloadCSS);
      
      }
    })();
},{"_css_loader":"C:/Users/38092/AppData/Roaming/npm/node_modules/parcel-bundler/src/builtins/css-loader.js","vue-hot-reload-api":"node_modules/vue-hot-reload-api/dist/index.js","vue":"node_modules/vue/dist/vue.common.js"}],"src/g-button.vue":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _gIcon = _interopRequireDefault(require("./g-icon.vue"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//
//
//
//
//
//
//
//
//
var _default = {
  components: {
    'g-icon': _gIcon.default
  },
  //        props:['iconsvg','iconPosition']
  props: {
    iconsvg: {
      type: String
    },
    loading: {
      type: Boolean,
      default: false
    },
    iconPosition: {
      type: String,
      default: 'left' //                validator(value){
      //                    console.log(value)
      //                    return !(value != 'left' || value != 'right');
      //                }

    }
  },
  computed: {
    iconPositionClass: function iconPositionClass() {
      var iconPosition = this.iconPosition;
      return [iconPosition && "icon-".concat(iconPosition)];
    }
  }
};
exports.default = _default;
        var $3bf639 = exports.default || module.exports;
      
      if (typeof $3bf639 === 'function') {
        $3bf639 = $3bf639.options;
      }
    
        /* template */
        Object.assign($3bf639, (function () {
          var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "button",
    {
      staticClass: "g-button",
      class: _vm.iconPositionClass,
      on: {
        click: function($event) {
          return _vm.$emit("click")
        }
      }
    },
    [
      _vm.iconsvg && !_vm.loading
        ? _c("g-icon", {
            staticClass: "icon-svg",
            attrs: { iconsvg: _vm.iconsvg }
          })
        : _vm._e(),
      _vm._v(" "),
      _vm.loading
        ? _c("g-icon", {
            staticClass: "loading icon-svg",
            attrs: { iconsvg: "jiazaizhong" }
          })
        : _vm._e(),
      _vm._v(" "),
      _c("div", { staticClass: "g-button-content" }, [_vm._t("default")], 2)
    ],
    1
  )
}
var staticRenderFns = []
render._withStripped = true

          return {
            render: render,
            staticRenderFns: staticRenderFns,
            _compiled: true,
            _scopeId: "data-v-3bf639",
            functional: undefined
          };
        })());
      
    /* hot reload */
    (function () {
      if (module.hot) {
        var api = require('vue-hot-reload-api');
        api.install(require('vue'));
        if (api.compatible) {
          module.hot.accept();
          if (!module.hot.data) {
            api.createRecord('$3bf639', $3bf639);
          } else {
            api.reload('$3bf639', $3bf639);
          }
        }

        
        var reloadCSS = require('_css_loader');
        module.hot.dispose(reloadCSS);
        module.hot.accept(reloadCSS);
      
      }
    })();
},{"./g-icon.vue":"src/g-icon.vue","_css_loader":"C:/Users/38092/AppData/Roaming/npm/node_modules/parcel-bundler/src/builtins/css-loader.js","vue-hot-reload-api":"node_modules/vue-hot-reload-api/dist/index.js","vue":"node_modules/vue/dist/vue.common.js"}],"src/g-button-grounp.vue":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
//
//
//
//
//
var _default = {
  mounted: function mounted() {
    //            console.log(this.$el.children)
    var _iteratorNormalCompletion = true;
    var _didIteratorError = false;
    var _iteratorError = undefined;

    try {
      for (var _iterator = this.$el.children[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
        var node = _step.value;

        if (node.nodeName.toLocaleLowerCase() === 'div') {
          console.warn('g-button插件外层不能使用div');
          return;
        }
      }
    } catch (err) {
      _didIteratorError = true;
      _iteratorError = err;
    } finally {
      try {
        if (!_iteratorNormalCompletion && _iterator.return != null) {
          _iterator.return();
        }
      } finally {
        if (_didIteratorError) {
          throw _iteratorError;
        }
      }
    }
  }
};
exports.default = _default;
        var $8121af = exports.default || module.exports;
      
      if (typeof $8121af === 'function') {
        $8121af = $8121af.options;
      }
    
        /* template */
        Object.assign($8121af, (function () {
          var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c("div", { staticClass: "button-grounp" }, [_vm._t("default")], 2)
}
var staticRenderFns = []
render._withStripped = true

          return {
            render: render,
            staticRenderFns: staticRenderFns,
            _compiled: true,
            _scopeId: null,
            functional: undefined
          };
        })());
      
    /* hot reload */
    (function () {
      if (module.hot) {
        var api = require('vue-hot-reload-api');
        api.install(require('vue'));
        if (api.compatible) {
          module.hot.accept();
          if (!module.hot.data) {
            api.createRecord('$8121af', $8121af);
          } else {
            api.reload('$8121af', $8121af);
          }
        }

        
        var reloadCSS = require('_css_loader');
        module.hot.dispose(reloadCSS);
        module.hot.accept(reloadCSS);
      
      }
    })();
},{"_css_loader":"C:/Users/38092/AppData/Roaming/npm/node_modules/parcel-bundler/src/builtins/css-loader.js","vue-hot-reload-api":"node_modules/vue-hot-reload-api/dist/index.js","vue":"node_modules/vue/dist/vue.common.js"}],"src/g-input.vue":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _gIcon = _interopRequireDefault(require("./g-icon.vue"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//
//
//
//
//
//
//
//
//
//
//
//
//
var _default = {
  component: {
    'g-icon': _gIcon.default
  },
  props: {
    value: {//                type:String
    },
    disabled: {
      type: Boolean
    },
    error: {
      type: String
    }
  }
};
exports.default = _default;
        var $2bb88d = exports.default || module.exports;
      
      if (typeof $2bb88d === 'function') {
        $2bb88d = $2bb88d.options;
      }
    
        /* template */
        Object.assign($2bb88d, (function () {
          var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "div",
    { staticClass: "input-wrap", class: { error: _vm.error } },
    [
      _c("input", {
        attrs: { disabled: _vm.disabled },
        domProps: { value: _vm.value },
        on: {
          change: function($event) {
            return _vm.$emit("change", $event.target.value, "h1", "h2")
          },
          input: function($event) {
            return _vm.$emit("input", $event.target.value)
          },
          focus: function($event) {
            return _vm.$emit("focus", $event.target.value)
          },
          blur: function($event) {
            return _vm.$emit("blur", $event.target.value)
          }
        }
      }),
      _vm._v(" "),
      _vm.error
        ? [
            _c("g-icon", { attrs: { iconsvg: "qq" } }),
            _vm._v(" "),
            _c("span", [_vm._v(_vm._s(_vm.error))])
          ]
        : _vm._e()
    ],
    2
  )
}
var staticRenderFns = []
render._withStripped = true

          return {
            render: render,
            staticRenderFns: staticRenderFns,
            _compiled: true,
            _scopeId: "data-v-2bb88d",
            functional: undefined
          };
        })());
      
    /* hot reload */
    (function () {
      if (module.hot) {
        var api = require('vue-hot-reload-api');
        api.install(require('vue'));
        if (api.compatible) {
          module.hot.accept();
          if (!module.hot.data) {
            api.createRecord('$2bb88d', $2bb88d);
          } else {
            api.reload('$2bb88d', $2bb88d);
          }
        }

        
        var reloadCSS = require('_css_loader');
        module.hot.dispose(reloadCSS);
        module.hot.accept(reloadCSS);
      
      }
    })();
},{"./g-icon.vue":"src/g-icon.vue","_css_loader":"C:/Users/38092/AppData/Roaming/npm/node_modules/parcel-bundler/src/builtins/css-loader.js","vue-hot-reload-api":"node_modules/vue-hot-reload-api/dist/index.js","vue":"node_modules/vue/dist/vue.common.js"}],"src/g-col.vue":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
//
//
//
//
//
var _default = {
  props: {
    span: {
      type: [Number, String] //                default:24

    },
    offset: {
      type: [Number, String]
    },
    phone: {
      type: Object,
      validator: function validator(value) {
        var keys = Object.keys(value);
        var flag = true;
        keys.forEach(function (vm) {
          if (!['span', 'offset'].includes(vm)) {
            flag = false;
          }
        });
        return flag;
      }
    }
  },
  data: function data() {
    return {
      gutter: 0
    };
  },
  computed: {
    colClass: function colClass() {
      var span = this.span,
          offset = this.offset,
          phone = this.phone;
      return [span && "col-".concat(span), offset && "offset-".concat(offset), phone && "phoneSpan-".concat(phone.span), phone && "phoneOffset-".concat(phone.offset)];
    },
    colStyle: function colStyle() {
      return {
        marginLeft: this.gutter / 2 + 'px',
        marginRight: this.gutter / 2 + 'px'
      };
    }
  }
};
exports.default = _default;
        var $680331 = exports.default || module.exports;
      
      if (typeof $680331 === 'function') {
        $680331 = $680331.options;
      }
    
        /* template */
        Object.assign($680331, (function () {
          var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "div",
    { staticClass: "g-col", class: _vm.colClass, style: _vm.colStyle },
    [_vm._t("default")],
    2
  )
}
var staticRenderFns = []
render._withStripped = true

          return {
            render: render,
            staticRenderFns: staticRenderFns,
            _compiled: true,
            _scopeId: "data-v-680331",
            functional: undefined
          };
        })());
      
    /* hot reload */
    (function () {
      if (module.hot) {
        var api = require('vue-hot-reload-api');
        api.install(require('vue'));
        if (api.compatible) {
          module.hot.accept();
          if (!module.hot.data) {
            api.createRecord('$680331', $680331);
          } else {
            api.reload('$680331', $680331);
          }
        }

        
        var reloadCSS = require('_css_loader');
        module.hot.dispose(reloadCSS);
        module.hot.accept(reloadCSS);
      
      }
    })();
},{"_css_loader":"C:/Users/38092/AppData/Roaming/npm/node_modules/parcel-bundler/src/builtins/css-loader.js","vue-hot-reload-api":"node_modules/vue-hot-reload-api/dist/index.js","vue":"node_modules/vue/dist/vue.common.js"}],"src/g-row.vue":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
//
//
//
//
//
var _default = {
  props: {
    gutter: {
      type: [Number, String]
    },
    align: {
      type: String,
      default: 'left' //                validator(value){
      //                    return ['left','center','right'].includes(value)
      //                }

    }
  },
  computed: {
    colClass: function colClass() {
      var align = this.align;
      return [align && "col-".concat(align)];
    },
    colStyle: function colStyle() {
      return {
        marginLeft: -this.gutter / 2 + 'px',
        marginRight: -this.gutter / 2 + 'px'
      };
    }
  },
  mounted: function mounted() {
    var _this = this;

    this.$children.forEach(function (vm) {
      vm.gutter = _this.gutter;
    });
  }
};
exports.default = _default;
        var $2b3685 = exports.default || module.exports;
      
      if (typeof $2b3685 === 'function') {
        $2b3685 = $2b3685.options;
      }
    
        /* template */
        Object.assign($2b3685, (function () {
          var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "div",
    { staticClass: "g-row", class: _vm.colClass, style: _vm.colStyle },
    [_vm._t("default")],
    2
  )
}
var staticRenderFns = []
render._withStripped = true

          return {
            render: render,
            staticRenderFns: staticRenderFns,
            _compiled: true,
            _scopeId: "data-v-2b3685",
            functional: undefined
          };
        })());
      
    /* hot reload */
    (function () {
      if (module.hot) {
        var api = require('vue-hot-reload-api');
        api.install(require('vue'));
        if (api.compatible) {
          module.hot.accept();
          if (!module.hot.data) {
            api.createRecord('$2b3685', $2b3685);
          } else {
            api.reload('$2b3685', $2b3685);
          }
        }

        
        var reloadCSS = require('_css_loader');
        module.hot.dispose(reloadCSS);
        module.hot.accept(reloadCSS);
      
      }
    })();
},{"_css_loader":"C:/Users/38092/AppData/Roaming/npm/node_modules/parcel-bundler/src/builtins/css-loader.js","vue-hot-reload-api":"node_modules/vue-hot-reload-api/dist/index.js","vue":"node_modules/vue/dist/vue.common.js"}],"src/g-toast.vue":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
//
//
//
//
//
//
//
//
//
//
//
//
//
//
var _default = {
  name: 'GuluToast',
  props: {
    autoClose: {
      type: Boolean,
      default: true
    },
    autoCloseDelay: {
      type: Number,
      default: 3000000
    },
    position: {
      type: String,
      default: 'top',
      validator: function validator(value) {
        //                    console.log(value)
        return ['top', 'center', 'bottom'].includes(value); //                    return ['left','center','right'].indexOf(value)>=0
      }
    },
    closeButton: {
      type: Object,
      default: function _default() {
        return {
          text: '关闭22',
          enableHtml: false,
          callback: undefined
        };
      }
    }
  },
  created: function created() {//            console.log(this.closeButton)
    //            console.log(typeof this.closeButton.callback==='function')
  },
  mounted: function mounted() {
    var _this = this;

    if (this.autoClose) {
      setTimeout(function () {
        _this.close();
      }, this.autoCloseDelay);
    }

    this.$nextTick(function () {
      _this.$refs.line.style.height = "".concat(_this.$refs.wrapper.getBoundingClientRect().height, "px");
    });
  },
  computed: {
    positionStyle: function positionStyle() {
      var position = this.position;
      return [position && "position-".concat(position)];
    }
  },
  methods: {
    close: function close() {
      this.$el.remove();
      this.$destroy;
    },
    log: function log() {
      console.log('11111');
    },
    closeBtn: function closeBtn() {
      this.close();

      if (this.closeButton && typeof this.closeButton.callback === 'function') {
        this.closeButton.callback(this);
      }
    }
  }
};
exports.default = _default;
        var $26de1c = exports.default || module.exports;
      
      if (typeof $26de1c === 'function') {
        $26de1c = $26de1c.options;
      }
    
        /* template */
        Object.assign($26de1c, (function () {
          var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "div",
    { ref: "wrapper", staticClass: "toastContain", class: _vm.positionStyle },
    [
      _c("div", { staticClass: "toast" }, [
        _c(
          "div",
          { staticClass: "toastWrap" },
          [
            _vm.closeButton.enableHtml
              ? _c("div", {
                  domProps: { innerHTML: _vm._s(_vm.$slots.default[0]) }
                })
              : _vm._t("default")
          ],
          2
        ),
        _vm._v(" "),
        _c("div", { ref: "line", staticClass: "toastLine" }),
        _vm._v(" "),
        _vm.closeButton
          ? _c(
              "div",
              { staticClass: "toastClose", on: { click: _vm.closeBtn } },
              [
                _vm._v(
                  "\n            " + _vm._s(_vm.closeButton.text) + "\n        "
                )
              ]
            )
          : _vm._e()
      ])
    ]
  )
}
var staticRenderFns = []
render._withStripped = true

          return {
            render: render,
            staticRenderFns: staticRenderFns,
            _compiled: true,
            _scopeId: "data-v-26de1c",
            functional: undefined
          };
        })());
      
    /* hot reload */
    (function () {
      if (module.hot) {
        var api = require('vue-hot-reload-api');
        api.install(require('vue'));
        if (api.compatible) {
          module.hot.accept();
          if (!module.hot.data) {
            api.createRecord('$26de1c', $26de1c);
          } else {
            api.reload('$26de1c', $26de1c);
          }
        }

        
        var reloadCSS = require('_css_loader');
        module.hot.dispose(reloadCSS);
        module.hot.accept(reloadCSS);
      
      }
    })();
},{"_css_loader":"C:/Users/38092/AppData/Roaming/npm/node_modules/parcel-bundler/src/builtins/css-loader.js","vue-hot-reload-api":"node_modules/vue-hot-reload-api/dist/index.js","vue":"node_modules/vue/dist/vue.common.js"}],"src/plugin.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _gToast = _interopRequireDefault(require("./g-toast.vue"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var currentToast;
var _default = {
  install: function install(Vue, options) {
    Vue.prototype.$toast = function (message, ToastOptions) {
      //console.log('I am Toast')
      console.log(currentToast);

      if (currentToast) {
        currentToast.close();
      }

      currentToast = createToast(Vue, message, ToastOptions);
    };
  }
};
exports.default = _default;

function createToast(Vue, message, ToastOptions) {
  "use strict";

  var Constructor = Vue.extend(_gToast.default); //console.log(ToastOptions.closeButton)

  var toast = new Constructor({
    propsData: {
      position: ToastOptions.position,
      closeButton: ToastOptions.closeButton
    }
  });
  toast.$slots.default = [message];
  toast.$mount();
  document.body.appendChild(toast.$el);
  return toast;
}
},{"./g-toast.vue":"src/g-toast.vue"}],"src/g-tab.vue":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _vue = _interopRequireDefault(require("vue"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//
//
//
//
//
//
var _default = {
  name: 'GuluTab',
  props: {
    selected: {
      type: String | Number,
      required: true
    },
    direction: {
      type: String,
      default: 'horizontal',
      validator: function validator(value) {
        return ['horizontal', 'vertical'].indexOf(value) >= 0;
      }
    }
  },
  data: function data() {
    return {
      eventBus: new _vue.default()
    };
  },
  provide: function provide() {
    return {
      eventBus: this.eventBus
    };
  },
  created: function created() {//this.$emit('update:selected','xxx')
  },
  mounted: function mounted() {
    var _this = this;

    this.$children.forEach(function (vm) {
      if (vm.$options.name === 'GuluTabHeader') {
        vm.$children.forEach(function (vm2) {
          //                        console.log(this.selected)
          if (vm2.$options.name === 'GuluTabItem' && vm2.name === _this.selected) {
            _this.eventBus.$emit('update:selected', _this.selected, vm2);
          }
        });
      }
    });
  }
};
exports.default = _default;
        var $ebe9cf = exports.default || module.exports;
      
      if (typeof $ebe9cf === 'function') {
        $ebe9cf = $ebe9cf.options;
      }
    
        /* template */
        Object.assign($ebe9cf, (function () {
          var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c("div", [_vm._t("default")], 2)
}
var staticRenderFns = []
render._withStripped = true

          return {
            render: render,
            staticRenderFns: staticRenderFns,
            _compiled: true,
            _scopeId: "data-v-ebe9cf",
            functional: undefined
          };
        })());
      
    /* hot reload */
    (function () {
      if (module.hot) {
        var api = require('vue-hot-reload-api');
        api.install(require('vue'));
        if (api.compatible) {
          module.hot.accept();
          if (!module.hot.data) {
            api.createRecord('$ebe9cf', $ebe9cf);
          } else {
            api.reload('$ebe9cf', $ebe9cf);
          }
        }

        
        var reloadCSS = require('_css_loader');
        module.hot.dispose(reloadCSS);
        module.hot.accept(reloadCSS);
      
      }
    })();
},{"vue":"node_modules/vue/dist/vue.common.js","_css_loader":"C:/Users/38092/AppData/Roaming/npm/node_modules/parcel-bundler/src/builtins/css-loader.js","vue-hot-reload-api":"node_modules/vue-hot-reload-api/dist/index.js"}],"src/g-tab-header.vue":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
//
//
//
//
//
//
//
var _default = {
  name: 'GuluTabHeader',
  inject: ['eventBus'],
  created: function created() {//            console.log(this.eventBus)
  },
  mounted: function mounted() {
    var _this = this;

    this.eventBus.$on('update:selected', function (name, vm) {
      var _vm$$el$getBoundingCl = vm.$el.getBoundingClientRect(),
          width = _vm$$el$getBoundingCl.width,
          height = _vm$$el$getBoundingCl.height,
          left = _vm$$el$getBoundingCl.left,
          top = _vm$$el$getBoundingCl.top; //                console.log(left)


      left = left - 20;
      _this.$refs.line.style.width = "".concat(width, "px");
      _this.$refs.line.style.left = "".concat(left, "px");
    });
  }
};
exports.default = _default;
        var $246408 = exports.default || module.exports;
      
      if (typeof $246408 === 'function') {
        $246408 = $246408.options;
      }
    
        /* template */
        Object.assign($246408, (function () {
          var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "div",
    { staticClass: "tab-header" },
    [
      _vm._t("default"),
      _vm._v(" "),
      _c("div", { ref: "line", staticClass: "tabLine" })
    ],
    2
  )
}
var staticRenderFns = []
render._withStripped = true

          return {
            render: render,
            staticRenderFns: staticRenderFns,
            _compiled: true,
            _scopeId: "data-v-246408",
            functional: undefined
          };
        })());
      
    /* hot reload */
    (function () {
      if (module.hot) {
        var api = require('vue-hot-reload-api');
        api.install(require('vue'));
        if (api.compatible) {
          module.hot.accept();
          if (!module.hot.data) {
            api.createRecord('$246408', $246408);
          } else {
            api.reload('$246408', $246408);
          }
        }

        
        var reloadCSS = require('_css_loader');
        module.hot.dispose(reloadCSS);
        module.hot.accept(reloadCSS);
      
      }
    })();
},{"_css_loader":"C:/Users/38092/AppData/Roaming/npm/node_modules/parcel-bundler/src/builtins/css-loader.js","vue-hot-reload-api":"node_modules/vue-hot-reload-api/dist/index.js","vue":"node_modules/vue/dist/vue.common.js"}],"src/g-tab-body.vue":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
//
//
//
//
//
//
var _default = {};
exports.default = _default;
        var $b13e0a = exports.default || module.exports;
      
      if (typeof $b13e0a === 'function') {
        $b13e0a = $b13e0a.options;
      }
    
        /* template */
        Object.assign($b13e0a, (function () {
          var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c("div", { staticClass: "tab-body" }, [_vm._t("default")], 2)
}
var staticRenderFns = []
render._withStripped = true

          return {
            render: render,
            staticRenderFns: staticRenderFns,
            _compiled: true,
            _scopeId: "data-v-b13e0a",
            functional: undefined
          };
        })());
      
    /* hot reload */
    (function () {
      if (module.hot) {
        var api = require('vue-hot-reload-api');
        api.install(require('vue'));
        if (api.compatible) {
          module.hot.accept();
          if (!module.hot.data) {
            api.createRecord('$b13e0a', $b13e0a);
          } else {
            api.reload('$b13e0a', $b13e0a);
          }
        }

        
        var reloadCSS = require('_css_loader');
        module.hot.dispose(reloadCSS);
        module.hot.accept(reloadCSS);
      
      }
    })();
},{"_css_loader":"C:/Users/38092/AppData/Roaming/npm/node_modules/parcel-bundler/src/builtins/css-loader.js","vue-hot-reload-api":"node_modules/vue-hot-reload-api/dist/index.js","vue":"node_modules/vue/dist/vue.common.js"}],"src/g-tab-item.vue":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
//
//
//
//
//
//
var _default = {
  name: 'GuluTabItem',
  inject: ['eventBus'],
  props: {
    name: {
      type: String | Number,
      required: true
    },
    disabled: {
      type: Boolean,
      default: false
    }
  },
  data: function data() {
    return {
      active: false
    };
  },
  computed: {
    itemStyle: function itemStyle() {
      var active = this.active,
          disabled = this.disabled;
      return {
        tabActive: active,
        tabDisabled: disabled //                return [
        //                        active&&`itemStyle`,
        //                        disabled&&`disabledStyle`
        //                       ]

      };
    }
  },
  created: function created() {
    var _this = this;

    //监听update:selected事件
    this.eventBus.$on('update:selected', function (name) {
      if (name === _this.name) {
        _this.active = true; //                    console.log(`${this.name}被选中了`)
      } else {
        _this.active = false; //                    console.log(`${this.name}没有被选中了`)
      }
    });
  },
  methods: {
    xxx: function xxx() {
      if (this.disabled) return;
      this.eventBus.$emit('update:selected', this.name, this);
    }
  }
};
exports.default = _default;
        var $670485 = exports.default || module.exports;
      
      if (typeof $670485 === 'function') {
        $670485 = $670485.options;
      }
    
        /* template */
        Object.assign($670485, (function () {
          var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "div",
    { staticClass: "tab-item", class: _vm.itemStyle, on: { click: _vm.xxx } },
    [_vm._t("default")],
    2
  )
}
var staticRenderFns = []
render._withStripped = true

          return {
            render: render,
            staticRenderFns: staticRenderFns,
            _compiled: true,
            _scopeId: "data-v-670485",
            functional: undefined
          };
        })());
      
    /* hot reload */
    (function () {
      if (module.hot) {
        var api = require('vue-hot-reload-api');
        api.install(require('vue'));
        if (api.compatible) {
          module.hot.accept();
          if (!module.hot.data) {
            api.createRecord('$670485', $670485);
          } else {
            api.reload('$670485', $670485);
          }
        }

        
        var reloadCSS = require('_css_loader');
        module.hot.dispose(reloadCSS);
        module.hot.accept(reloadCSS);
      
      }
    })();
},{"_css_loader":"C:/Users/38092/AppData/Roaming/npm/node_modules/parcel-bundler/src/builtins/css-loader.js","vue-hot-reload-api":"node_modules/vue-hot-reload-api/dist/index.js","vue":"node_modules/vue/dist/vue.common.js"}],"src/g-tab-pane.vue":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
//
//
//
//
//
//
var _default = {
  inject: ['eventBus'],
  props: {
    name: {
      type: String | Number,
      required: true
    }
  },
  data: function data() {
    return {
      active: false
    };
  },
  computed: {
    paneStyle: function paneStyle() {
      var active = this.active;
      return [active && "paneStyle"];
    }
  },
  created: function created() {
    var _this = this;

    //监听update:selected事件
    this.eventBus.$on('update:selected', function (name, vm) {
      if (name === _this.name) {
        _this.active = true; //                    console.log(`${this.name}被选中了`)
      } else {
        _this.active = false; //                    console.log(`${this.name}没有被选中了`)
      }
    });
  }
};
exports.default = _default;
        var $3fc8f0 = exports.default || module.exports;
      
      if (typeof $3fc8f0 === 'function') {
        $3fc8f0 = $3fc8f0.options;
      }
    
        /* template */
        Object.assign($3fc8f0, (function () {
          var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _vm.active
    ? _c(
        "div",
        { staticClass: "tab-pane", class: _vm.paneStyle },
        [_vm._t("default")],
        2
      )
    : _vm._e()
}
var staticRenderFns = []
render._withStripped = true

          return {
            render: render,
            staticRenderFns: staticRenderFns,
            _compiled: true,
            _scopeId: "data-v-3fc8f0",
            functional: undefined
          };
        })());
      
    /* hot reload */
    (function () {
      if (module.hot) {
        var api = require('vue-hot-reload-api');
        api.install(require('vue'));
        if (api.compatible) {
          module.hot.accept();
          if (!module.hot.data) {
            api.createRecord('$3fc8f0', $3fc8f0);
          } else {
            api.reload('$3fc8f0', $3fc8f0);
          }
        }

        
        var reloadCSS = require('_css_loader');
        module.hot.dispose(reloadCSS);
        module.hot.accept(reloadCSS);
      
      }
    })();
},{"_css_loader":"C:/Users/38092/AppData/Roaming/npm/node_modules/parcel-bundler/src/builtins/css-loader.js","vue-hot-reload-api":"node_modules/vue-hot-reload-api/dist/index.js","vue":"node_modules/vue/dist/vue.common.js"}],"src/g-popover.vue":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
//
//
//
//
//
//
//
//
//
//
//
var _default = {
  name: 'Gulupopover',
  data: function data() {
    return {
      visible: false
    };
  },
  props: {
    position: {
      type: String,
      default: 'top',
      validator: function validator(value) {
        return ['top', 'left', 'right', 'bottom'].includes(value);
      }
    },
    trigger: {
      type: String,
      default: 'click',
      validator: function validator(value) {
        return ['click', 'hover'].indexOf(value) >= 0;
      }
    }
  },
  created: function created() {//            console.log('我是第一嘛')
  },
  mounted: function mounted() {
    if (this.trigger === 'click') {
      this.$refs.popover.addEventListener('click', this.onClick);
    } else {
      this.$refs.popover.addEventListener('mouseenter', this.open);
      this.$refs.popover.addEventListener('mouseleave', this.close);
    }
  },
  beforeDestroy: function beforeDestroy() {
    if (this.trigger === 'click') {
      this.$refs.popover.removeEventListener('click', this.onClick);
    } else {
      this.$refs.popover.removeEventListener('mouseenter', this.open);
      this.$refs.popover.removeEventListener('mouseleave', this.close);
    }
  },
  computed: {
    positionClass: function positionClass() {
      var position = this.position;
      return [position && "position-".concat(position)];
    }
  },
  methods: {
    onClickDocument: function onClickDocument(event) {
      if (this.$refs.popover && (this.$refs.popover === event.target || this.$refs.popover.contains(event.target))) {
        return;
      }

      if (this.$refs.contentWrapper && (this.$refs.contentWrapper === event.target || this.$refs.contentWrapper.contains(event.target))) {
        return;
      }

      this.close();
    },
    positionContent: function positionContent() {
      var _this$$refs = this.$refs,
          contentWrapper = _this$$refs.contentWrapper,
          triggerWrapper = _this$$refs.triggerWrapper;
      document.body.appendChild(contentWrapper);

      var _triggerWrapper$getBo = triggerWrapper.getBoundingClientRect(),
          width = _triggerWrapper$getBo.width,
          height = _triggerWrapper$getBo.height,
          top = _triggerWrapper$getBo.top,
          left = _triggerWrapper$getBo.left;

      if (this.position == 'top') {
        contentWrapper.style.left = left + window.scrollX + 'px';
        contentWrapper.style.top = top + window.scrollY + 'px';
      } else if (this.position == 'bottom') {
        contentWrapper.style.left = left + window.scrollX + 'px';
        contentWrapper.style.top = top + window.scrollY + height + 'px';
      } else if (this.position == 'left') {
        contentWrapper.style.left = left + window.scrollX + 'px';

        var _contentWrapper$getBo = contentWrapper.getBoundingClientRect(),
            height2 = _contentWrapper$getBo.height;

        contentWrapper.style.top = top + window.scrollY + (height - height2) / 2 + 'px';
      } else if (this.position == 'right') {
        contentWrapper.style.left = left + window.scrollX + width + 'px';

        var _contentWrapper$getBo2 = contentWrapper.getBoundingClientRect(),
            _height = _contentWrapper$getBo2.height;

        contentWrapper.style.top = top + window.scrollY + (height - _height) / 2 + 'px';
      }
    },
    open: function open() {
      var _this = this;

      this.visible = true;
      this.$nextTick(function () {
        _this.positionContent();

        document.addEventListener('click', _this.onClickDocument);
      });
    },
    close: function close() {
      this.visible = false;
      console.log('结束监听');
      document.removeEventListener('click', this.onClickDocument);
    },
    onClick: function onClick(event) {
      //点的按钮
      if (this.$refs.triggerWrapper.contains(event.target)) {
        if (this.visible === true) {
          this.close();
        } else {
          this.open();
        }
      }
    }
  }
};
exports.default = _default;
        var $e87e44 = exports.default || module.exports;
      
      if (typeof $e87e44 === 'function') {
        $e87e44 = $e87e44.options;
      }
    
        /* template */
        Object.assign($e87e44, (function () {
          var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c("div", { ref: "popover", staticClass: "popover" }, [
    _vm.visible
      ? _c(
          "div",
          {
            ref: "contentWrapper",
            staticClass: "contentWrapper",
            class: _vm.positionClass
          },
          [_vm._t("content")],
          2
        )
      : _vm._e(),
    _vm._v(" "),
    _c(
      "span",
      { ref: "triggerWrapper", staticStyle: { display: "inline-block" } },
      [_vm._t("default")],
      2
    )
  ])
}
var staticRenderFns = []
render._withStripped = true

          return {
            render: render,
            staticRenderFns: staticRenderFns,
            _compiled: true,
            _scopeId: "data-v-e87e44",
            functional: undefined
          };
        })());
      
    /* hot reload */
    (function () {
      if (module.hot) {
        var api = require('vue-hot-reload-api');
        api.install(require('vue'));
        if (api.compatible) {
          module.hot.accept();
          if (!module.hot.data) {
            api.createRecord('$e87e44', $e87e44);
          } else {
            api.reload('$e87e44', $e87e44);
          }
        }

        
        var reloadCSS = require('_css_loader');
        module.hot.dispose(reloadCSS);
        module.hot.accept(reloadCSS);
      
      }
    })();
},{"_css_loader":"C:/Users/38092/AppData/Roaming/npm/node_modules/parcel-bundler/src/builtins/css-loader.js","vue-hot-reload-api":"node_modules/vue-hot-reload-api/dist/index.js","vue":"node_modules/vue/dist/vue.common.js"}],"src/g-collapse.vue":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _vue = _interopRequireDefault(require("vue"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//
//
//
//
//
//
var _default = {
  name: 'Gulucollapse',
  props: {
    single: {
      type: Boolean,
      default: false
    },
    selected: {
      type: Array
    }
  },
  data: function data() {
    return {
      eventBus: new _vue.default()
    };
  },
  provide: function provide() {
    return {
      eventBus: this.eventBus
    };
  },
  mounted: function mounted() {
    var _this = this;

    this.eventBus.$emit('update:selected', this.selected);
    this.eventBus.$on('update:addSelected', function (name) {
      var selectedCopy = JSON.parse(JSON.stringify(_this.selected));

      if (_this.single) {
        selectedCopy = [name];
      } else {
        selectedCopy.push(name);
      }

      _this.$emit('update:selected', selectedCopy);

      _this.eventBus.$emit('update:selected', selectedCopy);
    });
    this.eventBus.$on('update:removeSelected', function (name) {
      var index = _this.selected.indexOf(name);

      var selectedCopy = JSON.parse(JSON.stringify(_this.selected));
      selectedCopy.splice(index, 1);

      _this.$emit('update:selected', selectedCopy);

      _this.eventBus.$emit('update:selected', selectedCopy);
    });
  }
};
exports.default = _default;
        var $3fac74 = exports.default || module.exports;
      
      if (typeof $3fac74 === 'function') {
        $3fac74 = $3fac74.options;
      }
    
        /* template */
        Object.assign($3fac74, (function () {
          var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c("div", { staticClass: "collapse" }, [_vm._t("default")], 2)
}
var staticRenderFns = []
render._withStripped = true

          return {
            render: render,
            staticRenderFns: staticRenderFns,
            _compiled: true,
            _scopeId: "data-v-3fac74",
            functional: undefined
          };
        })());
      
    /* hot reload */
    (function () {
      if (module.hot) {
        var api = require('vue-hot-reload-api');
        api.install(require('vue'));
        if (api.compatible) {
          module.hot.accept();
          if (!module.hot.data) {
            api.createRecord('$3fac74', $3fac74);
          } else {
            api.reload('$3fac74', $3fac74);
          }
        }

        
        var reloadCSS = require('_css_loader');
        module.hot.dispose(reloadCSS);
        module.hot.accept(reloadCSS);
      
      }
    })();
},{"vue":"node_modules/vue/dist/vue.common.js","_css_loader":"C:/Users/38092/AppData/Roaming/npm/node_modules/parcel-bundler/src/builtins/css-loader.js","vue-hot-reload-api":"node_modules/vue-hot-reload-api/dist/index.js"}],"src/g-collapse-item.vue":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
//
//
//
//
//
//
//
//
//
//
//
var _default = {
  name: 'GulucollapseItem',
  props: {
    title: {
      type: String,
      required: true
    },
    name: {
      type: String,
      required: true
    }
  },
  inject: ['eventBus'],
  data: function data() {
    return {
      open: false
    };
  },
  mounted: function mounted() {
    var _this = this;

    this.eventBus && this.eventBus.$on('update:selected', function (names) {
      if (names.indexOf(_this.name) < 0) {
        _this.open = false;
      } else {
        _this.open = true;
      }
    });
  },
  methods: {
    toggle: function toggle() {
      if (this.open) {
        this.eventBus && this.eventBus.$emit('update:removeSelected', this.name);
      } else {
        this.eventBus && this.eventBus.$emit('update:addSelected', this.name);
      }
    }
  }
};
exports.default = _default;
        var $324bd3 = exports.default || module.exports;
      
      if (typeof $324bd3 === 'function') {
        $324bd3 = $324bd3.options;
      }
    
        /* template */
        Object.assign($324bd3, (function () {
          var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c("div", { staticClass: "collapseItem" }, [
    _c("div", { staticClass: "title", on: { click: _vm.toggle } }, [
      _vm._v("\n        " + _vm._s(_vm.title) + "\n    ")
    ]),
    _vm._v(" "),
    _vm.open
      ? _c("div", { staticClass: "content" }, [_vm._t("default")], 2)
      : _vm._e()
  ])
}
var staticRenderFns = []
render._withStripped = true

          return {
            render: render,
            staticRenderFns: staticRenderFns,
            _compiled: true,
            _scopeId: "data-v-324bd3",
            functional: undefined
          };
        })());
      
    /* hot reload */
    (function () {
      if (module.hot) {
        var api = require('vue-hot-reload-api');
        api.install(require('vue'));
        if (api.compatible) {
          module.hot.accept();
          if (!module.hot.data) {
            api.createRecord('$324bd3', $324bd3);
          } else {
            api.reload('$324bd3', $324bd3);
          }
        }

        
        var reloadCSS = require('_css_loader');
        module.hot.dispose(reloadCSS);
        module.hot.accept(reloadCSS);
      
      }
    })();
},{"_css_loader":"C:/Users/38092/AppData/Roaming/npm/node_modules/parcel-bundler/src/builtins/css-loader.js","vue-hot-reload-api":"node_modules/vue-hot-reload-api/dist/index.js","vue":"node_modules/vue/dist/vue.common.js"}],"src/g-cascader-item.vue":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _gIcon = _interopRequireDefault(require("./g-icon.vue"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
var _default = {
  name: 'GuluCascaderItems',
  components: {
    Icon: _gIcon.default
  },
  props: {
    items: {
      type: Array
    },
    height: {
      type: String
    },
    level: {
      type: Number,
      default: 0
    },
    loadingItem: {
      type: Object,
      default: function _default() {
        return {};
      }
    },
    selected: {
      type: Array,
      default: function _default() {
        return [];
      }
    },
    loadData: {
      type: Function
    }
  },
  data: function data() {
    return {};
  },
  methods: {
    rightArrowVisible: function rightArrowVisible(item) {
      return this.loadData ? !item.isLeaf : item.children;
    },
    onClickLabel: function onClickLabel(item) {
      var copy = JSON.parse(JSON.stringify(this.selected)); //拷贝

      copy[this.level] = item;
      copy.splice(this.level + 1);
      this.$emit('update:selected', copy);
    },
    onUpdateSelected: function onUpdateSelected(newSelected) {
      this.$emit('update:selected', newSelected);
    }
  },
  computed: {
    rightItems: function rightItems() {
      var currentSelected = this.selected[this.level];

      if (currentSelected) {
        console.log(this.items);
        console.log(currentSelected);
        var selected = this.items.filter(function (item) {
          return item.name === currentSelected.name;
        });

        if (selected && selected[0].children && selected[0].children.length > 0) {
          return selected[0].children;
        }
      } //if(currentSelected && currentSelected.children){
      //    return currentSelected.children
      //}else{
      //    return null
      //}

    }
  }
};
exports.default = _default;
        var $3830c1 = exports.default || module.exports;
      
      if (typeof $3830c1 === 'function') {
        $3830c1 = $3830c1.options;
      }
    
        /* template */
        Object.assign($3830c1, (function () {
          var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "div",
    { staticClass: "cascaderItem", style: { height: _vm.height } },
    [
      _c(
        "div",
        { staticClass: "left" },
        _vm._l(_vm.items, function(item) {
          return _c(
            "div",
            {
              staticClass: "label",
              on: {
                click: function($event) {
                  return _vm.onClickLabel(item)
                }
              }
            },
            [
              _c("span", { staticClass: "text" }, [_vm._v(_vm._s(item.name))]),
              _vm._v(" "),
              _c(
                "span",
                { staticClass: "icons" },
                [
                  item.name == _vm.loadingItem.name
                    ? [
                        _c("g-icon", {
                          staticClass: "loading",
                          attrs: { iconsvg: "jiazaizhong" }
                        })
                      ]
                    : [
                        _vm.rightArrowVisible(item)
                          ? _c("g-icon", { attrs: { iconsvg: "arrow-right" } })
                          : _vm._e()
                      ]
                ],
                2
              )
            ]
          )
        }),
        0
      ),
      _vm._v(" "),
      _vm.rightItems
        ? _c(
            "div",
            { staticClass: "right" },
            [
              _c("gulu-cascader-items", {
                attrs: {
                  items: _vm.rightItems,
                  level: _vm.level + 1,
                  selected: _vm.selected,
                  "load-data": _vm.loadData,
                  "loading-item": _vm.loadingItem
                },
                on: { "update:selected": _vm.onUpdateSelected }
              })
            ],
            1
          )
        : _vm._e()
    ]
  )
}
var staticRenderFns = []
render._withStripped = true

          return {
            render: render,
            staticRenderFns: staticRenderFns,
            _compiled: true,
            _scopeId: "data-v-3830c1",
            functional: undefined
          };
        })());
      
    /* hot reload */
    (function () {
      if (module.hot) {
        var api = require('vue-hot-reload-api');
        api.install(require('vue'));
        if (api.compatible) {
          module.hot.accept();
          if (!module.hot.data) {
            api.createRecord('$3830c1', $3830c1);
          } else {
            api.reload('$3830c1', $3830c1);
          }
        }

        
        var reloadCSS = require('_css_loader');
        module.hot.dispose(reloadCSS);
        module.hot.accept(reloadCSS);
      
      }
    })();
},{"./g-icon.vue":"src/g-icon.vue","_css_loader":"C:/Users/38092/AppData/Roaming/npm/node_modules/parcel-bundler/src/builtins/css-loader.js","vue-hot-reload-api":"node_modules/vue-hot-reload-api/dist/index.js","vue":"node_modules/vue/dist/vue.common.js"}],"src/click-outside.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.removeListener = exports.default = void 0;

var onClickDocument = function onClickDocument(e) {
  var target = e.target;
  callbacks.forEach(function (item) {
    if (target == item.el || item.el.contains(target)) {
      console.log('inside');
      return;
    } else {
      item.callback();
    }
  });
};

document.addEventListener('click', onClickDocument);
var callbacks = [];
var _default = {
  bind: function bind(el, binding, vnode) {
    callbacks.push({
      el: el,
      callback: binding.value
    });
  }
};
exports.default = _default;

var removeListener = function removeListener() {
  document.removeEventListener('click', onClickDocument);
};

exports.removeListener = removeListener;
},{}],"src/g-cascader.vue":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _gCascaderItem = _interopRequireDefault(require("./g-cascader-item.vue"));

var _clickOutside = _interopRequireDefault(require("./click-outside"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
var _default = {
  name: 'GuluCascader',
  component: {
    CascaderItem: _gCascaderItem.default
  },
  directives: {
    ClickOutside: _clickOutside.default
  },
  props: {
    source: {
      type: Array
    },
    wrapHeight: {
      type: String
    },
    selected: {
      type: Array,
      default: function _default() {
        return [];
      }
    },
    loadData: {
      type: Function
    }
  },
  data: function data() {
    return {
      popoverVisible: false,
      loadingItem: {}
    };
  },
  methods: {
    //            onClickDocument(e){
    //                console.log('123')
    //                let {cascader} = this.$refs
    //                let {target} = e
    //                if(cascader == target || cascader.contains(target)){return}
    //                this.close()
    //            },
    open: function open() {
      this.popoverVisible = true; //                this.$nextTick(()=>{
      //                    document.addEventListener('click',this.onClickDocument)
      //                })
    },
    close: function close() {
      this.popoverVisible = false; //                document.removeEventListener('click',this.onClickDocument)
    },
    toggle: function toggle() {
      if (this.popoverVisible == true) {
        this.close();
      } else {
        this.open();
      } //                this.popoverVisible = !this.popoverVisible

    },
    onUpdateSelected: function onUpdateSelected(newSelected) {
      var _this = this;

      this.$emit('update:selected', newSelected); //                debugger

      var lastItem = newSelected[newSelected.length - 1];

      var simplest = function simplest(children, id) {
        return children.filter(function (item) {
          return item.id == id;
        })[0];
      };

      var complex = function complex(children, id) {
        var noChildren = [];
        var hasChildren = [];
        children.forEach(function (item) {
          if (item.children) {
            hasChildren.push(item); //console.log(hasChildren)
          } else {
            noChildren.push(item); //console.log(noChildren)
          }
        });
        var found = simplest(noChildren, id);

        if (found) {
          return found;
        } else {
          found = simplest(hasChildren, id);

          if (found) {
            return found;
          } else {
            for (var i = 0; i < hasChildren.length; i++) {
              found = complex(hasChildren[i].children, id);

              if (found) {
                return found;
              }
            }

            return undefined;
          }
        }
      };

      var updateSource = function updateSource(result) {
        _this.loadingItem = {}; //单向数据流禁止这样书写
        //this.$set(lastItem,'children',result)
        //console.log(result)
        //console.log(this.source)
        //let toUpdate = this.source.filter(item => item.id === lastItem.id)[0]

        var copy = JSON.parse(JSON.stringify(_this.source));
        var toUpdate = complex(copy, lastItem.id);

        _this.$set(toUpdate, 'children', result);

        _this.$emit('update:source', copy);
      }; //                console.log(lastItem)


      if (!lastItem.isLeaf && this.loadData) {
        this.loadData(lastItem, updateSource);
        this.loadingItem = lastItem;
      }
    }
  },
  computed: {
    result: function result() {
      return this.selected.map(function (item) {
        return item.name;
      }).join(" / ");
    }
  }
};
exports.default = _default;
        var $ff5cac = exports.default || module.exports;
      
      if (typeof $ff5cac === 'function') {
        $ff5cac = $ff5cac.options;
      }
    
        /* template */
        Object.assign($ff5cac, (function () {
          var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "div",
    {
      directives: [
        {
          name: "click-outside",
          rawName: "v-click-outside",
          value: _vm.close,
          expression: "close"
        }
      ],
      ref: "cascader",
      staticClass: "cascader"
    },
    [
      _c("div", { staticClass: "trigger", on: { click: _vm.toggle } }, [
        _vm._v("\n        " + _vm._s(_vm.result) + "\n    ")
      ]),
      _vm._v(" "),
      _vm.popoverVisible
        ? _c(
            "div",
            { staticClass: "popover-wrapper" },
            [
              _c("g-cascader-item", {
                attrs: {
                  items: _vm.source,
                  height: _vm.wrapHeight,
                  selected: _vm.selected,
                  "load-data": _vm.loadData,
                  "loading-item": _vm.loadingItem
                },
                on: { "update:selected": _vm.onUpdateSelected }
              })
            ],
            1
          )
        : _vm._e()
    ]
  )
}
var staticRenderFns = []
render._withStripped = true

          return {
            render: render,
            staticRenderFns: staticRenderFns,
            _compiled: true,
            _scopeId: "data-v-ff5cac",
            functional: undefined
          };
        })());
      
    /* hot reload */
    (function () {
      if (module.hot) {
        var api = require('vue-hot-reload-api');
        api.install(require('vue'));
        if (api.compatible) {
          module.hot.accept();
          if (!module.hot.data) {
            api.createRecord('$ff5cac', $ff5cac);
          } else {
            api.reload('$ff5cac', $ff5cac);
          }
        }

        
        var reloadCSS = require('_css_loader');
        module.hot.dispose(reloadCSS);
        module.hot.accept(reloadCSS);
      
      }
    })();
},{"./g-cascader-item.vue":"src/g-cascader-item.vue","./click-outside":"src/click-outside.js","_css_loader":"C:/Users/38092/AppData/Roaming/npm/node_modules/parcel-bundler/src/builtins/css-loader.js","vue-hot-reload-api":"node_modules/vue-hot-reload-api/dist/index.js","vue":"node_modules/vue/dist/vue.common.js"}],"src/db.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _default = [{
  "id": 1,
  "name": "北京",
  "parent_id": 0,
  "k1": "b",
  "k2": "bj",
  "k3": "beijing",
  "k4": "",
  "k5": "市",
  "k6": 110000,
  "k7": "010"
}, {
  "id": 2,
  "name": "天津",
  "parent_id": 0,
  "k1": "t",
  "k2": "tj",
  "k3": "tianjin",
  "k4": "",
  "k5": "市",
  "k6": 120000,
  "k7": "022"
}, {
  "id": 3,
  "name": "上海",
  "parent_id": 0,
  "k1": "s",
  "k2": "sh",
  "k3": "shanghai",
  "k4": "",
  "k5": "市",
  "k6": 310000,
  "k7": "021"
}, {
  "id": 4,
  "name": "重庆",
  "parent_id": 0,
  "k1": "c",
  "k2": "cq",
  "k3": "chongqing",
  "k4": "",
  "k5": "市",
  "k6": 500000,
  "k7": "023"
}, {
  "id": 5,
  "name": "河北",
  "parent_id": 0,
  "k1": "h",
  "k2": "hb",
  "k3": "hebei",
  "k4": "",
  "k5": "省",
  "k6": 130000,
  "k7": ""
}, {
  "id": 6,
  "name": "山西",
  "parent_id": 0,
  "k1": "s",
  "k2": "sx",
  "k3": "shanxi",
  "k4": "",
  "k5": "省",
  "k6": 140000,
  "k7": ""
}, {
  "id": 7,
  "name": "内蒙古",
  "parent_id": 0,
  "k1": "n",
  "k2": "nmg",
  "k3": "neimenggu",
  "k4": "",
  "k5": "自治区",
  "k6": 150000,
  "k7": ""
}, {
  "id": 8,
  "name": "辽宁",
  "parent_id": 0,
  "k1": "l",
  "k2": "ln",
  "k3": "liaoning",
  "k4": "",
  "k5": "省",
  "k6": 210000,
  "k7": ""
}, {
  "id": 9,
  "name": "吉林",
  "parent_id": 0,
  "k1": "j",
  "k2": "jl",
  "k3": "jilin",
  "k4": "",
  "k5": "省",
  "k6": 220000,
  "k7": ""
}, {
  "id": 10,
  "name": "黑龙江",
  "parent_id": 0,
  "k1": "h",
  "k2": "hlj",
  "k3": "heilongjiang",
  "k4": "",
  "k5": "省",
  "k6": 230000,
  "k7": ""
}, {
  "id": 11,
  "name": "江苏",
  "parent_id": 0,
  "k1": "j",
  "k2": "js",
  "k3": "jiangsu",
  "k4": "",
  "k5": "省",
  "k6": 320000,
  "k7": ""
}, {
  "id": 12,
  "name": "浙江",
  "parent_id": 0,
  "k1": "z",
  "k2": "zj",
  "k3": "zhejiang",
  "k4": "",
  "k5": "省",
  "k6": 330000,
  "k7": ""
}, {
  "id": 13,
  "name": "安徽",
  "parent_id": 0,
  "k1": "a",
  "k2": "ah",
  "k3": "anhui",
  "k4": "",
  "k5": "省",
  "k6": 340000,
  "k7": ""
}, {
  "id": 14,
  "name": "福建",
  "parent_id": 0,
  "k1": "f",
  "k2": "fj",
  "k3": "fujian",
  "k4": "",
  "k5": "省",
  "k6": 350000,
  "k7": ""
}, {
  "id": 15,
  "name": "江西",
  "parent_id": 0,
  "k1": "j",
  "k2": "jx",
  "k3": "jiangxi",
  "k4": "",
  "k5": "省",
  "k6": 360000,
  "k7": ""
}, {
  "id": 16,
  "name": "山东",
  "parent_id": 0,
  "k1": "s",
  "k2": "sd",
  "k3": "shandong",
  "k4": "",
  "k5": "省",
  "k6": 370000,
  "k7": ""
}, {
  "id": 17,
  "name": "河南",
  "parent_id": 0,
  "k1": "h",
  "k2": "hn",
  "k3": "henan",
  "k4": "",
  "k5": "省",
  "k6": 410000,
  "k7": ""
}, {
  "id": 18,
  "name": "湖北",
  "parent_id": 0,
  "k1": "h",
  "k2": "hb",
  "k3": "hubei",
  "k4": "",
  "k5": "省",
  "k6": 420000,
  "k7": ""
}, {
  "id": 19,
  "name": "湖南",
  "parent_id": 0,
  "k1": "h",
  "k2": "hn",
  "k3": "hunan",
  "k4": "",
  "k5": "省",
  "k6": 430000,
  "k7": ""
}, {
  "id": 20,
  "name": "广东",
  "parent_id": 0,
  "k1": "g",
  "k2": "gd",
  "k3": "guangdong",
  "k4": "",
  "k5": "省",
  "k6": 440000,
  "k7": ""
}, {
  "id": 21,
  "name": "广西",
  "parent_id": 0,
  "k1": "g",
  "k2": "gx",
  "k3": "guangxi",
  "k4": "壮族",
  "k5": "自治区",
  "k6": 450000,
  "k7": ""
}, {
  "id": 22,
  "name": "海南",
  "parent_id": 0,
  "k1": "h",
  "k2": "hn",
  "k3": "hainan",
  "k4": "",
  "k5": "省",
  "k6": 460000,
  "k7": ""
}, {
  "id": 23,
  "name": "四川",
  "parent_id": 0,
  "k1": "s",
  "k2": "sc",
  "k3": "sichuan",
  "k4": "",
  "k5": "省",
  "k6": 510000,
  "k7": ""
}, {
  "id": 24,
  "name": "贵州",
  "parent_id": 0,
  "k1": "g",
  "k2": "gz",
  "k3": "guizhou",
  "k4": "",
  "k5": "省",
  "k6": 520000,
  "k7": ""
}, {
  "id": 25,
  "name": "云南",
  "parent_id": 0,
  "k1": "y",
  "k2": "yn",
  "k3": "yunnan",
  "k4": "",
  "k5": "省",
  "k6": 530000,
  "k7": ""
}, {
  "id": 26,
  "name": "西藏",
  "parent_id": 0,
  "k1": "x",
  "k2": "xz",
  "k3": "xizang",
  "k4": "",
  "k5": "自治区",
  "k6": 540000,
  "k7": ""
}, {
  "id": 27,
  "name": "陕西",
  "parent_id": 0,
  "k1": "s",
  "k2": "sx",
  "k3": "shanxi",
  "k4": "",
  "k5": "省",
  "k6": 610000,
  "k7": ""
}, {
  "id": 28,
  "name": "甘肃",
  "parent_id": 0,
  "k1": "g",
  "k2": "gs",
  "k3": "gansu",
  "k4": "",
  "k5": "省",
  "k6": 620000,
  "k7": ""
}, {
  "id": 29,
  "name": "青海",
  "parent_id": 0,
  "k1": "q",
  "k2": "qh",
  "k3": "qinghai",
  "k4": "",
  "k5": "省",
  "k6": 630000,
  "k7": ""
}, {
  "id": 30,
  "name": "宁夏",
  "parent_id": 0,
  "k1": "n",
  "k2": "nx",
  "k3": "ningxia",
  "k4": "回族",
  "k5": "自治区",
  "k6": 640000,
  "k7": ""
}, {
  "id": 31,
  "name": "新疆",
  "parent_id": 0,
  "k1": "x",
  "k2": "xj",
  "k3": "xinjiang",
  "k4": "维吾尔",
  "k5": "自治区",
  "k6": 650000,
  "k7": ""
}, {
  "id": 32,
  "name": "台湾",
  "parent_id": 0,
  "k1": "t",
  "k2": "tw",
  "k3": "taiwan",
  "k4": "",
  "k5": "省",
  "k6": 710000,
  "k7": ""
}, {
  "id": 33,
  "name": "香港",
  "parent_id": 0,
  "k1": "x",
  "k2": "xg",
  "k3": "xianggang",
  "k4": "",
  "k5": "特别行政区",
  "k6": 810000,
  "k7": 852
}, {
  "id": 34,
  "name": "澳门",
  "parent_id": 0,
  "k1": "a",
  "k2": "am",
  "k3": "aomen",
  "k4": "",
  "k5": "特别行政区",
  "k6": 820000,
  "k7": 853
}, {
  "id": 35,
  "name": "海外",
  "parent_id": 0,
  "k1": "h",
  "k2": "hw",
  "k3": "haiwai",
  "k4": "",
  "k5": "",
  "k6": "",
  "k7": ""
}, {
  "id": 36,
  "name": "东城",
  "parent_id": 1,
  "k1": "d",
  "k2": "dc",
  "k3": "dongcheng",
  "k4": "",
  "k5": "区",
  "k6": 110101,
  "k7": "010"
}, {
  "id": 37,
  "name": "西城",
  "parent_id": 1,
  "k1": "x",
  "k2": "xc",
  "k3": "xicheng",
  "k4": "",
  "k5": "区",
  "k6": 110102,
  "k7": "010"
}, {
  "id": 40,
  "name": "朝阳",
  "parent_id": 1,
  "k1": "c",
  "k2": "cy",
  "k3": "chaoyang",
  "k4": "",
  "k5": "区",
  "k6": 110105,
  "k7": "010"
}, {
  "id": 41,
  "name": "丰台",
  "parent_id": 1,
  "k1": "f",
  "k2": "ft",
  "k3": "fengtai",
  "k4": "",
  "k5": "区",
  "k6": 110106,
  "k7": "010"
}, {
  "id": 42,
  "name": "石景山",
  "parent_id": 1,
  "k1": "s",
  "k2": "sjs",
  "k3": "shijingshan",
  "k4": "",
  "k5": "区",
  "k6": 110107,
  "k7": "010"
}, {
  "id": 43,
  "name": "海淀",
  "parent_id": 1,
  "k1": "h",
  "k2": "hd",
  "k3": "haidian",
  "k4": "",
  "k5": "区",
  "k6": 110108,
  "k7": "010"
}, {
  "id": 44,
  "name": "门头沟",
  "parent_id": 1,
  "k1": "m",
  "k2": "mtg",
  "k3": "mentougou",
  "k4": "",
  "k5": "区",
  "k6": 110109,
  "k7": "010"
}, {
  "id": 45,
  "name": "房山",
  "parent_id": 1,
  "k1": "f",
  "k2": "fs",
  "k3": "fangshan",
  "k4": "",
  "k5": "区",
  "k6": 110111,
  "k7": "010"
}, {
  "id": 46,
  "name": "通州",
  "parent_id": 1,
  "k1": "t",
  "k2": "tz",
  "k3": "tongzhou",
  "k4": "",
  "k5": "区",
  "k6": 110112,
  "k7": "010"
}, {
  "id": 47,
  "name": "顺义",
  "parent_id": 1,
  "k1": "s",
  "k2": "sy",
  "k3": "shunyi",
  "k4": "",
  "k5": "区",
  "k6": 110113,
  "k7": "010"
}, {
  "id": 48,
  "name": "昌平",
  "parent_id": 1,
  "k1": "c",
  "k2": "cp",
  "k3": "changping",
  "k4": "",
  "k5": "区",
  "k6": 110114,
  "k7": "010"
}, {
  "id": 49,
  "name": "大兴",
  "parent_id": 1,
  "k1": "d",
  "k2": "dx",
  "k3": "daxing",
  "k4": "",
  "k5": "区",
  "k6": 110115,
  "k7": "010"
}, {
  "id": 50,
  "name": "怀柔",
  "parent_id": 1,
  "k1": "h",
  "k2": "hr",
  "k3": "huairou",
  "k4": "",
  "k5": "区",
  "k6": 110116,
  "k7": "010"
}, {
  "id": 51,
  "name": "平谷",
  "parent_id": 1,
  "k1": "p",
  "k2": "pg",
  "k3": "pinggu",
  "k4": "",
  "k5": "区",
  "k6": 110117,
  "k7": "010"
}, {
  "id": 52,
  "name": "密云",
  "parent_id": 1,
  "k1": "m",
  "k2": "my",
  "k3": "miyun",
  "k4": "",
  "k5": "区",
  "k6": 110228,
  "k7": "010"
}, {
  "id": 53,
  "name": "延庆",
  "parent_id": 1,
  "k1": "y",
  "k2": "yq",
  "k3": "yanqing",
  "k4": "",
  "k5": "区",
  "k6": 110229,
  "k7": "010"
}, {
  "id": 54,
  "name": "和平",
  "parent_id": 2,
  "k1": "h",
  "k2": "hp",
  "k3": "heping",
  "k4": "",
  "k5": "区",
  "k6": 120101,
  "k7": "022"
}, {
  "id": 55,
  "name": "河东",
  "parent_id": 2,
  "k1": "h",
  "k2": "hd",
  "k3": "hedong",
  "k4": "",
  "k5": "区",
  "k6": 120102,
  "k7": "022"
}, {
  "id": 56,
  "name": "河西",
  "parent_id": 2,
  "k1": "h",
  "k2": "hx",
  "k3": "hexi",
  "k4": "",
  "k5": "区",
  "k6": 120103,
  "k7": "022"
}, {
  "id": 57,
  "name": "南开",
  "parent_id": 2,
  "k1": "n",
  "k2": "nk",
  "k3": "nankai",
  "k4": "",
  "k5": "区",
  "k6": 120104,
  "k7": "022"
}, {
  "id": 58,
  "name": "河北",
  "parent_id": 2,
  "k1": "h",
  "k2": "hb",
  "k3": "hebei",
  "k4": "",
  "k5": "区",
  "k6": 120105,
  "k7": "022"
}, {
  "id": 59,
  "name": "红桥",
  "parent_id": 2,
  "k1": "h",
  "k2": "hq",
  "k3": "hongqiao",
  "k4": "",
  "k5": "区",
  "k6": 120106,
  "k7": "022"
}, {
  "id": 60,
  "name": "东丽",
  "parent_id": 2,
  "k1": "d",
  "k2": "dl",
  "k3": "dongli",
  "k4": "",
  "k5": "区",
  "k6": 120110,
  "k7": "022"
}, {
  "id": 61,
  "name": "西青",
  "parent_id": 2,
  "k1": "x",
  "k2": "xq",
  "k3": "xiqing",
  "k4": "",
  "k5": "区",
  "k6": 120111,
  "k7": "022"
}, {
  "id": 62,
  "name": "津南",
  "parent_id": 2,
  "k1": "j",
  "k2": "jn",
  "k3": "jinnan",
  "k4": "",
  "k5": "区",
  "k6": 120112,
  "k7": "022"
}, {
  "id": 63,
  "name": "北辰",
  "parent_id": 2,
  "k1": "b",
  "k2": "bc",
  "k3": "beichen",
  "k4": "",
  "k5": "区",
  "k6": 120113,
  "k7": "022"
}, {
  "id": 64,
  "name": "武清",
  "parent_id": 2,
  "k1": "w",
  "k2": "wq",
  "k3": "wuqing",
  "k4": "",
  "k5": "区",
  "k6": 120114,
  "k7": "022"
}, {
  "id": 65,
  "name": "宝坻",
  "parent_id": 2,
  "k1": "b",
  "k2": "bc",
  "k3": "baochi",
  "k4": "",
  "k5": "区",
  "k6": 120115,
  "k7": "022"
}, {
  "id": 66,
  "name": "滨海新区",
  "parent_id": 2,
  "k1": "b",
  "k2": "bhxq",
  "k3": "binhaixinqu",
  "k4": "",
  "k5": "",
  "k6": 120116,
  "k7": "022"
}, {
  "id": 67,
  "name": "宁河",
  "parent_id": 2,
  "k1": "n",
  "k2": "nh",
  "k3": "ninghe",
  "k4": "",
  "k5": "区",
  "k6": 120117,
  "k7": "022"
}, {
  "id": 68,
  "name": "蓟州",
  "parent_id": 2,
  "k1": "j",
  "k2": "jz",
  "k3": "jizhou",
  "k4": "",
  "k5": "区",
  "k6": 120119,
  "k7": "022"
}, {
  "id": 69,
  "name": "静海",
  "parent_id": 2,
  "k1": "j",
  "k2": "jh",
  "k3": "jinghai",
  "k4": "",
  "k5": "区",
  "k6": 120118,
  "k7": "022"
}, {
  "id": 70,
  "name": "黄浦",
  "parent_id": 3,
  "k1": "h",
  "k2": "hp",
  "k3": "huangpu",
  "k4": "",
  "k5": "区",
  "k6": 310101,
  "k7": "021"
}, {
  "id": 71,
  "name": "徐汇",
  "parent_id": 3,
  "k1": "x",
  "k2": "xh",
  "k3": "xuhui",
  "k4": "",
  "k5": "区",
  "k6": 310104,
  "k7": "021"
}, {
  "id": 72,
  "name": "长宁",
  "parent_id": 3,
  "k1": "c",
  "k2": "cn",
  "k3": "changning",
  "k4": "",
  "k5": "区",
  "k6": 310105,
  "k7": "021"
}, {
  "id": 73,
  "name": "静安",
  "parent_id": 3,
  "k1": "j",
  "k2": "ja",
  "k3": "jingan",
  "k4": "",
  "k5": "区",
  "k6": 310106,
  "k7": "021"
}, {
  "id": 74,
  "name": "普陀",
  "parent_id": 3,
  "k1": "p",
  "k2": "pt",
  "k3": "putuo",
  "k4": "",
  "k5": "区",
  "k6": 310107,
  "k7": "021"
}, {
  "id": 76,
  "name": "虹口",
  "parent_id": 3,
  "k1": "h",
  "k2": "hk",
  "k3": "hongkou",
  "k4": "",
  "k5": "区",
  "k6": 310109,
  "k7": "021"
}, {
  "id": 77,
  "name": "杨浦",
  "parent_id": 3,
  "k1": "y",
  "k2": "yp",
  "k3": "yangpu",
  "k4": "",
  "k5": "区",
  "k6": 310110,
  "k7": "021"
}, {
  "id": 78,
  "name": "闵行",
  "parent_id": 3,
  "k1": "m",
  "k2": "mx",
  "k3": "minxing",
  "k4": "",
  "k5": "区",
  "k6": 310112,
  "k7": "021"
}, {
  "id": 79,
  "name": "宝山",
  "parent_id": 3,
  "k1": "b",
  "k2": "bs",
  "k3": "baoshan",
  "k4": "",
  "k5": "区",
  "k6": 310113,
  "k7": "021"
}, {
  "id": 80,
  "name": "嘉定",
  "parent_id": 3,
  "k1": "j",
  "k2": "jd",
  "k3": "jiading",
  "k4": "",
  "k5": "区",
  "k6": 310114,
  "k7": "021"
}, {
  "id": 81,
  "name": "浦东新区",
  "parent_id": 3,
  "k1": "p",
  "k2": "pdxq",
  "k3": "pudongxinqu",
  "k4": "",
  "k5": "",
  "k6": 310115,
  "k7": "021"
}, {
  "id": 82,
  "name": "金山",
  "parent_id": 3,
  "k1": "j",
  "k2": "js",
  "k3": "jinshan",
  "k4": "",
  "k5": "区",
  "k6": 310116,
  "k7": "021"
}, {
  "id": 83,
  "name": "松江",
  "parent_id": 3,
  "k1": "s",
  "k2": "sj",
  "k3": "songjiang",
  "k4": "",
  "k5": "区",
  "k6": 310117,
  "k7": "021"
}, {
  "id": 84,
  "name": "青浦",
  "parent_id": 3,
  "k1": "q",
  "k2": "qp",
  "k3": "qingpu",
  "k4": "",
  "k5": "区",
  "k6": 310118,
  "k7": "021"
}, {
  "id": 85,
  "name": "奉贤",
  "parent_id": 3,
  "k1": "f",
  "k2": "fx",
  "k3": "fengxian",
  "k4": "",
  "k5": "区",
  "k6": 310120,
  "k7": "021"
}, {
  "id": 86,
  "name": "崇明",
  "parent_id": 3,
  "k1": "c",
  "k2": "cm",
  "k3": "chongming",
  "k4": "",
  "k5": "区",
  "k6": 310151,
  "k7": "021"
}, {
  "id": 87,
  "name": "万州",
  "parent_id": 4,
  "k1": "w",
  "k2": "wz",
  "k3": "wanzhou",
  "k4": "",
  "k5": "区",
  "k6": 500101,
  "k7": "023"
}, {
  "id": 88,
  "name": "涪陵",
  "parent_id": 4,
  "k1": "f",
  "k2": "fl",
  "k3": "fuling",
  "k4": "",
  "k5": "区",
  "k6": 500102,
  "k7": "023"
}, {
  "id": 89,
  "name": "渝中",
  "parent_id": 4,
  "k1": "y",
  "k2": "yz",
  "k3": "yuzhong",
  "k4": "",
  "k5": "区",
  "k6": 500103,
  "k7": "023"
}, {
  "id": 90,
  "name": "大渡口",
  "parent_id": 4,
  "k1": "d",
  "k2": "ddk",
  "k3": "dadukou",
  "k4": "",
  "k5": "区",
  "k6": 500104,
  "k7": "023"
}, {
  "id": 91,
  "name": "江北",
  "parent_id": 4,
  "k1": "j",
  "k2": "jb",
  "k3": "jiangbei",
  "k4": "",
  "k5": "区",
  "k6": 500105,
  "k7": "023"
}, {
  "id": 92,
  "name": "沙坪坝",
  "parent_id": 4,
  "k1": "s",
  "k2": "spb",
  "k3": "shapingba",
  "k4": "",
  "k5": "区",
  "k6": 500106,
  "k7": "023"
}, {
  "id": 93,
  "name": "九龙坡",
  "parent_id": 4,
  "k1": "j",
  "k2": "jlp",
  "k3": "jiulongpo",
  "k4": "",
  "k5": "区",
  "k6": 500107,
  "k7": "023"
}, {
  "id": 94,
  "name": "南岸",
  "parent_id": 4,
  "k1": "n",
  "k2": "na",
  "k3": "nanan",
  "k4": "",
  "k5": "区",
  "k6": 500108,
  "k7": "023"
}, {
  "id": 95,
  "name": "北碚",
  "parent_id": 4,
  "k1": "b",
  "k2": "bb",
  "k3": "beibei",
  "k4": "",
  "k5": "区",
  "k6": 500109,
  "k7": "023"
}, {
  "id": 96,
  "name": "綦江",
  "parent_id": 4,
  "k1": "q",
  "k2": "qj",
  "k3": "qijiang",
  "k4": "",
  "k5": "区",
  "k6": 500110,
  "k7": "023"
}, {
  "id": 97,
  "name": "大足",
  "parent_id": 4,
  "k1": "d",
  "k2": "dz",
  "k3": "dazu",
  "k4": "",
  "k5": "区",
  "k6": 500111,
  "k7": "023"
}, {
  "id": 98,
  "name": "渝北",
  "parent_id": 4,
  "k1": "y",
  "k2": "yb",
  "k3": "yubei",
  "k4": "",
  "k5": "区",
  "k6": 500112,
  "k7": "023"
}, {
  "id": 99,
  "name": "巴南",
  "parent_id": 4,
  "k1": "b",
  "k2": "bn",
  "k3": "banan",
  "k4": "",
  "k5": "区",
  "k6": 500113,
  "k7": "023"
}, {
  "id": 100,
  "name": "黔江",
  "parent_id": 4,
  "k1": "q",
  "k2": "qj",
  "k3": "qianjiang",
  "k4": "",
  "k5": "区",
  "k6": 500114,
  "k7": "023"
}, {
  "id": 101,
  "name": "长寿",
  "parent_id": 4,
  "k1": "c",
  "k2": "cs",
  "k3": "changshou",
  "k4": "",
  "k5": "区",
  "k6": 500115,
  "k7": "023"
}, {
  "id": 102,
  "name": "江津",
  "parent_id": 4,
  "k1": "j",
  "k2": "jj",
  "k3": "jiangjin",
  "k4": "",
  "k5": "区",
  "k6": 500116,
  "k7": "023"
}, {
  "id": 103,
  "name": "合川",
  "parent_id": 4,
  "k1": "h",
  "k2": "hc",
  "k3": "hechuan",
  "k4": "",
  "k5": "区",
  "k6": 500117,
  "k7": "023"
}, {
  "id": 104,
  "name": "永川",
  "parent_id": 4,
  "k1": "y",
  "k2": "yc",
  "k3": "yongchuan",
  "k4": "",
  "k5": "区",
  "k6": 500118,
  "k7": "023"
}, {
  "id": 105,
  "name": "南川",
  "parent_id": 4,
  "k1": "n",
  "k2": "nc",
  "k3": "nanchuan",
  "k4": "",
  "k5": "区",
  "k6": 500119,
  "k7": "023"
}, {
  "id": 106,
  "name": "潼南",
  "parent_id": 4,
  "k1": "t",
  "k2": "tn",
  "k3": "tongnan",
  "k4": "",
  "k5": "区",
  "k6": 500223,
  "k7": "023"
}, {
  "id": 107,
  "name": "铜梁",
  "parent_id": 4,
  "k1": "t",
  "k2": "tl",
  "k3": "tongliang",
  "k4": "",
  "k5": "区",
  "k6": 500151,
  "k7": "023"
}, {
  "id": 108,
  "name": "荣昌",
  "parent_id": 4,
  "k1": "r",
  "k2": "rc",
  "k3": "rongchang",
  "k4": "",
  "k5": "区",
  "k6": 500226,
  "k7": "023"
}, {
  "id": 109,
  "name": "璧山",
  "parent_id": 4,
  "k1": "b",
  "k2": "bs",
  "k3": "bishan",
  "k4": "",
  "k5": "区",
  "k6": 500120,
  "k7": "023"
}, {
  "id": 110,
  "name": "梁平",
  "parent_id": 4,
  "k1": "l",
  "k2": "lp",
  "k3": "liangping",
  "k4": "",
  "k5": "区",
  "k6": 500155,
  "k7": "023"
}, {
  "id": 111,
  "name": "城口",
  "parent_id": 4,
  "k1": "c",
  "k2": "ck",
  "k3": "chengkou",
  "k4": "",
  "k5": "县",
  "k6": 500229,
  "k7": "023"
}, {
  "id": 112,
  "name": "丰都",
  "parent_id": 4,
  "k1": "f",
  "k2": "fd",
  "k3": "fengdu",
  "k4": "",
  "k5": "县",
  "k6": 500230,
  "k7": "023"
}, {
  "id": 113,
  "name": "垫江",
  "parent_id": 4,
  "k1": "d",
  "k2": "dj",
  "k3": "dianjiang",
  "k4": "",
  "k5": "县",
  "k6": 500231,
  "k7": "023"
}, {
  "id": 114,
  "name": "武隆",
  "parent_id": 4,
  "k1": "w",
  "k2": "wl",
  "k3": "wulong",
  "k4": "",
  "k5": "区",
  "k6": 500156,
  "k7": "023"
}, {
  "id": 115,
  "name": "忠县",
  "parent_id": 4,
  "k1": "z",
  "k2": "zx",
  "k3": "zhongxian",
  "k4": "",
  "k5": "",
  "k6": 500233,
  "k7": "023"
}, {
  "id": 116,
  "name": "开州",
  "parent_id": 4,
  "k1": "k",
  "k2": "kz",
  "k3": "kaizhou",
  "k4": "",
  "k5": "区",
  "k6": 500154,
  "k7": "023"
}, {
  "id": 117,
  "name": "云阳",
  "parent_id": 4,
  "k1": "y",
  "k2": "yy",
  "k3": "yunyang",
  "k4": "",
  "k5": "县",
  "k6": 500235,
  "k7": "023"
}, {
  "id": 118,
  "name": "奉节",
  "parent_id": 4,
  "k1": "f",
  "k2": "fj",
  "k3": "fengjie",
  "k4": "",
  "k5": "县",
  "k6": 500236,
  "k7": "023"
}, {
  "id": 119,
  "name": "巫山",
  "parent_id": 4,
  "k1": "w",
  "k2": "ws",
  "k3": "wushan",
  "k4": "",
  "k5": "县",
  "k6": 500237,
  "k7": "023"
}, {
  "id": 120,
  "name": "巫溪",
  "parent_id": 4,
  "k1": "w",
  "k2": "wx",
  "k3": "wuxi",
  "k4": "",
  "k5": "县",
  "k6": 500238,
  "k7": "023"
}, {
  "id": 121,
  "name": "石柱",
  "parent_id": 4,
  "k1": "s",
  "k2": "sz",
  "k3": "shizhu",
  "k4": "土家族",
  "k5": "自治县",
  "k6": 500240,
  "k7": "023"
}, {
  "id": 122,
  "name": "秀山",
  "parent_id": 4,
  "k1": "x",
  "k2": "xs",
  "k3": "xiushan",
  "k4": "土家族苗族",
  "k5": "自治县",
  "k6": 500241,
  "k7": "023"
}, {
  "id": 123,
  "name": "酉阳",
  "parent_id": 4,
  "k1": "y",
  "k2": "yy",
  "k3": "youyang",
  "k4": "土家族苗族",
  "k5": "自治县",
  "k6": 500242,
  "k7": "023"
}, {
  "id": 124,
  "name": "彭水",
  "parent_id": 4,
  "k1": "p",
  "k2": "ps",
  "k3": "pengshui",
  "k4": "苗族土家族",
  "k5": "自治县",
  "k6": 500243,
  "k7": "023"
}, {
  "id": 125,
  "name": "石家庄",
  "parent_id": 5,
  "k1": "s",
  "k2": "sjz",
  "k3": "shijiazhuang",
  "k4": "",
  "k5": "市",
  "k6": 130100,
  "k7": "0311"
}, {
  "id": 126,
  "name": "唐山",
  "parent_id": 5,
  "k1": "t",
  "k2": "ts",
  "k3": "tangshan",
  "k4": "",
  "k5": "市",
  "k6": 130200,
  "k7": "0315"
}, {
  "id": 127,
  "name": "秦皇岛",
  "parent_id": 5,
  "k1": "q",
  "k2": "qhd",
  "k3": "qinhuangdao",
  "k4": "",
  "k5": "市",
  "k6": 130300,
  "k7": "0335"
}, {
  "id": 128,
  "name": "邯郸",
  "parent_id": 5,
  "k1": "h",
  "k2": "hd",
  "k3": "handan",
  "k4": "",
  "k5": "市",
  "k6": 130400,
  "k7": "0310"
}, {
  "id": 129,
  "name": "邢台",
  "parent_id": 5,
  "k1": "x",
  "k2": "xt",
  "k3": "xingtai",
  "k4": "",
  "k5": "市",
  "k6": 130500,
  "k7": "0319"
}, {
  "id": 130,
  "name": "保定",
  "parent_id": 5,
  "k1": "b",
  "k2": "bd",
  "k3": "baoding",
  "k4": "",
  "k5": "市",
  "k6": 130600,
  "k7": "0312"
}, {
  "id": 131,
  "name": "张家口",
  "parent_id": 5,
  "k1": "z",
  "k2": "zjk",
  "k3": "zhangjiakou",
  "k4": "",
  "k5": "市",
  "k6": 130700,
  "k7": "0313"
}, {
  "id": 132,
  "name": "承德",
  "parent_id": 5,
  "k1": "c",
  "k2": "cd",
  "k3": "chengde",
  "k4": "",
  "k5": "市",
  "k6": 130800,
  "k7": "0314"
}, {
  "id": 133,
  "name": "沧州",
  "parent_id": 5,
  "k1": "c",
  "k2": "cz",
  "k3": "cangzhou",
  "k4": "",
  "k5": "市",
  "k6": 130900,
  "k7": "0317"
}, {
  "id": 134,
  "name": "廊坊",
  "parent_id": 5,
  "k1": "l",
  "k2": "lf",
  "k3": "langfang",
  "k4": "",
  "k5": "市",
  "k6": 131000,
  "k7": "0316"
}, {
  "id": 135,
  "name": "衡水",
  "parent_id": 5,
  "k1": "h",
  "k2": "hs",
  "k3": "hengshui",
  "k4": "",
  "k5": "市",
  "k6": 131100,
  "k7": "0318"
}, {
  "id": 136,
  "name": "太原",
  "parent_id": 6,
  "k1": "t",
  "k2": "ty",
  "k3": "taiyuan",
  "k4": "",
  "k5": "市",
  "k6": 140100,
  "k7": "0351"
}, {
  "id": 137,
  "name": "大同",
  "parent_id": 6,
  "k1": "d",
  "k2": "dt",
  "k3": "datong",
  "k4": "",
  "k5": "市",
  "k6": 140200,
  "k7": "0352"
}, {
  "id": 138,
  "name": "阳泉",
  "parent_id": 6,
  "k1": "y",
  "k2": "yq",
  "k3": "yangquan",
  "k4": "",
  "k5": "市",
  "k6": 140300,
  "k7": "0353"
}, {
  "id": 139,
  "name": "长治",
  "parent_id": 6,
  "k1": "c",
  "k2": "cz",
  "k3": "changzhi",
  "k4": "",
  "k5": "市",
  "k6": 140400,
  "k7": "0355"
}, {
  "id": 140,
  "name": "晋城",
  "parent_id": 6,
  "k1": "j",
  "k2": "jc",
  "k3": "jincheng",
  "k4": "",
  "k5": "市",
  "k6": 140500,
  "k7": "0356"
}, {
  "id": 141,
  "name": "朔州",
  "parent_id": 6,
  "k1": "s",
  "k2": "sz",
  "k3": "shuozhou",
  "k4": "",
  "k5": "市",
  "k6": 140600,
  "k7": "0349"
}, {
  "id": 142,
  "name": "晋中",
  "parent_id": 6,
  "k1": "j",
  "k2": "jz",
  "k3": "jinzhong",
  "k4": "",
  "k5": "市",
  "k6": 140700,
  "k7": "0354"
}, {
  "id": 143,
  "name": "运城",
  "parent_id": 6,
  "k1": "y",
  "k2": "yc",
  "k3": "yuncheng",
  "k4": "",
  "k5": "市",
  "k6": 140800,
  "k7": "0359"
}, {
  "id": 144,
  "name": "忻州",
  "parent_id": 6,
  "k1": "x",
  "k2": "xz",
  "k3": "xinzhou",
  "k4": "",
  "k5": "市",
  "k6": 140900,
  "k7": "0350"
}, {
  "id": 145,
  "name": "临汾",
  "parent_id": 6,
  "k1": "l",
  "k2": "lf",
  "k3": "linfen",
  "k4": "",
  "k5": "市",
  "k6": 141000,
  "k7": "0357"
}, {
  "id": 146,
  "name": "吕梁",
  "parent_id": 6,
  "k1": "l",
  "k2": "ll",
  "k3": "lvliang",
  "k4": "",
  "k5": "市",
  "k6": 141100,
  "k7": "0358"
}, {
  "id": 147,
  "name": "呼和浩特",
  "parent_id": 7,
  "k1": "h",
  "k2": "hhht",
  "k3": "huhehaote",
  "k4": "",
  "k5": "市",
  "k6": 150100,
  "k7": "0471"
}, {
  "id": 148,
  "name": "包头",
  "parent_id": 7,
  "k1": "b",
  "k2": "bt",
  "k3": "baotou",
  "k4": "",
  "k5": "市",
  "k6": 150200,
  "k7": "0472"
}, {
  "id": 149,
  "name": "乌海",
  "parent_id": 7,
  "k1": "w",
  "k2": "wh",
  "k3": "wuhai",
  "k4": "",
  "k5": "市",
  "k6": 150300,
  "k7": "0473"
}, {
  "id": 150,
  "name": "赤峰",
  "parent_id": 7,
  "k1": "c",
  "k2": "cf",
  "k3": "chifeng",
  "k4": "",
  "k5": "市",
  "k6": 150400,
  "k7": "0476"
}, {
  "id": 151,
  "name": "通辽",
  "parent_id": 7,
  "k1": "t",
  "k2": "tl",
  "k3": "tongliao",
  "k4": "",
  "k5": "市",
  "k6": 150500,
  "k7": "0475"
}, {
  "id": 152,
  "name": "鄂尔多斯",
  "parent_id": 7,
  "k1": "e",
  "k2": "eeds",
  "k3": "eerduosi",
  "k4": "",
  "k5": "市",
  "k6": 150600,
  "k7": "0477"
}, {
  "id": 153,
  "name": "呼伦贝尔",
  "parent_id": 7,
  "k1": "h",
  "k2": "hlbe",
  "k3": "hulunbeier",
  "k4": "",
  "k5": "市",
  "k6": 150700,
  "k7": "0470"
}, {
  "id": 154,
  "name": "巴彦淖尔",
  "parent_id": 7,
  "k1": "b",
  "k2": "byne",
  "k3": "bayannaoer",
  "k4": "",
  "k5": "市",
  "k6": 150800,
  "k7": "0478"
}, {
  "id": 155,
  "name": "乌兰察布",
  "parent_id": 7,
  "k1": "w",
  "k2": "wlcb",
  "k3": "wulanchabu",
  "k4": "",
  "k5": "市",
  "k6": 150900,
  "k7": "0474"
}, {
  "id": 156,
  "name": "兴安",
  "parent_id": 7,
  "k1": "x",
  "k2": "xa",
  "k3": "xingan",
  "k4": "",
  "k5": "盟",
  "k6": 152200,
  "k7": "0482"
}, {
  "id": 157,
  "name": "锡林郭勒",
  "parent_id": 7,
  "k1": "x",
  "k2": "xlgl",
  "k3": "xilinguole",
  "k4": "",
  "k5": "盟",
  "k6": 152500,
  "k7": "0479"
}, {
  "id": 158,
  "name": "阿拉善",
  "parent_id": 7,
  "k1": "a",
  "k2": "als",
  "k3": "alashan",
  "k4": "",
  "k5": "盟",
  "k6": 152900,
  "k7": "0483"
}, {
  "id": 159,
  "name": "沈阳",
  "parent_id": 8,
  "k1": "s",
  "k2": "sy",
  "k3": "shenyang",
  "k4": "",
  "k5": "市",
  "k6": 210100,
  "k7": "024"
}, {
  "id": 160,
  "name": "大连",
  "parent_id": 8,
  "k1": "d",
  "k2": "dl",
  "k3": "dalian",
  "k4": "",
  "k5": "市",
  "k6": 210200,
  "k7": "0411"
}, {
  "id": 161,
  "name": "鞍山",
  "parent_id": 8,
  "k1": "a",
  "k2": "as",
  "k3": "anshan",
  "k4": "",
  "k5": "市",
  "k6": 210300,
  "k7": "0412"
}, {
  "id": 162,
  "name": "抚顺",
  "parent_id": 8,
  "k1": "f",
  "k2": "fs",
  "k3": "fushun",
  "k4": "",
  "k5": "市",
  "k6": 210400,
  "k7": "0413"
}, {
  "id": 163,
  "name": "本溪",
  "parent_id": 8,
  "k1": "b",
  "k2": "bx",
  "k3": "benxi",
  "k4": "",
  "k5": "市",
  "k6": 210500,
  "k7": "0414"
}, {
  "id": 164,
  "name": "丹东",
  "parent_id": 8,
  "k1": "d",
  "k2": "dd",
  "k3": "dandong",
  "k4": "",
  "k5": "市",
  "k6": 210600,
  "k7": "0415"
}, {
  "id": 165,
  "name": "锦州",
  "parent_id": 8,
  "k1": "j",
  "k2": "jz",
  "k3": "jinzhou",
  "k4": "",
  "k5": "市",
  "k6": 210700,
  "k7": "0416"
}, {
  "id": 166,
  "name": "营口",
  "parent_id": 8,
  "k1": "y",
  "k2": "yk",
  "k3": "yingkou",
  "k4": "",
  "k5": "市",
  "k6": 210800,
  "k7": "0417"
}, {
  "id": 167,
  "name": "阜新",
  "parent_id": 8,
  "k1": "f",
  "k2": "fx",
  "k3": "fuxin",
  "k4": "",
  "k5": "市",
  "k6": 210900,
  "k7": "0418"
}, {
  "id": 168,
  "name": "辽阳",
  "parent_id": 8,
  "k1": "l",
  "k2": "ly",
  "k3": "liaoyang",
  "k4": "",
  "k5": "市",
  "k6": 211000,
  "k7": "0419"
}, {
  "id": 169,
  "name": "盘锦",
  "parent_id": 8,
  "k1": "p",
  "k2": "pj",
  "k3": "panjin",
  "k4": "",
  "k5": "市",
  "k6": 211100,
  "k7": "0427"
}, {
  "id": 170,
  "name": "铁岭",
  "parent_id": 8,
  "k1": "t",
  "k2": "tl",
  "k3": "tieling",
  "k4": "",
  "k5": "市",
  "k6": 211200,
  "k7": "0410"
}, {
  "id": 171,
  "name": "朝阳",
  "parent_id": 8,
  "k1": "c",
  "k2": "cy",
  "k3": "chaoyang",
  "k4": "",
  "k5": "市",
  "k6": 211300,
  "k7": "0421"
}, {
  "id": 172,
  "name": "葫芦岛",
  "parent_id": 8,
  "k1": "h",
  "k2": "hld",
  "k3": "huludao",
  "k4": "",
  "k5": "市",
  "k6": 211400,
  "k7": "0429"
}, {
  "id": 173,
  "name": "长春",
  "parent_id": 9,
  "k1": "c",
  "k2": "cc",
  "k3": "changchun",
  "k4": "",
  "k5": "市",
  "k6": 220100,
  "k7": "0431"
}, {
  "id": 174,
  "name": "吉林",
  "parent_id": 9,
  "k1": "j",
  "k2": "jl",
  "k3": "jilin",
  "k4": "",
  "k5": "市",
  "k6": 220200,
  "k7": "0432"
}, {
  "id": 175,
  "name": "四平",
  "parent_id": 9,
  "k1": "s",
  "k2": "sp",
  "k3": "siping",
  "k4": "",
  "k5": "市",
  "k6": 220300,
  "k7": "0434"
}, {
  "id": 176,
  "name": "辽源",
  "parent_id": 9,
  "k1": "l",
  "k2": "ly",
  "k3": "liaoyuan",
  "k4": "",
  "k5": "市",
  "k6": 220400,
  "k7": "0437"
}, {
  "id": 177,
  "name": "通化",
  "parent_id": 9,
  "k1": "t",
  "k2": "th",
  "k3": "tonghua",
  "k4": "",
  "k5": "市",
  "k6": 220500,
  "k7": "0435"
}, {
  "id": 178,
  "name": "白山",
  "parent_id": 9,
  "k1": "b",
  "k2": "bs",
  "k3": "baishan",
  "k4": "",
  "k5": "市",
  "k6": 220600,
  "k7": "0439"
}, {
  "id": 179,
  "name": "松原",
  "parent_id": 9,
  "k1": "s",
  "k2": "sy",
  "k3": "songyuan",
  "k4": "",
  "k5": "市",
  "k6": 220700,
  "k7": "0438"
}, {
  "id": 180,
  "name": "白城",
  "parent_id": 9,
  "k1": "b",
  "k2": "bc",
  "k3": "baicheng",
  "k4": "",
  "k5": "市",
  "k6": 220800,
  "k7": "0436"
}, {
  "id": 181,
  "name": "延边",
  "parent_id": 9,
  "k1": "y",
  "k2": "yb",
  "k3": "yanbian",
  "k4": "朝鲜族",
  "k5": "自治州",
  "k6": 222400,
  "k7": "0433"
}, {
  "id": 182,
  "name": "哈尔滨",
  "parent_id": 10,
  "k1": "h",
  "k2": "heb",
  "k3": "haerbin",
  "k4": "",
  "k5": "市",
  "k6": 230100,
  "k7": "0451"
}, {
  "id": 183,
  "name": "齐齐哈尔",
  "parent_id": 10,
  "k1": "q",
  "k2": "qqhe",
  "k3": "qiqihaer",
  "k4": "",
  "k5": "市",
  "k6": 230200,
  "k7": "0452"
}, {
  "id": 184,
  "name": "鸡西",
  "parent_id": 10,
  "k1": "j",
  "k2": "jx",
  "k3": "jixi",
  "k4": "",
  "k5": "市",
  "k6": 230300,
  "k7": "0467"
}, {
  "id": 185,
  "name": "鹤岗",
  "parent_id": 10,
  "k1": "h",
  "k2": "hg",
  "k3": "hegang",
  "k4": "",
  "k5": "市",
  "k6": 230400,
  "k7": "0468"
}, {
  "id": 186,
  "name": "双鸭山",
  "parent_id": 10,
  "k1": "s",
  "k2": "sys",
  "k3": "shuangyashan",
  "k4": "",
  "k5": "市",
  "k6": 230500,
  "k7": "0469"
}, {
  "id": 187,
  "name": "大庆",
  "parent_id": 10,
  "k1": "d",
  "k2": "dq",
  "k3": "daqing",
  "k4": "",
  "k5": "市",
  "k6": 230600,
  "k7": "0459"
}, {
  "id": 188,
  "name": "伊春",
  "parent_id": 10,
  "k1": "y",
  "k2": "yc",
  "k3": "yichun",
  "k4": "",
  "k5": "市",
  "k6": 230700,
  "k7": "0458"
}, {
  "id": 189,
  "name": "佳木斯",
  "parent_id": 10,
  "k1": "j",
  "k2": "jms",
  "k3": "jiamusi",
  "k4": "",
  "k5": "市",
  "k6": 230800,
  "k7": "0454"
}, {
  "id": 190,
  "name": "七台河",
  "parent_id": 10,
  "k1": "q",
  "k2": "qth",
  "k3": "qitaihe",
  "k4": "",
  "k5": "市",
  "k6": 230900,
  "k7": "0464"
}, {
  "id": 191,
  "name": "牡丹江",
  "parent_id": 10,
  "k1": "m",
  "k2": "mdj",
  "k3": "mudanjiang",
  "k4": "",
  "k5": "市",
  "k6": 231000,
  "k7": "0453"
}, {
  "id": 192,
  "name": "黑河",
  "parent_id": 10,
  "k1": "h",
  "k2": "hh",
  "k3": "heihe",
  "k4": "",
  "k5": "市",
  "k6": 231100,
  "k7": "0456"
}, {
  "id": 193,
  "name": "绥化",
  "parent_id": 10,
  "k1": "s",
  "k2": "sh",
  "k3": "suihua",
  "k4": "",
  "k5": "市",
  "k6": 231200,
  "k7": "0455"
}, {
  "id": 194,
  "name": "大兴安岭",
  "parent_id": 10,
  "k1": "d",
  "k2": "dxal",
  "k3": "daxinganling",
  "k4": "",
  "k5": "地区",
  "k6": 232700,
  "k7": "0457"
}, {
  "id": 195,
  "name": "南京",
  "parent_id": 11,
  "k1": "n",
  "k2": "nj",
  "k3": "nanjing",
  "k4": "",
  "k5": "市",
  "k6": 320100,
  "k7": ""
}, {
  "id": 196,
  "name": "无锡",
  "parent_id": 11,
  "k1": "w",
  "k2": "wx",
  "k3": "wuxi",
  "k4": "",
  "k5": "市",
  "k6": 320200,
  "k7": "0510"
}, {
  "id": 197,
  "name": "徐州",
  "parent_id": 11,
  "k1": "x",
  "k2": "xz",
  "k3": "xuzhou",
  "k4": "",
  "k5": "市",
  "k6": 320300,
  "k7": "0516"
}, {
  "id": 198,
  "name": "常州",
  "parent_id": 11,
  "k1": "c",
  "k2": "cz",
  "k3": "changzhou",
  "k4": "",
  "k5": "市",
  "k6": 320400,
  "k7": "0519"
}, {
  "id": 199,
  "name": "苏州",
  "parent_id": 11,
  "k1": "s",
  "k2": "sz",
  "k3": "suzhou",
  "k4": "",
  "k5": "市",
  "k6": 320500,
  "k7": "0512"
}, {
  "id": 200,
  "name": "南通",
  "parent_id": 11,
  "k1": "n",
  "k2": "nt",
  "k3": "nantong",
  "k4": "",
  "k5": "市",
  "k6": 320600,
  "k7": "0513"
}, {
  "id": 201,
  "name": "连云港",
  "parent_id": 11,
  "k1": "l",
  "k2": "lyg",
  "k3": "lianyungang",
  "k4": "",
  "k5": "市",
  "k6": 320700,
  "k7": "0518"
}, {
  "id": 202,
  "name": "淮安",
  "parent_id": 11,
  "k1": "h",
  "k2": "ha",
  "k3": "huaian",
  "k4": "",
  "k5": "市",
  "k6": 320800,
  "k7": "0517"
}, {
  "id": 203,
  "name": "盐城",
  "parent_id": 11,
  "k1": "y",
  "k2": "yc",
  "k3": "yancheng",
  "k4": "",
  "k5": "市",
  "k6": 320900,
  "k7": "0515"
}, {
  "id": 204,
  "name": "扬州",
  "parent_id": 11,
  "k1": "y",
  "k2": "yz",
  "k3": "yangzhou",
  "k4": "",
  "k5": "市",
  "k6": 321000,
  "k7": "0514"
}, {
  "id": 205,
  "name": "镇江",
  "parent_id": 11,
  "k1": "z",
  "k2": "zj",
  "k3": "zhenjiang",
  "k4": "",
  "k5": "市",
  "k6": 321100,
  "k7": "0511"
}, {
  "id": 206,
  "name": "泰州",
  "parent_id": 11,
  "k1": "t",
  "k2": "tz",
  "k3": "taizhou",
  "k4": "",
  "k5": "市",
  "k6": 321200,
  "k7": "0523"
}, {
  "id": 207,
  "name": "宿迁",
  "parent_id": 11,
  "k1": "s",
  "k2": "sq",
  "k3": "suqian",
  "k4": "",
  "k5": "市",
  "k6": 321300,
  "k7": "0527"
}, {
  "id": 208,
  "name": "杭州",
  "parent_id": 12,
  "k1": "h",
  "k2": "hz",
  "k3": "hangzhou",
  "k4": "",
  "k5": "市",
  "k6": 330100,
  "k7": "0571"
}, {
  "id": 209,
  "name": "宁波",
  "parent_id": 12,
  "k1": "n",
  "k2": "nb",
  "k3": "ningbo",
  "k4": "",
  "k5": "市",
  "k6": 330200,
  "k7": "0574"
}, {
  "id": 210,
  "name": "温州",
  "parent_id": 12,
  "k1": "w",
  "k2": "wz",
  "k3": "wenzhou",
  "k4": "",
  "k5": "市",
  "k6": 330300,
  "k7": "0577"
}, {
  "id": 211,
  "name": "嘉兴",
  "parent_id": 12,
  "k1": "j",
  "k2": "jx",
  "k3": "jiaxing",
  "k4": "",
  "k5": "市",
  "k6": 330400,
  "k7": "0573"
}, {
  "id": 212,
  "name": "湖州",
  "parent_id": 12,
  "k1": "h",
  "k2": "hz",
  "k3": "huzhou",
  "k4": "",
  "k5": "市",
  "k6": 330500,
  "k7": "0572"
}, {
  "id": 213,
  "name": "绍兴",
  "parent_id": 12,
  "k1": "s",
  "k2": "sx",
  "k3": "shaoxing",
  "k4": "",
  "k5": "市",
  "k6": 330600,
  "k7": "0575"
}, {
  "id": 214,
  "name": "金华",
  "parent_id": 12,
  "k1": "j",
  "k2": "jh",
  "k3": "jinhua",
  "k4": "",
  "k5": "市",
  "k6": 330700,
  "k7": "0579"
}, {
  "id": 215,
  "name": "衢州",
  "parent_id": 12,
  "k1": "q",
  "k2": "qz",
  "k3": "quzhou",
  "k4": "",
  "k5": "市",
  "k6": 330800,
  "k7": "0570"
}, {
  "id": 216,
  "name": "舟山",
  "parent_id": 12,
  "k1": "z",
  "k2": "zs",
  "k3": "zhoushan",
  "k4": "",
  "k5": "市",
  "k6": 330900,
  "k7": "0580"
}, {
  "id": 217,
  "name": "台州",
  "parent_id": 12,
  "k1": "t",
  "k2": "tz",
  "k3": "taizhou",
  "k4": "",
  "k5": "市",
  "k6": 331000,
  "k7": "0576"
}, {
  "id": 218,
  "name": "丽水",
  "parent_id": 12,
  "k1": "l",
  "k2": "ls",
  "k3": "lishui",
  "k4": "",
  "k5": "市",
  "k6": 331100,
  "k7": "0578"
}, {
  "id": 219,
  "name": "合肥",
  "parent_id": 13,
  "k1": "h",
  "k2": "hf",
  "k3": "hefei",
  "k4": "",
  "k5": "市",
  "k6": 340100,
  "k7": "0551"
}, {
  "id": 220,
  "name": "芜湖",
  "parent_id": 13,
  "k1": "w",
  "k2": "wh",
  "k3": "wuhu",
  "k4": "",
  "k5": "市",
  "k6": 340200,
  "k7": "0553"
}, {
  "id": 221,
  "name": "蚌埠",
  "parent_id": 13,
  "k1": "b",
  "k2": "bb",
  "k3": "bengbu",
  "k4": "",
  "k5": "市",
  "k6": 340300,
  "k7": "0552"
}, {
  "id": 222,
  "name": "淮南",
  "parent_id": 13,
  "k1": "h",
  "k2": "hn",
  "k3": "huainan",
  "k4": "",
  "k5": "市",
  "k6": 340400,
  "k7": "0554"
}, {
  "id": 223,
  "name": "马鞍山",
  "parent_id": 13,
  "k1": "m",
  "k2": "mas",
  "k3": "maanshan",
  "k4": "",
  "k5": "市",
  "k6": 340500,
  "k7": "0555"
}, {
  "id": 224,
  "name": "淮北",
  "parent_id": 13,
  "k1": "h",
  "k2": "hb",
  "k3": "huaibei",
  "k4": "",
  "k5": "市",
  "k6": 340600,
  "k7": "0561"
}, {
  "id": 225,
  "name": "铜陵",
  "parent_id": 13,
  "k1": "t",
  "k2": "tl",
  "k3": "tongling",
  "k4": "",
  "k5": "市",
  "k6": 340700,
  "k7": "0562"
}, {
  "id": 226,
  "name": "安庆",
  "parent_id": 13,
  "k1": "a",
  "k2": "aq",
  "k3": "anqing",
  "k4": "",
  "k5": "市",
  "k6": 340800,
  "k7": "0556"
}, {
  "id": 227,
  "name": "黄山",
  "parent_id": 13,
  "k1": "h",
  "k2": "hs",
  "k3": "huangshan",
  "k4": "",
  "k5": "市",
  "k6": 341000,
  "k7": "0559"
}, {
  "id": 228,
  "name": "滁州",
  "parent_id": 13,
  "k1": "c",
  "k2": "cz",
  "k3": "chuzhou",
  "k4": "",
  "k5": "市",
  "k6": 341100,
  "k7": "0550"
}, {
  "id": 229,
  "name": "阜阳",
  "parent_id": 13,
  "k1": "f",
  "k2": "fy",
  "k3": "fuyang",
  "k4": "",
  "k5": "市",
  "k6": 341200,
  "k7": "0558"
}, {
  "id": 230,
  "name": "宿州",
  "parent_id": 13,
  "k1": "s",
  "k2": "sz",
  "k3": "suzhou",
  "k4": "",
  "k5": "市",
  "k6": 341300,
  "k7": "0557"
}, {
  "id": 231,
  "name": "六安",
  "parent_id": 13,
  "k1": "l",
  "k2": "la",
  "k3": "liuan",
  "k4": "",
  "k5": "市",
  "k6": 341500,
  "k7": "0564"
}, {
  "id": 232,
  "name": "亳州",
  "parent_id": 13,
  "k1": "b",
  "k2": "bz",
  "k3": "bozhou",
  "k4": "",
  "k5": "市",
  "k6": 341600,
  "k7": "0558"
}, {
  "id": 233,
  "name": "池州",
  "parent_id": 13,
  "k1": "c",
  "k2": "cz",
  "k3": "chizhou",
  "k4": "",
  "k5": "市",
  "k6": 341700,
  "k7": "0566"
}, {
  "id": 234,
  "name": "宣城",
  "parent_id": 13,
  "k1": "x",
  "k2": "xc",
  "k3": "xuancheng",
  "k4": "",
  "k5": "市",
  "k6": 341800,
  "k7": "0563"
}, {
  "id": 235,
  "name": "福州",
  "parent_id": 14,
  "k1": "f",
  "k2": "fz",
  "k3": "fuzhou",
  "k4": "",
  "k5": "市",
  "k6": 350100,
  "k7": "0591"
}, {
  "id": 236,
  "name": "厦门",
  "parent_id": 14,
  "k1": "x",
  "k2": "xm",
  "k3": "xiamen",
  "k4": "",
  "k5": "市",
  "k6": 350200,
  "k7": "0592"
}, {
  "id": 237,
  "name": "莆田",
  "parent_id": 14,
  "k1": "p",
  "k2": "pt",
  "k3": "putian",
  "k4": "",
  "k5": "市",
  "k6": 350300,
  "k7": "0594"
}, {
  "id": 238,
  "name": "三明",
  "parent_id": 14,
  "k1": "s",
  "k2": "sm",
  "k3": "sanming",
  "k4": "",
  "k5": "市",
  "k6": 350400,
  "k7": "0598"
}, {
  "id": 239,
  "name": "泉州",
  "parent_id": 14,
  "k1": "q",
  "k2": "qz",
  "k3": "quanzhou",
  "k4": "",
  "k5": "市",
  "k6": 350500,
  "k7": "0595"
}, {
  "id": 240,
  "name": "漳州",
  "parent_id": 14,
  "k1": "z",
  "k2": "zz",
  "k3": "zhangzhou",
  "k4": "",
  "k5": "市",
  "k6": 350600,
  "k7": "0596"
}, {
  "id": 241,
  "name": "南平",
  "parent_id": 14,
  "k1": "n",
  "k2": "np",
  "k3": "nanping",
  "k4": "",
  "k5": "市",
  "k6": 350700,
  "k7": "0599"
}, {
  "id": 242,
  "name": "龙岩",
  "parent_id": 14,
  "k1": "l",
  "k2": "ly",
  "k3": "longyan",
  "k4": "",
  "k5": "市",
  "k6": 350800,
  "k7": "0597"
}, {
  "id": 243,
  "name": "宁德",
  "parent_id": 14,
  "k1": "n",
  "k2": "nd",
  "k3": "ningde",
  "k4": "",
  "k5": "市",
  "k6": 350900,
  "k7": "0593"
}, {
  "id": 244,
  "name": "南昌",
  "parent_id": 15,
  "k1": "n",
  "k2": "nc",
  "k3": "nanchang",
  "k4": "",
  "k5": "市",
  "k6": 360100,
  "k7": "0791"
}, {
  "id": 245,
  "name": "景德镇",
  "parent_id": 15,
  "k1": "j",
  "k2": "jdz",
  "k3": "jingdezhen",
  "k4": "",
  "k5": "市",
  "k6": 360200,
  "k7": "0798"
}, {
  "id": 246,
  "name": "萍乡",
  "parent_id": 15,
  "k1": "p",
  "k2": "px",
  "k3": "pingxiang",
  "k4": "",
  "k5": "市",
  "k6": 360300,
  "k7": "0799"
}, {
  "id": 247,
  "name": "九江",
  "parent_id": 15,
  "k1": "j",
  "k2": "jj",
  "k3": "jiujiang",
  "k4": "",
  "k5": "市",
  "k6": 360400,
  "k7": "0792"
}, {
  "id": 248,
  "name": "新余",
  "parent_id": 15,
  "k1": "x",
  "k2": "xy",
  "k3": "xinyu",
  "k4": "",
  "k5": "市",
  "k6": 360500,
  "k7": "0790"
}, {
  "id": 249,
  "name": "鹰潭",
  "parent_id": 15,
  "k1": "y",
  "k2": "yt",
  "k3": "yingtan",
  "k4": "",
  "k5": "市",
  "k6": 360600,
  "k7": "0701"
}, {
  "id": 250,
  "name": "赣州",
  "parent_id": 15,
  "k1": "g",
  "k2": "gz",
  "k3": "ganzhou",
  "k4": "",
  "k5": "市",
  "k6": 360700,
  "k7": "0797"
}, {
  "id": 251,
  "name": "吉安",
  "parent_id": 15,
  "k1": "j",
  "k2": "ja",
  "k3": "jian",
  "k4": "",
  "k5": "市",
  "k6": 360800,
  "k7": "0796"
}, {
  "id": 252,
  "name": "宜春",
  "parent_id": 15,
  "k1": "y",
  "k2": "yc",
  "k3": "yichun",
  "k4": "",
  "k5": "市",
  "k6": 360900,
  "k7": "0795"
}, {
  "id": 253,
  "name": "抚州",
  "parent_id": 15,
  "k1": "f",
  "k2": "fz",
  "k3": "fuzhou",
  "k4": "",
  "k5": "市",
  "k6": 361000,
  "k7": "0794"
}, {
  "id": 254,
  "name": "上饶",
  "parent_id": 15,
  "k1": "s",
  "k2": "sr",
  "k3": "shangrao",
  "k4": "",
  "k5": "市",
  "k6": 361100,
  "k7": "0793"
}, {
  "id": 255,
  "name": "济南",
  "parent_id": 16,
  "k1": "j",
  "k2": "jn",
  "k3": "jinan",
  "k4": "",
  "k5": "市",
  "k6": 370100,
  "k7": "0531"
}, {
  "id": 256,
  "name": "青岛",
  "parent_id": 16,
  "k1": "q",
  "k2": "qd",
  "k3": "qingdao",
  "k4": "",
  "k5": "市",
  "k6": 370200,
  "k7": "0532"
}, {
  "id": 257,
  "name": "淄博",
  "parent_id": 16,
  "k1": "z",
  "k2": "zb",
  "k3": "zibo",
  "k4": "",
  "k5": "市",
  "k6": 370300,
  "k7": "0533"
}, {
  "id": 258,
  "name": "枣庄",
  "parent_id": 16,
  "k1": "z",
  "k2": "zz",
  "k3": "zaozhuang",
  "k4": "",
  "k5": "市",
  "k6": 370400,
  "k7": "0632"
}, {
  "id": 259,
  "name": "东营",
  "parent_id": 16,
  "k1": "d",
  "k2": "dy",
  "k3": "dongying",
  "k4": "",
  "k5": "市",
  "k6": 370500,
  "k7": "0546"
}, {
  "id": 260,
  "name": "烟台",
  "parent_id": 16,
  "k1": "y",
  "k2": "yt",
  "k3": "yantai",
  "k4": "",
  "k5": "市",
  "k6": 370600,
  "k7": "0535"
}, {
  "id": 261,
  "name": "潍坊",
  "parent_id": 16,
  "k1": "w",
  "k2": "wf",
  "k3": "weifang",
  "k4": "",
  "k5": "市",
  "k6": 370700,
  "k7": "0536"
}, {
  "id": 262,
  "name": "济宁",
  "parent_id": 16,
  "k1": "j",
  "k2": "jn",
  "k3": "jining",
  "k4": "",
  "k5": "市",
  "k6": 370800,
  "k7": "0537"
}, {
  "id": 263,
  "name": "泰安",
  "parent_id": 16,
  "k1": "t",
  "k2": "ta",
  "k3": "taian",
  "k4": "",
  "k5": "市",
  "k6": 370900,
  "k7": "0538"
}, {
  "id": 264,
  "name": "威海",
  "parent_id": 16,
  "k1": "w",
  "k2": "wh",
  "k3": "weihai",
  "k4": "",
  "k5": "市",
  "k6": 371000,
  "k7": "0631"
}, {
  "id": 265,
  "name": "日照",
  "parent_id": 16,
  "k1": "r",
  "k2": "rz",
  "k3": "rizhao",
  "k4": "",
  "k5": "市",
  "k6": 371100,
  "k7": "0633"
}, {
  "id": 267,
  "name": "临沂",
  "parent_id": 16,
  "k1": "l",
  "k2": "ly",
  "k3": "linyi",
  "k4": "",
  "k5": "市",
  "k6": 371300,
  "k7": "0539"
}, {
  "id": 268,
  "name": "德州",
  "parent_id": 16,
  "k1": "d",
  "k2": "dz",
  "k3": "dezhou",
  "k4": "",
  "k5": "市",
  "k6": 371400,
  "k7": "0534"
}, {
  "id": 269,
  "name": "聊城",
  "parent_id": 16,
  "k1": "l",
  "k2": "lc",
  "k3": "liaocheng",
  "k4": "",
  "k5": "市",
  "k6": 371500,
  "k7": "0635"
}, {
  "id": 270,
  "name": "滨州",
  "parent_id": 16,
  "k1": "b",
  "k2": "bz",
  "k3": "binzhou",
  "k4": "",
  "k5": "市",
  "k6": 371600,
  "k7": "0543"
}, {
  "id": 271,
  "name": "菏泽",
  "parent_id": 16,
  "k1": "h",
  "k2": "hz",
  "k3": "heze",
  "k4": "",
  "k5": "市",
  "k6": 371700,
  "k7": "0530"
}, {
  "id": 272,
  "name": "郑州",
  "parent_id": 17,
  "k1": "z",
  "k2": "zz",
  "k3": "zhengzhou",
  "k4": "",
  "k5": "市",
  "k6": 410100,
  "k7": "0371"
}, {
  "id": 273,
  "name": "开封",
  "parent_id": 17,
  "k1": "k",
  "k2": "kf",
  "k3": "kaifeng",
  "k4": "",
  "k5": "市",
  "k6": 410200,
  "k7": "0378"
}, {
  "id": 274,
  "name": "洛阳",
  "parent_id": 17,
  "k1": "l",
  "k2": "ly",
  "k3": "luoyang",
  "k4": "",
  "k5": "市",
  "k6": 410300,
  "k7": "0376"
}, {
  "id": 275,
  "name": "平顶山",
  "parent_id": 17,
  "k1": "p",
  "k2": "pds",
  "k3": "pingdingshan",
  "k4": "",
  "k5": "市",
  "k6": 410400,
  "k7": "0375"
}, {
  "id": 276,
  "name": "安阳",
  "parent_id": 17,
  "k1": "a",
  "k2": "ay",
  "k3": "anyang",
  "k4": "",
  "k5": "市",
  "k6": 410500,
  "k7": "0372"
}, {
  "id": 277,
  "name": "鹤壁",
  "parent_id": 17,
  "k1": "h",
  "k2": "hb",
  "k3": "hebi",
  "k4": "",
  "k5": "市",
  "k6": 410600,
  "k7": "0392"
}, {
  "id": 278,
  "name": "新乡",
  "parent_id": 17,
  "k1": "x",
  "k2": "xx",
  "k3": "xinxiang",
  "k4": "",
  "k5": "市",
  "k6": 410700,
  "k7": "0373"
}, {
  "id": 279,
  "name": "焦作",
  "parent_id": 17,
  "k1": "j",
  "k2": "jz",
  "k3": "jiaozuo",
  "k4": "",
  "k5": "市",
  "k6": 410800,
  "k7": "0391"
}, {
  "id": 280,
  "name": "濮阳",
  "parent_id": 17,
  "k1": "p",
  "k2": "py",
  "k3": "puyang",
  "k4": "",
  "k5": "市",
  "k6": 410900,
  "k7": ""
}, {
  "id": 281,
  "name": "许昌",
  "parent_id": 17,
  "k1": "x",
  "k2": "xc",
  "k3": "xuchuang",
  "k4": "",
  "k5": "市",
  "k6": 411000,
  "k7": "0374"
}, {
  "id": 282,
  "name": "漯河",
  "parent_id": 17,
  "k1": "l",
  "k2": "lh",
  "k3": "luohe",
  "k4": "",
  "k5": "市",
  "k6": 411100,
  "k7": "0395"
}, {
  "id": 283,
  "name": "三门峡",
  "parent_id": 17,
  "k1": "s",
  "k2": "smx",
  "k3": "sanmenxia",
  "k4": "",
  "k5": "市",
  "k6": 411200,
  "k7": "0398"
}, {
  "id": 284,
  "name": "南阳",
  "parent_id": 17,
  "k1": "n",
  "k2": "ny",
  "k3": "nanyang",
  "k4": "",
  "k5": "市",
  "k6": 411300,
  "k7": "0377"
}, {
  "id": 285,
  "name": "商丘",
  "parent_id": 17,
  "k1": "s",
  "k2": "sq",
  "k3": "shangqiu",
  "k4": "",
  "k5": "市",
  "k6": 411400,
  "k7": "0370"
}, {
  "id": 286,
  "name": "信阳",
  "parent_id": 17,
  "k1": "x",
  "k2": "xy",
  "k3": "xinyang",
  "k4": "",
  "k5": "市",
  "k6": 411500,
  "k7": "0376"
}, {
  "id": 287,
  "name": "周口",
  "parent_id": 17,
  "k1": "z",
  "k2": "zk",
  "k3": "zhoukou",
  "k4": "",
  "k5": "市",
  "k6": 411600,
  "k7": "0394"
}, {
  "id": 288,
  "name": "驻马店",
  "parent_id": 17,
  "k1": "z",
  "k2": "zmd",
  "k3": "zhumadian",
  "k4": "",
  "k5": "市",
  "k6": 411700,
  "k7": "0396"
}, {
  "id": 289,
  "name": "济源",
  "parent_id": 17,
  "k1": "j",
  "k2": "jy",
  "k3": "jiyuan",
  "k4": "",
  "k5": "市",
  "k6": 419001,
  "k7": "0391"
}, {
  "id": 290,
  "name": "武汉",
  "parent_id": 18,
  "k1": "w",
  "k2": "wh",
  "k3": "wuhan",
  "k4": "",
  "k5": "市",
  "k6": 420100,
  "k7": "027"
}, {
  "id": 291,
  "name": "黄石",
  "parent_id": 18,
  "k1": "h",
  "k2": "hs",
  "k3": "huangshi",
  "k4": "",
  "k5": "市",
  "k6": 420200,
  "k7": "0714"
}, {
  "id": 292,
  "name": "十堰",
  "parent_id": 18,
  "k1": "s",
  "k2": "sy",
  "k3": "shiyan",
  "k4": "",
  "k5": "市",
  "k6": 420300,
  "k7": "0719"
}, {
  "id": 293,
  "name": "宜昌",
  "parent_id": 18,
  "k1": "y",
  "k2": "yc",
  "k3": "yichang",
  "k4": "",
  "k5": "市",
  "k6": 420500,
  "k7": "0717"
}, {
  "id": 294,
  "name": "襄阳",
  "parent_id": 18,
  "k1": "x",
  "k2": "xy",
  "k3": "xiangyang",
  "k4": "",
  "k5": "市",
  "k6": 420600,
  "k7": "0710"
}, {
  "id": 295,
  "name": "鄂州",
  "parent_id": 18,
  "k1": "e",
  "k2": "ez",
  "k3": "ezhou",
  "k4": "",
  "k5": "市",
  "k6": 420700,
  "k7": ""
}, {
  "id": 296,
  "name": "荆门",
  "parent_id": 18,
  "k1": "j",
  "k2": "jm",
  "k3": "jingmen",
  "k4": "",
  "k5": "市",
  "k6": 420800,
  "k7": "0724"
}, {
  "id": 297,
  "name": "孝感",
  "parent_id": 18,
  "k1": "x",
  "k2": "xg",
  "k3": "xiaogan",
  "k4": "",
  "k5": "市",
  "k6": 420900,
  "k7": "0712"
}, {
  "id": 298,
  "name": "荆州",
  "parent_id": 18,
  "k1": "j",
  "k2": "jz",
  "k3": "jingzhou",
  "k4": "",
  "k5": "市",
  "k6": 421000,
  "k7": "0716"
}, {
  "id": 299,
  "name": "黄冈",
  "parent_id": 18,
  "k1": "h",
  "k2": "hg",
  "k3": "huanggang",
  "k4": "",
  "k5": "市",
  "k6": 421100,
  "k7": "0713"
}, {
  "id": 300,
  "name": "咸宁",
  "parent_id": 18,
  "k1": "x",
  "k2": "xn",
  "k3": "xianning",
  "k4": "",
  "k5": "市",
  "k6": 421200,
  "k7": "0715"
}, {
  "id": 301,
  "name": "随州",
  "parent_id": 18,
  "k1": "s",
  "k2": "sz",
  "k3": "suizhou",
  "k4": "",
  "k5": "市",
  "k6": 421300,
  "k7": "0722"
}, {
  "id": 302,
  "name": "恩施",
  "parent_id": 18,
  "k1": "e",
  "k2": "es",
  "k3": "enshi",
  "k4": "土家族苗族",
  "k5": "自治州",
  "k6": 422800,
  "k7": "0718"
}, {
  "id": 303,
  "name": "仙桃",
  "parent_id": 18,
  "k1": "x",
  "k2": "xt",
  "k3": "xiantao",
  "k4": "",
  "k5": "市",
  "k6": 429004,
  "k7": "0728"
}, {
  "id": 304,
  "name": "潜江",
  "parent_id": 18,
  "k1": "q",
  "k2": "qj",
  "k3": "qianjiang",
  "k4": "",
  "k5": "市",
  "k6": 429005,
  "k7": "0728"
}, {
  "id": 305,
  "name": "天门",
  "parent_id": 18,
  "k1": "t",
  "k2": "tm",
  "k3": "tianmen",
  "k4": "",
  "k5": "市",
  "k6": 429006,
  "k7": "0728"
}, {
  "id": 306,
  "name": "神农架林区",
  "parent_id": 18,
  "k1": "s",
  "k2": "snjlq",
  "k3": "shennongjialinqu",
  "k4": "",
  "k5": "",
  "k6": 429021,
  "k7": "0719"
}, {
  "id": 307,
  "name": "长沙",
  "parent_id": 19,
  "k1": "c",
  "k2": "cs",
  "k3": "changsha",
  "k4": "",
  "k5": "市",
  "k6": 430100,
  "k7": "0731"
}, {
  "id": 308,
  "name": "株洲",
  "parent_id": 19,
  "k1": "z",
  "k2": "zz",
  "k3": "zhuzhou",
  "k4": "",
  "k5": "市",
  "k6": 430200,
  "k7": "0731"
}, {
  "id": 309,
  "name": "湘潭",
  "parent_id": 19,
  "k1": "x",
  "k2": "xt",
  "k3": "xiangtan",
  "k4": "",
  "k5": "市",
  "k6": 430300,
  "k7": "0731"
}, {
  "id": 310,
  "name": "衡阳",
  "parent_id": 19,
  "k1": "h",
  "k2": "hy",
  "k3": "hengyang",
  "k4": "",
  "k5": "市",
  "k6": 430400,
  "k7": "0734"
}, {
  "id": 311,
  "name": "邵阳",
  "parent_id": 19,
  "k1": "s",
  "k2": "sy",
  "k3": "shaoyang",
  "k4": "",
  "k5": "市",
  "k6": 430500,
  "k7": "0739"
}, {
  "id": 312,
  "name": "岳阳",
  "parent_id": 19,
  "k1": "y",
  "k2": "yy",
  "k3": "yueyang",
  "k4": "",
  "k5": "市",
  "k6": 430600,
  "k7": "0730"
}, {
  "id": 313,
  "name": "常德",
  "parent_id": 19,
  "k1": "c",
  "k2": "cd",
  "k3": "changde",
  "k4": "",
  "k5": "市",
  "k6": 430700,
  "k7": "0736"
}, {
  "id": 314,
  "name": "张家界",
  "parent_id": 19,
  "k1": "z",
  "k2": "zjj",
  "k3": "zhangjiajie",
  "k4": "",
  "k5": "市",
  "k6": 430800,
  "k7": "0744"
}, {
  "id": 315,
  "name": "益阳",
  "parent_id": 19,
  "k1": "y",
  "k2": "yy",
  "k3": "yiyang",
  "k4": "",
  "k5": "市",
  "k6": 430900,
  "k7": "0737"
}, {
  "id": 316,
  "name": "郴州",
  "parent_id": 19,
  "k1": "c",
  "k2": "cz",
  "k3": "chenzhou",
  "k4": "",
  "k5": "市",
  "k6": 431000,
  "k7": "0735"
}, {
  "id": 317,
  "name": "永州",
  "parent_id": 19,
  "k1": "y",
  "k2": "yz",
  "k3": "yongzhou",
  "k4": "",
  "k5": "市",
  "k6": 431100,
  "k7": "0746"
}, {
  "id": 318,
  "name": "怀化",
  "parent_id": 19,
  "k1": "h",
  "k2": "hh",
  "k3": "huaihua",
  "k4": "",
  "k5": "市",
  "k6": 431200,
  "k7": "0745"
}, {
  "id": 319,
  "name": "娄底",
  "parent_id": 19,
  "k1": "l",
  "k2": "ld",
  "k3": "loudi",
  "k4": "",
  "k5": "市",
  "k6": 431300,
  "k7": "0738"
}, {
  "id": 320,
  "name": "湘西",
  "parent_id": 19,
  "k1": "x",
  "k2": "xx",
  "k3": "xiangxi",
  "k4": "土家族苗族",
  "k5": "自治州",
  "k6": 433100,
  "k7": "0743"
}, {
  "id": 321,
  "name": "广州",
  "parent_id": 20,
  "k1": "g",
  "k2": "gz",
  "k3": "guangzhou",
  "k4": "",
  "k5": "市",
  "k6": 440100,
  "k7": "020"
}, {
  "id": 322,
  "name": "韶关",
  "parent_id": 20,
  "k1": "s",
  "k2": "sg",
  "k3": "shaoguan",
  "k4": "",
  "k5": "市",
  "k6": 440200,
  "k7": "0751"
}, {
  "id": 323,
  "name": "深圳",
  "parent_id": 20,
  "k1": "s",
  "k2": "sz",
  "k3": "shenzhen",
  "k4": "",
  "k5": "市",
  "k6": 440300,
  "k7": "0755"
}, {
  "id": 324,
  "name": "珠海",
  "parent_id": 20,
  "k1": "z",
  "k2": "zh",
  "k3": "zhuhai",
  "k4": "",
  "k5": "市",
  "k6": 440400,
  "k7": "0756"
}, {
  "id": 325,
  "name": "汕头",
  "parent_id": 20,
  "k1": "s",
  "k2": "st",
  "k3": "shantou",
  "k4": "",
  "k5": "市",
  "k6": 440500,
  "k7": "0754"
}, {
  "id": 326,
  "name": "佛山",
  "parent_id": 20,
  "k1": "f",
  "k2": "fs",
  "k3": "foshan",
  "k4": "",
  "k5": "市",
  "k6": 440600,
  "k7": "0757"
}, {
  "id": 327,
  "name": "江门",
  "parent_id": 20,
  "k1": "j",
  "k2": "jm",
  "k3": "jiangmen",
  "k4": "",
  "k5": "市",
  "k6": 440700,
  "k7": "0750"
}, {
  "id": 328,
  "name": "湛江",
  "parent_id": 20,
  "k1": "z",
  "k2": "zj",
  "k3": "zhanjiang",
  "k4": "",
  "k5": "市",
  "k6": 440800,
  "k7": "0759"
}, {
  "id": 329,
  "name": "茂名",
  "parent_id": 20,
  "k1": "m",
  "k2": "mm",
  "k3": "maoming",
  "k4": "",
  "k5": "市",
  "k6": 440900,
  "k7": "0668"
}, {
  "id": 330,
  "name": "肇庆",
  "parent_id": 20,
  "k1": "z",
  "k2": "zq",
  "k3": "zhaoqing",
  "k4": "",
  "k5": "市",
  "k6": 441200,
  "k7": "0758"
}, {
  "id": 331,
  "name": "惠州",
  "parent_id": 20,
  "k1": "h",
  "k2": "hz",
  "k3": "huizhou",
  "k4": "",
  "k5": "市",
  "k6": 441300,
  "k7": "0752"
}, {
  "id": 332,
  "name": "梅州",
  "parent_id": 20,
  "k1": "m",
  "k2": "mz",
  "k3": "meizhou",
  "k4": "",
  "k5": "市",
  "k6": 441400,
  "k7": "0753"
}, {
  "id": 333,
  "name": "汕尾",
  "parent_id": 20,
  "k1": "s",
  "k2": "sw",
  "k3": "shanwei",
  "k4": "",
  "k5": "市",
  "k6": 441500,
  "k7": "0660"
}, {
  "id": 334,
  "name": "河源",
  "parent_id": 20,
  "k1": "h",
  "k2": "hy",
  "k3": "heyuan",
  "k4": "",
  "k5": "市",
  "k6": 441600,
  "k7": "0762"
}, {
  "id": 335,
  "name": "阳江",
  "parent_id": 20,
  "k1": "y",
  "k2": "yj",
  "k3": "yangjiang",
  "k4": "",
  "k5": "市",
  "k6": 441700,
  "k7": "0662"
}, {
  "id": 336,
  "name": "清远",
  "parent_id": 20,
  "k1": "q",
  "k2": "qy",
  "k3": "qingyuan",
  "k4": "",
  "k5": "市",
  "k6": 441800,
  "k7": "0763"
}, {
  "id": 337,
  "name": "东莞",
  "parent_id": 20,
  "k1": "d",
  "k2": "dg",
  "k3": "dongguan",
  "k4": "",
  "k5": "市",
  "k6": 441900,
  "k7": "0769"
}, {
  "id": 338,
  "name": "中山",
  "parent_id": 20,
  "k1": "z",
  "k2": "zs",
  "k3": "zhongshan",
  "k4": "",
  "k5": "市",
  "k6": 442000,
  "k7": "0760"
}, {
  "id": 339,
  "name": "潮州",
  "parent_id": 20,
  "k1": "c",
  "k2": "cz",
  "k3": "chaozhou",
  "k4": "",
  "k5": "市",
  "k6": 445100,
  "k7": "0768"
}, {
  "id": 340,
  "name": "揭阳",
  "parent_id": 20,
  "k1": "j",
  "k2": "jy",
  "k3": "jieyang",
  "k4": "",
  "k5": "市",
  "k6": 445200,
  "k7": "0663"
}, {
  "id": 341,
  "name": "云浮",
  "parent_id": 20,
  "k1": "y",
  "k2": "yf",
  "k3": "yunfu",
  "k4": "",
  "k5": "市",
  "k6": 445300,
  "k7": "0766"
}, {
  "id": 342,
  "name": "南宁",
  "parent_id": 21,
  "k1": "n",
  "k2": "nn",
  "k3": "nanning",
  "k4": "",
  "k5": "市",
  "k6": 450100,
  "k7": "0771"
}, {
  "id": 343,
  "name": "柳州",
  "parent_id": 21,
  "k1": "l",
  "k2": "lz",
  "k3": "liuzhou",
  "k4": "",
  "k5": "市",
  "k6": 450200,
  "k7": "0772"
}, {
  "id": 344,
  "name": "桂林",
  "parent_id": 21,
  "k1": "g",
  "k2": "gl",
  "k3": "guilin",
  "k4": "",
  "k5": "市",
  "k6": 450300,
  "k7": "0773"
}, {
  "id": 345,
  "name": "梧州",
  "parent_id": 21,
  "k1": "w",
  "k2": "wz",
  "k3": "wuzhou",
  "k4": "",
  "k5": "市",
  "k6": 450400,
  "k7": "0774"
}, {
  "id": 346,
  "name": "北海",
  "parent_id": 21,
  "k1": "b",
  "k2": "bh",
  "k3": "beihai",
  "k4": "",
  "k5": "市",
  "k6": 450500,
  "k7": "0779"
}, {
  "id": 347,
  "name": "防城港",
  "parent_id": 21,
  "k1": "f",
  "k2": "fcg",
  "k3": "fangchenggang",
  "k4": "",
  "k5": "市",
  "k6": 450600,
  "k7": "0770"
}, {
  "id": 348,
  "name": "钦州",
  "parent_id": 21,
  "k1": "q",
  "k2": "qz",
  "k3": "qinzhou",
  "k4": "",
  "k5": "市",
  "k6": 450700,
  "k7": "0777"
}, {
  "id": 349,
  "name": "贵港",
  "parent_id": 21,
  "k1": "g",
  "k2": "gg",
  "k3": "guigang",
  "k4": "",
  "k5": "市",
  "k6": 450800,
  "k7": "0775"
}, {
  "id": 350,
  "name": "玉林",
  "parent_id": 21,
  "k1": "y",
  "k2": "yl",
  "k3": "yulin",
  "k4": "",
  "k5": "市",
  "k6": 450900,
  "k7": "0775"
}, {
  "id": 351,
  "name": "百色",
  "parent_id": 21,
  "k1": "b",
  "k2": "bs",
  "k3": "baise",
  "k4": "",
  "k5": "市",
  "k6": 451000,
  "k7": "0776"
}, {
  "id": 352,
  "name": "贺州",
  "parent_id": 21,
  "k1": "h",
  "k2": "hz",
  "k3": "hezhou",
  "k4": "",
  "k5": "市",
  "k6": 451100,
  "k7": "0774"
}, {
  "id": 353,
  "name": "河池",
  "parent_id": 21,
  "k1": "h",
  "k2": "hc",
  "k3": "hechi",
  "k4": "",
  "k5": "市",
  "k6": 451200,
  "k7": "0778"
}, {
  "id": 354,
  "name": "来宾",
  "parent_id": 21,
  "k1": "l",
  "k2": "lb",
  "k3": "laibin",
  "k4": "",
  "k5": "市",
  "k6": 451300,
  "k7": "0772"
}, {
  "id": 355,
  "name": "崇左",
  "parent_id": 21,
  "k1": "c",
  "k2": "cz",
  "k3": "chongzuo",
  "k4": "",
  "k5": "市",
  "k6": 451400,
  "k7": "0771"
}, {
  "id": 356,
  "name": "海口",
  "parent_id": 22,
  "k1": "h",
  "k2": "hk",
  "k3": "haikou",
  "k4": "",
  "k5": "市",
  "k6": 460100,
  "k7": "0898"
}, {
  "id": 357,
  "name": "三亚",
  "parent_id": 22,
  "k1": "s",
  "k2": "sy",
  "k3": "sanya",
  "k4": "",
  "k5": "市",
  "k6": 460200,
  "k7": "0898"
}, {
  "id": 358,
  "name": "三沙",
  "parent_id": 22,
  "k1": "s",
  "k2": "ss",
  "k3": "sansha",
  "k4": "",
  "k5": "市",
  "k6": 460300,
  "k7": "0898"
}, {
  "id": 359,
  "name": "五指山",
  "parent_id": 22,
  "k1": "w",
  "k2": "wzs",
  "k3": "wuzhishan",
  "k4": "",
  "k5": "市",
  "k6": 469001,
  "k7": "0898"
}, {
  "id": 360,
  "name": "琼海",
  "parent_id": 22,
  "k1": "q",
  "k2": "qh",
  "k3": "qionghai",
  "k4": "",
  "k5": "市",
  "k6": 469002,
  "k7": "0898"
}, {
  "id": 361,
  "name": "儋州",
  "parent_id": 22,
  "k1": "d",
  "k2": "dz",
  "k3": "danzhou",
  "k4": "",
  "k5": "市",
  "k6": 460400,
  "k7": "0898"
}, {
  "id": 362,
  "name": "文昌",
  "parent_id": 22,
  "k1": "w",
  "k2": "wc",
  "k3": "wenchang",
  "k4": "",
  "k5": "市",
  "k6": 469005,
  "k7": "0898"
}, {
  "id": 363,
  "name": "万宁",
  "parent_id": 22,
  "k1": "w",
  "k2": "wn",
  "k3": "wanning",
  "k4": "",
  "k5": "市",
  "k6": 469006,
  "k7": "0898"
}, {
  "id": 364,
  "name": "东方",
  "parent_id": 22,
  "k1": "d",
  "k2": "df",
  "k3": "dongfang",
  "k4": "",
  "k5": "市",
  "k6": 469007,
  "k7": "0898"
}, {
  "id": 365,
  "name": "定安",
  "parent_id": 22,
  "k1": "d",
  "k2": "da",
  "k3": "dingan",
  "k4": "",
  "k5": "县",
  "k6": 469025,
  "k7": "0898"
}, {
  "id": 366,
  "name": "屯昌",
  "parent_id": 22,
  "k1": "t",
  "k2": "tc",
  "k3": "tunchang",
  "k4": "",
  "k5": "县",
  "k6": 469026,
  "k7": "0898"
}, {
  "id": 367,
  "name": "澄迈",
  "parent_id": 22,
  "k1": "c",
  "k2": "cm",
  "k3": "chengmai",
  "k4": "",
  "k5": "县",
  "k6": 469027,
  "k7": "0898"
}, {
  "id": 368,
  "name": "临高",
  "parent_id": 22,
  "k1": "l",
  "k2": "lg",
  "k3": "lingao",
  "k4": "",
  "k5": "县",
  "k6": 469028,
  "k7": "0898"
}, {
  "id": 369,
  "name": "白沙",
  "parent_id": 22,
  "k1": "b",
  "k2": "bs",
  "k3": "baisha",
  "k4": "黎族",
  "k5": "自治县",
  "k6": 469030,
  "k7": "0898"
}, {
  "id": 370,
  "name": "昌江",
  "parent_id": 22,
  "k1": "c",
  "k2": "cj",
  "k3": "changjiang",
  "k4": "黎族",
  "k5": "自治县",
  "k6": 469031,
  "k7": "0898"
}, {
  "id": 371,
  "name": "乐东",
  "parent_id": 22,
  "k1": "l",
  "k2": "ld",
  "k3": "ledong",
  "k4": "黎族",
  "k5": "自治县",
  "k6": 469033,
  "k7": "0898"
}, {
  "id": 372,
  "name": "陵水",
  "parent_id": 22,
  "k1": "l",
  "k2": "ls",
  "k3": "lingshui",
  "k4": "黎族",
  "k5": "自治县",
  "k6": 469034,
  "k7": "0898"
}, {
  "id": 373,
  "name": "保亭",
  "parent_id": 22,
  "k1": "b",
  "k2": "bt",
  "k3": "baoting",
  "k4": "黎族苗族",
  "k5": "自治县",
  "k6": 469035,
  "k7": "0898"
}, {
  "id": 374,
  "name": "琼中",
  "parent_id": 22,
  "k1": "q",
  "k2": "qz",
  "k3": "qiongzhong",
  "k4": "黎族苗族",
  "k5": "自治县",
  "k6": 469036,
  "k7": "0898"
}, {
  "id": 375,
  "name": "成都",
  "parent_id": 23,
  "k1": "c",
  "k2": "cd",
  "k3": "chengdu",
  "k4": "",
  "k5": "市",
  "k6": 510100,
  "k7": "028"
}, {
  "id": 376,
  "name": "自贡",
  "parent_id": 23,
  "k1": "z",
  "k2": "zg",
  "k3": "zigong",
  "k4": "",
  "k5": "市",
  "k6": 510300,
  "k7": "0813"
}, {
  "id": 377,
  "name": "攀枝花",
  "parent_id": 23,
  "k1": "p",
  "k2": "pzh",
  "k3": "panzhihua",
  "k4": "",
  "k5": "市",
  "k6": 510400,
  "k7": "0812"
}, {
  "id": 378,
  "name": "泸州",
  "parent_id": 23,
  "k1": "l",
  "k2": "lz",
  "k3": "luzhou",
  "k4": "",
  "k5": "市",
  "k6": 510500,
  "k7": "0830"
}, {
  "id": 379,
  "name": "德阳",
  "parent_id": 23,
  "k1": "d",
  "k2": "dy",
  "k3": "deyang",
  "k4": "",
  "k5": "市",
  "k6": 510600,
  "k7": "0838"
}, {
  "id": 380,
  "name": "绵阳",
  "parent_id": 23,
  "k1": "m",
  "k2": "my",
  "k3": "mianyang",
  "k4": "",
  "k5": "市",
  "k6": 510700,
  "k7": "0816"
}, {
  "id": 381,
  "name": "广元",
  "parent_id": 23,
  "k1": "g",
  "k2": "gy",
  "k3": "guangyuan",
  "k4": "",
  "k5": "市",
  "k6": 510800,
  "k7": "0839"
}, {
  "id": 382,
  "name": "遂宁",
  "parent_id": 23,
  "k1": "s",
  "k2": "sn",
  "k3": "suining",
  "k4": "",
  "k5": "市",
  "k6": 510900,
  "k7": "0825"
}, {
  "id": 383,
  "name": "内江",
  "parent_id": 23,
  "k1": "n",
  "k2": "nj",
  "k3": "neijiang",
  "k4": "",
  "k5": "市",
  "k6": 511000,
  "k7": ""
}, {
  "id": 384,
  "name": "乐山",
  "parent_id": 23,
  "k1": "l",
  "k2": "ls",
  "k3": "leshan",
  "k4": "",
  "k5": "市",
  "k6": 511100,
  "k7": "0833"
}, {
  "id": 385,
  "name": "南充",
  "parent_id": 23,
  "k1": "n",
  "k2": "nc",
  "k3": "nanchong",
  "k4": "",
  "k5": "市",
  "k6": 511300,
  "k7": "0817"
}, {
  "id": 386,
  "name": "眉山",
  "parent_id": 23,
  "k1": "m",
  "k2": "ms",
  "k3": "meishan",
  "k4": "",
  "k5": "市",
  "k6": 511400,
  "k7": "028"
}, {
  "id": 387,
  "name": "宜宾",
  "parent_id": 23,
  "k1": "y",
  "k2": "yb",
  "k3": "yibin",
  "k4": "",
  "k5": "市",
  "k6": 511500,
  "k7": "0831"
}, {
  "id": 388,
  "name": "广安",
  "parent_id": 23,
  "k1": "g",
  "k2": "ga",
  "k3": "guangan",
  "k4": "",
  "k5": "市",
  "k6": 511600,
  "k7": "0826"
}, {
  "id": 389,
  "name": "达州",
  "parent_id": 23,
  "k1": "d",
  "k2": "dz",
  "k3": "dazhou",
  "k4": "",
  "k5": "市",
  "k6": 511700,
  "k7": "0818"
}, {
  "id": 390,
  "name": "雅安",
  "parent_id": 23,
  "k1": "y",
  "k2": "ya",
  "k3": "yaan",
  "k4": "",
  "k5": "市",
  "k6": 511800,
  "k7": "0835"
}, {
  "id": 391,
  "name": "巴中",
  "parent_id": 23,
  "k1": "b",
  "k2": "bz",
  "k3": "bazhong",
  "k4": "",
  "k5": "市",
  "k6": 511900,
  "k7": "0827"
}, {
  "id": 392,
  "name": "资阳",
  "parent_id": 23,
  "k1": "z",
  "k2": "zy",
  "k3": "ziyang",
  "k4": "",
  "k5": "市",
  "k6": 512000,
  "k7": "028"
}, {
  "id": 393,
  "name": "阿坝",
  "parent_id": 23,
  "k1": "a",
  "k2": "ab",
  "k3": "aba",
  "k4": "藏族羌族",
  "k5": "自治州",
  "k6": 513200,
  "k7": "0837"
}, {
  "id": 394,
  "name": "甘孜",
  "parent_id": 23,
  "k1": "g",
  "k2": "gz",
  "k3": "ganzi",
  "k4": "藏族",
  "k5": "自治州",
  "k6": 513300,
  "k7": "0836"
}, {
  "id": 395,
  "name": "凉山",
  "parent_id": 23,
  "k1": "l",
  "k2": "ls",
  "k3": "liangshan",
  "k4": "彝族",
  "k5": "自治州",
  "k6": 615000,
  "k7": "0834"
}, {
  "id": 396,
  "name": "贵阳",
  "parent_id": 24,
  "k1": "g",
  "k2": "gy",
  "k3": "guiyang",
  "k4": "",
  "k5": "市",
  "k6": 520100,
  "k7": "0851"
}, {
  "id": 397,
  "name": "六盘水",
  "parent_id": 24,
  "k1": "l",
  "k2": "lps",
  "k3": "liupanshui",
  "k4": "",
  "k5": "市",
  "k6": 520200,
  "k7": "0858"
}, {
  "id": 398,
  "name": "遵义",
  "parent_id": 24,
  "k1": "z",
  "k2": "zy",
  "k3": "zunyi",
  "k4": "",
  "k5": "市",
  "k6": 520300,
  "k7": "0852"
}, {
  "id": 399,
  "name": "安顺",
  "parent_id": 24,
  "k1": "a",
  "k2": "as",
  "k3": "anshun",
  "k4": "",
  "k5": "市",
  "k6": 520400,
  "k7": "0853"
}, {
  "id": 400,
  "name": "毕节",
  "parent_id": 24,
  "k1": "b",
  "k2": "bj",
  "k3": "bijie",
  "k4": "",
  "k5": "市",
  "k6": 520500,
  "k7": "0857"
}, {
  "id": 401,
  "name": "铜仁",
  "parent_id": 24,
  "k1": "t",
  "k2": "tr",
  "k3": "tongren",
  "k4": "",
  "k5": "市",
  "k6": 520600,
  "k7": "0856"
}, {
  "id": 402,
  "name": "黔西南",
  "parent_id": 24,
  "k1": "q",
  "k2": "qxn",
  "k3": "qianxinan",
  "k4": "布依族苗族",
  "k5": "自治州",
  "k6": 522300,
  "k7": "0859"
}, {
  "id": 403,
  "name": "黔东南",
  "parent_id": 24,
  "k1": "q",
  "k2": "qdn",
  "k3": "qiandongnan",
  "k4": "苗族侗族",
  "k5": "自治州",
  "k6": 522600,
  "k7": "0855"
}, {
  "id": 404,
  "name": "黔南",
  "parent_id": 24,
  "k1": "q",
  "k2": "qn",
  "k3": "qiannan",
  "k4": "布依族苗族",
  "k5": "自治州",
  "k6": 522700,
  "k7": "0854"
}, {
  "id": 405,
  "name": "昆明",
  "parent_id": 25,
  "k1": "k",
  "k2": "km",
  "k3": "kunming",
  "k4": "",
  "k5": "市",
  "k6": 530100,
  "k7": "0871"
}, {
  "id": 406,
  "name": "曲靖",
  "parent_id": 25,
  "k1": "q",
  "k2": "qj",
  "k3": "qujing",
  "k4": "",
  "k5": "市",
  "k6": 530300,
  "k7": "0874"
}, {
  "id": 407,
  "name": "玉溪",
  "parent_id": 25,
  "k1": "y",
  "k2": "yx",
  "k3": "yuxi",
  "k4": "",
  "k5": "市",
  "k6": 530400,
  "k7": "0877"
}, {
  "id": 408,
  "name": "昭通",
  "parent_id": 25,
  "k1": "z",
  "k2": "zt",
  "k3": "zhaotong",
  "k4": "",
  "k5": "市",
  "k6": 530600,
  "k7": "0870"
}, {
  "id": 409,
  "name": "丽江",
  "parent_id": 25,
  "k1": "l",
  "k2": "lj",
  "k3": "lijiang",
  "k4": "",
  "k5": "市",
  "k6": 530700,
  "k7": "0888"
}, {
  "id": 410,
  "name": "普洱",
  "parent_id": 25,
  "k1": "p",
  "k2": "pe",
  "k3": "puer",
  "k4": "",
  "k5": "市",
  "k6": 530800,
  "k7": "0879"
}, {
  "id": 411,
  "name": "临沧",
  "parent_id": 25,
  "k1": "l",
  "k2": "lc",
  "k3": "lincang",
  "k4": "",
  "k5": "市",
  "k6": 530900,
  "k7": "0883"
}, {
  "id": 412,
  "name": "楚雄",
  "parent_id": 25,
  "k1": "c",
  "k2": "cx",
  "k3": "chuxiong",
  "k4": "彝族",
  "k5": "自治州",
  "k6": 532300,
  "k7": "0878"
}, {
  "id": 413,
  "name": "红河",
  "parent_id": 25,
  "k1": "h",
  "k2": "hh",
  "k3": "honghe",
  "k4": "哈尼族彝族",
  "k5": "自治州",
  "k6": 532500,
  "k7": "0873"
}, {
  "id": 414,
  "name": "文山",
  "parent_id": 25,
  "k1": "w",
  "k2": "ws",
  "k3": "wenshan",
  "k4": "壮族苗族",
  "k5": "自治州",
  "k6": 532600,
  "k7": "0876"
}, {
  "id": 415,
  "name": "西双版纳",
  "parent_id": 25,
  "k1": "x",
  "k2": "xsbn",
  "k3": "xishuangbanna",
  "k4": "傣族",
  "k5": "自治州",
  "k6": 532800,
  "k7": "0691"
}, {
  "id": 416,
  "name": "大理",
  "parent_id": 25,
  "k1": "d",
  "k2": "dl",
  "k3": "dali",
  "k4": "白族",
  "k5": "自治州",
  "k6": 532900,
  "k7": "0872"
}, {
  "id": 417,
  "name": "德宏",
  "parent_id": 25,
  "k1": "d",
  "k2": "dh",
  "k3": "dehong",
  "k4": "傣族景颇族",
  "k5": "自治州",
  "k6": 533100,
  "k7": "0692"
}, {
  "id": 418,
  "name": "怒江",
  "parent_id": 25,
  "k1": "n",
  "k2": "nj",
  "k3": "nujiang",
  "k4": "傈僳族",
  "k5": "自治州",
  "k6": 533300,
  "k7": "0886"
}, {
  "id": 419,
  "name": "迪庆",
  "parent_id": 25,
  "k1": "d",
  "k2": "dq",
  "k3": "diqing",
  "k4": "藏族",
  "k5": "自治州",
  "k6": 533400,
  "k7": "0887"
}, {
  "id": 420,
  "name": "保山",
  "parent_id": 25,
  "k1": "b",
  "k2": "bs",
  "k3": "baoshan",
  "k4": "",
  "k5": "市",
  "k6": 678000,
  "k7": "0875"
}, {
  "id": 421,
  "name": "拉萨",
  "parent_id": 26,
  "k1": "l",
  "k2": "ls",
  "k3": "lasa",
  "k4": "",
  "k5": "市",
  "k6": 540100,
  "k7": "0891"
}, {
  "id": 422,
  "name": "昌都",
  "parent_id": 26,
  "k1": "c",
  "k2": "cd",
  "k3": "changdu",
  "k4": "",
  "k5": "市",
  "k6": 542100,
  "k7": "0895"
}, {
  "id": 423,
  "name": "山南",
  "parent_id": 26,
  "k1": "s",
  "k2": "sn",
  "k3": "shannan",
  "k4": "",
  "k5": "市",
  "k6": 540500,
  "k7": "0893"
}, {
  "id": 424,
  "name": "日喀则",
  "parent_id": 26,
  "k1": "r",
  "k2": "rkz",
  "k3": "rikaze",
  "k4": "",
  "k5": "市",
  "k6": 542300,
  "k7": "0892"
}, {
  "id": 425,
  "name": "那曲",
  "parent_id": 26,
  "k1": "n",
  "k2": "nq",
  "k3": "neiqu",
  "k4": "",
  "k5": "市",
  "k6": 540600,
  "k7": "0896"
}, {
  "id": 426,
  "name": "阿里",
  "parent_id": 26,
  "k1": "a",
  "k2": "al",
  "k3": "ali",
  "k4": "",
  "k5": "地区",
  "k6": 542500,
  "k7": "0897"
}, {
  "id": 427,
  "name": "林芝",
  "parent_id": 26,
  "k1": "l",
  "k2": "lz",
  "k3": "linzhi",
  "k4": "",
  "k5": "市",
  "k6": 540400,
  "k7": "0894"
}, {
  "id": 428,
  "name": "西安",
  "parent_id": 27,
  "k1": "x",
  "k2": "xa",
  "k3": "xian",
  "k4": "",
  "k5": "市",
  "k6": 610100,
  "k7": "029"
}, {
  "id": 429,
  "name": "铜川",
  "parent_id": 27,
  "k1": "t",
  "k2": "tc",
  "k3": "tongchuan",
  "k4": "",
  "k5": "市",
  "k6": 610200,
  "k7": "0919"
}, {
  "id": 430,
  "name": "宝鸡",
  "parent_id": 27,
  "k1": "b",
  "k2": "bj",
  "k3": "baoji",
  "k4": "",
  "k5": "市",
  "k6": 610300,
  "k7": "0917"
}, {
  "id": 431,
  "name": "咸阳",
  "parent_id": 27,
  "k1": "x",
  "k2": "xy",
  "k3": "xianyang",
  "k4": "",
  "k5": "市",
  "k6": 610400,
  "k7": "029"
}, {
  "id": 432,
  "name": "渭南",
  "parent_id": 27,
  "k1": "w",
  "k2": "wn",
  "k3": "weinan",
  "k4": "",
  "k5": "市",
  "k6": 610500,
  "k7": "0913"
}, {
  "id": 433,
  "name": "延安",
  "parent_id": 27,
  "k1": "y",
  "k2": "ya",
  "k3": "yanan",
  "k4": "",
  "k5": "市",
  "k6": 610600,
  "k7": "0911"
}, {
  "id": 434,
  "name": "汉中",
  "parent_id": 27,
  "k1": "h",
  "k2": "hz",
  "k3": "hanzhong",
  "k4": "",
  "k5": "市",
  "k6": 610700,
  "k7": "0916"
}, {
  "id": 435,
  "name": "榆林",
  "parent_id": 27,
  "k1": "y",
  "k2": "yl",
  "k3": "yulin",
  "k4": "",
  "k5": "市",
  "k6": 610800,
  "k7": "0912"
}, {
  "id": 436,
  "name": "安康",
  "parent_id": 27,
  "k1": "a",
  "k2": "ak",
  "k3": "ankang",
  "k4": "",
  "k5": "市",
  "k6": 610900,
  "k7": "0915"
}, {
  "id": 437,
  "name": "商洛",
  "parent_id": 27,
  "k1": "s",
  "k2": "sl",
  "k3": "shangluo",
  "k4": "",
  "k5": "市",
  "k6": 611000,
  "k7": "0914"
}, {
  "id": 438,
  "name": "兰州",
  "parent_id": 28,
  "k1": "l",
  "k2": "lz",
  "k3": "lanzhou",
  "k4": "",
  "k5": "市",
  "k6": 620100,
  "k7": "0931"
}, {
  "id": 439,
  "name": "嘉峪关",
  "parent_id": 28,
  "k1": "j",
  "k2": "jyg",
  "k3": "jiayuguan",
  "k4": "",
  "k5": "市",
  "k6": 620200,
  "k7": "0937"
}, {
  "id": 440,
  "name": "金昌",
  "parent_id": 28,
  "k1": "j",
  "k2": "jc",
  "k3": "jinchang",
  "k4": "",
  "k5": "市",
  "k6": 620300,
  "k7": "0935"
}, {
  "id": 441,
  "name": "白银",
  "parent_id": 28,
  "k1": "b",
  "k2": "by",
  "k3": "baiyin",
  "k4": "",
  "k5": "市",
  "k6": 620400,
  "k7": "0943"
}, {
  "id": 442,
  "name": "天水",
  "parent_id": 28,
  "k1": "t",
  "k2": "ts",
  "k3": "tianshui",
  "k4": "",
  "k5": "市",
  "k6": 620500,
  "k7": "0938"
}, {
  "id": 443,
  "name": "武威",
  "parent_id": 28,
  "k1": "w",
  "k2": "ww",
  "k3": "wuwei",
  "k4": "",
  "k5": "市",
  "k6": 620600,
  "k7": "0935"
}, {
  "id": 444,
  "name": "张掖",
  "parent_id": 28,
  "k1": "z",
  "k2": "zy",
  "k3": "zhangye",
  "k4": "",
  "k5": "市",
  "k6": 620700,
  "k7": "0936"
}, {
  "id": 445,
  "name": "平凉",
  "parent_id": 28,
  "k1": "p",
  "k2": "pl",
  "k3": "pingliang",
  "k4": "",
  "k5": "市",
  "k6": 620800,
  "k7": "0933"
}, {
  "id": 446,
  "name": "酒泉",
  "parent_id": 28,
  "k1": "j",
  "k2": "jq",
  "k3": "jiuquan",
  "k4": "",
  "k5": "市",
  "k6": 620900,
  "k7": "0937"
}, {
  "id": 447,
  "name": "庆阳",
  "parent_id": 28,
  "k1": "q",
  "k2": "qy",
  "k3": "qingyang",
  "k4": "",
  "k5": "市",
  "k6": 621000,
  "k7": "0934"
}, {
  "id": 448,
  "name": "定西",
  "parent_id": 28,
  "k1": "d",
  "k2": "dx",
  "k3": "dingxi",
  "k4": "",
  "k5": "市",
  "k6": 621100,
  "k7": "0932"
}, {
  "id": 449,
  "name": "陇南",
  "parent_id": 28,
  "k1": "l",
  "k2": "ln",
  "k3": "longnan",
  "k4": "",
  "k5": "市",
  "k6": 621200,
  "k7": "0939"
}, {
  "id": 450,
  "name": "临夏",
  "parent_id": 28,
  "k1": "l",
  "k2": "lx",
  "k3": "linxia",
  "k4": "回族",
  "k5": "自治州",
  "k6": 622900,
  "k7": "0930"
}, {
  "id": 451,
  "name": "甘南",
  "parent_id": 28,
  "k1": "g",
  "k2": "gn",
  "k3": "gannan",
  "k4": "藏族",
  "k5": "自治州",
  "k6": 623000,
  "k7": "0941"
}, {
  "id": 452,
  "name": "西宁",
  "parent_id": 29,
  "k1": "x",
  "k2": "xn",
  "k3": "xining",
  "k4": "",
  "k5": "市",
  "k6": 630100,
  "k7": "0971"
}, {
  "id": 453,
  "name": "海东",
  "parent_id": 29,
  "k1": "h",
  "k2": "hd",
  "k3": "haidong",
  "k4": "",
  "k5": "市",
  "k6": 632100,
  "k7": "0972"
}, {
  "id": 454,
  "name": "海北",
  "parent_id": 29,
  "k1": "h",
  "k2": "hb",
  "k3": "haibei",
  "k4": "藏族",
  "k5": "自治州",
  "k6": 632200,
  "k7": "0970"
}, {
  "id": 455,
  "name": "黄南",
  "parent_id": 29,
  "k1": "h",
  "k2": "hn",
  "k3": "huangnan",
  "k4": "藏族",
  "k5": "自治州",
  "k6": 632300,
  "k7": "0973"
}, {
  "id": 456,
  "name": "海南",
  "parent_id": 29,
  "k1": "h",
  "k2": "hn",
  "k3": "hainan",
  "k4": "藏族",
  "k5": "自治州",
  "k6": 632500,
  "k7": "0974"
}, {
  "id": 457,
  "name": "果洛",
  "parent_id": 29,
  "k1": "g",
  "k2": "gl",
  "k3": "guoluo",
  "k4": "藏族",
  "k5": "自治州",
  "k6": 632600,
  "k7": "0975"
}, {
  "id": 458,
  "name": "玉树",
  "parent_id": 29,
  "k1": "y",
  "k2": "ys",
  "k3": "yushu",
  "k4": "藏族",
  "k5": "自治州",
  "k6": 632700,
  "k7": "0976"
}, {
  "id": 459,
  "name": "海西",
  "parent_id": 29,
  "k1": "h",
  "k2": "hx",
  "k3": "haixi",
  "k4": "蒙古族藏族",
  "k5": "自治州",
  "k6": 632800,
  "k7": "0977"
}, {
  "id": 460,
  "name": "银川",
  "parent_id": 30,
  "k1": "y",
  "k2": "yc",
  "k3": "yinchuan",
  "k4": "",
  "k5": "市",
  "k6": 640100,
  "k7": "0951"
}, {
  "id": 461,
  "name": "石嘴山",
  "parent_id": 30,
  "k1": "s",
  "k2": "szs",
  "k3": "shizuishan",
  "k4": "",
  "k5": "市",
  "k6": 640200,
  "k7": "0952"
}, {
  "id": 462,
  "name": "吴忠",
  "parent_id": 30,
  "k1": "w",
  "k2": "wz",
  "k3": "wuzhong",
  "k4": "",
  "k5": "市",
  "k6": 640300,
  "k7": "0953"
}, {
  "id": 463,
  "name": "固原",
  "parent_id": 30,
  "k1": "g",
  "k2": "gy",
  "k3": "guyuan",
  "k4": "",
  "k5": "市",
  "k6": 640400,
  "k7": "0954"
}, {
  "id": 464,
  "name": "中卫",
  "parent_id": 30,
  "k1": "z",
  "k2": "zw",
  "k3": "zhongwei",
  "k4": "",
  "k5": "市",
  "k6": 640500,
  "k7": ""
}, {
  "id": 465,
  "name": "乌鲁木齐",
  "parent_id": 31,
  "k1": "w",
  "k2": "wlmq",
  "k3": "wulumuqi",
  "k4": "",
  "k5": "市",
  "k6": 650100,
  "k7": "0991"
}, {
  "id": 466,
  "name": "克拉玛依",
  "parent_id": 31,
  "k1": "k",
  "k2": "klmy",
  "k3": "kelamayi",
  "k4": "",
  "k5": "市",
  "k6": 650200,
  "k7": "0990"
}, {
  "id": 467,
  "name": "吐鲁番",
  "parent_id": 31,
  "k1": "t",
  "k2": "tlf",
  "k3": "tulufan",
  "k4": "",
  "k5": "市",
  "k6": 652100,
  "k7": "0995"
}, {
  "id": 468,
  "name": "哈密",
  "parent_id": 31,
  "k1": "h",
  "k2": "hm",
  "k3": "hami",
  "k4": "",
  "k5": "市",
  "k6": 652200,
  "k7": "0902"
}, {
  "id": 469,
  "name": "昌吉",
  "parent_id": 31,
  "k1": "c",
  "k2": "cj",
  "k3": "changji",
  "k4": "",
  "k5": "自治州",
  "k6": 652300,
  "k7": "0994"
}, {
  "id": 470,
  "name": "博尔塔拉",
  "parent_id": 31,
  "k1": "b",
  "k2": "betl",
  "k3": "boertala",
  "k4": "蒙古",
  "k5": "自治州",
  "k6": 652700,
  "k7": "0909"
}, {
  "id": 471,
  "name": "巴音郭楞",
  "parent_id": 31,
  "k1": "b",
  "k2": "bygl",
  "k3": "bayinguoleng",
  "k4": "蒙古",
  "k5": "自治州",
  "k6": 652800,
  "k7": "0996"
}, {
  "id": 472,
  "name": "阿克苏",
  "parent_id": 31,
  "k1": "a",
  "k2": "aks",
  "k3": "akesu",
  "k4": "柯尔克孜",
  "k5": "地区",
  "k6": 652900,
  "k7": "0997"
}, {
  "id": 473,
  "name": "克孜勒苏",
  "parent_id": 31,
  "k1": "k",
  "k2": "kzls",
  "k3": "kezilesu",
  "k4": "",
  "k5": "自治州",
  "k6": 653000,
  "k7": "0908"
}, {
  "id": 474,
  "name": "喀什",
  "parent_id": 31,
  "k1": "k",
  "k2": "ks",
  "k3": "kashi",
  "k4": "",
  "k5": "地区",
  "k6": 653100,
  "k7": "0998"
}, {
  "id": 475,
  "name": "和田",
  "parent_id": 31,
  "k1": "h",
  "k2": "ht",
  "k3": "hetian",
  "k4": "哈萨克",
  "k5": "地区",
  "k6": 653200,
  "k7": "0903"
}, {
  "id": 476,
  "name": "伊犁",
  "parent_id": 31,
  "k1": "y",
  "k2": "yl",
  "k3": "yili",
  "k4": "",
  "k5": "自治州",
  "k6": 654000,
  "k7": "0999"
}, {
  "id": 477,
  "name": "塔城",
  "parent_id": 31,
  "k1": "t",
  "k2": "tc",
  "k3": "tacheng",
  "k4": "",
  "k5": "地区",
  "k6": 654200,
  "k7": "0901"
}, {
  "id": 478,
  "name": "阿勒泰",
  "parent_id": 31,
  "k1": "a",
  "k2": "alt",
  "k3": "aletai",
  "k4": "",
  "k5": "地区",
  "k6": 654300,
  "k7": "0906"
}, {
  "id": 479,
  "name": "石河子",
  "parent_id": 31,
  "k1": "s",
  "k2": "shz",
  "k3": "shihezi",
  "k4": "",
  "k5": "市",
  "k6": 659001,
  "k7": "0993"
}, {
  "id": 480,
  "name": "阿拉尔",
  "parent_id": 31,
  "k1": "a",
  "k2": "ale",
  "k3": "alaer",
  "k4": "",
  "k5": "市",
  "k6": 659002,
  "k7": "0997"
}, {
  "id": 481,
  "name": "图木舒克",
  "parent_id": 31,
  "k1": "t",
  "k2": "tmsk",
  "k3": "tumushuke",
  "k4": "",
  "k5": "市",
  "k6": 659003,
  "k7": "0998"
}, {
  "id": 482,
  "name": "五家渠",
  "parent_id": 31,
  "k1": "w",
  "k2": "wjq",
  "k3": "wujiaqu",
  "k4": "",
  "k5": "市",
  "k6": 659004,
  "k7": "0994"
}, {
  "id": 483,
  "name": "北屯",
  "parent_id": 31,
  "k1": "b",
  "k2": "bt",
  "k3": "beitun",
  "k4": "",
  "k5": "市",
  "k6": 659005,
  "k7": "0906"
}, {
  "id": 484,
  "name": "铁门关",
  "parent_id": 31,
  "k1": "t",
  "k2": "tmg",
  "k3": "tiemenguan",
  "k4": "",
  "k5": "市",
  "k6": 659006,
  "k7": "0996"
}, {
  "id": 485,
  "name": "台北",
  "parent_id": 32,
  "k1": "t",
  "k2": "tb",
  "k3": "taibei",
  "k4": "",
  "k5": "市",
  "k6": 63,
  "k7": "02"
}, {
  "id": 486,
  "name": "高雄",
  "parent_id": 32,
  "k1": "g",
  "k2": "gx",
  "k3": "gaoxiong",
  "k4": "",
  "k5": "市",
  "k6": 64,
  "k7": "07"
}, {
  "id": 487,
  "name": "基隆",
  "parent_id": 32,
  "k1": "j",
  "k2": "jl",
  "k3": "jilong",
  "k4": "",
  "k5": "市",
  "k6": 10017,
  "k7": "02"
}, {
  "id": 488,
  "name": "台中",
  "parent_id": 32,
  "k1": "t",
  "k2": "tz",
  "k3": "taizhong",
  "k4": "",
  "k5": "市",
  "k6": 10019,
  "k7": "04"
}, {
  "id": 489,
  "name": "台南",
  "parent_id": 32,
  "k1": "t",
  "k2": "tn",
  "k3": "tainan",
  "k4": "",
  "k5": "市",
  "k6": 10021,
  "k7": "06"
}, {
  "id": 490,
  "name": "新竹",
  "parent_id": 32,
  "k1": "x",
  "k2": "xz",
  "k3": "xinzhu",
  "k4": "",
  "k5": "市",
  "k6": 10018,
  "k7": ""
}, {
  "id": 491,
  "name": "嘉义",
  "parent_id": 32,
  "k1": "j",
  "k2": "jy",
  "k3": "jiayi",
  "k4": "",
  "k5": "市",
  "k6": 10020,
  "k7": "05"
}, {
  "id": 492,
  "name": "新北",
  "parent_id": 32,
  "k1": "x",
  "k2": "xb",
  "k3": "xinbei",
  "k4": "",
  "k5": "市",
  "k6": "",
  "k7": ""
}, {
  "id": 493,
  "name": "宜兰",
  "parent_id": 32,
  "k1": "y",
  "k2": "yl",
  "k3": "yilan",
  "k4": "",
  "k5": "县",
  "k6": 10002,
  "k7": ""
}, {
  "id": 494,
  "name": "桃园",
  "parent_id": 32,
  "k1": "t",
  "k2": "ty",
  "k3": "taoyuan",
  "k4": "",
  "k5": "县",
  "k6": 10003,
  "k7": ""
}, {
  "id": 495,
  "name": "新竹",
  "parent_id": 32,
  "k1": "x",
  "k2": "xz",
  "k3": "xinzhu",
  "k4": "",
  "k5": "县",
  "k6": 10004,
  "k7": ""
}, {
  "id": 496,
  "name": "苗栗",
  "parent_id": 32,
  "k1": "m",
  "k2": "ml",
  "k3": "miaoli",
  "k4": "",
  "k5": "县",
  "k6": 10005,
  "k7": ""
}, {
  "id": 497,
  "name": "彰化",
  "parent_id": 32,
  "k1": "z",
  "k2": "zh",
  "k3": "zhanghua",
  "k4": "",
  "k5": "县",
  "k6": 10007,
  "k7": ""
}, {
  "id": 498,
  "name": "南投",
  "parent_id": 32,
  "k1": "n",
  "k2": "nt",
  "k3": "nantou",
  "k4": "",
  "k5": "县",
  "k6": 10008,
  "k7": ""
}, {
  "id": 499,
  "name": "云林",
  "parent_id": 32,
  "k1": "y",
  "k2": "yl",
  "k3": "yunlin",
  "k4": "",
  "k5": "县",
  "k6": 10009,
  "k7": ""
}, {
  "id": 500,
  "name": "嘉义",
  "parent_id": 32,
  "k1": "j",
  "k2": "jy",
  "k3": "jiayi",
  "k4": "",
  "k5": "县",
  "k6": 10020,
  "k7": ""
}, {
  "id": 501,
  "name": "屏东",
  "parent_id": 32,
  "k1": "p",
  "k2": "pd",
  "k3": "pingdong",
  "k4": "",
  "k5": "县",
  "k6": 10013,
  "k7": ""
}, {
  "id": 502,
  "name": "台东",
  "parent_id": 32,
  "k1": "t",
  "k2": "td",
  "k3": "taidong",
  "k4": "",
  "k5": "县",
  "k6": 10014,
  "k7": ""
}, {
  "id": 503,
  "name": "花莲",
  "parent_id": 32,
  "k1": "h",
  "k2": "hl",
  "k3": "hualian",
  "k4": "",
  "k5": "县",
  "k6": 10015,
  "k7": ""
}, {
  "id": 504,
  "name": "澎湖",
  "parent_id": 32,
  "k1": "p",
  "k2": "ph",
  "k3": "penghu",
  "k4": "",
  "k5": "县",
  "k6": 10016,
  "k7": "07"
}, {
  "id": 505,
  "name": "连江",
  "parent_id": 32,
  "k1": "l",
  "k2": "lj",
  "k3": "lianjiang",
  "k4": "",
  "k5": "县",
  "k6": "",
  "k7": ""
}, {
  "id": 506,
  "name": "金门",
  "parent_id": 32,
  "k1": "j",
  "k2": "jm",
  "k3": "jinmen",
  "k4": "",
  "k5": "县",
  "k6": "",
  "k7": ""
}, {
  "id": 507,
  "name": "中西",
  "parent_id": 33,
  "k1": "z",
  "k2": "zx",
  "k3": "zhongxi",
  "k4": "",
  "k5": "区",
  "k6": "",
  "k7": 852
}, {
  "id": 508,
  "name": "葵青",
  "parent_id": 33,
  "k1": "k",
  "k2": "kq",
  "k3": "kuiqing",
  "k4": "",
  "k5": "区",
  "k6": "",
  "k7": 852
}, {
  "id": 509,
  "name": "元朗",
  "parent_id": 33,
  "k1": "y",
  "k2": "yl",
  "k3": "yuanlang",
  "k4": "",
  "k5": "区",
  "k6": "",
  "k7": 852
}, {
  "id": 510,
  "name": "屯门",
  "parent_id": 33,
  "k1": "t",
  "k2": "tm",
  "k3": "tunmen",
  "k4": "",
  "k5": "区",
  "k6": "",
  "k7": 852
}, {
  "id": 511,
  "name": "荃湾",
  "parent_id": 33,
  "k1": "q",
  "k2": "qw",
  "k3": "quanwan",
  "k4": "",
  "k5": "区",
  "k6": "",
  "k7": 852
}, {
  "id": 512,
  "name": "西贡",
  "parent_id": 33,
  "k1": "x",
  "k2": "xg",
  "k3": "xigong",
  "k4": "",
  "k5": "区",
  "k6": "",
  "k7": 852
}, {
  "id": 513,
  "name": "沙田",
  "parent_id": 33,
  "k1": "s",
  "k2": "st",
  "k3": "shatian",
  "k4": "",
  "k5": "区",
  "k6": "",
  "k7": 852
}, {
  "id": 514,
  "name": "大埔",
  "parent_id": 33,
  "k1": "d",
  "k2": "dp",
  "k3": "dapu",
  "k4": "",
  "k5": "区",
  "k6": "",
  "k7": 852
}, {
  "id": 515,
  "name": "北区",
  "parent_id": 33,
  "k1": "b",
  "k2": "bq",
  "k3": "beiqu",
  "k4": "",
  "k5": "",
  "k6": "",
  "k7": 852
}, {
  "id": 516,
  "name": "观塘",
  "parent_id": 33,
  "k1": "g",
  "k2": "gt",
  "k3": "guantang",
  "k4": "",
  "k5": "区",
  "k6": "",
  "k7": 852
}, {
  "id": 517,
  "name": "黄大仙",
  "parent_id": 33,
  "k1": "h",
  "k2": "hdx",
  "k3": "huangdaxian",
  "k4": "",
  "k5": "区",
  "k6": "",
  "k7": 852
}, {
  "id": 518,
  "name": "深水埗",
  "parent_id": 33,
  "k1": "s",
  "k2": "ssb",
  "k3": "shenshuibu",
  "k4": "",
  "k5": "区",
  "k6": "",
  "k7": 852
}, {
  "id": 519,
  "name": "油尖旺",
  "parent_id": 33,
  "k1": "y",
  "k2": "yjw",
  "k3": "youjianwang",
  "k4": "",
  "k5": "区",
  "k6": "",
  "k7": 852
}, {
  "id": 520,
  "name": "九龙城",
  "parent_id": 33,
  "k1": "j",
  "k2": "jlc",
  "k3": "jiulongcheng",
  "k4": "",
  "k5": "区",
  "k6": "",
  "k7": 852
}, {
  "id": 521,
  "name": "南区",
  "parent_id": 33,
  "k1": "n",
  "k2": "nq",
  "k3": "nanqu",
  "k4": "",
  "k5": "",
  "k6": "",
  "k7": 852
}, {
  "id": 522,
  "name": "东区",
  "parent_id": 33,
  "k1": "d",
  "k2": "dq",
  "k3": "dongqu",
  "k4": "",
  "k5": "",
  "k6": "",
  "k7": 852
}, {
  "id": 523,
  "name": "湾仔",
  "parent_id": 33,
  "k1": "w",
  "k2": "wz",
  "k3": "wanzi",
  "k4": "",
  "k5": "区",
  "k6": "",
  "k7": 852
}, {
  "id": 524,
  "name": "离岛",
  "parent_id": 33,
  "k1": "l",
  "k2": "ld",
  "k3": "lidao",
  "k4": "",
  "k5": "区",
  "k6": "",
  "k7": 852
}, {
  "id": 525,
  "name": "花地玛",
  "parent_id": 34,
  "k1": "h",
  "k2": "hdm",
  "k3": "huadima",
  "k4": "",
  "k5": "堂区",
  "k6": "",
  "k7": 853
}, {
  "id": 526,
  "name": "圣安多",
  "parent_id": 34,
  "k1": "s",
  "k2": "sad",
  "k3": "shenganduo",
  "k4": "",
  "k5": "堂区",
  "k6": "",
  "k7": 853
}, {
  "id": 527,
  "name": "大堂区",
  "parent_id": 34,
  "k1": "d",
  "k2": "dtq",
  "k3": "datangqu",
  "k4": "",
  "k5": "堂区",
  "k6": "",
  "k7": 853
}, {
  "id": 528,
  "name": "望德",
  "parent_id": 34,
  "k1": "w",
  "k2": "wd",
  "k3": "wangde",
  "k4": "",
  "k5": "堂区",
  "k6": "",
  "k7": 853
}, {
  "id": 529,
  "name": "风顺",
  "parent_id": 34,
  "k1": "f",
  "k2": "fs",
  "k3": "fengshun",
  "k4": "",
  "k5": "堂区",
  "k6": "",
  "k7": 853
}, {
  "id": 530,
  "name": "嘉模",
  "parent_id": 34,
  "k1": "j",
  "k2": "jm",
  "k3": "jiamo",
  "k4": "",
  "k5": "堂区",
  "k6": "",
  "k7": 853
}, {
  "id": 531,
  "name": "圣方济各",
  "parent_id": 34,
  "k1": "s",
  "k2": "sfjg",
  "k3": "shengfangjige",
  "k4": "",
  "k5": "堂区",
  "k6": "",
  "k7": 853
}, {
  "id": 532,
  "name": "路氹城",
  "parent_id": 34,
  "k1": "l",
  "k2": "ldc",
  "k3": "ludangcheng",
  "k4": "",
  "k5": "",
  "k6": "",
  "k7": 853
}, {
  "id": 533,
  "name": "长安",
  "parent_id": 125,
  "k1": "c",
  "k2": "ca",
  "k3": "changan",
  "k4": "",
  "k5": "区",
  "k6": 130102,
  "k7": "0311"
}, {
  "id": 535,
  "name": "桥西",
  "parent_id": 125,
  "k1": "q",
  "k2": "qx",
  "k3": "qiaoxi",
  "k4": "",
  "k5": "区",
  "k6": 130104,
  "k7": "0311"
}, {
  "id": 536,
  "name": "新华",
  "parent_id": 125,
  "k1": "x",
  "k2": "xh",
  "k3": "xinhua",
  "k4": "",
  "k5": "区",
  "k6": 130105,
  "k7": "0311"
}, {
  "id": 537,
  "name": "井陉矿",
  "parent_id": 125,
  "k1": "j",
  "k2": "jxk",
  "k3": "jingxingkuang",
  "k4": "",
  "k5": "区",
  "k6": 130107,
  "k7": "0311"
}, {
  "id": 538,
  "name": "裕华",
  "parent_id": 125,
  "k1": "y",
  "k2": "yh",
  "k3": "yuhua",
  "k4": "",
  "k5": "区",
  "k6": 130108,
  "k7": "0311"
}, {
  "id": 539,
  "name": "井陉",
  "parent_id": 125,
  "k1": "j",
  "k2": "jx",
  "k3": "jingxing",
  "k4": "",
  "k5": "县",
  "k6": 130121,
  "k7": "0311"
}, {
  "id": 540,
  "name": "正定",
  "parent_id": 125,
  "k1": "z",
  "k2": "zd",
  "k3": "zhengding",
  "k4": "",
  "k5": "县",
  "k6": 130123,
  "k7": "0311"
}, {
  "id": 541,
  "name": "栾城",
  "parent_id": 125,
  "k1": "l",
  "k2": "lc",
  "k3": "luancheng",
  "k4": "",
  "k5": "区",
  "k6": 130111,
  "k7": "0311"
}, {
  "id": 542,
  "name": "行唐",
  "parent_id": 125,
  "k1": "x",
  "k2": "xt",
  "k3": "xingtang",
  "k4": "",
  "k5": "县",
  "k6": 130125,
  "k7": "0311"
}, {
  "id": 543,
  "name": "灵寿",
  "parent_id": 125,
  "k1": "l",
  "k2": "ls",
  "k3": "lingshou",
  "k4": "",
  "k5": "县",
  "k6": 130126,
  "k7": "0311"
}, {
  "id": 544,
  "name": "高邑",
  "parent_id": 125,
  "k1": "g",
  "k2": "gy",
  "k3": "gaoyi",
  "k4": "",
  "k5": "县",
  "k6": 130127,
  "k7": "0311"
}, {
  "id": 545,
  "name": "深泽",
  "parent_id": 125,
  "k1": "s",
  "k2": "sz",
  "k3": "shenze",
  "k4": "",
  "k5": "县",
  "k6": 130128,
  "k7": "0311"
}, {
  "id": 546,
  "name": "赞皇",
  "parent_id": 125,
  "k1": "z",
  "k2": "zh",
  "k3": "zanhuang",
  "k4": "",
  "k5": "县",
  "k6": 130129,
  "k7": "0311"
}, {
  "id": 547,
  "name": "无极",
  "parent_id": 125,
  "k1": "w",
  "k2": "wj",
  "k3": "wuji",
  "k4": "",
  "k5": "县",
  "k6": 130130,
  "k7": "0311"
}, {
  "id": 548,
  "name": "平山",
  "parent_id": 125,
  "k1": "p",
  "k2": "ps",
  "k3": "pingshan",
  "k4": "",
  "k5": "县",
  "k6": 130131,
  "k7": "0311"
}, {
  "id": 549,
  "name": "元氏",
  "parent_id": 125,
  "k1": "y",
  "k2": "ys",
  "k3": "yuanshi",
  "k4": "",
  "k5": "县",
  "k6": 130132,
  "k7": "0311"
}, {
  "id": 550,
  "name": "赵县",
  "parent_id": 125,
  "k1": "z",
  "k2": "zx",
  "k3": "zhaoxian",
  "k4": "",
  "k5": "",
  "k6": 130133,
  "k7": "0311"
}, {
  "id": 551,
  "name": "辛集",
  "parent_id": 125,
  "k1": "x",
  "k2": "xj",
  "k3": "xinji",
  "k4": "",
  "k5": "市",
  "k6": 130181,
  "k7": "0311"
}, {
  "id": 552,
  "name": "藁城",
  "parent_id": 125,
  "k1": "g",
  "k2": "gc",
  "k3": "gaocheng",
  "k4": "",
  "k5": "区",
  "k6": 130109,
  "k7": "0311"
}, {
  "id": 553,
  "name": "晋州",
  "parent_id": 125,
  "k1": "j",
  "k2": "jz",
  "k3": "jinzhou",
  "k4": "",
  "k5": "市",
  "k6": 130183,
  "k7": "0311"
}, {
  "id": 554,
  "name": "新乐",
  "parent_id": 125,
  "k1": "x",
  "k2": "xl",
  "k3": "xinle",
  "k4": "",
  "k5": "市",
  "k6": 130184,
  "k7": "0311"
}, {
  "id": 555,
  "name": "鹿泉",
  "parent_id": 125,
  "k1": "l",
  "k2": "lq",
  "k3": "luquan",
  "k4": "",
  "k5": "区",
  "k6": 130110,
  "k7": "0311"
}, {
  "id": 556,
  "name": "路南",
  "parent_id": 126,
  "k1": "l",
  "k2": "ln",
  "k3": "lunan",
  "k4": "",
  "k5": "区",
  "k6": 130202,
  "k7": "0315"
}, {
  "id": 557,
  "name": "路北",
  "parent_id": 126,
  "k1": "l",
  "k2": "lb",
  "k3": "lubei",
  "k4": "",
  "k5": "区",
  "k6": 130203,
  "k7": "0315"
}, {
  "id": 558,
  "name": "古冶",
  "parent_id": 126,
  "k1": "g",
  "k2": "gy",
  "k3": "guye",
  "k4": "",
  "k5": "区",
  "k6": 130204,
  "k7": "0315"
}, {
  "id": 559,
  "name": "开平",
  "parent_id": 126,
  "k1": "k",
  "k2": "kp",
  "k3": "kaiping",
  "k4": "",
  "k5": "区",
  "k6": 130205,
  "k7": "0315"
}, {
  "id": 560,
  "name": "丰南",
  "parent_id": 126,
  "k1": "f",
  "k2": "fn",
  "k3": "fengnan",
  "k4": "",
  "k5": "区",
  "k6": 130207,
  "k7": "0315"
}, {
  "id": 561,
  "name": "丰润",
  "parent_id": 126,
  "k1": "f",
  "k2": "fr",
  "k3": "fengrun",
  "k4": "",
  "k5": "区",
  "k6": 130208,
  "k7": "0315"
}, {
  "id": 562,
  "name": "滦州",
  "parent_id": 126,
  "k1": "l",
  "k2": "lz",
  "k3": "luanzhou",
  "k4": "",
  "k5": "市",
  "k6": 130223,
  "k7": "0315"
}, {
  "id": 563,
  "name": "滦南",
  "parent_id": 126,
  "k1": "l",
  "k2": "ln",
  "k3": "luannan",
  "k4": "",
  "k5": "县",
  "k6": 130224,
  "k7": "0315"
}, {
  "id": 564,
  "name": "乐亭",
  "parent_id": 126,
  "k1": "l",
  "k2": "lt",
  "k3": "leting",
  "k4": "",
  "k5": "县",
  "k6": 130225,
  "k7": "0315"
}, {
  "id": 565,
  "name": "迁西",
  "parent_id": 126,
  "k1": "q",
  "k2": "qx",
  "k3": "qianxi",
  "k4": "",
  "k5": "县",
  "k6": 130227,
  "k7": "0315"
}, {
  "id": 566,
  "name": "玉田",
  "parent_id": 126,
  "k1": "y",
  "k2": "yt",
  "k3": "yutian",
  "k4": "",
  "k5": "县",
  "k6": 130229,
  "k7": "0315"
}, {
  "id": 567,
  "name": "唐海",
  "parent_id": 126,
  "k1": "t",
  "k2": "th",
  "k3": "tanghai",
  "k4": "",
  "k5": "县",
  "k6": 130230,
  "k7": "0315"
}, {
  "id": 568,
  "name": "遵化",
  "parent_id": 126,
  "k1": "z",
  "k2": "zh",
  "k3": "zunhua",
  "k4": "",
  "k5": "市",
  "k6": 130281,
  "k7": "0315"
}, {
  "id": 569,
  "name": "迁安",
  "parent_id": 126,
  "k1": "q",
  "k2": "qa",
  "k3": "qianan",
  "k4": "",
  "k5": "市",
  "k6": 130283,
  "k7": "0315"
}, {
  "id": 570,
  "name": "海港",
  "parent_id": 127,
  "k1": "h",
  "k2": "hg",
  "k3": "haigang",
  "k4": "",
  "k5": "区",
  "k6": 130302,
  "k7": "0335"
}, {
  "id": 571,
  "name": "山海关",
  "parent_id": 127,
  "k1": "s",
  "k2": "shg",
  "k3": "shanhaiguan",
  "k4": "",
  "k5": "区",
  "k6": 130303,
  "k7": "0335"
}, {
  "id": 572,
  "name": "北戴河",
  "parent_id": 127,
  "k1": "b",
  "k2": "bdh",
  "k3": "beidaihe",
  "k4": "",
  "k5": "区",
  "k6": 130304,
  "k7": "0335"
}, {
  "id": 573,
  "name": "青龙",
  "parent_id": 127,
  "k1": "q",
  "k2": "ql",
  "k3": "qinglong",
  "k4": "满族",
  "k5": "自治县",
  "k6": 130321,
  "k7": "0335"
}, {
  "id": 574,
  "name": "昌黎",
  "parent_id": 127,
  "k1": "c",
  "k2": "cl",
  "k3": "changli",
  "k4": "",
  "k5": "县",
  "k6": 130322,
  "k7": "0335"
}, {
  "id": 575,
  "name": "抚宁",
  "parent_id": 127,
  "k1": "f",
  "k2": "fn",
  "k3": "funing",
  "k4": "",
  "k5": "区",
  "k6": 130323,
  "k7": "0335"
}, {
  "id": 576,
  "name": "卢龙",
  "parent_id": 127,
  "k1": "l",
  "k2": "ll",
  "k3": "lulong",
  "k4": "",
  "k5": "县",
  "k6": 130324,
  "k7": "0335"
}, {
  "id": 577,
  "name": "邯山",
  "parent_id": 128,
  "k1": "h",
  "k2": "hs",
  "k3": "hanshan",
  "k4": "",
  "k5": "区",
  "k6": 130402,
  "k7": "0310"
}, {
  "id": 578,
  "name": "丛台",
  "parent_id": 128,
  "k1": "c",
  "k2": "ct",
  "k3": "congtai",
  "k4": "",
  "k5": "区",
  "k6": 130403,
  "k7": "0310"
}, {
  "id": 579,
  "name": "复兴",
  "parent_id": 128,
  "k1": "f",
  "k2": "fx",
  "k3": "fuxing",
  "k4": "",
  "k5": "区",
  "k6": 130404,
  "k7": "0310"
}, {
  "id": 580,
  "name": "峰峰矿",
  "parent_id": 128,
  "k1": "f",
  "k2": "ffk",
  "k3": "fengfengkuang",
  "k4": "",
  "k5": "区",
  "k6": 130406,
  "k7": "0310"
}, {
  "id": 582,
  "name": "临漳",
  "parent_id": 128,
  "k1": "l",
  "k2": "lz",
  "k3": "linzhang",
  "k4": "",
  "k5": "县",
  "k6": 130423,
  "k7": "0310"
}, {
  "id": 583,
  "name": "成安",
  "parent_id": 128,
  "k1": "c",
  "k2": "ca",
  "k3": "chengan",
  "k4": "",
  "k5": "县",
  "k6": 130424,
  "k7": "0310"
}, {
  "id": 584,
  "name": "大名",
  "parent_id": 128,
  "k1": "d",
  "k2": "dm",
  "k3": "daming",
  "k4": "",
  "k5": "县",
  "k6": 130425,
  "k7": "0310"
}, {
  "id": 585,
  "name": "涉县",
  "parent_id": 128,
  "k1": "s",
  "k2": "sx",
  "k3": "shexian",
  "k4": "",
  "k5": "",
  "k6": 130426,
  "k7": "0310"
}, {
  "id": 586,
  "name": "磁县",
  "parent_id": 128,
  "k1": "c",
  "k2": "cx",
  "k3": "cixian",
  "k4": "",
  "k5": "",
  "k6": 130427,
  "k7": "0310"
}, {
  "id": 587,
  "name": "肥乡",
  "parent_id": 128,
  "k1": "f",
  "k2": "fx",
  "k3": "feixiang",
  "k4": "",
  "k5": "区",
  "k6": 130407,
  "k7": "0310"
}, {
  "id": 588,
  "name": "永年",
  "parent_id": 128,
  "k1": "y",
  "k2": "yn",
  "k3": "yongnian",
  "k4": "",
  "k5": "区",
  "k6": 130408,
  "k7": "0310"
}, {
  "id": 589,
  "name": "邱县",
  "parent_id": 128,
  "k1": "q",
  "k2": "qx",
  "k3": "qiuxian",
  "k4": "",
  "k5": "",
  "k6": 130430,
  "k7": "0310"
}, {
  "id": 590,
  "name": "鸡泽",
  "parent_id": 128,
  "k1": "j",
  "k2": "jz",
  "k3": "jize",
  "k4": "",
  "k5": "县",
  "k6": 130431,
  "k7": "0310"
}, {
  "id": 591,
  "name": "广平",
  "parent_id": 128,
  "k1": "g",
  "k2": "gp",
  "k3": "guangping",
  "k4": "",
  "k5": "县",
  "k6": 130432,
  "k7": "0310"
}, {
  "id": 592,
  "name": "馆陶",
  "parent_id": 128,
  "k1": "g",
  "k2": "gt",
  "k3": "guantao",
  "k4": "",
  "k5": "县",
  "k6": 130433,
  "k7": "0310"
}, {
  "id": 593,
  "name": "魏县",
  "parent_id": 128,
  "k1": "w",
  "k2": "wx",
  "k3": "weixian",
  "k4": "",
  "k5": "",
  "k6": 130434,
  "k7": "0310"
}, {
  "id": 594,
  "name": "曲周",
  "parent_id": 128,
  "k1": "q",
  "k2": "qz",
  "k3": "quzhou",
  "k4": "",
  "k5": "县",
  "k6": 130435,
  "k7": "0310"
}, {
  "id": 595,
  "name": "武安",
  "parent_id": 128,
  "k1": "w",
  "k2": "wa",
  "k3": "wuan",
  "k4": "",
  "k5": "市",
  "k6": 130481,
  "k7": "0310"
}, {
  "id": 596,
  "name": "桥东",
  "parent_id": 129,
  "k1": "q",
  "k2": "qd",
  "k3": "qiaodong",
  "k4": "",
  "k5": "区",
  "k6": 130502,
  "k7": "0319"
}, {
  "id": 597,
  "name": "桥西",
  "parent_id": 129,
  "k1": "q",
  "k2": "qx",
  "k3": "qiaoxi",
  "k4": "",
  "k5": "区",
  "k6": 130503,
  "k7": "0319"
}, {
  "id": 598,
  "name": "邢台",
  "parent_id": 129,
  "k1": "x",
  "k2": "xt",
  "k3": "xingtai",
  "k4": "",
  "k5": "县",
  "k6": 130521,
  "k7": "0319"
}, {
  "id": 599,
  "name": "临城",
  "parent_id": 129,
  "k1": "l",
  "k2": "lc",
  "k3": "lincheng",
  "k4": "",
  "k5": "县",
  "k6": 130522,
  "k7": "0319"
}, {
  "id": 600,
  "name": "内丘",
  "parent_id": 129,
  "k1": "n",
  "k2": "nq",
  "k3": "neiqiu",
  "k4": "",
  "k5": "县",
  "k6": 130523,
  "k7": "0319"
}, {
  "id": 601,
  "name": "柏乡",
  "parent_id": 129,
  "k1": "b",
  "k2": "bx",
  "k3": "boxiang",
  "k4": "",
  "k5": "县",
  "k6": 130524,
  "k7": "0319"
}, {
  "id": 602,
  "name": "隆尧",
  "parent_id": 129,
  "k1": "l",
  "k2": "ly",
  "k3": "longyao",
  "k4": "",
  "k5": "县",
  "k6": 130525,
  "k7": "0319"
}, {
  "id": 603,
  "name": "任县",
  "parent_id": 129,
  "k1": "r",
  "k2": "rx",
  "k3": "renxian",
  "k4": "",
  "k5": "",
  "k6": 130526,
  "k7": "0319"
}, {
  "id": 604,
  "name": "南和",
  "parent_id": 129,
  "k1": "n",
  "k2": "nh",
  "k3": "nanhe",
  "k4": "",
  "k5": "县",
  "k6": 130527,
  "k7": "0319"
}, {
  "id": 605,
  "name": "宁晋",
  "parent_id": 129,
  "k1": "n",
  "k2": "nj",
  "k3": "ningjin",
  "k4": "",
  "k5": "县",
  "k6": 130528,
  "k7": "0319"
}, {
  "id": 606,
  "name": "巨鹿",
  "parent_id": 129,
  "k1": "j",
  "k2": "jl",
  "k3": "julu",
  "k4": "",
  "k5": "县",
  "k6": 130529,
  "k7": "0319"
}, {
  "id": 607,
  "name": "新河",
  "parent_id": 129,
  "k1": "x",
  "k2": "xh",
  "k3": "xinhe",
  "k4": "",
  "k5": "县",
  "k6": 130530,
  "k7": "0319"
}, {
  "id": 608,
  "name": "广宗",
  "parent_id": 129,
  "k1": "g",
  "k2": "gz",
  "k3": "guangzong",
  "k4": "",
  "k5": "县",
  "k6": 130531,
  "k7": "0319"
}, {
  "id": 609,
  "name": "平乡",
  "parent_id": 129,
  "k1": "p",
  "k2": "px",
  "k3": "pingxiang",
  "k4": "",
  "k5": "县",
  "k6": 130532,
  "k7": "0319"
}, {
  "id": 610,
  "name": "威县",
  "parent_id": 129,
  "k1": "w",
  "k2": "wx",
  "k3": "weixian",
  "k4": "",
  "k5": "",
  "k6": 130533,
  "k7": "0319"
}, {
  "id": 611,
  "name": "清河",
  "parent_id": 129,
  "k1": "q",
  "k2": "qh",
  "k3": "qinghe",
  "k4": "",
  "k5": "县",
  "k6": 130534,
  "k7": "0319"
}, {
  "id": 612,
  "name": "临西",
  "parent_id": 129,
  "k1": "l",
  "k2": "lx",
  "k3": "linxi",
  "k4": "",
  "k5": "县",
  "k6": 130535,
  "k7": "0319"
}, {
  "id": 613,
  "name": "南宫",
  "parent_id": 129,
  "k1": "n",
  "k2": "ng",
  "k3": "nangong",
  "k4": "",
  "k5": "市",
  "k6": 130581,
  "k7": "0319"
}, {
  "id": 614,
  "name": "沙河",
  "parent_id": 129,
  "k1": "s",
  "k2": "sh",
  "k3": "shahe",
  "k4": "",
  "k5": "市",
  "k6": 130582,
  "k7": "0319"
}, {
  "id": 615,
  "name": "竞秀",
  "parent_id": 130,
  "k1": "j",
  "k2": "jx",
  "k3": "jingxiu",
  "k4": "",
  "k5": "区",
  "k6": 130602,
  "k7": "0312"
}, {
  "id": 616,
  "name": "莲池",
  "parent_id": 130,
  "k1": "l",
  "k2": "lc",
  "k3": "lianchi",
  "k4": "",
  "k5": "区",
  "k6": 130603,
  "k7": "0312"
}, {
  "id": 618,
  "name": "满城",
  "parent_id": 130,
  "k1": "m",
  "k2": "mc",
  "k3": "mancheng",
  "k4": "",
  "k5": "区",
  "k6": 130621,
  "k7": "0312"
}, {
  "id": 619,
  "name": "清苑",
  "parent_id": 130,
  "k1": "q",
  "k2": "qy",
  "k3": "qingyuan",
  "k4": "",
  "k5": "区",
  "k6": 130622,
  "k7": "0312"
}, {
  "id": 620,
  "name": "涞水",
  "parent_id": 130,
  "k1": "l",
  "k2": "ls",
  "k3": "laishui",
  "k4": "",
  "k5": "县",
  "k6": 130623,
  "k7": "0312"
}, {
  "id": 621,
  "name": "阜平",
  "parent_id": 130,
  "k1": "f",
  "k2": "fp",
  "k3": "fuping",
  "k4": "",
  "k5": "县",
  "k6": 130624,
  "k7": "0312"
}, {
  "id": 622,
  "name": "徐水",
  "parent_id": 130,
  "k1": "x",
  "k2": "xs",
  "k3": "xushui",
  "k4": "",
  "k5": "区",
  "k6": 130625,
  "k7": "0312"
}, {
  "id": 623,
  "name": "定兴",
  "parent_id": 130,
  "k1": "d",
  "k2": "dx",
  "k3": "dingxing",
  "k4": "",
  "k5": "县",
  "k6": 130626,
  "k7": "0312"
}, {
  "id": 624,
  "name": "唐县",
  "parent_id": 130,
  "k1": "t",
  "k2": "tx",
  "k3": "tangxian",
  "k4": "",
  "k5": "",
  "k6": 130627,
  "k7": "0312"
}, {
  "id": 625,
  "name": "高阳",
  "parent_id": 130,
  "k1": "g",
  "k2": "gy",
  "k3": "gaoyang",
  "k4": "",
  "k5": "县",
  "k6": 130628,
  "k7": "0312"
}, {
  "id": 626,
  "name": "容城",
  "parent_id": 130,
  "k1": "r",
  "k2": "rc",
  "k3": "rongcheng",
  "k4": "",
  "k5": "县",
  "k6": 130629,
  "k7": "0312"
}, {
  "id": 627,
  "name": "涞源",
  "parent_id": 130,
  "k1": "l",
  "k2": "ly",
  "k3": "laiyuan",
  "k4": "",
  "k5": "县",
  "k6": 130630,
  "k7": "0312"
}, {
  "id": 628,
  "name": "望都",
  "parent_id": 130,
  "k1": "w",
  "k2": "wd",
  "k3": "wangdu",
  "k4": "",
  "k5": "县",
  "k6": 130631,
  "k7": "0312"
}, {
  "id": 629,
  "name": "安新",
  "parent_id": 130,
  "k1": "a",
  "k2": "ax",
  "k3": "anxin",
  "k4": "",
  "k5": "县",
  "k6": 130632,
  "k7": "0312"
}, {
  "id": 630,
  "name": "易县",
  "parent_id": 130,
  "k1": "y",
  "k2": "yx",
  "k3": "yixian",
  "k4": "",
  "k5": "",
  "k6": 130633,
  "k7": "0312"
}, {
  "id": 631,
  "name": "曲阳",
  "parent_id": 130,
  "k1": "q",
  "k2": "qy",
  "k3": "quyang",
  "k4": "",
  "k5": "县",
  "k6": 130634,
  "k7": "0312"
}, {
  "id": 632,
  "name": "蠡县",
  "parent_id": 130,
  "k1": "l",
  "k2": "lx",
  "k3": "lixian",
  "k4": "",
  "k5": "",
  "k6": 130635,
  "k7": "0312"
}, {
  "id": 633,
  "name": "顺平",
  "parent_id": 130,
  "k1": "s",
  "k2": "sp",
  "k3": "shunping",
  "k4": "",
  "k5": "县",
  "k6": 130636,
  "k7": "0312"
}, {
  "id": 634,
  "name": "博野",
  "parent_id": 130,
  "k1": "b",
  "k2": "by",
  "k3": "boye",
  "k4": "",
  "k5": "县",
  "k6": 130637,
  "k7": "0312"
}, {
  "id": 635,
  "name": "雄县",
  "parent_id": 130,
  "k1": "x",
  "k2": "xx",
  "k3": "xiongxian",
  "k4": "",
  "k5": "",
  "k6": 130638,
  "k7": "0312"
}, {
  "id": 636,
  "name": "涿州",
  "parent_id": 130,
  "k1": "z",
  "k2": "zz",
  "k3": "zhuozhou",
  "k4": "",
  "k5": "市",
  "k6": 130681,
  "k7": "0312"
}, {
  "id": 637,
  "name": "定州",
  "parent_id": 130,
  "k1": "d",
  "k2": "dz",
  "k3": "dingzhou",
  "k4": "",
  "k5": "市",
  "k6": 130682,
  "k7": "0312"
}, {
  "id": 638,
  "name": "安国",
  "parent_id": 130,
  "k1": "a",
  "k2": "ag",
  "k3": "anguo",
  "k4": "",
  "k5": "市",
  "k6": 130683,
  "k7": "0312"
}, {
  "id": 639,
  "name": "高碑店",
  "parent_id": 130,
  "k1": "g",
  "k2": "gbd",
  "k3": "gaobeidian",
  "k4": "",
  "k5": "市",
  "k6": 130684,
  "k7": "0312"
}, {
  "id": 640,
  "name": "桥东",
  "parent_id": 131,
  "k1": "q",
  "k2": "qd",
  "k3": "qiaodong",
  "k4": "",
  "k5": "区",
  "k6": 130702,
  "k7": "0313"
}, {
  "id": 641,
  "name": "桥西",
  "parent_id": 131,
  "k1": "q",
  "k2": "qx",
  "k3": "qiaoxi",
  "k4": "",
  "k5": "区",
  "k6": 130703,
  "k7": "0313"
}, {
  "id": 642,
  "name": "宣化",
  "parent_id": 131,
  "k1": "x",
  "k2": "xh",
  "k3": "xuanhua",
  "k4": "",
  "k5": "区",
  "k6": 130705,
  "k7": "0313"
}, {
  "id": 643,
  "name": "下花园",
  "parent_id": 131,
  "k1": "x",
  "k2": "xhy",
  "k3": "xiahuayuan",
  "k4": "",
  "k5": "区",
  "k6": 130706,
  "k7": "0313"
}, {
  "id": 645,
  "name": "张北",
  "parent_id": 131,
  "k1": "z",
  "k2": "zb",
  "k3": "zhangbei",
  "k4": "",
  "k5": "县",
  "k6": 130722,
  "k7": "0313"
}, {
  "id": 646,
  "name": "康保",
  "parent_id": 131,
  "k1": "k",
  "k2": "kb",
  "k3": "kangbao",
  "k4": "",
  "k5": "县",
  "k6": 130723,
  "k7": "0313"
}, {
  "id": 647,
  "name": "沽源",
  "parent_id": 131,
  "k1": "g",
  "k2": "gy",
  "k3": "guyuan",
  "k4": "",
  "k5": "县",
  "k6": 130724,
  "k7": "0313"
}, {
  "id": 648,
  "name": "尚义",
  "parent_id": 131,
  "k1": "s",
  "k2": "sy",
  "k3": "shangyi",
  "k4": "",
  "k5": "县",
  "k6": 130725,
  "k7": "0313"
}, {
  "id": 649,
  "name": "蔚县",
  "parent_id": 131,
  "k1": "y",
  "k2": "yx",
  "k3": "yuxian",
  "k4": "",
  "k5": "",
  "k6": 130726,
  "k7": "0313"
}, {
  "id": 650,
  "name": "阳原",
  "parent_id": 131,
  "k1": "y",
  "k2": "yy",
  "k3": "yangyuan",
  "k4": "",
  "k5": "县",
  "k6": 130727,
  "k7": "0313"
}, {
  "id": 651,
  "name": "怀安",
  "parent_id": 131,
  "k1": "h",
  "k2": "ha",
  "k3": "huaian",
  "k4": "",
  "k5": "县",
  "k6": 130728,
  "k7": "0313"
}, {
  "id": 652,
  "name": "万全",
  "parent_id": 131,
  "k1": "w",
  "k2": "wq",
  "k3": "wanquan",
  "k4": "",
  "k5": "区",
  "k6": 130708,
  "k7": "0313"
}, {
  "id": 653,
  "name": "怀来",
  "parent_id": 131,
  "k1": "h",
  "k2": "hl",
  "k3": "huailai",
  "k4": "",
  "k5": "县",
  "k6": 130730,
  "k7": "0313"
}, {
  "id": 654,
  "name": "涿鹿",
  "parent_id": 131,
  "k1": "z",
  "k2": "zl",
  "k3": "zhuolu",
  "k4": "",
  "k5": "县",
  "k6": 130731,
  "k7": "0313"
}, {
  "id": 655,
  "name": "赤城",
  "parent_id": 131,
  "k1": "c",
  "k2": "cc",
  "k3": "chicheng",
  "k4": "",
  "k5": "县",
  "k6": 130732,
  "k7": "0313"
}, {
  "id": 656,
  "name": "崇礼",
  "parent_id": 131,
  "k1": "c",
  "k2": "cl",
  "k3": "chongli",
  "k4": "",
  "k5": "区",
  "k6": 130709,
  "k7": "0313"
}, {
  "id": 657,
  "name": "双桥",
  "parent_id": 132,
  "k1": "s",
  "k2": "sq",
  "k3": "shuangqiao",
  "k4": "",
  "k5": "区",
  "k6": 130802,
  "k7": "0314"
}, {
  "id": 658,
  "name": "双滦",
  "parent_id": 132,
  "k1": "s",
  "k2": "sl",
  "k3": "shuangluan",
  "k4": "",
  "k5": "区",
  "k6": 130803,
  "k7": "0314"
}, {
  "id": 659,
  "name": "鹰手营子",
  "parent_id": 132,
  "k1": "y",
  "k2": "ysyz",
  "k3": "yingshouyingzi",
  "k4": "矿",
  "k5": "区",
  "k6": 130804,
  "k7": "0314"
}, {
  "id": 660,
  "name": "承德",
  "parent_id": 132,
  "k1": "c",
  "k2": "cd",
  "k3": "chengde",
  "k4": "",
  "k5": "县",
  "k6": 130821,
  "k7": "0314"
}, {
  "id": 661,
  "name": "兴隆",
  "parent_id": 132,
  "k1": "x",
  "k2": "xl",
  "k3": "xinglong",
  "k4": "",
  "k5": "县",
  "k6": 130822,
  "k7": "0314"
}, {
  "id": 662,
  "name": "平泉",
  "parent_id": 132,
  "k1": "p",
  "k2": "pq",
  "k3": "pingquan",
  "k4": "",
  "k5": "市",
  "k6": 130881,
  "k7": "0314"
}, {
  "id": 663,
  "name": "滦平",
  "parent_id": 132,
  "k1": "l",
  "k2": "lp",
  "k3": "luanping",
  "k4": "",
  "k5": "县",
  "k6": 130824,
  "k7": "0314"
}, {
  "id": 664,
  "name": "隆化",
  "parent_id": 132,
  "k1": "l",
  "k2": "lh",
  "k3": "longhua",
  "k4": "",
  "k5": "县",
  "k6": 130825,
  "k7": "0314"
}, {
  "id": 665,
  "name": "丰宁",
  "parent_id": 132,
  "k1": "f",
  "k2": "fn",
  "k3": "fengning",
  "k4": "满族",
  "k5": "自治县",
  "k6": 130826,
  "k7": "0314"
}, {
  "id": 666,
  "name": "宽城",
  "parent_id": 132,
  "k1": "k",
  "k2": "kc",
  "k3": "kuancheng",
  "k4": "满族",
  "k5": "自治县",
  "k6": 130827,
  "k7": "0314"
}, {
  "id": 667,
  "name": "围场",
  "parent_id": 132,
  "k1": "w",
  "k2": "wc",
  "k3": "weichang",
  "k4": "满族蒙古族",
  "k5": "自治县",
  "k6": 130828,
  "k7": "0314"
}, {
  "id": 668,
  "name": "新华",
  "parent_id": 133,
  "k1": "x",
  "k2": "xh",
  "k3": "xinhua",
  "k4": "",
  "k5": "区",
  "k6": 130902,
  "k7": "0317"
}, {
  "id": 669,
  "name": "运河",
  "parent_id": 133,
  "k1": "y",
  "k2": "yh",
  "k3": "yunhe",
  "k4": "",
  "k5": "区",
  "k6": 130903,
  "k7": "0317"
}, {
  "id": 670,
  "name": "沧县",
  "parent_id": 133,
  "k1": "c",
  "k2": "cx",
  "k3": "cangxian",
  "k4": "",
  "k5": "",
  "k6": 130921,
  "k7": "0317"
}, {
  "id": 671,
  "name": "青县",
  "parent_id": 133,
  "k1": "q",
  "k2": "qx",
  "k3": "qingxian",
  "k4": "",
  "k5": "",
  "k6": 130922,
  "k7": "0317"
}, {
  "id": 672,
  "name": "东光",
  "parent_id": 133,
  "k1": "d",
  "k2": "dg",
  "k3": "dongguang",
  "k4": "",
  "k5": "县",
  "k6": 130923,
  "k7": "0317"
}, {
  "id": 673,
  "name": "海兴",
  "parent_id": 133,
  "k1": "h",
  "k2": "hx",
  "k3": "haixing",
  "k4": "",
  "k5": "县",
  "k6": 130924,
  "k7": "0317"
}, {
  "id": 674,
  "name": "盐山",
  "parent_id": 133,
  "k1": "y",
  "k2": "ys",
  "k3": "yanshan",
  "k4": "",
  "k5": "县",
  "k6": 130925,
  "k7": "0317"
}, {
  "id": 675,
  "name": "肃宁",
  "parent_id": 133,
  "k1": "s",
  "k2": "sn",
  "k3": "suning",
  "k4": "",
  "k5": "县",
  "k6": 130926,
  "k7": "0317"
}, {
  "id": 676,
  "name": "南皮",
  "parent_id": 133,
  "k1": "n",
  "k2": "np",
  "k3": "nanpi",
  "k4": "",
  "k5": "县",
  "k6": 130927,
  "k7": "0317"
}, {
  "id": 677,
  "name": "吴桥",
  "parent_id": 133,
  "k1": "w",
  "k2": "wq",
  "k3": "wuqiao",
  "k4": "",
  "k5": "县",
  "k6": 130928,
  "k7": "0317"
}, {
  "id": 678,
  "name": "献县",
  "parent_id": 133,
  "k1": "x",
  "k2": "xx",
  "k3": "xianxian",
  "k4": "",
  "k5": "",
  "k6": 130929,
  "k7": "0317"
}, {
  "id": 679,
  "name": "孟村",
  "parent_id": 133,
  "k1": "m",
  "k2": "mc",
  "k3": "mengcun",
  "k4": "回族",
  "k5": "自治县",
  "k6": 130930,
  "k7": "0317"
}, {
  "id": 680,
  "name": "泊头",
  "parent_id": 133,
  "k1": "b",
  "k2": "bt",
  "k3": "botou",
  "k4": "",
  "k5": "市",
  "k6": 130981,
  "k7": "0317"
}, {
  "id": 681,
  "name": "任丘",
  "parent_id": 133,
  "k1": "r",
  "k2": "rq",
  "k3": "renqiu",
  "k4": "",
  "k5": "市",
  "k6": 130982,
  "k7": "0317"
}, {
  "id": 682,
  "name": "黄骅",
  "parent_id": 133,
  "k1": "h",
  "k2": "hh",
  "k3": "huanghua",
  "k4": "",
  "k5": "市",
  "k6": 130983,
  "k7": "0317"
}, {
  "id": 683,
  "name": "河间",
  "parent_id": 133,
  "k1": "h",
  "k2": "hj",
  "k3": "hejian",
  "k4": "",
  "k5": "市",
  "k6": 130984,
  "k7": "0317"
}, {
  "id": 684,
  "name": "安次",
  "parent_id": 134,
  "k1": "a",
  "k2": "ac",
  "k3": "anci",
  "k4": "",
  "k5": "区",
  "k6": 131002,
  "k7": "0316"
}, {
  "id": 685,
  "name": "广阳",
  "parent_id": 134,
  "k1": "g",
  "k2": "gy",
  "k3": "guangyang",
  "k4": "",
  "k5": "区",
  "k6": 131003,
  "k7": "0316"
}, {
  "id": 686,
  "name": "固安",
  "parent_id": 134,
  "k1": "g",
  "k2": "ga",
  "k3": "guan",
  "k4": "",
  "k5": "县",
  "k6": 131022,
  "k7": "0316"
}, {
  "id": 687,
  "name": "永清",
  "parent_id": 134,
  "k1": "y",
  "k2": "yq",
  "k3": "yongqing",
  "k4": "",
  "k5": "县",
  "k6": 131023,
  "k7": "0316"
}, {
  "id": 688,
  "name": "香河",
  "parent_id": 134,
  "k1": "x",
  "k2": "xh",
  "k3": "xianghe",
  "k4": "",
  "k5": "县",
  "k6": 131024,
  "k7": "0316"
}, {
  "id": 689,
  "name": "大城",
  "parent_id": 134,
  "k1": "d",
  "k2": "dc",
  "k3": "dacheng",
  "k4": "",
  "k5": "县",
  "k6": 131025,
  "k7": "0316"
}, {
  "id": 690,
  "name": "文安",
  "parent_id": 134,
  "k1": "w",
  "k2": "wa",
  "k3": "wenan",
  "k4": "",
  "k5": "县",
  "k6": 131026,
  "k7": "0316"
}, {
  "id": 691,
  "name": "大厂",
  "parent_id": 134,
  "k1": "d",
  "k2": "dc",
  "k3": "dachang",
  "k4": "回族",
  "k5": "自治县",
  "k6": 131028,
  "k7": "0316"
}, {
  "id": 692,
  "name": "霸州",
  "parent_id": 134,
  "k1": "b",
  "k2": "bz",
  "k3": "bazhou",
  "k4": "",
  "k5": "市",
  "k6": 131081,
  "k7": "0316"
}, {
  "id": 693,
  "name": "三河",
  "parent_id": 134,
  "k1": "s",
  "k2": "sh",
  "k3": "sanhe",
  "k4": "",
  "k5": "市",
  "k6": 131082,
  "k7": "0316"
}, {
  "id": 694,
  "name": "桃城",
  "parent_id": 135,
  "k1": "t",
  "k2": "tc",
  "k3": "taocheng",
  "k4": "",
  "k5": "区",
  "k6": 131102,
  "k7": "0318"
}, {
  "id": 695,
  "name": "枣强",
  "parent_id": 135,
  "k1": "z",
  "k2": "zq",
  "k3": "zaoqiang",
  "k4": "",
  "k5": "县",
  "k6": 131121,
  "k7": "0318"
}, {
  "id": 696,
  "name": "武邑",
  "parent_id": 135,
  "k1": "w",
  "k2": "wy",
  "k3": "wuyi",
  "k4": "",
  "k5": "县",
  "k6": 131122,
  "k7": "0318"
}, {
  "id": 697,
  "name": "武强",
  "parent_id": 135,
  "k1": "w",
  "k2": "wq",
  "k3": "wuqiang",
  "k4": "",
  "k5": "县",
  "k6": 131123,
  "k7": "0318"
}, {
  "id": 698,
  "name": "饶阳",
  "parent_id": 135,
  "k1": "r",
  "k2": "ry",
  "k3": "raoyang",
  "k4": "",
  "k5": "县",
  "k6": 131124,
  "k7": "0318"
}, {
  "id": 699,
  "name": "安平",
  "parent_id": 135,
  "k1": "a",
  "k2": "ap",
  "k3": "anping",
  "k4": "",
  "k5": "县",
  "k6": 131125,
  "k7": "0318"
}, {
  "id": 700,
  "name": "故城",
  "parent_id": 135,
  "k1": "g",
  "k2": "gc",
  "k3": "gucheng",
  "k4": "",
  "k5": "县",
  "k6": 131126,
  "k7": "0318"
}, {
  "id": 701,
  "name": "景县",
  "parent_id": 135,
  "k1": "j",
  "k2": "jx",
  "k3": "jingxian",
  "k4": "",
  "k5": "",
  "k6": 131127,
  "k7": "0318"
}, {
  "id": 702,
  "name": "阜城",
  "parent_id": 135,
  "k1": "f",
  "k2": "fc",
  "k3": "fucheng",
  "k4": "",
  "k5": "县",
  "k6": 131128,
  "k7": "0318"
}, {
  "id": 703,
  "name": "冀州",
  "parent_id": 135,
  "k1": "j",
  "k2": "jz",
  "k3": "jizhou",
  "k4": "",
  "k5": "区",
  "k6": 131103,
  "k7": "0318"
}, {
  "id": 704,
  "name": "深州",
  "parent_id": 135,
  "k1": "s",
  "k2": "sz",
  "k3": "shenzhou",
  "k4": "",
  "k5": "市",
  "k6": 131182,
  "k7": "0318"
}, {
  "id": 705,
  "name": "小店",
  "parent_id": 136,
  "k1": "x",
  "k2": "xd",
  "k3": "xiaodian",
  "k4": "",
  "k5": "区",
  "k6": 140105,
  "k7": "0351"
}, {
  "id": 706,
  "name": "迎泽",
  "parent_id": 136,
  "k1": "y",
  "k2": "yz",
  "k3": "yingze",
  "k4": "",
  "k5": "区",
  "k6": 140106,
  "k7": "0351"
}, {
  "id": 707,
  "name": "杏花岭",
  "parent_id": 136,
  "k1": "x",
  "k2": "xhl",
  "k3": "xinghualing",
  "k4": "",
  "k5": "区",
  "k6": 140107,
  "k7": "0351"
}, {
  "id": 708,
  "name": "尖草坪",
  "parent_id": 136,
  "k1": "j",
  "k2": "jcp",
  "k3": "jiancaoping",
  "k4": "",
  "k5": "区",
  "k6": 140108,
  "k7": "0351"
}, {
  "id": 709,
  "name": "万柏林",
  "parent_id": 136,
  "k1": "w",
  "k2": "wbl",
  "k3": "wanbolin",
  "k4": "",
  "k5": "区",
  "k6": 140109,
  "k7": "0351"
}, {
  "id": 710,
  "name": "晋源",
  "parent_id": 136,
  "k1": "j",
  "k2": "jy",
  "k3": "jinyuan",
  "k4": "",
  "k5": "区",
  "k6": 140110,
  "k7": "0351"
}, {
  "id": 711,
  "name": "清徐",
  "parent_id": 136,
  "k1": "q",
  "k2": "qx",
  "k3": "qingxu",
  "k4": "",
  "k5": "县",
  "k6": 140121,
  "k7": "0351"
}, {
  "id": 712,
  "name": "阳曲",
  "parent_id": 136,
  "k1": "y",
  "k2": "yq",
  "k3": "yangqu",
  "k4": "",
  "k5": "县",
  "k6": 140122,
  "k7": "0351"
}, {
  "id": 713,
  "name": "娄烦",
  "parent_id": 136,
  "k1": "l",
  "k2": "lf",
  "k3": "loufan",
  "k4": "",
  "k5": "县",
  "k6": 140123,
  "k7": "0351"
}, {
  "id": 714,
  "name": "古交",
  "parent_id": 136,
  "k1": "g",
  "k2": "gj",
  "k3": "gujiao",
  "k4": "",
  "k5": "市",
  "k6": 140181,
  "k7": "0351"
}, {
  "id": 715,
  "name": "平城",
  "parent_id": 137,
  "k1": "p",
  "k2": "pc",
  "k3": "pingcheng",
  "k4": "",
  "k5": "区",
  "k6": 140213,
  "k7": "0352"
}, {
  "id": 716,
  "name": "云冈",
  "parent_id": 137,
  "k1": "y",
  "k2": "yg",
  "k3": "yugang",
  "k4": "",
  "k5": "",
  "k6": 140214,
  "k7": "0352"
}, {
  "id": 718,
  "name": "新荣",
  "parent_id": 137,
  "k1": "x",
  "k2": "xr",
  "k3": "xinrong",
  "k4": "",
  "k5": "区",
  "k6": 140212,
  "k7": "0352"
}, {
  "id": 719,
  "name": "阳高",
  "parent_id": 137,
  "k1": "y",
  "k2": "yg",
  "k3": "yanggao",
  "k4": "",
  "k5": "县",
  "k6": 140221,
  "k7": "0352"
}, {
  "id": 720,
  "name": "天镇",
  "parent_id": 137,
  "k1": "t",
  "k2": "tz",
  "k3": "tianzhen",
  "k4": "",
  "k5": "县",
  "k6": 140222,
  "k7": "0352"
}, {
  "id": 721,
  "name": "广灵",
  "parent_id": 137,
  "k1": "g",
  "k2": "gl",
  "k3": "guangling",
  "k4": "",
  "k5": "县",
  "k6": 140223,
  "k7": "0352"
}, {
  "id": 722,
  "name": "灵丘",
  "parent_id": 137,
  "k1": "l",
  "k2": "lq",
  "k3": "lingqiu",
  "k4": "",
  "k5": "县",
  "k6": 140224,
  "k7": "0352"
}, {
  "id": 723,
  "name": "浑源",
  "parent_id": 137,
  "k1": "h",
  "k2": "hy",
  "k3": "hunyuan",
  "k4": "",
  "k5": "县",
  "k6": 140225,
  "k7": "0352"
}, {
  "id": 724,
  "name": "左云",
  "parent_id": 137,
  "k1": "z",
  "k2": "zy",
  "k3": "zuoyun",
  "k4": "",
  "k5": "县",
  "k6": 140226,
  "k7": "0352"
}, {
  "id": 725,
  "name": "云州",
  "parent_id": 137,
  "k1": "y",
  "k2": "yz",
  "k3": "yunzhou",
  "k4": "",
  "k5": "区",
  "k6": 140215,
  "k7": "0352"
}, {
  "id": 726,
  "name": "城区",
  "parent_id": 138,
  "k1": "c",
  "k2": "cq",
  "k3": "chengqu",
  "k4": "",
  "k5": "",
  "k6": 140302,
  "k7": "0353"
}, {
  "id": 727,
  "name": "矿区",
  "parent_id": 138,
  "k1": "k",
  "k2": "kq",
  "k3": "kuangqu",
  "k4": "",
  "k5": "",
  "k6": 140303,
  "k7": "0353"
}, {
  "id": 728,
  "name": "郊区",
  "parent_id": 138,
  "k1": "j",
  "k2": "jq",
  "k3": "jiaoqu",
  "k4": "",
  "k5": "",
  "k6": 140311,
  "k7": "0353"
}, {
  "id": 729,
  "name": "平定",
  "parent_id": 138,
  "k1": "p",
  "k2": "pd",
  "k3": "pingding",
  "k4": "",
  "k5": "县",
  "k6": 140321,
  "k7": "0353"
}, {
  "id": 730,
  "name": "盂县",
  "parent_id": 138,
  "k1": "y",
  "k2": "yx",
  "k3": "yuxian",
  "k4": "",
  "k5": "",
  "k6": 140322,
  "k7": "0353"
}, {
  "id": 731,
  "name": "潞州",
  "parent_id": 139,
  "k1": "l",
  "k2": "lz",
  "k3": "luzhou",
  "k4": "",
  "k5": "",
  "k6": 140403,
  "k7": "0355"
}, {
  "id": 733,
  "name": "上党",
  "parent_id": 139,
  "k1": "s",
  "k2": "sd",
  "k3": "shangdang",
  "k4": "",
  "k5": "区",
  "k6": 140404,
  "k7": "0355"
}, {
  "id": 734,
  "name": "襄垣",
  "parent_id": 139,
  "k1": "x",
  "k2": "xy",
  "k3": "xiangyuan",
  "k4": "",
  "k5": "县",
  "k6": 140423,
  "k7": "0355"
}, {
  "id": 735,
  "name": "屯留",
  "parent_id": 139,
  "k1": "t",
  "k2": "tl",
  "k3": "tunliu",
  "k4": "",
  "k5": "区",
  "k6": 140405,
  "k7": "0355"
}, {
  "id": 736,
  "name": "平顺",
  "parent_id": 139,
  "k1": "p",
  "k2": "ps",
  "k3": "pingshun",
  "k4": "",
  "k5": "县",
  "k6": 140425,
  "k7": "0355"
}, {
  "id": 737,
  "name": "黎城",
  "parent_id": 139,
  "k1": "l",
  "k2": "lc",
  "k3": "licheng",
  "k4": "",
  "k5": "县",
  "k6": 140426,
  "k7": "0355"
}, {
  "id": 738,
  "name": "壶关",
  "parent_id": 139,
  "k1": "h",
  "k2": "hg",
  "k3": "huguan",
  "k4": "",
  "k5": "县",
  "k6": 140427,
  "k7": "0355"
}, {
  "id": 739,
  "name": "长子",
  "parent_id": 139,
  "k1": "z",
  "k2": "zz",
  "k3": "zhangzi",
  "k4": "",
  "k5": "县",
  "k6": 140428,
  "k7": "0355"
}, {
  "id": 740,
  "name": "武乡",
  "parent_id": 139,
  "k1": "w",
  "k2": "wx",
  "k3": "wuxiang",
  "k4": "",
  "k5": "县",
  "k6": 140429,
  "k7": "0355"
}, {
  "id": 741,
  "name": "沁县",
  "parent_id": 139,
  "k1": "q",
  "k2": "qx",
  "k3": "qinxian",
  "k4": "",
  "k5": "",
  "k6": 140430,
  "k7": "0355"
}, {
  "id": 742,
  "name": "沁源",
  "parent_id": 139,
  "k1": "q",
  "k2": "qy",
  "k3": "qinyuan",
  "k4": "",
  "k5": "县",
  "k6": 140431,
  "k7": "0355"
}, {
  "id": 743,
  "name": "潞城",
  "parent_id": 139,
  "k1": "l",
  "k2": "lc",
  "k3": "lucheng",
  "k4": "",
  "k5": "区",
  "k6": 140406,
  "k7": "0355"
}, {
  "id": 744,
  "name": "城区",
  "parent_id": 140,
  "k1": "c",
  "k2": "cq",
  "k3": "chengqu",
  "k4": "",
  "k5": "",
  "k6": 140502,
  "k7": "0356"
}, {
  "id": 745,
  "name": "沁水",
  "parent_id": 140,
  "k1": "q",
  "k2": "qs",
  "k3": "qinshui",
  "k4": "",
  "k5": "县",
  "k6": 140521,
  "k7": "0356"
}, {
  "id": 746,
  "name": "阳城",
  "parent_id": 140,
  "k1": "y",
  "k2": "yc",
  "k3": "yangcheng",
  "k4": "",
  "k5": "县",
  "k6": 140522,
  "k7": "0356"
}, {
  "id": 747,
  "name": "陵川",
  "parent_id": 140,
  "k1": "l",
  "k2": "lc",
  "k3": "lingchuan",
  "k4": "",
  "k5": "县",
  "k6": 140524,
  "k7": "0356"
}, {
  "id": 748,
  "name": "泽州",
  "parent_id": 140,
  "k1": "z",
  "k2": "zz",
  "k3": "zezhou",
  "k4": "",
  "k5": "县",
  "k6": 140525,
  "k7": "0356"
}, {
  "id": 749,
  "name": "高平",
  "parent_id": 140,
  "k1": "g",
  "k2": "gp",
  "k3": "gaoping",
  "k4": "",
  "k5": "市",
  "k6": 140581,
  "k7": "0356"
}, {
  "id": 750,
  "name": "朔城",
  "parent_id": 141,
  "k1": "s",
  "k2": "sc",
  "k3": "shuocheng",
  "k4": "",
  "k5": "区",
  "k6": 140602,
  "k7": "0349"
}, {
  "id": 751,
  "name": "平鲁",
  "parent_id": 141,
  "k1": "p",
  "k2": "pl",
  "k3": "pinglu",
  "k4": "",
  "k5": "区",
  "k6": 140603,
  "k7": "0349"
}, {
  "id": 752,
  "name": "山阴",
  "parent_id": 141,
  "k1": "s",
  "k2": "sy",
  "k3": "shanyin",
  "k4": "",
  "k5": "县",
  "k6": 140621,
  "k7": "0349"
}, {
  "id": 753,
  "name": "应县",
  "parent_id": 141,
  "k1": "y",
  "k2": "yx",
  "k3": "yingxian",
  "k4": "",
  "k5": "",
  "k6": 140622,
  "k7": "0349"
}, {
  "id": 754,
  "name": "右玉",
  "parent_id": 141,
  "k1": "y",
  "k2": "yy",
  "k3": "youyu",
  "k4": "",
  "k5": "县",
  "k6": 140623,
  "k7": "0349"
}, {
  "id": 755,
  "name": "怀仁",
  "parent_id": 141,
  "k1": "h",
  "k2": "hr",
  "k3": "huairen",
  "k4": "",
  "k5": "市",
  "k6": 140681,
  "k7": "0349"
}, {
  "id": 756,
  "name": "榆次",
  "parent_id": 142,
  "k1": "y",
  "k2": "yc",
  "k3": "yuci",
  "k4": "",
  "k5": "区",
  "k6": "030600",
  "k7": "0354"
}, {
  "id": 757,
  "name": "榆社",
  "parent_id": 142,
  "k1": "y",
  "k2": "ys",
  "k3": "yushe",
  "k4": "",
  "k5": "县",
  "k6": 140721,
  "k7": "0354"
}, {
  "id": 758,
  "name": "左权",
  "parent_id": 142,
  "k1": "z",
  "k2": "zq",
  "k3": "zuoquan",
  "k4": "",
  "k5": "县",
  "k6": 140722,
  "k7": "0354"
}, {
  "id": 759,
  "name": "和顺",
  "parent_id": 142,
  "k1": "h",
  "k2": "hs",
  "k3": "heshun",
  "k4": "",
  "k5": "县",
  "k6": 140723,
  "k7": "0354"
}, {
  "id": 760,
  "name": "昔阳",
  "parent_id": 142,
  "k1": "x",
  "k2": "xy",
  "k3": "xiyang",
  "k4": "",
  "k5": "县",
  "k6": 140724,
  "k7": "0354"
}, {
  "id": 761,
  "name": "寿阳",
  "parent_id": 142,
  "k1": "s",
  "k2": "sy",
  "k3": "shouyang",
  "k4": "",
  "k5": "县",
  "k6": 140725,
  "k7": "0354"
}, {
  "id": 762,
  "name": "太谷",
  "parent_id": 142,
  "k1": "t",
  "k2": "tg",
  "k3": "taigu",
  "k4": "",
  "k5": "县",
  "k6": 140726,
  "k7": "0354"
}, {
  "id": 763,
  "name": "祁县",
  "parent_id": 142,
  "k1": "q",
  "k2": "qx",
  "k3": "qixian",
  "k4": "",
  "k5": "",
  "k6": 140727,
  "k7": "0354"
}, {
  "id": 764,
  "name": "平遥",
  "parent_id": 142,
  "k1": "p",
  "k2": "py",
  "k3": "pingyao",
  "k4": "",
  "k5": "县",
  "k6": 140728,
  "k7": "0354"
}, {
  "id": 765,
  "name": "灵石",
  "parent_id": 142,
  "k1": "l",
  "k2": "ls",
  "k3": "lingshi",
  "k4": "",
  "k5": "县",
  "k6": 140729,
  "k7": "0354"
}, {
  "id": 766,
  "name": "介休",
  "parent_id": 142,
  "k1": "j",
  "k2": "jx",
  "k3": "jiexiu",
  "k4": "",
  "k5": "市",
  "k6": 140781,
  "k7": "0354"
}, {
  "id": 767,
  "name": "盐湖",
  "parent_id": 143,
  "k1": "y",
  "k2": "yh",
  "k3": "yanhu",
  "k4": "",
  "k5": "区",
  "k6": 140802,
  "k7": "0359"
}, {
  "id": 768,
  "name": "临猗",
  "parent_id": 143,
  "k1": "l",
  "k2": "ly",
  "k3": "linyi",
  "k4": "",
  "k5": "县",
  "k6": 140821,
  "k7": "0359"
}, {
  "id": 769,
  "name": "万荣",
  "parent_id": 143,
  "k1": "w",
  "k2": "wr",
  "k3": "wanrong",
  "k4": "",
  "k5": "县",
  "k6": 140822,
  "k7": "0359"
}, {
  "id": 770,
  "name": "闻喜",
  "parent_id": 143,
  "k1": "w",
  "k2": "wx",
  "k3": "wenxi",
  "k4": "",
  "k5": "县",
  "k6": 140823,
  "k7": "0359"
}, {
  "id": 771,
  "name": "稷山",
  "parent_id": 143,
  "k1": "j",
  "k2": "js",
  "k3": "jishan",
  "k4": "",
  "k5": "县",
  "k6": 140824,
  "k7": "0359"
}, {
  "id": 772,
  "name": "新绛",
  "parent_id": 143,
  "k1": "x",
  "k2": "xj",
  "k3": "xinjiang",
  "k4": "",
  "k5": "县",
  "k6": 140825,
  "k7": "0359"
}, {
  "id": 773,
  "name": "绛县",
  "parent_id": 143,
  "k1": "j",
  "k2": "jx",
  "k3": "jiangxian",
  "k4": "",
  "k5": "",
  "k6": 140826,
  "k7": "0359"
}, {
  "id": 774,
  "name": "垣曲",
  "parent_id": 143,
  "k1": "y",
  "k2": "yq",
  "k3": "yuanqu",
  "k4": "",
  "k5": "县",
  "k6": 140827,
  "k7": "0359"
}, {
  "id": 775,
  "name": "夏县",
  "parent_id": 143,
  "k1": "x",
  "k2": "xx",
  "k3": "xiaxian",
  "k4": "",
  "k5": "",
  "k6": 140828,
  "k7": "0359"
}, {
  "id": 776,
  "name": "平陆",
  "parent_id": 143,
  "k1": "p",
  "k2": "pl",
  "k3": "pinglu",
  "k4": "",
  "k5": "县",
  "k6": 140829,
  "k7": "0359"
}, {
  "id": 777,
  "name": "芮城",
  "parent_id": 143,
  "k1": "r",
  "k2": "rc",
  "k3": "ruicheng",
  "k4": "",
  "k5": "县",
  "k6": 140830,
  "k7": "0359"
}, {
  "id": 778,
  "name": "永济",
  "parent_id": 143,
  "k1": "y",
  "k2": "yj",
  "k3": "yongji",
  "k4": "",
  "k5": "市",
  "k6": 140881,
  "k7": "0359"
}, {
  "id": 779,
  "name": "河津",
  "parent_id": 143,
  "k1": "h",
  "k2": "hj",
  "k3": "hejin",
  "k4": "",
  "k5": "市",
  "k6": 140882,
  "k7": "0359"
}, {
  "id": 780,
  "name": "忻府",
  "parent_id": 144,
  "k1": "x",
  "k2": "xf",
  "k3": "xinfu",
  "k4": "",
  "k5": "区",
  "k6": 140902,
  "k7": "0350"
}, {
  "id": 781,
  "name": "定襄",
  "parent_id": 144,
  "k1": "d",
  "k2": "dx",
  "k3": "dingxiang",
  "k4": "",
  "k5": "县",
  "k6": 140921,
  "k7": "0350"
}, {
  "id": 782,
  "name": "五台",
  "parent_id": 144,
  "k1": "w",
  "k2": "wt",
  "k3": "wutai",
  "k4": "",
  "k5": "县",
  "k6": 140922,
  "k7": "0350"
}, {
  "id": 783,
  "name": "代县",
  "parent_id": 144,
  "k1": "d",
  "k2": "dx",
  "k3": "daixian",
  "k4": "",
  "k5": "",
  "k6": 140923,
  "k7": "0350"
}, {
  "id": 784,
  "name": "繁峙",
  "parent_id": 144,
  "k1": "f",
  "k2": "fz",
  "k3": "fanzhi",
  "k4": "",
  "k5": "县",
  "k6": 140924,
  "k7": "0350"
}, {
  "id": 785,
  "name": "宁武",
  "parent_id": 144,
  "k1": "n",
  "k2": "nw",
  "k3": "ningwu",
  "k4": "",
  "k5": "县",
  "k6": 140925,
  "k7": "0350"
}, {
  "id": 786,
  "name": "静乐",
  "parent_id": 144,
  "k1": "j",
  "k2": "jl",
  "k3": "jingle",
  "k4": "",
  "k5": "县",
  "k6": 140926,
  "k7": "0350"
}, {
  "id": 787,
  "name": "神池",
  "parent_id": 144,
  "k1": "s",
  "k2": "sc",
  "k3": "shenchi",
  "k4": "",
  "k5": "县",
  "k6": 140927,
  "k7": "0350"
}, {
  "id": 788,
  "name": "五寨",
  "parent_id": 144,
  "k1": "w",
  "k2": "wz",
  "k3": "wuzhai",
  "k4": "",
  "k5": "县",
  "k6": 140928,
  "k7": "0350"
}, {
  "id": 789,
  "name": "岢岚",
  "parent_id": 144,
  "k1": "k",
  "k2": "kl",
  "k3": "kelan",
  "k4": "",
  "k5": "县",
  "k6": 140929,
  "k7": "0350"
}, {
  "id": 790,
  "name": "河曲",
  "parent_id": 144,
  "k1": "h",
  "k2": "hq",
  "k3": "hequ",
  "k4": "",
  "k5": "县",
  "k6": 140930,
  "k7": "0350"
}, {
  "id": 791,
  "name": "保德",
  "parent_id": 144,
  "k1": "b",
  "k2": "bd",
  "k3": "baode",
  "k4": "",
  "k5": "县",
  "k6": 140931,
  "k7": "0350"
}, {
  "id": 792,
  "name": "偏关",
  "parent_id": 144,
  "k1": "p",
  "k2": "pg",
  "k3": "pianguan",
  "k4": "",
  "k5": "县",
  "k6": 140932,
  "k7": "0350"
}, {
  "id": 793,
  "name": "原平",
  "parent_id": 144,
  "k1": "y",
  "k2": "yp",
  "k3": "yuanping",
  "k4": "",
  "k5": "市",
  "k6": 140981,
  "k7": "0350"
}, {
  "id": 794,
  "name": "尧都",
  "parent_id": 145,
  "k1": "y",
  "k2": "yd",
  "k3": "yaodu",
  "k4": "",
  "k5": "区",
  "k6": 141002,
  "k7": "0357"
}, {
  "id": 795,
  "name": "曲沃",
  "parent_id": 145,
  "k1": "q",
  "k2": "qw",
  "k3": "quwo",
  "k4": "",
  "k5": "县",
  "k6": 141021,
  "k7": "0357"
}, {
  "id": 796,
  "name": "翼城",
  "parent_id": 145,
  "k1": "y",
  "k2": "yc",
  "k3": "yicheng",
  "k4": "",
  "k5": "县",
  "k6": 141022,
  "k7": "0357"
}, {
  "id": 797,
  "name": "襄汾",
  "parent_id": 145,
  "k1": "x",
  "k2": "xf",
  "k3": "xiangfen",
  "k4": "",
  "k5": "县",
  "k6": 141023,
  "k7": "0357"
}, {
  "id": 798,
  "name": "洪洞",
  "parent_id": 145,
  "k1": "h",
  "k2": "hd",
  "k3": "hongdong",
  "k4": "",
  "k5": "县",
  "k6": 141024,
  "k7": "0357"
}, {
  "id": 799,
  "name": "古县",
  "parent_id": 145,
  "k1": "g",
  "k2": "gx",
  "k3": "guxian",
  "k4": "",
  "k5": "",
  "k6": 141025,
  "k7": "0357"
}, {
  "id": 800,
  "name": "安泽",
  "parent_id": 145,
  "k1": "a",
  "k2": "az",
  "k3": "anze",
  "k4": "",
  "k5": "县",
  "k6": 141026,
  "k7": "0357"
}, {
  "id": 801,
  "name": "浮山",
  "parent_id": 145,
  "k1": "f",
  "k2": "fs",
  "k3": "fushan",
  "k4": "",
  "k5": "县",
  "k6": 141027,
  "k7": "0357"
}, {
  "id": 802,
  "name": "吉县",
  "parent_id": 145,
  "k1": "j",
  "k2": "jx",
  "k3": "jixian",
  "k4": "",
  "k5": "",
  "k6": 141028,
  "k7": "0357"
}, {
  "id": 803,
  "name": "乡宁",
  "parent_id": 145,
  "k1": "x",
  "k2": "xn",
  "k3": "xiangning",
  "k4": "",
  "k5": "县",
  "k6": 141029,
  "k7": "0357"
}, {
  "id": 804,
  "name": "大宁",
  "parent_id": 145,
  "k1": "d",
  "k2": "dn",
  "k3": "daning",
  "k4": "",
  "k5": "县",
  "k6": 141030,
  "k7": "0357"
}, {
  "id": 805,
  "name": "隰县",
  "parent_id": 145,
  "k1": "x",
  "k2": "xx",
  "k3": "xixian",
  "k4": "",
  "k5": "",
  "k6": 141031,
  "k7": "0357"
}, {
  "id": 806,
  "name": "永和",
  "parent_id": 145,
  "k1": "y",
  "k2": "yh",
  "k3": "yonghe",
  "k4": "",
  "k5": "县",
  "k6": 141032,
  "k7": "0357"
}, {
  "id": 807,
  "name": "蒲县",
  "parent_id": 145,
  "k1": "p",
  "k2": "px",
  "k3": "puxian",
  "k4": "",
  "k5": "",
  "k6": 141033,
  "k7": "0357"
}, {
  "id": 808,
  "name": "汾西",
  "parent_id": 145,
  "k1": "f",
  "k2": "fx",
  "k3": "fenxi",
  "k4": "",
  "k5": "县",
  "k6": 141034,
  "k7": "0357"
}, {
  "id": 809,
  "name": "侯马",
  "parent_id": 145,
  "k1": "h",
  "k2": "hm",
  "k3": "houma",
  "k4": "",
  "k5": "市",
  "k6": 141081,
  "k7": "0357"
}, {
  "id": 810,
  "name": "霍州",
  "parent_id": 145,
  "k1": "h",
  "k2": "hz",
  "k3": "huozhou",
  "k4": "",
  "k5": "市",
  "k6": 141082,
  "k7": "0357"
}, {
  "id": 811,
  "name": "离石",
  "parent_id": 146,
  "k1": "l",
  "k2": "ls",
  "k3": "lishi",
  "k4": "",
  "k5": "区",
  "k6": 141102,
  "k7": "0358"
}, {
  "id": 812,
  "name": "文水",
  "parent_id": 146,
  "k1": "w",
  "k2": "ws",
  "k3": "wenshui",
  "k4": "",
  "k5": "县",
  "k6": 141121,
  "k7": "0358"
}, {
  "id": 813,
  "name": "交城",
  "parent_id": 146,
  "k1": "j",
  "k2": "jc",
  "k3": "jiaocheng",
  "k4": "",
  "k5": "县",
  "k6": 141122,
  "k7": "0358"
}, {
  "id": 814,
  "name": "兴县",
  "parent_id": 146,
  "k1": "x",
  "k2": "xx",
  "k3": "xingxian",
  "k4": "",
  "k5": "",
  "k6": 141123,
  "k7": "0358"
}, {
  "id": 815,
  "name": "临县",
  "parent_id": 146,
  "k1": "l",
  "k2": "lx",
  "k3": "linxian",
  "k4": "",
  "k5": "",
  "k6": 141124,
  "k7": "0358"
}, {
  "id": 816,
  "name": "柳林",
  "parent_id": 146,
  "k1": "l",
  "k2": "ll",
  "k3": "liulin",
  "k4": "",
  "k5": "县",
  "k6": 141125,
  "k7": "0358"
}, {
  "id": 817,
  "name": "石楼",
  "parent_id": 146,
  "k1": "s",
  "k2": "sl",
  "k3": "shilou",
  "k4": "",
  "k5": "县",
  "k6": 141126,
  "k7": "0358"
}, {
  "id": 818,
  "name": "岚县",
  "parent_id": 146,
  "k1": "l",
  "k2": "lx",
  "k3": "lanxian",
  "k4": "",
  "k5": "",
  "k6": 141127,
  "k7": "0358"
}, {
  "id": 819,
  "name": "方山",
  "parent_id": 146,
  "k1": "f",
  "k2": "fs",
  "k3": "fangshan",
  "k4": "",
  "k5": "县",
  "k6": 141128,
  "k7": "0358"
}, {
  "id": 820,
  "name": "中阳",
  "parent_id": 146,
  "k1": "z",
  "k2": "zy",
  "k3": "zhongyang",
  "k4": "",
  "k5": "县",
  "k6": 141129,
  "k7": "0358"
}, {
  "id": 821,
  "name": "交口",
  "parent_id": 146,
  "k1": "j",
  "k2": "jk",
  "k3": "jiaokou",
  "k4": "",
  "k5": "县",
  "k6": 141130,
  "k7": "0358"
}, {
  "id": 822,
  "name": "孝义",
  "parent_id": 146,
  "k1": "x",
  "k2": "xy",
  "k3": "xiaoyi",
  "k4": "",
  "k5": "市",
  "k6": 141181,
  "k7": "0358"
}, {
  "id": 823,
  "name": "汾阳",
  "parent_id": 146,
  "k1": "f",
  "k2": "fy",
  "k3": "fenyang",
  "k4": "",
  "k5": "市",
  "k6": 141182,
  "k7": "0358"
}, {
  "id": 824,
  "name": "新城",
  "parent_id": 147,
  "k1": "x",
  "k2": "xc",
  "k3": "xincheng",
  "k4": "",
  "k5": "区",
  "k6": 150102,
  "k7": "0471"
}, {
  "id": 825,
  "name": "回民",
  "parent_id": 147,
  "k1": "h",
  "k2": "hm",
  "k3": "huimin",
  "k4": "",
  "k5": "区",
  "k6": 150103,
  "k7": "0471"
}, {
  "id": 826,
  "name": "玉泉",
  "parent_id": 147,
  "k1": "y",
  "k2": "yq",
  "k3": "yuquan",
  "k4": "",
  "k5": "区",
  "k6": 150104,
  "k7": "0471"
}, {
  "id": 827,
  "name": "赛罕",
  "parent_id": 147,
  "k1": "s",
  "k2": "sh",
  "k3": "saihan",
  "k4": "",
  "k5": "区",
  "k6": 150105,
  "k7": "0471"
}, {
  "id": 828,
  "name": "土默特左",
  "parent_id": 147,
  "k1": "t",
  "k2": "tmtz",
  "k3": "tumotezuo",
  "k4": "",
  "k5": "旗",
  "k6": 150121,
  "k7": "0471"
}, {
  "id": 829,
  "name": "托克托",
  "parent_id": 147,
  "k1": "t",
  "k2": "tkt",
  "k3": "tuoketuo",
  "k4": "",
  "k5": "县",
  "k6": 150122,
  "k7": "0471"
}, {
  "id": 830,
  "name": "和林格尔",
  "parent_id": 147,
  "k1": "h",
  "k2": "hlge",
  "k3": "helingeer",
  "k4": "",
  "k5": "县",
  "k6": 150123,
  "k7": "0471"
}, {
  "id": 831,
  "name": "清水河",
  "parent_id": 147,
  "k1": "q",
  "k2": "qsh",
  "k3": "qingshuihe",
  "k4": "",
  "k5": "县",
  "k6": 150124,
  "k7": "0471"
}, {
  "id": 832,
  "name": "武川",
  "parent_id": 147,
  "k1": "w",
  "k2": "wc",
  "k3": "wuchuan",
  "k4": "",
  "k5": "县",
  "k6": 150125,
  "k7": "0471"
}, {
  "id": 833,
  "name": "东河",
  "parent_id": 148,
  "k1": "d",
  "k2": "dh",
  "k3": "donghe",
  "k4": "",
  "k5": "区",
  "k6": 150202,
  "k7": "0472"
}, {
  "id": 834,
  "name": "昆都仑",
  "parent_id": 148,
  "k1": "k",
  "k2": "kdl",
  "k3": "kundulun",
  "k4": "",
  "k5": "区",
  "k6": 150203,
  "k7": "0472"
}, {
  "id": 835,
  "name": "青山",
  "parent_id": 148,
  "k1": "q",
  "k2": "qs",
  "k3": "qingshan",
  "k4": "",
  "k5": "区",
  "k6": 150204,
  "k7": "0472"
}, {
  "id": 836,
  "name": "石拐",
  "parent_id": 148,
  "k1": "s",
  "k2": "sg",
  "k3": "shiguai",
  "k4": "",
  "k5": "区",
  "k6": 150205,
  "k7": "0472"
}, {
  "id": 837,
  "name": "白云",
  "parent_id": 148,
  "k1": "b",
  "k2": "by",
  "k3": "baiyun",
  "k4": "矿",
  "k5": "区",
  "k6": 150206,
  "k7": "0472"
}, {
  "id": 838,
  "name": "九原",
  "parent_id": 148,
  "k1": "j",
  "k2": "jy",
  "k3": "jiuyuan",
  "k4": "",
  "k5": "区",
  "k6": 150207,
  "k7": "0472"
}, {
  "id": 839,
  "name": "土默特右",
  "parent_id": 148,
  "k1": "t",
  "k2": "tmty",
  "k3": "tumoteyou",
  "k4": "",
  "k5": "旗",
  "k6": 150221,
  "k7": "0472"
}, {
  "id": 840,
  "name": "固阳",
  "parent_id": 148,
  "k1": "g",
  "k2": "gy",
  "k3": "guyang",
  "k4": "",
  "k5": "县",
  "k6": 150222,
  "k7": "0472"
}, {
  "id": 841,
  "name": "达尔罕茂明安",
  "parent_id": 148,
  "k1": "d",
  "k2": "dehmma",
  "k3": "daerhanmaomingan",
  "k4": "联合",
  "k5": "旗",
  "k6": 150223,
  "k7": "0472"
}, {
  "id": 842,
  "name": "海勃湾",
  "parent_id": 149,
  "k1": "h",
  "k2": "hbw",
  "k3": "haibowan",
  "k4": "",
  "k5": "区",
  "k6": 150302,
  "k7": "0473"
}, {
  "id": 843,
  "name": "海南",
  "parent_id": 149,
  "k1": "h",
  "k2": "hn",
  "k3": "hainan",
  "k4": "",
  "k5": "区",
  "k6": 150303,
  "k7": "0473"
}, {
  "id": 844,
  "name": "乌达",
  "parent_id": 149,
  "k1": "w",
  "k2": "wd",
  "k3": "wuda",
  "k4": "",
  "k5": "区",
  "k6": 150304,
  "k7": "0473"
}, {
  "id": 845,
  "name": "红山",
  "parent_id": 150,
  "k1": "h",
  "k2": "hs",
  "k3": "hongshan",
  "k4": "",
  "k5": "区",
  "k6": 150402,
  "k7": "0476"
}, {
  "id": 846,
  "name": "元宝山",
  "parent_id": 150,
  "k1": "y",
  "k2": "ybs",
  "k3": "yuanbaoshan",
  "k4": "",
  "k5": "区",
  "k6": 150403,
  "k7": "0476"
}, {
  "id": 847,
  "name": "松山",
  "parent_id": 150,
  "k1": "s",
  "k2": "ss",
  "k3": "songshan",
  "k4": "",
  "k5": "区",
  "k6": 150404,
  "k7": "0476"
}, {
  "id": 848,
  "name": "阿鲁科尔沁",
  "parent_id": 150,
  "k1": "a",
  "k2": "alkeq",
  "k3": "alukeerqin",
  "k4": "",
  "k5": "旗",
  "k6": 150421,
  "k7": "0476"
}, {
  "id": 849,
  "name": "巴林左",
  "parent_id": 150,
  "k1": "b",
  "k2": "blz",
  "k3": "balinzuo",
  "k4": "",
  "k5": "旗",
  "k6": 150422,
  "k7": "0476"
}, {
  "id": 850,
  "name": "巴林右",
  "parent_id": 150,
  "k1": "b",
  "k2": "bly",
  "k3": "balinyou",
  "k4": "",
  "k5": "旗",
  "k6": 150423,
  "k7": "0476"
}, {
  "id": 851,
  "name": "林西",
  "parent_id": 150,
  "k1": "l",
  "k2": "lx",
  "k3": "linxi",
  "k4": "",
  "k5": "县",
  "k6": 150424,
  "k7": "0476"
}, {
  "id": 852,
  "name": "克什克腾",
  "parent_id": 150,
  "k1": "k",
  "k2": "kskt",
  "k3": "keshenketeng",
  "k4": "",
  "k5": "旗",
  "k6": 150425,
  "k7": "0476"
}, {
  "id": 853,
  "name": "翁牛特",
  "parent_id": 150,
  "k1": "w",
  "k2": "wnt",
  "k3": "wengniute",
  "k4": "",
  "k5": "旗",
  "k6": 150426,
  "k7": "0476"
}, {
  "id": 854,
  "name": "喀喇沁",
  "parent_id": 150,
  "k1": "k",
  "k2": "klq",
  "k3": "kalaqin",
  "k4": "",
  "k5": "旗",
  "k6": 150428,
  "k7": "0476"
}, {
  "id": 855,
  "name": "宁城",
  "parent_id": 150,
  "k1": "n",
  "k2": "nc",
  "k3": "ningcheng",
  "k4": "",
  "k5": "县",
  "k6": 150429,
  "k7": "0476"
}, {
  "id": 856,
  "name": "敖汉",
  "parent_id": 150,
  "k1": "a",
  "k2": "ah",
  "k3": "aohan",
  "k4": "",
  "k5": "旗",
  "k6": 150430,
  "k7": "0476"
}, {
  "id": 857,
  "name": "科尔沁",
  "parent_id": 151,
  "k1": "k",
  "k2": "keq",
  "k3": "keerqin",
  "k4": "",
  "k5": "区",
  "k6": 150502,
  "k7": "0475"
}, {
  "id": 858,
  "name": "科尔沁左翼中",
  "parent_id": 151,
  "k1": "k",
  "k2": "keqzyz",
  "k3": "keerqinzuoyizhong",
  "k4": "",
  "k5": "旗",
  "k6": 150521,
  "k7": "0475"
}, {
  "id": 859,
  "name": "科尔沁左翼后",
  "parent_id": 151,
  "k1": "k",
  "k2": "keqzyh",
  "k3": "keerqinzuoyihou",
  "k4": "",
  "k5": "旗",
  "k6": 150522,
  "k7": "0475"
}, {
  "id": 860,
  "name": "开鲁",
  "parent_id": 151,
  "k1": "k",
  "k2": "kl",
  "k3": "kailu",
  "k4": "",
  "k5": "县",
  "k6": 150523,
  "k7": "0475"
}, {
  "id": 861,
  "name": "库伦",
  "parent_id": 151,
  "k1": "k",
  "k2": "kl",
  "k3": "kulun",
  "k4": "",
  "k5": "旗",
  "k6": 150524,
  "k7": "0475"
}, {
  "id": 862,
  "name": "奈曼",
  "parent_id": 151,
  "k1": "n",
  "k2": "nm",
  "k3": "naiman",
  "k4": "",
  "k5": "旗",
  "k6": 150525,
  "k7": "0475"
}, {
  "id": 863,
  "name": "扎鲁特",
  "parent_id": 151,
  "k1": "z",
  "k2": "zlt",
  "k3": "zhalute",
  "k4": "",
  "k5": "旗",
  "k6": 150526,
  "k7": "0475"
}, {
  "id": 864,
  "name": "霍林郭勒",
  "parent_id": 151,
  "k1": "h",
  "k2": "hlgl",
  "k3": "huolinguole",
  "k4": "",
  "k5": "市",
  "k6": 150581,
  "k7": "0475"
}, {
  "id": 865,
  "name": "东胜",
  "parent_id": 152,
  "k1": "d",
  "k2": "ds",
  "k3": "dongsheng",
  "k4": "",
  "k5": "区",
  "k6": 150602,
  "k7": "0477"
}, {
  "id": 866,
  "name": "达拉特",
  "parent_id": 152,
  "k1": "d",
  "k2": "dlt",
  "k3": "dalate",
  "k4": "",
  "k5": "旗",
  "k6": 150621,
  "k7": "0477"
}, {
  "id": 867,
  "name": "准格尔",
  "parent_id": 152,
  "k1": "z",
  "k2": "zge",
  "k3": "zhungeer",
  "k4": "",
  "k5": "旗",
  "k6": 150622,
  "k7": "0477"
}, {
  "id": 868,
  "name": "鄂托克前",
  "parent_id": 152,
  "k1": "e",
  "k2": "etkq",
  "k3": "etuokeqian",
  "k4": "",
  "k5": "旗",
  "k6": 150623,
  "k7": "0477"
}, {
  "id": 869,
  "name": "鄂托克",
  "parent_id": 152,
  "k1": "e",
  "k2": "etk",
  "k3": "etuoke",
  "k4": "",
  "k5": "旗",
  "k6": 150624,
  "k7": "0477"
}, {
  "id": 870,
  "name": "杭锦",
  "parent_id": 152,
  "k1": "h",
  "k2": "hj",
  "k3": "hangjin",
  "k4": "",
  "k5": "旗",
  "k6": 150625,
  "k7": "0477"
}, {
  "id": 871,
  "name": "乌审",
  "parent_id": 152,
  "k1": "w",
  "k2": "ws",
  "k3": "wushen",
  "k4": "",
  "k5": "旗",
  "k6": 150626,
  "k7": "0477"
}, {
  "id": 872,
  "name": "伊金霍洛",
  "parent_id": 152,
  "k1": "y",
  "k2": "yjhl",
  "k3": "yijinhuoluo",
  "k4": "",
  "k5": "旗",
  "k6": 150627,
  "k7": "0477"
}, {
  "id": 873,
  "name": "海拉尔",
  "parent_id": 153,
  "k1": "h",
  "k2": "hle",
  "k3": "hailaer",
  "k4": "",
  "k5": "区",
  "k6": 150702,
  "k7": "0470"
}, {
  "id": 874,
  "name": "阿荣",
  "parent_id": 153,
  "k1": "a",
  "k2": "ar",
  "k3": "arong",
  "k4": "",
  "k5": "旗",
  "k6": 150721,
  "k7": "0470"
}, {
  "id": 875,
  "name": "莫力达瓦",
  "parent_id": 153,
  "k1": "m",
  "k2": "mldw",
  "k3": "molidawa",
  "k4": "达斡尔族",
  "k5": "自治旗",
  "k6": 150722,
  "k7": "0470"
}, {
  "id": 876,
  "name": "鄂伦春",
  "parent_id": 153,
  "k1": "e",
  "k2": "elc",
  "k3": "elunchun",
  "k4": "",
  "k5": "自治旗",
  "k6": 150723,
  "k7": "0470"
}, {
  "id": 877,
  "name": "鄂温克族",
  "parent_id": 153,
  "k1": "e",
  "k2": "ewkz",
  "k3": "ewenkezu",
  "k4": "",
  "k5": "自治旗",
  "k6": 150724,
  "k7": "0470"
}, {
  "id": 878,
  "name": "陈巴尔虎",
  "parent_id": 153,
  "k1": "c",
  "k2": "cbeh",
  "k3": "chenbaerhu",
  "k4": "",
  "k5": "旗",
  "k6": 150725,
  "k7": "0470"
}, {
  "id": 879,
  "name": "新巴尔虎左",
  "parent_id": 153,
  "k1": "x",
  "k2": "xbehz",
  "k3": "xinbaerhuzuo",
  "k4": "",
  "k5": "旗",
  "k6": 150726,
  "k7": "0470"
}, {
  "id": 880,
  "name": "新巴尔虎右",
  "parent_id": 153,
  "k1": "x",
  "k2": "xbehy",
  "k3": "xinbaerhuyou",
  "k4": "",
  "k5": "旗",
  "k6": 150727,
  "k7": "0470"
}, {
  "id": 881,
  "name": "满洲里",
  "parent_id": 153,
  "k1": "m",
  "k2": "mzl",
  "k3": "manzhouli",
  "k4": "",
  "k5": "市",
  "k6": 150781,
  "k7": "0470"
}, {
  "id": 882,
  "name": "牙克石",
  "parent_id": 153,
  "k1": "y",
  "k2": "yks",
  "k3": "yakeshi",
  "k4": "",
  "k5": "市",
  "k6": 150782,
  "k7": "0470"
}, {
  "id": 883,
  "name": "扎兰屯",
  "parent_id": 153,
  "k1": "z",
  "k2": "zlt",
  "k3": "zhalantun",
  "k4": "",
  "k5": "市",
  "k6": 150783,
  "k7": "0470"
}, {
  "id": 884,
  "name": "额尔古纳",
  "parent_id": 153,
  "k1": "e",
  "k2": "eegn",
  "k3": "eerguna",
  "k4": "",
  "k5": "市",
  "k6": 150784,
  "k7": "0470"
}, {
  "id": 885,
  "name": "根河",
  "parent_id": 153,
  "k1": "g",
  "k2": "gh",
  "k3": "genhe",
  "k4": "",
  "k5": "市",
  "k6": 150785,
  "k7": "0470"
}, {
  "id": 886,
  "name": "临河",
  "parent_id": 154,
  "k1": "l",
  "k2": "lh",
  "k3": "linhe",
  "k4": "",
  "k5": "区",
  "k6": 150802,
  "k7": "0478"
}, {
  "id": 887,
  "name": "五原",
  "parent_id": 154,
  "k1": "w",
  "k2": "wy",
  "k3": "wuyuan",
  "k4": "",
  "k5": "县",
  "k6": 150821,
  "k7": "0478"
}, {
  "id": 888,
  "name": "磴口",
  "parent_id": 154,
  "k1": "d",
  "k2": "dk",
  "k3": "dengkou",
  "k4": "",
  "k5": "县",
  "k6": 150822,
  "k7": "0478"
}, {
  "id": 889,
  "name": "乌拉特前",
  "parent_id": 154,
  "k1": "w",
  "k2": "wltq",
  "k3": "wulateqian",
  "k4": "",
  "k5": "旗",
  "k6": 150823,
  "k7": "0478"
}, {
  "id": 890,
  "name": "乌拉特中",
  "parent_id": 154,
  "k1": "w",
  "k2": "wltz",
  "k3": "wulatezhong",
  "k4": "",
  "k5": "旗",
  "k6": 150824,
  "k7": "0478"
}, {
  "id": 891,
  "name": "乌拉特后",
  "parent_id": 154,
  "k1": "w",
  "k2": "wlth",
  "k3": "wulatehou",
  "k4": "",
  "k5": "旗",
  "k6": 150825,
  "k7": "0478"
}, {
  "id": 892,
  "name": "杭锦后",
  "parent_id": 154,
  "k1": "h",
  "k2": "hjh",
  "k3": "hangjinhou",
  "k4": "",
  "k5": "旗",
  "k6": 150826,
  "k7": "0478"
}, {
  "id": 893,
  "name": "集宁",
  "parent_id": 155,
  "k1": "j",
  "k2": "jn",
  "k3": "jining",
  "k4": "",
  "k5": "区",
  "k6": 150902,
  "k7": "0474"
}, {
  "id": 894,
  "name": "卓资",
  "parent_id": 155,
  "k1": "z",
  "k2": "zz",
  "k3": "zhuozi",
  "k4": "",
  "k5": "县",
  "k6": 150921,
  "k7": "0474"
}, {
  "id": 895,
  "name": "化德",
  "parent_id": 155,
  "k1": "h",
  "k2": "hd",
  "k3": "huade",
  "k4": "",
  "k5": "县",
  "k6": 150922,
  "k7": "0474"
}, {
  "id": 896,
  "name": "商都",
  "parent_id": 155,
  "k1": "s",
  "k2": "sd",
  "k3": "shangdu",
  "k4": "",
  "k5": "县",
  "k6": 150923,
  "k7": "0474"
}, {
  "id": 897,
  "name": "兴和",
  "parent_id": 155,
  "k1": "x",
  "k2": "xh",
  "k3": "xinghe",
  "k4": "",
  "k5": "县",
  "k6": 150924,
  "k7": "0474"
}, {
  "id": 898,
  "name": "凉城",
  "parent_id": 155,
  "k1": "l",
  "k2": "lc",
  "k3": "liangcheng",
  "k4": "",
  "k5": "县",
  "k6": 150925,
  "k7": "0474"
}, {
  "id": 899,
  "name": "察哈尔右翼前",
  "parent_id": 155,
  "k1": "c",
  "k2": "cheyyq",
  "k3": "chahaeryouyiqian",
  "k4": "",
  "k5": "旗",
  "k6": 150926,
  "k7": "0474"
}, {
  "id": 900,
  "name": "察哈尔右翼中",
  "parent_id": 155,
  "k1": "c",
  "k2": "cheyyz",
  "k3": "chahaeryouyizhong",
  "k4": "",
  "k5": "旗",
  "k6": 150927,
  "k7": "0474"
}, {
  "id": 901,
  "name": "察哈尔右翼后",
  "parent_id": 155,
  "k1": "c",
  "k2": "cheyyh",
  "k3": "chahaeryouyihou",
  "k4": "",
  "k5": "旗",
  "k6": 150928,
  "k7": "0474"
}, {
  "id": 902,
  "name": "四子王",
  "parent_id": 155,
  "k1": "s",
  "k2": "szw",
  "k3": "siziwang",
  "k4": "",
  "k5": "旗",
  "k6": 150929,
  "k7": "0474"
}, {
  "id": 903,
  "name": "丰镇",
  "parent_id": 155,
  "k1": "f",
  "k2": "fz",
  "k3": "fengzhen",
  "k4": "",
  "k5": "市",
  "k6": 150981,
  "k7": "0474"
}, {
  "id": 904,
  "name": "乌兰浩特",
  "parent_id": 156,
  "k1": "w",
  "k2": "wlht",
  "k3": "wulanhaote",
  "k4": "",
  "k5": "市",
  "k6": 152201,
  "k7": "0482"
}, {
  "id": 905,
  "name": "阿尔山",
  "parent_id": 156,
  "k1": "a",
  "k2": "aes",
  "k3": "aershan",
  "k4": "",
  "k5": "市",
  "k6": 152202,
  "k7": "0482"
}, {
  "id": 906,
  "name": "科尔沁右翼前",
  "parent_id": 156,
  "k1": "k",
  "k2": "keqyyq",
  "k3": "keerqinyouyiqian",
  "k4": "",
  "k5": "旗",
  "k6": 152221,
  "k7": "0482"
}, {
  "id": 907,
  "name": "科尔沁右翼中",
  "parent_id": 156,
  "k1": "k",
  "k2": "keqyyz",
  "k3": "keerqinyouyizhong",
  "k4": "",
  "k5": "旗",
  "k6": 152222,
  "k7": "0482"
}, {
  "id": 908,
  "name": "扎赉特",
  "parent_id": 156,
  "k1": "z",
  "k2": "zlt",
  "k3": "zhalaite",
  "k4": "",
  "k5": "旗",
  "k6": 152223,
  "k7": "0482"
}, {
  "id": 909,
  "name": "突泉",
  "parent_id": 156,
  "k1": "t",
  "k2": "tq",
  "k3": "tuquan",
  "k4": "",
  "k5": "县",
  "k6": 152224,
  "k7": "0482"
}, {
  "id": 910,
  "name": "二连浩特",
  "parent_id": 157,
  "k1": "e",
  "k2": "elht",
  "k3": "erlianhaote",
  "k4": "",
  "k5": "市",
  "k6": 152501,
  "k7": "0479"
}, {
  "id": 911,
  "name": "锡林浩特",
  "parent_id": 157,
  "k1": "x",
  "k2": "xlht",
  "k3": "xilinhaote",
  "k4": "",
  "k5": "市",
  "k6": 152502,
  "k7": "0479"
}, {
  "id": 912,
  "name": "阿巴嘎",
  "parent_id": 157,
  "k1": "a",
  "k2": "abg",
  "k3": "abaga",
  "k4": "",
  "k5": "旗",
  "k6": 152522,
  "k7": "0479"
}, {
  "id": 913,
  "name": "苏尼特左",
  "parent_id": 157,
  "k1": "s",
  "k2": "sntz",
  "k3": "sunitezuo",
  "k4": "",
  "k5": "旗",
  "k6": 152523,
  "k7": "0479"
}, {
  "id": 914,
  "name": "苏尼特右",
  "parent_id": 157,
  "k1": "s",
  "k2": "snty",
  "k3": "suniteyou",
  "k4": "",
  "k5": "旗",
  "k6": 152524,
  "k7": "0479"
}, {
  "id": 915,
  "name": "东乌珠穆沁",
  "parent_id": 157,
  "k1": "d",
  "k2": "dwzmq",
  "k3": "dongwuzhumuqin",
  "k4": "",
  "k5": "旗",
  "k6": 152525,
  "k7": "0479"
}, {
  "id": 916,
  "name": "西乌珠穆沁",
  "parent_id": 157,
  "k1": "x",
  "k2": "xwzmq",
  "k3": "xiwuzhumuqin",
  "k4": "",
  "k5": "旗",
  "k6": 152526,
  "k7": "0479"
}, {
  "id": 917,
  "name": "太仆寺",
  "parent_id": 157,
  "k1": "t",
  "k2": "tps",
  "k3": "taipusi",
  "k4": "",
  "k5": "旗",
  "k6": 152527,
  "k7": "0479"
}, {
  "id": 918,
  "name": "镶黄",
  "parent_id": 157,
  "k1": "x",
  "k2": "xh",
  "k3": "xianghuang",
  "k4": "",
  "k5": "旗",
  "k6": 152528,
  "k7": "0479"
}, {
  "id": 919,
  "name": "正镶白",
  "parent_id": 157,
  "k1": "z",
  "k2": "zxb",
  "k3": "zhengxiangbai",
  "k4": "",
  "k5": "旗",
  "k6": 152529,
  "k7": "0479"
}, {
  "id": 920,
  "name": "正蓝",
  "parent_id": 157,
  "k1": "z",
  "k2": "zl",
  "k3": "zhenglan",
  "k4": "",
  "k5": "旗",
  "k6": 152530,
  "k7": "0479"
}, {
  "id": 921,
  "name": "多伦",
  "parent_id": 157,
  "k1": "d",
  "k2": "dl",
  "k3": "duolun",
  "k4": "",
  "k5": "县",
  "k6": 152531,
  "k7": "0479"
}, {
  "id": 922,
  "name": "阿拉善左",
  "parent_id": 158,
  "k1": "a",
  "k2": "alsz",
  "k3": "alashanzuo",
  "k4": "",
  "k5": "旗",
  "k6": 152921,
  "k7": "0483"
}, {
  "id": 923,
  "name": "阿拉善右",
  "parent_id": 158,
  "k1": "a",
  "k2": "alsy",
  "k3": "alashanyou",
  "k4": "",
  "k5": "旗",
  "k6": 152922,
  "k7": "0483"
}, {
  "id": 924,
  "name": "额济纳",
  "parent_id": 158,
  "k1": "e",
  "k2": "ejn",
  "k3": "ejina",
  "k4": "",
  "k5": "旗",
  "k6": 152923,
  "k7": "0483"
}, {
  "id": 925,
  "name": "和平",
  "parent_id": 159,
  "k1": "h",
  "k2": "hp",
  "k3": "heping",
  "k4": "",
  "k5": "区",
  "k6": 210102,
  "k7": "024"
}, {
  "id": 926,
  "name": "沈河",
  "parent_id": 159,
  "k1": "s",
  "k2": "sh",
  "k3": "shenhe",
  "k4": "",
  "k5": "区",
  "k6": 210103,
  "k7": "024"
}, {
  "id": 927,
  "name": "大东",
  "parent_id": 159,
  "k1": "d",
  "k2": "dd",
  "k3": "dadong",
  "k4": "",
  "k5": "区",
  "k6": 210104,
  "k7": "024"
}, {
  "id": 928,
  "name": "皇姑",
  "parent_id": 159,
  "k1": "h",
  "k2": "hg",
  "k3": "huanggu",
  "k4": "",
  "k5": "区",
  "k6": 210105,
  "k7": "024"
}, {
  "id": 929,
  "name": "铁西",
  "parent_id": 159,
  "k1": "t",
  "k2": "tx",
  "k3": "tiexi",
  "k4": "",
  "k5": "区",
  "k6": 210106,
  "k7": "024"
}, {
  "id": 930,
  "name": "苏家屯",
  "parent_id": 159,
  "k1": "s",
  "k2": "sjt",
  "k3": "sujiatun",
  "k4": "",
  "k5": "区",
  "k6": 210111,
  "k7": "024"
}, {
  "id": 931,
  "name": "浑南",
  "parent_id": 159,
  "k1": "h",
  "k2": "hn",
  "k3": "hunnan",
  "k4": "",
  "k5": "区",
  "k6": 210112,
  "k7": "024"
}, {
  "id": 932,
  "name": "沈北新区",
  "parent_id": 159,
  "k1": "s",
  "k2": "sbxq",
  "k3": "shenbeixinqu",
  "k4": "",
  "k5": "",
  "k6": 210113,
  "k7": "024"
}, {
  "id": 933,
  "name": "于洪",
  "parent_id": 159,
  "k1": "y",
  "k2": "yh",
  "k3": "yuhong",
  "k4": "",
  "k5": "区",
  "k6": 210114,
  "k7": "024"
}, {
  "id": 934,
  "name": "辽中",
  "parent_id": 159,
  "k1": "l",
  "k2": "lz",
  "k3": "liaozhong",
  "k4": "",
  "k5": "区",
  "k6": 210115,
  "k7": "024"
}, {
  "id": 935,
  "name": "康平",
  "parent_id": 159,
  "k1": "k",
  "k2": "kp",
  "k3": "kangping",
  "k4": "",
  "k5": "县",
  "k6": 210123,
  "k7": "024"
}, {
  "id": 936,
  "name": "法库",
  "parent_id": 159,
  "k1": "f",
  "k2": "fk",
  "k3": "faku",
  "k4": "",
  "k5": "县",
  "k6": 210124,
  "k7": "024"
}, {
  "id": 937,
  "name": "新民",
  "parent_id": 159,
  "k1": "x",
  "k2": "xm",
  "k3": "xinmin",
  "k4": "",
  "k5": "市",
  "k6": 210181,
  "k7": "024"
}, {
  "id": 938,
  "name": "中山",
  "parent_id": 160,
  "k1": "z",
  "k2": "zs",
  "k3": "zhongshan",
  "k4": "",
  "k5": "区",
  "k6": 210202,
  "k7": "0411"
}, {
  "id": 939,
  "name": "西岗",
  "parent_id": 160,
  "k1": "x",
  "k2": "xg",
  "k3": "xigang",
  "k4": "",
  "k5": "区",
  "k6": 210203,
  "k7": "0411"
}, {
  "id": 940,
  "name": "沙河口",
  "parent_id": 160,
  "k1": "s",
  "k2": "shk",
  "k3": "shahekou",
  "k4": "",
  "k5": "区",
  "k6": 210204,
  "k7": "0411"
}, {
  "id": 941,
  "name": "甘井子",
  "parent_id": 160,
  "k1": "g",
  "k2": "gjz",
  "k3": "ganjingzi",
  "k4": "",
  "k5": "区",
  "k6": 210211,
  "k7": "0411"
}, {
  "id": 942,
  "name": "旅顺口",
  "parent_id": 160,
  "k1": "l",
  "k2": "lsk",
  "k3": "lu:shunkou",
  "k4": "",
  "k5": "区",
  "k6": 210212,
  "k7": "0411"
}, {
  "id": 943,
  "name": "金州",
  "parent_id": 160,
  "k1": "j",
  "k2": "jz",
  "k3": "jinzhou",
  "k4": "",
  "k5": "区",
  "k6": 210213,
  "k7": "0411"
}, {
  "id": 944,
  "name": "长海",
  "parent_id": 160,
  "k1": "c",
  "k2": "ch",
  "k3": "changhai",
  "k4": "",
  "k5": "县",
  "k6": 210224,
  "k7": "0411"
}, {
  "id": 945,
  "name": "瓦房店",
  "parent_id": 160,
  "k1": "w",
  "k2": "wfd",
  "k3": "wafangdian",
  "k4": "",
  "k5": "市",
  "k6": 210281,
  "k7": "0411"
}, {
  "id": 946,
  "name": "普兰店",
  "parent_id": 160,
  "k1": "p",
  "k2": "pld",
  "k3": "pulandian",
  "k4": "",
  "k5": "区",
  "k6": 210282,
  "k7": "0411"
}, {
  "id": 947,
  "name": "庄河",
  "parent_id": 160,
  "k1": "z",
  "k2": "zh",
  "k3": "zhuanghe",
  "k4": "",
  "k5": "市",
  "k6": 210283,
  "k7": "0411"
}, {
  "id": 948,
  "name": "铁东",
  "parent_id": 161,
  "k1": "t",
  "k2": "td",
  "k3": "tiedong",
  "k4": "",
  "k5": "区",
  "k6": 210302,
  "k7": "0412"
}, {
  "id": 949,
  "name": "铁西",
  "parent_id": 161,
  "k1": "t",
  "k2": "tx",
  "k3": "tiexi",
  "k4": "",
  "k5": "区",
  "k6": 210303,
  "k7": "0412"
}, {
  "id": 950,
  "name": "立山",
  "parent_id": 161,
  "k1": "l",
  "k2": "ls",
  "k3": "lishan",
  "k4": "",
  "k5": "区",
  "k6": 210304,
  "k7": "0412"
}, {
  "id": 951,
  "name": "千山",
  "parent_id": 161,
  "k1": "q",
  "k2": "qs",
  "k3": "qianshan",
  "k4": "",
  "k5": "区",
  "k6": 210311,
  "k7": "0412"
}, {
  "id": 952,
  "name": "台安",
  "parent_id": 161,
  "k1": "t",
  "k2": "ta",
  "k3": "taian",
  "k4": "",
  "k5": "县",
  "k6": 210321,
  "k7": "0412"
}, {
  "id": 953,
  "name": "岫岩",
  "parent_id": 161,
  "k1": "x",
  "k2": "xy",
  "k3": "xiuyan",
  "k4": "满族",
  "k5": "自治县",
  "k6": 210323,
  "k7": "0412"
}, {
  "id": 954,
  "name": "海城",
  "parent_id": 161,
  "k1": "h",
  "k2": "hc",
  "k3": "haicheng",
  "k4": "",
  "k5": "市",
  "k6": 210381,
  "k7": "0412"
}, {
  "id": 955,
  "name": "新抚",
  "parent_id": 162,
  "k1": "x",
  "k2": "xf",
  "k3": "xinfu",
  "k4": "",
  "k5": "区",
  "k6": 210402,
  "k7": "0413"
}, {
  "id": 956,
  "name": "东洲",
  "parent_id": 162,
  "k1": "d",
  "k2": "dz",
  "k3": "dongzhou",
  "k4": "",
  "k5": "区",
  "k6": 210403,
  "k7": "0413"
}, {
  "id": 957,
  "name": "望花",
  "parent_id": 162,
  "k1": "w",
  "k2": "wh",
  "k3": "wanghua",
  "k4": "",
  "k5": "区",
  "k6": 210404,
  "k7": "0413"
}, {
  "id": 958,
  "name": "顺城",
  "parent_id": 162,
  "k1": "s",
  "k2": "sc",
  "k3": "shuncheng",
  "k4": "",
  "k5": "区",
  "k6": 210411,
  "k7": "0413"
}, {
  "id": 959,
  "name": "抚顺",
  "parent_id": 162,
  "k1": "f",
  "k2": "fs",
  "k3": "fushun",
  "k4": "",
  "k5": "县",
  "k6": 210421,
  "k7": "0413"
}, {
  "id": 960,
  "name": "新宾",
  "parent_id": 162,
  "k1": "x",
  "k2": "xb",
  "k3": "xinbin",
  "k4": "满族",
  "k5": "自治县",
  "k6": 210422,
  "k7": "0413"
}, {
  "id": 961,
  "name": "清原",
  "parent_id": 162,
  "k1": "q",
  "k2": "qy",
  "k3": "qingyuan",
  "k4": "满族",
  "k5": "自治县",
  "k6": 210423,
  "k7": "0413"
}, {
  "id": 962,
  "name": "平山",
  "parent_id": 163,
  "k1": "p",
  "k2": "ps",
  "k3": "pingshan",
  "k4": "",
  "k5": "区",
  "k6": 210502,
  "k7": "0414"
}, {
  "id": 963,
  "name": "溪湖",
  "parent_id": 163,
  "k1": "x",
  "k2": "xh",
  "k3": "xihu",
  "k4": "",
  "k5": "区",
  "k6": 210503,
  "k7": "0414"
}, {
  "id": 964,
  "name": "明山",
  "parent_id": 163,
  "k1": "m",
  "k2": "ms",
  "k3": "mingshan",
  "k4": "",
  "k5": "区",
  "k6": 210504,
  "k7": "0414"
}, {
  "id": 965,
  "name": "南芬",
  "parent_id": 163,
  "k1": "n",
  "k2": "nf",
  "k3": "nanfen",
  "k4": "",
  "k5": "区",
  "k6": 210505,
  "k7": "0414"
}, {
  "id": 966,
  "name": "本溪",
  "parent_id": 163,
  "k1": "b",
  "k2": "bx",
  "k3": "benxi",
  "k4": "满族",
  "k5": "自治县",
  "k6": 210521,
  "k7": "0414"
}, {
  "id": 967,
  "name": "桓仁",
  "parent_id": 163,
  "k1": "h",
  "k2": "hr",
  "k3": "huanren",
  "k4": "满族",
  "k5": "自治县",
  "k6": 210522,
  "k7": "0414"
}, {
  "id": 968,
  "name": "元宝",
  "parent_id": 164,
  "k1": "y",
  "k2": "yb",
  "k3": "yuanbao",
  "k4": "",
  "k5": "区",
  "k6": 210602,
  "k7": "0415"
}, {
  "id": 969,
  "name": "振兴",
  "parent_id": 164,
  "k1": "z",
  "k2": "zx",
  "k3": "zhenxing",
  "k4": "",
  "k5": "区",
  "k6": 210603,
  "k7": "0415"
}, {
  "id": 970,
  "name": "振安",
  "parent_id": 164,
  "k1": "z",
  "k2": "za",
  "k3": "zhenan",
  "k4": "",
  "k5": "区",
  "k6": 210604,
  "k7": "0415"
}, {
  "id": 971,
  "name": "宽甸",
  "parent_id": 164,
  "k1": "k",
  "k2": "kd",
  "k3": "kuandian",
  "k4": "满族",
  "k5": "自治县",
  "k6": 210624,
  "k7": "0415"
}, {
  "id": 972,
  "name": "东港",
  "parent_id": 164,
  "k1": "d",
  "k2": "dg",
  "k3": "donggang",
  "k4": "",
  "k5": "市",
  "k6": 210681,
  "k7": "0415"
}, {
  "id": 973,
  "name": "凤城",
  "parent_id": 164,
  "k1": "f",
  "k2": "fc",
  "k3": "fengcheng",
  "k4": "",
  "k5": "市",
  "k6": 210682,
  "k7": "0415"
}, {
  "id": 974,
  "name": "古塔",
  "parent_id": 165,
  "k1": "g",
  "k2": "gt",
  "k3": "guta",
  "k4": "",
  "k5": "区",
  "k6": 210702,
  "k7": "0416"
}, {
  "id": 975,
  "name": "凌河",
  "parent_id": 165,
  "k1": "l",
  "k2": "lh",
  "k3": "linghe",
  "k4": "",
  "k5": "区",
  "k6": 210703,
  "k7": "0416"
}, {
  "id": 976,
  "name": "太和",
  "parent_id": 165,
  "k1": "t",
  "k2": "th",
  "k3": "taihe",
  "k4": "",
  "k5": "区",
  "k6": 210711,
  "k7": "0416"
}, {
  "id": 977,
  "name": "黑山",
  "parent_id": 165,
  "k1": "h",
  "k2": "hs",
  "k3": "heishan",
  "k4": "",
  "k5": "县",
  "k6": 210726,
  "k7": "0416"
}, {
  "id": 978,
  "name": "义县",
  "parent_id": 165,
  "k1": "y",
  "k2": "yx",
  "k3": "yixian",
  "k4": "",
  "k5": "",
  "k6": 210727,
  "k7": "0416"
}, {
  "id": 979,
  "name": "凌海",
  "parent_id": 165,
  "k1": "l",
  "k2": "lh",
  "k3": "linghai",
  "k4": "",
  "k5": "市",
  "k6": 210781,
  "k7": "0416"
}, {
  "id": 980,
  "name": "北镇",
  "parent_id": 165,
  "k1": "b",
  "k2": "bz",
  "k3": "beizhen",
  "k4": "",
  "k5": "市",
  "k6": 210782,
  "k7": "0416"
}, {
  "id": 981,
  "name": "站前",
  "parent_id": 166,
  "k1": "z",
  "k2": "zq",
  "k3": "zhanqian",
  "k4": "",
  "k5": "区",
  "k6": 210802,
  "k7": "0417"
}, {
  "id": 982,
  "name": "西市",
  "parent_id": 166,
  "k1": "x",
  "k2": "xs",
  "k3": "xishi",
  "k4": "",
  "k5": "区",
  "k6": 210803,
  "k7": "0417"
}, {
  "id": 983,
  "name": "鲅鱼圈",
  "parent_id": 166,
  "k1": "b",
  "k2": "byq",
  "k3": "bayuquan",
  "k4": "",
  "k5": "区",
  "k6": 210804,
  "k7": "0417"
}, {
  "id": 984,
  "name": "老边",
  "parent_id": 166,
  "k1": "l",
  "k2": "lb",
  "k3": "laobian",
  "k4": "",
  "k5": "区",
  "k6": 210811,
  "k7": "0417"
}, {
  "id": 985,
  "name": "盖州",
  "parent_id": 166,
  "k1": "g",
  "k2": "gz",
  "k3": "gaizhou",
  "k4": "",
  "k5": "市",
  "k6": 210881,
  "k7": "0417"
}, {
  "id": 986,
  "name": "大石桥",
  "parent_id": 166,
  "k1": "d",
  "k2": "dsq",
  "k3": "dashiqiao",
  "k4": "",
  "k5": "市",
  "k6": 210882,
  "k7": "0417"
}, {
  "id": 987,
  "name": "海州",
  "parent_id": 167,
  "k1": "h",
  "k2": "hz",
  "k3": "haizhou",
  "k4": "",
  "k5": "区",
  "k6": 210902,
  "k7": "0418"
}, {
  "id": 988,
  "name": "新邱",
  "parent_id": 167,
  "k1": "x",
  "k2": "xq",
  "k3": "xinqiu",
  "k4": "",
  "k5": "区",
  "k6": 210903,
  "k7": "0418"
}, {
  "id": 989,
  "name": "太平",
  "parent_id": 167,
  "k1": "t",
  "k2": "tp",
  "k3": "taiping",
  "k4": "",
  "k5": "区",
  "k6": 210904,
  "k7": "0418"
}, {
  "id": 990,
  "name": "清河门",
  "parent_id": 167,
  "k1": "q",
  "k2": "qhm",
  "k3": "qinghemen",
  "k4": "",
  "k5": "区",
  "k6": 210905,
  "k7": "0418"
}, {
  "id": 991,
  "name": "细河",
  "parent_id": 167,
  "k1": "x",
  "k2": "xh",
  "k3": "xihe",
  "k4": "",
  "k5": "区",
  "k6": 210911,
  "k7": "0418"
}, {
  "id": 992,
  "name": "阜新",
  "parent_id": 167,
  "k1": "f",
  "k2": "fx",
  "k3": "fuxin",
  "k4": "蒙古族",
  "k5": "自治县",
  "k6": 210921,
  "k7": "0418"
}, {
  "id": 993,
  "name": "彰武",
  "parent_id": 167,
  "k1": "z",
  "k2": "zw",
  "k3": "zhangwu",
  "k4": "",
  "k5": "县",
  "k6": 210922,
  "k7": "0418"
}, {
  "id": 994,
  "name": "白塔",
  "parent_id": 168,
  "k1": "b",
  "k2": "bt",
  "k3": "baita",
  "k4": "",
  "k5": "区",
  "k6": 211002,
  "k7": "0419"
}, {
  "id": 995,
  "name": "文圣",
  "parent_id": 168,
  "k1": "w",
  "k2": "ws",
  "k3": "wensheng",
  "k4": "",
  "k5": "区",
  "k6": 211003,
  "k7": "0419"
}, {
  "id": 996,
  "name": "宏伟",
  "parent_id": 168,
  "k1": "h",
  "k2": "hw",
  "k3": "hongwei",
  "k4": "",
  "k5": "区",
  "k6": 211004,
  "k7": "0419"
}, {
  "id": 997,
  "name": "弓长岭",
  "parent_id": 168,
  "k1": "g",
  "k2": "gcl",
  "k3": "gongchangling",
  "k4": "",
  "k5": "区",
  "k6": 211005,
  "k7": "0419"
}, {
  "id": 998,
  "name": "辽阳",
  "parent_id": 168,
  "k1": "l",
  "k2": "ly",
  "k3": "liaoyang",
  "k4": "",
  "k5": "县",
  "k6": 211021,
  "k7": "0419"
}, {
  "id": 999,
  "name": "灯塔",
  "parent_id": 168,
  "k1": "d",
  "k2": "dt",
  "k3": "dengta",
  "k4": "",
  "k5": "市",
  "k6": 211081,
  "k7": "0419"
}, {
  "id": 1000,
  "name": "太子河",
  "parent_id": 168,
  "k1": "t",
  "k2": "tzh",
  "k3": "taizihe",
  "k4": "",
  "k5": "区",
  "k6": 211110,
  "k7": "0419"
}, {
  "id": 1001,
  "name": "双台子",
  "parent_id": 169,
  "k1": "s",
  "k2": "stz",
  "k3": "shuangtaizi",
  "k4": "",
  "k5": "区",
  "k6": 211103,
  "k7": "0427"
}, {
  "id": 1002,
  "name": "兴隆台",
  "parent_id": 169,
  "k1": "x",
  "k2": "xlt",
  "k3": "xinglongtai",
  "k4": "",
  "k5": "区",
  "k6": 211103,
  "k7": "0427"
}, {
  "id": 1003,
  "name": "大洼",
  "parent_id": 169,
  "k1": "d",
  "k2": "dw",
  "k3": "dawa",
  "k4": "",
  "k5": "区",
  "k6": 211104,
  "k7": "0427"
}, {
  "id": 1004,
  "name": "盘山",
  "parent_id": 169,
  "k1": "p",
  "k2": "ps",
  "k3": "panshan",
  "k4": "",
  "k5": "县",
  "k6": 211122,
  "k7": "0427"
}, {
  "id": 1005,
  "name": "银州",
  "parent_id": 170,
  "k1": "y",
  "k2": "yz",
  "k3": "yinzhou",
  "k4": "",
  "k5": "区",
  "k6": 211202,
  "k7": "0410"
}, {
  "id": 1006,
  "name": "清河",
  "parent_id": 170,
  "k1": "q",
  "k2": "qh",
  "k3": "qinghe",
  "k4": "",
  "k5": "区",
  "k6": 211204,
  "k7": "0410"
}, {
  "id": 1007,
  "name": "铁岭",
  "parent_id": 170,
  "k1": "t",
  "k2": "tl",
  "k3": "tieling",
  "k4": "",
  "k5": "县",
  "k6": 211221,
  "k7": "0410"
}, {
  "id": 1008,
  "name": "西丰",
  "parent_id": 170,
  "k1": "x",
  "k2": "xf",
  "k3": "xifeng",
  "k4": "",
  "k5": "县",
  "k6": 211223,
  "k7": "0410"
}, {
  "id": 1009,
  "name": "昌图",
  "parent_id": 170,
  "k1": "c",
  "k2": "ct",
  "k3": "changtu",
  "k4": "",
  "k5": "县",
  "k6": 211224,
  "k7": "0410"
}, {
  "id": 1010,
  "name": "调兵山",
  "parent_id": 170,
  "k1": "d",
  "k2": "dbs",
  "k3": "diaobingshan",
  "k4": "",
  "k5": "市",
  "k6": 211281,
  "k7": "0410"
}, {
  "id": 1011,
  "name": "开原",
  "parent_id": 170,
  "k1": "k",
  "k2": "ky",
  "k3": "kaiyuan",
  "k4": "",
  "k5": "市",
  "k6": 211282,
  "k7": "0410"
}, {
  "id": 1012,
  "name": "双塔",
  "parent_id": 171,
  "k1": "s",
  "k2": "st",
  "k3": "shuangta",
  "k4": "",
  "k5": "区",
  "k6": 211302,
  "k7": "0421"
}, {
  "id": 1013,
  "name": "龙城",
  "parent_id": 171,
  "k1": "l",
  "k2": "lc",
  "k3": "longcheng",
  "k4": "",
  "k5": "区",
  "k6": 211303,
  "k7": "0421"
}, {
  "id": 1014,
  "name": "朝阳",
  "parent_id": 171,
  "k1": "c",
  "k2": "cy",
  "k3": "chaoyang",
  "k4": "",
  "k5": "县",
  "k6": 211321,
  "k7": "0421"
}, {
  "id": 1015,
  "name": "建平",
  "parent_id": 171,
  "k1": "j",
  "k2": "jp",
  "k3": "jianping",
  "k4": "",
  "k5": "县",
  "k6": 211322,
  "k7": "0421"
}, {
  "id": 1016,
  "name": "喀喇沁左翼",
  "parent_id": 171,
  "k1": "k",
  "k2": "klqzy",
  "k3": "kalaqinzuoyi",
  "k4": "蒙古族",
  "k5": "自治县",
  "k6": 211324,
  "k7": "0421"
}, {
  "id": 1017,
  "name": "北票",
  "parent_id": 171,
  "k1": "b",
  "k2": "bp",
  "k3": "beipiao",
  "k4": "",
  "k5": "市",
  "k6": 211381,
  "k7": "0421"
}, {
  "id": 1018,
  "name": "凌源",
  "parent_id": 171,
  "k1": "l",
  "k2": "ly",
  "k3": "lingyuan",
  "k4": "",
  "k5": "市",
  "k6": 211382,
  "k7": "0421"
}, {
  "id": 1019,
  "name": "连山",
  "parent_id": 172,
  "k1": "l",
  "k2": "ls",
  "k3": "lianshan",
  "k4": "",
  "k5": "区",
  "k6": 211402,
  "k7": "0429"
}, {
  "id": 1020,
  "name": "龙港",
  "parent_id": 172,
  "k1": "l",
  "k2": "lg",
  "k3": "longgang",
  "k4": "",
  "k5": "区",
  "k6": 211403,
  "k7": "0429"
}, {
  "id": 1021,
  "name": "南票",
  "parent_id": 172,
  "k1": "n",
  "k2": "np",
  "k3": "nanpiao",
  "k4": "",
  "k5": "区",
  "k6": 211404,
  "k7": "0429"
}, {
  "id": 1022,
  "name": "绥中",
  "parent_id": 172,
  "k1": "s",
  "k2": "sz",
  "k3": "suizhong",
  "k4": "",
  "k5": "县",
  "k6": 211421,
  "k7": "0429"
}, {
  "id": 1023,
  "name": "建昌",
  "parent_id": 172,
  "k1": "j",
  "k2": "jc",
  "k3": "jianchang",
  "k4": "",
  "k5": "县",
  "k6": 211422,
  "k7": "0429"
}, {
  "id": 1024,
  "name": "兴城",
  "parent_id": 172,
  "k1": "x",
  "k2": "xc",
  "k3": "xingcheng",
  "k4": "",
  "k5": "市",
  "k6": 211481,
  "k7": "0429"
}, {
  "id": 1025,
  "name": "南关",
  "parent_id": 173,
  "k1": "n",
  "k2": "ng",
  "k3": "nanguan",
  "k4": "",
  "k5": "区",
  "k6": 220102,
  "k7": "0431"
}, {
  "id": 1026,
  "name": "宽城",
  "parent_id": 173,
  "k1": "k",
  "k2": "kc",
  "k3": "kuancheng",
  "k4": "",
  "k5": "区",
  "k6": 220103,
  "k7": "0431"
}, {
  "id": 1027,
  "name": "朝阳",
  "parent_id": 173,
  "k1": "c",
  "k2": "cy",
  "k3": "chaoyang",
  "k4": "",
  "k5": "区",
  "k6": 220104,
  "k7": "0431"
}, {
  "id": 1028,
  "name": "二道",
  "parent_id": 173,
  "k1": "e",
  "k2": "ed",
  "k3": "erdao",
  "k4": "",
  "k5": "区",
  "k6": 220105,
  "k7": "0431"
}, {
  "id": 1029,
  "name": "绿园",
  "parent_id": 173,
  "k1": "l",
  "k2": "ly",
  "k3": "lu:yuan",
  "k4": "",
  "k5": "区",
  "k6": 220106,
  "k7": "0431"
}, {
  "id": 1030,
  "name": "双阳",
  "parent_id": 173,
  "k1": "s",
  "k2": "sy",
  "k3": "shuangyang",
  "k4": "",
  "k5": "区",
  "k6": 220112,
  "k7": "0431"
}, {
  "id": 1031,
  "name": "农安",
  "parent_id": 173,
  "k1": "n",
  "k2": "na",
  "k3": "nongan",
  "k4": "",
  "k5": "县",
  "k6": 220122,
  "k7": "0431"
}, {
  "id": 1032,
  "name": "九台",
  "parent_id": 173,
  "k1": "j",
  "k2": "jt",
  "k3": "jiutai",
  "k4": "",
  "k5": "区",
  "k6": 220113,
  "k7": "0431"
}, {
  "id": 1033,
  "name": "榆树",
  "parent_id": 173,
  "k1": "y",
  "k2": "ys",
  "k3": "yushu",
  "k4": "",
  "k5": "市",
  "k6": 220182,
  "k7": "0431"
}, {
  "id": 1034,
  "name": "德惠",
  "parent_id": 173,
  "k1": "d",
  "k2": "dh",
  "k3": "dehui",
  "k4": "",
  "k5": "市",
  "k6": 220183,
  "k7": "0431"
}, {
  "id": 1035,
  "name": "昌邑",
  "parent_id": 174,
  "k1": "c",
  "k2": "cy",
  "k3": "changyi",
  "k4": "",
  "k5": "区",
  "k6": 220202,
  "k7": "0432"
}, {
  "id": 1036,
  "name": "龙潭",
  "parent_id": 174,
  "k1": "l",
  "k2": "lt",
  "k3": "longtan",
  "k4": "",
  "k5": "区",
  "k6": 220203,
  "k7": "0432"
}, {
  "id": 1037,
  "name": "船营",
  "parent_id": 174,
  "k1": "c",
  "k2": "cy",
  "k3": "chuanying",
  "k4": "",
  "k5": "区",
  "k6": 220204,
  "k7": "0432"
}, {
  "id": 1038,
  "name": "丰满",
  "parent_id": 174,
  "k1": "f",
  "k2": "fm",
  "k3": "fengman",
  "k4": "",
  "k5": "区",
  "k6": 220211,
  "k7": "0432"
}, {
  "id": 1039,
  "name": "永吉",
  "parent_id": 174,
  "k1": "y",
  "k2": "yj",
  "k3": "yongji",
  "k4": "",
  "k5": "县",
  "k6": 220221,
  "k7": "0432"
}, {
  "id": 1040,
  "name": "桦甸",
  "parent_id": 174,
  "k1": "h",
  "k2": "hd",
  "k3": "huadian",
  "k4": "",
  "k5": "市",
  "k6": 220281,
  "k7": "0432"
}, {
  "id": 1041,
  "name": "蛟河",
  "parent_id": 174,
  "k1": "j",
  "k2": "jh",
  "k3": "jiaohe",
  "k4": "",
  "k5": "市",
  "k6": 220282,
  "k7": "0432"
}, {
  "id": 1042,
  "name": "舒兰",
  "parent_id": 174,
  "k1": "s",
  "k2": "sl",
  "k3": "shulan",
  "k4": "",
  "k5": "市",
  "k6": 220283,
  "k7": "0432"
}, {
  "id": 1043,
  "name": "磐石",
  "parent_id": 174,
  "k1": "p",
  "k2": "ps",
  "k3": "panshi",
  "k4": "",
  "k5": "市",
  "k6": 220284,
  "k7": "0432"
}, {
  "id": 1044,
  "name": "铁西",
  "parent_id": 175,
  "k1": "t",
  "k2": "tx",
  "k3": "tiexi",
  "k4": "",
  "k5": "区",
  "k6": 220302,
  "k7": "0434"
}, {
  "id": 1045,
  "name": "铁东",
  "parent_id": 175,
  "k1": "t",
  "k2": "td",
  "k3": "tiedong",
  "k4": "",
  "k5": "区",
  "k6": 220303,
  "k7": "0434"
}, {
  "id": 1046,
  "name": "梨树",
  "parent_id": 175,
  "k1": "l",
  "k2": "ls",
  "k3": "lishu",
  "k4": "",
  "k5": "县",
  "k6": 220322,
  "k7": "0434"
}, {
  "id": 1047,
  "name": "伊通",
  "parent_id": 175,
  "k1": "y",
  "k2": "yt",
  "k3": "yitong",
  "k4": "满族",
  "k5": "自治县",
  "k6": 220323,
  "k7": "0434"
}, {
  "id": 1048,
  "name": "公主岭",
  "parent_id": 175,
  "k1": "g",
  "k2": "gzl",
  "k3": "gongzhuling",
  "k4": "",
  "k5": "市",
  "k6": 220381,
  "k7": "0434"
}, {
  "id": 1049,
  "name": "双辽",
  "parent_id": 175,
  "k1": "s",
  "k2": "sl",
  "k3": "shuangliao",
  "k4": "",
  "k5": "市",
  "k6": 220382,
  "k7": "0434"
}, {
  "id": 1050,
  "name": "龙山",
  "parent_id": 176,
  "k1": "l",
  "k2": "ls",
  "k3": "longshan",
  "k4": "",
  "k5": "区",
  "k6": 220402,
  "k7": "0437"
}, {
  "id": 1051,
  "name": "西安",
  "parent_id": 176,
  "k1": "x",
  "k2": "xa",
  "k3": "xian",
  "k4": "",
  "k5": "区",
  "k6": 220403,
  "k7": "0437"
}, {
  "id": 1052,
  "name": "东丰",
  "parent_id": 176,
  "k1": "d",
  "k2": "df",
  "k3": "dongfeng",
  "k4": "",
  "k5": "县",
  "k6": 220421,
  "k7": "0437"
}, {
  "id": 1053,
  "name": "东辽",
  "parent_id": 176,
  "k1": "d",
  "k2": "dl",
  "k3": "dongliao",
  "k4": "",
  "k5": "县",
  "k6": 220422,
  "k7": "0437"
}, {
  "id": 1054,
  "name": "东昌",
  "parent_id": 177,
  "k1": "d",
  "k2": "dc",
  "k3": "dongchang",
  "k4": "",
  "k5": "区",
  "k6": 220502,
  "k7": "0435"
}, {
  "id": 1055,
  "name": "二道江",
  "parent_id": 177,
  "k1": "e",
  "k2": "edj",
  "k3": "erdaojiang",
  "k4": "",
  "k5": "区",
  "k6": 220503,
  "k7": "0435"
}, {
  "id": 1056,
  "name": "通化",
  "parent_id": 177,
  "k1": "t",
  "k2": "th",
  "k3": "tonghua",
  "k4": "",
  "k5": "县",
  "k6": 220521,
  "k7": "0435"
}, {
  "id": 1057,
  "name": "辉南",
  "parent_id": 177,
  "k1": "h",
  "k2": "hn",
  "k3": "huinan",
  "k4": "",
  "k5": "县",
  "k6": 220523,
  "k7": "0435"
}, {
  "id": 1058,
  "name": "柳河",
  "parent_id": 177,
  "k1": "l",
  "k2": "lh",
  "k3": "liuhe",
  "k4": "",
  "k5": "县",
  "k6": 220524,
  "k7": "0435"
}, {
  "id": 1059,
  "name": "梅河口",
  "parent_id": 177,
  "k1": "m",
  "k2": "mhk",
  "k3": "meihekou",
  "k4": "",
  "k5": "市",
  "k6": 220581,
  "k7": "0435"
}, {
  "id": 1060,
  "name": "集安",
  "parent_id": 177,
  "k1": "j",
  "k2": "ja",
  "k3": "jian",
  "k4": "",
  "k5": "市",
  "k6": 220582,
  "k7": "0435"
}, {
  "id": 1061,
  "name": "浑江",
  "parent_id": 178,
  "k1": "h",
  "k2": "hj",
  "k3": "hunjiang",
  "k4": "",
  "k5": "区",
  "k6": 220602,
  "k7": "0439"
}, {
  "id": 1062,
  "name": "江源",
  "parent_id": 178,
  "k1": "j",
  "k2": "jy",
  "k3": "jiangyuan",
  "k4": "",
  "k5": "区",
  "k6": 220604,
  "k7": "0439"
}, {
  "id": 1063,
  "name": "抚松",
  "parent_id": 178,
  "k1": "f",
  "k2": "fs",
  "k3": "fusong",
  "k4": "",
  "k5": "县",
  "k6": 220621,
  "k7": "0439"
}, {
  "id": 1064,
  "name": "靖宇",
  "parent_id": 178,
  "k1": "j",
  "k2": "jy",
  "k3": "jingyu",
  "k4": "",
  "k5": "县",
  "k6": 220622,
  "k7": "0439"
}, {
  "id": 1065,
  "name": "长白",
  "parent_id": 178,
  "k1": "c",
  "k2": "cb",
  "k3": "changbai",
  "k4": "朝鲜族",
  "k5": "自治县",
  "k6": 220623,
  "k7": "0439"
}, {
  "id": 1066,
  "name": "临江",
  "parent_id": 178,
  "k1": "l",
  "k2": "lj",
  "k3": "linjiang",
  "k4": "",
  "k5": "市",
  "k6": 220681,
  "k7": "0439"
}, {
  "id": 1067,
  "name": "宁江",
  "parent_id": 179,
  "k1": "n",
  "k2": "nj",
  "k3": "ningjiang",
  "k4": "",
  "k5": "区",
  "k6": 220702,
  "k7": "0438"
}, {
  "id": 1068,
  "name": "前郭尔罗斯",
  "parent_id": 179,
  "k1": "q",
  "k2": "qgels",
  "k3": "qianguoerluosi",
  "k4": "蒙古族",
  "k5": "自治县",
  "k6": 220721,
  "k7": "0438"
}, {
  "id": 1069,
  "name": "长岭",
  "parent_id": 179,
  "k1": "c",
  "k2": "cl",
  "k3": "changling",
  "k4": "",
  "k5": "县",
  "k6": 220722,
  "k7": "0438"
}, {
  "id": 1070,
  "name": "乾安",
  "parent_id": 179,
  "k1": "q",
  "k2": "qa",
  "k3": "qianan",
  "k4": "",
  "k5": "县",
  "k6": 220723,
  "k7": "0438"
}, {
  "id": 1071,
  "name": "扶余",
  "parent_id": 179,
  "k1": "f",
  "k2": "fy",
  "k3": "fuyu",
  "k4": "",
  "k5": "市",
  "k6": 220724,
  "k7": "0438"
}, {
  "id": 1072,
  "name": "洮北",
  "parent_id": 180,
  "k1": "t",
  "k2": "tb",
  "k3": "taobei",
  "k4": "",
  "k5": "区",
  "k6": 220802,
  "k7": "0436"
}, {
  "id": 1073,
  "name": "镇赉",
  "parent_id": 180,
  "k1": "z",
  "k2": "zl",
  "k3": "zhenlai",
  "k4": "",
  "k5": "县",
  "k6": 220821,
  "k7": "0436"
}, {
  "id": 1074,
  "name": "洮南",
  "parent_id": 180,
  "k1": "t",
  "k2": "tn",
  "k3": "taonan",
  "k4": "",
  "k5": "市",
  "k6": 220881,
  "k7": "0436"
}, {
  "id": 1075,
  "name": "大安",
  "parent_id": 180,
  "k1": "d",
  "k2": "da",
  "k3": "daan",
  "k4": "",
  "k5": "市",
  "k6": 220882,
  "k7": "0436"
}, {
  "id": 1076,
  "name": "通榆",
  "parent_id": 180,
  "k1": "t",
  "k2": "ty",
  "k3": "tongyu",
  "k4": "",
  "k5": "县",
  "k6": 220822,
  "k7": "0436"
}, {
  "id": 1077,
  "name": "延吉",
  "parent_id": 181,
  "k1": "y",
  "k2": "yj",
  "k3": "yanji",
  "k4": "",
  "k5": "市",
  "k6": 222401,
  "k7": "0433"
}, {
  "id": 1078,
  "name": "图们",
  "parent_id": 181,
  "k1": "t",
  "k2": "tm",
  "k3": "tumen",
  "k4": "",
  "k5": "市",
  "k6": 222402,
  "k7": "0433"
}, {
  "id": 1079,
  "name": "敦化",
  "parent_id": 181,
  "k1": "d",
  "k2": "dh",
  "k3": "dunhua",
  "k4": "",
  "k5": "市",
  "k6": 222403,
  "k7": "0433"
}, {
  "id": 1080,
  "name": "珲春",
  "parent_id": 181,
  "k1": "h",
  "k2": "hc",
  "k3": "hunchun",
  "k4": "",
  "k5": "市",
  "k6": 222404,
  "k7": "0433"
}, {
  "id": 1081,
  "name": "龙井",
  "parent_id": 181,
  "k1": "l",
  "k2": "lj",
  "k3": "longjing",
  "k4": "",
  "k5": "市",
  "k6": 222405,
  "k7": "0433"
}, {
  "id": 1082,
  "name": "和龙",
  "parent_id": 181,
  "k1": "h",
  "k2": "hl",
  "k3": "helong",
  "k4": "",
  "k5": "市",
  "k6": 222406,
  "k7": "0433"
}, {
  "id": 1083,
  "name": "汪清",
  "parent_id": 181,
  "k1": "w",
  "k2": "wq",
  "k3": "wangqing",
  "k4": "",
  "k5": "县",
  "k6": 222424,
  "k7": "0433"
}, {
  "id": 1084,
  "name": "安图",
  "parent_id": 181,
  "k1": "a",
  "k2": "at",
  "k3": "antu",
  "k4": "",
  "k5": "县",
  "k6": 222426,
  "k7": "0433"
}, {
  "id": 1085,
  "name": "道里",
  "parent_id": 182,
  "k1": "d",
  "k2": "dl",
  "k3": "daoli",
  "k4": "",
  "k5": "区",
  "k6": 230102,
  "k7": "0451"
}, {
  "id": 1086,
  "name": "南岗",
  "parent_id": 182,
  "k1": "n",
  "k2": "ng",
  "k3": "nangang",
  "k4": "",
  "k5": "区",
  "k6": 230103,
  "k7": "0451"
}, {
  "id": 1087,
  "name": "道外",
  "parent_id": 182,
  "k1": "d",
  "k2": "dw",
  "k3": "daowai",
  "k4": "",
  "k5": "区",
  "k6": 230104,
  "k7": "0451"
}, {
  "id": 1088,
  "name": "平房",
  "parent_id": 182,
  "k1": "p",
  "k2": "pf",
  "k3": "pingfang",
  "k4": "",
  "k5": "区",
  "k6": 230108,
  "k7": "0451"
}, {
  "id": 1089,
  "name": "松北",
  "parent_id": 182,
  "k1": "s",
  "k2": "sb",
  "k3": "songbei",
  "k4": "",
  "k5": "区",
  "k6": 230109,
  "k7": "0451"
}, {
  "id": 1090,
  "name": "香坊",
  "parent_id": 182,
  "k1": "x",
  "k2": "xf",
  "k3": "xiangfang",
  "k4": "",
  "k5": "区",
  "k6": 230110,
  "k7": "0451"
}, {
  "id": 1091,
  "name": "呼兰",
  "parent_id": 182,
  "k1": "h",
  "k2": "hl",
  "k3": "hulan",
  "k4": "",
  "k5": "区",
  "k6": 230111,
  "k7": "0451"
}, {
  "id": 1092,
  "name": "阿城",
  "parent_id": 182,
  "k1": "a",
  "k2": "ac",
  "k3": "acheng",
  "k4": "",
  "k5": "区",
  "k6": 230112,
  "k7": "0451"
}, {
  "id": 1093,
  "name": "依兰",
  "parent_id": 182,
  "k1": "y",
  "k2": "yl",
  "k3": "yilan",
  "k4": "",
  "k5": "县",
  "k6": 230123,
  "k7": "0451"
}, {
  "id": 1094,
  "name": "方正",
  "parent_id": 182,
  "k1": "f",
  "k2": "fz",
  "k3": "fangzheng",
  "k4": "",
  "k5": "县",
  "k6": 230124,
  "k7": "0451"
}, {
  "id": 1095,
  "name": "宾县",
  "parent_id": 182,
  "k1": "b",
  "k2": "bx",
  "k3": "binxian",
  "k4": "",
  "k5": "",
  "k6": 230125,
  "k7": "0451"
}, {
  "id": 1096,
  "name": "巴彦",
  "parent_id": 182,
  "k1": "b",
  "k2": "by",
  "k3": "bayan",
  "k4": "",
  "k5": "县",
  "k6": 230126,
  "k7": "0451"
}, {
  "id": 1097,
  "name": "木兰",
  "parent_id": 182,
  "k1": "m",
  "k2": "ml",
  "k3": "mulan",
  "k4": "",
  "k5": "县",
  "k6": 230127,
  "k7": "0451"
}, {
  "id": 1098,
  "name": "通河",
  "parent_id": 182,
  "k1": "t",
  "k2": "th",
  "k3": "tonghe",
  "k4": "",
  "k5": "县",
  "k6": 230128,
  "k7": "0451"
}, {
  "id": 1099,
  "name": "延寿",
  "parent_id": 182,
  "k1": "y",
  "k2": "ys",
  "k3": "yanshou",
  "k4": "",
  "k5": "县",
  "k6": 230129,
  "k7": "0451"
}, {
  "id": 1100,
  "name": "双城",
  "parent_id": 182,
  "k1": "s",
  "k2": "sc",
  "k3": "shuangcheng",
  "k4": "",
  "k5": "区",
  "k6": 230182,
  "k7": "0451"
}, {
  "id": 1101,
  "name": "尚志",
  "parent_id": 182,
  "k1": "s",
  "k2": "sz",
  "k3": "shangzhi",
  "k4": "",
  "k5": "市",
  "k6": 230183,
  "k7": "0451"
}, {
  "id": 1102,
  "name": "五常",
  "parent_id": 182,
  "k1": "w",
  "k2": "wc",
  "k3": "wuchang",
  "k4": "",
  "k5": "市",
  "k6": 230184,
  "k7": "0451"
}, {
  "id": 1103,
  "name": "龙沙",
  "parent_id": 183,
  "k1": "l",
  "k2": "ls",
  "k3": "longsha",
  "k4": "",
  "k5": "区",
  "k6": 230202,
  "k7": "0452"
}, {
  "id": 1104,
  "name": "建华",
  "parent_id": 183,
  "k1": "j",
  "k2": "jh",
  "k3": "jianhua",
  "k4": "",
  "k5": "区",
  "k6": 230203,
  "k7": "0452"
}, {
  "id": 1105,
  "name": "铁锋",
  "parent_id": 183,
  "k1": "t",
  "k2": "tf",
  "k3": "tiefeng",
  "k4": "",
  "k5": "区",
  "k6": 230204,
  "k7": "0452"
}, {
  "id": 1106,
  "name": "昂昂溪",
  "parent_id": 183,
  "k1": "a",
  "k2": "aax",
  "k3": "angangxi",
  "k4": "",
  "k5": "区",
  "k6": 230205,
  "k7": "0452"
}, {
  "id": 1107,
  "name": "富拉尔基",
  "parent_id": 183,
  "k1": "f",
  "k2": "flej",
  "k3": "fulaerji",
  "k4": "",
  "k5": "区",
  "k6": 230206,
  "k7": "0452"
}, {
  "id": 1108,
  "name": "碾子山",
  "parent_id": 183,
  "k1": "n",
  "k2": "nzs",
  "k3": "nianzishan",
  "k4": "",
  "k5": "区",
  "k6": 230207,
  "k7": "0452"
}, {
  "id": 1109,
  "name": "梅里斯",
  "parent_id": 183,
  "k1": "m",
  "k2": "mls",
  "k3": "meilisi",
  "k4": "达斡尔族",
  "k5": "区",
  "k6": 230208,
  "k7": "0452"
}, {
  "id": 1110,
  "name": "龙江",
  "parent_id": 183,
  "k1": "l",
  "k2": "lj",
  "k3": "longjiang",
  "k4": "",
  "k5": "县",
  "k6": 230221,
  "k7": "0452"
}, {
  "id": 1111,
  "name": "依安",
  "parent_id": 183,
  "k1": "y",
  "k2": "ya",
  "k3": "yian",
  "k4": "",
  "k5": "县",
  "k6": 230223,
  "k7": "0452"
}, {
  "id": 1112,
  "name": "泰来",
  "parent_id": 183,
  "k1": "t",
  "k2": "tl",
  "k3": "tailai",
  "k4": "",
  "k5": "县",
  "k6": 230224,
  "k7": "0452"
}, {
  "id": 1113,
  "name": "甘南",
  "parent_id": 183,
  "k1": "g",
  "k2": "gn",
  "k3": "gannan",
  "k4": "",
  "k5": "县",
  "k6": 230225,
  "k7": "0452"
}, {
  "id": 1114,
  "name": "富裕",
  "parent_id": 183,
  "k1": "f",
  "k2": "fy",
  "k3": "fuyu",
  "k4": "",
  "k5": "县",
  "k6": 230227,
  "k7": "0452"
}, {
  "id": 1115,
  "name": "克山",
  "parent_id": 183,
  "k1": "k",
  "k2": "ks",
  "k3": "keshan",
  "k4": "",
  "k5": "县",
  "k6": 230229,
  "k7": "0452"
}, {
  "id": 1116,
  "name": "克东",
  "parent_id": 183,
  "k1": "k",
  "k2": "kd",
  "k3": "kedong",
  "k4": "",
  "k5": "县",
  "k6": 230230,
  "k7": "0452"
}, {
  "id": 1117,
  "name": "拜泉",
  "parent_id": 183,
  "k1": "b",
  "k2": "bq",
  "k3": "baiquan",
  "k4": "",
  "k5": "县",
  "k6": 230231,
  "k7": "0452"
}, {
  "id": 1118,
  "name": "讷河",
  "parent_id": 183,
  "k1": "n",
  "k2": "nh",
  "k3": "nehe",
  "k4": "",
  "k5": "市",
  "k6": 230281,
  "k7": "0452"
}, {
  "id": 1119,
  "name": "鸡冠",
  "parent_id": 184,
  "k1": "j",
  "k2": "jg",
  "k3": "jiguan",
  "k4": "",
  "k5": "区",
  "k6": 230302,
  "k7": "0467"
}, {
  "id": 1120,
  "name": "恒山",
  "parent_id": 184,
  "k1": "h",
  "k2": "hs",
  "k3": "hengshan",
  "k4": "",
  "k5": "区",
  "k6": 230303,
  "k7": "0467"
}, {
  "id": 1121,
  "name": "滴道",
  "parent_id": 184,
  "k1": "d",
  "k2": "dd",
  "k3": "didao",
  "k4": "",
  "k5": "区",
  "k6": 230304,
  "k7": "0467"
}, {
  "id": 1122,
  "name": "梨树",
  "parent_id": 184,
  "k1": "l",
  "k2": "ls",
  "k3": "lishu",
  "k4": "",
  "k5": "区",
  "k6": 230305,
  "k7": "0467"
}, {
  "id": 1123,
  "name": "城子河",
  "parent_id": 184,
  "k1": "c",
  "k2": "czh",
  "k3": "chengzihe",
  "k4": "",
  "k5": "区",
  "k6": 230306,
  "k7": "0467"
}, {
  "id": 1124,
  "name": "麻山",
  "parent_id": 184,
  "k1": "m",
  "k2": "ms",
  "k3": "mashan",
  "k4": "",
  "k5": "区",
  "k6": 230307,
  "k7": "0467"
}, {
  "id": 1125,
  "name": "鸡东",
  "parent_id": 184,
  "k1": "j",
  "k2": "jd",
  "k3": "jidong",
  "k4": "",
  "k5": "县",
  "k6": 230321,
  "k7": "0467"
}, {
  "id": 1126,
  "name": "虎林",
  "parent_id": 184,
  "k1": "h",
  "k2": "hl",
  "k3": "hulin",
  "k4": "",
  "k5": "市",
  "k6": 230381,
  "k7": "0467"
}, {
  "id": 1127,
  "name": "密山",
  "parent_id": 184,
  "k1": "m",
  "k2": "ms",
  "k3": "mishan",
  "k4": "",
  "k5": "市",
  "k6": 230382,
  "k7": "0467"
}, {
  "id": 1128,
  "name": "向阳",
  "parent_id": 185,
  "k1": "x",
  "k2": "xy",
  "k3": "xiangyang",
  "k4": "",
  "k5": "区",
  "k6": 230402,
  "k7": "0468"
}, {
  "id": 1129,
  "name": "工农",
  "parent_id": 185,
  "k1": "g",
  "k2": "gn",
  "k3": "gongnong",
  "k4": "",
  "k5": "区",
  "k6": 230403,
  "k7": "0468"
}, {
  "id": 1130,
  "name": "南山",
  "parent_id": 185,
  "k1": "n",
  "k2": "ns",
  "k3": "nanshan",
  "k4": "",
  "k5": "区",
  "k6": 230404,
  "k7": "0468"
}, {
  "id": 1131,
  "name": "兴安",
  "parent_id": 185,
  "k1": "x",
  "k2": "xa",
  "k3": "xingan",
  "k4": "",
  "k5": "区",
  "k6": 230405,
  "k7": "0468"
}, {
  "id": 1132,
  "name": "东山",
  "parent_id": 185,
  "k1": "d",
  "k2": "ds",
  "k3": "dongshan",
  "k4": "",
  "k5": "区",
  "k6": 230406,
  "k7": "0468"
}, {
  "id": 1133,
  "name": "兴山",
  "parent_id": 185,
  "k1": "x",
  "k2": "xs",
  "k3": "xingshan",
  "k4": "",
  "k5": "区",
  "k6": 230407,
  "k7": "0468"
}, {
  "id": 1134,
  "name": "萝北",
  "parent_id": 185,
  "k1": "l",
  "k2": "lb",
  "k3": "luobei",
  "k4": "",
  "k5": "县",
  "k6": 230421,
  "k7": "0468"
}, {
  "id": 1135,
  "name": "绥滨",
  "parent_id": 185,
  "k1": "s",
  "k2": "sb",
  "k3": "suibin",
  "k4": "",
  "k5": "县",
  "k6": 230422,
  "k7": "0468"
}, {
  "id": 1136,
  "name": "尖山",
  "parent_id": 186,
  "k1": "j",
  "k2": "js",
  "k3": "jianshan",
  "k4": "",
  "k5": "区",
  "k6": 230502,
  "k7": "0469"
}, {
  "id": 1137,
  "name": "岭东",
  "parent_id": 186,
  "k1": "l",
  "k2": "ld",
  "k3": "lingdong",
  "k4": "",
  "k5": "区",
  "k6": 230503,
  "k7": "0469"
}, {
  "id": 1138,
  "name": "四方台",
  "parent_id": 186,
  "k1": "s",
  "k2": "sft",
  "k3": "sifangtai",
  "k4": "",
  "k5": "区",
  "k6": 230505,
  "k7": "0469"
}, {
  "id": 1139,
  "name": "宝山",
  "parent_id": 186,
  "k1": "b",
  "k2": "bs",
  "k3": "baoshan",
  "k4": "",
  "k5": "区",
  "k6": 230506,
  "k7": "0469"
}, {
  "id": 1140,
  "name": "集贤",
  "parent_id": 186,
  "k1": "j",
  "k2": "jx",
  "k3": "jixian",
  "k4": "",
  "k5": "县",
  "k6": 230521,
  "k7": "0469"
}, {
  "id": 1141,
  "name": "友谊",
  "parent_id": 186,
  "k1": "y",
  "k2": "yy",
  "k3": "youyi",
  "k4": "",
  "k5": "县",
  "k6": 230522,
  "k7": "0469"
}, {
  "id": 1142,
  "name": "宝清",
  "parent_id": 186,
  "k1": "b",
  "k2": "bq",
  "k3": "baoqing",
  "k4": "",
  "k5": "县",
  "k6": 230523,
  "k7": "0469"
}, {
  "id": 1143,
  "name": "饶河",
  "parent_id": 186,
  "k1": "r",
  "k2": "rh",
  "k3": "raohe",
  "k4": "",
  "k5": "县",
  "k6": 230524,
  "k7": "0469"
}, {
  "id": 1144,
  "name": "萨尔图",
  "parent_id": 187,
  "k1": "s",
  "k2": "set",
  "k3": "saertu",
  "k4": "",
  "k5": "区",
  "k6": 230602,
  "k7": "0459"
}, {
  "id": 1145,
  "name": "龙凤",
  "parent_id": 187,
  "k1": "l",
  "k2": "lf",
  "k3": "longfeng",
  "k4": "",
  "k5": "区",
  "k6": 230603,
  "k7": "0459"
}, {
  "id": 1146,
  "name": "让胡路",
  "parent_id": 187,
  "k1": "r",
  "k2": "rhl",
  "k3": "ranghulu",
  "k4": "",
  "k5": "区",
  "k6": 230604,
  "k7": "0459"
}, {
  "id": 1147,
  "name": "红岗",
  "parent_id": 187,
  "k1": "h",
  "k2": "hg",
  "k3": "honggang",
  "k4": "",
  "k5": "区",
  "k6": 230605,
  "k7": "0459"
}, {
  "id": 1148,
  "name": "大同",
  "parent_id": 187,
  "k1": "d",
  "k2": "dt",
  "k3": "datong",
  "k4": "",
  "k5": "区",
  "k6": 230606,
  "k7": "0459"
}, {
  "id": 1149,
  "name": "肇州",
  "parent_id": 187,
  "k1": "z",
  "k2": "zz",
  "k3": "zhaozhou",
  "k4": "",
  "k5": "县",
  "k6": 230621,
  "k7": "0459"
}, {
  "id": 1150,
  "name": "肇源",
  "parent_id": 187,
  "k1": "z",
  "k2": "zy",
  "k3": "zhaoyuan",
  "k4": "",
  "k5": "县",
  "k6": 230622,
  "k7": "0459"
}, {
  "id": 1151,
  "name": "林甸",
  "parent_id": 187,
  "k1": "l",
  "k2": "ld",
  "k3": "lindian",
  "k4": "",
  "k5": "县",
  "k6": 230623,
  "k7": "0459"
}, {
  "id": 1152,
  "name": "杜尔伯特",
  "parent_id": 187,
  "k1": "d",
  "k2": "debt",
  "k3": "duerbote",
  "k4": "蒙古族",
  "k5": "自治县",
  "k6": 230624,
  "k7": "0459"
}, {
  "id": 1153,
  "name": "伊春",
  "parent_id": 188,
  "k1": "y",
  "k2": "yc",
  "k3": "yichun",
  "k4": "",
  "k5": "区",
  "k6": 230702,
  "k7": "0458"
}, {
  "id": 1154,
  "name": "南岔",
  "parent_id": 188,
  "k1": "n",
  "k2": "nc",
  "k3": "nancha",
  "k4": "",
  "k5": "区",
  "k6": 230703,
  "k7": "0458"
}, {
  "id": 1155,
  "name": "友好",
  "parent_id": 188,
  "k1": "y",
  "k2": "yh",
  "k3": "youhao",
  "k4": "",
  "k5": "区",
  "k6": 230704,
  "k7": "0458"
}, {
  "id": 1156,
  "name": "西林",
  "parent_id": 188,
  "k1": "x",
  "k2": "xl",
  "k3": "xilin",
  "k4": "",
  "k5": "区",
  "k6": 230705,
  "k7": "0458"
}, {
  "id": 1157,
  "name": "翠峦",
  "parent_id": 188,
  "k1": "c",
  "k2": "cl",
  "k3": "cuiluan",
  "k4": "",
  "k5": "区",
  "k6": 230706,
  "k7": "0458"
}, {
  "id": 1158,
  "name": "新青",
  "parent_id": 188,
  "k1": "x",
  "k2": "xq",
  "k3": "xinqing",
  "k4": "",
  "k5": "区",
  "k6": 230707,
  "k7": "0458"
}, {
  "id": 1159,
  "name": "美溪",
  "parent_id": 188,
  "k1": "m",
  "k2": "mx",
  "k3": "meixi",
  "k4": "",
  "k5": "区",
  "k6": 230708,
  "k7": "0458"
}, {
  "id": 1160,
  "name": "金山屯",
  "parent_id": 188,
  "k1": "j",
  "k2": "jst",
  "k3": "jinshantun",
  "k4": "",
  "k5": "区",
  "k6": 230709,
  "k7": "0458"
}, {
  "id": 1161,
  "name": "五营",
  "parent_id": 188,
  "k1": "w",
  "k2": "wy",
  "k3": "wuying",
  "k4": "",
  "k5": "区",
  "k6": 230710,
  "k7": "0458"
}, {
  "id": 1162,
  "name": "乌马河",
  "parent_id": 188,
  "k1": "w",
  "k2": "wmh",
  "k3": "wumahe",
  "k4": "",
  "k5": "区",
  "k6": 230711,
  "k7": "0458"
}, {
  "id": 1163,
  "name": "汤旺河",
  "parent_id": 188,
  "k1": "t",
  "k2": "twh",
  "k3": "tangwanghe",
  "k4": "",
  "k5": "区",
  "k6": 230712,
  "k7": "0458"
}, {
  "id": 1164,
  "name": "带岭",
  "parent_id": 188,
  "k1": "d",
  "k2": "dl",
  "k3": "dailing",
  "k4": "",
  "k5": "区",
  "k6": 230713,
  "k7": "0458"
}, {
  "id": 1165,
  "name": "乌伊岭",
  "parent_id": 188,
  "k1": "w",
  "k2": "wyl",
  "k3": "wuyiling",
  "k4": "",
  "k5": "区",
  "k6": 230714,
  "k7": "0458"
}, {
  "id": 1166,
  "name": "红星",
  "parent_id": 188,
  "k1": "h",
  "k2": "hx",
  "k3": "hongxing",
  "k4": "",
  "k5": "区",
  "k6": 230715,
  "k7": "0458"
}, {
  "id": 1167,
  "name": "上甘岭",
  "parent_id": 188,
  "k1": "s",
  "k2": "sgl",
  "k3": "shangganling",
  "k4": "",
  "k5": "区",
  "k6": 230716,
  "k7": "0458"
}, {
  "id": 1168,
  "name": "嘉荫",
  "parent_id": 188,
  "k1": "j",
  "k2": "jy",
  "k3": "jiayin",
  "k4": "",
  "k5": "县",
  "k6": 230722,
  "k7": "0458"
}, {
  "id": 1169,
  "name": "铁力",
  "parent_id": 188,
  "k1": "t",
  "k2": "tl",
  "k3": "tieli",
  "k4": "",
  "k5": "市",
  "k6": 230781,
  "k7": "0458"
}, {
  "id": 1170,
  "name": "向阳",
  "parent_id": 189,
  "k1": "x",
  "k2": "xy",
  "k3": "xiangyang",
  "k4": "",
  "k5": "区",
  "k6": 230803,
  "k7": "0454"
}, {
  "id": 1171,
  "name": "前进",
  "parent_id": 189,
  "k1": "q",
  "k2": "qj",
  "k3": "qianjin",
  "k4": "",
  "k5": "区",
  "k6": 230804,
  "k7": "0454"
}, {
  "id": 1172,
  "name": "东风",
  "parent_id": 189,
  "k1": "d",
  "k2": "df",
  "k3": "dongfeng",
  "k4": "",
  "k5": "区",
  "k6": 230805,
  "k7": "0454"
}, {
  "id": 1173,
  "name": "郊区",
  "parent_id": 189,
  "k1": "j",
  "k2": "jq",
  "k3": "jiaoqu",
  "k4": "",
  "k5": "",
  "k6": 230811,
  "k7": "0454"
}, {
  "id": 1174,
  "name": "桦南",
  "parent_id": 189,
  "k1": "h",
  "k2": "hn",
  "k3": "huanan",
  "k4": "",
  "k5": "县",
  "k6": 230822,
  "k7": "0454"
}, {
  "id": 1175,
  "name": "桦川",
  "parent_id": 189,
  "k1": "h",
  "k2": "hc",
  "k3": "huachuan",
  "k4": "",
  "k5": "县",
  "k6": 230826,
  "k7": "0454"
}, {
  "id": 1176,
  "name": "汤原",
  "parent_id": 189,
  "k1": "t",
  "k2": "ty",
  "k3": "tangyuan",
  "k4": "",
  "k5": "县",
  "k6": 230828,
  "k7": "0454"
}, {
  "id": 1177,
  "name": "抚远",
  "parent_id": 189,
  "k1": "f",
  "k2": "fy",
  "k3": "fuyuan",
  "k4": "",
  "k5": "市",
  "k6": 230883,
  "k7": "0454"
}, {
  "id": 1178,
  "name": "同江",
  "parent_id": 189,
  "k1": "t",
  "k2": "tj",
  "k3": "tongjiang",
  "k4": "",
  "k5": "市",
  "k6": 230881,
  "k7": "0454"
}, {
  "id": 1179,
  "name": "富锦",
  "parent_id": 189,
  "k1": "f",
  "k2": "fj",
  "k3": "fujin",
  "k4": "",
  "k5": "市",
  "k6": 230882,
  "k7": "0454"
}, {
  "id": 1180,
  "name": "新兴",
  "parent_id": 190,
  "k1": "x",
  "k2": "xx",
  "k3": "xinxing",
  "k4": "",
  "k5": "区",
  "k6": 230902,
  "k7": "0464"
}, {
  "id": 1181,
  "name": "桃山",
  "parent_id": 190,
  "k1": "t",
  "k2": "ts",
  "k3": "taoshan",
  "k4": "",
  "k5": "区",
  "k6": 230903,
  "k7": "0464"
}, {
  "id": 1182,
  "name": "茄子河",
  "parent_id": 190,
  "k1": "q",
  "k2": "qzh",
  "k3": "qiezihe",
  "k4": "",
  "k5": "区",
  "k6": 230904,
  "k7": "0464"
}, {
  "id": 1183,
  "name": "勃利",
  "parent_id": 190,
  "k1": "b",
  "k2": "bl",
  "k3": "boli",
  "k4": "",
  "k5": "县",
  "k6": 230921,
  "k7": "0464"
}, {
  "id": 1184,
  "name": "东安",
  "parent_id": 191,
  "k1": "d",
  "k2": "da",
  "k3": "dongan",
  "k4": "",
  "k5": "区",
  "k6": 231002,
  "k7": "0453"
}, {
  "id": 1185,
  "name": "阳明",
  "parent_id": 191,
  "k1": "y",
  "k2": "ym",
  "k3": "yangming",
  "k4": "",
  "k5": "区",
  "k6": 231003,
  "k7": "0453"
}, {
  "id": 1186,
  "name": "爱民",
  "parent_id": 191,
  "k1": "a",
  "k2": "am",
  "k3": "aimin",
  "k4": "",
  "k5": "区",
  "k6": 231004,
  "k7": "0453"
}, {
  "id": 1187,
  "name": "西安",
  "parent_id": 191,
  "k1": "x",
  "k2": "xa",
  "k3": "xian",
  "k4": "",
  "k5": "区",
  "k6": 231005,
  "k7": "0453"
}, {
  "id": 1188,
  "name": "东宁",
  "parent_id": 191,
  "k1": "d",
  "k2": "dn",
  "k3": "dongning",
  "k4": "",
  "k5": "市",
  "k6": 231024,
  "k7": "0453"
}, {
  "id": 1189,
  "name": "林口",
  "parent_id": 191,
  "k1": "l",
  "k2": "lk",
  "k3": "linkou",
  "k4": "",
  "k5": "县",
  "k6": 231025,
  "k7": "0453"
}, {
  "id": 1190,
  "name": "绥芬河",
  "parent_id": 191,
  "k1": "s",
  "k2": "sfh",
  "k3": "suifenhe",
  "k4": "",
  "k5": "市",
  "k6": 231081,
  "k7": "0453"
}, {
  "id": 1191,
  "name": "海林",
  "parent_id": 191,
  "k1": "h",
  "k2": "hl",
  "k3": "hailin",
  "k4": "",
  "k5": "市",
  "k6": 231083,
  "k7": "0453"
}, {
  "id": 1192,
  "name": "宁安",
  "parent_id": 191,
  "k1": "n",
  "k2": "na",
  "k3": "ningan",
  "k4": "",
  "k5": "市",
  "k6": 231084,
  "k7": "0453"
}, {
  "id": 1193,
  "name": "穆棱",
  "parent_id": 191,
  "k1": "m",
  "k2": "ml",
  "k3": "muleng",
  "k4": "",
  "k5": "市",
  "k6": 231085,
  "k7": "0453"
}, {
  "id": 1194,
  "name": "爱辉",
  "parent_id": 192,
  "k1": "a",
  "k2": "ah",
  "k3": "aihui",
  "k4": "",
  "k5": "区",
  "k6": 231102,
  "k7": "0456"
}, {
  "id": 1195,
  "name": "嫩江",
  "parent_id": 192,
  "k1": "n",
  "k2": "nj",
  "k3": "nenjiang",
  "k4": "",
  "k5": "县",
  "k6": 231121,
  "k7": "0456"
}, {
  "id": 1196,
  "name": "逊克",
  "parent_id": 192,
  "k1": "x",
  "k2": "xk",
  "k3": "xunke",
  "k4": "",
  "k5": "县",
  "k6": 231123,
  "k7": "0456"
}, {
  "id": 1197,
  "name": "孙吴",
  "parent_id": 192,
  "k1": "s",
  "k2": "sw",
  "k3": "sunwu",
  "k4": "",
  "k5": "县",
  "k6": 231124,
  "k7": "0456"
}, {
  "id": 1198,
  "name": "北安",
  "parent_id": 192,
  "k1": "b",
  "k2": "ba",
  "k3": "beian",
  "k4": "",
  "k5": "市",
  "k6": 231181,
  "k7": "0456"
}, {
  "id": 1199,
  "name": "五大连池",
  "parent_id": 192,
  "k1": "w",
  "k2": "wdlc",
  "k3": "wudalianchi",
  "k4": "",
  "k5": "市",
  "k6": 231182,
  "k7": "0456"
}, {
  "id": 1200,
  "name": "北林",
  "parent_id": 193,
  "k1": "b",
  "k2": "bl",
  "k3": "beilin",
  "k4": "",
  "k5": "区",
  "k6": 231202,
  "k7": "0455"
}, {
  "id": 1201,
  "name": "望奎",
  "parent_id": 193,
  "k1": "w",
  "k2": "wk",
  "k3": "wangkui",
  "k4": "",
  "k5": "县",
  "k6": 231221,
  "k7": "0455"
}, {
  "id": 1202,
  "name": "兰西",
  "parent_id": 193,
  "k1": "l",
  "k2": "lx",
  "k3": "lanxi",
  "k4": "",
  "k5": "县",
  "k6": 231222,
  "k7": "0455"
}, {
  "id": 1203,
  "name": "青冈",
  "parent_id": 193,
  "k1": "q",
  "k2": "qg",
  "k3": "qinggang",
  "k4": "",
  "k5": "县",
  "k6": 231223,
  "k7": "0455"
}, {
  "id": 1204,
  "name": "庆安",
  "parent_id": 193,
  "k1": "q",
  "k2": "qa",
  "k3": "qingan",
  "k4": "",
  "k5": "县",
  "k6": 231224,
  "k7": "0455"
}, {
  "id": 1205,
  "name": "明水",
  "parent_id": 193,
  "k1": "m",
  "k2": "ms",
  "k3": "mingshui",
  "k4": "",
  "k5": "县",
  "k6": 231225,
  "k7": "0455"
}, {
  "id": 1206,
  "name": "绥棱",
  "parent_id": 193,
  "k1": "s",
  "k2": "sl",
  "k3": "suileng",
  "k4": "",
  "k5": "县",
  "k6": 231226,
  "k7": "0455"
}, {
  "id": 1207,
  "name": "安达",
  "parent_id": 193,
  "k1": "a",
  "k2": "ad",
  "k3": "anda",
  "k4": "",
  "k5": "市",
  "k6": 231281,
  "k7": "0455"
}, {
  "id": 1208,
  "name": "肇东",
  "parent_id": 193,
  "k1": "z",
  "k2": "zd",
  "k3": "zhaodong",
  "k4": "",
  "k5": "市",
  "k6": 231282,
  "k7": "0455"
}, {
  "id": 1209,
  "name": "海伦",
  "parent_id": 193,
  "k1": "h",
  "k2": "hl",
  "k3": "hailun",
  "k4": "",
  "k5": "市",
  "k6": 231283,
  "k7": "0455"
}, {
  "id": 1210,
  "name": "加格达奇",
  "parent_id": 194,
  "k1": "j",
  "k2": "jgdq",
  "k3": "jiagedaqi",
  "k4": "",
  "k5": "区",
  "k6": 232701,
  "k7": "0457"
}, {
  "id": 1211,
  "name": "松岭",
  "parent_id": 194,
  "k1": "s",
  "k2": "sl",
  "k3": "songling",
  "k4": "",
  "k5": "区",
  "k6": 232702,
  "k7": "0457"
}, {
  "id": 1212,
  "name": "新林",
  "parent_id": 194,
  "k1": "x",
  "k2": "xl",
  "k3": "xinlin",
  "k4": "",
  "k5": "区",
  "k6": 232703,
  "k7": "0457"
}, {
  "id": 1213,
  "name": "呼中",
  "parent_id": 194,
  "k1": "h",
  "k2": "hz",
  "k3": "huzhong",
  "k4": "",
  "k5": "区",
  "k6": 232704,
  "k7": "0457"
}, {
  "id": 1214,
  "name": "呼玛",
  "parent_id": 194,
  "k1": "h",
  "k2": "hm",
  "k3": "huma",
  "k4": "",
  "k5": "县",
  "k6": 232721,
  "k7": "0457"
}, {
  "id": 1215,
  "name": "塔河",
  "parent_id": 194,
  "k1": "t",
  "k2": "th",
  "k3": "tahe",
  "k4": "",
  "k5": "县",
  "k6": 232722,
  "k7": "0457"
}, {
  "id": 1216,
  "name": "漠河",
  "parent_id": 194,
  "k1": "m",
  "k2": "mh",
  "k3": "mohe",
  "k4": "",
  "k5": "市",
  "k6": 232701,
  "k7": "0457"
}, {
  "id": 1217,
  "name": "玄武",
  "parent_id": 195,
  "k1": "x",
  "k2": "xw",
  "k3": "xuanwu",
  "k4": "",
  "k5": "区",
  "k6": 320102,
  "k7": ""
}, {
  "id": 1218,
  "name": "秦淮",
  "parent_id": 195,
  "k1": "q",
  "k2": "qh",
  "k3": "qinhuai",
  "k4": "",
  "k5": "区",
  "k6": 320104,
  "k7": ""
}, {
  "id": 1219,
  "name": "建邺",
  "parent_id": 195,
  "k1": "j",
  "k2": "jy",
  "k3": "jianye",
  "k4": "",
  "k5": "区",
  "k6": 320105,
  "k7": ""
}, {
  "id": 1220,
  "name": "鼓楼",
  "parent_id": 195,
  "k1": "g",
  "k2": "gl",
  "k3": "gulou",
  "k4": "",
  "k5": "区",
  "k6": 320106,
  "k7": ""
}, {
  "id": 1221,
  "name": "浦口",
  "parent_id": 195,
  "k1": "p",
  "k2": "pk",
  "k3": "pukou",
  "k4": "",
  "k5": "区",
  "k6": 320111,
  "k7": ""
}, {
  "id": 1222,
  "name": "栖霞",
  "parent_id": 195,
  "k1": "q",
  "k2": "qx",
  "k3": "qixia",
  "k4": "",
  "k5": "区",
  "k6": 320113,
  "k7": ""
}, {
  "id": 1223,
  "name": "雨花台",
  "parent_id": 195,
  "k1": "y",
  "k2": "yht",
  "k3": "yuhuatai",
  "k4": "",
  "k5": "区",
  "k6": 320114,
  "k7": ""
}, {
  "id": 1224,
  "name": "江宁",
  "parent_id": 195,
  "k1": "j",
  "k2": "jn",
  "k3": "jiangning",
  "k4": "",
  "k5": "区",
  "k6": 320115,
  "k7": ""
}, {
  "id": 1225,
  "name": "六合",
  "parent_id": 195,
  "k1": "l",
  "k2": "lh",
  "k3": "liuhe",
  "k4": "",
  "k5": "区",
  "k6": 320116,
  "k7": ""
}, {
  "id": 1226,
  "name": "溧水",
  "parent_id": 195,
  "k1": "l",
  "k2": "ls",
  "k3": "lishui",
  "k4": "",
  "k5": "区",
  "k6": 320124,
  "k7": ""
}, {
  "id": 1227,
  "name": "高淳",
  "parent_id": 195,
  "k1": "g",
  "k2": "gc",
  "k3": "gaochun",
  "k4": "",
  "k5": "区",
  "k6": 320125,
  "k7": ""
}, {
  "id": 1228,
  "name": "梁溪",
  "parent_id": 196,
  "k1": "l",
  "k2": "lx",
  "k3": "liangxi",
  "k4": "",
  "k5": "区",
  "k6": 320202,
  "k7": "0510"
}, {
  "id": 1229,
  "name": "新吴",
  "parent_id": 196,
  "k1": "x",
  "k2": "xw",
  "k3": "xinwu",
  "k4": "",
  "k5": "区",
  "k6": "",
  "k7": "0510"
}, {
  "id": 1231,
  "name": "锡山",
  "parent_id": 196,
  "k1": "x",
  "k2": "xs",
  "k3": "xishan",
  "k4": "",
  "k5": "区",
  "k6": 320205,
  "k7": "0510"
}, {
  "id": 1232,
  "name": "惠山",
  "parent_id": 196,
  "k1": "h",
  "k2": "hs",
  "k3": "huishan",
  "k4": "",
  "k5": "区",
  "k6": 320206,
  "k7": "0510"
}, {
  "id": 1233,
  "name": "滨湖",
  "parent_id": 196,
  "k1": "b",
  "k2": "bh",
  "k3": "binhu",
  "k4": "",
  "k5": "区",
  "k6": 320211,
  "k7": "0510"
}, {
  "id": 1234,
  "name": "江阴",
  "parent_id": 196,
  "k1": "j",
  "k2": "jy",
  "k3": "jiangyin",
  "k4": "",
  "k5": "市",
  "k6": 320281,
  "k7": "0510"
}, {
  "id": 1235,
  "name": "宜兴",
  "parent_id": 196,
  "k1": "y",
  "k2": "yx",
  "k3": "yixing",
  "k4": "",
  "k5": "市",
  "k6": 320282,
  "k7": "0510"
}, {
  "id": 1236,
  "name": "鼓楼",
  "parent_id": 197,
  "k1": "g",
  "k2": "gl",
  "k3": "gulou",
  "k4": "",
  "k5": "区",
  "k6": 320302,
  "k7": "0516"
}, {
  "id": 1237,
  "name": "云龙",
  "parent_id": 197,
  "k1": "y",
  "k2": "yl",
  "k3": "yunlong",
  "k4": "",
  "k5": "区",
  "k6": 320303,
  "k7": "0516"
}, {
  "id": 1238,
  "name": "贾汪",
  "parent_id": 197,
  "k1": "j",
  "k2": "jw",
  "k3": "jiawang",
  "k4": "",
  "k5": "区",
  "k6": 320305,
  "k7": "0516"
}, {
  "id": 1239,
  "name": "泉山",
  "parent_id": 197,
  "k1": "q",
  "k2": "qs",
  "k3": "quanshan",
  "k4": "",
  "k5": "区",
  "k6": 320311,
  "k7": "0516"
}, {
  "id": 1240,
  "name": "铜山",
  "parent_id": 197,
  "k1": "t",
  "k2": "ts",
  "k3": "tongshan",
  "k4": "",
  "k5": "区",
  "k6": 320312,
  "k7": "0516"
}, {
  "id": 1241,
  "name": "丰县",
  "parent_id": 197,
  "k1": "f",
  "k2": "fx",
  "k3": "fengxian",
  "k4": "",
  "k5": "",
  "k6": 320321,
  "k7": "0516"
}, {
  "id": 1242,
  "name": "沛县",
  "parent_id": 197,
  "k1": "p",
  "k2": "px",
  "k3": "peixian",
  "k4": "",
  "k5": "",
  "k6": 320322,
  "k7": "0516"
}, {
  "id": 1243,
  "name": "睢宁",
  "parent_id": 197,
  "k1": "s",
  "k2": "sn",
  "k3": "suining",
  "k4": "",
  "k5": "县",
  "k6": 320324,
  "k7": "0516"
}, {
  "id": 1244,
  "name": "新沂",
  "parent_id": 197,
  "k1": "x",
  "k2": "xy",
  "k3": "xinyi",
  "k4": "",
  "k5": "市",
  "k6": 320381,
  "k7": "0516"
}, {
  "id": 1245,
  "name": "邳州",
  "parent_id": 197,
  "k1": "p",
  "k2": "pz",
  "k3": "pizhou",
  "k4": "",
  "k5": "市",
  "k6": 320382,
  "k7": "0516"
}, {
  "id": 1246,
  "name": "天宁",
  "parent_id": 198,
  "k1": "t",
  "k2": "tn",
  "k3": "tianning",
  "k4": "",
  "k5": "区",
  "k6": 320402,
  "k7": "0519"
}, {
  "id": 1247,
  "name": "钟楼",
  "parent_id": 198,
  "k1": "z",
  "k2": "zl",
  "k3": "zhonglou",
  "k4": "",
  "k5": "区",
  "k6": 320404,
  "k7": "0519"
}, {
  "id": 1249,
  "name": "新北",
  "parent_id": 198,
  "k1": "x",
  "k2": "xb",
  "k3": "xinbei",
  "k4": "",
  "k5": "区",
  "k6": 320411,
  "k7": "0519"
}, {
  "id": 1250,
  "name": "武进",
  "parent_id": 198,
  "k1": "w",
  "k2": "wj",
  "k3": "wujin",
  "k4": "",
  "k5": "区",
  "k6": 320412,
  "k7": "0519"
}, {
  "id": 1251,
  "name": "溧阳",
  "parent_id": 198,
  "k1": "l",
  "k2": "ly",
  "k3": "liyang",
  "k4": "",
  "k5": "市",
  "k6": 320481,
  "k7": "0519"
}, {
  "id": 1252,
  "name": "金坛",
  "parent_id": 198,
  "k1": "j",
  "k2": "jt",
  "k3": "jintan",
  "k4": "",
  "k5": "区",
  "k6": 320482,
  "k7": "0519"
}, {
  "id": 1253,
  "name": "虎丘",
  "parent_id": 199,
  "k1": "h",
  "k2": "hq",
  "k3": "huqiu",
  "k4": "",
  "k5": "区",
  "k6": 320505,
  "k7": "0512"
}, {
  "id": 1254,
  "name": "吴中",
  "parent_id": 199,
  "k1": "w",
  "k2": "wz",
  "k3": "wuzhong",
  "k4": "",
  "k5": "区",
  "k6": 320506,
  "k7": "0512"
}, {
  "id": 1255,
  "name": "相城",
  "parent_id": 199,
  "k1": "x",
  "k2": "xc",
  "k3": "xiangcheng",
  "k4": "",
  "k5": "区",
  "k6": 320507,
  "k7": "0512"
}, {
  "id": 1256,
  "name": "姑苏",
  "parent_id": 199,
  "k1": "g",
  "k2": "gs",
  "k3": "gusu",
  "k4": "",
  "k5": "区",
  "k6": 320508,
  "k7": "0512"
}, {
  "id": 1257,
  "name": "吴江",
  "parent_id": 199,
  "k1": "w",
  "k2": "wj",
  "k3": "wujiang",
  "k4": "",
  "k5": "市",
  "k6": 320509,
  "k7": "0512"
}, {
  "id": 1258,
  "name": "常熟",
  "parent_id": 199,
  "k1": "c",
  "k2": "cs",
  "k3": "changshu",
  "k4": "",
  "k5": "市",
  "k6": 320581,
  "k7": "0512"
}, {
  "id": 1259,
  "name": "张家港",
  "parent_id": 199,
  "k1": "z",
  "k2": "zjg",
  "k3": "zhangjiagang",
  "k4": "",
  "k5": "市",
  "k6": 320582,
  "k7": "0512"
}, {
  "id": 1260,
  "name": "昆山",
  "parent_id": 199,
  "k1": "k",
  "k2": "ks",
  "k3": "kunshan",
  "k4": "",
  "k5": "市",
  "k6": 320583,
  "k7": "0512"
}, {
  "id": 1261,
  "name": "太仓",
  "parent_id": 199,
  "k1": "t",
  "k2": "tc",
  "k3": "taicang",
  "k4": "",
  "k5": "市",
  "k6": 320585,
  "k7": "0512"
}, {
  "id": 1262,
  "name": "崇川",
  "parent_id": 200,
  "k1": "c",
  "k2": "cc",
  "k3": "chongchuan",
  "k4": "",
  "k5": "区",
  "k6": 320602,
  "k7": "0513"
}, {
  "id": 1263,
  "name": "港闸",
  "parent_id": 200,
  "k1": "g",
  "k2": "gz",
  "k3": "gangzha",
  "k4": "",
  "k5": "区",
  "k6": 320611,
  "k7": "0513"
}, {
  "id": 1264,
  "name": "通州",
  "parent_id": 200,
  "k1": "t",
  "k2": "tz",
  "k3": "tongzhou",
  "k4": "",
  "k5": "区",
  "k6": 320612,
  "k7": "0513"
}, {
  "id": 1265,
  "name": "海安",
  "parent_id": 200,
  "k1": "h",
  "k2": "ha",
  "k3": "haian",
  "k4": "",
  "k5": "市",
  "k6": 320685,
  "k7": "0513"
}, {
  "id": 1266,
  "name": "如东",
  "parent_id": 200,
  "k1": "r",
  "k2": "rd",
  "k3": "rudong",
  "k4": "",
  "k5": "县",
  "k6": 320623,
  "k7": "0513"
}, {
  "id": 1267,
  "name": "启东",
  "parent_id": 200,
  "k1": "q",
  "k2": "qd",
  "k3": "qidong",
  "k4": "",
  "k5": "市",
  "k6": 320681,
  "k7": "0513"
}, {
  "id": 1268,
  "name": "如皋",
  "parent_id": 200,
  "k1": "r",
  "k2": "rg",
  "k3": "rugao",
  "k4": "",
  "k5": "市",
  "k6": 320682,
  "k7": "0513"
}, {
  "id": 1269,
  "name": "海门",
  "parent_id": 200,
  "k1": "h",
  "k2": "hm",
  "k3": "haimen",
  "k4": "",
  "k5": "市",
  "k6": 320684,
  "k7": "0513"
}, {
  "id": 1270,
  "name": "连云",
  "parent_id": 201,
  "k1": "l",
  "k2": "ly",
  "k3": "lianyun",
  "k4": "",
  "k5": "区",
  "k6": 320703,
  "k7": "0518"
}, {
  "id": 1272,
  "name": "海州",
  "parent_id": 201,
  "k1": "h",
  "k2": "hz",
  "k3": "haizhou",
  "k4": "",
  "k5": "区",
  "k6": 320706,
  "k7": "0518"
}, {
  "id": 1273,
  "name": "赣榆",
  "parent_id": 201,
  "k1": "g",
  "k2": "gy",
  "k3": "ganyu",
  "k4": "",
  "k5": "区",
  "k6": 320721,
  "k7": "0518"
}, {
  "id": 1274,
  "name": "东海",
  "parent_id": 201,
  "k1": "d",
  "k2": "dh",
  "k3": "donghai",
  "k4": "",
  "k5": "县",
  "k6": 320722,
  "k7": "0518"
}, {
  "id": 1275,
  "name": "灌云",
  "parent_id": 201,
  "k1": "g",
  "k2": "gy",
  "k3": "guanyun",
  "k4": "",
  "k5": "县",
  "k6": 320723,
  "k7": "0518"
}, {
  "id": 1276,
  "name": "灌南",
  "parent_id": 201,
  "k1": "g",
  "k2": "gn",
  "k3": "guannan",
  "k4": "",
  "k5": "县",
  "k6": 320724,
  "k7": "0518"
}, {
  "id": 1278,
  "name": "淮安",
  "parent_id": 202,
  "k1": "h",
  "k2": "ha",
  "k3": "huaian",
  "k4": "",
  "k5": "区",
  "k6": 320803,
  "k7": "0517"
}, {
  "id": 1279,
  "name": "淮阴",
  "parent_id": 202,
  "k1": "h",
  "k2": "hy",
  "k3": "huaiyin",
  "k4": "",
  "k5": "区",
  "k6": 320804,
  "k7": "0517"
}, {
  "id": 1280,
  "name": "清江浦",
  "parent_id": 202,
  "k1": "q",
  "k2": "qjp",
  "k3": "qingjiangpu",
  "k4": "",
  "k5": "区",
  "k6": 320812,
  "k7": "0517"
}, {
  "id": 1281,
  "name": "涟水",
  "parent_id": 202,
  "k1": "l",
  "k2": "ls",
  "k3": "lianshui",
  "k4": "",
  "k5": "县",
  "k6": 320826,
  "k7": "0517"
}, {
  "id": 1282,
  "name": "洪泽",
  "parent_id": 202,
  "k1": "h",
  "k2": "hz",
  "k3": "hongze",
  "k4": "",
  "k5": "区",
  "k6": 320813,
  "k7": "0517"
}, {
  "id": 1283,
  "name": "盱眙",
  "parent_id": 202,
  "k1": "x",
  "k2": "xy",
  "k3": "xuyi",
  "k4": "",
  "k5": "县",
  "k6": 320830,
  "k7": "0517"
}, {
  "id": 1284,
  "name": "金湖",
  "parent_id": 202,
  "k1": "j",
  "k2": "jh",
  "k3": "jinhu",
  "k4": "",
  "k5": "县",
  "k6": 320831,
  "k7": "0517"
}, {
  "id": 1285,
  "name": "亭湖",
  "parent_id": 203,
  "k1": "t",
  "k2": "th",
  "k3": "tinghu",
  "k4": "",
  "k5": "区",
  "k6": 320902,
  "k7": "0515"
}, {
  "id": 1286,
  "name": "盐都",
  "parent_id": 203,
  "k1": "y",
  "k2": "yd",
  "k3": "yandu",
  "k4": "",
  "k5": "区",
  "k6": 320903,
  "k7": "0515"
}, {
  "id": 1287,
  "name": "响水",
  "parent_id": 203,
  "k1": "x",
  "k2": "xs",
  "k3": "xiangshui",
  "k4": "",
  "k5": "县",
  "k6": 320921,
  "k7": "0515"
}, {
  "id": 1288,
  "name": "滨海",
  "parent_id": 203,
  "k1": "b",
  "k2": "bh",
  "k3": "binhai",
  "k4": "",
  "k5": "县",
  "k6": 320922,
  "k7": "0515"
}, {
  "id": 1289,
  "name": "阜宁",
  "parent_id": 203,
  "k1": "f",
  "k2": "fn",
  "k3": "funing",
  "k4": "",
  "k5": "县",
  "k6": 320923,
  "k7": "0515"
}, {
  "id": 1290,
  "name": "射阳",
  "parent_id": 203,
  "k1": "s",
  "k2": "sy",
  "k3": "sheyang",
  "k4": "",
  "k5": "县",
  "k6": 320924,
  "k7": "0515"
}, {
  "id": 1291,
  "name": "建湖",
  "parent_id": 203,
  "k1": "j",
  "k2": "jh",
  "k3": "jianhu",
  "k4": "",
  "k5": "县",
  "k6": 320925,
  "k7": "0515"
}, {
  "id": 1292,
  "name": "东台",
  "parent_id": 203,
  "k1": "d",
  "k2": "dt",
  "k3": "dongtai",
  "k4": "",
  "k5": "市",
  "k6": 320981,
  "k7": "0515"
}, {
  "id": 1293,
  "name": "大丰",
  "parent_id": 203,
  "k1": "d",
  "k2": "df",
  "k3": "dafeng",
  "k4": "",
  "k5": "区",
  "k6": 320982,
  "k7": "0515"
}, {
  "id": 1294,
  "name": "广陵",
  "parent_id": 204,
  "k1": "g",
  "k2": "gl",
  "k3": "guangling",
  "k4": "",
  "k5": "区",
  "k6": 321002,
  "k7": "0514"
}, {
  "id": 1295,
  "name": "邗江",
  "parent_id": 204,
  "k1": "h",
  "k2": "hj",
  "k3": "hanjiang",
  "k4": "",
  "k5": "区",
  "k6": 321003,
  "k7": "0514"
}, {
  "id": 1296,
  "name": "江都",
  "parent_id": 204,
  "k1": "j",
  "k2": "jd",
  "k3": "jiangu",
  "k4": "",
  "k5": "区",
  "k6": 321012,
  "k7": "0514"
}, {
  "id": 1297,
  "name": "宝应",
  "parent_id": 204,
  "k1": "b",
  "k2": "by",
  "k3": "baoying",
  "k4": "",
  "k5": "县",
  "k6": 321023,
  "k7": "0514"
}, {
  "id": 1298,
  "name": "仪征",
  "parent_id": 204,
  "k1": "y",
  "k2": "yz",
  "k3": "yizheng",
  "k4": "",
  "k5": "市",
  "k6": 321081,
  "k7": "0514"
}, {
  "id": 1299,
  "name": "高邮",
  "parent_id": 204,
  "k1": "g",
  "k2": "gy",
  "k3": "gaoyou",
  "k4": "",
  "k5": "市",
  "k6": 321084,
  "k7": "0514"
}, {
  "id": 1300,
  "name": "京口",
  "parent_id": 205,
  "k1": "j",
  "k2": "jk",
  "k3": "jingkou",
  "k4": "",
  "k5": "区",
  "k6": 321102,
  "k7": "0511"
}, {
  "id": 1301,
  "name": "润州",
  "parent_id": 205,
  "k1": "r",
  "k2": "rz",
  "k3": "runzhou",
  "k4": "",
  "k5": "区",
  "k6": 321111,
  "k7": "0511"
}, {
  "id": 1302,
  "name": "丹徒",
  "parent_id": 205,
  "k1": "d",
  "k2": "dt",
  "k3": "dantu",
  "k4": "",
  "k5": "区",
  "k6": 321112,
  "k7": "0511"
}, {
  "id": 1303,
  "name": "丹阳",
  "parent_id": 205,
  "k1": "d",
  "k2": "dy",
  "k3": "danyang",
  "k4": "",
  "k5": "市",
  "k6": 321181,
  "k7": "0511"
}, {
  "id": 1304,
  "name": "扬中",
  "parent_id": 205,
  "k1": "y",
  "k2": "yz",
  "k3": "yangzhong",
  "k4": "",
  "k5": "市",
  "k6": 321182,
  "k7": "0511"
}, {
  "id": 1305,
  "name": "句容",
  "parent_id": 205,
  "k1": "j",
  "k2": "jr",
  "k3": "jurong",
  "k4": "",
  "k5": "市",
  "k6": 321183,
  "k7": "0511"
}, {
  "id": 1306,
  "name": "海陵",
  "parent_id": 206,
  "k1": "h",
  "k2": "hl",
  "k3": "hailing",
  "k4": "",
  "k5": "区",
  "k6": 321202,
  "k7": "0523"
}, {
  "id": 1307,
  "name": "高港",
  "parent_id": 206,
  "k1": "g",
  "k2": "gg",
  "k3": "gaogang",
  "k4": "",
  "k5": "区",
  "k6": 321203,
  "k7": "0523"
}, {
  "id": 1308,
  "name": "兴化",
  "parent_id": 206,
  "k1": "x",
  "k2": "xh",
  "k3": "xinghua",
  "k4": "",
  "k5": "市",
  "k6": 321281,
  "k7": "0523"
}, {
  "id": 1309,
  "name": "靖江",
  "parent_id": 206,
  "k1": "j",
  "k2": "jj",
  "k3": "jingjiang",
  "k4": "",
  "k5": "市",
  "k6": 321282,
  "k7": "0523"
}, {
  "id": 1310,
  "name": "泰兴",
  "parent_id": 206,
  "k1": "t",
  "k2": "tx",
  "k3": "taixing",
  "k4": "",
  "k5": "市",
  "k6": 321283,
  "k7": "0523"
}, {
  "id": 1311,
  "name": "姜堰",
  "parent_id": 206,
  "k1": "j",
  "k2": "jy",
  "k3": "jiangyan",
  "k4": "",
  "k5": "区",
  "k6": 321284,
  "k7": "0523"
}, {
  "id": 1312,
  "name": "宿城",
  "parent_id": 207,
  "k1": "s",
  "k2": "sc",
  "k3": "sucheng",
  "k4": "",
  "k5": "区",
  "k6": 321302,
  "k7": "0527"
}, {
  "id": 1313,
  "name": "宿豫",
  "parent_id": 207,
  "k1": "s",
  "k2": "sy",
  "k3": "suyu",
  "k4": "",
  "k5": "区",
  "k6": 321311,
  "k7": "0527"
}, {
  "id": 1314,
  "name": "沭阳",
  "parent_id": 207,
  "k1": "s",
  "k2": "sy",
  "k3": "shuyang",
  "k4": "",
  "k5": "县",
  "k6": 321322,
  "k7": "0527"
}, {
  "id": 1315,
  "name": "泗阳",
  "parent_id": 207,
  "k1": "s",
  "k2": "sy",
  "k3": "siyang",
  "k4": "",
  "k5": "县",
  "k6": 321323,
  "k7": "0527"
}, {
  "id": 1316,
  "name": "泗洪",
  "parent_id": 207,
  "k1": "s",
  "k2": "sh",
  "k3": "sihong",
  "k4": "",
  "k5": "县",
  "k6": 321324,
  "k7": "0527"
}, {
  "id": 1317,
  "name": "上城",
  "parent_id": 208,
  "k1": "s",
  "k2": "sc",
  "k3": "shangcheng",
  "k4": "",
  "k5": "区",
  "k6": 330102,
  "k7": "0571"
}, {
  "id": 1318,
  "name": "下城",
  "parent_id": 208,
  "k1": "x",
  "k2": "xc",
  "k3": "xiacheng",
  "k4": "",
  "k5": "区",
  "k6": 330103,
  "k7": "0571"
}, {
  "id": 1319,
  "name": "江干",
  "parent_id": 208,
  "k1": "j",
  "k2": "jg",
  "k3": "jianggan",
  "k4": "",
  "k5": "区",
  "k6": 330104,
  "k7": "0571"
}, {
  "id": 1320,
  "name": "拱墅",
  "parent_id": 208,
  "k1": "g",
  "k2": "gs",
  "k3": "gongshu",
  "k4": "",
  "k5": "区",
  "k6": 330105,
  "k7": "0571"
}, {
  "id": 1321,
  "name": "西湖",
  "parent_id": 208,
  "k1": "x",
  "k2": "xh",
  "k3": "xihu",
  "k4": "",
  "k5": "区",
  "k6": 330106,
  "k7": "0571"
}, {
  "id": 1322,
  "name": "滨江",
  "parent_id": 208,
  "k1": "b",
  "k2": "bj",
  "k3": "binjiang",
  "k4": "",
  "k5": "区",
  "k6": 330108,
  "k7": "0571"
}, {
  "id": 1323,
  "name": "萧山",
  "parent_id": 208,
  "k1": "x",
  "k2": "xs",
  "k3": "xiaoshan",
  "k4": "",
  "k5": "区",
  "k6": 330109,
  "k7": "0571"
}, {
  "id": 1324,
  "name": "余杭",
  "parent_id": 208,
  "k1": "y",
  "k2": "yh",
  "k3": "yuhang",
  "k4": "",
  "k5": "区",
  "k6": 330110,
  "k7": "0571"
}, {
  "id": 1325,
  "name": "桐庐",
  "parent_id": 208,
  "k1": "t",
  "k2": "tl",
  "k3": "tonglu",
  "k4": "",
  "k5": "县",
  "k6": 330122,
  "k7": "0571"
}, {
  "id": 1326,
  "name": "淳安",
  "parent_id": 208,
  "k1": "c",
  "k2": "ca",
  "k3": "chunan",
  "k4": "",
  "k5": "县",
  "k6": 330127,
  "k7": "0571"
}, {
  "id": 1327,
  "name": "建德",
  "parent_id": 208,
  "k1": "j",
  "k2": "jd",
  "k3": "jiande",
  "k4": "",
  "k5": "市",
  "k6": 330182,
  "k7": "0571"
}, {
  "id": 1328,
  "name": "富阳",
  "parent_id": 208,
  "k1": "f",
  "k2": "fy",
  "k3": "fuyang",
  "k4": "",
  "k5": "区",
  "k6": 330183,
  "k7": "0571"
}, {
  "id": 1329,
  "name": "临安",
  "parent_id": 208,
  "k1": "l",
  "k2": "la",
  "k3": "linan",
  "k4": "",
  "k5": "区",
  "k6": 330112,
  "k7": "0571"
}, {
  "id": 1330,
  "name": "海曙",
  "parent_id": 209,
  "k1": "h",
  "k2": "hs",
  "k3": "haishu",
  "k4": "",
  "k5": "区",
  "k6": 330203,
  "k7": "0574"
}, {
  "id": 1332,
  "name": "江北",
  "parent_id": 209,
  "k1": "j",
  "k2": "jb",
  "k3": "jiangbei",
  "k4": "",
  "k5": "区",
  "k6": 330205,
  "k7": "0574"
}, {
  "id": 1333,
  "name": "北仑",
  "parent_id": 209,
  "k1": "b",
  "k2": "bl",
  "k3": "beilun",
  "k4": "",
  "k5": "区",
  "k6": 330206,
  "k7": "0574"
}, {
  "id": 1334,
  "name": "镇海",
  "parent_id": 209,
  "k1": "z",
  "k2": "zh",
  "k3": "zhenhai",
  "k4": "",
  "k5": "区",
  "k6": 330211,
  "k7": "0574"
}, {
  "id": 1335,
  "name": "鄞州",
  "parent_id": 209,
  "k1": "y",
  "k2": "yz",
  "k3": "yinzhou",
  "k4": "",
  "k5": "区",
  "k6": 330212,
  "k7": "0574"
}, {
  "id": 1336,
  "name": "象山",
  "parent_id": 209,
  "k1": "x",
  "k2": "xs",
  "k3": "xiangshan",
  "k4": "",
  "k5": "县",
  "k6": 330225,
  "k7": "0574"
}, {
  "id": 1337,
  "name": "宁海",
  "parent_id": 209,
  "k1": "n",
  "k2": "nh",
  "k3": "ninghai",
  "k4": "",
  "k5": "县",
  "k6": 330226,
  "k7": "0574"
}, {
  "id": 1338,
  "name": "余姚",
  "parent_id": 209,
  "k1": "y",
  "k2": "yy",
  "k3": "yuyao",
  "k4": "",
  "k5": "市",
  "k6": 330281,
  "k7": "0574"
}, {
  "id": 1339,
  "name": "慈溪",
  "parent_id": 209,
  "k1": "c",
  "k2": "cx",
  "k3": "cixi",
  "k4": "",
  "k5": "市",
  "k6": 330282,
  "k7": "0574"
}, {
  "id": 1340,
  "name": "奉化",
  "parent_id": 209,
  "k1": "f",
  "k2": "fh",
  "k3": "fenghua",
  "k4": "",
  "k5": "区",
  "k6": 330213,
  "k7": "0574"
}, {
  "id": 1341,
  "name": "鹿城",
  "parent_id": 210,
  "k1": "l",
  "k2": "lc",
  "k3": "lucheng",
  "k4": "",
  "k5": "区",
  "k6": 330302,
  "k7": "0577"
}, {
  "id": 1342,
  "name": "龙湾",
  "parent_id": 210,
  "k1": "l",
  "k2": "lw",
  "k3": "longwan",
  "k4": "",
  "k5": "区",
  "k6": 330303,
  "k7": "0577"
}, {
  "id": 1343,
  "name": "瓯海",
  "parent_id": 210,
  "k1": "o",
  "k2": "oh",
  "k3": "ouhai",
  "k4": "",
  "k5": "区",
  "k6": 330304,
  "k7": "0577"
}, {
  "id": 1344,
  "name": "洞头",
  "parent_id": 210,
  "k1": "d",
  "k2": "dt",
  "k3": "dongtou",
  "k4": "",
  "k5": "区",
  "k6": 330322,
  "k7": "0577"
}, {
  "id": 1345,
  "name": "永嘉",
  "parent_id": 210,
  "k1": "y",
  "k2": "yj",
  "k3": "yongjia",
  "k4": "",
  "k5": "县",
  "k6": 330324,
  "k7": "0577"
}, {
  "id": 1346,
  "name": "平阳",
  "parent_id": 210,
  "k1": "p",
  "k2": "py",
  "k3": "pingyang",
  "k4": "",
  "k5": "县",
  "k6": 330326,
  "k7": "0577"
}, {
  "id": 1347,
  "name": "苍南",
  "parent_id": 210,
  "k1": "c",
  "k2": "cn",
  "k3": "cangnan",
  "k4": "",
  "k5": "县",
  "k6": 330327,
  "k7": "0577"
}, {
  "id": 1348,
  "name": "文成",
  "parent_id": 210,
  "k1": "w",
  "k2": "wc",
  "k3": "wencheng",
  "k4": "",
  "k5": "县",
  "k6": 330328,
  "k7": "0577"
}, {
  "id": 1349,
  "name": "泰顺",
  "parent_id": 210,
  "k1": "t",
  "k2": "ts",
  "k3": "taishun",
  "k4": "",
  "k5": "县",
  "k6": 330329,
  "k7": "0577"
}, {
  "id": 1350,
  "name": "瑞安",
  "parent_id": 210,
  "k1": "r",
  "k2": "ra",
  "k3": "ruian",
  "k4": "",
  "k5": "市",
  "k6": 330381,
  "k7": "0577"
}, {
  "id": 1351,
  "name": "乐清",
  "parent_id": 210,
  "k1": "l",
  "k2": "lq",
  "k3": "leqing",
  "k4": "",
  "k5": "市",
  "k6": 330382,
  "k7": "0577"
}, {
  "id": 1352,
  "name": "南湖",
  "parent_id": 211,
  "k1": "n",
  "k2": "nh",
  "k3": "nanhu",
  "k4": "",
  "k5": "区",
  "k6": 330402,
  "k7": "0573"
}, {
  "id": 1353,
  "name": "秀洲",
  "parent_id": 211,
  "k1": "x",
  "k2": "xz",
  "k3": "xiuzhou",
  "k4": "",
  "k5": "区",
  "k6": 330411,
  "k7": "0573"
}, {
  "id": 1354,
  "name": "嘉善",
  "parent_id": 211,
  "k1": "j",
  "k2": "js",
  "k3": "jiashan",
  "k4": "",
  "k5": "县",
  "k6": 330421,
  "k7": "0573"
}, {
  "id": 1355,
  "name": "海盐",
  "parent_id": 211,
  "k1": "h",
  "k2": "hy",
  "k3": "haiyan",
  "k4": "",
  "k5": "县",
  "k6": 330424,
  "k7": "0573"
}, {
  "id": 1356,
  "name": "海宁",
  "parent_id": 211,
  "k1": "h",
  "k2": "hn",
  "k3": "haining",
  "k4": "",
  "k5": "市",
  "k6": 330481,
  "k7": "0573"
}, {
  "id": 1357,
  "name": "平湖",
  "parent_id": 211,
  "k1": "p",
  "k2": "ph",
  "k3": "pinghu",
  "k4": "",
  "k5": "市",
  "k6": 330482,
  "k7": "0573"
}, {
  "id": 1358,
  "name": "桐乡",
  "parent_id": 211,
  "k1": "t",
  "k2": "tx",
  "k3": "tongxiang",
  "k4": "",
  "k5": "市",
  "k6": 330483,
  "k7": "0573"
}, {
  "id": 1359,
  "name": "吴兴",
  "parent_id": 212,
  "k1": "w",
  "k2": "wx",
  "k3": "wuxing",
  "k4": "",
  "k5": "区",
  "k6": 330502,
  "k7": "0572"
}, {
  "id": 1360,
  "name": "南浔",
  "parent_id": 212,
  "k1": "n",
  "k2": "nx",
  "k3": "nanxun",
  "k4": "",
  "k5": "区",
  "k6": 330503,
  "k7": "0572"
}, {
  "id": 1361,
  "name": "德清",
  "parent_id": 212,
  "k1": "d",
  "k2": "dq",
  "k3": "deqing",
  "k4": "",
  "k5": "县",
  "k6": 330521,
  "k7": "0572"
}, {
  "id": 1362,
  "name": "长兴",
  "parent_id": 212,
  "k1": "c",
  "k2": "cx",
  "k3": "changxing",
  "k4": "",
  "k5": "县",
  "k6": 330522,
  "k7": "0572"
}, {
  "id": 1363,
  "name": "安吉",
  "parent_id": 212,
  "k1": "a",
  "k2": "aj",
  "k3": "anji",
  "k4": "",
  "k5": "县",
  "k6": 330523,
  "k7": "0572"
}, {
  "id": 1364,
  "name": "越城",
  "parent_id": 213,
  "k1": "y",
  "k2": "yc",
  "k3": "yuecheng",
  "k4": "",
  "k5": "区",
  "k6": 330602,
  "k7": "0575"
}, {
  "id": 1365,
  "name": "柯桥",
  "parent_id": 213,
  "k1": "k",
  "k2": "kq",
  "k3": "keqiao",
  "k4": "",
  "k5": "区",
  "k6": 330603,
  "k7": "0575"
}, {
  "id": 1366,
  "name": "新昌",
  "parent_id": 213,
  "k1": "x",
  "k2": "xc",
  "k3": "xinchang",
  "k4": "",
  "k5": "县",
  "k6": 330624,
  "k7": "0575"
}, {
  "id": 1367,
  "name": "诸暨",
  "parent_id": 213,
  "k1": "z",
  "k2": "zj",
  "k3": "zhuji",
  "k4": "",
  "k5": "市",
  "k6": 330681,
  "k7": "0575"
}, {
  "id": 1368,
  "name": "上虞",
  "parent_id": 213,
  "k1": "s",
  "k2": "sy",
  "k3": "shangyu",
  "k4": "",
  "k5": "区",
  "k6": 330604,
  "k7": "0575"
}, {
  "id": 1369,
  "name": "嵊州",
  "parent_id": 213,
  "k1": "s",
  "k2": "sz",
  "k3": "shengzhou",
  "k4": "",
  "k5": "市",
  "k6": 330683,
  "k7": "0575"
}, {
  "id": 1370,
  "name": "婺城",
  "parent_id": 214,
  "k1": "w",
  "k2": "wc",
  "k3": "wucheng",
  "k4": "",
  "k5": "区",
  "k6": 330702,
  "k7": "0579"
}, {
  "id": 1371,
  "name": "金东",
  "parent_id": 214,
  "k1": "j",
  "k2": "jd",
  "k3": "jindong",
  "k4": "",
  "k5": "区",
  "k6": 330703,
  "k7": "0579"
}, {
  "id": 1372,
  "name": "武义",
  "parent_id": 214,
  "k1": "w",
  "k2": "wy",
  "k3": "wuyi",
  "k4": "",
  "k5": "县",
  "k6": 330723,
  "k7": "0579"
}, {
  "id": 1373,
  "name": "浦江",
  "parent_id": 214,
  "k1": "p",
  "k2": "pj",
  "k3": "pujiang",
  "k4": "",
  "k5": "县",
  "k6": 330726,
  "k7": "0579"
}, {
  "id": 1374,
  "name": "磐安",
  "parent_id": 214,
  "k1": "p",
  "k2": "pa",
  "k3": "panan",
  "k4": "",
  "k5": "县",
  "k6": 330727,
  "k7": "0579"
}, {
  "id": 1375,
  "name": "兰溪",
  "parent_id": 214,
  "k1": "l",
  "k2": "lx",
  "k3": "lanxi",
  "k4": "",
  "k5": "市",
  "k6": 330781,
  "k7": "0579"
}, {
  "id": 1376,
  "name": "义乌",
  "parent_id": 214,
  "k1": "y",
  "k2": "yw",
  "k3": "yiwu",
  "k4": "",
  "k5": "市",
  "k6": 330782,
  "k7": "0579"
}, {
  "id": 1377,
  "name": "东阳",
  "parent_id": 214,
  "k1": "d",
  "k2": "dy",
  "k3": "dongyang",
  "k4": "",
  "k5": "市",
  "k6": 330783,
  "k7": "0579"
}, {
  "id": 1378,
  "name": "永康",
  "parent_id": 214,
  "k1": "y",
  "k2": "yk",
  "k3": "yongkang",
  "k4": "",
  "k5": "市",
  "k6": 330784,
  "k7": "0579"
}, {
  "id": 1379,
  "name": "柯城",
  "parent_id": 215,
  "k1": "k",
  "k2": "kc",
  "k3": "kecheng",
  "k4": "",
  "k5": "区",
  "k6": 330802,
  "k7": "0570"
}, {
  "id": 1380,
  "name": "衢江",
  "parent_id": 215,
  "k1": "q",
  "k2": "qj",
  "k3": "qujiang",
  "k4": "",
  "k5": "区",
  "k6": 330803,
  "k7": "0570"
}, {
  "id": 1381,
  "name": "常山",
  "parent_id": 215,
  "k1": "c",
  "k2": "cs",
  "k3": "changshan",
  "k4": "",
  "k5": "县",
  "k6": 330822,
  "k7": "0570"
}, {
  "id": 1382,
  "name": "开化",
  "parent_id": 215,
  "k1": "k",
  "k2": "kh",
  "k3": "kaihua",
  "k4": "",
  "k5": "县",
  "k6": 330824,
  "k7": "0570"
}, {
  "id": 1383,
  "name": "龙游",
  "parent_id": 215,
  "k1": "l",
  "k2": "ly",
  "k3": "longyou",
  "k4": "",
  "k5": "县",
  "k6": 330825,
  "k7": "0570"
}, {
  "id": 1384,
  "name": "江山",
  "parent_id": 215,
  "k1": "j",
  "k2": "js",
  "k3": "jiangshan",
  "k4": "",
  "k5": "市",
  "k6": 330881,
  "k7": "0570"
}, {
  "id": 1385,
  "name": "定海",
  "parent_id": 216,
  "k1": "d",
  "k2": "dh",
  "k3": "dinghai",
  "k4": "",
  "k5": "区",
  "k6": 330902,
  "k7": "0580"
}, {
  "id": 1386,
  "name": "普陀",
  "parent_id": 216,
  "k1": "p",
  "k2": "pt",
  "k3": "putuo",
  "k4": "",
  "k5": "区",
  "k6": 330903,
  "k7": "0580"
}, {
  "id": 1387,
  "name": "岱山",
  "parent_id": 216,
  "k1": "d",
  "k2": "ds",
  "k3": "daishan",
  "k4": "",
  "k5": "县",
  "k6": 330921,
  "k7": "0580"
}, {
  "id": 1388,
  "name": "嵊泗",
  "parent_id": 216,
  "k1": "s",
  "k2": "ss",
  "k3": "shengsi",
  "k4": "",
  "k5": "县",
  "k6": 330922,
  "k7": "0580"
}, {
  "id": 1389,
  "name": "椒江",
  "parent_id": 217,
  "k1": "j",
  "k2": "jj",
  "k3": "jiaojiang",
  "k4": "",
  "k5": "区",
  "k6": 331002,
  "k7": "0576"
}, {
  "id": 1390,
  "name": "黄岩",
  "parent_id": 217,
  "k1": "h",
  "k2": "hy",
  "k3": "huangyan",
  "k4": "",
  "k5": "区",
  "k6": 331003,
  "k7": "0576"
}, {
  "id": 1391,
  "name": "路桥",
  "parent_id": 217,
  "k1": "l",
  "k2": "lq",
  "k3": "luqiao",
  "k4": "",
  "k5": "区",
  "k6": 331004,
  "k7": "0576"
}, {
  "id": 1392,
  "name": "玉环",
  "parent_id": 217,
  "k1": "y",
  "k2": "yh",
  "k3": "yuhuan",
  "k4": "",
  "k5": "市",
  "k6": 331083,
  "k7": "0576"
}, {
  "id": 1393,
  "name": "三门",
  "parent_id": 217,
  "k1": "s",
  "k2": "sm",
  "k3": "sanmen",
  "k4": "",
  "k5": "县",
  "k6": 331022,
  "k7": "0576"
}, {
  "id": 1394,
  "name": "天台",
  "parent_id": 217,
  "k1": "t",
  "k2": "tt",
  "k3": "tiantai",
  "k4": "",
  "k5": "县",
  "k6": 331023,
  "k7": "0576"
}, {
  "id": 1395,
  "name": "仙居",
  "parent_id": 217,
  "k1": "x",
  "k2": "xj",
  "k3": "xianju",
  "k4": "",
  "k5": "县",
  "k6": 331024,
  "k7": "0576"
}, {
  "id": 1396,
  "name": "温岭",
  "parent_id": 217,
  "k1": "w",
  "k2": "wl",
  "k3": "wenling",
  "k4": "",
  "k5": "市",
  "k6": 331081,
  "k7": "0576"
}, {
  "id": 1397,
  "name": "临海",
  "parent_id": 217,
  "k1": "l",
  "k2": "lh",
  "k3": "linhai",
  "k4": "",
  "k5": "市",
  "k6": 331082,
  "k7": "0576"
}, {
  "id": 1398,
  "name": "莲都",
  "parent_id": 218,
  "k1": "l",
  "k2": "ld",
  "k3": "liandu",
  "k4": "",
  "k5": "区",
  "k6": 331102,
  "k7": "0578"
}, {
  "id": 1399,
  "name": "青田",
  "parent_id": 218,
  "k1": "q",
  "k2": "qt",
  "k3": "qingtian",
  "k4": "",
  "k5": "县",
  "k6": 331121,
  "k7": "0578"
}, {
  "id": 1400,
  "name": "缙云",
  "parent_id": 218,
  "k1": "j",
  "k2": "jy",
  "k3": "jinyun",
  "k4": "",
  "k5": "县",
  "k6": 331122,
  "k7": "0578"
}, {
  "id": 1401,
  "name": "遂昌",
  "parent_id": 218,
  "k1": "s",
  "k2": "sc",
  "k3": "suichang",
  "k4": "",
  "k5": "县",
  "k6": 331123,
  "k7": "0578"
}, {
  "id": 1402,
  "name": "松阳",
  "parent_id": 218,
  "k1": "s",
  "k2": "sy",
  "k3": "songyang",
  "k4": "",
  "k5": "县",
  "k6": 331124,
  "k7": "0578"
}, {
  "id": 1403,
  "name": "云和",
  "parent_id": 218,
  "k1": "y",
  "k2": "yh",
  "k3": "yunhe",
  "k4": "",
  "k5": "县",
  "k6": 331125,
  "k7": "0578"
}, {
  "id": 1404,
  "name": "庆元",
  "parent_id": 218,
  "k1": "q",
  "k2": "qy",
  "k3": "qingyuan",
  "k4": "",
  "k5": "县",
  "k6": 331126,
  "k7": "0578"
}, {
  "id": 1405,
  "name": "景宁",
  "parent_id": 218,
  "k1": "j",
  "k2": "jn",
  "k3": "jingning",
  "k4": "畲族",
  "k5": "自治县",
  "k6": 331127,
  "k7": "0578"
}, {
  "id": 1406,
  "name": "龙泉",
  "parent_id": 218,
  "k1": "l",
  "k2": "lq",
  "k3": "longquan",
  "k4": "",
  "k5": "市",
  "k6": 331181,
  "k7": "0578"
}, {
  "id": 1407,
  "name": "瑶海",
  "parent_id": 219,
  "k1": "y",
  "k2": "yh",
  "k3": "yaohai",
  "k4": "",
  "k5": "区",
  "k6": 340102,
  "k7": "0551"
}, {
  "id": 1408,
  "name": "庐阳",
  "parent_id": 219,
  "k1": "l",
  "k2": "ly",
  "k3": "luyang",
  "k4": "",
  "k5": "区",
  "k6": 340103,
  "k7": "0551"
}, {
  "id": 1409,
  "name": "蜀山",
  "parent_id": 219,
  "k1": "s",
  "k2": "ss",
  "k3": "shushan",
  "k4": "",
  "k5": "区",
  "k6": 340104,
  "k7": "0551"
}, {
  "id": 1410,
  "name": "包河",
  "parent_id": 219,
  "k1": "b",
  "k2": "bh",
  "k3": "baohe",
  "k4": "",
  "k5": "区",
  "k6": 340111,
  "k7": "0551"
}, {
  "id": 1411,
  "name": "长丰",
  "parent_id": 219,
  "k1": "c",
  "k2": "cf",
  "k3": "changfeng",
  "k4": "",
  "k5": "县",
  "k6": 340121,
  "k7": "0551"
}, {
  "id": 1412,
  "name": "肥东",
  "parent_id": 219,
  "k1": "f",
  "k2": "fd",
  "k3": "feidong",
  "k4": "",
  "k5": "县",
  "k6": 340122,
  "k7": "0551"
}, {
  "id": 1413,
  "name": "肥西",
  "parent_id": 219,
  "k1": "f",
  "k2": "fx",
  "k3": "feixi",
  "k4": "",
  "k5": "县",
  "k6": 340123,
  "k7": "0551"
}, {
  "id": 1414,
  "name": "庐江",
  "parent_id": 219,
  "k1": "l",
  "k2": "lj",
  "k3": "lujiang",
  "k4": "",
  "k5": "县",
  "k6": 340124,
  "k7": "0551"
}, {
  "id": 1415,
  "name": "巢湖",
  "parent_id": 219,
  "k1": "c",
  "k2": "ch",
  "k3": "chaohu",
  "k4": "",
  "k5": "市",
  "k6": 340181,
  "k7": "0551"
}, {
  "id": 1416,
  "name": "镜湖",
  "parent_id": 220,
  "k1": "j",
  "k2": "jh",
  "k3": "jinghu",
  "k4": "",
  "k5": "区",
  "k6": 340202,
  "k7": "0553"
}, {
  "id": 1417,
  "name": "弋江",
  "parent_id": 220,
  "k1": "y",
  "k2": "yj",
  "k3": "yijiang",
  "k4": "",
  "k5": "区",
  "k6": 340203,
  "k7": "0553"
}, {
  "id": 1418,
  "name": "鸠江",
  "parent_id": 220,
  "k1": "j",
  "k2": "jj",
  "k3": "jiujiang",
  "k4": "",
  "k5": "区",
  "k6": 340207,
  "k7": "0553"
}, {
  "id": 1419,
  "name": "三山",
  "parent_id": 220,
  "k1": "s",
  "k2": "ss",
  "k3": "sanshan",
  "k4": "",
  "k5": "区",
  "k6": 340208,
  "k7": "0553"
}, {
  "id": 1420,
  "name": "芜湖",
  "parent_id": 220,
  "k1": "w",
  "k2": "wh",
  "k3": "wuhu",
  "k4": "",
  "k5": "县",
  "k6": 340221,
  "k7": "0553"
}, {
  "id": 1421,
  "name": "繁昌",
  "parent_id": 220,
  "k1": "f",
  "k2": "fc",
  "k3": "fanchang",
  "k4": "",
  "k5": "县",
  "k6": 340222,
  "k7": "0553"
}, {
  "id": 1422,
  "name": "南陵",
  "parent_id": 220,
  "k1": "n",
  "k2": "nl",
  "k3": "nanling",
  "k4": "",
  "k5": "县",
  "k6": 340223,
  "k7": "0553"
}, {
  "id": 1423,
  "name": "无为",
  "parent_id": 220,
  "k1": "w",
  "k2": "ww",
  "k3": "wuwei",
  "k4": "",
  "k5": "县",
  "k6": 340225,
  "k7": "0553"
}, {
  "id": 1424,
  "name": "龙子湖",
  "parent_id": 221,
  "k1": "l",
  "k2": "lzh",
  "k3": "longzihu",
  "k4": "",
  "k5": "区",
  "k6": 340302,
  "k7": "0552"
}, {
  "id": 1425,
  "name": "蚌山",
  "parent_id": 221,
  "k1": "b",
  "k2": "bs",
  "k3": "bangshan",
  "k4": "",
  "k5": "区",
  "k6": 340303,
  "k7": "0552"
}, {
  "id": 1426,
  "name": "禹会",
  "parent_id": 221,
  "k1": "y",
  "k2": "yh",
  "k3": "yuhui",
  "k4": "",
  "k5": "区",
  "k6": 340304,
  "k7": "0552"
}, {
  "id": 1427,
  "name": "淮上",
  "parent_id": 221,
  "k1": "h",
  "k2": "hs",
  "k3": "huaishang",
  "k4": "",
  "k5": "区",
  "k6": 340311,
  "k7": "0552"
}, {
  "id": 1428,
  "name": "怀远",
  "parent_id": 221,
  "k1": "h",
  "k2": "hy",
  "k3": "huaiyuan",
  "k4": "",
  "k5": "县",
  "k6": 340321,
  "k7": "0552"
}, {
  "id": 1429,
  "name": "五河",
  "parent_id": 221,
  "k1": "w",
  "k2": "wh",
  "k3": "wuhe",
  "k4": "",
  "k5": "县",
  "k6": 340322,
  "k7": "0552"
}, {
  "id": 1430,
  "name": "固镇",
  "parent_id": 221,
  "k1": "g",
  "k2": "gz",
  "k3": "guzhen",
  "k4": "",
  "k5": "县",
  "k6": 340323,
  "k7": "0552"
}, {
  "id": 1431,
  "name": "大通",
  "parent_id": 222,
  "k1": "d",
  "k2": "dt",
  "k3": "datong",
  "k4": "",
  "k5": "区",
  "k6": 340402,
  "k7": "0554"
}, {
  "id": 1432,
  "name": "田家庵",
  "parent_id": 222,
  "k1": "t",
  "k2": "tja",
  "k3": "tianjiaan",
  "k4": "",
  "k5": "区",
  "k6": 340403,
  "k7": "0554"
}, {
  "id": 1433,
  "name": "谢家集",
  "parent_id": 222,
  "k1": "x",
  "k2": "xjj",
  "k3": "xiejiaji",
  "k4": "",
  "k5": "区",
  "k6": 340404,
  "k7": "0554"
}, {
  "id": 1434,
  "name": "八公山",
  "parent_id": 222,
  "k1": "b",
  "k2": "bgs",
  "k3": "bagongshan",
  "k4": "",
  "k5": "区",
  "k6": 340405,
  "k7": "0554"
}, {
  "id": 1435,
  "name": "潘集",
  "parent_id": 222,
  "k1": "p",
  "k2": "pj",
  "k3": "panji",
  "k4": "",
  "k5": "区",
  "k6": 340406,
  "k7": "0554"
}, {
  "id": 1436,
  "name": "凤台",
  "parent_id": 222,
  "k1": "f",
  "k2": "ft",
  "k3": "fengtai",
  "k4": "",
  "k5": "县",
  "k6": 340421,
  "k7": "0554"
}, {
  "id": 1437,
  "name": "花山",
  "parent_id": 223,
  "k1": "h",
  "k2": "hs",
  "k3": "huashan",
  "k4": "",
  "k5": "区",
  "k6": 340503,
  "k7": "0555"
}, {
  "id": 1438,
  "name": "雨山",
  "parent_id": 223,
  "k1": "y",
  "k2": "ys",
  "k3": "yushan",
  "k4": "",
  "k5": "区",
  "k6": 340504,
  "k7": "0555"
}, {
  "id": 1439,
  "name": "博望",
  "parent_id": 223,
  "k1": "b",
  "k2": "bw",
  "k3": "bowang",
  "k4": "",
  "k5": "区",
  "k6": 340506,
  "k7": "0555"
}, {
  "id": 1440,
  "name": "当涂",
  "parent_id": 223,
  "k1": "d",
  "k2": "dt",
  "k3": "dangtu",
  "k4": "",
  "k5": "县",
  "k6": 340521,
  "k7": "0555"
}, {
  "id": 1441,
  "name": "含山",
  "parent_id": 223,
  "k1": "h",
  "k2": "hs",
  "k3": "hanshan",
  "k4": "",
  "k5": "县",
  "k6": 340522,
  "k7": "0555"
}, {
  "id": 1442,
  "name": "和县",
  "parent_id": 223,
  "k1": "h",
  "k2": "hx",
  "k3": "hexian",
  "k4": "",
  "k5": "",
  "k6": 340523,
  "k7": "0555"
}, {
  "id": 1443,
  "name": "杜集",
  "parent_id": 224,
  "k1": "d",
  "k2": "dj",
  "k3": "duji",
  "k4": "",
  "k5": "区",
  "k6": 340602,
  "k7": "0561"
}, {
  "id": 1444,
  "name": "相山",
  "parent_id": 224,
  "k1": "x",
  "k2": "xs",
  "k3": "xiangshan",
  "k4": "",
  "k5": "区",
  "k6": 340603,
  "k7": "0561"
}, {
  "id": 1445,
  "name": "烈山",
  "parent_id": 224,
  "k1": "l",
  "k2": "ls",
  "k3": "lieshan",
  "k4": "",
  "k5": "区",
  "k6": 340604,
  "k7": "0561"
}, {
  "id": 1446,
  "name": "濉溪",
  "parent_id": 224,
  "k1": "s",
  "k2": "sx",
  "k3": "suixi",
  "k4": "",
  "k5": "县",
  "k6": 340621,
  "k7": "0561"
}, {
  "id": 1447,
  "name": "铜官山",
  "parent_id": 225,
  "k1": "t",
  "k2": "tgs",
  "k3": "tongguanshan",
  "k4": "",
  "k5": "区",
  "k6": 340702,
  "k7": "0562"
}, {
  "id": 1449,
  "name": "郊区",
  "parent_id": 225,
  "k1": "j",
  "k2": "jq",
  "k3": "jiaoqu",
  "k4": "",
  "k5": "",
  "k6": 340711,
  "k7": "0562"
}, {
  "id": 1450,
  "name": "义安",
  "parent_id": 225,
  "k1": "y",
  "k2": "ya",
  "k3": "yian",
  "k4": "",
  "k5": "区",
  "k6": 340721,
  "k7": "0562"
}, {
  "id": 1451,
  "name": "迎江",
  "parent_id": 226,
  "k1": "y",
  "k2": "yj",
  "k3": "yingjiang",
  "k4": "",
  "k5": "区",
  "k6": 340802,
  "k7": "0556"
}, {
  "id": 1452,
  "name": "大观",
  "parent_id": 226,
  "k1": "d",
  "k2": "dg",
  "k3": "daguan",
  "k4": "",
  "k5": "区",
  "k6": 340803,
  "k7": "0556"
}, {
  "id": 1453,
  "name": "宜秀",
  "parent_id": 226,
  "k1": "y",
  "k2": "yx",
  "k3": "yixiu",
  "k4": "",
  "k5": "区",
  "k6": 340811,
  "k7": "0556"
}, {
  "id": 1454,
  "name": "怀宁",
  "parent_id": 226,
  "k1": "h",
  "k2": "hn",
  "k3": "huaining",
  "k4": "",
  "k5": "县",
  "k6": 340822,
  "k7": "0556"
}, {
  "id": 1455,
  "name": "枞阳",
  "parent_id": 225,
  "k1": "z",
  "k2": "zy",
  "k3": "zongyang",
  "k4": "",
  "k5": "县",
  "k6": 340823,
  "k7": "0556"
}, {
  "id": 1456,
  "name": "潜山",
  "parent_id": 226,
  "k1": "q",
  "k2": "qs",
  "k3": "qianshan",
  "k4": "",
  "k5": "市",
  "k6": 340824,
  "k7": "0556"
}, {
  "id": 1457,
  "name": "太湖",
  "parent_id": 226,
  "k1": "t",
  "k2": "th",
  "k3": "taihu",
  "k4": "",
  "k5": "县",
  "k6": 340825,
  "k7": "0556"
}, {
  "id": 1458,
  "name": "宿松",
  "parent_id": 226,
  "k1": "s",
  "k2": "ss",
  "k3": "susong",
  "k4": "",
  "k5": "县",
  "k6": 340826,
  "k7": "0556"
}, {
  "id": 1459,
  "name": "望江",
  "parent_id": 226,
  "k1": "w",
  "k2": "wj",
  "k3": "wangjiang",
  "k4": "",
  "k5": "县",
  "k6": 340827,
  "k7": "0556"
}, {
  "id": 1460,
  "name": "岳西",
  "parent_id": 226,
  "k1": "y",
  "k2": "yx",
  "k3": "yuexi",
  "k4": "",
  "k5": "县",
  "k6": 340828,
  "k7": "0556"
}, {
  "id": 1461,
  "name": "桐城",
  "parent_id": 226,
  "k1": "t",
  "k2": "tc",
  "k3": "tongcheng",
  "k4": "",
  "k5": "市",
  "k6": 340881,
  "k7": "0556"
}, {
  "id": 1462,
  "name": "屯溪",
  "parent_id": 227,
  "k1": "t",
  "k2": "tx",
  "k3": "tunxi",
  "k4": "",
  "k5": "区",
  "k6": 341002,
  "k7": "0559"
}, {
  "id": 1463,
  "name": "黄山",
  "parent_id": 227,
  "k1": "h",
  "k2": "hs",
  "k3": "huangshan",
  "k4": "",
  "k5": "区",
  "k6": 341003,
  "k7": "0559"
}, {
  "id": 1464,
  "name": "徽州",
  "parent_id": 227,
  "k1": "h",
  "k2": "hz",
  "k3": "huizhou",
  "k4": "",
  "k5": "区",
  "k6": 341004,
  "k7": "0559"
}, {
  "id": 1465,
  "name": "歙县",
  "parent_id": 227,
  "k1": "s",
  "k2": "sx",
  "k3": "shexian",
  "k4": "",
  "k5": "",
  "k6": 341021,
  "k7": "0559"
}, {
  "id": 1466,
  "name": "休宁",
  "parent_id": 227,
  "k1": "x",
  "k2": "xn",
  "k3": "xiuning",
  "k4": "",
  "k5": "县",
  "k6": 341022,
  "k7": "0559"
}, {
  "id": 1467,
  "name": "黟县",
  "parent_id": 227,
  "k1": "y",
  "k2": "yx",
  "k3": "yixian",
  "k4": "",
  "k5": "",
  "k6": 341023,
  "k7": "0559"
}, {
  "id": 1468,
  "name": "祁门",
  "parent_id": 227,
  "k1": "q",
  "k2": "qm",
  "k3": "qimen",
  "k4": "",
  "k5": "县",
  "k6": 341024,
  "k7": "0559"
}, {
  "id": 1469,
  "name": "琅玡",
  "parent_id": 228,
  "k1": "l",
  "k2": "ly",
  "k3": "langya",
  "k4": "",
  "k5": "区",
  "k6": 341102,
  "k7": "0550"
}, {
  "id": 1470,
  "name": "南谯",
  "parent_id": 228,
  "k1": "n",
  "k2": "nq",
  "k3": "nanqiao",
  "k4": "",
  "k5": "区",
  "k6": 341103,
  "k7": "0550"
}, {
  "id": 1471,
  "name": "来安",
  "parent_id": 228,
  "k1": "l",
  "k2": "la",
  "k3": "laian",
  "k4": "",
  "k5": "县",
  "k6": 341122,
  "k7": "0550"
}, {
  "id": 1472,
  "name": "全椒",
  "parent_id": 228,
  "k1": "q",
  "k2": "qj",
  "k3": "quanjiao",
  "k4": "",
  "k5": "县",
  "k6": 341124,
  "k7": "0550"
}, {
  "id": 1473,
  "name": "定远",
  "parent_id": 228,
  "k1": "d",
  "k2": "dy",
  "k3": "dingyuan",
  "k4": "",
  "k5": "县",
  "k6": 341125,
  "k7": "0550"
}, {
  "id": 1474,
  "name": "凤阳",
  "parent_id": 228,
  "k1": "f",
  "k2": "fy",
  "k3": "fengyang",
  "k4": "",
  "k5": "县",
  "k6": 341126,
  "k7": "0550"
}, {
  "id": 1475,
  "name": "天长",
  "parent_id": 228,
  "k1": "t",
  "k2": "tc",
  "k3": "tianchang",
  "k4": "",
  "k5": "市",
  "k6": 341181,
  "k7": "0550"
}, {
  "id": 1476,
  "name": "明光",
  "parent_id": 228,
  "k1": "m",
  "k2": "mg",
  "k3": "mingguang",
  "k4": "",
  "k5": "市",
  "k6": 341182,
  "k7": "0550"
}, {
  "id": 1477,
  "name": "颍州",
  "parent_id": 229,
  "k1": "y",
  "k2": "yz",
  "k3": "yingzhou",
  "k4": "",
  "k5": "区",
  "k6": 341202,
  "k7": "0558"
}, {
  "id": 1478,
  "name": "颍东",
  "parent_id": 229,
  "k1": "y",
  "k2": "yd",
  "k3": "yingdong",
  "k4": "",
  "k5": "区",
  "k6": 341203,
  "k7": "0558"
}, {
  "id": 1479,
  "name": "颍泉",
  "parent_id": 229,
  "k1": "y",
  "k2": "yq",
  "k3": "yingquan",
  "k4": "",
  "k5": "区",
  "k6": 341204,
  "k7": "0558"
}, {
  "id": 1480,
  "name": "临泉",
  "parent_id": 229,
  "k1": "l",
  "k2": "lq",
  "k3": "linquan",
  "k4": "",
  "k5": "县",
  "k6": 341221,
  "k7": "0558"
}, {
  "id": 1481,
  "name": "太和",
  "parent_id": 229,
  "k1": "t",
  "k2": "th",
  "k3": "taihe",
  "k4": "",
  "k5": "县",
  "k6": 341222,
  "k7": "0558"
}, {
  "id": 1482,
  "name": "阜南",
  "parent_id": 229,
  "k1": "f",
  "k2": "fn",
  "k3": "funan",
  "k4": "",
  "k5": "县",
  "k6": 341225,
  "k7": "0558"
}, {
  "id": 1483,
  "name": "颖上",
  "parent_id": 229,
  "k1": "y",
  "k2": "ys",
  "k3": "yingshang",
  "k4": "",
  "k5": "县",
  "k6": 341226,
  "k7": "0558"
}, {
  "id": 1484,
  "name": "界首",
  "parent_id": 229,
  "k1": "j",
  "k2": "js",
  "k3": "jieshou",
  "k4": "",
  "k5": "市",
  "k6": 341282,
  "k7": "0558"
}, {
  "id": 1485,
  "name": "埇桥",
  "parent_id": 230,
  "k1": "y",
  "k2": "yq",
  "k3": "yongqiao",
  "k4": "",
  "k5": "区",
  "k6": 341302,
  "k7": "0557"
}, {
  "id": 1486,
  "name": "砀山",
  "parent_id": 230,
  "k1": "d",
  "k2": "ds",
  "k3": "dangshan",
  "k4": "",
  "k5": "县",
  "k6": 341321,
  "k7": "0557"
}, {
  "id": 1487,
  "name": "萧县",
  "parent_id": 230,
  "k1": "x",
  "k2": "xx",
  "k3": "xiaoxian",
  "k4": "",
  "k5": "",
  "k6": 341322,
  "k7": "0557"
}, {
  "id": 1488,
  "name": "灵璧",
  "parent_id": 230,
  "k1": "l",
  "k2": "lb",
  "k3": "lingbi",
  "k4": "",
  "k5": "县",
  "k6": 341323,
  "k7": "0557"
}, {
  "id": 1489,
  "name": "泗县",
  "parent_id": 230,
  "k1": "s",
  "k2": "sx",
  "k3": "sixian",
  "k4": "",
  "k5": "",
  "k6": 341324,
  "k7": "0557"
}, {
  "id": 1490,
  "name": "金安",
  "parent_id": 231,
  "k1": "j",
  "k2": "ja",
  "k3": "jinan",
  "k4": "",
  "k5": "区",
  "k6": 341502,
  "k7": "0564"
}, {
  "id": 1491,
  "name": "裕安",
  "parent_id": 231,
  "k1": "y",
  "k2": "ya",
  "k3": "yuan",
  "k4": "",
  "k5": "区",
  "k6": 341503,
  "k7": "0564"
}, {
  "id": 1492,
  "name": "寿县",
  "parent_id": 222,
  "k1": "s",
  "k2": "sx",
  "k3": "shouxian",
  "k4": "",
  "k5": "",
  "k6": 341521,
  "k7": "0564"
}, {
  "id": 1493,
  "name": "霍邱",
  "parent_id": 231,
  "k1": "h",
  "k2": "hq",
  "k3": "huoqiu",
  "k4": "",
  "k5": "县",
  "k6": 341522,
  "k7": "0564"
}, {
  "id": 1494,
  "name": "舒城",
  "parent_id": 231,
  "k1": "s",
  "k2": "sc",
  "k3": "shucheng",
  "k4": "",
  "k5": "县",
  "k6": 341523,
  "k7": "0564"
}, {
  "id": 1495,
  "name": "金寨",
  "parent_id": 231,
  "k1": "j",
  "k2": "jz",
  "k3": "jinzhai",
  "k4": "",
  "k5": "县",
  "k6": 341524,
  "k7": "0564"
}, {
  "id": 1496,
  "name": "霍山",
  "parent_id": 231,
  "k1": "h",
  "k2": "hs",
  "k3": "huoshan",
  "k4": "",
  "k5": "县",
  "k6": 341525,
  "k7": "0564"
}, {
  "id": 1497,
  "name": "谯城",
  "parent_id": 232,
  "k1": "q",
  "k2": "qc",
  "k3": "qiaocheng",
  "k4": "",
  "k5": "区",
  "k6": 341602,
  "k7": "0558"
}, {
  "id": 1498,
  "name": "涡阳",
  "parent_id": 232,
  "k1": "w",
  "k2": "wy",
  "k3": "woyang",
  "k4": "",
  "k5": "县",
  "k6": 341621,
  "k7": "0558"
}, {
  "id": 1499,
  "name": "蒙城",
  "parent_id": 232,
  "k1": "m",
  "k2": "mc",
  "k3": "mengcheng",
  "k4": "",
  "k5": "县",
  "k6": 341622,
  "k7": "0558"
}, {
  "id": 1500,
  "name": "利辛",
  "parent_id": 232,
  "k1": "l",
  "k2": "lx",
  "k3": "lixin",
  "k4": "",
  "k5": "县",
  "k6": 341623,
  "k7": "0558"
}, {
  "id": 1501,
  "name": "贵池",
  "parent_id": 233,
  "k1": "g",
  "k2": "gc",
  "k3": "guichi",
  "k4": "",
  "k5": "区",
  "k6": 341702,
  "k7": "0566"
}, {
  "id": 1502,
  "name": "东至",
  "parent_id": 233,
  "k1": "d",
  "k2": "dz",
  "k3": "dongzhi",
  "k4": "",
  "k5": "县",
  "k6": 341721,
  "k7": "0566"
}, {
  "id": 1503,
  "name": "石台",
  "parent_id": 233,
  "k1": "s",
  "k2": "st",
  "k3": "shitai",
  "k4": "",
  "k5": "县",
  "k6": 341722,
  "k7": "0566"
}, {
  "id": 1504,
  "name": "青阳",
  "parent_id": 233,
  "k1": "q",
  "k2": "qy",
  "k3": "qingyang",
  "k4": "",
  "k5": "县",
  "k6": 341723,
  "k7": "0566"
}, {
  "id": 1505,
  "name": "宣州",
  "parent_id": 234,
  "k1": "x",
  "k2": "xz",
  "k3": "xuanzhou",
  "k4": "",
  "k5": "区",
  "k6": 341802,
  "k7": "0563"
}, {
  "id": 1506,
  "name": "郎溪",
  "parent_id": 234,
  "k1": "l",
  "k2": "lx",
  "k3": "langxi",
  "k4": "",
  "k5": "县",
  "k6": 341821,
  "k7": "0563"
}, {
  "id": 1507,
  "name": "广德",
  "parent_id": 234,
  "k1": "g",
  "k2": "gd",
  "k3": "guangde",
  "k4": "",
  "k5": "市",
  "k6": 341822,
  "k7": "0563"
}, {
  "id": 1508,
  "name": "泾县",
  "parent_id": 234,
  "k1": "j",
  "k2": "jx",
  "k3": "jingxian",
  "k4": "",
  "k5": "",
  "k6": 341823,
  "k7": "0563"
}, {
  "id": 1509,
  "name": "绩溪",
  "parent_id": 234,
  "k1": "j",
  "k2": "jx",
  "k3": "jixi",
  "k4": "",
  "k5": "县",
  "k6": 341824,
  "k7": "0563"
}, {
  "id": 1510,
  "name": "旌德",
  "parent_id": 234,
  "k1": "j",
  "k2": "jd",
  "k3": "jingde",
  "k4": "",
  "k5": "县",
  "k6": 341825,
  "k7": "0563"
}, {
  "id": 1511,
  "name": "宁国",
  "parent_id": 234,
  "k1": "n",
  "k2": "ng",
  "k3": "ningguo",
  "k4": "",
  "k5": "市",
  "k6": 341881,
  "k7": "0563"
}, {
  "id": 1512,
  "name": "鼓楼",
  "parent_id": 235,
  "k1": "g",
  "k2": "gl",
  "k3": "gulou",
  "k4": "",
  "k5": "区",
  "k6": 350102,
  "k7": "0591"
}, {
  "id": 1513,
  "name": "台江",
  "parent_id": 235,
  "k1": "t",
  "k2": "tj",
  "k3": "taijiang",
  "k4": "",
  "k5": "区",
  "k6": 350103,
  "k7": "0591"
}, {
  "id": 1514,
  "name": "仓山",
  "parent_id": 235,
  "k1": "c",
  "k2": "cs",
  "k3": "cangshan",
  "k4": "",
  "k5": "区",
  "k6": 350104,
  "k7": "0591"
}, {
  "id": 1515,
  "name": "马尾",
  "parent_id": 235,
  "k1": "m",
  "k2": "mw",
  "k3": "mawei",
  "k4": "",
  "k5": "区",
  "k6": 350105,
  "k7": "0591"
}, {
  "id": 1516,
  "name": "晋安",
  "parent_id": 235,
  "k1": "j",
  "k2": "ja",
  "k3": "jinan",
  "k4": "",
  "k5": "区",
  "k6": 350111,
  "k7": "0591"
}, {
  "id": 1517,
  "name": "闽侯",
  "parent_id": 235,
  "k1": "m",
  "k2": "mh",
  "k3": "minhou",
  "k4": "",
  "k5": "县",
  "k6": 350121,
  "k7": "0591"
}, {
  "id": 1518,
  "name": "连江",
  "parent_id": 235,
  "k1": "l",
  "k2": "lj",
  "k3": "lianjiang",
  "k4": "",
  "k5": "县",
  "k6": 350122,
  "k7": "0591"
}, {
  "id": 1519,
  "name": "罗源",
  "parent_id": 235,
  "k1": "l",
  "k2": "ly",
  "k3": "luoyuan",
  "k4": "",
  "k5": "县",
  "k6": 350123,
  "k7": "0591"
}, {
  "id": 1520,
  "name": "闽清",
  "parent_id": 235,
  "k1": "m",
  "k2": "mq",
  "k3": "minqing",
  "k4": "",
  "k5": "县",
  "k6": 350124,
  "k7": "0591"
}, {
  "id": 1521,
  "name": "永泰",
  "parent_id": 235,
  "k1": "y",
  "k2": "yt",
  "k3": "yongtai",
  "k4": "",
  "k5": "县",
  "k6": 350125,
  "k7": "0591"
}, {
  "id": 1522,
  "name": "平潭",
  "parent_id": 235,
  "k1": "p",
  "k2": "pt",
  "k3": "pingtan",
  "k4": "",
  "k5": "县",
  "k6": 350128,
  "k7": "0591"
}, {
  "id": 1523,
  "name": "福清",
  "parent_id": 235,
  "k1": "f",
  "k2": "fq",
  "k3": "fuqing",
  "k4": "",
  "k5": "市",
  "k6": 350181,
  "k7": "0591"
}, {
  "id": 1524,
  "name": "长乐",
  "parent_id": 235,
  "k1": "c",
  "k2": "cl",
  "k3": "changle",
  "k4": "",
  "k5": "区",
  "k6": 350112,
  "k7": "0591"
}, {
  "id": 1525,
  "name": "思明",
  "parent_id": 236,
  "k1": "s",
  "k2": "sm",
  "k3": "siming",
  "k4": "",
  "k5": "区",
  "k6": 350203,
  "k7": "0592"
}, {
  "id": 1526,
  "name": "海沧",
  "parent_id": 236,
  "k1": "h",
  "k2": "hc",
  "k3": "haicang",
  "k4": "",
  "k5": "区",
  "k6": 350205,
  "k7": "0592"
}, {
  "id": 1527,
  "name": "湖里",
  "parent_id": 236,
  "k1": "h",
  "k2": "hl",
  "k3": "huli",
  "k4": "",
  "k5": "区",
  "k6": 350206,
  "k7": "0592"
}, {
  "id": 1528,
  "name": "集美",
  "parent_id": 236,
  "k1": "j",
  "k2": "jm",
  "k3": "jimei",
  "k4": "",
  "k5": "区",
  "k6": 350211,
  "k7": "0592"
}, {
  "id": 1529,
  "name": "同安",
  "parent_id": 236,
  "k1": "t",
  "k2": "ta",
  "k3": "tongan",
  "k4": "",
  "k5": "区",
  "k6": 350212,
  "k7": "0592"
}, {
  "id": 1530,
  "name": "翔安",
  "parent_id": 236,
  "k1": "x",
  "k2": "xa",
  "k3": "xiangan",
  "k4": "",
  "k5": "区",
  "k6": 350213,
  "k7": "0592"
}, {
  "id": 1531,
  "name": "城厢",
  "parent_id": 237,
  "k1": "c",
  "k2": "cx",
  "k3": "chengxiang",
  "k4": "",
  "k5": "区",
  "k6": 350302,
  "k7": "0594"
}, {
  "id": 1532,
  "name": "涵江",
  "parent_id": 237,
  "k1": "h",
  "k2": "hj",
  "k3": "hanjiang",
  "k4": "",
  "k5": "区",
  "k6": 350303,
  "k7": "0594"
}, {
  "id": 1533,
  "name": "荔城",
  "parent_id": 237,
  "k1": "l",
  "k2": "lc",
  "k3": "licheng",
  "k4": "",
  "k5": "区",
  "k6": 350304,
  "k7": "0594"
}, {
  "id": 1534,
  "name": "秀屿",
  "parent_id": 237,
  "k1": "x",
  "k2": "xy",
  "k3": "xiuyu",
  "k4": "",
  "k5": "区",
  "k6": 350305,
  "k7": "0594"
}, {
  "id": 1535,
  "name": "仙游",
  "parent_id": 237,
  "k1": "x",
  "k2": "xy",
  "k3": "xianyou",
  "k4": "",
  "k5": "县",
  "k6": 350322,
  "k7": "0594"
}, {
  "id": 1536,
  "name": "梅列",
  "parent_id": 238,
  "k1": "m",
  "k2": "ml",
  "k3": "meilie",
  "k4": "",
  "k5": "区",
  "k6": 350402,
  "k7": "0598"
}, {
  "id": 1537,
  "name": "三元",
  "parent_id": 238,
  "k1": "s",
  "k2": "sy",
  "k3": "sanyuan",
  "k4": "",
  "k5": "区",
  "k6": 350403,
  "k7": "0598"
}, {
  "id": 1538,
  "name": "明溪",
  "parent_id": 238,
  "k1": "m",
  "k2": "mx",
  "k3": "mingxi",
  "k4": "",
  "k5": "县",
  "k6": 350421,
  "k7": "0598"
}, {
  "id": 1539,
  "name": "清流",
  "parent_id": 238,
  "k1": "q",
  "k2": "ql",
  "k3": "qingliu",
  "k4": "",
  "k5": "县",
  "k6": 350423,
  "k7": "0598"
}, {
  "id": 1540,
  "name": "宁化",
  "parent_id": 238,
  "k1": "n",
  "k2": "nh",
  "k3": "ninghua",
  "k4": "",
  "k5": "县",
  "k6": 350424,
  "k7": "0598"
}, {
  "id": 1541,
  "name": "大田",
  "parent_id": 238,
  "k1": "d",
  "k2": "dt",
  "k3": "datian",
  "k4": "",
  "k5": "县",
  "k6": 350425,
  "k7": "0598"
}, {
  "id": 1542,
  "name": "尤溪",
  "parent_id": 238,
  "k1": "y",
  "k2": "yx",
  "k3": "youxi",
  "k4": "",
  "k5": "县",
  "k6": 350426,
  "k7": "0598"
}, {
  "id": 1543,
  "name": "沙县",
  "parent_id": 238,
  "k1": "s",
  "k2": "sx",
  "k3": "shaxian",
  "k4": "",
  "k5": "",
  "k6": 350427,
  "k7": "0598"
}, {
  "id": 1544,
  "name": "将乐",
  "parent_id": 238,
  "k1": "j",
  "k2": "jl",
  "k3": "jiangle",
  "k4": "",
  "k5": "县",
  "k6": 350428,
  "k7": "0598"
}, {
  "id": 1545,
  "name": "泰宁",
  "parent_id": 238,
  "k1": "t",
  "k2": "tn",
  "k3": "taining",
  "k4": "",
  "k5": "县",
  "k6": 350429,
  "k7": "0598"
}, {
  "id": 1546,
  "name": "建宁",
  "parent_id": 238,
  "k1": "j",
  "k2": "jn",
  "k3": "jianning",
  "k4": "",
  "k5": "县",
  "k6": 350430,
  "k7": "0598"
}, {
  "id": 1547,
  "name": "永安",
  "parent_id": 238,
  "k1": "y",
  "k2": "ya",
  "k3": "yongan",
  "k4": "",
  "k5": "市",
  "k6": 350481,
  "k7": "0598"
}, {
  "id": 1548,
  "name": "鲤城",
  "parent_id": 239,
  "k1": "l",
  "k2": "lc",
  "k3": "licheng",
  "k4": "",
  "k5": "区",
  "k6": 350502,
  "k7": "0595"
}, {
  "id": 1549,
  "name": "丰泽",
  "parent_id": 239,
  "k1": "f",
  "k2": "fz",
  "k3": "fengze",
  "k4": "",
  "k5": "区",
  "k6": 350503,
  "k7": "0595"
}, {
  "id": 1550,
  "name": "洛江",
  "parent_id": 239,
  "k1": "l",
  "k2": "lj",
  "k3": "luojiang",
  "k4": "",
  "k5": "区",
  "k6": 350504,
  "k7": "0595"
}, {
  "id": 1551,
  "name": "泉港",
  "parent_id": 239,
  "k1": "q",
  "k2": "qg",
  "k3": "quangang",
  "k4": "",
  "k5": "区",
  "k6": 350505,
  "k7": "0595"
}, {
  "id": 1552,
  "name": "惠安",
  "parent_id": 239,
  "k1": "h",
  "k2": "ha",
  "k3": "huian",
  "k4": "",
  "k5": "县",
  "k6": 350521,
  "k7": "0595"
}, {
  "id": 1553,
  "name": "安溪",
  "parent_id": 239,
  "k1": "a",
  "k2": "ax",
  "k3": "anxi",
  "k4": "",
  "k5": "县",
  "k6": 350524,
  "k7": "0595"
}, {
  "id": 1554,
  "name": "永春",
  "parent_id": 239,
  "k1": "y",
  "k2": "yc",
  "k3": "yongchun",
  "k4": "",
  "k5": "县",
  "k6": 350525,
  "k7": "0595"
}, {
  "id": 1555,
  "name": "德化",
  "parent_id": 239,
  "k1": "d",
  "k2": "dh",
  "k3": "dehua",
  "k4": "",
  "k5": "县",
  "k6": 350526,
  "k7": "0595"
}, {
  "id": 1556,
  "name": "金门",
  "parent_id": 239,
  "k1": "j",
  "k2": "jm",
  "k3": "jinmen",
  "k4": "",
  "k5": "县",
  "k6": 350527,
  "k7": "0595"
}, {
  "id": 1557,
  "name": "石狮",
  "parent_id": 239,
  "k1": "s",
  "k2": "ss",
  "k3": "shishi",
  "k4": "",
  "k5": "市",
  "k6": 350581,
  "k7": "0595"
}, {
  "id": 1558,
  "name": "晋江",
  "parent_id": 239,
  "k1": "j",
  "k2": "jj",
  "k3": "jinjiang",
  "k4": "",
  "k5": "市",
  "k6": 350582,
  "k7": "0595"
}, {
  "id": 1559,
  "name": "南安",
  "parent_id": 239,
  "k1": "n",
  "k2": "na",
  "k3": "nanan",
  "k4": "",
  "k5": "市",
  "k6": 350583,
  "k7": "0595"
}, {
  "id": 1560,
  "name": "芗城",
  "parent_id": 240,
  "k1": "x",
  "k2": "xc",
  "k3": "xiangcheng",
  "k4": "",
  "k5": "区",
  "k6": 350602,
  "k7": "0596"
}, {
  "id": 1561,
  "name": "龙文",
  "parent_id": 240,
  "k1": "l",
  "k2": "lw",
  "k3": "longwen",
  "k4": "",
  "k5": "区",
  "k6": 350603,
  "k7": "0596"
}, {
  "id": 1562,
  "name": "云霄",
  "parent_id": 240,
  "k1": "y",
  "k2": "yx",
  "k3": "yunxiao",
  "k4": "",
  "k5": "县",
  "k6": 350622,
  "k7": "0596"
}, {
  "id": 1563,
  "name": "漳浦",
  "parent_id": 240,
  "k1": "z",
  "k2": "zp",
  "k3": "zhangpu",
  "k4": "",
  "k5": "县",
  "k6": 350623,
  "k7": "0596"
}, {
  "id": 1564,
  "name": "诏安",
  "parent_id": 240,
  "k1": "z",
  "k2": "za",
  "k3": "zhaoan",
  "k4": "",
  "k5": "县",
  "k6": 350624,
  "k7": "0596"
}, {
  "id": 1565,
  "name": "长泰",
  "parent_id": 240,
  "k1": "c",
  "k2": "ct",
  "k3": "changtai",
  "k4": "",
  "k5": "县",
  "k6": 350625,
  "k7": "0596"
}, {
  "id": 1566,
  "name": "东山",
  "parent_id": 240,
  "k1": "d",
  "k2": "ds",
  "k3": "dongshan",
  "k4": "",
  "k5": "县",
  "k6": 350626,
  "k7": "0596"
}, {
  "id": 1567,
  "name": "南靖",
  "parent_id": 240,
  "k1": "n",
  "k2": "nj",
  "k3": "nanjing",
  "k4": "",
  "k5": "县",
  "k6": 350627,
  "k7": "0596"
}, {
  "id": 1568,
  "name": "平和",
  "parent_id": 240,
  "k1": "p",
  "k2": "ph",
  "k3": "pinghe",
  "k4": "",
  "k5": "县",
  "k6": 350628,
  "k7": "0596"
}, {
  "id": 1569,
  "name": "华安",
  "parent_id": 240,
  "k1": "h",
  "k2": "ha",
  "k3": "huaan",
  "k4": "",
  "k5": "县",
  "k6": 350629,
  "k7": "0596"
}, {
  "id": 1570,
  "name": "龙海",
  "parent_id": 240,
  "k1": "l",
  "k2": "lh",
  "k3": "longhai",
  "k4": "",
  "k5": "市",
  "k6": 350681,
  "k7": "0596"
}, {
  "id": 1571,
  "name": "延平",
  "parent_id": 241,
  "k1": "y",
  "k2": "yp",
  "k3": "yanping",
  "k4": "",
  "k5": "区",
  "k6": 350702,
  "k7": "0599"
}, {
  "id": 1572,
  "name": "顺昌",
  "parent_id": 241,
  "k1": "s",
  "k2": "sc",
  "k3": "shunchang",
  "k4": "",
  "k5": "县",
  "k6": 350721,
  "k7": "0599"
}, {
  "id": 1573,
  "name": "浦城",
  "parent_id": 241,
  "k1": "p",
  "k2": "pc",
  "k3": "pucheng",
  "k4": "",
  "k5": "县",
  "k6": 350722,
  "k7": "0599"
}, {
  "id": 1574,
  "name": "光泽",
  "parent_id": 241,
  "k1": "g",
  "k2": "gz",
  "k3": "guangze",
  "k4": "",
  "k5": "县",
  "k6": 350723,
  "k7": "0599"
}, {
  "id": 1575,
  "name": "松溪",
  "parent_id": 241,
  "k1": "s",
  "k2": "sx",
  "k3": "songxi",
  "k4": "",
  "k5": "县",
  "k6": 350724,
  "k7": "0599"
}, {
  "id": 1576,
  "name": "政和",
  "parent_id": 241,
  "k1": "z",
  "k2": "zh",
  "k3": "zhenghe",
  "k4": "",
  "k5": "县",
  "k6": 350725,
  "k7": "0599"
}, {
  "id": 1577,
  "name": "邵武",
  "parent_id": 241,
  "k1": "s",
  "k2": "sw",
  "k3": "shaowu",
  "k4": "",
  "k5": "市",
  "k6": 350781,
  "k7": "0599"
}, {
  "id": 1578,
  "name": "武夷山",
  "parent_id": 241,
  "k1": "w",
  "k2": "wys",
  "k3": "wuyishan",
  "k4": "",
  "k5": "市",
  "k6": 350782,
  "k7": "0599"
}, {
  "id": 1579,
  "name": "建瓯",
  "parent_id": 241,
  "k1": "j",
  "k2": "jo",
  "k3": "jianou",
  "k4": "",
  "k5": "市",
  "k6": 350783,
  "k7": "0599"
}, {
  "id": 1580,
  "name": "建阳",
  "parent_id": 241,
  "k1": "j",
  "k2": "jy",
  "k3": "jianyang",
  "k4": "",
  "k5": "区",
  "k6": 350703,
  "k7": "0599"
}, {
  "id": 1581,
  "name": "新罗",
  "parent_id": 242,
  "k1": "x",
  "k2": "xl",
  "k3": "xinluo",
  "k4": "",
  "k5": "区",
  "k6": 350802,
  "k7": "0597"
}, {
  "id": 1582,
  "name": "长汀",
  "parent_id": 242,
  "k1": "c",
  "k2": "ct",
  "k3": "changting",
  "k4": "",
  "k5": "县",
  "k6": 350821,
  "k7": "0597"
}, {
  "id": 1583,
  "name": "永定",
  "parent_id": 242,
  "k1": "y",
  "k2": "yd",
  "k3": "yongding",
  "k4": "",
  "k5": "区",
  "k6": 350803,
  "k7": "0597"
}, {
  "id": 1584,
  "name": "上杭",
  "parent_id": 242,
  "k1": "s",
  "k2": "sh",
  "k3": "shanghang",
  "k4": "",
  "k5": "县",
  "k6": 350823,
  "k7": "0597"
}, {
  "id": 1585,
  "name": "武平",
  "parent_id": 242,
  "k1": "w",
  "k2": "wp",
  "k3": "wuping",
  "k4": "",
  "k5": "县",
  "k6": 350824,
  "k7": "0597"
}, {
  "id": 1586,
  "name": "连城",
  "parent_id": 242,
  "k1": "l",
  "k2": "lc",
  "k3": "liancheng",
  "k4": "",
  "k5": "县",
  "k6": 350825,
  "k7": "0597"
}, {
  "id": 1587,
  "name": "漳平",
  "parent_id": 242,
  "k1": "z",
  "k2": "zp",
  "k3": "zhangping",
  "k4": "",
  "k5": "市",
  "k6": 350881,
  "k7": "0597"
}, {
  "id": 1588,
  "name": "蕉城",
  "parent_id": 243,
  "k1": "j",
  "k2": "jc",
  "k3": "jiaocheng",
  "k4": "",
  "k5": "区",
  "k6": 350902,
  "k7": "0593"
}, {
  "id": 1589,
  "name": "霞浦",
  "parent_id": 243,
  "k1": "x",
  "k2": "xp",
  "k3": "xiapu",
  "k4": "",
  "k5": "县",
  "k6": 350921,
  "k7": "0593"
}, {
  "id": 1590,
  "name": "古田",
  "parent_id": 243,
  "k1": "g",
  "k2": "gt",
  "k3": "gutian",
  "k4": "",
  "k5": "县",
  "k6": 350922,
  "k7": "0593"
}, {
  "id": 1591,
  "name": "屏南",
  "parent_id": 243,
  "k1": "p",
  "k2": "pn",
  "k3": "pingnan",
  "k4": "",
  "k5": "县",
  "k6": 350923,
  "k7": "0593"
}, {
  "id": 1592,
  "name": "寿宁",
  "parent_id": 243,
  "k1": "s",
  "k2": "sn",
  "k3": "shouning",
  "k4": "",
  "k5": "县",
  "k6": 350924,
  "k7": "0593"
}, {
  "id": 1593,
  "name": "周宁",
  "parent_id": 243,
  "k1": "z",
  "k2": "zn",
  "k3": "zhouning",
  "k4": "",
  "k5": "县",
  "k6": 350925,
  "k7": "0593"
}, {
  "id": 1594,
  "name": "柘荣",
  "parent_id": 243,
  "k1": "z",
  "k2": "zr",
  "k3": "zherong",
  "k4": "",
  "k5": "县",
  "k6": 350926,
  "k7": "0593"
}, {
  "id": 1595,
  "name": "福安",
  "parent_id": 243,
  "k1": "f",
  "k2": "fa",
  "k3": "fuan",
  "k4": "",
  "k5": "市",
  "k6": 350981,
  "k7": "0593"
}, {
  "id": 1596,
  "name": "福鼎",
  "parent_id": 243,
  "k1": "f",
  "k2": "fd",
  "k3": "fuding",
  "k4": "",
  "k5": "市",
  "k6": 350982,
  "k7": "0593"
}, {
  "id": 1597,
  "name": "东湖",
  "parent_id": 244,
  "k1": "d",
  "k2": "dh",
  "k3": "donghu",
  "k4": "",
  "k5": "区",
  "k6": 360102,
  "k7": "0791"
}, {
  "id": 1598,
  "name": "西湖",
  "parent_id": 244,
  "k1": "x",
  "k2": "xh",
  "k3": "xihu",
  "k4": "",
  "k5": "区",
  "k6": 360103,
  "k7": "0791"
}, {
  "id": 1599,
  "name": "青云谱",
  "parent_id": 244,
  "k1": "q",
  "k2": "qyp",
  "k3": "qingyunpu",
  "k4": "",
  "k5": "区",
  "k6": 360104,
  "k7": "0791"
}, {
  "id": 1600,
  "name": "湾里",
  "parent_id": 244,
  "k1": "w",
  "k2": "wl",
  "k3": "wanli",
  "k4": "",
  "k5": "区",
  "k6": 360105,
  "k7": "0791"
}, {
  "id": 1601,
  "name": "青山湖",
  "parent_id": 244,
  "k1": "q",
  "k2": "qsh",
  "k3": "qingshanhu",
  "k4": "",
  "k5": "区",
  "k6": 360111,
  "k7": "0791"
}, {
  "id": 1602,
  "name": "南昌",
  "parent_id": 244,
  "k1": "n",
  "k2": "nc",
  "k3": "nanchang",
  "k4": "",
  "k5": "县",
  "k6": 360121,
  "k7": "0791"
}, {
  "id": 1603,
  "name": "新建",
  "parent_id": 244,
  "k1": "x",
  "k2": "xj",
  "k3": "xinjian",
  "k4": "",
  "k5": "区",
  "k6": 360122,
  "k7": "0791"
}, {
  "id": 1604,
  "name": "安义",
  "parent_id": 244,
  "k1": "a",
  "k2": "ay",
  "k3": "anyi",
  "k4": "",
  "k5": "县",
  "k6": 360123,
  "k7": "0791"
}, {
  "id": 1605,
  "name": "进贤",
  "parent_id": 244,
  "k1": "j",
  "k2": "jx",
  "k3": "jinxian",
  "k4": "",
  "k5": "县",
  "k6": 360124,
  "k7": "0791"
}, {
  "id": 1606,
  "name": "昌江",
  "parent_id": 245,
  "k1": "c",
  "k2": "cj",
  "k3": "changjiang",
  "k4": "",
  "k5": "区",
  "k6": 360202,
  "k7": "0798"
}, {
  "id": 1607,
  "name": "珠山",
  "parent_id": 245,
  "k1": "z",
  "k2": "zs",
  "k3": "zhushan",
  "k4": "",
  "k5": "区",
  "k6": 360203,
  "k7": "0798"
}, {
  "id": 1608,
  "name": "浮梁",
  "parent_id": 245,
  "k1": "f",
  "k2": "fl",
  "k3": "fuliang",
  "k4": "",
  "k5": "县",
  "k6": 360222,
  "k7": "0798"
}, {
  "id": 1609,
  "name": "乐平",
  "parent_id": 245,
  "k1": "l",
  "k2": "lp",
  "k3": "leping",
  "k4": "",
  "k5": "市",
  "k6": 360281,
  "k7": "0798"
}, {
  "id": 1610,
  "name": "安源",
  "parent_id": 246,
  "k1": "a",
  "k2": "ay",
  "k3": "anyuan",
  "k4": "",
  "k5": "区",
  "k6": 360302,
  "k7": "0799"
}, {
  "id": 1611,
  "name": "湘东",
  "parent_id": 246,
  "k1": "x",
  "k2": "xd",
  "k3": "xiangdong",
  "k4": "",
  "k5": "区",
  "k6": 360313,
  "k7": "0799"
}, {
  "id": 1612,
  "name": "莲花",
  "parent_id": 246,
  "k1": "l",
  "k2": "lh",
  "k3": "lianhua",
  "k4": "",
  "k5": "县",
  "k6": 360321,
  "k7": "0799"
}, {
  "id": 1613,
  "name": "上栗",
  "parent_id": 246,
  "k1": "s",
  "k2": "sl",
  "k3": "shangli",
  "k4": "",
  "k5": "县",
  "k6": 360322,
  "k7": "0799"
}, {
  "id": 1614,
  "name": "芦溪",
  "parent_id": 246,
  "k1": "l",
  "k2": "lx",
  "k3": "luxi",
  "k4": "",
  "k5": "县",
  "k6": 360323,
  "k7": "0799"
}, {
  "id": 1615,
  "name": "濂溪",
  "parent_id": 247,
  "k1": "l",
  "k2": "lx",
  "k3": "lianxi",
  "k4": "",
  "k5": "区",
  "k6": 360402,
  "k7": "0792"
}, {
  "id": 1616,
  "name": "浔阳",
  "parent_id": 247,
  "k1": "x",
  "k2": "xy",
  "k3": "xunyang",
  "k4": "",
  "k5": "区",
  "k6": 360403,
  "k7": "0792"
}, {
  "id": 1617,
  "name": "柴桑",
  "parent_id": 247,
  "k1": "c",
  "k2": "cs",
  "k3": "chaisang",
  "k4": "",
  "k5": "区",
  "k6": 360404,
  "k7": "0792"
}, {
  "id": 1618,
  "name": "武宁",
  "parent_id": 247,
  "k1": "w",
  "k2": "wn",
  "k3": "wuning",
  "k4": "",
  "k5": "县",
  "k6": 360423,
  "k7": "0792"
}, {
  "id": 1619,
  "name": "修水",
  "parent_id": 247,
  "k1": "x",
  "k2": "xs",
  "k3": "xiushui",
  "k4": "",
  "k5": "县",
  "k6": 360424,
  "k7": "0792"
}, {
  "id": 1620,
  "name": "永修",
  "parent_id": 247,
  "k1": "y",
  "k2": "yx",
  "k3": "yongxiu",
  "k4": "",
  "k5": "县",
  "k6": 360425,
  "k7": "0792"
}, {
  "id": 1621,
  "name": "德安",
  "parent_id": 247,
  "k1": "d",
  "k2": "da",
  "k3": "dean",
  "k4": "",
  "k5": "县",
  "k6": 360426,
  "k7": "0792"
}, {
  "id": 1622,
  "name": "庐山",
  "parent_id": 247,
  "k1": "l",
  "k2": "ls",
  "k3": "lushan",
  "k4": "",
  "k5": "市",
  "k6": 360483,
  "k7": "0792"
}, {
  "id": 1623,
  "name": "都昌",
  "parent_id": 247,
  "k1": "d",
  "k2": "dc",
  "k3": "duchang",
  "k4": "",
  "k5": "县",
  "k6": 360428,
  "k7": "0792"
}, {
  "id": 1624,
  "name": "湖口",
  "parent_id": 247,
  "k1": "h",
  "k2": "hk",
  "k3": "hukou",
  "k4": "",
  "k5": "县",
  "k6": 360429,
  "k7": "0792"
}, {
  "id": 1625,
  "name": "彭泽",
  "parent_id": 247,
  "k1": "p",
  "k2": "pz",
  "k3": "pengze",
  "k4": "",
  "k5": "县",
  "k6": 360430,
  "k7": "0792"
}, {
  "id": 1626,
  "name": "瑞昌",
  "parent_id": 247,
  "k1": "r",
  "k2": "rc",
  "k3": "ruichang",
  "k4": "",
  "k5": "市",
  "k6": 360481,
  "k7": "0792"
}, {
  "id": 1627,
  "name": "共青城",
  "parent_id": 247,
  "k1": "g",
  "k2": "gqc",
  "k3": "gongqingcheng",
  "k4": "",
  "k5": "市",
  "k6": 360482,
  "k7": "0792"
}, {
  "id": 1628,
  "name": "渝水",
  "parent_id": 248,
  "k1": "y",
  "k2": "ys",
  "k3": "yushui",
  "k4": "",
  "k5": "区",
  "k6": 360502,
  "k7": "0790"
}, {
  "id": 1629,
  "name": "分宜",
  "parent_id": 248,
  "k1": "f",
  "k2": "fy",
  "k3": "fenyi",
  "k4": "",
  "k5": "县",
  "k6": 360521,
  "k7": "0790"
}, {
  "id": 1630,
  "name": "月湖",
  "parent_id": 249,
  "k1": "y",
  "k2": "yh",
  "k3": "yuehu",
  "k4": "",
  "k5": "区",
  "k6": 360602,
  "k7": "0701"
}, {
  "id": 1631,
  "name": "余江",
  "parent_id": 249,
  "k1": "y",
  "k2": "yj",
  "k3": "yujiang",
  "k4": "",
  "k5": "区",
  "k6": 360603,
  "k7": "0701"
}, {
  "id": 1632,
  "name": "贵溪",
  "parent_id": 249,
  "k1": "g",
  "k2": "gx",
  "k3": "guixi",
  "k4": "",
  "k5": "市",
  "k6": 360681,
  "k7": "0701"
}, {
  "id": 1633,
  "name": "章贡",
  "parent_id": 250,
  "k1": "z",
  "k2": "zg",
  "k3": "zhanggong",
  "k4": "",
  "k5": "区",
  "k6": 360702,
  "k7": "0797"
}, {
  "id": 1634,
  "name": "赣县",
  "parent_id": 250,
  "k1": "g",
  "k2": "gx",
  "k3": "ganxian",
  "k4": "",
  "k5": "区",
  "k6": 360704,
  "k7": "0797"
}, {
  "id": 1635,
  "name": "信丰",
  "parent_id": 250,
  "k1": "x",
  "k2": "xf",
  "k3": "xinfeng",
  "k4": "",
  "k5": "县",
  "k6": 360722,
  "k7": "0797"
}, {
  "id": 1636,
  "name": "大余",
  "parent_id": 250,
  "k1": "d",
  "k2": "dy",
  "k3": "dayu",
  "k4": "",
  "k5": "县",
  "k6": 360723,
  "k7": "0797"
}, {
  "id": 1637,
  "name": "上犹",
  "parent_id": 250,
  "k1": "s",
  "k2": "sy",
  "k3": "shangyou",
  "k4": "",
  "k5": "县",
  "k6": 360724,
  "k7": "0797"
}, {
  "id": 1638,
  "name": "崇义",
  "parent_id": 250,
  "k1": "c",
  "k2": "cy",
  "k3": "chongyi",
  "k4": "",
  "k5": "县",
  "k6": 360725,
  "k7": "0797"
}, {
  "id": 1639,
  "name": "安远",
  "parent_id": 250,
  "k1": "a",
  "k2": "ay",
  "k3": "anyuan",
  "k4": "",
  "k5": "县",
  "k6": 360726,
  "k7": "0797"
}, {
  "id": 1640,
  "name": "龙南",
  "parent_id": 250,
  "k1": "l",
  "k2": "ln",
  "k3": "longnan",
  "k4": "",
  "k5": "县",
  "k6": 360727,
  "k7": "0797"
}, {
  "id": 1641,
  "name": "定南",
  "parent_id": 250,
  "k1": "d",
  "k2": "dn",
  "k3": "dingnan",
  "k4": "",
  "k5": "县",
  "k6": 360728,
  "k7": "0797"
}, {
  "id": 1642,
  "name": "全南",
  "parent_id": 250,
  "k1": "q",
  "k2": "qn",
  "k3": "quannan",
  "k4": "",
  "k5": "县",
  "k6": 360729,
  "k7": "0797"
}, {
  "id": 1643,
  "name": "宁都",
  "parent_id": 250,
  "k1": "n",
  "k2": "nd",
  "k3": "ningdu",
  "k4": "",
  "k5": "县",
  "k6": 360730,
  "k7": "0797"
}, {
  "id": 1644,
  "name": "于都",
  "parent_id": 250,
  "k1": "y",
  "k2": "yd",
  "k3": "yudu",
  "k4": "",
  "k5": "县",
  "k6": 360731,
  "k7": "0797"
}, {
  "id": 1645,
  "name": "兴国",
  "parent_id": 250,
  "k1": "x",
  "k2": "xg",
  "k3": "xingguo",
  "k4": "",
  "k5": "县",
  "k6": 360732,
  "k7": "0797"
}, {
  "id": 1646,
  "name": "会昌",
  "parent_id": 250,
  "k1": "h",
  "k2": "hc",
  "k3": "huichang",
  "k4": "",
  "k5": "县",
  "k6": 360733,
  "k7": "0797"
}, {
  "id": 1647,
  "name": "寻乌",
  "parent_id": 250,
  "k1": "x",
  "k2": "xw",
  "k3": "xunwu",
  "k4": "",
  "k5": "县",
  "k6": 360734,
  "k7": "0797"
}, {
  "id": 1648,
  "name": "石城",
  "parent_id": 250,
  "k1": "s",
  "k2": "sc",
  "k3": "shicheng",
  "k4": "",
  "k5": "县",
  "k6": 360735,
  "k7": "0797"
}, {
  "id": 1649,
  "name": "瑞金",
  "parent_id": 250,
  "k1": "r",
  "k2": "rj",
  "k3": "ruijin",
  "k4": "",
  "k5": "市",
  "k6": 360781,
  "k7": "0797"
}, {
  "id": 1650,
  "name": "南康",
  "parent_id": 250,
  "k1": "n",
  "k2": "nk",
  "k3": "nankang",
  "k4": "",
  "k5": "区",
  "k6": 360782,
  "k7": "0797"
}, {
  "id": 1651,
  "name": "吉州",
  "parent_id": 251,
  "k1": "j",
  "k2": "jz",
  "k3": "jizhou",
  "k4": "",
  "k5": "区",
  "k6": 360802,
  "k7": "0796"
}, {
  "id": 1652,
  "name": "青原",
  "parent_id": 251,
  "k1": "q",
  "k2": "qy",
  "k3": "qingyuan",
  "k4": "",
  "k5": "区",
  "k6": 360803,
  "k7": "0796"
}, {
  "id": 1653,
  "name": "吉安",
  "parent_id": 251,
  "k1": "j",
  "k2": "ja",
  "k3": "jian",
  "k4": "",
  "k5": "县",
  "k6": 360821,
  "k7": "0796"
}, {
  "id": 1654,
  "name": "吉水",
  "parent_id": 251,
  "k1": "j",
  "k2": "js",
  "k3": "jishui",
  "k4": "",
  "k5": "县",
  "k6": 360822,
  "k7": "0796"
}, {
  "id": 1655,
  "name": "峡江",
  "parent_id": 251,
  "k1": "x",
  "k2": "xj",
  "k3": "xiajiang",
  "k4": "",
  "k5": "县",
  "k6": 360823,
  "k7": "0796"
}, {
  "id": 1656,
  "name": "新干",
  "parent_id": 251,
  "k1": "x",
  "k2": "xg",
  "k3": "xingan",
  "k4": "",
  "k5": "县",
  "k6": 360824,
  "k7": "0796"
}, {
  "id": 1657,
  "name": "永丰",
  "parent_id": 251,
  "k1": "y",
  "k2": "yf",
  "k3": "yongfeng",
  "k4": "",
  "k5": "县",
  "k6": 360825,
  "k7": "0796"
}, {
  "id": 1658,
  "name": "泰和",
  "parent_id": 251,
  "k1": "t",
  "k2": "th",
  "k3": "taihe",
  "k4": "",
  "k5": "县",
  "k6": 360826,
  "k7": "0796"
}, {
  "id": 1659,
  "name": "遂川",
  "parent_id": 251,
  "k1": "s",
  "k2": "sc",
  "k3": "suichuan",
  "k4": "",
  "k5": "县",
  "k6": 360827,
  "k7": "0796"
}, {
  "id": 1660,
  "name": "万安",
  "parent_id": 251,
  "k1": "w",
  "k2": "wa",
  "k3": "wanan",
  "k4": "",
  "k5": "县",
  "k6": 360828,
  "k7": "0796"
}, {
  "id": 1661,
  "name": "安福",
  "parent_id": 251,
  "k1": "a",
  "k2": "af",
  "k3": "anfu",
  "k4": "",
  "k5": "县",
  "k6": 360829,
  "k7": "0796"
}, {
  "id": 1662,
  "name": "永新",
  "parent_id": 251,
  "k1": "y",
  "k2": "yx",
  "k3": "yongxin",
  "k4": "",
  "k5": "县",
  "k6": 360830,
  "k7": "0796"
}, {
  "id": 1663,
  "name": "井冈山",
  "parent_id": 251,
  "k1": "j",
  "k2": "jgs",
  "k3": "jinggangshan",
  "k4": "",
  "k5": "市",
  "k6": 360881,
  "k7": "0796"
}, {
  "id": 1664,
  "name": "袁州",
  "parent_id": 252,
  "k1": "y",
  "k2": "yz",
  "k3": "yuanzhou",
  "k4": "",
  "k5": "区",
  "k6": 360902,
  "k7": "0795"
}, {
  "id": 1665,
  "name": "奉新",
  "parent_id": 252,
  "k1": "f",
  "k2": "fx",
  "k3": "fengxin",
  "k4": "",
  "k5": "县",
  "k6": 360921,
  "k7": "0795"
}, {
  "id": 1666,
  "name": "万载",
  "parent_id": 252,
  "k1": "w",
  "k2": "wz",
  "k3": "wanzai",
  "k4": "",
  "k5": "县",
  "k6": 360922,
  "k7": "0795"
}, {
  "id": 1667,
  "name": "上高",
  "parent_id": 252,
  "k1": "s",
  "k2": "sg",
  "k3": "shanggao",
  "k4": "",
  "k5": "县",
  "k6": 360923,
  "k7": "0795"
}, {
  "id": 1668,
  "name": "宜丰",
  "parent_id": 252,
  "k1": "y",
  "k2": "yf",
  "k3": "yifeng",
  "k4": "",
  "k5": "县",
  "k6": 360924,
  "k7": "0795"
}, {
  "id": 1669,
  "name": "靖安",
  "parent_id": 252,
  "k1": "j",
  "k2": "ja",
  "k3": "jingan",
  "k4": "",
  "k5": "县",
  "k6": 360925,
  "k7": "0795"
}, {
  "id": 1670,
  "name": "铜鼓",
  "parent_id": 252,
  "k1": "t",
  "k2": "tg",
  "k3": "tonggu",
  "k4": "",
  "k5": "县",
  "k6": 360926,
  "k7": "0795"
}, {
  "id": 1671,
  "name": "丰城",
  "parent_id": 252,
  "k1": "f",
  "k2": "fc",
  "k3": "fengcheng",
  "k4": "",
  "k5": "市",
  "k6": 360981,
  "k7": "0795"
}, {
  "id": 1672,
  "name": "樟树",
  "parent_id": 252,
  "k1": "z",
  "k2": "zs",
  "k3": "zhangshu",
  "k4": "",
  "k5": "市",
  "k6": 360982,
  "k7": "0795"
}, {
  "id": 1673,
  "name": "高安",
  "parent_id": 252,
  "k1": "g",
  "k2": "ga",
  "k3": "gaoan",
  "k4": "",
  "k5": "市",
  "k6": 360983,
  "k7": "0795"
}, {
  "id": 1674,
  "name": "临川",
  "parent_id": 253,
  "k1": "l",
  "k2": "lc",
  "k3": "linchuan",
  "k4": "",
  "k5": "区",
  "k6": 361002,
  "k7": "0794"
}, {
  "id": 1675,
  "name": "南城",
  "parent_id": 253,
  "k1": "n",
  "k2": "nc",
  "k3": "nancheng",
  "k4": "",
  "k5": "县",
  "k6": 361021,
  "k7": "0794"
}, {
  "id": 1676,
  "name": "黎川",
  "parent_id": 253,
  "k1": "l",
  "k2": "lc",
  "k3": "lichuan",
  "k4": "",
  "k5": "县",
  "k6": 361022,
  "k7": "0794"
}, {
  "id": 1677,
  "name": "南丰",
  "parent_id": 253,
  "k1": "n",
  "k2": "nf",
  "k3": "nanfeng",
  "k4": "",
  "k5": "县",
  "k6": 361023,
  "k7": "0794"
}, {
  "id": 1678,
  "name": "崇仁",
  "parent_id": 253,
  "k1": "c",
  "k2": "cr",
  "k3": "chongren",
  "k4": "",
  "k5": "县",
  "k6": 361024,
  "k7": "0794"
}, {
  "id": 1679,
  "name": "乐安",
  "parent_id": 253,
  "k1": "l",
  "k2": "la",
  "k3": "lean",
  "k4": "",
  "k5": "县",
  "k6": 361025,
  "k7": "0794"
}, {
  "id": 1680,
  "name": "宜黄",
  "parent_id": 253,
  "k1": "y",
  "k2": "yh",
  "k3": "yihuang",
  "k4": "",
  "k5": "县",
  "k6": 361026,
  "k7": "0794"
}, {
  "id": 1681,
  "name": "金溪",
  "parent_id": 253,
  "k1": "j",
  "k2": "jx",
  "k3": "jinxi",
  "k4": "",
  "k5": "县",
  "k6": 361027,
  "k7": "0794"
}, {
  "id": 1682,
  "name": "资溪",
  "parent_id": 253,
  "k1": "z",
  "k2": "zx",
  "k3": "zixi",
  "k4": "",
  "k5": "县",
  "k6": 361028,
  "k7": "0794"
}, {
  "id": 1683,
  "name": "东乡",
  "parent_id": 253,
  "k1": "d",
  "k2": "dx",
  "k3": "dongxiang",
  "k4": "",
  "k5": "区",
  "k6": 361003,
  "k7": "0794"
}, {
  "id": 1684,
  "name": "广昌",
  "parent_id": 253,
  "k1": "g",
  "k2": "gc",
  "k3": "guangchang",
  "k4": "",
  "k5": "县",
  "k6": 361030,
  "k7": "0794"
}, {
  "id": 1685,
  "name": "信州",
  "parent_id": 254,
  "k1": "x",
  "k2": "xz",
  "k3": "xinzhou",
  "k4": "",
  "k5": "区",
  "k6": 361102,
  "k7": "0793"
}, {
  "id": 1686,
  "name": "上饶",
  "parent_id": 254,
  "k1": "s",
  "k2": "sr",
  "k3": "shangrao",
  "k4": "",
  "k5": "县",
  "k6": 361121,
  "k7": "0793"
}, {
  "id": 1687,
  "name": "广丰",
  "parent_id": 254,
  "k1": "g",
  "k2": "gf",
  "k3": "guangfeng",
  "k4": "",
  "k5": "区",
  "k6": 361122,
  "k7": "0793"
}, {
  "id": 1688,
  "name": "玉山",
  "parent_id": 254,
  "k1": "y",
  "k2": "ys",
  "k3": "yushan",
  "k4": "",
  "k5": "县",
  "k6": 361123,
  "k7": "0793"
}, {
  "id": 1689,
  "name": "铅山",
  "parent_id": 254,
  "k1": "q",
  "k2": "qs",
  "k3": "qianshan",
  "k4": "",
  "k5": "县",
  "k6": 361124,
  "k7": "0793"
}, {
  "id": 1690,
  "name": "横峰",
  "parent_id": 254,
  "k1": "h",
  "k2": "hf",
  "k3": "hengfeng",
  "k4": "",
  "k5": "县",
  "k6": 361125,
  "k7": "0793"
}, {
  "id": 1691,
  "name": "弋阳",
  "parent_id": 254,
  "k1": "y",
  "k2": "yy",
  "k3": "yiyang",
  "k4": "",
  "k5": "县",
  "k6": 361126,
  "k7": "0793"
}, {
  "id": 1692,
  "name": "余干",
  "parent_id": 254,
  "k1": "y",
  "k2": "yg",
  "k3": "yugan",
  "k4": "",
  "k5": "县",
  "k6": 361127,
  "k7": "0793"
}, {
  "id": 1693,
  "name": "鄱阳",
  "parent_id": 254,
  "k1": "p",
  "k2": "py",
  "k3": "poyang",
  "k4": "",
  "k5": "县",
  "k6": 361128,
  "k7": "0793"
}, {
  "id": 1694,
  "name": "万年",
  "parent_id": 254,
  "k1": "w",
  "k2": "wn",
  "k3": "wannian",
  "k4": "",
  "k5": "县",
  "k6": 361129,
  "k7": "0793"
}, {
  "id": 1695,
  "name": "婺源",
  "parent_id": 254,
  "k1": "w",
  "k2": "wy",
  "k3": "wuyuan",
  "k4": "",
  "k5": "县",
  "k6": 361130,
  "k7": "0793"
}, {
  "id": 1696,
  "name": "德兴",
  "parent_id": 254,
  "k1": "d",
  "k2": "dx",
  "k3": "dexing",
  "k4": "",
  "k5": "市",
  "k6": 361181,
  "k7": "0793"
}, {
  "id": 1697,
  "name": "历下",
  "parent_id": 255,
  "k1": "l",
  "k2": "lx",
  "k3": "lixia",
  "k4": "",
  "k5": "区",
  "k6": 370102,
  "k7": "0531"
}, {
  "id": 1698,
  "name": "市中",
  "parent_id": 255,
  "k1": "s",
  "k2": "sz",
  "k3": "shizhong",
  "k4": "",
  "k5": "区",
  "k6": 370103,
  "k7": "0531"
}, {
  "id": 1699,
  "name": "槐荫",
  "parent_id": 255,
  "k1": "h",
  "k2": "hy",
  "k3": "huaiyin",
  "k4": "",
  "k5": "区",
  "k6": 370104,
  "k7": "0531"
}, {
  "id": 1700,
  "name": "天桥",
  "parent_id": 255,
  "k1": "t",
  "k2": "tq",
  "k3": "tianqiao",
  "k4": "",
  "k5": "区",
  "k6": 370105,
  "k7": "0531"
}, {
  "id": 1701,
  "name": "历城",
  "parent_id": 255,
  "k1": "l",
  "k2": "lc",
  "k3": "licheng",
  "k4": "",
  "k5": "区",
  "k6": 370112,
  "k7": "0531"
}, {
  "id": 1702,
  "name": "长清",
  "parent_id": 255,
  "k1": "c",
  "k2": "cq",
  "k3": "changqing",
  "k4": "",
  "k5": "区",
  "k6": 370113,
  "k7": "0531"
}, {
  "id": 1703,
  "name": "平阴",
  "parent_id": 255,
  "k1": "p",
  "k2": "py",
  "k3": "pingyin",
  "k4": "",
  "k5": "县",
  "k6": 370124,
  "k7": "0531"
}, {
  "id": 1704,
  "name": "济阳",
  "parent_id": 255,
  "k1": "j",
  "k2": "jy",
  "k3": "jiyang",
  "k4": "",
  "k5": "区",
  "k6": 370115,
  "k7": "0531"
}, {
  "id": 1705,
  "name": "商河",
  "parent_id": 255,
  "k1": "s",
  "k2": "sh",
  "k3": "shanghe",
  "k4": "",
  "k5": "县",
  "k6": 370126,
  "k7": "0531"
}, {
  "id": 1706,
  "name": "章丘",
  "parent_id": 255,
  "k1": "z",
  "k2": "zq",
  "k3": "zhangqiu",
  "k4": "",
  "k5": "区",
  "k6": 370114,
  "k7": "0531"
}, {
  "id": 1707,
  "name": "市南",
  "parent_id": 256,
  "k1": "s",
  "k2": "sn",
  "k3": "shinan",
  "k4": "",
  "k5": "区",
  "k6": 370202,
  "k7": "0532"
}, {
  "id": 1708,
  "name": "市北",
  "parent_id": 256,
  "k1": "s",
  "k2": "sb",
  "k3": "shibei",
  "k4": "",
  "k5": "区",
  "k6": 370203,
  "k7": "0532"
}, {
  "id": 1709,
  "name": "黄岛",
  "parent_id": 256,
  "k1": "h",
  "k2": "hd",
  "k3": "huangdao",
  "k4": "",
  "k5": "区",
  "k6": 370211,
  "k7": "0532"
}, {
  "id": 1710,
  "name": "崂山",
  "parent_id": 256,
  "k1": "l",
  "k2": "ls",
  "k3": "laoshan",
  "k4": "",
  "k5": "区",
  "k6": 370212,
  "k7": "0532"
}, {
  "id": 1711,
  "name": "李沧",
  "parent_id": 256,
  "k1": "l",
  "k2": "lc",
  "k3": "licang",
  "k4": "",
  "k5": "区",
  "k6": 370213,
  "k7": "0532"
}, {
  "id": 1712,
  "name": "城阳",
  "parent_id": 256,
  "k1": "c",
  "k2": "cy",
  "k3": "chengyang",
  "k4": "",
  "k5": "区",
  "k6": 370214,
  "k7": "0532"
}, {
  "id": 1713,
  "name": "胶州",
  "parent_id": 256,
  "k1": "j",
  "k2": "jz",
  "k3": "jiaozhou",
  "k4": "",
  "k5": "市",
  "k6": 370281,
  "k7": "0532"
}, {
  "id": 1714,
  "name": "即墨",
  "parent_id": 256,
  "k1": "j",
  "k2": "jm",
  "k3": "jimo",
  "k4": "",
  "k5": "区",
  "k6": 370215,
  "k7": "0532"
}, {
  "id": 1715,
  "name": "平度",
  "parent_id": 256,
  "k1": "p",
  "k2": "pd",
  "k3": "pingdu",
  "k4": "",
  "k5": "市",
  "k6": 370283,
  "k7": "0532"
}, {
  "id": 1716,
  "name": "莱西",
  "parent_id": 256,
  "k1": "l",
  "k2": "lx",
  "k3": "laixi",
  "k4": "",
  "k5": "市",
  "k6": 370285,
  "k7": "0532"
}, {
  "id": 1717,
  "name": "淄川",
  "parent_id": 257,
  "k1": "z",
  "k2": "zc",
  "k3": "zichuan",
  "k4": "",
  "k5": "区",
  "k6": 370302,
  "k7": "0533"
}, {
  "id": 1718,
  "name": "张店",
  "parent_id": 257,
  "k1": "z",
  "k2": "zd",
  "k3": "zhangdian",
  "k4": "",
  "k5": "区",
  "k6": 370303,
  "k7": "0533"
}, {
  "id": 1719,
  "name": "博山",
  "parent_id": 257,
  "k1": "b",
  "k2": "bs",
  "k3": "boshan",
  "k4": "",
  "k5": "区",
  "k6": 370304,
  "k7": "0533"
}, {
  "id": 1720,
  "name": "临淄",
  "parent_id": 257,
  "k1": "l",
  "k2": "lz",
  "k3": "linzi",
  "k4": "",
  "k5": "区",
  "k6": 370305,
  "k7": "0533"
}, {
  "id": 1721,
  "name": "周村",
  "parent_id": 257,
  "k1": "z",
  "k2": "zc",
  "k3": "zhoucun",
  "k4": "",
  "k5": "区",
  "k6": 370306,
  "k7": "0533"
}, {
  "id": 1722,
  "name": "桓台",
  "parent_id": 257,
  "k1": "h",
  "k2": "ht",
  "k3": "huantai",
  "k4": "",
  "k5": "县",
  "k6": 370321,
  "k7": "0533"
}, {
  "id": 1723,
  "name": "高青",
  "parent_id": 257,
  "k1": "g",
  "k2": "gq",
  "k3": "gaoqing",
  "k4": "",
  "k5": "县",
  "k6": 370322,
  "k7": "0533"
}, {
  "id": 1724,
  "name": "沂源",
  "parent_id": 257,
  "k1": "y",
  "k2": "yy",
  "k3": "yiyuan",
  "k4": "",
  "k5": "县",
  "k6": 370323,
  "k7": "0533"
}, {
  "id": 1725,
  "name": "市中",
  "parent_id": 258,
  "k1": "s",
  "k2": "sz",
  "k3": "shizhong",
  "k4": "",
  "k5": "区",
  "k6": 370402,
  "k7": "0632"
}, {
  "id": 1726,
  "name": "薛城",
  "parent_id": 258,
  "k1": "x",
  "k2": "xc",
  "k3": "xuecheng",
  "k4": "",
  "k5": "区",
  "k6": 370403,
  "k7": "0632"
}, {
  "id": 1727,
  "name": "峄城",
  "parent_id": 258,
  "k1": "y",
  "k2": "yc",
  "k3": "yicheng",
  "k4": "",
  "k5": "区",
  "k6": 370404,
  "k7": "0632"
}, {
  "id": 1728,
  "name": "台儿庄",
  "parent_id": 258,
  "k1": "t",
  "k2": "tez",
  "k3": "taierzhuang",
  "k4": "",
  "k5": "区",
  "k6": 370405,
  "k7": "0632"
}, {
  "id": 1729,
  "name": "山亭",
  "parent_id": 258,
  "k1": "s",
  "k2": "st",
  "k3": "shanting",
  "k4": "",
  "k5": "区",
  "k6": 370406,
  "k7": "0632"
}, {
  "id": 1730,
  "name": "滕州",
  "parent_id": 258,
  "k1": "t",
  "k2": "tz",
  "k3": "tengzhou",
  "k4": "",
  "k5": "市",
  "k6": 370481,
  "k7": "0632"
}, {
  "id": 1731,
  "name": "东营",
  "parent_id": 259,
  "k1": "d",
  "k2": "dy",
  "k3": "dongying",
  "k4": "",
  "k5": "区",
  "k6": 370502,
  "k7": "0546"
}, {
  "id": 1732,
  "name": "河口",
  "parent_id": 259,
  "k1": "h",
  "k2": "hk",
  "k3": "hekou",
  "k4": "",
  "k5": "区",
  "k6": 370503,
  "k7": "0546"
}, {
  "id": 1733,
  "name": "垦利",
  "parent_id": 259,
  "k1": "k",
  "k2": "kl",
  "k3": "kenli",
  "k4": "",
  "k5": "区",
  "k6": 370505,
  "k7": "0546"
}, {
  "id": 1734,
  "name": "利津",
  "parent_id": 259,
  "k1": "l",
  "k2": "lj",
  "k3": "lijin",
  "k4": "",
  "k5": "县",
  "k6": 370522,
  "k7": "0546"
}, {
  "id": 1735,
  "name": "广饶",
  "parent_id": 259,
  "k1": "g",
  "k2": "gr",
  "k3": "guangrao",
  "k4": "",
  "k5": "县",
  "k6": 370523,
  "k7": "0546"
}, {
  "id": 1736,
  "name": "芝罘",
  "parent_id": 260,
  "k1": "z",
  "k2": "zf",
  "k3": "zhifu",
  "k4": "",
  "k5": "区",
  "k6": 370602,
  "k7": "0535"
}, {
  "id": 1737,
  "name": "福山",
  "parent_id": 260,
  "k1": "f",
  "k2": "fs",
  "k3": "fushan",
  "k4": "",
  "k5": "区",
  "k6": 370611,
  "k7": "0535"
}, {
  "id": 1738,
  "name": "牟平",
  "parent_id": 260,
  "k1": "m",
  "k2": "mp",
  "k3": "mouping",
  "k4": "",
  "k5": "区",
  "k6": 370612,
  "k7": "0535"
}, {
  "id": 1739,
  "name": "莱山",
  "parent_id": 260,
  "k1": "l",
  "k2": "ls",
  "k3": "laishan",
  "k4": "",
  "k5": "区",
  "k6": 370613,
  "k7": "0535"
}, {
  "id": 1740,
  "name": "长岛",
  "parent_id": 260,
  "k1": "c",
  "k2": "cd",
  "k3": "changdao",
  "k4": "",
  "k5": "县",
  "k6": 370634,
  "k7": "0535"
}, {
  "id": 1741,
  "name": "龙口",
  "parent_id": 260,
  "k1": "l",
  "k2": "lk",
  "k3": "longkou",
  "k4": "",
  "k5": "市",
  "k6": 370681,
  "k7": "0535"
}, {
  "id": 1742,
  "name": "莱阳",
  "parent_id": 260,
  "k1": "l",
  "k2": "ly",
  "k3": "laiyang",
  "k4": "",
  "k5": "市",
  "k6": 370682,
  "k7": "0535"
}, {
  "id": 1743,
  "name": "莱州",
  "parent_id": 260,
  "k1": "l",
  "k2": "lz",
  "k3": "laizhou",
  "k4": "",
  "k5": "市",
  "k6": 370683,
  "k7": "0535"
}, {
  "id": 1744,
  "name": "蓬莱",
  "parent_id": 260,
  "k1": "p",
  "k2": "pl",
  "k3": "penglai",
  "k4": "",
  "k5": "市",
  "k6": 370684,
  "k7": "0535"
}, {
  "id": 1745,
  "name": "招远",
  "parent_id": 260,
  "k1": "z",
  "k2": "zy",
  "k3": "zhaoyuan",
  "k4": "",
  "k5": "市",
  "k6": 370685,
  "k7": "0535"
}, {
  "id": 1746,
  "name": "栖霞",
  "parent_id": 260,
  "k1": "q",
  "k2": "qx",
  "k3": "qixia",
  "k4": "",
  "k5": "市",
  "k6": 370686,
  "k7": "0535"
}, {
  "id": 1747,
  "name": "海阳",
  "parent_id": 260,
  "k1": "h",
  "k2": "hy",
  "k3": "haiyang",
  "k4": "",
  "k5": "市",
  "k6": 370687,
  "k7": "0535"
}, {
  "id": 1748,
  "name": "潍城",
  "parent_id": 261,
  "k1": "w",
  "k2": "wc",
  "k3": "weicheng",
  "k4": "",
  "k5": "区",
  "k6": 370702,
  "k7": "0536"
}, {
  "id": 1749,
  "name": "寒亭",
  "parent_id": 261,
  "k1": "h",
  "k2": "ht",
  "k3": "hanting",
  "k4": "",
  "k5": "区",
  "k6": 370703,
  "k7": "0536"
}, {
  "id": 1750,
  "name": "坊子",
  "parent_id": 261,
  "k1": "f",
  "k2": "fz",
  "k3": "fangzi",
  "k4": "",
  "k5": "区",
  "k6": 370704,
  "k7": "0536"
}, {
  "id": 1751,
  "name": "奎文",
  "parent_id": 261,
  "k1": "k",
  "k2": "kw",
  "k3": "kuiwen",
  "k4": "",
  "k5": "区",
  "k6": 370705,
  "k7": "0536"
}, {
  "id": 1752,
  "name": "临朐",
  "parent_id": 261,
  "k1": "l",
  "k2": "lq",
  "k3": "linqu",
  "k4": "",
  "k5": "县",
  "k6": 370724,
  "k7": "0536"
}, {
  "id": 1753,
  "name": "昌乐",
  "parent_id": 261,
  "k1": "c",
  "k2": "cl",
  "k3": "changle",
  "k4": "",
  "k5": "县",
  "k6": 370725,
  "k7": "0536"
}, {
  "id": 1754,
  "name": "青州",
  "parent_id": 261,
  "k1": "q",
  "k2": "qz",
  "k3": "qingzhou",
  "k4": "",
  "k5": "市",
  "k6": 370781,
  "k7": "0536"
}, {
  "id": 1755,
  "name": "诸城",
  "parent_id": 261,
  "k1": "z",
  "k2": "zc",
  "k3": "zhucheng",
  "k4": "",
  "k5": "市",
  "k6": 370782,
  "k7": "0536"
}, {
  "id": 1756,
  "name": "寿光",
  "parent_id": 261,
  "k1": "s",
  "k2": "sg",
  "k3": "shouguang",
  "k4": "",
  "k5": "市",
  "k6": 370783,
  "k7": "0536"
}, {
  "id": 1757,
  "name": "安丘",
  "parent_id": 261,
  "k1": "a",
  "k2": "aq",
  "k3": "anqiu",
  "k4": "",
  "k5": "市",
  "k6": 370784,
  "k7": "0536"
}, {
  "id": 1758,
  "name": "高密",
  "parent_id": 261,
  "k1": "g",
  "k2": "gm",
  "k3": "gaomi",
  "k4": "",
  "k5": "市",
  "k6": 370785,
  "k7": "0536"
}, {
  "id": 1759,
  "name": "昌邑",
  "parent_id": 261,
  "k1": "c",
  "k2": "cy",
  "k3": "changyi",
  "k4": "",
  "k5": "市",
  "k6": 370786,
  "k7": "0536"
}, {
  "id": 1761,
  "name": "任城",
  "parent_id": 262,
  "k1": "r",
  "k2": "rc",
  "k3": "rencheng",
  "k4": "",
  "k5": "区",
  "k6": 370811,
  "k7": "0537"
}, {
  "id": 1762,
  "name": "微山",
  "parent_id": 262,
  "k1": "w",
  "k2": "ws",
  "k3": "weishan",
  "k4": "",
  "k5": "县",
  "k6": 370826,
  "k7": "0537"
}, {
  "id": 1763,
  "name": "鱼台",
  "parent_id": 262,
  "k1": "y",
  "k2": "yt",
  "k3": "yutai",
  "k4": "",
  "k5": "县",
  "k6": 370827,
  "k7": "0537"
}, {
  "id": 1764,
  "name": "金乡",
  "parent_id": 262,
  "k1": "j",
  "k2": "jx",
  "k3": "jinxiang",
  "k4": "",
  "k5": "县",
  "k6": 370828,
  "k7": "0537"
}, {
  "id": 1765,
  "name": "嘉祥",
  "parent_id": 262,
  "k1": "j",
  "k2": "jx",
  "k3": "jiaxiang",
  "k4": "",
  "k5": "县",
  "k6": 370829,
  "k7": "0537"
}, {
  "id": 1766,
  "name": "汶上",
  "parent_id": 262,
  "k1": "w",
  "k2": "ws",
  "k3": "wenshang",
  "k4": "",
  "k5": "县",
  "k6": 370830,
  "k7": "0537"
}, {
  "id": 1767,
  "name": "泗水",
  "parent_id": 262,
  "k1": "s",
  "k2": "ss",
  "k3": "sishui",
  "k4": "",
  "k5": "县",
  "k6": 370831,
  "k7": "0537"
}, {
  "id": 1768,
  "name": "梁山",
  "parent_id": 262,
  "k1": "l",
  "k2": "ls",
  "k3": "liangshan",
  "k4": "",
  "k5": "县",
  "k6": 370832,
  "k7": "0537"
}, {
  "id": 1769,
  "name": "曲阜",
  "parent_id": 262,
  "k1": "q",
  "k2": "qf",
  "k3": "qufu",
  "k4": "",
  "k5": "市",
  "k6": 370881,
  "k7": "0537"
}, {
  "id": 1770,
  "name": "兖州",
  "parent_id": 262,
  "k1": "y",
  "k2": "yz",
  "k3": "yanzhou",
  "k4": "",
  "k5": "区",
  "k6": 370812,
  "k7": "0537"
}, {
  "id": 1771,
  "name": "邹城",
  "parent_id": 262,
  "k1": "z",
  "k2": "zc",
  "k3": "zoucheng",
  "k4": "",
  "k5": "市",
  "k6": 370883,
  "k7": "0537"
}, {
  "id": 1772,
  "name": "泰山",
  "parent_id": 263,
  "k1": "t",
  "k2": "ts",
  "k3": "taishan",
  "k4": "",
  "k5": "区",
  "k6": 370902,
  "k7": "0538"
}, {
  "id": 1773,
  "name": "岱岳",
  "parent_id": 263,
  "k1": "d",
  "k2": "dy",
  "k3": "daiyue",
  "k4": "",
  "k5": "区",
  "k6": 370911,
  "k7": "0538"
}, {
  "id": 1774,
  "name": "宁阳",
  "parent_id": 263,
  "k1": "n",
  "k2": "ny",
  "k3": "ningyang",
  "k4": "",
  "k5": "县",
  "k6": 370921,
  "k7": "0538"
}, {
  "id": 1775,
  "name": "东平",
  "parent_id": 263,
  "k1": "d",
  "k2": "dp",
  "k3": "dongping",
  "k4": "",
  "k5": "县",
  "k6": 370923,
  "k7": "0538"
}, {
  "id": 1776,
  "name": "新泰",
  "parent_id": 263,
  "k1": "x",
  "k2": "xt",
  "k3": "xintai",
  "k4": "",
  "k5": "市",
  "k6": 370982,
  "k7": "0538"
}, {
  "id": 1777,
  "name": "肥城",
  "parent_id": 263,
  "k1": "f",
  "k2": "fc",
  "k3": "feicheng",
  "k4": "",
  "k5": "市",
  "k6": 370983,
  "k7": "0538"
}, {
  "id": 1778,
  "name": "环翠",
  "parent_id": 264,
  "k1": "h",
  "k2": "hc",
  "k3": "huancui",
  "k4": "",
  "k5": "区",
  "k6": 371002,
  "k7": "0631"
}, {
  "id": 1779,
  "name": "文登",
  "parent_id": 264,
  "k1": "w",
  "k2": "wd",
  "k3": "wendeng",
  "k4": "",
  "k5": "区",
  "k6": 371003,
  "k7": "0631"
}, {
  "id": 1780,
  "name": "荣成",
  "parent_id": 264,
  "k1": "r",
  "k2": "rc",
  "k3": "rongcheng",
  "k4": "",
  "k5": "市",
  "k6": 371082,
  "k7": "0631"
}, {
  "id": 1781,
  "name": "乳山",
  "parent_id": 264,
  "k1": "r",
  "k2": "rs",
  "k3": "rushan",
  "k4": "",
  "k5": "市",
  "k6": 371083,
  "k7": "0631"
}, {
  "id": 1782,
  "name": "东港",
  "parent_id": 265,
  "k1": "d",
  "k2": "dg",
  "k3": "donggang",
  "k4": "",
  "k5": "区",
  "k6": 371102,
  "k7": "0633"
}, {
  "id": 1783,
  "name": "岚山",
  "parent_id": 265,
  "k1": "l",
  "k2": "ls",
  "k3": "lanshan",
  "k4": "",
  "k5": "区",
  "k6": 371103,
  "k7": "0633"
}, {
  "id": 1784,
  "name": "五莲",
  "parent_id": 265,
  "k1": "w",
  "k2": "wl",
  "k3": "wulian",
  "k4": "",
  "k5": "县",
  "k6": 371121,
  "k7": "0633"
}, {
  "id": 1785,
  "name": "莒县",
  "parent_id": 265,
  "k1": "j",
  "k2": "jx",
  "k3": "juxian",
  "k4": "",
  "k5": "",
  "k6": 371122,
  "k7": "0633"
}, {
  "id": 1786,
  "name": "莱芜",
  "parent_id": 255,
  "k1": "l",
  "k2": "lw",
  "k3": "laiwu",
  "k4": "",
  "k5": "区",
  "k6": 370116,
  "k7": "0634"
}, {
  "id": 1787,
  "name": "钢城",
  "parent_id": 255,
  "k1": "g",
  "k2": "gc",
  "k3": "gangcheng",
  "k4": "",
  "k5": "区",
  "k6": 370117,
  "k7": "0634"
}, {
  "id": 1788,
  "name": "兰山",
  "parent_id": 267,
  "k1": "l",
  "k2": "ls",
  "k3": "lanshan",
  "k4": "",
  "k5": "区",
  "k6": 371302,
  "k7": "0539"
}, {
  "id": 1789,
  "name": "罗庄",
  "parent_id": 267,
  "k1": "l",
  "k2": "lz",
  "k3": "luozhuang",
  "k4": "",
  "k5": "区",
  "k6": 371311,
  "k7": "0539"
}, {
  "id": 1790,
  "name": "河东",
  "parent_id": 267,
  "k1": "h",
  "k2": "hd",
  "k3": "hedong",
  "k4": "",
  "k5": "区",
  "k6": 371312,
  "k7": "0539"
}, {
  "id": 1791,
  "name": "沂南",
  "parent_id": 267,
  "k1": "y",
  "k2": "yn",
  "k3": "yinan",
  "k4": "",
  "k5": "县",
  "k6": 371321,
  "k7": "0539"
}, {
  "id": 1792,
  "name": "郯城",
  "parent_id": 267,
  "k1": "t",
  "k2": "tc",
  "k3": "tancheng",
  "k4": "",
  "k5": "县",
  "k6": 371322,
  "k7": "0539"
}, {
  "id": 1793,
  "name": "沂水",
  "parent_id": 267,
  "k1": "y",
  "k2": "ys",
  "k3": "yishui",
  "k4": "",
  "k5": "县",
  "k6": 371323,
  "k7": "0539"
}, {
  "id": 1794,
  "name": "兰陵",
  "parent_id": 267,
  "k1": "l",
  "k2": "ll",
  "k3": "lanling",
  "k4": "",
  "k5": "县",
  "k6": 371324,
  "k7": "0539"
}, {
  "id": 1795,
  "name": "费县",
  "parent_id": 267,
  "k1": "f",
  "k2": "fx",
  "k3": "feixian",
  "k4": "",
  "k5": "",
  "k6": 371325,
  "k7": "0539"
}, {
  "id": 1796,
  "name": "平邑",
  "parent_id": 267,
  "k1": "p",
  "k2": "py",
  "k3": "pingyi",
  "k4": "",
  "k5": "县",
  "k6": 371326,
  "k7": "0539"
}, {
  "id": 1797,
  "name": "莒南",
  "parent_id": 267,
  "k1": "j",
  "k2": "jn",
  "k3": "junan",
  "k4": "",
  "k5": "县",
  "k6": 371327,
  "k7": "0539"
}, {
  "id": 1798,
  "name": "蒙阴",
  "parent_id": 267,
  "k1": "m",
  "k2": "my",
  "k3": "mengyin",
  "k4": "",
  "k5": "县",
  "k6": 371328,
  "k7": "0539"
}, {
  "id": 1799,
  "name": "临沭",
  "parent_id": 267,
  "k1": "l",
  "k2": "ls",
  "k3": "linshu",
  "k4": "",
  "k5": "县",
  "k6": 371329,
  "k7": "0539"
}, {
  "id": 1800,
  "name": "德城",
  "parent_id": 268,
  "k1": "d",
  "k2": "dc",
  "k3": "decheng",
  "k4": "",
  "k5": "区",
  "k6": 371402,
  "k7": "0534"
}, {
  "id": 1801,
  "name": "陵城",
  "parent_id": 268,
  "k1": "l",
  "k2": "lc",
  "k3": "lingcheng",
  "k4": "",
  "k5": "区",
  "k6": 371403,
  "k7": "0534"
}, {
  "id": 1802,
  "name": "宁津",
  "parent_id": 268,
  "k1": "n",
  "k2": "nj",
  "k3": "ningjin",
  "k4": "",
  "k5": "县",
  "k6": 371422,
  "k7": "0534"
}, {
  "id": 1803,
  "name": "庆云",
  "parent_id": 268,
  "k1": "q",
  "k2": "qy",
  "k3": "qingyun",
  "k4": "",
  "k5": "县",
  "k6": 371423,
  "k7": "0534"
}, {
  "id": 1804,
  "name": "临邑",
  "parent_id": 268,
  "k1": "l",
  "k2": "ly",
  "k3": "linyi",
  "k4": "",
  "k5": "县",
  "k6": 371424,
  "k7": "0534"
}, {
  "id": 1805,
  "name": "齐河",
  "parent_id": 268,
  "k1": "q",
  "k2": "qh",
  "k3": "qihe",
  "k4": "",
  "k5": "县",
  "k6": 371425,
  "k7": "0534"
}, {
  "id": 1806,
  "name": "平原",
  "parent_id": 268,
  "k1": "p",
  "k2": "py",
  "k3": "pingyuan",
  "k4": "",
  "k5": "县",
  "k6": 371426,
  "k7": "0534"
}, {
  "id": 1807,
  "name": "夏津",
  "parent_id": 268,
  "k1": "x",
  "k2": "xj",
  "k3": "xiajin",
  "k4": "",
  "k5": "县",
  "k6": 371427,
  "k7": "0534"
}, {
  "id": 1808,
  "name": "武城",
  "parent_id": 268,
  "k1": "w",
  "k2": "wc",
  "k3": "wucheng",
  "k4": "",
  "k5": "县",
  "k6": 371428,
  "k7": "0534"
}, {
  "id": 1809,
  "name": "乐陵",
  "parent_id": 268,
  "k1": "l",
  "k2": "ll",
  "k3": "leling",
  "k4": "",
  "k5": "市",
  "k6": 371481,
  "k7": "0534"
}, {
  "id": 1810,
  "name": "禹城",
  "parent_id": 268,
  "k1": "y",
  "k2": "yc",
  "k3": "yucheng",
  "k4": "",
  "k5": "市",
  "k6": 371482,
  "k7": "0534"
}, {
  "id": 1811,
  "name": "东昌府",
  "parent_id": 269,
  "k1": "d",
  "k2": "dcf",
  "k3": "dongchangfu",
  "k4": "",
  "k5": "区",
  "k6": 371502,
  "k7": "0635"
}, {
  "id": 1812,
  "name": "阳谷",
  "parent_id": 269,
  "k1": "y",
  "k2": "yg",
  "k3": "yanggu",
  "k4": "",
  "k5": "县",
  "k6": 371521,
  "k7": "0635"
}, {
  "id": 1813,
  "name": "莘县",
  "parent_id": 269,
  "k1": "x",
  "k2": "xx",
  "k3": "xinxian",
  "k4": "",
  "k5": "",
  "k6": 371522,
  "k7": "0635"
}, {
  "id": 1814,
  "name": "茌平",
  "parent_id": 269,
  "k1": "c",
  "k2": "cp",
  "k3": "chiping",
  "k4": "",
  "k5": "县",
  "k6": 371523,
  "k7": "0635"
}, {
  "id": 1815,
  "name": "东阿",
  "parent_id": 269,
  "k1": "d",
  "k2": "da",
  "k3": "donga",
  "k4": "",
  "k5": "县",
  "k6": 371524,
  "k7": "0635"
}, {
  "id": 1816,
  "name": "冠县",
  "parent_id": 269,
  "k1": "g",
  "k2": "gx",
  "k3": "guanxian",
  "k4": "",
  "k5": "",
  "k6": 371525,
  "k7": "0635"
}, {
  "id": 1817,
  "name": "高唐",
  "parent_id": 269,
  "k1": "g",
  "k2": "gt",
  "k3": "gaotang",
  "k4": "",
  "k5": "县",
  "k6": 371526,
  "k7": "0635"
}, {
  "id": 1818,
  "name": "临清",
  "parent_id": 269,
  "k1": "l",
  "k2": "lq",
  "k3": "linqing",
  "k4": "",
  "k5": "市",
  "k6": 371581,
  "k7": "0635"
}, {
  "id": 1819,
  "name": "滨城",
  "parent_id": 270,
  "k1": "b",
  "k2": "bc",
  "k3": "bincheng",
  "k4": "",
  "k5": "区",
  "k6": 371602,
  "k7": "0543"
}, {
  "id": 1820,
  "name": "惠民",
  "parent_id": 270,
  "k1": "h",
  "k2": "hm",
  "k3": "huimin",
  "k4": "",
  "k5": "县",
  "k6": 371621,
  "k7": "0543"
}, {
  "id": 1821,
  "name": "阳信",
  "parent_id": 270,
  "k1": "y",
  "k2": "yx",
  "k3": "yangxin",
  "k4": "",
  "k5": "县",
  "k6": 371622,
  "k7": "0543"
}, {
  "id": 1822,
  "name": "无棣",
  "parent_id": 270,
  "k1": "w",
  "k2": "wd",
  "k3": "wudi",
  "k4": "",
  "k5": "县",
  "k6": 371623,
  "k7": "0543"
}, {
  "id": 1823,
  "name": "沾化",
  "parent_id": 270,
  "k1": "z",
  "k2": "zh",
  "k3": "zhanhua",
  "k4": "",
  "k5": "区",
  "k6": 371624,
  "k7": "0543"
}, {
  "id": 1824,
  "name": "博兴",
  "parent_id": 270,
  "k1": "b",
  "k2": "bx",
  "k3": "boxing",
  "k4": "",
  "k5": "县",
  "k6": 371625,
  "k7": "0543"
}, {
  "id": 1825,
  "name": "邹平",
  "parent_id": 270,
  "k1": "z",
  "k2": "zp",
  "k3": "zouping",
  "k4": "",
  "k5": "市",
  "k6": 371626,
  "k7": "0543"
}, {
  "id": 1826,
  "name": "牡丹",
  "parent_id": 271,
  "k1": "m",
  "k2": "md",
  "k3": "mudan",
  "k4": "",
  "k5": "区",
  "k6": 371702,
  "k7": "0530"
}, {
  "id": 1827,
  "name": "曹县",
  "parent_id": 271,
  "k1": "c",
  "k2": "cx",
  "k3": "caoxian",
  "k4": "",
  "k5": "",
  "k6": 371721,
  "k7": "0530"
}, {
  "id": 1828,
  "name": "单县",
  "parent_id": 271,
  "k1": "d",
  "k2": "dx",
  "k3": "danxian",
  "k4": "",
  "k5": "",
  "k6": 371722,
  "k7": "0530"
}, {
  "id": 1829,
  "name": "成武",
  "parent_id": 271,
  "k1": "c",
  "k2": "cw",
  "k3": "chengwu",
  "k4": "",
  "k5": "县",
  "k6": 371723,
  "k7": "0530"
}, {
  "id": 1830,
  "name": "巨野",
  "parent_id": 271,
  "k1": "j",
  "k2": "jy",
  "k3": "juye",
  "k4": "",
  "k5": "县",
  "k6": 371724,
  "k7": "0530"
}, {
  "id": 1831,
  "name": "郓城",
  "parent_id": 271,
  "k1": "y",
  "k2": "yc",
  "k3": "yuncheng",
  "k4": "",
  "k5": "县",
  "k6": 371725,
  "k7": "0530"
}, {
  "id": 1832,
  "name": "鄄城",
  "parent_id": 271,
  "k1": "j",
  "k2": "jc",
  "k3": "juancheng",
  "k4": "",
  "k5": "县",
  "k6": 371726,
  "k7": "0530"
}, {
  "id": 1833,
  "name": "定陶",
  "parent_id": 271,
  "k1": "d",
  "k2": "dt",
  "k3": "dingtao",
  "k4": "",
  "k5": "区",
  "k6": 371703,
  "k7": "0530"
}, {
  "id": 1834,
  "name": "东明",
  "parent_id": 271,
  "k1": "d",
  "k2": "dm",
  "k3": "dongming",
  "k4": "",
  "k5": "县",
  "k6": 371728,
  "k7": "0530"
}, {
  "id": 1835,
  "name": "中原",
  "parent_id": 272,
  "k1": "z",
  "k2": "zy",
  "k3": "zhongyuan",
  "k4": "",
  "k5": "区",
  "k6": 410102,
  "k7": "0371"
}, {
  "id": 1836,
  "name": "二七",
  "parent_id": 272,
  "k1": "e",
  "k2": "eq",
  "k3": "erqi",
  "k4": "",
  "k5": "区",
  "k6": 410103,
  "k7": "0371"
}, {
  "id": 1837,
  "name": "管城",
  "parent_id": 272,
  "k1": "g",
  "k2": "gc",
  "k3": "guancheng",
  "k4": "回族",
  "k5": "区",
  "k6": 410104,
  "k7": "0371"
}, {
  "id": 1838,
  "name": "金水",
  "parent_id": 272,
  "k1": "j",
  "k2": "js",
  "k3": "jinshui",
  "k4": "",
  "k5": "区",
  "k6": 410105,
  "k7": "0371"
}, {
  "id": 1839,
  "name": "上街",
  "parent_id": 272,
  "k1": "s",
  "k2": "sj",
  "k3": "shangjie",
  "k4": "",
  "k5": "区",
  "k6": 410106,
  "k7": "0371"
}, {
  "id": 1840,
  "name": "惠济",
  "parent_id": 272,
  "k1": "h",
  "k2": "hj",
  "k3": "huiji",
  "k4": "",
  "k5": "区",
  "k6": 410108,
  "k7": "0371"
}, {
  "id": 1841,
  "name": "中牟",
  "parent_id": 272,
  "k1": "z",
  "k2": "zm",
  "k3": "zhongmou",
  "k4": "",
  "k5": "县",
  "k6": 410122,
  "k7": "0371"
}, {
  "id": 1842,
  "name": "巩义",
  "parent_id": 272,
  "k1": "g",
  "k2": "gy",
  "k3": "gongyi",
  "k4": "",
  "k5": "市",
  "k6": 410181,
  "k7": "0371"
}, {
  "id": 1843,
  "name": "荥阳",
  "parent_id": 272,
  "k1": "y",
  "k2": "yy",
  "k3": "yingyang",
  "k4": "",
  "k5": "市",
  "k6": 410182,
  "k7": "0371"
}, {
  "id": 1844,
  "name": "新密",
  "parent_id": 272,
  "k1": "x",
  "k2": "xm",
  "k3": "xinmi",
  "k4": "",
  "k5": "市",
  "k6": 410183,
  "k7": "0371"
}, {
  "id": 1845,
  "name": "新郑",
  "parent_id": 272,
  "k1": "x",
  "k2": "xz",
  "k3": "xinzheng",
  "k4": "",
  "k5": "市",
  "k6": 410184,
  "k7": "0371"
}, {
  "id": 1846,
  "name": "登封",
  "parent_id": 272,
  "k1": "d",
  "k2": "df",
  "k3": "dengfeng",
  "k4": "",
  "k5": "市",
  "k6": 410185,
  "k7": "0371"
}, {
  "id": 1847,
  "name": "龙亭",
  "parent_id": 273,
  "k1": "l",
  "k2": "lt",
  "k3": "longting",
  "k4": "",
  "k5": "区",
  "k6": 410202,
  "k7": "0378"
}, {
  "id": 1848,
  "name": "顺河",
  "parent_id": 273,
  "k1": "s",
  "k2": "sh",
  "k3": "shunhe",
  "k4": "回族",
  "k5": "区",
  "k6": 410203,
  "k7": "0378"
}, {
  "id": 1849,
  "name": "鼓楼",
  "parent_id": 273,
  "k1": "g",
  "k2": "gl",
  "k3": "gulou",
  "k4": "",
  "k5": "区",
  "k6": 410204,
  "k7": "0378"
}, {
  "id": 1850,
  "name": "禹王台",
  "parent_id": 273,
  "k1": "y",
  "k2": "ywt",
  "k3": "yuwangtai",
  "k4": "",
  "k5": "区",
  "k6": 410205,
  "k7": "0378"
}, {
  "id": 1852,
  "name": "杞县",
  "parent_id": 273,
  "k1": "q",
  "k2": "qx",
  "k3": "qixian",
  "k4": "",
  "k5": "",
  "k6": 410221,
  "k7": "0378"
}, {
  "id": 1853,
  "name": "通许",
  "parent_id": 273,
  "k1": "t",
  "k2": "tx",
  "k3": "tongxu",
  "k4": "",
  "k5": "县",
  "k6": 410222,
  "k7": "0378"
}, {
  "id": 1854,
  "name": "尉氏",
  "parent_id": 273,
  "k1": "w",
  "k2": "ws",
  "k3": "weishi",
  "k4": "",
  "k5": "县",
  "k6": 410223,
  "k7": "0378"
}, {
  "id": 1855,
  "name": "祥符",
  "parent_id": 273,
  "k1": "x",
  "k2": "xf",
  "k3": "kaifeng",
  "k4": "",
  "k5": "区",
  "k6": 410212,
  "k7": "0378"
}, {
  "id": 1856,
  "name": "兰考",
  "parent_id": 273,
  "k1": "l",
  "k2": "lk",
  "k3": "lankao",
  "k4": "",
  "k5": "县",
  "k6": 410225,
  "k7": "0378"
}, {
  "id": 1857,
  "name": "老城",
  "parent_id": 274,
  "k1": "l",
  "k2": "lc",
  "k3": "laocheng",
  "k4": "",
  "k5": "区",
  "k6": 410302,
  "k7": "0376"
}, {
  "id": 1858,
  "name": "西工",
  "parent_id": 274,
  "k1": "x",
  "k2": "xg",
  "k3": "xigong",
  "k4": "",
  "k5": "区",
  "k6": 410303,
  "k7": "0376"
}, {
  "id": 1859,
  "name": "瀍河",
  "parent_id": 274,
  "k1": "c",
  "k2": "ch",
  "k3": "chanhe",
  "k4": "回族",
  "k5": "区",
  "k6": 410304,
  "k7": "0376"
}, {
  "id": 1860,
  "name": "涧西",
  "parent_id": 274,
  "k1": "j",
  "k2": "jx",
  "k3": "jianxi",
  "k4": "",
  "k5": "区",
  "k6": 410305,
  "k7": "0376"
}, {
  "id": 1861,
  "name": "吉利",
  "parent_id": 274,
  "k1": "j",
  "k2": "jl",
  "k3": "jili",
  "k4": "",
  "k5": "区",
  "k6": 410306,
  "k7": "0376"
}, {
  "id": 1862,
  "name": "洛龙",
  "parent_id": 274,
  "k1": "l",
  "k2": "ll",
  "k3": "luolong",
  "k4": "",
  "k5": "区",
  "k6": 410311,
  "k7": "0376"
}, {
  "id": 1863,
  "name": "孟津",
  "parent_id": 274,
  "k1": "m",
  "k2": "mj",
  "k3": "mengjin",
  "k4": "",
  "k5": "县",
  "k6": 410322,
  "k7": "0376"
}, {
  "id": 1864,
  "name": "新安",
  "parent_id": 274,
  "k1": "x",
  "k2": "xa",
  "k3": "xinan",
  "k4": "",
  "k5": "县",
  "k6": 410323,
  "k7": "0376"
}, {
  "id": 1865,
  "name": "栾川",
  "parent_id": 274,
  "k1": "l",
  "k2": "lc",
  "k3": "luanchuan",
  "k4": "",
  "k5": "县",
  "k6": 410324,
  "k7": "0376"
}, {
  "id": 1866,
  "name": "嵩县",
  "parent_id": 274,
  "k1": "s",
  "k2": "sx",
  "k3": "songxian",
  "k4": "",
  "k5": "",
  "k6": 410325,
  "k7": "0376"
}, {
  "id": 1867,
  "name": "汝阳",
  "parent_id": 274,
  "k1": "r",
  "k2": "ry",
  "k3": "ruyang",
  "k4": "",
  "k5": "县",
  "k6": 410326,
  "k7": "0376"
}, {
  "id": 1868,
  "name": "宜阳",
  "parent_id": 274,
  "k1": "y",
  "k2": "yy",
  "k3": "yiyang",
  "k4": "",
  "k5": "县",
  "k6": 410327,
  "k7": "0376"
}, {
  "id": 1869,
  "name": "洛宁",
  "parent_id": 274,
  "k1": "l",
  "k2": "ln",
  "k3": "luoning",
  "k4": "",
  "k5": "县",
  "k6": 410328,
  "k7": "0376"
}, {
  "id": 1870,
  "name": "伊川",
  "parent_id": 274,
  "k1": "y",
  "k2": "yc",
  "k3": "yichuan",
  "k4": "",
  "k5": "县",
  "k6": 410329,
  "k7": "0376"
}, {
  "id": 1871,
  "name": "偃师",
  "parent_id": 274,
  "k1": "y",
  "k2": "ys",
  "k3": "yanshi",
  "k4": "",
  "k5": "市",
  "k6": 410381,
  "k7": "0376"
}, {
  "id": 1872,
  "name": "新华",
  "parent_id": 275,
  "k1": "x",
  "k2": "xh",
  "k3": "xinhua",
  "k4": "",
  "k5": "区",
  "k6": 410402,
  "k7": "0375"
}, {
  "id": 1873,
  "name": "卫东",
  "parent_id": 275,
  "k1": "w",
  "k2": "wd",
  "k3": "weidong",
  "k4": "",
  "k5": "区",
  "k6": 410403,
  "k7": "0375"
}, {
  "id": 1874,
  "name": "石龙",
  "parent_id": 275,
  "k1": "s",
  "k2": "sl",
  "k3": "shilong",
  "k4": "",
  "k5": "区",
  "k6": 410404,
  "k7": "0375"
}, {
  "id": 1875,
  "name": "湛河",
  "parent_id": 275,
  "k1": "z",
  "k2": "zh",
  "k3": "zhanhe",
  "k4": "",
  "k5": "区",
  "k6": 410411,
  "k7": "0375"
}, {
  "id": 1876,
  "name": "宝丰",
  "parent_id": 275,
  "k1": "b",
  "k2": "bf",
  "k3": "baofeng",
  "k4": "",
  "k5": "县",
  "k6": 410421,
  "k7": "0375"
}, {
  "id": 1877,
  "name": "叶县",
  "parent_id": 275,
  "k1": "y",
  "k2": "yx",
  "k3": "yexian",
  "k4": "",
  "k5": "",
  "k6": 410422,
  "k7": "0375"
}, {
  "id": 1878,
  "name": "鲁山",
  "parent_id": 275,
  "k1": "l",
  "k2": "ls",
  "k3": "lushan",
  "k4": "",
  "k5": "县",
  "k6": 410423,
  "k7": "0375"
}, {
  "id": 1879,
  "name": "郏县",
  "parent_id": 275,
  "k1": "j",
  "k2": "jx",
  "k3": "jiaxian",
  "k4": "",
  "k5": "",
  "k6": 410425,
  "k7": "0375"
}, {
  "id": 1880,
  "name": "舞钢",
  "parent_id": 275,
  "k1": "w",
  "k2": "wg",
  "k3": "wugang",
  "k4": "",
  "k5": "市",
  "k6": 410481,
  "k7": "0375"
}, {
  "id": 1881,
  "name": "汝州",
  "parent_id": 275,
  "k1": "r",
  "k2": "rz",
  "k3": "ruzhou",
  "k4": "",
  "k5": "市",
  "k6": 410482,
  "k7": "0375"
}, {
  "id": 1882,
  "name": "文峰",
  "parent_id": 276,
  "k1": "w",
  "k2": "wf",
  "k3": "wenfeng",
  "k4": "",
  "k5": "区",
  "k6": 410502,
  "k7": "0372"
}, {
  "id": 1883,
  "name": "北关",
  "parent_id": 276,
  "k1": "b",
  "k2": "bg",
  "k3": "beiguan",
  "k4": "",
  "k5": "区",
  "k6": 410503,
  "k7": "0372"
}, {
  "id": 1884,
  "name": "殷都",
  "parent_id": 276,
  "k1": "y",
  "k2": "yd",
  "k3": "yindu",
  "k4": "",
  "k5": "区",
  "k6": 410505,
  "k7": "0372"
}, {
  "id": 1885,
  "name": "龙安",
  "parent_id": 276,
  "k1": "l",
  "k2": "la",
  "k3": "longan",
  "k4": "",
  "k5": "区",
  "k6": 410506,
  "k7": "0372"
}, {
  "id": 1886,
  "name": "安阳",
  "parent_id": 276,
  "k1": "a",
  "k2": "ay",
  "k3": "anyang",
  "k4": "",
  "k5": "县",
  "k6": 410522,
  "k7": "0372"
}, {
  "id": 1887,
  "name": "汤阴",
  "parent_id": 276,
  "k1": "t",
  "k2": "ty",
  "k3": "tangyin",
  "k4": "",
  "k5": "县",
  "k6": 410523,
  "k7": "0372"
}, {
  "id": 1888,
  "name": "滑县",
  "parent_id": 276,
  "k1": "h",
  "k2": "hx",
  "k3": "huaxian",
  "k4": "",
  "k5": "",
  "k6": 410526,
  "k7": "0372"
}, {
  "id": 1889,
  "name": "内黄",
  "parent_id": 276,
  "k1": "n",
  "k2": "nh",
  "k3": "neihuang",
  "k4": "",
  "k5": "县",
  "k6": 410527,
  "k7": "0372"
}, {
  "id": 1890,
  "name": "林州",
  "parent_id": 276,
  "k1": "l",
  "k2": "lz",
  "k3": "linzhou",
  "k4": "",
  "k5": "市",
  "k6": 410581,
  "k7": "0372"
}, {
  "id": 1891,
  "name": "鹤山",
  "parent_id": 277,
  "k1": "h",
  "k2": "hs",
  "k3": "heshan",
  "k4": "",
  "k5": "区",
  "k6": 410602,
  "k7": "0392"
}, {
  "id": 1892,
  "name": "山城",
  "parent_id": 277,
  "k1": "s",
  "k2": "sc",
  "k3": "shancheng",
  "k4": "",
  "k5": "区",
  "k6": 410603,
  "k7": "0392"
}, {
  "id": 1893,
  "name": "淇滨",
  "parent_id": 277,
  "k1": "q",
  "k2": "qb",
  "k3": "qibin",
  "k4": "",
  "k5": "区",
  "k6": 410611,
  "k7": "0392"
}, {
  "id": 1894,
  "name": "浚县",
  "parent_id": 277,
  "k1": "j",
  "k2": "jx",
  "k3": "junxian",
  "k4": "",
  "k5": "",
  "k6": 410621,
  "k7": "0392"
}, {
  "id": 1895,
  "name": "淇县",
  "parent_id": 277,
  "k1": "q",
  "k2": "qx",
  "k3": "qixian",
  "k4": "",
  "k5": "",
  "k6": 410622,
  "k7": "0392"
}, {
  "id": 1896,
  "name": "红旗",
  "parent_id": 278,
  "k1": "h",
  "k2": "hq",
  "k3": "hongqi",
  "k4": "",
  "k5": "区",
  "k6": 410702,
  "k7": "0373"
}, {
  "id": 1897,
  "name": "卫滨",
  "parent_id": 278,
  "k1": "w",
  "k2": "wb",
  "k3": "weibin",
  "k4": "",
  "k5": "区",
  "k6": 410703,
  "k7": "0373"
}, {
  "id": 1898,
  "name": "凤泉",
  "parent_id": 278,
  "k1": "f",
  "k2": "fq",
  "k3": "fengquan",
  "k4": "",
  "k5": "区",
  "k6": 410704,
  "k7": "0373"
}, {
  "id": 1899,
  "name": "牧野",
  "parent_id": 278,
  "k1": "m",
  "k2": "my",
  "k3": "muye",
  "k4": "",
  "k5": "区",
  "k6": 410711,
  "k7": "0373"
}, {
  "id": 1900,
  "name": "新乡",
  "parent_id": 278,
  "k1": "x",
  "k2": "xx",
  "k3": "xinxiang",
  "k4": "",
  "k5": "县",
  "k6": 410721,
  "k7": "0373"
}, {
  "id": 1901,
  "name": "获嘉",
  "parent_id": 278,
  "k1": "h",
  "k2": "hj",
  "k3": "huojia",
  "k4": "",
  "k5": "县",
  "k6": 410724,
  "k7": "0373"
}, {
  "id": 1902,
  "name": "原阳",
  "parent_id": 278,
  "k1": "y",
  "k2": "yy",
  "k3": "yuanyang",
  "k4": "",
  "k5": "县",
  "k6": 410725,
  "k7": "0373"
}, {
  "id": 1903,
  "name": "延津",
  "parent_id": 278,
  "k1": "y",
  "k2": "yj",
  "k3": "yanjin",
  "k4": "",
  "k5": "县",
  "k6": 410726,
  "k7": "0373"
}, {
  "id": 1904,
  "name": "封丘",
  "parent_id": 278,
  "k1": "f",
  "k2": "fq",
  "k3": "fengqiu",
  "k4": "",
  "k5": "县",
  "k6": 410727,
  "k7": "0373"
}, {
  "id": 1905,
  "name": "长垣",
  "parent_id": 278,
  "k1": "c",
  "k2": "cy",
  "k3": "changyuan",
  "k4": "",
  "k5": "县",
  "k6": 410728,
  "k7": "0373"
}, {
  "id": 1906,
  "name": "卫辉",
  "parent_id": 278,
  "k1": "w",
  "k2": "wh",
  "k3": "weihui",
  "k4": "",
  "k5": "市",
  "k6": 410781,
  "k7": "0373"
}, {
  "id": 1907,
  "name": "辉县",
  "parent_id": 278,
  "k1": "h",
  "k2": "hx",
  "k3": "huixian",
  "k4": "",
  "k5": "市",
  "k6": 410782,
  "k7": "0373"
}, {
  "id": 1908,
  "name": "解放",
  "parent_id": 279,
  "k1": "j",
  "k2": "jf",
  "k3": "jiefang",
  "k4": "",
  "k5": "区",
  "k6": 410802,
  "k7": "0391"
}, {
  "id": 1909,
  "name": "中站",
  "parent_id": 279,
  "k1": "z",
  "k2": "zz",
  "k3": "zhongzhan",
  "k4": "",
  "k5": "区",
  "k6": 410803,
  "k7": "0391"
}, {
  "id": 1910,
  "name": "马村",
  "parent_id": 279,
  "k1": "m",
  "k2": "mc",
  "k3": "macun",
  "k4": "",
  "k5": "区",
  "k6": 410804,
  "k7": "0391"
}, {
  "id": 1911,
  "name": "山阳",
  "parent_id": 279,
  "k1": "s",
  "k2": "sy",
  "k3": "shanyang",
  "k4": "",
  "k5": "区",
  "k6": 410811,
  "k7": "0391"
}, {
  "id": 1912,
  "name": "修武",
  "parent_id": 279,
  "k1": "x",
  "k2": "xw",
  "k3": "xiuwu",
  "k4": "",
  "k5": "县",
  "k6": 410821,
  "k7": "0391"
}, {
  "id": 1913,
  "name": "博爱",
  "parent_id": 279,
  "k1": "b",
  "k2": "ba",
  "k3": "boai",
  "k4": "",
  "k5": "县",
  "k6": 410822,
  "k7": "0391"
}, {
  "id": 1914,
  "name": "武陟",
  "parent_id": 279,
  "k1": "w",
  "k2": "wz",
  "k3": "wuzhi",
  "k4": "",
  "k5": "县",
  "k6": 410823,
  "k7": "0391"
}, {
  "id": 1915,
  "name": "温县",
  "parent_id": 279,
  "k1": "w",
  "k2": "wx",
  "k3": "wenxian",
  "k4": "",
  "k5": "",
  "k6": 410825,
  "k7": "0391"
}, {
  "id": 1916,
  "name": "沁阳",
  "parent_id": 279,
  "k1": "q",
  "k2": "qy",
  "k3": "qinyang",
  "k4": "",
  "k5": "市",
  "k6": 410882,
  "k7": "0391"
}, {
  "id": 1917,
  "name": "孟州",
  "parent_id": 279,
  "k1": "m",
  "k2": "mz",
  "k3": "mengzhou",
  "k4": "",
  "k5": "市",
  "k6": 410883,
  "k7": "0391"
}, {
  "id": 1918,
  "name": "华龙",
  "parent_id": 280,
  "k1": "h",
  "k2": "hl",
  "k3": "hualong",
  "k4": "",
  "k5": "区",
  "k6": 410902,
  "k7": ""
}, {
  "id": 1919,
  "name": "清丰",
  "parent_id": 280,
  "k1": "q",
  "k2": "qf",
  "k3": "qingfeng",
  "k4": "",
  "k5": "县",
  "k6": 410922,
  "k7": ""
}, {
  "id": 1920,
  "name": "南乐",
  "parent_id": 280,
  "k1": "n",
  "k2": "nl",
  "k3": "nanle",
  "k4": "",
  "k5": "县",
  "k6": 410923,
  "k7": ""
}, {
  "id": 1921,
  "name": "范县",
  "parent_id": 280,
  "k1": "f",
  "k2": "fx",
  "k3": "fanxian",
  "k4": "",
  "k5": "",
  "k6": 410926,
  "k7": ""
}, {
  "id": 1922,
  "name": "台前",
  "parent_id": 280,
  "k1": "t",
  "k2": "tq",
  "k3": "taiqian",
  "k4": "",
  "k5": "县",
  "k6": 410927,
  "k7": ""
}, {
  "id": 1923,
  "name": "濮阳",
  "parent_id": 280,
  "k1": "p",
  "k2": "py",
  "k3": "puyang",
  "k4": "",
  "k5": "县",
  "k6": 410928,
  "k7": ""
}, {
  "id": 1924,
  "name": "魏都",
  "parent_id": 281,
  "k1": "w",
  "k2": "wd",
  "k3": "weidu",
  "k4": "",
  "k5": "区",
  "k6": 411002,
  "k7": "0374"
}, {
  "id": 1925,
  "name": "建安",
  "parent_id": 281,
  "k1": "j",
  "k2": "ja",
  "k3": "jianan",
  "k4": "",
  "k5": "区",
  "k6": 411003,
  "k7": "0374"
}, {
  "id": 1926,
  "name": "鄢陵",
  "parent_id": 281,
  "k1": "y",
  "k2": "yl",
  "k3": "yanling",
  "k4": "",
  "k5": "县",
  "k6": 411024,
  "k7": "0374"
}, {
  "id": 1927,
  "name": "襄城",
  "parent_id": 281,
  "k1": "x",
  "k2": "xc",
  "k3": "xiangcheng",
  "k4": "",
  "k5": "县",
  "k6": 411025,
  "k7": "0374"
}, {
  "id": 1928,
  "name": "禹州",
  "parent_id": 281,
  "k1": "y",
  "k2": "yz",
  "k3": "yuzhou",
  "k4": "",
  "k5": "市",
  "k6": 411081,
  "k7": "0374"
}, {
  "id": 1929,
  "name": "长葛",
  "parent_id": 281,
  "k1": "c",
  "k2": "cg",
  "k3": "changge",
  "k4": "",
  "k5": "市",
  "k6": 411082,
  "k7": "0374"
}, {
  "id": 1930,
  "name": "源汇",
  "parent_id": 282,
  "k1": "y",
  "k2": "yh",
  "k3": "yuanhui",
  "k4": "",
  "k5": "区",
  "k6": 411102,
  "k7": "0395"
}, {
  "id": 1931,
  "name": "郾城",
  "parent_id": 282,
  "k1": "y",
  "k2": "yc",
  "k3": "yancheng",
  "k4": "",
  "k5": "区",
  "k6": 411103,
  "k7": "0395"
}, {
  "id": 1932,
  "name": "召陵",
  "parent_id": 282,
  "k1": "z",
  "k2": "zl",
  "k3": "zhaoling",
  "k4": "",
  "k5": "区",
  "k6": 411104,
  "k7": "0395"
}, {
  "id": 1933,
  "name": "舞阳",
  "parent_id": 282,
  "k1": "w",
  "k2": "wy",
  "k3": "wuyang",
  "k4": "",
  "k5": "县",
  "k6": 411121,
  "k7": "0395"
}, {
  "id": 1934,
  "name": "临颍",
  "parent_id": 282,
  "k1": "l",
  "k2": "ly",
  "k3": "linying",
  "k4": "",
  "k5": "县",
  "k6": 411122,
  "k7": "0395"
}, {
  "id": 1935,
  "name": "湖滨",
  "parent_id": 283,
  "k1": "h",
  "k2": "hb",
  "k3": "hubin",
  "k4": "",
  "k5": "区",
  "k6": 411202,
  "k7": "0398"
}, {
  "id": 1936,
  "name": "渑池",
  "parent_id": 283,
  "k1": "m",
  "k2": "mc",
  "k3": "mianchi",
  "k4": "",
  "k5": "县",
  "k6": 411221,
  "k7": "0398"
}, {
  "id": 1937,
  "name": "陕州",
  "parent_id": 283,
  "k1": "s",
  "k2": "sz",
  "k3": "shanzhou",
  "k4": "",
  "k5": "区",
  "k6": 411222,
  "k7": "0398"
}, {
  "id": 1938,
  "name": "卢氏",
  "parent_id": 283,
  "k1": "l",
  "k2": "ls",
  "k3": "lushi",
  "k4": "",
  "k5": "县",
  "k6": 411224,
  "k7": "0398"
}, {
  "id": 1939,
  "name": "义马",
  "parent_id": 283,
  "k1": "y",
  "k2": "ym",
  "k3": "yima",
  "k4": "",
  "k5": "市",
  "k6": 411281,
  "k7": "0398"
}, {
  "id": 1940,
  "name": "灵宝",
  "parent_id": 283,
  "k1": "l",
  "k2": "lb",
  "k3": "lingbao",
  "k4": "",
  "k5": "市",
  "k6": 411282,
  "k7": "0398"
}, {
  "id": 1941,
  "name": "宛城",
  "parent_id": 284,
  "k1": "w",
  "k2": "wc",
  "k3": "wancheng",
  "k4": "",
  "k5": "区",
  "k6": 411302,
  "k7": "0377"
}, {
  "id": 1942,
  "name": "卧龙",
  "parent_id": 284,
  "k1": "w",
  "k2": "wl",
  "k3": "wolong",
  "k4": "",
  "k5": "区",
  "k6": 411303,
  "k7": "0377"
}, {
  "id": 1943,
  "name": "南召",
  "parent_id": 284,
  "k1": "n",
  "k2": "nz",
  "k3": "nanzhao",
  "k4": "",
  "k5": "县",
  "k6": 411321,
  "k7": "0377"
}, {
  "id": 1944,
  "name": "方城",
  "parent_id": 284,
  "k1": "f",
  "k2": "fc",
  "k3": "fangcheng",
  "k4": "",
  "k5": "县",
  "k6": 411322,
  "k7": "0377"
}, {
  "id": 1945,
  "name": "西峡",
  "parent_id": 284,
  "k1": "x",
  "k2": "xx",
  "k3": "xixia",
  "k4": "",
  "k5": "县",
  "k6": 411323,
  "k7": "0377"
}, {
  "id": 1946,
  "name": "镇平",
  "parent_id": 284,
  "k1": "z",
  "k2": "zp",
  "k3": "zhenping",
  "k4": "",
  "k5": "县",
  "k6": 411324,
  "k7": "0377"
}, {
  "id": 1947,
  "name": "内乡",
  "parent_id": 284,
  "k1": "n",
  "k2": "nx",
  "k3": "neixiang",
  "k4": "",
  "k5": "县",
  "k6": 411325,
  "k7": "0377"
}, {
  "id": 1948,
  "name": "淅川",
  "parent_id": 284,
  "k1": "x",
  "k2": "xc",
  "k3": "xichuan",
  "k4": "",
  "k5": "县",
  "k6": 411326,
  "k7": "0377"
}, {
  "id": 1949,
  "name": "社旗",
  "parent_id": 284,
  "k1": "s",
  "k2": "sq",
  "k3": "sheqi",
  "k4": "",
  "k5": "县",
  "k6": 411327,
  "k7": "0377"
}, {
  "id": 1950,
  "name": "唐河",
  "parent_id": 284,
  "k1": "t",
  "k2": "th",
  "k3": "tanghe",
  "k4": "",
  "k5": "县",
  "k6": 411328,
  "k7": "0377"
}, {
  "id": 1951,
  "name": "新野",
  "parent_id": 284,
  "k1": "x",
  "k2": "xy",
  "k3": "xinye",
  "k4": "",
  "k5": "县",
  "k6": 411329,
  "k7": "0377"
}, {
  "id": 1952,
  "name": "桐柏",
  "parent_id": 284,
  "k1": "t",
  "k2": "tb",
  "k3": "tongbo",
  "k4": "",
  "k5": "县",
  "k6": 411330,
  "k7": "0377"
}, {
  "id": 1953,
  "name": "邓州",
  "parent_id": 284,
  "k1": "d",
  "k2": "dz",
  "k3": "dengzhou",
  "k4": "",
  "k5": "市",
  "k6": 411381,
  "k7": "0377"
}, {
  "id": 1954,
  "name": "粱园",
  "parent_id": 285,
  "k1": "l",
  "k2": "ly",
  "k3": "liangyuan",
  "k4": "",
  "k5": "区",
  "k6": 411402,
  "k7": "0370"
}, {
  "id": 1955,
  "name": "睢阳",
  "parent_id": 285,
  "k1": "s",
  "k2": "sy",
  "k3": "suiyang",
  "k4": "",
  "k5": "区",
  "k6": 411403,
  "k7": "0370"
}, {
  "id": 1956,
  "name": "民权",
  "parent_id": 285,
  "k1": "m",
  "k2": "mq",
  "k3": "minquan",
  "k4": "",
  "k5": "县",
  "k6": 411421,
  "k7": "0370"
}, {
  "id": 1957,
  "name": "睢县",
  "parent_id": 285,
  "k1": "s",
  "k2": "sx",
  "k3": "suixian",
  "k4": "",
  "k5": "",
  "k6": 411422,
  "k7": "0370"
}, {
  "id": 1958,
  "name": "宁陵",
  "parent_id": 285,
  "k1": "n",
  "k2": "nl",
  "k3": "ningling",
  "k4": "",
  "k5": "县",
  "k6": 411423,
  "k7": "0370"
}, {
  "id": 1959,
  "name": "柘城",
  "parent_id": 285,
  "k1": "z",
  "k2": "zc",
  "k3": "zhecheng",
  "k4": "",
  "k5": "县",
  "k6": 411424,
  "k7": "0370"
}, {
  "id": 1960,
  "name": "虞城",
  "parent_id": 285,
  "k1": "y",
  "k2": "yc",
  "k3": "yucheng",
  "k4": "",
  "k5": "县",
  "k6": 411425,
  "k7": "0370"
}, {
  "id": 1961,
  "name": "夏邑",
  "parent_id": 285,
  "k1": "x",
  "k2": "xy",
  "k3": "xiayi",
  "k4": "",
  "k5": "县",
  "k6": 411426,
  "k7": "0370"
}, {
  "id": 1962,
  "name": "永城",
  "parent_id": 285,
  "k1": "y",
  "k2": "yc",
  "k3": "yongcheng",
  "k4": "",
  "k5": "市",
  "k6": 411481,
  "k7": "0370"
}, {
  "id": 1963,
  "name": "浉河",
  "parent_id": 286,
  "k1": "s",
  "k2": "sh",
  "k3": "shihe",
  "k4": "",
  "k5": "区",
  "k6": 411502,
  "k7": "0376"
}, {
  "id": 1964,
  "name": "平桥",
  "parent_id": 286,
  "k1": "p",
  "k2": "pq",
  "k3": "pingqiao",
  "k4": "",
  "k5": "区",
  "k6": 411503,
  "k7": "0376"
}, {
  "id": 1965,
  "name": "罗山",
  "parent_id": 286,
  "k1": "l",
  "k2": "ls",
  "k3": "luoshan",
  "k4": "",
  "k5": "县",
  "k6": 411521,
  "k7": "0376"
}, {
  "id": 1966,
  "name": "光山",
  "parent_id": 286,
  "k1": "g",
  "k2": "gs",
  "k3": "guangshan",
  "k4": "",
  "k5": "县",
  "k6": 411522,
  "k7": "0376"
}, {
  "id": 1967,
  "name": "新县",
  "parent_id": 286,
  "k1": "x",
  "k2": "xx",
  "k3": "xinxian",
  "k4": "",
  "k5": "",
  "k6": 411523,
  "k7": "0376"
}, {
  "id": 1968,
  "name": "商城",
  "parent_id": 286,
  "k1": "s",
  "k2": "sc",
  "k3": "shangcheng",
  "k4": "",
  "k5": "县",
  "k6": 411524,
  "k7": "0376"
}, {
  "id": 1969,
  "name": "固始",
  "parent_id": 286,
  "k1": "g",
  "k2": "gs",
  "k3": "gushi",
  "k4": "",
  "k5": "县",
  "k6": 411525,
  "k7": "0376"
}, {
  "id": 1970,
  "name": "潢川",
  "parent_id": 286,
  "k1": "h",
  "k2": "hc",
  "k3": "huangchuan",
  "k4": "",
  "k5": "县",
  "k6": 411526,
  "k7": "0376"
}, {
  "id": 1971,
  "name": "淮滨",
  "parent_id": 286,
  "k1": "h",
  "k2": "hb",
  "k3": "huaibin",
  "k4": "",
  "k5": "县",
  "k6": 411527,
  "k7": "0376"
}, {
  "id": 1972,
  "name": "息县",
  "parent_id": 286,
  "k1": "x",
  "k2": "xx",
  "k3": "xixian",
  "k4": "",
  "k5": "",
  "k6": 411528,
  "k7": "0376"
}, {
  "id": 1973,
  "name": "川汇",
  "parent_id": 287,
  "k1": "c",
  "k2": "ch",
  "k3": "chuanhui",
  "k4": "",
  "k5": "区",
  "k6": 411602,
  "k7": "0394"
}, {
  "id": 1974,
  "name": "扶沟",
  "parent_id": 287,
  "k1": "f",
  "k2": "fg",
  "k3": "fugou",
  "k4": "",
  "k5": "县",
  "k6": 411621,
  "k7": "0394"
}, {
  "id": 1975,
  "name": "西华",
  "parent_id": 287,
  "k1": "x",
  "k2": "xh",
  "k3": "xihua",
  "k4": "",
  "k5": "县",
  "k6": 411622,
  "k7": "0394"
}, {
  "id": 1976,
  "name": "商水",
  "parent_id": 287,
  "k1": "s",
  "k2": "ss",
  "k3": "shangshui",
  "k4": "",
  "k5": "县",
  "k6": 411623,
  "k7": "0394"
}, {
  "id": 1977,
  "name": "沈丘",
  "parent_id": 287,
  "k1": "s",
  "k2": "sq",
  "k3": "shenqiu",
  "k4": "",
  "k5": "县",
  "k6": 411624,
  "k7": "0394"
}, {
  "id": 1978,
  "name": "郸城",
  "parent_id": 287,
  "k1": "d",
  "k2": "dc",
  "k3": "dancheng",
  "k4": "",
  "k5": "县",
  "k6": 411625,
  "k7": "0394"
}, {
  "id": 1979,
  "name": "淮阳",
  "parent_id": 287,
  "k1": "h",
  "k2": "hy",
  "k3": "huaiyang",
  "k4": "",
  "k5": "县",
  "k6": 411626,
  "k7": "0394"
}, {
  "id": 1980,
  "name": "太康",
  "parent_id": 287,
  "k1": "t",
  "k2": "tk",
  "k3": "taikang",
  "k4": "",
  "k5": "县",
  "k6": 411627,
  "k7": "0394"
}, {
  "id": 1981,
  "name": "鹿邑",
  "parent_id": 287,
  "k1": "l",
  "k2": "ly",
  "k3": "luyi",
  "k4": "",
  "k5": "县",
  "k6": 411628,
  "k7": "0394"
}, {
  "id": 1982,
  "name": "项城",
  "parent_id": 287,
  "k1": "x",
  "k2": "xc",
  "k3": "xiangcheng",
  "k4": "",
  "k5": "市",
  "k6": 411681,
  "k7": "0394"
}, {
  "id": 1983,
  "name": "驿城",
  "parent_id": 288,
  "k1": "y",
  "k2": "yc",
  "k3": "yicheng",
  "k4": "",
  "k5": "区",
  "k6": 411702,
  "k7": "0396"
}, {
  "id": 1984,
  "name": "西平",
  "parent_id": 288,
  "k1": "x",
  "k2": "xp",
  "k3": "xiping",
  "k4": "",
  "k5": "县",
  "k6": 411721,
  "k7": "0396"
}, {
  "id": 1985,
  "name": "上蔡",
  "parent_id": 288,
  "k1": "s",
  "k2": "sc",
  "k3": "shangcai",
  "k4": "",
  "k5": "县",
  "k6": 411722,
  "k7": "0396"
}, {
  "id": 1986,
  "name": "平舆",
  "parent_id": 288,
  "k1": "p",
  "k2": "py",
  "k3": "pingyu",
  "k4": "",
  "k5": "县",
  "k6": 411723,
  "k7": "0396"
}, {
  "id": 1987,
  "name": "正阳",
  "parent_id": 288,
  "k1": "z",
  "k2": "zy",
  "k3": "zhengyang",
  "k4": "",
  "k5": "县",
  "k6": 411724,
  "k7": "0396"
}, {
  "id": 1988,
  "name": "确山",
  "parent_id": 288,
  "k1": "q",
  "k2": "qs",
  "k3": "queshan",
  "k4": "",
  "k5": "县",
  "k6": 411725,
  "k7": "0396"
}, {
  "id": 1989,
  "name": "泌阳",
  "parent_id": 288,
  "k1": "m",
  "k2": "my",
  "k3": "miyang",
  "k4": "",
  "k5": "县",
  "k6": 411726,
  "k7": "0396"
}, {
  "id": 1990,
  "name": "汝南",
  "parent_id": 288,
  "k1": "r",
  "k2": "rn",
  "k3": "runan",
  "k4": "",
  "k5": "县",
  "k6": 411727,
  "k7": "0396"
}, {
  "id": 1991,
  "name": "遂平",
  "parent_id": 288,
  "k1": "s",
  "k2": "sp",
  "k3": "suiping",
  "k4": "",
  "k5": "县",
  "k6": 411728,
  "k7": "0396"
}, {
  "id": 1992,
  "name": "新蔡",
  "parent_id": 288,
  "k1": "x",
  "k2": "xc",
  "k3": "xincai",
  "k4": "",
  "k5": "县",
  "k6": 411729,
  "k7": "0396"
}, {
  "id": 1993,
  "name": "江岸",
  "parent_id": 290,
  "k1": "j",
  "k2": "ja",
  "k3": "jiangan",
  "k4": "",
  "k5": "区",
  "k6": 420102,
  "k7": "027"
}, {
  "id": 1994,
  "name": "江汉",
  "parent_id": 290,
  "k1": "j",
  "k2": "jh",
  "k3": "jianghan",
  "k4": "",
  "k5": "区",
  "k6": 420103,
  "k7": "027"
}, {
  "id": 1995,
  "name": "硚口",
  "parent_id": 290,
  "k1": "q",
  "k2": "qk",
  "k3": "qiaokou",
  "k4": "",
  "k5": "区",
  "k6": 420104,
  "k7": "027"
}, {
  "id": 1996,
  "name": "汉阳",
  "parent_id": 290,
  "k1": "h",
  "k2": "hy",
  "k3": "hanyang",
  "k4": "",
  "k5": "区",
  "k6": 420105,
  "k7": "027"
}, {
  "id": 1997,
  "name": "武昌",
  "parent_id": 290,
  "k1": "w",
  "k2": "wc",
  "k3": "wuchang",
  "k4": "",
  "k5": "区",
  "k6": 420106,
  "k7": "027"
}, {
  "id": 1998,
  "name": "青山",
  "parent_id": 290,
  "k1": "q",
  "k2": "qs",
  "k3": "qingshan",
  "k4": "",
  "k5": "区",
  "k6": 420107,
  "k7": "027"
}, {
  "id": 1999,
  "name": "洪山",
  "parent_id": 290,
  "k1": "h",
  "k2": "hs",
  "k3": "hongshan",
  "k4": "",
  "k5": "区",
  "k6": 420111,
  "k7": "027"
}, {
  "id": 2000,
  "name": "东西湖",
  "parent_id": 290,
  "k1": "d",
  "k2": "dxh",
  "k3": "dongxihu",
  "k4": "",
  "k5": "区",
  "k6": 420112,
  "k7": "027"
}, {
  "id": 2001,
  "name": "汉南",
  "parent_id": 290,
  "k1": "h",
  "k2": "hn",
  "k3": "hannan",
  "k4": "",
  "k5": "区",
  "k6": 420113,
  "k7": "027"
}, {
  "id": 2002,
  "name": "蔡甸",
  "parent_id": 290,
  "k1": "c",
  "k2": "cd",
  "k3": "caidian",
  "k4": "",
  "k5": "区",
  "k6": 420114,
  "k7": "027"
}, {
  "id": 2003,
  "name": "江夏",
  "parent_id": 290,
  "k1": "j",
  "k2": "jx",
  "k3": "jiangxia",
  "k4": "",
  "k5": "区",
  "k6": 420115,
  "k7": "027"
}, {
  "id": 2004,
  "name": "黄陂",
  "parent_id": 290,
  "k1": "h",
  "k2": "hp",
  "k3": "huangpo",
  "k4": "",
  "k5": "区",
  "k6": 420116,
  "k7": "027"
}, {
  "id": 2005,
  "name": "新洲",
  "parent_id": 290,
  "k1": "x",
  "k2": "xz",
  "k3": "xinzhou",
  "k4": "",
  "k5": "区",
  "k6": 420117,
  "k7": "027"
}, {
  "id": 2006,
  "name": "黄石港",
  "parent_id": 291,
  "k1": "h",
  "k2": "hsg",
  "k3": "huangshigang",
  "k4": "",
  "k5": "区",
  "k6": 420202,
  "k7": "0714"
}, {
  "id": 2007,
  "name": "西塞山",
  "parent_id": 291,
  "k1": "x",
  "k2": "xss",
  "k3": "xisaishan",
  "k4": "",
  "k5": "区",
  "k6": 420203,
  "k7": "0714"
}, {
  "id": 2008,
  "name": "下陆",
  "parent_id": 291,
  "k1": "x",
  "k2": "xl",
  "k3": "xialu",
  "k4": "",
  "k5": "区",
  "k6": 420204,
  "k7": "0714"
}, {
  "id": 2009,
  "name": "铁山",
  "parent_id": 291,
  "k1": "t",
  "k2": "ts",
  "k3": "tieshan",
  "k4": "",
  "k5": "区",
  "k6": 420205,
  "k7": "0714"
}, {
  "id": 2010,
  "name": "阳新",
  "parent_id": 291,
  "k1": "y",
  "k2": "yx",
  "k3": "yangxin",
  "k4": "",
  "k5": "县",
  "k6": 420222,
  "k7": "0714"
}, {
  "id": 2011,
  "name": "大冶",
  "parent_id": 291,
  "k1": "d",
  "k2": "dy",
  "k3": "daye",
  "k4": "",
  "k5": "市",
  "k6": 420281,
  "k7": "0714"
}, {
  "id": 2012,
  "name": "茅箭",
  "parent_id": 292,
  "k1": "m",
  "k2": "mj",
  "k3": "maojian",
  "k4": "",
  "k5": "区",
  "k6": 420302,
  "k7": "0719"
}, {
  "id": 2013,
  "name": "张湾",
  "parent_id": 292,
  "k1": "z",
  "k2": "zw",
  "k3": "zhangwan",
  "k4": "",
  "k5": "区",
  "k6": 420303,
  "k7": "0719"
}, {
  "id": 2014,
  "name": "郧阳",
  "parent_id": 292,
  "k1": "y",
  "k2": "yy",
  "k3": "yunyang",
  "k4": "",
  "k5": "区",
  "k6": 420304,
  "k7": "0719"
}, {
  "id": 2015,
  "name": "郧西",
  "parent_id": 292,
  "k1": "y",
  "k2": "yx",
  "k3": "yunxi",
  "k4": "",
  "k5": "县",
  "k6": 420322,
  "k7": "0719"
}, {
  "id": 2016,
  "name": "竹山",
  "parent_id": 292,
  "k1": "z",
  "k2": "zs",
  "k3": "zhushan",
  "k4": "",
  "k5": "县",
  "k6": 420323,
  "k7": "0719"
}, {
  "id": 2017,
  "name": "竹溪",
  "parent_id": 292,
  "k1": "z",
  "k2": "zx",
  "k3": "zhuxi",
  "k4": "",
  "k5": "县",
  "k6": 420324,
  "k7": "0719"
}, {
  "id": 2018,
  "name": "房县",
  "parent_id": 292,
  "k1": "f",
  "k2": "fx",
  "k3": "fangxian",
  "k4": "",
  "k5": "",
  "k6": 420325,
  "k7": "0719"
}, {
  "id": 2019,
  "name": "丹江口",
  "parent_id": 292,
  "k1": "d",
  "k2": "djk",
  "k3": "danjiangkou",
  "k4": "",
  "k5": "市",
  "k6": 420381,
  "k7": "0719"
}, {
  "id": 2020,
  "name": "西陵",
  "parent_id": 293,
  "k1": "x",
  "k2": "xl",
  "k3": "xiling",
  "k4": "",
  "k5": "区",
  "k6": 420502,
  "k7": "0717"
}, {
  "id": 2021,
  "name": "伍家岗",
  "parent_id": 293,
  "k1": "w",
  "k2": "wjg",
  "k3": "wujiagang",
  "k4": "",
  "k5": "区",
  "k6": 420503,
  "k7": "0717"
}, {
  "id": 2022,
  "name": "点军",
  "parent_id": 293,
  "k1": "d",
  "k2": "dj",
  "k3": "dianjun",
  "k4": "",
  "k5": "区",
  "k6": 420504,
  "k7": "0717"
}, {
  "id": 2023,
  "name": "虢亭",
  "parent_id": 293,
  "k1": "g",
  "k2": "gt",
  "k3": "guoting",
  "k4": "",
  "k5": "区",
  "k6": 420505,
  "k7": "0717"
}, {
  "id": 2024,
  "name": "夷陵",
  "parent_id": 293,
  "k1": "y",
  "k2": "yl",
  "k3": "yiling",
  "k4": "",
  "k5": "区",
  "k6": 420506,
  "k7": "0717"
}, {
  "id": 2025,
  "name": "远安",
  "parent_id": 293,
  "k1": "y",
  "k2": "ya",
  "k3": "yuanan",
  "k4": "",
  "k5": "县",
  "k6": 420525,
  "k7": "0717"
}, {
  "id": 2026,
  "name": "兴山",
  "parent_id": 293,
  "k1": "x",
  "k2": "xs",
  "k3": "xingshan",
  "k4": "",
  "k5": "县",
  "k6": 420526,
  "k7": "0717"
}, {
  "id": 2027,
  "name": "秭归",
  "parent_id": 293,
  "k1": "z",
  "k2": "zg",
  "k3": "zigui",
  "k4": "",
  "k5": "县",
  "k6": 420527,
  "k7": "0717"
}, {
  "id": 2028,
  "name": "长阳",
  "parent_id": 293,
  "k1": "c",
  "k2": "cy",
  "k3": "changyang",
  "k4": "土家族",
  "k5": "自治县",
  "k6": 420528,
  "k7": "0717"
}, {
  "id": 2029,
  "name": "五峰",
  "parent_id": 293,
  "k1": "w",
  "k2": "wf",
  "k3": "wufeng",
  "k4": "土家族",
  "k5": "自治县",
  "k6": 420529,
  "k7": "0717"
}, {
  "id": 2030,
  "name": "宜都",
  "parent_id": 293,
  "k1": "y",
  "k2": "yd",
  "k3": "yidu",
  "k4": "",
  "k5": "市",
  "k6": 420581,
  "k7": "0717"
}, {
  "id": 2031,
  "name": "当阳",
  "parent_id": 293,
  "k1": "d",
  "k2": "dy",
  "k3": "dangyang",
  "k4": "",
  "k5": "市",
  "k6": 420582,
  "k7": "0717"
}, {
  "id": 2032,
  "name": "枝江",
  "parent_id": 293,
  "k1": "z",
  "k2": "zj",
  "k3": "zhijiang",
  "k4": "",
  "k5": "市",
  "k6": 420583,
  "k7": "0717"
}, {
  "id": 2033,
  "name": "襄城",
  "parent_id": 294,
  "k1": "x",
  "k2": "xc",
  "k3": "xiangcheng",
  "k4": "",
  "k5": "区",
  "k6": 420602,
  "k7": "0710"
}, {
  "id": 2034,
  "name": "樊城",
  "parent_id": 294,
  "k1": "f",
  "k2": "fc",
  "k3": "fancheng",
  "k4": "",
  "k5": "区",
  "k6": 420606,
  "k7": "0710"
}, {
  "id": 2035,
  "name": "襄州",
  "parent_id": 294,
  "k1": "x",
  "k2": "xz",
  "k3": "xiangzhou",
  "k4": "",
  "k5": "区",
  "k6": 420607,
  "k7": "0710"
}, {
  "id": 2036,
  "name": "南漳",
  "parent_id": 294,
  "k1": "n",
  "k2": "nz",
  "k3": "nanzhang",
  "k4": "",
  "k5": "县",
  "k6": 420624,
  "k7": "0710"
}, {
  "id": 2037,
  "name": "谷城",
  "parent_id": 294,
  "k1": "g",
  "k2": "gc",
  "k3": "gucheng",
  "k4": "",
  "k5": "县",
  "k6": 420625,
  "k7": "0710"
}, {
  "id": 2038,
  "name": "保康",
  "parent_id": 294,
  "k1": "b",
  "k2": "bk",
  "k3": "baokang",
  "k4": "",
  "k5": "县",
  "k6": 420626,
  "k7": "0710"
}, {
  "id": 2039,
  "name": "老河口",
  "parent_id": 294,
  "k1": "l",
  "k2": "lhk",
  "k3": "laohekou",
  "k4": "",
  "k5": "市",
  "k6": 420682,
  "k7": "0710"
}, {
  "id": 2040,
  "name": "枣阳",
  "parent_id": 294,
  "k1": "z",
  "k2": "zy",
  "k3": "zaoyang",
  "k4": "",
  "k5": "市",
  "k6": 420683,
  "k7": "0710"
}, {
  "id": 2041,
  "name": "宜城",
  "parent_id": 294,
  "k1": "y",
  "k2": "yc",
  "k3": "yicheng",
  "k4": "",
  "k5": "市",
  "k6": 420684,
  "k7": "0710"
}, {
  "id": 2042,
  "name": "粱子湖",
  "parent_id": 295,
  "k1": "l",
  "k2": "lzh",
  "k3": "liangzihu",
  "k4": "",
  "k5": "区",
  "k6": 420702,
  "k7": ""
}, {
  "id": 2043,
  "name": "华容",
  "parent_id": 295,
  "k1": "h",
  "k2": "hr",
  "k3": "huarong",
  "k4": "",
  "k5": "区",
  "k6": 420703,
  "k7": ""
}, {
  "id": 2044,
  "name": "鄂城",
  "parent_id": 295,
  "k1": "e",
  "k2": "ec",
  "k3": "echeng",
  "k4": "",
  "k5": "区",
  "k6": 420704,
  "k7": ""
}, {
  "id": 2045,
  "name": "东宝",
  "parent_id": 296,
  "k1": "d",
  "k2": "db",
  "k3": "dongbao",
  "k4": "",
  "k5": "区",
  "k6": 420802,
  "k7": "0724"
}, {
  "id": 2046,
  "name": "掇刀",
  "parent_id": 296,
  "k1": "d",
  "k2": "dd",
  "k3": "duodao",
  "k4": "",
  "k5": "区",
  "k6": 420804,
  "k7": "0724"
}, {
  "id": 2047,
  "name": "京山",
  "parent_id": 296,
  "k1": "j",
  "k2": "js",
  "k3": "jingshan",
  "k4": "",
  "k5": "市",
  "k6": 420882,
  "k7": "0724"
}, {
  "id": 2048,
  "name": "沙洋",
  "parent_id": 296,
  "k1": "s",
  "k2": "sy",
  "k3": "shayang",
  "k4": "",
  "k5": "县",
  "k6": 420822,
  "k7": "0724"
}, {
  "id": 2049,
  "name": "钟祥",
  "parent_id": 296,
  "k1": "z",
  "k2": "zx",
  "k3": "zhongxiang",
  "k4": "",
  "k5": "市",
  "k6": 420881,
  "k7": "0724"
}, {
  "id": 2050,
  "name": "孝南",
  "parent_id": 297,
  "k1": "x",
  "k2": "xn",
  "k3": "xiaonan",
  "k4": "",
  "k5": "区",
  "k6": 420902,
  "k7": "0712"
}, {
  "id": 2051,
  "name": "大悟",
  "parent_id": 297,
  "k1": "d",
  "k2": "dw",
  "k3": "dawu",
  "k4": "",
  "k5": "县",
  "k6": 420922,
  "k7": "0712"
}, {
  "id": 2052,
  "name": "云梦",
  "parent_id": 297,
  "k1": "y",
  "k2": "ym",
  "k3": "yunmeng",
  "k4": "",
  "k5": "县",
  "k6": 420923,
  "k7": "0712"
}, {
  "id": 2053,
  "name": "应城",
  "parent_id": 297,
  "k1": "y",
  "k2": "yc",
  "k3": "yingcheng",
  "k4": "",
  "k5": "市",
  "k6": 420981,
  "k7": "0712"
}, {
  "id": 2054,
  "name": "安陆",
  "parent_id": 297,
  "k1": "a",
  "k2": "al",
  "k3": "anlu",
  "k4": "",
  "k5": "市",
  "k6": 420982,
  "k7": "0712"
}, {
  "id": 2055,
  "name": "汉川",
  "parent_id": 297,
  "k1": "h",
  "k2": "hc",
  "k3": "hanchuan",
  "k4": "",
  "k5": "市",
  "k6": 420984,
  "k7": "0712"
}, {
  "id": 2056,
  "name": "沙市",
  "parent_id": 298,
  "k1": "s",
  "k2": "ss",
  "k3": "shashi",
  "k4": "",
  "k5": "区",
  "k6": 421002,
  "k7": "0716"
}, {
  "id": 2057,
  "name": "荆州",
  "parent_id": 298,
  "k1": "j",
  "k2": "jz",
  "k3": "jingzhou",
  "k4": "",
  "k5": "区",
  "k6": 421003,
  "k7": "0716"
}, {
  "id": 2058,
  "name": "公安",
  "parent_id": 298,
  "k1": "g",
  "k2": "ga",
  "k3": "gongan",
  "k4": "",
  "k5": "县",
  "k6": 421022,
  "k7": "0716"
}, {
  "id": 2059,
  "name": "监利",
  "parent_id": 298,
  "k1": "j",
  "k2": "jl",
  "k3": "jianli",
  "k4": "",
  "k5": "县",
  "k6": 421023,
  "k7": "0716"
}, {
  "id": 2060,
  "name": "江陵",
  "parent_id": 298,
  "k1": "j",
  "k2": "jl",
  "k3": "jiangling",
  "k4": "",
  "k5": "县",
  "k6": 421024,
  "k7": "0716"
}, {
  "id": 2061,
  "name": "石首",
  "parent_id": 298,
  "k1": "s",
  "k2": "ss",
  "k3": "shishou",
  "k4": "",
  "k5": "市",
  "k6": 421081,
  "k7": "0716"
}, {
  "id": 2062,
  "name": "洪湖",
  "parent_id": 298,
  "k1": "h",
  "k2": "hh",
  "k3": "honghu",
  "k4": "",
  "k5": "市",
  "k6": 421083,
  "k7": "0716"
}, {
  "id": 2063,
  "name": "松滋",
  "parent_id": 298,
  "k1": "s",
  "k2": "sz",
  "k3": "songzi",
  "k4": "",
  "k5": "市",
  "k6": 421087,
  "k7": "0716"
}, {
  "id": 2064,
  "name": "黄州",
  "parent_id": 299,
  "k1": "h",
  "k2": "hz",
  "k3": "huangzhou",
  "k4": "",
  "k5": "区",
  "k6": 421102,
  "k7": "0713"
}, {
  "id": 2065,
  "name": "团风",
  "parent_id": 299,
  "k1": "t",
  "k2": "tf",
  "k3": "tuanfeng",
  "k4": "",
  "k5": "县",
  "k6": 421121,
  "k7": "0713"
}, {
  "id": 2066,
  "name": "红安",
  "parent_id": 299,
  "k1": "h",
  "k2": "ha",
  "k3": "hongan",
  "k4": "",
  "k5": "县",
  "k6": 421122,
  "k7": "0713"
}, {
  "id": 2067,
  "name": "罗田",
  "parent_id": 299,
  "k1": "l",
  "k2": "lt",
  "k3": "luotian",
  "k4": "",
  "k5": "县",
  "k6": 421123,
  "k7": "0713"
}, {
  "id": 2068,
  "name": "英山",
  "parent_id": 299,
  "k1": "y",
  "k2": "ys",
  "k3": "yingshan",
  "k4": "",
  "k5": "县",
  "k6": 421124,
  "k7": "0713"
}, {
  "id": 2069,
  "name": "浠水",
  "parent_id": 299,
  "k1": "x",
  "k2": "xs",
  "k3": "xishui",
  "k4": "",
  "k5": "县",
  "k6": 421125,
  "k7": "0713"
}, {
  "id": 2070,
  "name": "蕲春",
  "parent_id": 299,
  "k1": "q",
  "k2": "qc",
  "k3": "qichun",
  "k4": "",
  "k5": "县",
  "k6": 421126,
  "k7": "0713"
}, {
  "id": 2071,
  "name": "黄梅",
  "parent_id": 299,
  "k1": "h",
  "k2": "hm",
  "k3": "huangmei",
  "k4": "",
  "k5": "县",
  "k6": 421127,
  "k7": "0713"
}, {
  "id": 2072,
  "name": "麻城",
  "parent_id": 299,
  "k1": "m",
  "k2": "mc",
  "k3": "macheng",
  "k4": "",
  "k5": "市",
  "k6": 421181,
  "k7": "0713"
}, {
  "id": 2073,
  "name": "武穴",
  "parent_id": 299,
  "k1": "w",
  "k2": "wx",
  "k3": "wuxue",
  "k4": "",
  "k5": "市",
  "k6": 421182,
  "k7": "0713"
}, {
  "id": 2074,
  "name": "咸安",
  "parent_id": 300,
  "k1": "x",
  "k2": "xa",
  "k3": "xianan",
  "k4": "",
  "k5": "区",
  "k6": 421202,
  "k7": "0715"
}, {
  "id": 2075,
  "name": "嘉鱼",
  "parent_id": 300,
  "k1": "j",
  "k2": "jy",
  "k3": "jiayu",
  "k4": "",
  "k5": "县",
  "k6": 421221,
  "k7": "0715"
}, {
  "id": 2076,
  "name": "通城",
  "parent_id": 300,
  "k1": "t",
  "k2": "tc",
  "k3": "tongcheng",
  "k4": "",
  "k5": "县",
  "k6": 421222,
  "k7": "0715"
}, {
  "id": 2077,
  "name": "崇阳",
  "parent_id": 300,
  "k1": "c",
  "k2": "cy",
  "k3": "chongyang",
  "k4": "",
  "k5": "县",
  "k6": 421223,
  "k7": "0715"
}, {
  "id": 2078,
  "name": "通山",
  "parent_id": 300,
  "k1": "t",
  "k2": "ts",
  "k3": "tongshan",
  "k4": "",
  "k5": "县",
  "k6": 421224,
  "k7": "0715"
}, {
  "id": 2079,
  "name": "赤壁",
  "parent_id": 300,
  "k1": "c",
  "k2": "cb",
  "k3": "chibi",
  "k4": "",
  "k5": "市",
  "k6": 421281,
  "k7": "0715"
}, {
  "id": 2080,
  "name": "曾都",
  "parent_id": 301,
  "k1": "c",
  "k2": "cd",
  "k3": "cengdu",
  "k4": "",
  "k5": "区",
  "k6": 421303,
  "k7": "0722"
}, {
  "id": 2081,
  "name": "随县",
  "parent_id": 301,
  "k1": "s",
  "k2": "sx",
  "k3": "suixian",
  "k4": "",
  "k5": "",
  "k6": 421321,
  "k7": "0722"
}, {
  "id": 2082,
  "name": "广水",
  "parent_id": 301,
  "k1": "g",
  "k2": "gs",
  "k3": "guangshui",
  "k4": "",
  "k5": "市",
  "k6": 421381,
  "k7": "0722"
}, {
  "id": 2083,
  "name": "恩施",
  "parent_id": 302,
  "k1": "e",
  "k2": "es",
  "k3": "enshi",
  "k4": "",
  "k5": "市",
  "k6": 422801,
  "k7": "0718"
}, {
  "id": 2084,
  "name": "利川",
  "parent_id": 302,
  "k1": "l",
  "k2": "lc",
  "k3": "lichuan",
  "k4": "",
  "k5": "市",
  "k6": 422802,
  "k7": "0718"
}, {
  "id": 2085,
  "name": "建始",
  "parent_id": 302,
  "k1": "j",
  "k2": "js",
  "k3": "jianshi",
  "k4": "",
  "k5": "县",
  "k6": 422822,
  "k7": "0718"
}, {
  "id": 2086,
  "name": "巴东",
  "parent_id": 302,
  "k1": "b",
  "k2": "bd",
  "k3": "badong",
  "k4": "",
  "k5": "县",
  "k6": 422823,
  "k7": "0718"
}, {
  "id": 2087,
  "name": "宣恩",
  "parent_id": 302,
  "k1": "x",
  "k2": "xe",
  "k3": "xuanen",
  "k4": "",
  "k5": "县",
  "k6": 422825,
  "k7": "0718"
}, {
  "id": 2088,
  "name": "咸丰",
  "parent_id": 302,
  "k1": "x",
  "k2": "xf",
  "k3": "xianfeng",
  "k4": "",
  "k5": "县",
  "k6": 422826,
  "k7": "0718"
}, {
  "id": 2089,
  "name": "来凤",
  "parent_id": 302,
  "k1": "l",
  "k2": "lf",
  "k3": "laifeng",
  "k4": "",
  "k5": "县",
  "k6": 422827,
  "k7": "0718"
}, {
  "id": 2090,
  "name": "鹤峰",
  "parent_id": 302,
  "k1": "h",
  "k2": "hf",
  "k3": "hefeng",
  "k4": "",
  "k5": "县",
  "k6": 422828,
  "k7": "0718"
}, {
  "id": 2091,
  "name": "芙蓉",
  "parent_id": 307,
  "k1": "f",
  "k2": "fr",
  "k3": "furong",
  "k4": "",
  "k5": "区",
  "k6": 430102,
  "k7": "0731"
}, {
  "id": 2092,
  "name": "天心",
  "parent_id": 307,
  "k1": "t",
  "k2": "tx",
  "k3": "tianxin",
  "k4": "",
  "k5": "区",
  "k6": 430103,
  "k7": "0731"
}, {
  "id": 2093,
  "name": "岳麓",
  "parent_id": 307,
  "k1": "y",
  "k2": "yl",
  "k3": "yuelu",
  "k4": "",
  "k5": "区",
  "k6": 430104,
  "k7": "0731"
}, {
  "id": 2094,
  "name": "开福",
  "parent_id": 307,
  "k1": "k",
  "k2": "kf",
  "k3": "kaifu",
  "k4": "",
  "k5": "区",
  "k6": 430105,
  "k7": "0731"
}, {
  "id": 2095,
  "name": "雨花",
  "parent_id": 307,
  "k1": "y",
  "k2": "yh",
  "k3": "yuhua",
  "k4": "",
  "k5": "区",
  "k6": 430111,
  "k7": "0731"
}, {
  "id": 2096,
  "name": "望城",
  "parent_id": 307,
  "k1": "w",
  "k2": "wc",
  "k3": "wangcheng",
  "k4": "",
  "k5": "区",
  "k6": 430112,
  "k7": "0731"
}, {
  "id": 2097,
  "name": "长沙",
  "parent_id": 307,
  "k1": "c",
  "k2": "cs",
  "k3": "changsha",
  "k4": "",
  "k5": "县",
  "k6": 430121,
  "k7": "0731"
}, {
  "id": 2098,
  "name": "宁乡",
  "parent_id": 307,
  "k1": "n",
  "k2": "nx",
  "k3": "ningxiang",
  "k4": "",
  "k5": "市",
  "k6": 430182,
  "k7": "0731"
}, {
  "id": 2099,
  "name": "浏阳",
  "parent_id": 307,
  "k1": "l",
  "k2": "ly",
  "k3": "liuyang",
  "k4": "",
  "k5": "市",
  "k6": 430181,
  "k7": "0731"
}, {
  "id": 2100,
  "name": "荷塘",
  "parent_id": 308,
  "k1": "h",
  "k2": "ht",
  "k3": "hetang",
  "k4": "",
  "k5": "区",
  "k6": 430202,
  "k7": "0731"
}, {
  "id": 2101,
  "name": "芦淞",
  "parent_id": 308,
  "k1": "l",
  "k2": "ls",
  "k3": "lusong",
  "k4": "",
  "k5": "区",
  "k6": 430203,
  "k7": "0731"
}, {
  "id": 2102,
  "name": "石峰",
  "parent_id": 308,
  "k1": "s",
  "k2": "sf",
  "k3": "shifeng",
  "k4": "",
  "k5": "区",
  "k6": 430204,
  "k7": "0731"
}, {
  "id": 2103,
  "name": "天元",
  "parent_id": 308,
  "k1": "t",
  "k2": "ty",
  "k3": "tianyuan",
  "k4": "",
  "k5": "区",
  "k6": 430211,
  "k7": "0731"
}, {
  "id": 2104,
  "name": "渌口",
  "parent_id": 308,
  "k1": "l",
  "k2": "lk",
  "k3": "lukou",
  "k4": "",
  "k5": "区",
  "k6": 430212,
  "k7": "0731"
}, {
  "id": 2105,
  "name": "攸县",
  "parent_id": 308,
  "k1": "y",
  "k2": "yx",
  "k3": "youxian",
  "k4": "",
  "k5": "",
  "k6": 430223,
  "k7": "0731"
}, {
  "id": 2106,
  "name": "茶陵",
  "parent_id": 308,
  "k1": "c",
  "k2": "cl",
  "k3": "chaling",
  "k4": "",
  "k5": "县",
  "k6": 430224,
  "k7": "0731"
}, {
  "id": 2107,
  "name": "炎陵",
  "parent_id": 308,
  "k1": "y",
  "k2": "yl",
  "k3": "yanling",
  "k4": "",
  "k5": "县",
  "k6": 430225,
  "k7": "0731"
}, {
  "id": 2108,
  "name": "醴陵",
  "parent_id": 308,
  "k1": "l",
  "k2": "ll",
  "k3": "liling",
  "k4": "",
  "k5": "市",
  "k6": 430281,
  "k7": "0731"
}, {
  "id": 2109,
  "name": "雨湖",
  "parent_id": 309,
  "k1": "y",
  "k2": "yh",
  "k3": "yuhu",
  "k4": "",
  "k5": "区",
  "k6": 430302,
  "k7": "0731"
}, {
  "id": 2110,
  "name": "岳塘",
  "parent_id": 309,
  "k1": "y",
  "k2": "yt",
  "k3": "yuetang",
  "k4": "",
  "k5": "区",
  "k6": 430304,
  "k7": "0731"
}, {
  "id": 2111,
  "name": "湘潭",
  "parent_id": 309,
  "k1": "x",
  "k2": "xt",
  "k3": "xiangtan",
  "k4": "",
  "k5": "县",
  "k6": 430321,
  "k7": "0731"
}, {
  "id": 2112,
  "name": "湘乡",
  "parent_id": 309,
  "k1": "x",
  "k2": "xx",
  "k3": "xiangxiang",
  "k4": "",
  "k5": "市",
  "k6": 430381,
  "k7": "0731"
}, {
  "id": 2113,
  "name": "韶山",
  "parent_id": 309,
  "k1": "s",
  "k2": "ss",
  "k3": "shaoshan",
  "k4": "",
  "k5": "市",
  "k6": 430382,
  "k7": "0731"
}, {
  "id": 2114,
  "name": "珠晖",
  "parent_id": 310,
  "k1": "z",
  "k2": "zh",
  "k3": "zhuhui",
  "k4": "",
  "k5": "区",
  "k6": 430405,
  "k7": "0734"
}, {
  "id": 2115,
  "name": "雁峰",
  "parent_id": 310,
  "k1": "y",
  "k2": "yf",
  "k3": "yanfeng",
  "k4": "",
  "k5": "区",
  "k6": 430406,
  "k7": "0734"
}, {
  "id": 2116,
  "name": "石鼓",
  "parent_id": 310,
  "k1": "s",
  "k2": "sg",
  "k3": "shigu",
  "k4": "",
  "k5": "区",
  "k6": 430407,
  "k7": "0734"
}, {
  "id": 2117,
  "name": "蒸湘",
  "parent_id": 310,
  "k1": "z",
  "k2": "zx",
  "k3": "zhengxiang",
  "k4": "",
  "k5": "区",
  "k6": 430408,
  "k7": "0734"
}, {
  "id": 2118,
  "name": "南岳",
  "parent_id": 310,
  "k1": "n",
  "k2": "ny",
  "k3": "nanyue",
  "k4": "",
  "k5": "区",
  "k6": 430412,
  "k7": "0734"
}, {
  "id": 2119,
  "name": "衡阳",
  "parent_id": 310,
  "k1": "h",
  "k2": "hy",
  "k3": "hengyang",
  "k4": "",
  "k5": "县",
  "k6": 430421,
  "k7": "0734"
}, {
  "id": 2120,
  "name": "衡南",
  "parent_id": 310,
  "k1": "h",
  "k2": "hn",
  "k3": "hengnan",
  "k4": "",
  "k5": "县",
  "k6": 430422,
  "k7": "0734"
}, {
  "id": 2121,
  "name": "衡山",
  "parent_id": 310,
  "k1": "h",
  "k2": "hs",
  "k3": "hengshan",
  "k4": "",
  "k5": "县",
  "k6": 430423,
  "k7": "0734"
}, {
  "id": 2122,
  "name": "衡东",
  "parent_id": 310,
  "k1": "h",
  "k2": "hd",
  "k3": "hengdong",
  "k4": "",
  "k5": "县",
  "k6": 430424,
  "k7": "0734"
}, {
  "id": 2123,
  "name": "祁东",
  "parent_id": 310,
  "k1": "q",
  "k2": "qd",
  "k3": "qidong",
  "k4": "",
  "k5": "县",
  "k6": 430426,
  "k7": "0734"
}, {
  "id": 2124,
  "name": "耒阳",
  "parent_id": 310,
  "k1": "l",
  "k2": "ly",
  "k3": "leiyang",
  "k4": "",
  "k5": "市",
  "k6": 430481,
  "k7": "0734"
}, {
  "id": 2125,
  "name": "常宁",
  "parent_id": 310,
  "k1": "c",
  "k2": "cn",
  "k3": "changning",
  "k4": "",
  "k5": "市",
  "k6": 430482,
  "k7": "0734"
}, {
  "id": 2126,
  "name": "双清",
  "parent_id": 311,
  "k1": "s",
  "k2": "sq",
  "k3": "shuangqing",
  "k4": "",
  "k5": "区",
  "k6": 430502,
  "k7": "0739"
}, {
  "id": 2127,
  "name": "大祥",
  "parent_id": 311,
  "k1": "d",
  "k2": "dx",
  "k3": "daxiang",
  "k4": "",
  "k5": "区",
  "k6": 430503,
  "k7": "0739"
}, {
  "id": 2128,
  "name": "北塔",
  "parent_id": 311,
  "k1": "b",
  "k2": "bt",
  "k3": "beita",
  "k4": "",
  "k5": "区",
  "k6": 430511,
  "k7": "0739"
}, {
  "id": 2129,
  "name": "邵东",
  "parent_id": 311,
  "k1": "s",
  "k2": "sd",
  "k3": "shaodong",
  "k4": "",
  "k5": "县",
  "k6": 430521,
  "k7": "0739"
}, {
  "id": 2130,
  "name": "新邵",
  "parent_id": 311,
  "k1": "x",
  "k2": "xs",
  "k3": "xinshao",
  "k4": "",
  "k5": "县",
  "k6": 430522,
  "k7": "0739"
}, {
  "id": 2131,
  "name": "邵阳",
  "parent_id": 311,
  "k1": "s",
  "k2": "sy",
  "k3": "shaoyang",
  "k4": "",
  "k5": "县",
  "k6": 430523,
  "k7": "0739"
}, {
  "id": 2132,
  "name": "隆回",
  "parent_id": 311,
  "k1": "l",
  "k2": "lh",
  "k3": "longhui",
  "k4": "",
  "k5": "县",
  "k6": 430524,
  "k7": "0739"
}, {
  "id": 2133,
  "name": "洞口",
  "parent_id": 311,
  "k1": "d",
  "k2": "dk",
  "k3": "dongkou",
  "k4": "",
  "k5": "县",
  "k6": 430525,
  "k7": "0739"
}, {
  "id": 2134,
  "name": "绥宁",
  "parent_id": 311,
  "k1": "s",
  "k2": "sn",
  "k3": "suining",
  "k4": "",
  "k5": "县",
  "k6": 430527,
  "k7": "0739"
}, {
  "id": 2135,
  "name": "新宁",
  "parent_id": 311,
  "k1": "x",
  "k2": "xn",
  "k3": "xinning",
  "k4": "",
  "k5": "县",
  "k6": 430528,
  "k7": "0739"
}, {
  "id": 2136,
  "name": "城步",
  "parent_id": 311,
  "k1": "c",
  "k2": "cb",
  "k3": "chengbu",
  "k4": "苗族",
  "k5": "自治县",
  "k6": 430529,
  "k7": "0739"
}, {
  "id": 2137,
  "name": "武冈",
  "parent_id": 311,
  "k1": "w",
  "k2": "wg",
  "k3": "wugang",
  "k4": "",
  "k5": "市",
  "k6": 430581,
  "k7": "0739"
}, {
  "id": 2138,
  "name": "岳阳楼",
  "parent_id": 312,
  "k1": "y",
  "k2": "yyl",
  "k3": "yueyanglou",
  "k4": "",
  "k5": "区",
  "k6": 430602,
  "k7": "0730"
}, {
  "id": 2139,
  "name": "云溪",
  "parent_id": 312,
  "k1": "y",
  "k2": "yx",
  "k3": "yunxi",
  "k4": "",
  "k5": "区",
  "k6": 430603,
  "k7": "0730"
}, {
  "id": 2140,
  "name": "君山",
  "parent_id": 312,
  "k1": "j",
  "k2": "js",
  "k3": "junshan",
  "k4": "",
  "k5": "区",
  "k6": 430611,
  "k7": "0730"
}, {
  "id": 2141,
  "name": "岳阳",
  "parent_id": 312,
  "k1": "y",
  "k2": "yy",
  "k3": "yueyang",
  "k4": "",
  "k5": "县",
  "k6": 430621,
  "k7": "0730"
}, {
  "id": 2142,
  "name": "华容",
  "parent_id": 312,
  "k1": "h",
  "k2": "hr",
  "k3": "huarong",
  "k4": "",
  "k5": "县",
  "k6": 430623,
  "k7": "0730"
}, {
  "id": 2143,
  "name": "湘阴",
  "parent_id": 312,
  "k1": "x",
  "k2": "xy",
  "k3": "xiangyin",
  "k4": "",
  "k5": "县",
  "k6": 430624,
  "k7": "0730"
}, {
  "id": 2144,
  "name": "平江",
  "parent_id": 312,
  "k1": "p",
  "k2": "pj",
  "k3": "pingjiang",
  "k4": "",
  "k5": "县",
  "k6": 430626,
  "k7": "0730"
}, {
  "id": 2145,
  "name": "汨罗",
  "parent_id": 312,
  "k1": "m",
  "k2": "ml",
  "k3": "miluo",
  "k4": "",
  "k5": "市",
  "k6": 430681,
  "k7": "0730"
}, {
  "id": 2146,
  "name": "临湘",
  "parent_id": 312,
  "k1": "l",
  "k2": "lx",
  "k3": "linxiang",
  "k4": "",
  "k5": "市",
  "k6": 430682,
  "k7": "0730"
}, {
  "id": 2147,
  "name": "武陵",
  "parent_id": 313,
  "k1": "w",
  "k2": "wl",
  "k3": "wuling",
  "k4": "",
  "k5": "区",
  "k6": 430702,
  "k7": "0736"
}, {
  "id": 2148,
  "name": "鼎城",
  "parent_id": 313,
  "k1": "d",
  "k2": "dc",
  "k3": "dingcheng",
  "k4": "",
  "k5": "区",
  "k6": 430703,
  "k7": "0736"
}, {
  "id": 2149,
  "name": "安乡",
  "parent_id": 313,
  "k1": "a",
  "k2": "ax",
  "k3": "anxiang",
  "k4": "",
  "k5": "县",
  "k6": 430721,
  "k7": "0736"
}, {
  "id": 2150,
  "name": "汉寿",
  "parent_id": 313,
  "k1": "h",
  "k2": "hs",
  "k3": "hanshou",
  "k4": "",
  "k5": "县",
  "k6": 430722,
  "k7": "0736"
}, {
  "id": 2151,
  "name": "澧县",
  "parent_id": 313,
  "k1": "l",
  "k2": "lx",
  "k3": "lixian",
  "k4": "",
  "k5": "",
  "k6": 430723,
  "k7": "0736"
}, {
  "id": 2152,
  "name": "临澧",
  "parent_id": 313,
  "k1": "l",
  "k2": "ll",
  "k3": "linli",
  "k4": "",
  "k5": "县",
  "k6": 430724,
  "k7": "0736"
}, {
  "id": 2153,
  "name": "桃源",
  "parent_id": 313,
  "k1": "t",
  "k2": "ty",
  "k3": "taoyuan",
  "k4": "",
  "k5": "县",
  "k6": 430725,
  "k7": "0736"
}, {
  "id": 2154,
  "name": "石门",
  "parent_id": 313,
  "k1": "s",
  "k2": "sm",
  "k3": "shimen",
  "k4": "",
  "k5": "县",
  "k6": 430726,
  "k7": "0736"
}, {
  "id": 2155,
  "name": "津市",
  "parent_id": 313,
  "k1": "j",
  "k2": "js",
  "k3": "jinshi",
  "k4": "",
  "k5": "市",
  "k6": 430781,
  "k7": "0736"
}, {
  "id": 2156,
  "name": "永定",
  "parent_id": 314,
  "k1": "y",
  "k2": "yd",
  "k3": "yongding",
  "k4": "",
  "k5": "区",
  "k6": 430802,
  "k7": "0744"
}, {
  "id": 2157,
  "name": "武陵源",
  "parent_id": 314,
  "k1": "w",
  "k2": "wly",
  "k3": "wulingyuan",
  "k4": "",
  "k5": "区",
  "k6": 430811,
  "k7": "0744"
}, {
  "id": 2158,
  "name": "慈利",
  "parent_id": 314,
  "k1": "c",
  "k2": "cl",
  "k3": "cili",
  "k4": "",
  "k5": "县",
  "k6": 430821,
  "k7": "0744"
}, {
  "id": 2159,
  "name": "桑植",
  "parent_id": 314,
  "k1": "s",
  "k2": "sz",
  "k3": "sangzhi",
  "k4": "",
  "k5": "县",
  "k6": 430822,
  "k7": "0744"
}, {
  "id": 2160,
  "name": "资阳",
  "parent_id": 315,
  "k1": "z",
  "k2": "zy",
  "k3": "ziyang",
  "k4": "",
  "k5": "区",
  "k6": 430902,
  "k7": "0737"
}, {
  "id": 2161,
  "name": "赫山",
  "parent_id": 315,
  "k1": "h",
  "k2": "hs",
  "k3": "heshan",
  "k4": "",
  "k5": "区",
  "k6": 430903,
  "k7": "0737"
}, {
  "id": 2162,
  "name": "南县",
  "parent_id": 315,
  "k1": "n",
  "k2": "nx",
  "k3": "nanxian",
  "k4": "",
  "k5": "",
  "k6": 430921,
  "k7": "0737"
}, {
  "id": 2163,
  "name": "桃江",
  "parent_id": 315,
  "k1": "t",
  "k2": "tj",
  "k3": "taojiang",
  "k4": "",
  "k5": "县",
  "k6": 430922,
  "k7": "0737"
}, {
  "id": 2164,
  "name": "安化",
  "parent_id": 315,
  "k1": "a",
  "k2": "ah",
  "k3": "anhua",
  "k4": "",
  "k5": "县",
  "k6": 430923,
  "k7": "0737"
}, {
  "id": 2165,
  "name": "沅江",
  "parent_id": 315,
  "k1": "y",
  "k2": "yj",
  "k3": "yuanjiang",
  "k4": "",
  "k5": "市",
  "k6": 430981,
  "k7": "0737"
}, {
  "id": 2166,
  "name": "北湖",
  "parent_id": 316,
  "k1": "b",
  "k2": "bh",
  "k3": "beihu",
  "k4": "",
  "k5": "区",
  "k6": 431002,
  "k7": "0735"
}, {
  "id": 2167,
  "name": "苏仙",
  "parent_id": 316,
  "k1": "s",
  "k2": "sx",
  "k3": "suxian",
  "k4": "",
  "k5": "区",
  "k6": 431003,
  "k7": "0735"
}, {
  "id": 2168,
  "name": "桂阳",
  "parent_id": 316,
  "k1": "g",
  "k2": "gy",
  "k3": "guiyang",
  "k4": "",
  "k5": "县",
  "k6": 431021,
  "k7": "0735"
}, {
  "id": 2169,
  "name": "宜章",
  "parent_id": 316,
  "k1": "y",
  "k2": "yz",
  "k3": "yizhang",
  "k4": "",
  "k5": "县",
  "k6": 431022,
  "k7": "0735"
}, {
  "id": 2170,
  "name": "永兴",
  "parent_id": 316,
  "k1": "y",
  "k2": "yx",
  "k3": "yongxing",
  "k4": "",
  "k5": "县",
  "k6": 431023,
  "k7": "0735"
}, {
  "id": 2171,
  "name": "嘉禾",
  "parent_id": 316,
  "k1": "j",
  "k2": "jh",
  "k3": "jiahe",
  "k4": "",
  "k5": "县",
  "k6": 431024,
  "k7": "0735"
}, {
  "id": 2172,
  "name": "临武",
  "parent_id": 316,
  "k1": "l",
  "k2": "lw",
  "k3": "linwu",
  "k4": "",
  "k5": "县",
  "k6": 431025,
  "k7": "0735"
}, {
  "id": 2173,
  "name": "汝城",
  "parent_id": 316,
  "k1": "r",
  "k2": "rc",
  "k3": "rucheng",
  "k4": "",
  "k5": "县",
  "k6": 431026,
  "k7": "0735"
}, {
  "id": 2174,
  "name": "桂东",
  "parent_id": 316,
  "k1": "g",
  "k2": "gd",
  "k3": "guidong",
  "k4": "",
  "k5": "县",
  "k6": 431027,
  "k7": "0735"
}, {
  "id": 2175,
  "name": "安仁",
  "parent_id": 316,
  "k1": "a",
  "k2": "ar",
  "k3": "anren",
  "k4": "",
  "k5": "县",
  "k6": 431028,
  "k7": "0735"
}, {
  "id": 2176,
  "name": "资兴",
  "parent_id": 316,
  "k1": "z",
  "k2": "zx",
  "k3": "zixing",
  "k4": "",
  "k5": "市",
  "k6": 431081,
  "k7": "0735"
}, {
  "id": 2177,
  "name": "零陵",
  "parent_id": 317,
  "k1": "l",
  "k2": "ll",
  "k3": "lingling",
  "k4": "",
  "k5": "区",
  "k6": 431102,
  "k7": "0746"
}, {
  "id": 2178,
  "name": "冷水滩",
  "parent_id": 317,
  "k1": "l",
  "k2": "lst",
  "k3": "lengshuitan",
  "k4": "",
  "k5": "区",
  "k6": 431103,
  "k7": "0746"
}, {
  "id": 2179,
  "name": "祁阳",
  "parent_id": 317,
  "k1": "q",
  "k2": "qy",
  "k3": "qiyang",
  "k4": "",
  "k5": "县",
  "k6": 431121,
  "k7": "0746"
}, {
  "id": 2180,
  "name": "东安",
  "parent_id": 317,
  "k1": "d",
  "k2": "da",
  "k3": "dongan",
  "k4": "",
  "k5": "县",
  "k6": 431122,
  "k7": "0746"
}, {
  "id": 2181,
  "name": "双牌",
  "parent_id": 317,
  "k1": "s",
  "k2": "sp",
  "k3": "shuangpai",
  "k4": "",
  "k5": "县",
  "k6": 431123,
  "k7": "0746"
}, {
  "id": 2182,
  "name": "道县",
  "parent_id": 317,
  "k1": "d",
  "k2": "dx",
  "k3": "daoxian",
  "k4": "",
  "k5": "",
  "k6": 431124,
  "k7": "0746"
}, {
  "id": 2183,
  "name": "江永",
  "parent_id": 317,
  "k1": "j",
  "k2": "jy",
  "k3": "jiangyong",
  "k4": "",
  "k5": "县",
  "k6": 431125,
  "k7": "0746"
}, {
  "id": 2184,
  "name": "宁远",
  "parent_id": 317,
  "k1": "n",
  "k2": "ny",
  "k3": "ningyuan",
  "k4": "",
  "k5": "县",
  "k6": 431126,
  "k7": "0746"
}, {
  "id": 2185,
  "name": "蓝山",
  "parent_id": 317,
  "k1": "l",
  "k2": "ls",
  "k3": "lanshan",
  "k4": "",
  "k5": "县",
  "k6": 431127,
  "k7": "0746"
}, {
  "id": 2186,
  "name": "新田",
  "parent_id": 317,
  "k1": "x",
  "k2": "xt",
  "k3": "xintian",
  "k4": "",
  "k5": "县",
  "k6": 431128,
  "k7": "0746"
}, {
  "id": 2187,
  "name": "江华",
  "parent_id": 317,
  "k1": "j",
  "k2": "jh",
  "k3": "jianghua",
  "k4": "瑶族",
  "k5": "自治县",
  "k6": 431129,
  "k7": "0746"
}, {
  "id": 2188,
  "name": "鹤城",
  "parent_id": 318,
  "k1": "h",
  "k2": "hc",
  "k3": "hecheng",
  "k4": "",
  "k5": "区",
  "k6": 431202,
  "k7": "0745"
}, {
  "id": 2189,
  "name": "中方",
  "parent_id": 318,
  "k1": "z",
  "k2": "zf",
  "k3": "zhongfang",
  "k4": "",
  "k5": "县",
  "k6": 431221,
  "k7": "0745"
}, {
  "id": 2190,
  "name": "沅陵",
  "parent_id": 318,
  "k1": "y",
  "k2": "yl",
  "k3": "yuanling",
  "k4": "",
  "k5": "县",
  "k6": 431222,
  "k7": "0745"
}, {
  "id": 2191,
  "name": "辰溪",
  "parent_id": 318,
  "k1": "c",
  "k2": "cx",
  "k3": "chenxi",
  "k4": "",
  "k5": "县",
  "k6": 431223,
  "k7": "0745"
}, {
  "id": 2192,
  "name": "溆浦",
  "parent_id": 318,
  "k1": "x",
  "k2": "xp",
  "k3": "xupu",
  "k4": "",
  "k5": "县",
  "k6": 431224,
  "k7": "0745"
}, {
  "id": 2193,
  "name": "会同",
  "parent_id": 318,
  "k1": "h",
  "k2": "ht",
  "k3": "huitong",
  "k4": "",
  "k5": "县",
  "k6": 431225,
  "k7": "0745"
}, {
  "id": 2194,
  "name": "麻阳",
  "parent_id": 318,
  "k1": "m",
  "k2": "my",
  "k3": "mayang",
  "k4": "苗族",
  "k5": "自治县",
  "k6": 431226,
  "k7": "0745"
}, {
  "id": 2195,
  "name": "新晃",
  "parent_id": 318,
  "k1": "x",
  "k2": "xh",
  "k3": "xinhuang",
  "k4": "侗族",
  "k5": "自治县",
  "k6": 431227,
  "k7": "0745"
}, {
  "id": 2196,
  "name": "芷江",
  "parent_id": 318,
  "k1": "z",
  "k2": "zj",
  "k3": "zhijiang",
  "k4": "侗族",
  "k5": "自治县",
  "k6": 431228,
  "k7": "0745"
}, {
  "id": 2197,
  "name": "靖州",
  "parent_id": 318,
  "k1": "j",
  "k2": "jz",
  "k3": "jingzhou",
  "k4": "苗族侗族",
  "k5": "自治县",
  "k6": 431229,
  "k7": "0745"
}, {
  "id": 2198,
  "name": "通道",
  "parent_id": 318,
  "k1": "t",
  "k2": "td",
  "k3": "tongdao",
  "k4": "侗族",
  "k5": "自治县",
  "k6": 431230,
  "k7": "0745"
}, {
  "id": 2199,
  "name": "洪江",
  "parent_id": 318,
  "k1": "h",
  "k2": "hj",
  "k3": "hongjiang",
  "k4": "",
  "k5": "市",
  "k6": 431281,
  "k7": "0745"
}, {
  "id": 2200,
  "name": "娄星",
  "parent_id": 319,
  "k1": "l",
  "k2": "lx",
  "k3": "louxing",
  "k4": "",
  "k5": "区",
  "k6": 431302,
  "k7": "0738"
}, {
  "id": 2201,
  "name": "双峰",
  "parent_id": 319,
  "k1": "s",
  "k2": "sf",
  "k3": "shuangfeng",
  "k4": "",
  "k5": "县",
  "k6": 431321,
  "k7": "0738"
}, {
  "id": 2202,
  "name": "新化",
  "parent_id": 319,
  "k1": "x",
  "k2": "xh",
  "k3": "xinhua",
  "k4": "",
  "k5": "县",
  "k6": 431322,
  "k7": "0738"
}, {
  "id": 2203,
  "name": "冷水江",
  "parent_id": 319,
  "k1": "l",
  "k2": "lsj",
  "k3": "lengshuijiang",
  "k4": "",
  "k5": "市",
  "k6": 431381,
  "k7": "0738"
}, {
  "id": 2204,
  "name": "涟源",
  "parent_id": 319,
  "k1": "l",
  "k2": "ly",
  "k3": "lianyuan",
  "k4": "",
  "k5": "市",
  "k6": 431382,
  "k7": "0738"
}, {
  "id": 2205,
  "name": "吉首",
  "parent_id": 320,
  "k1": "j",
  "k2": "js",
  "k3": "jishou",
  "k4": "",
  "k5": "市",
  "k6": 433101,
  "k7": "0743"
}, {
  "id": 2206,
  "name": "泸溪",
  "parent_id": 320,
  "k1": "l",
  "k2": "lx",
  "k3": "luxi",
  "k4": "",
  "k5": "县",
  "k6": 433122,
  "k7": "0743"
}, {
  "id": 2207,
  "name": "凤凰",
  "parent_id": 320,
  "k1": "f",
  "k2": "fh",
  "k3": "fenghuang",
  "k4": "",
  "k5": "县",
  "k6": 433123,
  "k7": "0743"
}, {
  "id": 2208,
  "name": "花垣",
  "parent_id": 320,
  "k1": "h",
  "k2": "hy",
  "k3": "huayuan",
  "k4": "",
  "k5": "县",
  "k6": 433124,
  "k7": "0743"
}, {
  "id": 2209,
  "name": "保靖",
  "parent_id": 320,
  "k1": "b",
  "k2": "bj",
  "k3": "baojing",
  "k4": "",
  "k5": "县",
  "k6": 433125,
  "k7": "0743"
}, {
  "id": 2210,
  "name": "古丈",
  "parent_id": 320,
  "k1": "g",
  "k2": "gz",
  "k3": "guzhang",
  "k4": "",
  "k5": "县",
  "k6": 433126,
  "k7": "0743"
}, {
  "id": 2211,
  "name": "永顺",
  "parent_id": 320,
  "k1": "y",
  "k2": "ys",
  "k3": "yongshun",
  "k4": "",
  "k5": "县",
  "k6": 433127,
  "k7": "0743"
}, {
  "id": 2212,
  "name": "龙山",
  "parent_id": 320,
  "k1": "l",
  "k2": "ls",
  "k3": "longshan",
  "k4": "",
  "k5": "县",
  "k6": 433130,
  "k7": "0743"
}, {
  "id": 2213,
  "name": "荔湾",
  "parent_id": 321,
  "k1": "l",
  "k2": "lw",
  "k3": "liwan",
  "k4": "",
  "k5": "区",
  "k6": 440103,
  "k7": "020"
}, {
  "id": 2214,
  "name": "越秀",
  "parent_id": 321,
  "k1": "y",
  "k2": "yx",
  "k3": "yuexiu",
  "k4": "",
  "k5": "区",
  "k6": 440104,
  "k7": "020"
}, {
  "id": 2215,
  "name": "海珠",
  "parent_id": 321,
  "k1": "h",
  "k2": "hz",
  "k3": "haizhu",
  "k4": "",
  "k5": "区",
  "k6": 440105,
  "k7": "020"
}, {
  "id": 2216,
  "name": "天河",
  "parent_id": 321,
  "k1": "t",
  "k2": "th",
  "k3": "tianhe",
  "k4": "",
  "k5": "区",
  "k6": 440106,
  "k7": "020"
}, {
  "id": 2217,
  "name": "白云",
  "parent_id": 321,
  "k1": "b",
  "k2": "by",
  "k3": "baiyun",
  "k4": "",
  "k5": "区",
  "k6": 440111,
  "k7": "020"
}, {
  "id": 2218,
  "name": "黄埔",
  "parent_id": 321,
  "k1": "h",
  "k2": "hp",
  "k3": "huangpu",
  "k4": "",
  "k5": "区",
  "k6": 440112,
  "k7": "020"
}, {
  "id": 2219,
  "name": "番禺",
  "parent_id": 321,
  "k1": "f",
  "k2": "fy",
  "k3": "fanyu",
  "k4": "",
  "k5": "区",
  "k6": 440113,
  "k7": "020"
}, {
  "id": 2220,
  "name": "花都",
  "parent_id": 321,
  "k1": "h",
  "k2": "hd",
  "k3": "huadu",
  "k4": "",
  "k5": "区",
  "k6": 440114,
  "k7": "020"
}, {
  "id": 2221,
  "name": "南沙",
  "parent_id": 321,
  "k1": "n",
  "k2": "ns",
  "k3": "nansha",
  "k4": "",
  "k5": "区",
  "k6": 440115,
  "k7": "020"
}, {
  "id": 2223,
  "name": "增城",
  "parent_id": 321,
  "k1": "z",
  "k2": "zc",
  "k3": "zengcheng",
  "k4": "",
  "k5": "区",
  "k6": 440118,
  "k7": "020"
}, {
  "id": 2224,
  "name": "从化",
  "parent_id": 321,
  "k1": "c",
  "k2": "ch",
  "k3": "conghua",
  "k4": "",
  "k5": "区",
  "k6": 440117,
  "k7": "020"
}, {
  "id": 2225,
  "name": "武江",
  "parent_id": 322,
  "k1": "w",
  "k2": "wj",
  "k3": "wujiang",
  "k4": "",
  "k5": "区",
  "k6": 440203,
  "k7": "0751"
}, {
  "id": 2226,
  "name": "浈江",
  "parent_id": 322,
  "k1": "z",
  "k2": "zj",
  "k3": "zhenjiang",
  "k4": "",
  "k5": "区",
  "k6": 440204,
  "k7": "0751"
}, {
  "id": 2227,
  "name": "曲江",
  "parent_id": 322,
  "k1": "q",
  "k2": "qj",
  "k3": "qujiang",
  "k4": "",
  "k5": "区",
  "k6": 440205,
  "k7": "0751"
}, {
  "id": 2228,
  "name": "始兴",
  "parent_id": 322,
  "k1": "s",
  "k2": "sx",
  "k3": "shixing",
  "k4": "",
  "k5": "县",
  "k6": 440222,
  "k7": "0751"
}, {
  "id": 2229,
  "name": "仁化",
  "parent_id": 322,
  "k1": "r",
  "k2": "rh",
  "k3": "renhua",
  "k4": "",
  "k5": "县",
  "k6": 440224,
  "k7": "0751"
}, {
  "id": 2230,
  "name": "翁源",
  "parent_id": 322,
  "k1": "w",
  "k2": "wy",
  "k3": "wengyuan",
  "k4": "",
  "k5": "县",
  "k6": 440229,
  "k7": "0751"
}, {
  "id": 2231,
  "name": "乳源",
  "parent_id": 322,
  "k1": "r",
  "k2": "ry",
  "k3": "ruyuan",
  "k4": "瑶族",
  "k5": "自治县",
  "k6": 440232,
  "k7": "0751"
}, {
  "id": 2232,
  "name": "新丰",
  "parent_id": 322,
  "k1": "x",
  "k2": "xf",
  "k3": "xinfeng",
  "k4": "",
  "k5": "县",
  "k6": 440233,
  "k7": "0751"
}, {
  "id": 2233,
  "name": "乐昌",
  "parent_id": 322,
  "k1": "l",
  "k2": "lc",
  "k3": "lechang",
  "k4": "",
  "k5": "市",
  "k6": 440281,
  "k7": "0751"
}, {
  "id": 2234,
  "name": "南雄",
  "parent_id": 322,
  "k1": "n",
  "k2": "nx",
  "k3": "nanxiong",
  "k4": "",
  "k5": "市",
  "k6": 440282,
  "k7": "0751"
}, {
  "id": 2235,
  "name": "罗湖",
  "parent_id": 323,
  "k1": "l",
  "k2": "lh",
  "k3": "luohu",
  "k4": "",
  "k5": "区",
  "k6": 440303,
  "k7": "0755"
}, {
  "id": 2236,
  "name": "福田",
  "parent_id": 323,
  "k1": "f",
  "k2": "ft",
  "k3": "futian",
  "k4": "",
  "k5": "区",
  "k6": 440304,
  "k7": "0755"
}, {
  "id": 2237,
  "name": "南山",
  "parent_id": 323,
  "k1": "n",
  "k2": "ns",
  "k3": "nanshan",
  "k4": "",
  "k5": "区",
  "k6": 440305,
  "k7": "0755"
}, {
  "id": 2238,
  "name": "宝安",
  "parent_id": 323,
  "k1": "b",
  "k2": "ba",
  "k3": "baoan",
  "k4": "",
  "k5": "区",
  "k6": 440306,
  "k7": "0755"
}, {
  "id": 2239,
  "name": "龙岗",
  "parent_id": 323,
  "k1": "l",
  "k2": "lg",
  "k3": "longgang",
  "k4": "",
  "k5": "区",
  "k6": 440307,
  "k7": "0755"
}, {
  "id": 2240,
  "name": "盐田",
  "parent_id": 323,
  "k1": "y",
  "k2": "yt",
  "k3": "yantian",
  "k4": "",
  "k5": "区",
  "k6": 440308,
  "k7": "0755"
}, {
  "id": 2241,
  "name": "香洲",
  "parent_id": 324,
  "k1": "x",
  "k2": "xz",
  "k3": "xiangzhou",
  "k4": "",
  "k5": "区",
  "k6": 440402,
  "k7": "0756"
}, {
  "id": 2242,
  "name": "斗门",
  "parent_id": 324,
  "k1": "d",
  "k2": "dm",
  "k3": "doumen",
  "k4": "",
  "k5": "区",
  "k6": 440403,
  "k7": "0756"
}, {
  "id": 2243,
  "name": "金湾",
  "parent_id": 324,
  "k1": "j",
  "k2": "jw",
  "k3": "jinwan",
  "k4": "",
  "k5": "区",
  "k6": 440404,
  "k7": "0756"
}, {
  "id": 2244,
  "name": "龙湖",
  "parent_id": 325,
  "k1": "l",
  "k2": "lh",
  "k3": "longhu",
  "k4": "",
  "k5": "区",
  "k6": 440507,
  "k7": "0754"
}, {
  "id": 2245,
  "name": "金平",
  "parent_id": 325,
  "k1": "j",
  "k2": "jp",
  "k3": "jinping",
  "k4": "",
  "k5": "区",
  "k6": 440511,
  "k7": "0754"
}, {
  "id": 2246,
  "name": "濠江",
  "parent_id": 325,
  "k1": "h",
  "k2": "hj",
  "k3": "haojiang",
  "k4": "",
  "k5": "区",
  "k6": 440512,
  "k7": "0754"
}, {
  "id": 2247,
  "name": "潮阳",
  "parent_id": 325,
  "k1": "c",
  "k2": "cy",
  "k3": "chaoyang",
  "k4": "",
  "k5": "区",
  "k6": 440513,
  "k7": "0754"
}, {
  "id": 2248,
  "name": "潮南",
  "parent_id": 325,
  "k1": "c",
  "k2": "cn",
  "k3": "chaonan",
  "k4": "",
  "k5": "区",
  "k6": 440514,
  "k7": "0754"
}, {
  "id": 2249,
  "name": "澄海",
  "parent_id": 325,
  "k1": "c",
  "k2": "ch",
  "k3": "chenghai",
  "k4": "",
  "k5": "区",
  "k6": 440515,
  "k7": "0754"
}, {
  "id": 2250,
  "name": "南澳",
  "parent_id": 325,
  "k1": "n",
  "k2": "na",
  "k3": "nanao",
  "k4": "",
  "k5": "县",
  "k6": 440523,
  "k7": "0754"
}, {
  "id": 2251,
  "name": "禅城",
  "parent_id": 326,
  "k1": "s",
  "k2": "sc",
  "k3": "shancheng",
  "k4": "",
  "k5": "区",
  "k6": 440604,
  "k7": "0757"
}, {
  "id": 2252,
  "name": "南海",
  "parent_id": 326,
  "k1": "n",
  "k2": "nh",
  "k3": "nanhai",
  "k4": "",
  "k5": "区",
  "k6": 440605,
  "k7": "0757"
}, {
  "id": 2253,
  "name": "顺德",
  "parent_id": 326,
  "k1": "s",
  "k2": "sd",
  "k3": "shunde",
  "k4": "",
  "k5": "区",
  "k6": 440606,
  "k7": "0757"
}, {
  "id": 2254,
  "name": "三水",
  "parent_id": 326,
  "k1": "s",
  "k2": "ss",
  "k3": "sanshui",
  "k4": "",
  "k5": "区",
  "k6": 440607,
  "k7": "0757"
}, {
  "id": 2255,
  "name": "高明",
  "parent_id": 326,
  "k1": "g",
  "k2": "gm",
  "k3": "gaoming",
  "k4": "",
  "k5": "区",
  "k6": 440608,
  "k7": "0757"
}, {
  "id": 2256,
  "name": "蓬江",
  "parent_id": 327,
  "k1": "p",
  "k2": "pj",
  "k3": "pengjiang",
  "k4": "",
  "k5": "区",
  "k6": 440703,
  "k7": "0750"
}, {
  "id": 2257,
  "name": "江海",
  "parent_id": 327,
  "k1": "j",
  "k2": "jh",
  "k3": "jianghai",
  "k4": "",
  "k5": "区",
  "k6": 440704,
  "k7": "0750"
}, {
  "id": 2258,
  "name": "新会",
  "parent_id": 327,
  "k1": "x",
  "k2": "xh",
  "k3": "xinhui",
  "k4": "",
  "k5": "区",
  "k6": 440705,
  "k7": "0750"
}, {
  "id": 2259,
  "name": "台山",
  "parent_id": 327,
  "k1": "t",
  "k2": "ts",
  "k3": "taishan",
  "k4": "",
  "k5": "市",
  "k6": 440781,
  "k7": "0750"
}, {
  "id": 2260,
  "name": "开平",
  "parent_id": 327,
  "k1": "k",
  "k2": "kp",
  "k3": "kaiping",
  "k4": "",
  "k5": "市",
  "k6": 440783,
  "k7": "0750"
}, {
  "id": 2261,
  "name": "鹤山",
  "parent_id": 327,
  "k1": "h",
  "k2": "hs",
  "k3": "heshan",
  "k4": "",
  "k5": "市",
  "k6": 440784,
  "k7": "0750"
}, {
  "id": 2262,
  "name": "恩平",
  "parent_id": 327,
  "k1": "e",
  "k2": "ep",
  "k3": "enping",
  "k4": "",
  "k5": "市",
  "k6": 440785,
  "k7": "0750"
}, {
  "id": 2263,
  "name": "赤坎",
  "parent_id": 328,
  "k1": "c",
  "k2": "ck",
  "k3": "chikan",
  "k4": "",
  "k5": "区",
  "k6": 440802,
  "k7": "0759"
}, {
  "id": 2264,
  "name": "霞山",
  "parent_id": 328,
  "k1": "x",
  "k2": "xs",
  "k3": "xiashan",
  "k4": "",
  "k5": "区",
  "k6": 440803,
  "k7": "0759"
}, {
  "id": 2265,
  "name": "坡头",
  "parent_id": 328,
  "k1": "p",
  "k2": "pt",
  "k3": "potou",
  "k4": "",
  "k5": "区",
  "k6": 440804,
  "k7": "0759"
}, {
  "id": 2266,
  "name": "麻章",
  "parent_id": 328,
  "k1": "m",
  "k2": "mz",
  "k3": "mazhang",
  "k4": "",
  "k5": "区",
  "k6": 440811,
  "k7": "0759"
}, {
  "id": 2267,
  "name": "遂溪",
  "parent_id": 328,
  "k1": "s",
  "k2": "sx",
  "k3": "suixi",
  "k4": "",
  "k5": "县",
  "k6": 440823,
  "k7": "0759"
}, {
  "id": 2268,
  "name": "徐闻",
  "parent_id": 328,
  "k1": "x",
  "k2": "xw",
  "k3": "xuwen",
  "k4": "",
  "k5": "县",
  "k6": 440825,
  "k7": "0759"
}, {
  "id": 2269,
  "name": "廉江",
  "parent_id": 328,
  "k1": "l",
  "k2": "lj",
  "k3": "lianjiang",
  "k4": "",
  "k5": "市",
  "k6": 440881,
  "k7": "0759"
}, {
  "id": 2270,
  "name": "雷州",
  "parent_id": 328,
  "k1": "l",
  "k2": "lz",
  "k3": "leizhou",
  "k4": "",
  "k5": "市",
  "k6": 440882,
  "k7": "0759"
}, {
  "id": 2271,
  "name": "吴川",
  "parent_id": 328,
  "k1": "w",
  "k2": "wc",
  "k3": "wuchuan",
  "k4": "",
  "k5": "市",
  "k6": 440883,
  "k7": "0759"
}, {
  "id": 2272,
  "name": "茂南",
  "parent_id": 329,
  "k1": "m",
  "k2": "mn",
  "k3": "maonan",
  "k4": "",
  "k5": "区",
  "k6": 440902,
  "k7": "0668"
}, {
  "id": 2274,
  "name": "电白",
  "parent_id": 329,
  "k1": "d",
  "k2": "db",
  "k3": "dianbai",
  "k4": "",
  "k5": "区",
  "k6": 440904,
  "k7": "0668"
}, {
  "id": 2275,
  "name": "高州",
  "parent_id": 329,
  "k1": "g",
  "k2": "gz",
  "k3": "gaozhou",
  "k4": "",
  "k5": "市",
  "k6": 440981,
  "k7": "0668"
}, {
  "id": 2276,
  "name": "化州",
  "parent_id": 329,
  "k1": "h",
  "k2": "hz",
  "k3": "huazhou",
  "k4": "",
  "k5": "市",
  "k6": 440982,
  "k7": "0668"
}, {
  "id": 2277,
  "name": "信宜",
  "parent_id": 329,
  "k1": "x",
  "k2": "xy",
  "k3": "xinyi",
  "k4": "",
  "k5": "市",
  "k6": 440983,
  "k7": "0668"
}, {
  "id": 2278,
  "name": "端州",
  "parent_id": 330,
  "k1": "d",
  "k2": "dz",
  "k3": "duanzhou",
  "k4": "",
  "k5": "区",
  "k6": 441202,
  "k7": "0758"
}, {
  "id": 2279,
  "name": "鼎湖",
  "parent_id": 330,
  "k1": "d",
  "k2": "dh",
  "k3": "dinghu",
  "k4": "",
  "k5": "区",
  "k6": 441203,
  "k7": "0758"
}, {
  "id": 2280,
  "name": "广宁",
  "parent_id": 330,
  "k1": "g",
  "k2": "gn",
  "k3": "guangning",
  "k4": "",
  "k5": "县",
  "k6": 441223,
  "k7": "0758"
}, {
  "id": 2281,
  "name": "怀集",
  "parent_id": 330,
  "k1": "h",
  "k2": "hj",
  "k3": "huaiji",
  "k4": "",
  "k5": "县",
  "k6": 441224,
  "k7": "0758"
}, {
  "id": 2282,
  "name": "封开",
  "parent_id": 330,
  "k1": "f",
  "k2": "fk",
  "k3": "fengkai",
  "k4": "",
  "k5": "县",
  "k6": 441225,
  "k7": "0758"
}, {
  "id": 2283,
  "name": "德庆",
  "parent_id": 330,
  "k1": "d",
  "k2": "dq",
  "k3": "deqing",
  "k4": "",
  "k5": "县",
  "k6": 441226,
  "k7": "0758"
}, {
  "id": 2284,
  "name": "高要",
  "parent_id": 330,
  "k1": "g",
  "k2": "gy",
  "k3": "gaoyao",
  "k4": "",
  "k5": "区",
  "k6": 441283,
  "k7": "0758"
}, {
  "id": 2285,
  "name": "四会",
  "parent_id": 330,
  "k1": "s",
  "k2": "sh",
  "k3": "sihui",
  "k4": "",
  "k5": "市",
  "k6": 441284,
  "k7": "0758"
}, {
  "id": 2286,
  "name": "惠城",
  "parent_id": 331,
  "k1": "h",
  "k2": "hc",
  "k3": "huicheng",
  "k4": "",
  "k5": "区",
  "k6": 441302,
  "k7": "0752"
}, {
  "id": 2287,
  "name": "惠阳",
  "parent_id": 331,
  "k1": "h",
  "k2": "hy",
  "k3": "huiyang",
  "k4": "",
  "k5": "区",
  "k6": 441303,
  "k7": "0752"
}, {
  "id": 2288,
  "name": "博罗",
  "parent_id": 331,
  "k1": "b",
  "k2": "bl",
  "k3": "boluo",
  "k4": "",
  "k5": "县",
  "k6": 441322,
  "k7": "0752"
}, {
  "id": 2289,
  "name": "惠东",
  "parent_id": 331,
  "k1": "h",
  "k2": "hd",
  "k3": "huidong",
  "k4": "",
  "k5": "县",
  "k6": 441323,
  "k7": "0752"
}, {
  "id": 2290,
  "name": "龙门",
  "parent_id": 331,
  "k1": "l",
  "k2": "lm",
  "k3": "longmen",
  "k4": "",
  "k5": "县",
  "k6": 441324,
  "k7": "0752"
}, {
  "id": 2291,
  "name": "梅江",
  "parent_id": 332,
  "k1": "m",
  "k2": "mj",
  "k3": "meijiang",
  "k4": "",
  "k5": "区",
  "k6": 441402,
  "k7": "0753"
}, {
  "id": 2292,
  "name": "梅县",
  "parent_id": 332,
  "k1": "m",
  "k2": "mx",
  "k3": "meixian",
  "k4": "",
  "k5": "区",
  "k6": 441403,
  "k7": "0753"
}, {
  "id": 2293,
  "name": "大埔",
  "parent_id": 332,
  "k1": "d",
  "k2": "dp",
  "k3": "dapu",
  "k4": "",
  "k5": "县",
  "k6": 441422,
  "k7": "0753"
}, {
  "id": 2294,
  "name": "丰顺",
  "parent_id": 332,
  "k1": "f",
  "k2": "fs",
  "k3": "fengshun",
  "k4": "",
  "k5": "县",
  "k6": 441423,
  "k7": "0753"
}, {
  "id": 2295,
  "name": "五华",
  "parent_id": 332,
  "k1": "w",
  "k2": "wh",
  "k3": "wuhua",
  "k4": "",
  "k5": "县",
  "k6": 441424,
  "k7": "0753"
}, {
  "id": 2296,
  "name": "平远",
  "parent_id": 332,
  "k1": "p",
  "k2": "py",
  "k3": "pingyuan",
  "k4": "",
  "k5": "县",
  "k6": 441426,
  "k7": "0753"
}, {
  "id": 2297,
  "name": "蕉岭",
  "parent_id": 332,
  "k1": "j",
  "k2": "jl",
  "k3": "jiaoling",
  "k4": "",
  "k5": "县",
  "k6": 441427,
  "k7": "0753"
}, {
  "id": 2298,
  "name": "兴宁",
  "parent_id": 332,
  "k1": "x",
  "k2": "xn",
  "k3": "xingning",
  "k4": "",
  "k5": "市",
  "k6": 441481,
  "k7": "0753"
}, {
  "id": 2299,
  "name": "城区",
  "parent_id": 333,
  "k1": "c",
  "k2": "cq",
  "k3": "chengqu",
  "k4": "",
  "k5": "区",
  "k6": 441502,
  "k7": "0660"
}, {
  "id": 2300,
  "name": "海丰",
  "parent_id": 333,
  "k1": "h",
  "k2": "hf",
  "k3": "haifeng",
  "k4": "",
  "k5": "县",
  "k6": 441521,
  "k7": "0660"
}, {
  "id": 2301,
  "name": "陆河",
  "parent_id": 333,
  "k1": "l",
  "k2": "lh",
  "k3": "luhe",
  "k4": "",
  "k5": "县",
  "k6": 441523,
  "k7": "0660"
}, {
  "id": 2302,
  "name": "陆丰",
  "parent_id": 333,
  "k1": "l",
  "k2": "lf",
  "k3": "lufeng",
  "k4": "",
  "k5": "市",
  "k6": 441581,
  "k7": "0660"
}, {
  "id": 2303,
  "name": "源城",
  "parent_id": 334,
  "k1": "y",
  "k2": "yc",
  "k3": "yuancheng",
  "k4": "",
  "k5": "区",
  "k6": 441602,
  "k7": "0762"
}, {
  "id": 2304,
  "name": "紫金",
  "parent_id": 334,
  "k1": "z",
  "k2": "zj",
  "k3": "zijin",
  "k4": "",
  "k5": "县",
  "k6": 441621,
  "k7": "0762"
}, {
  "id": 2305,
  "name": "龙川",
  "parent_id": 334,
  "k1": "l",
  "k2": "lc",
  "k3": "longchuan",
  "k4": "",
  "k5": "县",
  "k6": 441622,
  "k7": "0762"
}, {
  "id": 2306,
  "name": "连平",
  "parent_id": 334,
  "k1": "l",
  "k2": "lp",
  "k3": "lianping",
  "k4": "",
  "k5": "县",
  "k6": 441623,
  "k7": "0762"
}, {
  "id": 2307,
  "name": "和平",
  "parent_id": 334,
  "k1": "h",
  "k2": "hp",
  "k3": "heping",
  "k4": "",
  "k5": "县",
  "k6": 441624,
  "k7": "0762"
}, {
  "id": 2308,
  "name": "东源",
  "parent_id": 334,
  "k1": "d",
  "k2": "dy",
  "k3": "dongyuan",
  "k4": "",
  "k5": "县",
  "k6": 441625,
  "k7": "0762"
}, {
  "id": 2309,
  "name": "江城",
  "parent_id": 335,
  "k1": "j",
  "k2": "jc",
  "k3": "jiangcheng",
  "k4": "",
  "k5": "区",
  "k6": 441702,
  "k7": "0662"
}, {
  "id": 2310,
  "name": "阳西",
  "parent_id": 335,
  "k1": "y",
  "k2": "yx",
  "k3": "yangxi",
  "k4": "",
  "k5": "县",
  "k6": 441721,
  "k7": "0662"
}, {
  "id": 2311,
  "name": "阳东",
  "parent_id": 335,
  "k1": "y",
  "k2": "yd",
  "k3": "yangdong",
  "k4": "",
  "k5": "区",
  "k6": 441723,
  "k7": "0662"
}, {
  "id": 2312,
  "name": "阳春",
  "parent_id": 335,
  "k1": "y",
  "k2": "yc",
  "k3": "yangchun",
  "k4": "",
  "k5": "市",
  "k6": 441781,
  "k7": "0662"
}, {
  "id": 2313,
  "name": "清城",
  "parent_id": 336,
  "k1": "q",
  "k2": "qc",
  "k3": "qingcheng",
  "k4": "",
  "k5": "区",
  "k6": 441802,
  "k7": "0763"
}, {
  "id": 2314,
  "name": "佛冈",
  "parent_id": 336,
  "k1": "f",
  "k2": "fg",
  "k3": "fogang",
  "k4": "",
  "k5": "县",
  "k6": 441821,
  "k7": "0763"
}, {
  "id": 2315,
  "name": "阳山",
  "parent_id": 336,
  "k1": "y",
  "k2": "ys",
  "k3": "yangshan",
  "k4": "",
  "k5": "县",
  "k6": 441823,
  "k7": "0763"
}, {
  "id": 2316,
  "name": "连山",
  "parent_id": 336,
  "k1": "l",
  "k2": "ls",
  "k3": "lianshan",
  "k4": "壮族瑶族",
  "k5": "自治县",
  "k6": 441825,
  "k7": "0763"
}, {
  "id": 2317,
  "name": "连南",
  "parent_id": 336,
  "k1": "l",
  "k2": "ln",
  "k3": "liannan",
  "k4": "瑶族",
  "k5": "自治县",
  "k6": 441826,
  "k7": "0763"
}, {
  "id": 2318,
  "name": "清新",
  "parent_id": 336,
  "k1": "q",
  "k2": "qx",
  "k3": "qingxin",
  "k4": "",
  "k5": "县",
  "k6": 441827,
  "k7": "0763"
}, {
  "id": 2319,
  "name": "英德",
  "parent_id": 336,
  "k1": "y",
  "k2": "yd",
  "k3": "yingde",
  "k4": "",
  "k5": "市",
  "k6": 441881,
  "k7": "0763"
}, {
  "id": 2320,
  "name": "连州",
  "parent_id": 336,
  "k1": "l",
  "k2": "lz",
  "k3": "lianzhou",
  "k4": "",
  "k5": "市",
  "k6": 441882,
  "k7": "0763"
}, {
  "id": 2321,
  "name": "湘桥",
  "parent_id": 339,
  "k1": "x",
  "k2": "xq",
  "k3": "xiangqiao",
  "k4": "",
  "k5": "区",
  "k6": 445102,
  "k7": "0768"
}, {
  "id": 2322,
  "name": "潮安",
  "parent_id": 339,
  "k1": "c",
  "k2": "ca",
  "k3": "chaoan",
  "k4": "",
  "k5": "区",
  "k6": 445121,
  "k7": "0768"
}, {
  "id": 2323,
  "name": "饶平",
  "parent_id": 339,
  "k1": "r",
  "k2": "rp",
  "k3": "raoping",
  "k4": "",
  "k5": "县",
  "k6": 445122,
  "k7": "0768"
}, {
  "id": 2324,
  "name": "榕城",
  "parent_id": 340,
  "k1": "r",
  "k2": "rc",
  "k3": "rongcheng",
  "k4": "",
  "k5": "区",
  "k6": 445202,
  "k7": "0663"
}, {
  "id": 2325,
  "name": "揭东",
  "parent_id": 340,
  "k1": "j",
  "k2": "jd",
  "k3": "jiedong",
  "k4": "",
  "k5": "县",
  "k6": 445221,
  "k7": "0663"
}, {
  "id": 2326,
  "name": "揭西",
  "parent_id": 340,
  "k1": "j",
  "k2": "jx",
  "k3": "jiexi",
  "k4": "",
  "k5": "县",
  "k6": 445222,
  "k7": "0663"
}, {
  "id": 2327,
  "name": "惠来",
  "parent_id": 340,
  "k1": "h",
  "k2": "hl",
  "k3": "huilai",
  "k4": "",
  "k5": "县",
  "k6": 445224,
  "k7": "0663"
}, {
  "id": 2328,
  "name": "普宁",
  "parent_id": 340,
  "k1": "p",
  "k2": "pn",
  "k3": "puning",
  "k4": "",
  "k5": "市",
  "k6": 445281,
  "k7": "0663"
}, {
  "id": 2329,
  "name": "云城",
  "parent_id": 341,
  "k1": "y",
  "k2": "yc",
  "k3": "yuncheng",
  "k4": "",
  "k5": "区",
  "k6": 445302,
  "k7": "0766"
}, {
  "id": 2330,
  "name": "新兴",
  "parent_id": 341,
  "k1": "x",
  "k2": "xx",
  "k3": "xinxing",
  "k4": "",
  "k5": "县",
  "k6": 445321,
  "k7": "0766"
}, {
  "id": 2331,
  "name": "郁南",
  "parent_id": 341,
  "k1": "y",
  "k2": "yn",
  "k3": "yunan",
  "k4": "",
  "k5": "县",
  "k6": 445322,
  "k7": "0766"
}, {
  "id": 2332,
  "name": "云安",
  "parent_id": 341,
  "k1": "y",
  "k2": "ya",
  "k3": "yunan",
  "k4": "",
  "k5": "区",
  "k6": 445302,
  "k7": "0766"
}, {
  "id": 2333,
  "name": "罗定",
  "parent_id": 341,
  "k1": "l",
  "k2": "ld",
  "k3": "luoding",
  "k4": "",
  "k5": "市",
  "k6": 445381,
  "k7": "0766"
}, {
  "id": 2334,
  "name": "兴宁",
  "parent_id": 342,
  "k1": "x",
  "k2": "xn",
  "k3": "xingning",
  "k4": "",
  "k5": "区",
  "k6": 450102,
  "k7": "0771"
}, {
  "id": 2335,
  "name": "青秀",
  "parent_id": 342,
  "k1": "q",
  "k2": "qx",
  "k3": "qingxiu",
  "k4": "",
  "k5": "区",
  "k6": 450103,
  "k7": "0771"
}, {
  "id": 2336,
  "name": "江南",
  "parent_id": 342,
  "k1": "j",
  "k2": "jn",
  "k3": "jiangnan",
  "k4": "",
  "k5": "区",
  "k6": 450105,
  "k7": "0771"
}, {
  "id": 2337,
  "name": "西乡塘",
  "parent_id": 342,
  "k1": "x",
  "k2": "xxt",
  "k3": "xixiangtang",
  "k4": "",
  "k5": "区",
  "k6": 450107,
  "k7": "0771"
}, {
  "id": 2338,
  "name": "良庆",
  "parent_id": 342,
  "k1": "l",
  "k2": "lq",
  "k3": "liangqing",
  "k4": "",
  "k5": "区",
  "k6": 450108,
  "k7": "0771"
}, {
  "id": 2339,
  "name": "邕宁",
  "parent_id": 342,
  "k1": "y",
  "k2": "yn",
  "k3": "yongning",
  "k4": "",
  "k5": "区",
  "k6": 450109,
  "k7": "0771"
}, {
  "id": 2340,
  "name": "武鸣",
  "parent_id": 342,
  "k1": "w",
  "k2": "wm",
  "k3": "wuming",
  "k4": "",
  "k5": "区",
  "k6": 450122,
  "k7": "0771"
}, {
  "id": 2341,
  "name": "隆安",
  "parent_id": 342,
  "k1": "l",
  "k2": "la",
  "k3": "longan",
  "k4": "",
  "k5": "县",
  "k6": 450123,
  "k7": "0771"
}, {
  "id": 2342,
  "name": "马山",
  "parent_id": 342,
  "k1": "m",
  "k2": "ms",
  "k3": "mashan",
  "k4": "",
  "k5": "县",
  "k6": 450124,
  "k7": "0771"
}, {
  "id": 2343,
  "name": "上林",
  "parent_id": 342,
  "k1": "s",
  "k2": "sl",
  "k3": "shanglin",
  "k4": "",
  "k5": "县",
  "k6": 450125,
  "k7": "0771"
}, {
  "id": 2344,
  "name": "宾阳",
  "parent_id": 342,
  "k1": "b",
  "k2": "by",
  "k3": "binyang",
  "k4": "",
  "k5": "县",
  "k6": 450126,
  "k7": "0771"
}, {
  "id": 2345,
  "name": "横县",
  "parent_id": 342,
  "k1": "h",
  "k2": "hx",
  "k3": "hengxian",
  "k4": "",
  "k5": "",
  "k6": 450127,
  "k7": "0771"
}, {
  "id": 2346,
  "name": "城中",
  "parent_id": 343,
  "k1": "c",
  "k2": "cz",
  "k3": "chengzhong",
  "k4": "",
  "k5": "区",
  "k6": 450202,
  "k7": "0772"
}, {
  "id": 2347,
  "name": "鱼峰",
  "parent_id": 343,
  "k1": "y",
  "k2": "yf",
  "k3": "yufeng",
  "k4": "",
  "k5": "区",
  "k6": 450203,
  "k7": "0772"
}, {
  "id": 2348,
  "name": "柳南",
  "parent_id": 343,
  "k1": "l",
  "k2": "ln",
  "k3": "liunan",
  "k4": "",
  "k5": "区",
  "k6": 450204,
  "k7": "0772"
}, {
  "id": 2349,
  "name": "柳北",
  "parent_id": 343,
  "k1": "l",
  "k2": "lb",
  "k3": "liubei",
  "k4": "",
  "k5": "区",
  "k6": 450205,
  "k7": "0772"
}, {
  "id": 2350,
  "name": "柳江",
  "parent_id": 343,
  "k1": "l",
  "k2": "lj",
  "k3": "liujiang",
  "k4": "",
  "k5": "区",
  "k6": 450206,
  "k7": "0772"
}, {
  "id": 2351,
  "name": "柳城",
  "parent_id": 343,
  "k1": "l",
  "k2": "lc",
  "k3": "liucheng",
  "k4": "",
  "k5": "县",
  "k6": 450222,
  "k7": "0772"
}, {
  "id": 2352,
  "name": "鹿寨",
  "parent_id": 343,
  "k1": "l",
  "k2": "lz",
  "k3": "luzhai",
  "k4": "",
  "k5": "县",
  "k6": 450223,
  "k7": "0772"
}, {
  "id": 2353,
  "name": "融安",
  "parent_id": 343,
  "k1": "r",
  "k2": "ra",
  "k3": "rongan",
  "k4": "",
  "k5": "县",
  "k6": 450224,
  "k7": "0772"
}, {
  "id": 2354,
  "name": "融水",
  "parent_id": 343,
  "k1": "r",
  "k2": "rs",
  "k3": "rongshui",
  "k4": "苗族",
  "k5": "自治县",
  "k6": 450225,
  "k7": "0772"
}, {
  "id": 2355,
  "name": "三江",
  "parent_id": 343,
  "k1": "s",
  "k2": "sj",
  "k3": "sanjiang",
  "k4": "侗族",
  "k5": "自治县",
  "k6": 450226,
  "k7": "0772"
}, {
  "id": 2356,
  "name": "秀峰",
  "parent_id": 344,
  "k1": "x",
  "k2": "xf",
  "k3": "xiufeng",
  "k4": "",
  "k5": "区",
  "k6": 450302,
  "k7": "0773"
}, {
  "id": 2357,
  "name": "叠彩",
  "parent_id": 344,
  "k1": "d",
  "k2": "dc",
  "k3": "diecai",
  "k4": "",
  "k5": "区",
  "k6": 450303,
  "k7": "0773"
}, {
  "id": 2358,
  "name": "象山",
  "parent_id": 344,
  "k1": "x",
  "k2": "xs",
  "k3": "xiangshan",
  "k4": "",
  "k5": "区",
  "k6": 450304,
  "k7": "0773"
}, {
  "id": 2359,
  "name": "七星",
  "parent_id": 344,
  "k1": "q",
  "k2": "qx",
  "k3": "qixing",
  "k4": "",
  "k5": "区",
  "k6": 450305,
  "k7": "0773"
}, {
  "id": 2360,
  "name": "雁山",
  "parent_id": 344,
  "k1": "y",
  "k2": "ys",
  "k3": "yanshan",
  "k4": "",
  "k5": "区",
  "k6": 450311,
  "k7": "0773"
}, {
  "id": 2361,
  "name": "阳朔",
  "parent_id": 344,
  "k1": "y",
  "k2": "ys",
  "k3": "yangshuo",
  "k4": "",
  "k5": "县",
  "k6": 450321,
  "k7": "0773"
}, {
  "id": 2362,
  "name": "临桂",
  "parent_id": 344,
  "k1": "l",
  "k2": "lg",
  "k3": "lingui",
  "k4": "",
  "k5": "区",
  "k6": 450322,
  "k7": "0773"
}, {
  "id": 2363,
  "name": "灵川",
  "parent_id": 344,
  "k1": "l",
  "k2": "lc",
  "k3": "lingchuan",
  "k4": "",
  "k5": "县",
  "k6": 450323,
  "k7": "0773"
}, {
  "id": 2364,
  "name": "全州",
  "parent_id": 344,
  "k1": "q",
  "k2": "qz",
  "k3": "quanzhou",
  "k4": "",
  "k5": "县",
  "k6": 450324,
  "k7": "0773"
}, {
  "id": 2365,
  "name": "兴安",
  "parent_id": 344,
  "k1": "x",
  "k2": "xa",
  "k3": "xingan",
  "k4": "",
  "k5": "县",
  "k6": 450325,
  "k7": "0773"
}, {
  "id": 2366,
  "name": "永福",
  "parent_id": 344,
  "k1": "y",
  "k2": "yf",
  "k3": "yongfu",
  "k4": "",
  "k5": "县",
  "k6": 450326,
  "k7": "0773"
}, {
  "id": 2367,
  "name": "灌阳",
  "parent_id": 344,
  "k1": "g",
  "k2": "gy",
  "k3": "guanyang",
  "k4": "",
  "k5": "县",
  "k6": 450327,
  "k7": "0773"
}, {
  "id": 2368,
  "name": "龙胜",
  "parent_id": 344,
  "k1": "l",
  "k2": "ls",
  "k3": "longsheng",
  "k4": "各族",
  "k5": "自治县",
  "k6": 450328,
  "k7": "0773"
}, {
  "id": 2369,
  "name": "资源",
  "parent_id": 344,
  "k1": "z",
  "k2": "zy",
  "k3": "ziyuan",
  "k4": "",
  "k5": "县",
  "k6": 450329,
  "k7": "0773"
}, {
  "id": 2370,
  "name": "平乐",
  "parent_id": 344,
  "k1": "p",
  "k2": "pl",
  "k3": "pingle",
  "k4": "",
  "k5": "县",
  "k6": 450330,
  "k7": "0773"
}, {
  "id": 2371,
  "name": "荔浦",
  "parent_id": 344,
  "k1": "l",
  "k2": "lp",
  "k3": "lipu",
  "k4": "",
  "k5": "市",
  "k6": 450331,
  "k7": "0773"
}, {
  "id": 2372,
  "name": "恭城",
  "parent_id": 344,
  "k1": "g",
  "k2": "gc",
  "k3": "gongcheng",
  "k4": "瑶族",
  "k5": "自治县",
  "k6": 450332,
  "k7": "0773"
}, {
  "id": 2373,
  "name": "龙圩",
  "parent_id": 345,
  "k1": "l",
  "k2": "lw",
  "k3": "longwei",
  "k4": "",
  "k5": "区",
  "k6": "",
  "k7": "0774"
}, {
  "id": 2374,
  "name": "万秀",
  "parent_id": 345,
  "k1": "w",
  "k2": "wx",
  "k3": "wanxiu",
  "k4": "",
  "k5": "区",
  "k6": 450403,
  "k7": "0774"
}, {
  "id": 2375,
  "name": "长洲",
  "parent_id": 345,
  "k1": "c",
  "k2": "cz",
  "k3": "changzhou",
  "k4": "",
  "k5": "区",
  "k6": 450405,
  "k7": "0774"
}, {
  "id": 2376,
  "name": "苍梧",
  "parent_id": 345,
  "k1": "c",
  "k2": "cw",
  "k3": "cangwu",
  "k4": "",
  "k5": "县",
  "k6": 450421,
  "k7": "0774"
}, {
  "id": 2377,
  "name": "藤县",
  "parent_id": 345,
  "k1": "t",
  "k2": "tx",
  "k3": "tengxian",
  "k4": "",
  "k5": "",
  "k6": 450422,
  "k7": "0774"
}, {
  "id": 2378,
  "name": "蒙山",
  "parent_id": 345,
  "k1": "m",
  "k2": "ms",
  "k3": "mengshan",
  "k4": "",
  "k5": "县",
  "k6": 450423,
  "k7": "0774"
}, {
  "id": 2379,
  "name": "岑溪",
  "parent_id": 345,
  "k1": "c",
  "k2": "cx",
  "k3": "cenxi",
  "k4": "",
  "k5": "市",
  "k6": 450481,
  "k7": "0774"
}, {
  "id": 2380,
  "name": "海城",
  "parent_id": 346,
  "k1": "h",
  "k2": "hc",
  "k3": "haicheng",
  "k4": "",
  "k5": "区",
  "k6": 450502,
  "k7": "0779"
}, {
  "id": 2381,
  "name": "银海",
  "parent_id": 346,
  "k1": "y",
  "k2": "yh",
  "k3": "yinhai",
  "k4": "",
  "k5": "区",
  "k6": 450503,
  "k7": "0779"
}, {
  "id": 2382,
  "name": "铁山港",
  "parent_id": 346,
  "k1": "t",
  "k2": "tsg",
  "k3": "tieshangang",
  "k4": "",
  "k5": "区",
  "k6": 450512,
  "k7": "0779"
}, {
  "id": 2383,
  "name": "合浦",
  "parent_id": 346,
  "k1": "h",
  "k2": "hp",
  "k3": "hepu",
  "k4": "",
  "k5": "县",
  "k6": 450521,
  "k7": "0779"
}, {
  "id": 2384,
  "name": "港口",
  "parent_id": 347,
  "k1": "g",
  "k2": "gk",
  "k3": "gangkou",
  "k4": "",
  "k5": "区",
  "k6": 450602,
  "k7": "0770"
}, {
  "id": 2385,
  "name": "防城",
  "parent_id": 347,
  "k1": "f",
  "k2": "fc",
  "k3": "fangcheng",
  "k4": "",
  "k5": "区",
  "k6": 450603,
  "k7": "0770"
}, {
  "id": 2386,
  "name": "上思",
  "parent_id": 347,
  "k1": "s",
  "k2": "ss",
  "k3": "shangsi",
  "k4": "",
  "k5": "县",
  "k6": 450621,
  "k7": "0770"
}, {
  "id": 2387,
  "name": "东兴",
  "parent_id": 347,
  "k1": "d",
  "k2": "dx",
  "k3": "dongxing",
  "k4": "",
  "k5": "市",
  "k6": 450681,
  "k7": "0770"
}, {
  "id": 2388,
  "name": "钦南",
  "parent_id": 348,
  "k1": "q",
  "k2": "qn",
  "k3": "qinnan",
  "k4": "",
  "k5": "区",
  "k6": 450702,
  "k7": "0777"
}, {
  "id": 2389,
  "name": "钦北",
  "parent_id": 348,
  "k1": "q",
  "k2": "qb",
  "k3": "qinbei",
  "k4": "",
  "k5": "区",
  "k6": 450703,
  "k7": "0777"
}, {
  "id": 2390,
  "name": "灵山",
  "parent_id": 348,
  "k1": "l",
  "k2": "ls",
  "k3": "lingshan",
  "k4": "",
  "k5": "县",
  "k6": 450721,
  "k7": "0777"
}, {
  "id": 2391,
  "name": "浦北",
  "parent_id": 348,
  "k1": "p",
  "k2": "pb",
  "k3": "pubei",
  "k4": "",
  "k5": "县",
  "k6": 450722,
  "k7": "0777"
}, {
  "id": 2392,
  "name": "港北",
  "parent_id": 349,
  "k1": "g",
  "k2": "gb",
  "k3": "gangbei",
  "k4": "",
  "k5": "区",
  "k6": 450802,
  "k7": "0775"
}, {
  "id": 2393,
  "name": "港南",
  "parent_id": 349,
  "k1": "g",
  "k2": "gn",
  "k3": "gangnan",
  "k4": "",
  "k5": "区",
  "k6": 450803,
  "k7": "0775"
}, {
  "id": 2394,
  "name": "覃塘",
  "parent_id": 349,
  "k1": "t",
  "k2": "tt",
  "k3": "tantang",
  "k4": "",
  "k5": "区",
  "k6": 450804,
  "k7": "0775"
}, {
  "id": 2395,
  "name": "桂平",
  "parent_id": 349,
  "k1": "g",
  "k2": "gp",
  "k3": "guiping",
  "k4": "",
  "k5": "市",
  "k6": 450821,
  "k7": "0775"
}, {
  "id": 2396,
  "name": "平南",
  "parent_id": 349,
  "k1": "p",
  "k2": "pn",
  "k3": "pingnan",
  "k4": "",
  "k5": "县",
  "k6": 450881,
  "k7": "0775"
}, {
  "id": 2397,
  "name": "玉州",
  "parent_id": 350,
  "k1": "y",
  "k2": "yz",
  "k3": "yuzhou",
  "k4": "",
  "k5": "区",
  "k6": 450902,
  "k7": "0775"
}, {
  "id": 2398,
  "name": "容县",
  "parent_id": 350,
  "k1": "r",
  "k2": "rx",
  "k3": "rongxian",
  "k4": "",
  "k5": "",
  "k6": 450921,
  "k7": "0775"
}, {
  "id": 2399,
  "name": "陆川",
  "parent_id": 350,
  "k1": "l",
  "k2": "lc",
  "k3": "luchuan",
  "k4": "",
  "k5": "县",
  "k6": 450922,
  "k7": "0775"
}, {
  "id": 2400,
  "name": "博白",
  "parent_id": 350,
  "k1": "b",
  "k2": "bb",
  "k3": "bobai",
  "k4": "",
  "k5": "县",
  "k6": 450923,
  "k7": "0775"
}, {
  "id": 2401,
  "name": "兴业",
  "parent_id": 350,
  "k1": "x",
  "k2": "xy",
  "k3": "xingye",
  "k4": "",
  "k5": "县",
  "k6": 450924,
  "k7": "0775"
}, {
  "id": 2402,
  "name": "北流",
  "parent_id": 350,
  "k1": "b",
  "k2": "bl",
  "k3": "beiliu",
  "k4": "",
  "k5": "市",
  "k6": 450981,
  "k7": "0775"
}, {
  "id": 2403,
  "name": "右江",
  "parent_id": 351,
  "k1": "y",
  "k2": "yj",
  "k3": "youjiang",
  "k4": "",
  "k5": "区",
  "k6": 451002,
  "k7": "0776"
}, {
  "id": 2404,
  "name": "田阳",
  "parent_id": 351,
  "k1": "t",
  "k2": "ty",
  "k3": "tianyang",
  "k4": "",
  "k5": "县",
  "k6": 451021,
  "k7": "0776"
}, {
  "id": 2405,
  "name": "田东",
  "parent_id": 351,
  "k1": "t",
  "k2": "td",
  "k3": "tiandong",
  "k4": "",
  "k5": "县",
  "k6": 451022,
  "k7": "0776"
}, {
  "id": 2406,
  "name": "平果",
  "parent_id": 351,
  "k1": "p",
  "k2": "pg",
  "k3": "pingguo",
  "k4": "",
  "k5": "县",
  "k6": 451023,
  "k7": "0776"
}, {
  "id": 2407,
  "name": "德保",
  "parent_id": 351,
  "k1": "d",
  "k2": "db",
  "k3": "debao",
  "k4": "",
  "k5": "县",
  "k6": 451024,
  "k7": "0776"
}, {
  "id": 2408,
  "name": "靖西",
  "parent_id": 351,
  "k1": "j",
  "k2": "jx",
  "k3": "jingxi",
  "k4": "",
  "k5": "市",
  "k6": 451025,
  "k7": "0776"
}, {
  "id": 2409,
  "name": "那坡",
  "parent_id": 351,
  "k1": "n",
  "k2": "np",
  "k3": "neipo",
  "k4": "",
  "k5": "县",
  "k6": 451026,
  "k7": "0776"
}, {
  "id": 2410,
  "name": "凌云",
  "parent_id": 351,
  "k1": "l",
  "k2": "ly",
  "k3": "lingyun",
  "k4": "",
  "k5": "县",
  "k6": 451027,
  "k7": "0776"
}, {
  "id": 2411,
  "name": "乐业",
  "parent_id": 351,
  "k1": "l",
  "k2": "ly",
  "k3": "leye",
  "k4": "",
  "k5": "县",
  "k6": 451028,
  "k7": "0776"
}, {
  "id": 2412,
  "name": "田林",
  "parent_id": 351,
  "k1": "t",
  "k2": "tl",
  "k3": "tianlin",
  "k4": "",
  "k5": "县",
  "k6": 451029,
  "k7": "0776"
}, {
  "id": 2413,
  "name": "西林",
  "parent_id": 351,
  "k1": "x",
  "k2": "xl",
  "k3": "xilin",
  "k4": "",
  "k5": "县",
  "k6": 451030,
  "k7": "0776"
}, {
  "id": 2414,
  "name": "隆林",
  "parent_id": 351,
  "k1": "l",
  "k2": "ll",
  "k3": "longlin",
  "k4": "各族",
  "k5": "自治县",
  "k6": 451031,
  "k7": "0776"
}, {
  "id": 2415,
  "name": "八步",
  "parent_id": 352,
  "k1": "b",
  "k2": "bb",
  "k3": "babu",
  "k4": "",
  "k5": "区",
  "k6": 451102,
  "k7": "0774"
}, {
  "id": 2416,
  "name": "昭平",
  "parent_id": 352,
  "k1": "z",
  "k2": "zp",
  "k3": "zhaoping",
  "k4": "",
  "k5": "县",
  "k6": 451121,
  "k7": "0774"
}, {
  "id": 2417,
  "name": "钟山",
  "parent_id": 352,
  "k1": "z",
  "k2": "zs",
  "k3": "zhongshan",
  "k4": "",
  "k5": "县",
  "k6": 451122,
  "k7": "0774"
}, {
  "id": 2418,
  "name": "富川",
  "parent_id": 352,
  "k1": "f",
  "k2": "fc",
  "k3": "fuchuan",
  "k4": "瑶族",
  "k5": "自治县",
  "k6": 451123,
  "k7": "0774"
}, {
  "id": 2419,
  "name": "金城江",
  "parent_id": 353,
  "k1": "j",
  "k2": "jcj",
  "k3": "jinchengjiang",
  "k4": "",
  "k5": "区",
  "k6": 451202,
  "k7": "0778"
}, {
  "id": 2420,
  "name": "南丹",
  "parent_id": 353,
  "k1": "n",
  "k2": "nd",
  "k3": "nandan",
  "k4": "",
  "k5": "县",
  "k6": 451221,
  "k7": "0778"
}, {
  "id": 2421,
  "name": "天峨",
  "parent_id": 353,
  "k1": "t",
  "k2": "te",
  "k3": "tiane",
  "k4": "",
  "k5": "县",
  "k6": 451222,
  "k7": "0778"
}, {
  "id": 2422,
  "name": "凤山",
  "parent_id": 353,
  "k1": "f",
  "k2": "fs",
  "k3": "fengshan",
  "k4": "",
  "k5": "县",
  "k6": 451223,
  "k7": "0778"
}, {
  "id": 2423,
  "name": "东兰",
  "parent_id": 353,
  "k1": "d",
  "k2": "dl",
  "k3": "donglan",
  "k4": "",
  "k5": "县",
  "k6": 451224,
  "k7": "0778"
}, {
  "id": 2424,
  "name": "罗城",
  "parent_id": 353,
  "k1": "l",
  "k2": "lc",
  "k3": "luocheng",
  "k4": "仫佬族",
  "k5": "自治县",
  "k6": 451225,
  "k7": "0778"
}, {
  "id": 2425,
  "name": "环江",
  "parent_id": 353,
  "k1": "h",
  "k2": "hj",
  "k3": "huanjiang",
  "k4": "毛南族",
  "k5": "自治县",
  "k6": 451226,
  "k7": "0778"
}, {
  "id": 2426,
  "name": "巴马",
  "parent_id": 353,
  "k1": "b",
  "k2": "bm",
  "k3": "bama",
  "k4": "瑶族",
  "k5": "自治县",
  "k6": 451227,
  "k7": "0778"
}, {
  "id": 2427,
  "name": "都安",
  "parent_id": 353,
  "k1": "d",
  "k2": "da",
  "k3": "duan",
  "k4": "瑶族",
  "k5": "自治县",
  "k6": 451228,
  "k7": "0778"
}, {
  "id": 2428,
  "name": "大化",
  "parent_id": 353,
  "k1": "d",
  "k2": "dh",
  "k3": "dahua",
  "k4": "瑶族",
  "k5": "自治县",
  "k6": 451229,
  "k7": "0778"
}, {
  "id": 2429,
  "name": "宜州",
  "parent_id": 353,
  "k1": "y",
  "k2": "yz",
  "k3": "yizhou",
  "k4": "",
  "k5": "区",
  "k6": 451203,
  "k7": "0778"
}, {
  "id": 2430,
  "name": "兴宾",
  "parent_id": 354,
  "k1": "x",
  "k2": "xb",
  "k3": "xingbin",
  "k4": "",
  "k5": "区",
  "k6": 451302,
  "k7": "0772"
}, {
  "id": 2431,
  "name": "忻城",
  "parent_id": 354,
  "k1": "x",
  "k2": "xc",
  "k3": "xincheng",
  "k4": "",
  "k5": "县",
  "k6": 451321,
  "k7": "0772"
}, {
  "id": 2432,
  "name": "象州",
  "parent_id": 354,
  "k1": "x",
  "k2": "xz",
  "k3": "xiangzhou",
  "k4": "",
  "k5": "县",
  "k6": 451322,
  "k7": "0772"
}, {
  "id": 2433,
  "name": "武宣",
  "parent_id": 354,
  "k1": "w",
  "k2": "wx",
  "k3": "wuxuan",
  "k4": "",
  "k5": "县",
  "k6": 451323,
  "k7": "0772"
}, {
  "id": 2434,
  "name": "金秀",
  "parent_id": 354,
  "k1": "j",
  "k2": "jx",
  "k3": "jinxiu",
  "k4": "瑶族",
  "k5": "自治县",
  "k6": 451324,
  "k7": "0772"
}, {
  "id": 2435,
  "name": "合山",
  "parent_id": 354,
  "k1": "h",
  "k2": "hs",
  "k3": "heshan",
  "k4": "",
  "k5": "市",
  "k6": 451381,
  "k7": "0772"
}, {
  "id": 2436,
  "name": "江州",
  "parent_id": 355,
  "k1": "j",
  "k2": "jz",
  "k3": "jiangzhou",
  "k4": "",
  "k5": "区",
  "k6": 451402,
  "k7": "0771"
}, {
  "id": 2437,
  "name": "扶绥",
  "parent_id": 355,
  "k1": "f",
  "k2": "fs",
  "k3": "fusui",
  "k4": "",
  "k5": "县",
  "k6": 451421,
  "k7": "0771"
}, {
  "id": 2438,
  "name": "宁明",
  "parent_id": 355,
  "k1": "n",
  "k2": "nm",
  "k3": "ningming",
  "k4": "",
  "k5": "县",
  "k6": 451422,
  "k7": "0771"
}, {
  "id": 2439,
  "name": "龙州",
  "parent_id": 355,
  "k1": "l",
  "k2": "lz",
  "k3": "longzhou",
  "k4": "",
  "k5": "县",
  "k6": 451423,
  "k7": "0771"
}, {
  "id": 2440,
  "name": "大新",
  "parent_id": 355,
  "k1": "d",
  "k2": "dx",
  "k3": "daxin",
  "k4": "",
  "k5": "县",
  "k6": 451424,
  "k7": "0771"
}, {
  "id": 2441,
  "name": "天等",
  "parent_id": 355,
  "k1": "t",
  "k2": "td",
  "k3": "tiandeng",
  "k4": "",
  "k5": "县",
  "k6": 451425,
  "k7": "0771"
}, {
  "id": 2442,
  "name": "凭祥",
  "parent_id": 355,
  "k1": "p",
  "k2": "px",
  "k3": "pingxiang",
  "k4": "",
  "k5": "市",
  "k6": 451481,
  "k7": "0771"
}, {
  "id": 2443,
  "name": "秀英",
  "parent_id": 356,
  "k1": "x",
  "k2": "xy",
  "k3": "xiuying",
  "k4": "",
  "k5": "区",
  "k6": 460105,
  "k7": "0898"
}, {
  "id": 2444,
  "name": "龙华",
  "parent_id": 356,
  "k1": "l",
  "k2": "lh",
  "k3": "longhua",
  "k4": "",
  "k5": "区",
  "k6": 460106,
  "k7": "0898"
}, {
  "id": 2445,
  "name": "琼山",
  "parent_id": 356,
  "k1": "q",
  "k2": "qs",
  "k3": "qiongshan",
  "k4": "",
  "k5": "区",
  "k6": 460107,
  "k7": "0898"
}, {
  "id": 2446,
  "name": "美兰",
  "parent_id": 356,
  "k1": "m",
  "k2": "ml",
  "k3": "meilan",
  "k4": "",
  "k5": "区",
  "k6": 460108,
  "k7": "0898"
}, {
  "id": 2447,
  "name": "锦江",
  "parent_id": 375,
  "k1": "j",
  "k2": "jj",
  "k3": "jinjiang",
  "k4": "",
  "k5": "区",
  "k6": 510104,
  "k7": "028"
}, {
  "id": 2448,
  "name": "青羊",
  "parent_id": 375,
  "k1": "q",
  "k2": "qy",
  "k3": "qingyang",
  "k4": "",
  "k5": "区",
  "k6": 510105,
  "k7": "028"
}, {
  "id": 2449,
  "name": "金牛",
  "parent_id": 375,
  "k1": "j",
  "k2": "jn",
  "k3": "jinniu",
  "k4": "",
  "k5": "区",
  "k6": 510106,
  "k7": "028"
}, {
  "id": 2450,
  "name": "武侯",
  "parent_id": 375,
  "k1": "w",
  "k2": "wh",
  "k3": "wuhou",
  "k4": "",
  "k5": "区",
  "k6": 510107,
  "k7": "028"
}, {
  "id": 2451,
  "name": "成华",
  "parent_id": 375,
  "k1": "c",
  "k2": "ch",
  "k3": "chenghua",
  "k4": "",
  "k5": "区",
  "k6": 510108,
  "k7": "028"
}, {
  "id": 2452,
  "name": "龙泉驿",
  "parent_id": 375,
  "k1": "l",
  "k2": "lqy",
  "k3": "longquanyi",
  "k4": "",
  "k5": "区",
  "k6": 510112,
  "k7": "028"
}, {
  "id": 2453,
  "name": "青白江",
  "parent_id": 375,
  "k1": "q",
  "k2": "qbj",
  "k3": "qingbaijiang",
  "k4": "",
  "k5": "区",
  "k6": 510113,
  "k7": "028"
}, {
  "id": 2454,
  "name": "新都",
  "parent_id": 375,
  "k1": "x",
  "k2": "xd",
  "k3": "xindu",
  "k4": "",
  "k5": "区",
  "k6": 510114,
  "k7": "028"
}, {
  "id": 2455,
  "name": "温江",
  "parent_id": 375,
  "k1": "w",
  "k2": "wj",
  "k3": "wenjiang",
  "k4": "",
  "k5": "区",
  "k6": 510115,
  "k7": "028"
}, {
  "id": 2456,
  "name": "金堂",
  "parent_id": 375,
  "k1": "j",
  "k2": "jt",
  "k3": "jintang",
  "k4": "",
  "k5": "县",
  "k6": 510121,
  "k7": "028"
}, {
  "id": 2457,
  "name": "双流",
  "parent_id": 375,
  "k1": "s",
  "k2": "sl",
  "k3": "shuangliu",
  "k4": "",
  "k5": "区",
  "k6": 510116,
  "k7": "028"
}, {
  "id": 2458,
  "name": "郫都",
  "parent_id": 375,
  "k1": "p",
  "k2": "pd",
  "k3": "pidu",
  "k4": "",
  "k5": "区",
  "k6": 510117,
  "k7": "028"
}, {
  "id": 2459,
  "name": "大邑",
  "parent_id": 375,
  "k1": "d",
  "k2": "dy",
  "k3": "dayi",
  "k4": "",
  "k5": "县",
  "k6": 510129,
  "k7": "028"
}, {
  "id": 2460,
  "name": "蒲江",
  "parent_id": 375,
  "k1": "p",
  "k2": "pj",
  "k3": "pujiang",
  "k4": "",
  "k5": "县",
  "k6": 510131,
  "k7": "028"
}, {
  "id": 2461,
  "name": "新津",
  "parent_id": 375,
  "k1": "x",
  "k2": "xj",
  "k3": "xinjin",
  "k4": "",
  "k5": "县",
  "k6": 510132,
  "k7": "028"
}, {
  "id": 2462,
  "name": "都江堰",
  "parent_id": 375,
  "k1": "d",
  "k2": "djy",
  "k3": "dujiangyan",
  "k4": "",
  "k5": "市",
  "k6": 510181,
  "k7": "028"
}, {
  "id": 2463,
  "name": "彭州",
  "parent_id": 375,
  "k1": "p",
  "k2": "pz",
  "k3": "pengzhou",
  "k4": "",
  "k5": "市",
  "k6": 510182,
  "k7": "028"
}, {
  "id": 2464,
  "name": "邛崃",
  "parent_id": 375,
  "k1": "q",
  "k2": "ql",
  "k3": "qionglai",
  "k4": "",
  "k5": "市",
  "k6": 510183,
  "k7": "028"
}, {
  "id": 2465,
  "name": "崇州",
  "parent_id": 375,
  "k1": "c",
  "k2": "cz",
  "k3": "chongzhou",
  "k4": "",
  "k5": "市",
  "k6": 510184,
  "k7": "028"
}, {
  "id": 2466,
  "name": "自流井",
  "parent_id": 376,
  "k1": "z",
  "k2": "zlj",
  "k3": "ziliujing",
  "k4": "",
  "k5": "区",
  "k6": 510302,
  "k7": "0813"
}, {
  "id": 2467,
  "name": "贡井",
  "parent_id": 376,
  "k1": "g",
  "k2": "gj",
  "k3": "gongjing",
  "k4": "",
  "k5": "区",
  "k6": 510303,
  "k7": "0813"
}, {
  "id": 2468,
  "name": "大安",
  "parent_id": 376,
  "k1": "d",
  "k2": "da",
  "k3": "daan",
  "k4": "",
  "k5": "区",
  "k6": 510304,
  "k7": "0813"
}, {
  "id": 2469,
  "name": "沿滩",
  "parent_id": 376,
  "k1": "y",
  "k2": "yt",
  "k3": "yantan",
  "k4": "",
  "k5": "区",
  "k6": 510311,
  "k7": "0813"
}, {
  "id": 2470,
  "name": "荣县",
  "parent_id": 376,
  "k1": "r",
  "k2": "rx",
  "k3": "rongxian",
  "k4": "",
  "k5": "",
  "k6": 510321,
  "k7": "0813"
}, {
  "id": 2471,
  "name": "富顺",
  "parent_id": 376,
  "k1": "f",
  "k2": "fs",
  "k3": "fushun",
  "k4": "",
  "k5": "县",
  "k6": 510322,
  "k7": "0813"
}, {
  "id": 2472,
  "name": "东区",
  "parent_id": 377,
  "k1": "d",
  "k2": "dq",
  "k3": "dongqu",
  "k4": "",
  "k5": "",
  "k6": 510402,
  "k7": "0812"
}, {
  "id": 2473,
  "name": "西区",
  "parent_id": 377,
  "k1": "x",
  "k2": "xq",
  "k3": "xiqu",
  "k4": "",
  "k5": "",
  "k6": 510403,
  "k7": "0812"
}, {
  "id": 2474,
  "name": "仁和",
  "parent_id": 377,
  "k1": "r",
  "k2": "rh",
  "k3": "renhe",
  "k4": "",
  "k5": "区",
  "k6": 510411,
  "k7": "0812"
}, {
  "id": 2475,
  "name": "米易",
  "parent_id": 377,
  "k1": "m",
  "k2": "my",
  "k3": "miyi",
  "k4": "",
  "k5": "县",
  "k6": 510421,
  "k7": "0812"
}, {
  "id": 2476,
  "name": "盐边",
  "parent_id": 377,
  "k1": "y",
  "k2": "yb",
  "k3": "yanbian",
  "k4": "",
  "k5": "县",
  "k6": 510422,
  "k7": "0812"
}, {
  "id": 2477,
  "name": "江阳",
  "parent_id": 378,
  "k1": "j",
  "k2": "jy",
  "k3": "jiangyang",
  "k4": "",
  "k5": "区",
  "k6": 510502,
  "k7": "0830"
}, {
  "id": 2478,
  "name": "纳溪",
  "parent_id": 378,
  "k1": "n",
  "k2": "nx",
  "k3": "naxi",
  "k4": "",
  "k5": "区",
  "k6": 510503,
  "k7": "0830"
}, {
  "id": 2479,
  "name": "龙马潭",
  "parent_id": 378,
  "k1": "l",
  "k2": "lmt",
  "k3": "longmatan",
  "k4": "",
  "k5": "区",
  "k6": 510504,
  "k7": "0830"
}, {
  "id": 2480,
  "name": "泸县",
  "parent_id": 378,
  "k1": "l",
  "k2": "lx",
  "k3": "luxian",
  "k4": "",
  "k5": "",
  "k6": 510521,
  "k7": "0830"
}, {
  "id": 2481,
  "name": "合江",
  "parent_id": 378,
  "k1": "h",
  "k2": "hj",
  "k3": "hejiang",
  "k4": "",
  "k5": "县",
  "k6": 510522,
  "k7": "0830"
}, {
  "id": 2482,
  "name": "叙永",
  "parent_id": 378,
  "k1": "x",
  "k2": "xy",
  "k3": "xuyong",
  "k4": "",
  "k5": "县",
  "k6": 510524,
  "k7": "0830"
}, {
  "id": 2483,
  "name": "古蔺",
  "parent_id": 378,
  "k1": "g",
  "k2": "gl",
  "k3": "gulin",
  "k4": "",
  "k5": "县",
  "k6": 510525,
  "k7": "0830"
}, {
  "id": 2484,
  "name": "旌阳",
  "parent_id": 379,
  "k1": "j",
  "k2": "jy",
  "k3": "jingyang",
  "k4": "",
  "k5": "区",
  "k6": 510603,
  "k7": "0838"
}, {
  "id": 2485,
  "name": "中江",
  "parent_id": 379,
  "k1": "z",
  "k2": "zj",
  "k3": "zhongjiang",
  "k4": "",
  "k5": "县",
  "k6": 510623,
  "k7": "0838"
}, {
  "id": 2486,
  "name": "罗江",
  "parent_id": 379,
  "k1": "l",
  "k2": "lj",
  "k3": "luojiang",
  "k4": "",
  "k5": "区",
  "k6": 510604,
  "k7": "0838"
}, {
  "id": 2487,
  "name": "广汉",
  "parent_id": 379,
  "k1": "g",
  "k2": "gh",
  "k3": "guanghan",
  "k4": "",
  "k5": "市",
  "k6": 510681,
  "k7": "0838"
}, {
  "id": 2488,
  "name": "什邡",
  "parent_id": 379,
  "k1": "s",
  "k2": "sf",
  "k3": "shenfang",
  "k4": "",
  "k5": "市",
  "k6": 510682,
  "k7": "0838"
}, {
  "id": 2489,
  "name": "绵竹",
  "parent_id": 379,
  "k1": "m",
  "k2": "mz",
  "k3": "mianzhu",
  "k4": "",
  "k5": "市",
  "k6": 510683,
  "k7": "0838"
}, {
  "id": 2490,
  "name": "涪城",
  "parent_id": 380,
  "k1": "f",
  "k2": "fc",
  "k3": "fucheng",
  "k4": "",
  "k5": "区",
  "k6": 510703,
  "k7": "0816"
}, {
  "id": 2491,
  "name": "游仙",
  "parent_id": 380,
  "k1": "y",
  "k2": "yx",
  "k3": "youxian",
  "k4": "",
  "k5": "区",
  "k6": 510704,
  "k7": "0816"
}, {
  "id": 2492,
  "name": "三台",
  "parent_id": 380,
  "k1": "s",
  "k2": "st",
  "k3": "santai",
  "k4": "",
  "k5": "县",
  "k6": 510722,
  "k7": "0816"
}, {
  "id": 2493,
  "name": "盐亭",
  "parent_id": 380,
  "k1": "y",
  "k2": "yt",
  "k3": "yanting",
  "k4": "",
  "k5": "县",
  "k6": 510723,
  "k7": "0816"
}, {
  "id": 2494,
  "name": "安州",
  "parent_id": 380,
  "k1": "a",
  "k2": "az",
  "k3": "anzhou",
  "k4": "",
  "k5": "区",
  "k6": 510705,
  "k7": "0816"
}, {
  "id": 2495,
  "name": "梓潼",
  "parent_id": 380,
  "k1": "z",
  "k2": "zt",
  "k3": "zitong",
  "k4": "",
  "k5": "县",
  "k6": 510725,
  "k7": "0816"
}, {
  "id": 2496,
  "name": "北川",
  "parent_id": 380,
  "k1": "b",
  "k2": "bc",
  "k3": "beichuan",
  "k4": "羌族",
  "k5": "自治县",
  "k6": 510726,
  "k7": "0816"
}, {
  "id": 2497,
  "name": "平武",
  "parent_id": 380,
  "k1": "p",
  "k2": "pw",
  "k3": "pingwu",
  "k4": "",
  "k5": "县",
  "k6": 510727,
  "k7": "0816"
}, {
  "id": 2498,
  "name": "江油",
  "parent_id": 380,
  "k1": "j",
  "k2": "jy",
  "k3": "jiangyou",
  "k4": "",
  "k5": "市",
  "k6": 510781,
  "k7": "0816"
}, {
  "id": 2499,
  "name": "利州",
  "parent_id": 381,
  "k1": "l",
  "k2": "lz",
  "k3": "lizhou",
  "k4": "",
  "k5": "区",
  "k6": 510802,
  "k7": "0839"
}, {
  "id": 2500,
  "name": "昭化",
  "parent_id": 381,
  "k1": "z",
  "k2": "zh",
  "k3": "zhaohua",
  "k4": "",
  "k5": "区",
  "k6": 510811,
  "k7": "0839"
}, {
  "id": 2501,
  "name": "朝天",
  "parent_id": 381,
  "k1": "c",
  "k2": "ct",
  "k3": "chaotian",
  "k4": "",
  "k5": "区",
  "k6": 510812,
  "k7": "0839"
}, {
  "id": 2502,
  "name": "旺苍",
  "parent_id": 381,
  "k1": "w",
  "k2": "wc",
  "k3": "wangcang",
  "k4": "",
  "k5": "县",
  "k6": 510821,
  "k7": "0839"
}, {
  "id": 2503,
  "name": "青川",
  "parent_id": 381,
  "k1": "q",
  "k2": "qc",
  "k3": "qingchuan",
  "k4": "",
  "k5": "县",
  "k6": 510822,
  "k7": "0839"
}, {
  "id": 2504,
  "name": "剑阁",
  "parent_id": 381,
  "k1": "j",
  "k2": "jg",
  "k3": "jiange",
  "k4": "",
  "k5": "县",
  "k6": 510823,
  "k7": "0839"
}, {
  "id": 2505,
  "name": "苍溪",
  "parent_id": 381,
  "k1": "c",
  "k2": "cx",
  "k3": "cangxi",
  "k4": "",
  "k5": "县",
  "k6": 510824,
  "k7": "0839"
}, {
  "id": 2506,
  "name": "船山",
  "parent_id": 382,
  "k1": "c",
  "k2": "cs",
  "k3": "chuanshan",
  "k4": "",
  "k5": "区",
  "k6": 510903,
  "k7": "0825"
}, {
  "id": 2507,
  "name": "安居",
  "parent_id": 382,
  "k1": "a",
  "k2": "aj",
  "k3": "anju",
  "k4": "",
  "k5": "区",
  "k6": 510904,
  "k7": "0825"
}, {
  "id": 2508,
  "name": "蓬溪",
  "parent_id": 382,
  "k1": "p",
  "k2": "px",
  "k3": "pengxi",
  "k4": "",
  "k5": "县",
  "k6": 510921,
  "k7": "0825"
}, {
  "id": 2509,
  "name": "射洪",
  "parent_id": 382,
  "k1": "s",
  "k2": "sh",
  "k3": "shehong",
  "k4": "",
  "k5": "县",
  "k6": 510922,
  "k7": "0825"
}, {
  "id": 2510,
  "name": "大英",
  "parent_id": 382,
  "k1": "d",
  "k2": "dy",
  "k3": "daying",
  "k4": "",
  "k5": "县",
  "k6": 510923,
  "k7": "0825"
}, {
  "id": 2511,
  "name": "市中",
  "parent_id": 383,
  "k1": "s",
  "k2": "sz",
  "k3": "shizhong",
  "k4": "",
  "k5": "区",
  "k6": 511002,
  "k7": ""
}, {
  "id": 2512,
  "name": "东兴",
  "parent_id": 383,
  "k1": "d",
  "k2": "dx",
  "k3": "dongxing",
  "k4": "",
  "k5": "区",
  "k6": 511011,
  "k7": ""
}, {
  "id": 2513,
  "name": "威远",
  "parent_id": 383,
  "k1": "w",
  "k2": "wy",
  "k3": "weiyuan",
  "k4": "",
  "k5": "县",
  "k6": 511024,
  "k7": ""
}, {
  "id": 2514,
  "name": "资中",
  "parent_id": 383,
  "k1": "z",
  "k2": "zz",
  "k3": "zizhong",
  "k4": "",
  "k5": "县",
  "k6": 511025,
  "k7": ""
}, {
  "id": 2515,
  "name": "隆昌",
  "parent_id": 383,
  "k1": "l",
  "k2": "lc",
  "k3": "longchang",
  "k4": "",
  "k5": "市",
  "k6": 511083,
  "k7": ""
}, {
  "id": 2516,
  "name": "市中",
  "parent_id": 384,
  "k1": "s",
  "k2": "sz",
  "k3": "shizhong",
  "k4": "",
  "k5": "区",
  "k6": 511102,
  "k7": "0833"
}, {
  "id": 2517,
  "name": "沙湾",
  "parent_id": 384,
  "k1": "s",
  "k2": "sw",
  "k3": "shawan",
  "k4": "",
  "k5": "区",
  "k6": 511111,
  "k7": "0833"
}, {
  "id": 2518,
  "name": "五通桥",
  "parent_id": 384,
  "k1": "w",
  "k2": "wtq",
  "k3": "wutongqiao",
  "k4": "",
  "k5": "区",
  "k6": 511112,
  "k7": "0833"
}, {
  "id": 2519,
  "name": "金口河",
  "parent_id": 384,
  "k1": "j",
  "k2": "jkh",
  "k3": "jinkouhe",
  "k4": "",
  "k5": "区",
  "k6": 511113,
  "k7": "0833"
}, {
  "id": 2520,
  "name": "犍为",
  "parent_id": 384,
  "k1": "j",
  "k2": "jw",
  "k3": "jianwei",
  "k4": "",
  "k5": "县",
  "k6": 511123,
  "k7": "0833"
}, {
  "id": 2521,
  "name": "井研",
  "parent_id": 384,
  "k1": "j",
  "k2": "jy",
  "k3": "jingyan",
  "k4": "",
  "k5": "县",
  "k6": 511124,
  "k7": "0833"
}, {
  "id": 2522,
  "name": "夹江",
  "parent_id": 384,
  "k1": "j",
  "k2": "jj",
  "k3": "jiajiang",
  "k4": "",
  "k5": "县",
  "k6": 511126,
  "k7": "0833"
}, {
  "id": 2523,
  "name": "沐川",
  "parent_id": 384,
  "k1": "m",
  "k2": "mc",
  "k3": "muchuan",
  "k4": "",
  "k5": "县",
  "k6": 511129,
  "k7": "0833"
}, {
  "id": 2524,
  "name": "峨边",
  "parent_id": 384,
  "k1": "e",
  "k2": "eb",
  "k3": "ebian",
  "k4": "彝族",
  "k5": "自治县",
  "k6": 511132,
  "k7": "0833"
}, {
  "id": 2525,
  "name": "马边",
  "parent_id": 384,
  "k1": "m",
  "k2": "mb",
  "k3": "mabian",
  "k4": "彝族",
  "k5": "自治县",
  "k6": 511133,
  "k7": "0833"
}, {
  "id": 2526,
  "name": "峨眉山",
  "parent_id": 384,
  "k1": "e",
  "k2": "ems",
  "k3": "emeishan",
  "k4": "",
  "k5": "市",
  "k6": 511181,
  "k7": "0833"
}, {
  "id": 2527,
  "name": "顺庆",
  "parent_id": 385,
  "k1": "s",
  "k2": "sq",
  "k3": "shunqing",
  "k4": "",
  "k5": "区",
  "k6": 511302,
  "k7": "0817"
}, {
  "id": 2528,
  "name": "高坪",
  "parent_id": 385,
  "k1": "g",
  "k2": "gp",
  "k3": "gaoping",
  "k4": "",
  "k5": "区",
  "k6": 511303,
  "k7": "0817"
}, {
  "id": 2529,
  "name": "嘉陵",
  "parent_id": 385,
  "k1": "j",
  "k2": "jl",
  "k3": "jialing",
  "k4": "",
  "k5": "区",
  "k6": 511304,
  "k7": "0817"
}, {
  "id": 2530,
  "name": "南部",
  "parent_id": 385,
  "k1": "n",
  "k2": "nb",
  "k3": "nanbu",
  "k4": "",
  "k5": "县",
  "k6": 511321,
  "k7": "0817"
}, {
  "id": 2531,
  "name": "营山",
  "parent_id": 385,
  "k1": "y",
  "k2": "ys",
  "k3": "yingshan",
  "k4": "",
  "k5": "县",
  "k6": 511322,
  "k7": "0817"
}, {
  "id": 2532,
  "name": "蓬安",
  "parent_id": 385,
  "k1": "p",
  "k2": "pa",
  "k3": "pengan",
  "k4": "",
  "k5": "县",
  "k6": 511323,
  "k7": "0817"
}, {
  "id": 2533,
  "name": "仪陇",
  "parent_id": 385,
  "k1": "y",
  "k2": "yl",
  "k3": "yilong",
  "k4": "",
  "k5": "县",
  "k6": 511324,
  "k7": "0817"
}, {
  "id": 2534,
  "name": "西充",
  "parent_id": 385,
  "k1": "x",
  "k2": "xc",
  "k3": "xichong",
  "k4": "",
  "k5": "县",
  "k6": 511325,
  "k7": "0817"
}, {
  "id": 2535,
  "name": "阆中",
  "parent_id": 385,
  "k1": "l",
  "k2": "lz",
  "k3": "langzhong",
  "k4": "",
  "k5": "市",
  "k6": 511381,
  "k7": "0817"
}, {
  "id": 2536,
  "name": "东坡",
  "parent_id": 386,
  "k1": "d",
  "k2": "dp",
  "k3": "dongpo",
  "k4": "",
  "k5": "区",
  "k6": 511402,
  "k7": "028"
}, {
  "id": 2537,
  "name": "仁寿",
  "parent_id": 386,
  "k1": "r",
  "k2": "rs",
  "k3": "renshou",
  "k4": "",
  "k5": "县",
  "k6": 511421,
  "k7": "028"
}, {
  "id": 2538,
  "name": "彭山",
  "parent_id": 386,
  "k1": "p",
  "k2": "ps",
  "k3": "pengshan",
  "k4": "",
  "k5": "区",
  "k6": 511422,
  "k7": "028"
}, {
  "id": 2539,
  "name": "洪雅",
  "parent_id": 386,
  "k1": "h",
  "k2": "hy",
  "k3": "hongya",
  "k4": "",
  "k5": "县",
  "k6": 511423,
  "k7": "028"
}, {
  "id": 2540,
  "name": "丹棱",
  "parent_id": 386,
  "k1": "d",
  "k2": "dl",
  "k3": "danleng",
  "k4": "",
  "k5": "县",
  "k6": 511424,
  "k7": "028"
}, {
  "id": 2541,
  "name": "青神",
  "parent_id": 386,
  "k1": "q",
  "k2": "qs",
  "k3": "qingshen",
  "k4": "",
  "k5": "县",
  "k6": 511425,
  "k7": "028"
}, {
  "id": 2542,
  "name": "翠屏",
  "parent_id": 387,
  "k1": "c",
  "k2": "cp",
  "k3": "cuiping",
  "k4": "",
  "k5": "区",
  "k6": 511502,
  "k7": "0831"
}, {
  "id": 2543,
  "name": "南溪",
  "parent_id": 387,
  "k1": "n",
  "k2": "nx",
  "k3": "nanxi",
  "k4": "",
  "k5": "区",
  "k6": 511503,
  "k7": "0831"
}, {
  "id": 2544,
  "name": "叙州",
  "parent_id": 387,
  "k1": "x",
  "k2": "xz",
  "k3": "xuzhou",
  "k4": "",
  "k5": "区",
  "k6": 511504,
  "k7": "0831"
}, {
  "id": 2545,
  "name": "江安",
  "parent_id": 387,
  "k1": "j",
  "k2": "ja",
  "k3": "jiangan",
  "k4": "",
  "k5": "县",
  "k6": 511523,
  "k7": "0831"
}, {
  "id": 2546,
  "name": "长宁",
  "parent_id": 387,
  "k1": "c",
  "k2": "cn",
  "k3": "changning",
  "k4": "",
  "k5": "县",
  "k6": 511524,
  "k7": "0831"
}, {
  "id": 2547,
  "name": "高县",
  "parent_id": 387,
  "k1": "g",
  "k2": "gx",
  "k3": "gaoxian",
  "k4": "",
  "k5": "",
  "k6": 511525,
  "k7": "0831"
}, {
  "id": 2548,
  "name": "珙县",
  "parent_id": 387,
  "k1": "g",
  "k2": "gx",
  "k3": "gongxian",
  "k4": "",
  "k5": "",
  "k6": 511526,
  "k7": "0831"
}, {
  "id": 2549,
  "name": "筠连",
  "parent_id": 387,
  "k1": "y",
  "k2": "yl",
  "k3": "yunlian",
  "k4": "",
  "k5": "县",
  "k6": 511527,
  "k7": "0831"
}, {
  "id": 2550,
  "name": "兴文",
  "parent_id": 387,
  "k1": "x",
  "k2": "xw",
  "k3": "xingwen",
  "k4": "",
  "k5": "县",
  "k6": 511528,
  "k7": "0831"
}, {
  "id": 2551,
  "name": "屏山",
  "parent_id": 387,
  "k1": "p",
  "k2": "ps",
  "k3": "pingshan",
  "k4": "",
  "k5": "县",
  "k6": 511529,
  "k7": "0831"
}, {
  "id": 2552,
  "name": "广安",
  "parent_id": 388,
  "k1": "g",
  "k2": "ga",
  "k3": "guangan",
  "k4": "",
  "k5": "区",
  "k6": 511602,
  "k7": "0826"
}, {
  "id": 2553,
  "name": "岳池",
  "parent_id": 388,
  "k1": "y",
  "k2": "yc",
  "k3": "yuechi",
  "k4": "",
  "k5": "县",
  "k6": 511621,
  "k7": "0826"
}, {
  "id": 2554,
  "name": "武胜",
  "parent_id": 388,
  "k1": "w",
  "k2": "ws",
  "k3": "wusheng",
  "k4": "",
  "k5": "县",
  "k6": 511622,
  "k7": "0826"
}, {
  "id": 2555,
  "name": "邻水",
  "parent_id": 388,
  "k1": "l",
  "k2": "ls",
  "k3": "linshui",
  "k4": "",
  "k5": "县",
  "k6": 511623,
  "k7": "0826"
}, {
  "id": 2556,
  "name": "华蓥",
  "parent_id": 388,
  "k1": "h",
  "k2": "hy",
  "k3": "huaying",
  "k4": "",
  "k5": "市",
  "k6": 511681,
  "k7": "0826"
}, {
  "id": 2557,
  "name": "通川",
  "parent_id": 389,
  "k1": "t",
  "k2": "tc",
  "k3": "tongchuan",
  "k4": "",
  "k5": "区",
  "k6": 511702,
  "k7": "0818"
}, {
  "id": 2558,
  "name": "达川",
  "parent_id": 389,
  "k1": "d",
  "k2": "dc",
  "k3": "dachuan",
  "k4": "",
  "k5": "区",
  "k6": 511721,
  "k7": "0818"
}, {
  "id": 2559,
  "name": "宣汉",
  "parent_id": 389,
  "k1": "x",
  "k2": "xh",
  "k3": "xuanhan",
  "k4": "",
  "k5": "县",
  "k6": 511722,
  "k7": "0818"
}, {
  "id": 2560,
  "name": "开江",
  "parent_id": 389,
  "k1": "k",
  "k2": "kj",
  "k3": "kaijiang",
  "k4": "",
  "k5": "县",
  "k6": 511723,
  "k7": "0818"
}, {
  "id": 2561,
  "name": "大竹",
  "parent_id": 389,
  "k1": "d",
  "k2": "dz",
  "k3": "dazhu",
  "k4": "",
  "k5": "县",
  "k6": 511724,
  "k7": "0818"
}, {
  "id": 2562,
  "name": "渠县",
  "parent_id": 389,
  "k1": "q",
  "k2": "qx",
  "k3": "quxian",
  "k4": "",
  "k5": "",
  "k6": 511725,
  "k7": "0818"
}, {
  "id": 2563,
  "name": "万源",
  "parent_id": 389,
  "k1": "w",
  "k2": "wy",
  "k3": "wanyuan",
  "k4": "",
  "k5": "市",
  "k6": 511781,
  "k7": "0818"
}, {
  "id": 2564,
  "name": "雨城",
  "parent_id": 390,
  "k1": "y",
  "k2": "yc",
  "k3": "yucheng",
  "k4": "",
  "k5": "区",
  "k6": 511802,
  "k7": "0835"
}, {
  "id": 2565,
  "name": "名山",
  "parent_id": 390,
  "k1": "m",
  "k2": "ms",
  "k3": "mingshan",
  "k4": "",
  "k5": "区",
  "k6": 511803,
  "k7": "0835"
}, {
  "id": 2566,
  "name": "荥经",
  "parent_id": 390,
  "k1": "y",
  "k2": "yj",
  "k3": "yingjing",
  "k4": "",
  "k5": "县",
  "k6": 511822,
  "k7": "0835"
}, {
  "id": 2567,
  "name": "汉源",
  "parent_id": 390,
  "k1": "h",
  "k2": "hy",
  "k3": "hanyuan",
  "k4": "",
  "k5": "县",
  "k6": 511823,
  "k7": "0835"
}, {
  "id": 2568,
  "name": "石棉",
  "parent_id": 390,
  "k1": "s",
  "k2": "sm",
  "k3": "shimian",
  "k4": "",
  "k5": "县",
  "k6": 511824,
  "k7": "0835"
}, {
  "id": 2569,
  "name": "天全",
  "parent_id": 390,
  "k1": "t",
  "k2": "tq",
  "k3": "tianquan",
  "k4": "",
  "k5": "县",
  "k6": 511825,
  "k7": "0835"
}, {
  "id": 2570,
  "name": "芦山",
  "parent_id": 390,
  "k1": "l",
  "k2": "ls",
  "k3": "lushan",
  "k4": "",
  "k5": "县",
  "k6": 511826,
  "k7": "0835"
}, {
  "id": 2571,
  "name": "宝兴",
  "parent_id": 390,
  "k1": "b",
  "k2": "bx",
  "k3": "baoxing",
  "k4": "",
  "k5": "县",
  "k6": 511827,
  "k7": "0835"
}, {
  "id": 2572,
  "name": "巴州",
  "parent_id": 391,
  "k1": "b",
  "k2": "bz",
  "k3": "bazhou",
  "k4": "",
  "k5": "区",
  "k6": 511902,
  "k7": "0827"
}, {
  "id": 2573,
  "name": "通江",
  "parent_id": 391,
  "k1": "t",
  "k2": "tj",
  "k3": "tongjiang",
  "k4": "",
  "k5": "县",
  "k6": 511921,
  "k7": "0827"
}, {
  "id": 2574,
  "name": "南江",
  "parent_id": 391,
  "k1": "n",
  "k2": "nj",
  "k3": "nanjiang",
  "k4": "",
  "k5": "县",
  "k6": 511922,
  "k7": "0827"
}, {
  "id": 2575,
  "name": "平昌",
  "parent_id": 391,
  "k1": "p",
  "k2": "pc",
  "k3": "pingchang",
  "k4": "",
  "k5": "县",
  "k6": 511923,
  "k7": "0827"
}, {
  "id": 2576,
  "name": "雁江",
  "parent_id": 392,
  "k1": "y",
  "k2": "yj",
  "k3": "yanjiang",
  "k4": "",
  "k5": "区",
  "k6": 512002,
  "k7": "028"
}, {
  "id": 2577,
  "name": "安岳",
  "parent_id": 392,
  "k1": "a",
  "k2": "ay",
  "k3": "anyue",
  "k4": "",
  "k5": "县",
  "k6": 512021,
  "k7": "028"
}, {
  "id": 2578,
  "name": "乐至",
  "parent_id": 392,
  "k1": "l",
  "k2": "lz",
  "k3": "lezhi",
  "k4": "",
  "k5": "县",
  "k6": 512022,
  "k7": "028"
}, {
  "id": 2579,
  "name": "简阳",
  "parent_id": 375,
  "k1": "j",
  "k2": "jy",
  "k3": "jianyang",
  "k4": "",
  "k5": "市",
  "k6": 510185,
  "k7": "028"
}, {
  "id": 2580,
  "name": "马尔康",
  "parent_id": 393,
  "k1": "m",
  "k2": "mek",
  "k3": "maerkang",
  "k4": "",
  "k5": "市",
  "k6": 513229,
  "k7": "0837"
}, {
  "id": 2581,
  "name": "汶川",
  "parent_id": 393,
  "k1": "w",
  "k2": "wc",
  "k3": "wenchuan",
  "k4": "",
  "k5": "县",
  "k6": 513221,
  "k7": "0837"
}, {
  "id": 2582,
  "name": "理县",
  "parent_id": 393,
  "k1": "l",
  "k2": "lx",
  "k3": "lixian",
  "k4": "",
  "k5": "",
  "k6": 513222,
  "k7": "0837"
}, {
  "id": 2583,
  "name": "茂县",
  "parent_id": 393,
  "k1": "m",
  "k2": "mx",
  "k3": "maoxian",
  "k4": "",
  "k5": "",
  "k6": 513223,
  "k7": "0837"
}, {
  "id": 2584,
  "name": "松潘",
  "parent_id": 393,
  "k1": "s",
  "k2": "sp",
  "k3": "songpan",
  "k4": "",
  "k5": "县",
  "k6": 513224,
  "k7": "0837"
}, {
  "id": 2585,
  "name": "九寨沟",
  "parent_id": 393,
  "k1": "j",
  "k2": "jzg",
  "k3": "jiuzhaigou",
  "k4": "",
  "k5": "县",
  "k6": 513225,
  "k7": "0837"
}, {
  "id": 2586,
  "name": "金川",
  "parent_id": 393,
  "k1": "j",
  "k2": "jc",
  "k3": "jinchuan",
  "k4": "",
  "k5": "县",
  "k6": 513226,
  "k7": "0837"
}, {
  "id": 2587,
  "name": "小金",
  "parent_id": 393,
  "k1": "x",
  "k2": "xj",
  "k3": "xiaojin",
  "k4": "",
  "k5": "县",
  "k6": 513227,
  "k7": "0837"
}, {
  "id": 2588,
  "name": "黑水",
  "parent_id": 393,
  "k1": "h",
  "k2": "hs",
  "k3": "heishui",
  "k4": "",
  "k5": "县",
  "k6": 513228,
  "k7": "0837"
}, {
  "id": 2589,
  "name": "壤塘",
  "parent_id": 393,
  "k1": "r",
  "k2": "rt",
  "k3": "rangtang",
  "k4": "",
  "k5": "县",
  "k6": 513230,
  "k7": "0837"
}, {
  "id": 2590,
  "name": "阿坝",
  "parent_id": 393,
  "k1": "a",
  "k2": "ab",
  "k3": "aba",
  "k4": "",
  "k5": "县",
  "k6": 513231,
  "k7": "0837"
}, {
  "id": 2591,
  "name": "若尔盖",
  "parent_id": 393,
  "k1": "r",
  "k2": "reg",
  "k3": "ruoergai",
  "k4": "",
  "k5": "县",
  "k6": 513232,
  "k7": "0837"
}, {
  "id": 2592,
  "name": "红原",
  "parent_id": 393,
  "k1": "h",
  "k2": "hy",
  "k3": "hongyuan",
  "k4": "",
  "k5": "县",
  "k6": 513233,
  "k7": "0837"
}, {
  "id": 2593,
  "name": "康定",
  "parent_id": 394,
  "k1": "k",
  "k2": "kd",
  "k3": "kangding",
  "k4": "",
  "k5": "市",
  "k6": 513301,
  "k7": "0836"
}, {
  "id": 2594,
  "name": "泸定",
  "parent_id": 394,
  "k1": "l",
  "k2": "ld",
  "k3": "luding",
  "k4": "",
  "k5": "县",
  "k6": 513322,
  "k7": "0836"
}, {
  "id": 2595,
  "name": "丹巴",
  "parent_id": 394,
  "k1": "d",
  "k2": "db",
  "k3": "danba",
  "k4": "",
  "k5": "县",
  "k6": 513323,
  "k7": "0836"
}, {
  "id": 2596,
  "name": "九龙",
  "parent_id": 394,
  "k1": "j",
  "k2": "jl",
  "k3": "jiulong",
  "k4": "",
  "k5": "县",
  "k6": 513324,
  "k7": "0836"
}, {
  "id": 2597,
  "name": "雅江",
  "parent_id": 394,
  "k1": "y",
  "k2": "yj",
  "k3": "yajiang",
  "k4": "",
  "k5": "县",
  "k6": 513325,
  "k7": "0836"
}, {
  "id": 2598,
  "name": "道孚",
  "parent_id": 394,
  "k1": "d",
  "k2": "df",
  "k3": "daofu",
  "k4": "",
  "k5": "县",
  "k6": 513326,
  "k7": "0836"
}, {
  "id": 2599,
  "name": "炉霍",
  "parent_id": 394,
  "k1": "l",
  "k2": "lh",
  "k3": "luhuo",
  "k4": "",
  "k5": "县",
  "k6": 513327,
  "k7": "0836"
}, {
  "id": 2600,
  "name": "甘孜",
  "parent_id": 394,
  "k1": "g",
  "k2": "gz",
  "k3": "ganzi",
  "k4": "",
  "k5": "县",
  "k6": 513328,
  "k7": "0836"
}, {
  "id": 2601,
  "name": "新龙",
  "parent_id": 394,
  "k1": "x",
  "k2": "xl",
  "k3": "xinlong",
  "k4": "",
  "k5": "县",
  "k6": 513329,
  "k7": "0836"
}, {
  "id": 2602,
  "name": "德格",
  "parent_id": 394,
  "k1": "d",
  "k2": "dg",
  "k3": "dege",
  "k4": "",
  "k5": "县",
  "k6": 513330,
  "k7": "0836"
}, {
  "id": 2603,
  "name": "白玉",
  "parent_id": 394,
  "k1": "b",
  "k2": "by",
  "k3": "baiyu",
  "k4": "",
  "k5": "县",
  "k6": 513331,
  "k7": "0836"
}, {
  "id": 2604,
  "name": "石渠",
  "parent_id": 394,
  "k1": "s",
  "k2": "sq",
  "k3": "shiqu",
  "k4": "",
  "k5": "县",
  "k6": 513332,
  "k7": "0836"
}, {
  "id": 2605,
  "name": "色达",
  "parent_id": 394,
  "k1": "s",
  "k2": "sd",
  "k3": "seda",
  "k4": "",
  "k5": "县",
  "k6": 513333,
  "k7": "0836"
}, {
  "id": 2606,
  "name": "理塘",
  "parent_id": 394,
  "k1": "l",
  "k2": "lt",
  "k3": "litang",
  "k4": "",
  "k5": "县",
  "k6": 513334,
  "k7": "0836"
}, {
  "id": 2607,
  "name": "巴塘",
  "parent_id": 394,
  "k1": "b",
  "k2": "bt",
  "k3": "batang",
  "k4": "",
  "k5": "县",
  "k6": 513335,
  "k7": "0836"
}, {
  "id": 2608,
  "name": "乡城",
  "parent_id": 394,
  "k1": "x",
  "k2": "xc",
  "k3": "xiangcheng",
  "k4": "",
  "k5": "县",
  "k6": 513336,
  "k7": "0836"
}, {
  "id": 2609,
  "name": "稻城",
  "parent_id": 394,
  "k1": "d",
  "k2": "dc",
  "k3": "daocheng",
  "k4": "",
  "k5": "县",
  "k6": 513337,
  "k7": "0836"
}, {
  "id": 2610,
  "name": "得荣",
  "parent_id": 394,
  "k1": "d",
  "k2": "dr",
  "k3": "derong",
  "k4": "",
  "k5": "县",
  "k6": 513338,
  "k7": "0836"
}, {
  "id": 2611,
  "name": "西昌",
  "parent_id": 395,
  "k1": "x",
  "k2": "xc",
  "k3": "xichang",
  "k4": "",
  "k5": "市",
  "k6": 513401,
  "k7": "0834"
}, {
  "id": 2612,
  "name": "木里",
  "parent_id": 395,
  "k1": "m",
  "k2": "ml",
  "k3": "muli",
  "k4": "藏族",
  "k5": "自治县",
  "k6": 513422,
  "k7": "0834"
}, {
  "id": 2613,
  "name": "盐源",
  "parent_id": 395,
  "k1": "y",
  "k2": "yy",
  "k3": "yanyuan",
  "k4": "",
  "k5": "县",
  "k6": 513423,
  "k7": "0834"
}, {
  "id": 2614,
  "name": "德昌",
  "parent_id": 395,
  "k1": "d",
  "k2": "dc",
  "k3": "dechang",
  "k4": "",
  "k5": "县",
  "k6": 513424,
  "k7": "0834"
}, {
  "id": 2615,
  "name": "会理",
  "parent_id": 395,
  "k1": "h",
  "k2": "hl",
  "k3": "huili",
  "k4": "",
  "k5": "县",
  "k6": 513425,
  "k7": "0834"
}, {
  "id": 2616,
  "name": "会东",
  "parent_id": 395,
  "k1": "h",
  "k2": "hd",
  "k3": "huidong",
  "k4": "",
  "k5": "县",
  "k6": 513426,
  "k7": "0834"
}, {
  "id": 2617,
  "name": "宁南",
  "parent_id": 395,
  "k1": "n",
  "k2": "nn",
  "k3": "ningnan",
  "k4": "",
  "k5": "县",
  "k6": 513427,
  "k7": "0834"
}, {
  "id": 2618,
  "name": "普格",
  "parent_id": 395,
  "k1": "p",
  "k2": "pg",
  "k3": "puge",
  "k4": "",
  "k5": "县",
  "k6": 513428,
  "k7": "0834"
}, {
  "id": 2619,
  "name": "布拖",
  "parent_id": 395,
  "k1": "b",
  "k2": "bt",
  "k3": "butuo",
  "k4": "",
  "k5": "县",
  "k6": 513429,
  "k7": "0834"
}, {
  "id": 2620,
  "name": "金阳",
  "parent_id": 395,
  "k1": "j",
  "k2": "jy",
  "k3": "jinyang",
  "k4": "",
  "k5": "县",
  "k6": 513430,
  "k7": "0834"
}, {
  "id": 2621,
  "name": "昭觉",
  "parent_id": 395,
  "k1": "z",
  "k2": "zj",
  "k3": "zhaojue",
  "k4": "",
  "k5": "县",
  "k6": 513431,
  "k7": "0834"
}, {
  "id": 2622,
  "name": "喜德",
  "parent_id": 395,
  "k1": "x",
  "k2": "xd",
  "k3": "xide",
  "k4": "",
  "k5": "县",
  "k6": 513432,
  "k7": "0834"
}, {
  "id": 2623,
  "name": "冕宁",
  "parent_id": 395,
  "k1": "m",
  "k2": "mn",
  "k3": "mianning",
  "k4": "",
  "k5": "县",
  "k6": 513433,
  "k7": "0834"
}, {
  "id": 2624,
  "name": "越西",
  "parent_id": 395,
  "k1": "y",
  "k2": "yx",
  "k3": "yuexi",
  "k4": "",
  "k5": "县",
  "k6": 513434,
  "k7": "0834"
}, {
  "id": 2625,
  "name": "甘洛",
  "parent_id": 395,
  "k1": "g",
  "k2": "gl",
  "k3": "ganluo",
  "k4": "",
  "k5": "县",
  "k6": 513435,
  "k7": "0834"
}, {
  "id": 2626,
  "name": "美姑",
  "parent_id": 395,
  "k1": "m",
  "k2": "mg",
  "k3": "meigu",
  "k4": "",
  "k5": "县",
  "k6": 513436,
  "k7": "0834"
}, {
  "id": 2627,
  "name": "雷波",
  "parent_id": 395,
  "k1": "l",
  "k2": "lb",
  "k3": "leibo",
  "k4": "",
  "k5": "县",
  "k6": 513437,
  "k7": "0834"
}, {
  "id": 2628,
  "name": "观山湖",
  "parent_id": 396,
  "k1": "g",
  "k2": "gsh",
  "k3": "guanshanhu",
  "k4": "",
  "k5": "区",
  "k6": "",
  "k7": "0851"
}, {
  "id": 2629,
  "name": "南明",
  "parent_id": 396,
  "k1": "n",
  "k2": "nm",
  "k3": "nanming",
  "k4": "",
  "k5": "区",
  "k6": 520102,
  "k7": "0851"
}, {
  "id": 2630,
  "name": "云岩",
  "parent_id": 396,
  "k1": "y",
  "k2": "yy",
  "k3": "yunyan",
  "k4": "",
  "k5": "区",
  "k6": 520103,
  "k7": "0851"
}, {
  "id": 2631,
  "name": "花溪",
  "parent_id": 396,
  "k1": "h",
  "k2": "hx",
  "k3": "huaxi",
  "k4": "",
  "k5": "区",
  "k6": 520111,
  "k7": "0851"
}, {
  "id": 2632,
  "name": "乌当",
  "parent_id": 396,
  "k1": "w",
  "k2": "wd",
  "k3": "wudang",
  "k4": "",
  "k5": "区",
  "k6": 520112,
  "k7": "0851"
}, {
  "id": 2633,
  "name": "白云",
  "parent_id": 396,
  "k1": "b",
  "k2": "by",
  "k3": "baiyun",
  "k4": "",
  "k5": "区",
  "k6": 520113,
  "k7": "0851"
}, {
  "id": 2634,
  "name": "开阳",
  "parent_id": 396,
  "k1": "k",
  "k2": "ky",
  "k3": "kaiyang",
  "k4": "",
  "k5": "县",
  "k6": 520121,
  "k7": "0851"
}, {
  "id": 2635,
  "name": "息烽",
  "parent_id": 396,
  "k1": "x",
  "k2": "xf",
  "k3": "xifeng",
  "k4": "",
  "k5": "县",
  "k6": 520122,
  "k7": "0851"
}, {
  "id": 2636,
  "name": "修文",
  "parent_id": 396,
  "k1": "x",
  "k2": "xw",
  "k3": "xiuwen",
  "k4": "",
  "k5": "县",
  "k6": 520123,
  "k7": "0851"
}, {
  "id": 2637,
  "name": "清镇",
  "parent_id": 396,
  "k1": "q",
  "k2": "qz",
  "k3": "qingzhen",
  "k4": "",
  "k5": "市",
  "k6": 520181,
  "k7": "0851"
}, {
  "id": 2638,
  "name": "钟山",
  "parent_id": 397,
  "k1": "z",
  "k2": "zs",
  "k3": "zhongshan",
  "k4": "",
  "k5": "区",
  "k6": 520201,
  "k7": "0858"
}, {
  "id": 2639,
  "name": "六枝特",
  "parent_id": 397,
  "k1": "l",
  "k2": "lzt",
  "k3": "liuzhite",
  "k4": "",
  "k5": "区",
  "k6": 520203,
  "k7": "0858"
}, {
  "id": 2640,
  "name": "水城",
  "parent_id": 397,
  "k1": "s",
  "k2": "sc",
  "k3": "shuicheng",
  "k4": "",
  "k5": "县",
  "k6": 520221,
  "k7": "0858"
}, {
  "id": 2641,
  "name": "盘州",
  "parent_id": 397,
  "k1": "p",
  "k2": "pz",
  "k3": "panzhou",
  "k4": "",
  "k5": "市",
  "k6": 520281,
  "k7": "0858"
}, {
  "id": 2642,
  "name": "红花岗",
  "parent_id": 398,
  "k1": "h",
  "k2": "hhg",
  "k3": "honghuagang",
  "k4": "",
  "k5": "区",
  "k6": 520302,
  "k7": "0852"
}, {
  "id": 2643,
  "name": "汇川",
  "parent_id": 398,
  "k1": "h",
  "k2": "hc",
  "k3": "huichuan",
  "k4": "",
  "k5": "区",
  "k6": 520303,
  "k7": "0852"
}, {
  "id": 2644,
  "name": "播州",
  "parent_id": 398,
  "k1": "b",
  "k2": "bz",
  "k3": "bozhou",
  "k4": "",
  "k5": "区",
  "k6": 520304,
  "k7": "0852"
}, {
  "id": 2645,
  "name": "桐梓",
  "parent_id": 398,
  "k1": "t",
  "k2": "tz",
  "k3": "tongzi",
  "k4": "",
  "k5": "县",
  "k6": 520322,
  "k7": "0852"
}, {
  "id": 2646,
  "name": "绥阳",
  "parent_id": 398,
  "k1": "s",
  "k2": "sy",
  "k3": "suiyang",
  "k4": "",
  "k5": "县",
  "k6": 520323,
  "k7": "0852"
}, {
  "id": 2647,
  "name": "正安",
  "parent_id": 398,
  "k1": "z",
  "k2": "za",
  "k3": "zhengan",
  "k4": "",
  "k5": "县",
  "k6": 520324,
  "k7": "0852"
}, {
  "id": 2648,
  "name": "道真",
  "parent_id": 398,
  "k1": "d",
  "k2": "dz",
  "k3": "daozhen",
  "k4": "仡佬族苗族",
  "k5": "自治县",
  "k6": 520325,
  "k7": "0852"
}, {
  "id": 2649,
  "name": "务川",
  "parent_id": 398,
  "k1": "w",
  "k2": "wc",
  "k3": "wuchuan",
  "k4": "仡佬族苗族",
  "k5": "自治县",
  "k6": 520326,
  "k7": "0852"
}, {
  "id": 2650,
  "name": "凤冈",
  "parent_id": 398,
  "k1": "f",
  "k2": "fg",
  "k3": "fenggang",
  "k4": "",
  "k5": "县",
  "k6": 520327,
  "k7": "0852"
}, {
  "id": 2651,
  "name": "湄潭",
  "parent_id": 398,
  "k1": "m",
  "k2": "mt",
  "k3": "meitan",
  "k4": "",
  "k5": "县",
  "k6": 520328,
  "k7": "0852"
}, {
  "id": 2652,
  "name": "余庆",
  "parent_id": 398,
  "k1": "y",
  "k2": "yq",
  "k3": "yuqing",
  "k4": "",
  "k5": "县",
  "k6": 520329,
  "k7": "0852"
}, {
  "id": 2653,
  "name": "习水",
  "parent_id": 398,
  "k1": "x",
  "k2": "xs",
  "k3": "xishui",
  "k4": "",
  "k5": "县",
  "k6": 520330,
  "k7": "0852"
}, {
  "id": 2654,
  "name": "赤水",
  "parent_id": 398,
  "k1": "c",
  "k2": "cs",
  "k3": "chishui",
  "k4": "",
  "k5": "市",
  "k6": 520381,
  "k7": "0852"
}, {
  "id": 2655,
  "name": "仁怀",
  "parent_id": 398,
  "k1": "r",
  "k2": "rh",
  "k3": "renhuai",
  "k4": "",
  "k5": "市",
  "k6": 520382,
  "k7": "0852"
}, {
  "id": 2656,
  "name": "西秀",
  "parent_id": 399,
  "k1": "x",
  "k2": "xx",
  "k3": "xixiu",
  "k4": "",
  "k5": "区",
  "k6": 520402,
  "k7": "0853"
}, {
  "id": 2657,
  "name": "平坝",
  "parent_id": 399,
  "k1": "p",
  "k2": "pb",
  "k3": "pingba",
  "k4": "",
  "k5": "区",
  "k6": 520403,
  "k7": "0853"
}, {
  "id": 2658,
  "name": "普定",
  "parent_id": 399,
  "k1": "p",
  "k2": "pd",
  "k3": "puding",
  "k4": "",
  "k5": "县",
  "k6": 520422,
  "k7": "0853"
}, {
  "id": 2659,
  "name": "镇宁",
  "parent_id": 399,
  "k1": "z",
  "k2": "zn",
  "k3": "zhenning",
  "k4": "布依族苗族",
  "k5": "自治县",
  "k6": 520423,
  "k7": "0853"
}, {
  "id": 2660,
  "name": "关岭",
  "parent_id": 399,
  "k1": "g",
  "k2": "gl",
  "k3": "guanling",
  "k4": "布依族苗族",
  "k5": "自治县",
  "k6": 520424,
  "k7": "0853"
}, {
  "id": 2661,
  "name": "紫云",
  "parent_id": 399,
  "k1": "z",
  "k2": "zy",
  "k3": "ziyun",
  "k4": "苗族布依族",
  "k5": "自治县",
  "k6": 520425,
  "k7": "0853"
}, {
  "id": 2662,
  "name": "七星关",
  "parent_id": 400,
  "k1": "q",
  "k2": "qxg",
  "k3": "qixingguan",
  "k4": "",
  "k5": "区",
  "k6": 520502,
  "k7": "0857"
}, {
  "id": 2663,
  "name": "大方",
  "parent_id": 400,
  "k1": "d",
  "k2": "df",
  "k3": "dafang",
  "k4": "",
  "k5": "县",
  "k6": 520521,
  "k7": "0857"
}, {
  "id": 2664,
  "name": "黔西",
  "parent_id": 400,
  "k1": "q",
  "k2": "qx",
  "k3": "qianxi",
  "k4": "",
  "k5": "县",
  "k6": 520522,
  "k7": "0857"
}, {
  "id": 2665,
  "name": "金沙",
  "parent_id": 400,
  "k1": "j",
  "k2": "js",
  "k3": "jinsha",
  "k4": "",
  "k5": "县",
  "k6": 520523,
  "k7": "0857"
}, {
  "id": 2666,
  "name": "织金",
  "parent_id": 400,
  "k1": "z",
  "k2": "zj",
  "k3": "zhijin",
  "k4": "",
  "k5": "县",
  "k6": 520524,
  "k7": "0857"
}, {
  "id": 2667,
  "name": "纳雍",
  "parent_id": 400,
  "k1": "n",
  "k2": "ny",
  "k3": "nayong",
  "k4": "",
  "k5": "县",
  "k6": 520525,
  "k7": "0857"
}, {
  "id": 2668,
  "name": "威宁",
  "parent_id": 400,
  "k1": "w",
  "k2": "wn",
  "k3": "weining",
  "k4": "彝族回族苗族",
  "k5": "自治县",
  "k6": 520526,
  "k7": "0857"
}, {
  "id": 2669,
  "name": "赫章",
  "parent_id": 400,
  "k1": "h",
  "k2": "hz",
  "k3": "hezhang",
  "k4": "",
  "k5": "县",
  "k6": 520527,
  "k7": "0857"
}, {
  "id": 2670,
  "name": "碧江",
  "parent_id": 401,
  "k1": "b",
  "k2": "bj",
  "k3": "bijiang",
  "k4": "",
  "k5": "区",
  "k6": 520602,
  "k7": "0856"
}, {
  "id": 2671,
  "name": "万山",
  "parent_id": 401,
  "k1": "w",
  "k2": "ws",
  "k3": "wanshan",
  "k4": "",
  "k5": "区",
  "k6": 520603,
  "k7": "0856"
}, {
  "id": 2672,
  "name": "江口",
  "parent_id": 401,
  "k1": "j",
  "k2": "jk",
  "k3": "jiangkou",
  "k4": "",
  "k5": "县",
  "k6": 520621,
  "k7": "0856"
}, {
  "id": 2673,
  "name": "玉屏",
  "parent_id": 401,
  "k1": "y",
  "k2": "yp",
  "k3": "yuping",
  "k4": "侗族",
  "k5": "自治县",
  "k6": 520622,
  "k7": "0856"
}, {
  "id": 2674,
  "name": "石阡",
  "parent_id": 401,
  "k1": "s",
  "k2": "sq",
  "k3": "shiqian",
  "k4": "",
  "k5": "县",
  "k6": 520623,
  "k7": "0856"
}, {
  "id": 2675,
  "name": "思南",
  "parent_id": 401,
  "k1": "s",
  "k2": "sn",
  "k3": "sinan",
  "k4": "",
  "k5": "县",
  "k6": 520624,
  "k7": "0856"
}, {
  "id": 2676,
  "name": "印江",
  "parent_id": 401,
  "k1": "y",
  "k2": "yj",
  "k3": "yinjiang",
  "k4": "土家族苗族",
  "k5": "自治县",
  "k6": 520625,
  "k7": "0856"
}, {
  "id": 2677,
  "name": "德江",
  "parent_id": 401,
  "k1": "d",
  "k2": "dj",
  "k3": "dejiang",
  "k4": "",
  "k5": "县",
  "k6": 520626,
  "k7": "0856"
}, {
  "id": 2678,
  "name": "沿河",
  "parent_id": 401,
  "k1": "y",
  "k2": "yh",
  "k3": "yanhe",
  "k4": "土家族",
  "k5": "自治县",
  "k6": 520627,
  "k7": "0856"
}, {
  "id": 2679,
  "name": "松桃",
  "parent_id": 401,
  "k1": "s",
  "k2": "st",
  "k3": "songtao",
  "k4": "苗族",
  "k5": "自治县",
  "k6": 520628,
  "k7": "0856"
}, {
  "id": 2680,
  "name": "兴义",
  "parent_id": 402,
  "k1": "x",
  "k2": "xy",
  "k3": "xingyi",
  "k4": "",
  "k5": "市",
  "k6": 522301,
  "k7": "0859"
}, {
  "id": 2681,
  "name": "兴仁",
  "parent_id": 402,
  "k1": "x",
  "k2": "xr",
  "k3": "xingren",
  "k4": "",
  "k5": "市",
  "k6": 522322,
  "k7": "0859"
}, {
  "id": 2682,
  "name": "普安",
  "parent_id": 402,
  "k1": "p",
  "k2": "pa",
  "k3": "puan",
  "k4": "",
  "k5": "县",
  "k6": 522323,
  "k7": "0859"
}, {
  "id": 2683,
  "name": "晴隆",
  "parent_id": 402,
  "k1": "q",
  "k2": "ql",
  "k3": "qinglong",
  "k4": "",
  "k5": "县",
  "k6": 522324,
  "k7": "0859"
}, {
  "id": 2684,
  "name": "贞丰",
  "parent_id": 402,
  "k1": "z",
  "k2": "zf",
  "k3": "zhenfeng",
  "k4": "",
  "k5": "县",
  "k6": 522325,
  "k7": "0859"
}, {
  "id": 2685,
  "name": "望谟",
  "parent_id": 402,
  "k1": "w",
  "k2": "wm",
  "k3": "wangmo",
  "k4": "",
  "k5": "县",
  "k6": 522326,
  "k7": "0859"
}, {
  "id": 2686,
  "name": "册亨",
  "parent_id": 402,
  "k1": "c",
  "k2": "ch",
  "k3": "ceheng",
  "k4": "",
  "k5": "县",
  "k6": 522327,
  "k7": "0859"
}, {
  "id": 2687,
  "name": "安龙",
  "parent_id": 402,
  "k1": "a",
  "k2": "al",
  "k3": "anlong",
  "k4": "",
  "k5": "县",
  "k6": 522328,
  "k7": "0859"
}, {
  "id": 2688,
  "name": "凯里",
  "parent_id": 403,
  "k1": "k",
  "k2": "kl",
  "k3": "kaili",
  "k4": "",
  "k5": "市",
  "k6": 522601,
  "k7": "0855"
}, {
  "id": 2689,
  "name": "黄平",
  "parent_id": 403,
  "k1": "h",
  "k2": "hp",
  "k3": "huangping",
  "k4": "",
  "k5": "县",
  "k6": 522622,
  "k7": "0855"
}, {
  "id": 2690,
  "name": "施秉",
  "parent_id": 403,
  "k1": "s",
  "k2": "sb",
  "k3": "shibing",
  "k4": "",
  "k5": "县",
  "k6": 522623,
  "k7": "0855"
}, {
  "id": 2691,
  "name": "三穗",
  "parent_id": 403,
  "k1": "s",
  "k2": "ss",
  "k3": "sansui",
  "k4": "",
  "k5": "县",
  "k6": 522624,
  "k7": "0855"
}, {
  "id": 2692,
  "name": "镇远",
  "parent_id": 403,
  "k1": "z",
  "k2": "zy",
  "k3": "zhenyuan",
  "k4": "",
  "k5": "县",
  "k6": 522625,
  "k7": "0855"
}, {
  "id": 2693,
  "name": "岑巩",
  "parent_id": 403,
  "k1": "c",
  "k2": "cg",
  "k3": "cengong",
  "k4": "",
  "k5": "县",
  "k6": 522626,
  "k7": "0855"
}, {
  "id": 2694,
  "name": "天柱",
  "parent_id": 403,
  "k1": "t",
  "k2": "tz",
  "k3": "tianzhu",
  "k4": "",
  "k5": "县",
  "k6": 522627,
  "k7": "0855"
}, {
  "id": 2695,
  "name": "锦屏",
  "parent_id": 403,
  "k1": "j",
  "k2": "jp",
  "k3": "jinping",
  "k4": "",
  "k5": "县",
  "k6": 522628,
  "k7": "0855"
}, {
  "id": 2696,
  "name": "剑河",
  "parent_id": 403,
  "k1": "j",
  "k2": "jh",
  "k3": "jianhe",
  "k4": "",
  "k5": "县",
  "k6": 522629,
  "k7": "0855"
}, {
  "id": 2697,
  "name": "台江",
  "parent_id": 403,
  "k1": "t",
  "k2": "tj",
  "k3": "taijiang",
  "k4": "",
  "k5": "县",
  "k6": 522630,
  "k7": "0855"
}, {
  "id": 2698,
  "name": "黎平",
  "parent_id": 403,
  "k1": "l",
  "k2": "lp",
  "k3": "liping",
  "k4": "",
  "k5": "县",
  "k6": 522631,
  "k7": "0855"
}, {
  "id": 2699,
  "name": "榕江",
  "parent_id": 403,
  "k1": "r",
  "k2": "rj",
  "k3": "rongjiang",
  "k4": "",
  "k5": "县",
  "k6": 522632,
  "k7": "0855"
}, {
  "id": 2700,
  "name": "从江",
  "parent_id": 403,
  "k1": "c",
  "k2": "cj",
  "k3": "congjiang",
  "k4": "",
  "k5": "县",
  "k6": 522633,
  "k7": "0855"
}, {
  "id": 2701,
  "name": "雷山",
  "parent_id": 403,
  "k1": "l",
  "k2": "ls",
  "k3": "leishan",
  "k4": "",
  "k5": "县",
  "k6": 522634,
  "k7": "0855"
}, {
  "id": 2702,
  "name": "麻江",
  "parent_id": 403,
  "k1": "m",
  "k2": "mj",
  "k3": "majiang",
  "k4": "",
  "k5": "县",
  "k6": 522635,
  "k7": "0855"
}, {
  "id": 2703,
  "name": "丹寨",
  "parent_id": 403,
  "k1": "d",
  "k2": "dz",
  "k3": "danzhai",
  "k4": "",
  "k5": "县",
  "k6": 522636,
  "k7": "0855"
}, {
  "id": 2704,
  "name": "都匀",
  "parent_id": 404,
  "k1": "d",
  "k2": "dy",
  "k3": "duyun",
  "k4": "",
  "k5": "市",
  "k6": 522701,
  "k7": "0854"
}, {
  "id": 2705,
  "name": "福泉",
  "parent_id": 404,
  "k1": "f",
  "k2": "fq",
  "k3": "fuquan",
  "k4": "",
  "k5": "市",
  "k6": 522702,
  "k7": "0854"
}, {
  "id": 2706,
  "name": "荔波",
  "parent_id": 404,
  "k1": "l",
  "k2": "lb",
  "k3": "libo",
  "k4": "",
  "k5": "县",
  "k6": 522722,
  "k7": "0854"
}, {
  "id": 2707,
  "name": "贵定",
  "parent_id": 404,
  "k1": "g",
  "k2": "gd",
  "k3": "guiding",
  "k4": "",
  "k5": "县",
  "k6": 522723,
  "k7": "0854"
}, {
  "id": 2708,
  "name": "瓮安",
  "parent_id": 404,
  "k1": "w",
  "k2": "wa",
  "k3": "wengan",
  "k4": "",
  "k5": "县",
  "k6": 522725,
  "k7": "0854"
}, {
  "id": 2709,
  "name": "独山",
  "parent_id": 404,
  "k1": "d",
  "k2": "ds",
  "k3": "dushan",
  "k4": "",
  "k5": "县",
  "k6": 522726,
  "k7": "0854"
}, {
  "id": 2710,
  "name": "平塘",
  "parent_id": 404,
  "k1": "p",
  "k2": "pt",
  "k3": "pingtang",
  "k4": "",
  "k5": "县",
  "k6": 522727,
  "k7": "0854"
}, {
  "id": 2711,
  "name": "罗甸",
  "parent_id": 404,
  "k1": "l",
  "k2": "ld",
  "k3": "luodian",
  "k4": "",
  "k5": "县",
  "k6": 522728,
  "k7": "0854"
}, {
  "id": 2712,
  "name": "长顺",
  "parent_id": 404,
  "k1": "c",
  "k2": "cs",
  "k3": "changshun",
  "k4": "",
  "k5": "县",
  "k6": 522729,
  "k7": "0854"
}, {
  "id": 2713,
  "name": "龙里",
  "parent_id": 404,
  "k1": "l",
  "k2": "ll",
  "k3": "longli",
  "k4": "",
  "k5": "县",
  "k6": 522730,
  "k7": "0854"
}, {
  "id": 2714,
  "name": "惠水",
  "parent_id": 404,
  "k1": "h",
  "k2": "hs",
  "k3": "huishui",
  "k4": "",
  "k5": "县",
  "k6": 522731,
  "k7": "0854"
}, {
  "id": 2715,
  "name": "三都",
  "parent_id": 404,
  "k1": "s",
  "k2": "sd",
  "k3": "sandu",
  "k4": "水族",
  "k5": "自治县",
  "k6": 522732,
  "k7": "0854"
}, {
  "id": 2716,
  "name": "五华",
  "parent_id": 405,
  "k1": "w",
  "k2": "wh",
  "k3": "wuhua",
  "k4": "",
  "k5": "区",
  "k6": 530102,
  "k7": "0871"
}, {
  "id": 2717,
  "name": "盘龙",
  "parent_id": 405,
  "k1": "p",
  "k2": "pl",
  "k3": "panlong",
  "k4": "",
  "k5": "区",
  "k6": 530103,
  "k7": "0871"
}, {
  "id": 2718,
  "name": "官渡",
  "parent_id": 405,
  "k1": "g",
  "k2": "gd",
  "k3": "guandu",
  "k4": "",
  "k5": "区",
  "k6": 530111,
  "k7": "0871"
}, {
  "id": 2719,
  "name": "西山",
  "parent_id": 405,
  "k1": "x",
  "k2": "xs",
  "k3": "xishan",
  "k4": "",
  "k5": "区",
  "k6": 530112,
  "k7": "0871"
}, {
  "id": 2720,
  "name": "东川",
  "parent_id": 405,
  "k1": "d",
  "k2": "dc",
  "k3": "dongchuan",
  "k4": "",
  "k5": "区",
  "k6": 530113,
  "k7": "0871"
}, {
  "id": 2721,
  "name": "呈贡",
  "parent_id": 405,
  "k1": "c",
  "k2": "cg",
  "k3": "chenggong",
  "k4": "",
  "k5": "区",
  "k6": 530114,
  "k7": "0871"
}, {
  "id": 2722,
  "name": "晋宁",
  "parent_id": 405,
  "k1": "j",
  "k2": "jn",
  "k3": "jinning",
  "k4": "",
  "k5": "区",
  "k6": 530115,
  "k7": "0871"
}, {
  "id": 2723,
  "name": "富民",
  "parent_id": 405,
  "k1": "f",
  "k2": "fm",
  "k3": "fumin",
  "k4": "",
  "k5": "县",
  "k6": 530124,
  "k7": "0871"
}, {
  "id": 2724,
  "name": "宜良",
  "parent_id": 405,
  "k1": "y",
  "k2": "yl",
  "k3": "yiliang",
  "k4": "",
  "k5": "县",
  "k6": 530125,
  "k7": "0871"
}, {
  "id": 2725,
  "name": "石林",
  "parent_id": 405,
  "k1": "s",
  "k2": "sl",
  "k3": "shilin",
  "k4": "彝族",
  "k5": "自治县",
  "k6": 530126,
  "k7": "0871"
}, {
  "id": 2726,
  "name": "嵩明",
  "parent_id": 405,
  "k1": "s",
  "k2": "sm",
  "k3": "songming",
  "k4": "",
  "k5": "县",
  "k6": 530127,
  "k7": "0871"
}, {
  "id": 2727,
  "name": "禄劝",
  "parent_id": 405,
  "k1": "l",
  "k2": "lq",
  "k3": "luquan",
  "k4": "彝族苗族",
  "k5": "自治县",
  "k6": 530128,
  "k7": "0871"
}, {
  "id": 2728,
  "name": "寻甸",
  "parent_id": 405,
  "k1": "x",
  "k2": "xd",
  "k3": "xundian",
  "k4": "回族彝族",
  "k5": "自治县",
  "k6": 530129,
  "k7": "0871"
}, {
  "id": 2729,
  "name": "安宁",
  "parent_id": 405,
  "k1": "a",
  "k2": "an",
  "k3": "anning",
  "k4": "",
  "k5": "市",
  "k6": 530181,
  "k7": "0871"
}, {
  "id": 2730,
  "name": "麒麟",
  "parent_id": 406,
  "k1": "q",
  "k2": "ql",
  "k3": "qilin",
  "k4": "",
  "k5": "区",
  "k6": 530302,
  "k7": "0874"
}, {
  "id": 2731,
  "name": "马龙",
  "parent_id": 406,
  "k1": "m",
  "k2": "ml",
  "k3": "malong",
  "k4": "",
  "k5": "区",
  "k6": 530304,
  "k7": "0874"
}, {
  "id": 2732,
  "name": "陆良",
  "parent_id": 406,
  "k1": "l",
  "k2": "ll",
  "k3": "luliang",
  "k4": "",
  "k5": "县",
  "k6": 530322,
  "k7": "0874"
}, {
  "id": 2733,
  "name": "师宗",
  "parent_id": 406,
  "k1": "s",
  "k2": "sz",
  "k3": "shizong",
  "k4": "",
  "k5": "县",
  "k6": 530323,
  "k7": "0874"
}, {
  "id": 2734,
  "name": "罗平",
  "parent_id": 406,
  "k1": "l",
  "k2": "lp",
  "k3": "luoping",
  "k4": "",
  "k5": "县",
  "k6": 530324,
  "k7": "0874"
}, {
  "id": 2735,
  "name": "富源",
  "parent_id": 406,
  "k1": "f",
  "k2": "fy",
  "k3": "fuyuan",
  "k4": "",
  "k5": "县",
  "k6": 530325,
  "k7": "0874"
}, {
  "id": 2736,
  "name": "会泽",
  "parent_id": 406,
  "k1": "h",
  "k2": "hz",
  "k3": "huize",
  "k4": "",
  "k5": "县",
  "k6": 530326,
  "k7": "0874"
}, {
  "id": 2737,
  "name": "沾益",
  "parent_id": 406,
  "k1": "z",
  "k2": "zy",
  "k3": "zhanyi",
  "k4": "",
  "k5": "区",
  "k6": 530303,
  "k7": "0874"
}, {
  "id": 2738,
  "name": "宣威",
  "parent_id": 406,
  "k1": "x",
  "k2": "xw",
  "k3": "xuanwei",
  "k4": "",
  "k5": "市",
  "k6": 530381,
  "k7": "0874"
}, {
  "id": 2739,
  "name": "红塔",
  "parent_id": 407,
  "k1": "h",
  "k2": "ht",
  "k3": "hongta",
  "k4": "",
  "k5": "区",
  "k6": 530402,
  "k7": "0877"
}, {
  "id": 2740,
  "name": "江川",
  "parent_id": 407,
  "k1": "j",
  "k2": "jc",
  "k3": "jiangchuan",
  "k4": "",
  "k5": "区",
  "k6": 530421,
  "k7": "0877"
}, {
  "id": 2741,
  "name": "澄江",
  "parent_id": 407,
  "k1": "c",
  "k2": "cj",
  "k3": "chengjiang",
  "k4": "",
  "k5": "县",
  "k6": 530422,
  "k7": "0877"
}, {
  "id": 2742,
  "name": "通海",
  "parent_id": 407,
  "k1": "t",
  "k2": "th",
  "k3": "tonghai",
  "k4": "",
  "k5": "县",
  "k6": 530423,
  "k7": "0877"
}, {
  "id": 2743,
  "name": "华宁",
  "parent_id": 407,
  "k1": "h",
  "k2": "hn",
  "k3": "huaning",
  "k4": "",
  "k5": "县",
  "k6": 530424,
  "k7": "0877"
}, {
  "id": 2744,
  "name": "易门",
  "parent_id": 407,
  "k1": "y",
  "k2": "ym",
  "k3": "yimen",
  "k4": "",
  "k5": "县",
  "k6": 530425,
  "k7": "0877"
}, {
  "id": 2745,
  "name": "峨山",
  "parent_id": 407,
  "k1": "e",
  "k2": "es",
  "k3": "eshan",
  "k4": "彝族",
  "k5": "自治县",
  "k6": 530426,
  "k7": "0877"
}, {
  "id": 2746,
  "name": "新平",
  "parent_id": 407,
  "k1": "x",
  "k2": "xp",
  "k3": "xinping",
  "k4": "彝族傣族",
  "k5": "自治县",
  "k6": 530427,
  "k7": "0877"
}, {
  "id": 2747,
  "name": "元江",
  "parent_id": 407,
  "k1": "y",
  "k2": "yj",
  "k3": "yuanjiang",
  "k4": "哈尼族彝族傣族",
  "k5": "自治县",
  "k6": 530428,
  "k7": "0877"
}, {
  "id": 2748,
  "name": "昭阳",
  "parent_id": 408,
  "k1": "z",
  "k2": "zy",
  "k3": "zhaoyang",
  "k4": "",
  "k5": "区",
  "k6": 530602,
  "k7": "0870"
}, {
  "id": 2749,
  "name": "鲁甸",
  "parent_id": 408,
  "k1": "l",
  "k2": "ld",
  "k3": "ludian",
  "k4": "",
  "k5": "县",
  "k6": 530621,
  "k7": "0870"
}, {
  "id": 2750,
  "name": "巧家",
  "parent_id": 408,
  "k1": "q",
  "k2": "qj",
  "k3": "qiaojia",
  "k4": "",
  "k5": "县",
  "k6": 530622,
  "k7": "0870"
}, {
  "id": 2751,
  "name": "盐津",
  "parent_id": 408,
  "k1": "y",
  "k2": "yj",
  "k3": "yanjin",
  "k4": "",
  "k5": "县",
  "k6": 530623,
  "k7": "0870"
}, {
  "id": 2752,
  "name": "大关",
  "parent_id": 408,
  "k1": "d",
  "k2": "dg",
  "k3": "daguan",
  "k4": "",
  "k5": "县",
  "k6": 530624,
  "k7": "0870"
}, {
  "id": 2753,
  "name": "永善",
  "parent_id": 408,
  "k1": "y",
  "k2": "ys",
  "k3": "yongshan",
  "k4": "",
  "k5": "县",
  "k6": 530625,
  "k7": "0870"
}, {
  "id": 2754,
  "name": "绥江",
  "parent_id": 408,
  "k1": "s",
  "k2": "sj",
  "k3": "suijiang",
  "k4": "",
  "k5": "县",
  "k6": 530626,
  "k7": "0870"
}, {
  "id": 2755,
  "name": "镇雄",
  "parent_id": 408,
  "k1": "z",
  "k2": "zx",
  "k3": "zhenxiong",
  "k4": "",
  "k5": "县",
  "k6": 530627,
  "k7": "0870"
}, {
  "id": 2756,
  "name": "彝良",
  "parent_id": 408,
  "k1": "y",
  "k2": "yl",
  "k3": "yiliang",
  "k4": "",
  "k5": "县",
  "k6": 530628,
  "k7": "0870"
}, {
  "id": 2757,
  "name": "威信",
  "parent_id": 408,
  "k1": "w",
  "k2": "wx",
  "k3": "weixin",
  "k4": "",
  "k5": "县",
  "k6": 530629,
  "k7": "0870"
}, {
  "id": 2758,
  "name": "水富",
  "parent_id": 408,
  "k1": "s",
  "k2": "sf",
  "k3": "shuifu",
  "k4": "",
  "k5": "市",
  "k6": 530630,
  "k7": "0870"
}, {
  "id": 2759,
  "name": "古城",
  "parent_id": 409,
  "k1": "g",
  "k2": "gc",
  "k3": "gucheng",
  "k4": "",
  "k5": "区",
  "k6": 530702,
  "k7": "0888"
}, {
  "id": 2760,
  "name": "玉龙",
  "parent_id": 409,
  "k1": "y",
  "k2": "yl",
  "k3": "yulong",
  "k4": "纳西族",
  "k5": "自治县",
  "k6": 530721,
  "k7": "0888"
}, {
  "id": 2761,
  "name": "永胜",
  "parent_id": 409,
  "k1": "y",
  "k2": "ys",
  "k3": "yongsheng",
  "k4": "",
  "k5": "县",
  "k6": 530722,
  "k7": "0888"
}, {
  "id": 2762,
  "name": "华坪",
  "parent_id": 409,
  "k1": "h",
  "k2": "hp",
  "k3": "huaping",
  "k4": "",
  "k5": "县",
  "k6": 530723,
  "k7": "0888"
}, {
  "id": 2763,
  "name": "宁蒗",
  "parent_id": 409,
  "k1": "n",
  "k2": "nl",
  "k3": "ninglang",
  "k4": "彝族",
  "k5": "自治县",
  "k6": 530724,
  "k7": "0888"
}, {
  "id": 2764,
  "name": "思茅",
  "parent_id": 410,
  "k1": "s",
  "k2": "sm",
  "k3": "simao",
  "k4": "",
  "k5": "区",
  "k6": 530802,
  "k7": "0879"
}, {
  "id": 2765,
  "name": "宁洱",
  "parent_id": 410,
  "k1": "n",
  "k2": "ne",
  "k3": "ninger",
  "k4": "哈尼族彝族",
  "k5": "县",
  "k6": 530821,
  "k7": "0879"
}, {
  "id": 2766,
  "name": "墨江",
  "parent_id": 410,
  "k1": "m",
  "k2": "mj",
  "k3": "mojiang",
  "k4": "哈尼族",
  "k5": "县",
  "k6": 530822,
  "k7": "0879"
}, {
  "id": 2767,
  "name": "景东",
  "parent_id": 410,
  "k1": "j",
  "k2": "jd",
  "k3": "jingdong",
  "k4": "彝族",
  "k5": "县",
  "k6": 530823,
  "k7": "0879"
}, {
  "id": 2768,
  "name": "景谷",
  "parent_id": 410,
  "k1": "j",
  "k2": "jg",
  "k3": "jinggu",
  "k4": "傣族彝族",
  "k5": "县",
  "k6": 530824,
  "k7": "0879"
}, {
  "id": 2769,
  "name": "镇沅",
  "parent_id": 410,
  "k1": "z",
  "k2": "zy",
  "k3": "zhenyuan",
  "k4": "彝族哈尼族拉祜族",
  "k5": "县",
  "k6": 530825,
  "k7": "0879"
}, {
  "id": 2770,
  "name": "江城",
  "parent_id": 410,
  "k1": "j",
  "k2": "jc",
  "k3": "jiangcheng",
  "k4": "哈尼族彝族",
  "k5": "县",
  "k6": 530826,
  "k7": "0879"
}, {
  "id": 2771,
  "name": "孟连",
  "parent_id": 410,
  "k1": "m",
  "k2": "ml",
  "k3": "menglian",
  "k4": "傣族拉祜族佤族",
  "k5": "县",
  "k6": 530827,
  "k7": "0879"
}, {
  "id": 2772,
  "name": "澜沧",
  "parent_id": 410,
  "k1": "l",
  "k2": "lc",
  "k3": "lancang",
  "k4": "拉祜族",
  "k5": "县",
  "k6": 530828,
  "k7": "0879"
}, {
  "id": 2773,
  "name": "西盟",
  "parent_id": 410,
  "k1": "x",
  "k2": "xm",
  "k3": "ximeng",
  "k4": "佤族",
  "k5": "县",
  "k6": 530829,
  "k7": "0879"
}, {
  "id": 2774,
  "name": "临翔",
  "parent_id": 411,
  "k1": "l",
  "k2": "lx",
  "k3": "linxiang",
  "k4": "",
  "k5": "区",
  "k6": 530902,
  "k7": "0883"
}, {
  "id": 2775,
  "name": "凤庆",
  "parent_id": 411,
  "k1": "f",
  "k2": "fq",
  "k3": "fengqing",
  "k4": "",
  "k5": "县",
  "k6": 530921,
  "k7": "0883"
}, {
  "id": 2776,
  "name": "云县",
  "parent_id": 411,
  "k1": "y",
  "k2": "yx",
  "k3": "yunxian",
  "k4": "",
  "k5": "",
  "k6": 530922,
  "k7": "0883"
}, {
  "id": 2777,
  "name": "永德",
  "parent_id": 411,
  "k1": "y",
  "k2": "yd",
  "k3": "yongde",
  "k4": "",
  "k5": "县",
  "k6": 530923,
  "k7": "0883"
}, {
  "id": 2778,
  "name": "镇康",
  "parent_id": 411,
  "k1": "z",
  "k2": "zk",
  "k3": "zhenkang",
  "k4": "",
  "k5": "县",
  "k6": 530924,
  "k7": "0883"
}, {
  "id": 2779,
  "name": "双江",
  "parent_id": 411,
  "k1": "s",
  "k2": "sj",
  "k3": "shuangjiang",
  "k4": "拉祜族佤族布朗族傣族",
  "k5": "自治县",
  "k6": 530925,
  "k7": "0883"
}, {
  "id": 2780,
  "name": "耿马",
  "parent_id": 411,
  "k1": "g",
  "k2": "gm",
  "k3": "gengma",
  "k4": "傣族佤族",
  "k5": "自治县",
  "k6": 530926,
  "k7": "0883"
}, {
  "id": 2781,
  "name": "沧源",
  "parent_id": 411,
  "k1": "c",
  "k2": "cy",
  "k3": "cangyuan",
  "k4": "佤族",
  "k5": "自治县",
  "k6": 530927,
  "k7": "0883"
}, {
  "id": 2782,
  "name": "楚雄",
  "parent_id": 412,
  "k1": "c",
  "k2": "cx",
  "k3": "chuxiong",
  "k4": "",
  "k5": "市",
  "k6": 532301,
  "k7": "0878"
}, {
  "id": 2783,
  "name": "双柏",
  "parent_id": 412,
  "k1": "s",
  "k2": "sb",
  "k3": "shuangbo",
  "k4": "",
  "k5": "县",
  "k6": 532322,
  "k7": "0878"
}, {
  "id": 2784,
  "name": "牟定",
  "parent_id": 412,
  "k1": "m",
  "k2": "md",
  "k3": "mouding",
  "k4": "",
  "k5": "县",
  "k6": 532323,
  "k7": "0878"
}, {
  "id": 2785,
  "name": "南华",
  "parent_id": 412,
  "k1": "n",
  "k2": "nh",
  "k3": "nanhua",
  "k4": "",
  "k5": "县",
  "k6": 532324,
  "k7": "0878"
}, {
  "id": 2786,
  "name": "姚安",
  "parent_id": 412,
  "k1": "y",
  "k2": "ya",
  "k3": "yaoan",
  "k4": "",
  "k5": "县",
  "k6": 532325,
  "k7": "0878"
}, {
  "id": 2787,
  "name": "大姚",
  "parent_id": 412,
  "k1": "d",
  "k2": "dy",
  "k3": "dayao",
  "k4": "",
  "k5": "县",
  "k6": 532326,
  "k7": "0878"
}, {
  "id": 2788,
  "name": "永仁",
  "parent_id": 412,
  "k1": "y",
  "k2": "yr",
  "k3": "yongren",
  "k4": "",
  "k5": "县",
  "k6": 532327,
  "k7": "0878"
}, {
  "id": 2789,
  "name": "元谋",
  "parent_id": 412,
  "k1": "y",
  "k2": "ym",
  "k3": "yuanmou",
  "k4": "",
  "k5": "县",
  "k6": 532328,
  "k7": "0878"
}, {
  "id": 2790,
  "name": "武定",
  "parent_id": 412,
  "k1": "w",
  "k2": "wd",
  "k3": "wuding",
  "k4": "",
  "k5": "县",
  "k6": 532329,
  "k7": "0878"
}, {
  "id": 2791,
  "name": "禄丰",
  "parent_id": 412,
  "k1": "l",
  "k2": "lf",
  "k3": "lufeng",
  "k4": "",
  "k5": "县",
  "k6": 532331,
  "k7": "0878"
}, {
  "id": 2792,
  "name": "个旧",
  "parent_id": 413,
  "k1": "g",
  "k2": "gj",
  "k3": "gejiu",
  "k4": "",
  "k5": "市",
  "k6": 532501,
  "k7": "0873"
}, {
  "id": 2793,
  "name": "开远",
  "parent_id": 413,
  "k1": "k",
  "k2": "ky",
  "k3": "kaiyuan",
  "k4": "",
  "k5": "市",
  "k6": 532502,
  "k7": "0873"
}, {
  "id": 2794,
  "name": "蒙自",
  "parent_id": 413,
  "k1": "m",
  "k2": "mz",
  "k3": "mengzi",
  "k4": "",
  "k5": "市",
  "k6": 532503,
  "k7": "0873"
}, {
  "id": 2795,
  "name": "屏边",
  "parent_id": 413,
  "k1": "p",
  "k2": "pb",
  "k3": "pingbian",
  "k4": "苗族",
  "k5": "自治县",
  "k6": 532523,
  "k7": "0873"
}, {
  "id": 2796,
  "name": "建水",
  "parent_id": 413,
  "k1": "j",
  "k2": "js",
  "k3": "jianshui",
  "k4": "",
  "k5": "县",
  "k6": 532524,
  "k7": "0873"
}, {
  "id": 2797,
  "name": "石屏",
  "parent_id": 413,
  "k1": "s",
  "k2": "sp",
  "k3": "shiping",
  "k4": "",
  "k5": "县",
  "k6": 532525,
  "k7": "0873"
}, {
  "id": 2798,
  "name": "弥勒",
  "parent_id": 413,
  "k1": "m",
  "k2": "ml",
  "k3": "mile",
  "k4": "",
  "k5": "市",
  "k6": 532526,
  "k7": "0873"
}, {
  "id": 2799,
  "name": "泸西",
  "parent_id": 413,
  "k1": "l",
  "k2": "lx",
  "k3": "luxi",
  "k4": "",
  "k5": "县",
  "k6": 532527,
  "k7": "0873"
}, {
  "id": 2800,
  "name": "元阳",
  "parent_id": 413,
  "k1": "y",
  "k2": "yy",
  "k3": "yuanyang",
  "k4": "",
  "k5": "县",
  "k6": 532528,
  "k7": "0873"
}, {
  "id": 2801,
  "name": "红河",
  "parent_id": 413,
  "k1": "h",
  "k2": "hh",
  "k3": "honghe",
  "k4": "",
  "k5": "县",
  "k6": 532529,
  "k7": "0873"
}, {
  "id": 2802,
  "name": "金平",
  "parent_id": 413,
  "k1": "j",
  "k2": "jp",
  "k3": "jinping",
  "k4": "苗族瑶族傣族",
  "k5": "自治县",
  "k6": 532530,
  "k7": "0873"
}, {
  "id": 2803,
  "name": "绿春",
  "parent_id": 413,
  "k1": "l",
  "k2": "lc",
  "k3": "lu:chun",
  "k4": "",
  "k5": "县",
  "k6": 532531,
  "k7": "0873"
}, {
  "id": 2804,
  "name": "河口",
  "parent_id": 413,
  "k1": "h",
  "k2": "hk",
  "k3": "hekou",
  "k4": "瑶族",
  "k5": "自治县",
  "k6": 532532,
  "k7": "0873"
}, {
  "id": 2805,
  "name": "文山",
  "parent_id": 414,
  "k1": "w",
  "k2": "ws",
  "k3": "wenshan",
  "k4": "",
  "k5": "县",
  "k6": 532601,
  "k7": "0876"
}, {
  "id": 2806,
  "name": "砚山",
  "parent_id": 414,
  "k1": "y",
  "k2": "ys",
  "k3": "yanshan",
  "k4": "",
  "k5": "县",
  "k6": 532622,
  "k7": "0876"
}, {
  "id": 2807,
  "name": "西畴",
  "parent_id": 414,
  "k1": "x",
  "k2": "xc",
  "k3": "xichou",
  "k4": "",
  "k5": "县",
  "k6": 532623,
  "k7": "0876"
}, {
  "id": 2808,
  "name": "麻栗坡",
  "parent_id": 414,
  "k1": "m",
  "k2": "mlp",
  "k3": "malipo",
  "k4": "",
  "k5": "县",
  "k6": 532624,
  "k7": "0876"
}, {
  "id": 2809,
  "name": "马关",
  "parent_id": 414,
  "k1": "m",
  "k2": "mg",
  "k3": "maguan",
  "k4": "",
  "k5": "县",
  "k6": 532625,
  "k7": "0876"
}, {
  "id": 2810,
  "name": "丘北",
  "parent_id": 414,
  "k1": "q",
  "k2": "qb",
  "k3": "qiubei",
  "k4": "",
  "k5": "县",
  "k6": 532626,
  "k7": "0876"
}, {
  "id": 2811,
  "name": "广南",
  "parent_id": 414,
  "k1": "g",
  "k2": "gn",
  "k3": "guangnan",
  "k4": "",
  "k5": "县",
  "k6": 532627,
  "k7": "0876"
}, {
  "id": 2812,
  "name": "富宁",
  "parent_id": 414,
  "k1": "f",
  "k2": "fn",
  "k3": "funing",
  "k4": "",
  "k5": "县",
  "k6": 532628,
  "k7": "0876"
}, {
  "id": 2813,
  "name": "景洪",
  "parent_id": 415,
  "k1": "j",
  "k2": "jh",
  "k3": "jinghong",
  "k4": "",
  "k5": "市",
  "k6": 532801,
  "k7": "0691"
}, {
  "id": 2814,
  "name": "勐海",
  "parent_id": 415,
  "k1": "m",
  "k2": "mh",
  "k3": "menghai",
  "k4": "",
  "k5": "县",
  "k6": 532822,
  "k7": "0691"
}, {
  "id": 2815,
  "name": "勐腊",
  "parent_id": 415,
  "k1": "m",
  "k2": "ml",
  "k3": "mengla",
  "k4": "",
  "k5": "县",
  "k6": 532823,
  "k7": "0691"
}, {
  "id": 2816,
  "name": "大理",
  "parent_id": 416,
  "k1": "d",
  "k2": "dl",
  "k3": "dali",
  "k4": "",
  "k5": "市",
  "k6": 532901,
  "k7": "0872"
}, {
  "id": 2817,
  "name": "漾濞",
  "parent_id": 416,
  "k1": "y",
  "k2": "yb",
  "k3": "yangbi",
  "k4": "彝族",
  "k5": "自治县",
  "k6": 532922,
  "k7": "0872"
}, {
  "id": 2818,
  "name": "祥云",
  "parent_id": 416,
  "k1": "x",
  "k2": "xy",
  "k3": "xiangyun",
  "k4": "",
  "k5": "县",
  "k6": 532923,
  "k7": "0872"
}, {
  "id": 2819,
  "name": "宾川",
  "parent_id": 416,
  "k1": "b",
  "k2": "bc",
  "k3": "binchuan",
  "k4": "",
  "k5": "县",
  "k6": 532924,
  "k7": "0872"
}, {
  "id": 2820,
  "name": "弥渡",
  "parent_id": 416,
  "k1": "m",
  "k2": "md",
  "k3": "midu",
  "k4": "",
  "k5": "县",
  "k6": 532925,
  "k7": "0872"
}, {
  "id": 2821,
  "name": "南涧",
  "parent_id": 416,
  "k1": "n",
  "k2": "nj",
  "k3": "nanjian",
  "k4": "彝族",
  "k5": "自治县",
  "k6": 532926,
  "k7": "0872"
}, {
  "id": 2822,
  "name": "巍山",
  "parent_id": 416,
  "k1": "w",
  "k2": "ws",
  "k3": "weishan",
  "k4": "彝族回族",
  "k5": "自治县",
  "k6": 532927,
  "k7": "0872"
}, {
  "id": 2823,
  "name": "永平",
  "parent_id": 416,
  "k1": "y",
  "k2": "yp",
  "k3": "yongping",
  "k4": "",
  "k5": "县",
  "k6": 532928,
  "k7": "0872"
}, {
  "id": 2824,
  "name": "云龙",
  "parent_id": 416,
  "k1": "y",
  "k2": "yl",
  "k3": "yunlong",
  "k4": "",
  "k5": "县",
  "k6": 532929,
  "k7": "0872"
}, {
  "id": 2825,
  "name": "洱源",
  "parent_id": 416,
  "k1": "e",
  "k2": "ey",
  "k3": "eryuan",
  "k4": "",
  "k5": "县",
  "k6": 532930,
  "k7": "0872"
}, {
  "id": 2826,
  "name": "剑川",
  "parent_id": 416,
  "k1": "j",
  "k2": "jc",
  "k3": "jianchuan",
  "k4": "",
  "k5": "县",
  "k6": 532931,
  "k7": "0872"
}, {
  "id": 2827,
  "name": "鹤庆",
  "parent_id": 416,
  "k1": "h",
  "k2": "hq",
  "k3": "heqing",
  "k4": "",
  "k5": "县",
  "k6": 532932,
  "k7": "0872"
}, {
  "id": 2828,
  "name": "瑞丽",
  "parent_id": 417,
  "k1": "r",
  "k2": "rl",
  "k3": "ruili",
  "k4": "",
  "k5": "市",
  "k6": 533102,
  "k7": "0692"
}, {
  "id": 2829,
  "name": "芒市",
  "parent_id": 417,
  "k1": "m",
  "k2": "ms",
  "k3": "mangshi",
  "k4": "",
  "k5": "",
  "k6": 533103,
  "k7": "0692"
}, {
  "id": 2830,
  "name": "梁河",
  "parent_id": 417,
  "k1": "l",
  "k2": "lh",
  "k3": "lianghe",
  "k4": "",
  "k5": "县",
  "k6": 533122,
  "k7": "0692"
}, {
  "id": 2831,
  "name": "盈江",
  "parent_id": 417,
  "k1": "y",
  "k2": "yj",
  "k3": "yingjiang",
  "k4": "",
  "k5": "县",
  "k6": 533123,
  "k7": "0692"
}, {
  "id": 2832,
  "name": "陇川",
  "parent_id": 417,
  "k1": "l",
  "k2": "lc",
  "k3": "longchuan",
  "k4": "",
  "k5": "县",
  "k6": 533124,
  "k7": "0692"
}, {
  "id": 2833,
  "name": "泸水",
  "parent_id": 418,
  "k1": "l",
  "k2": "ls",
  "k3": "lushui",
  "k4": "",
  "k5": "市",
  "k6": 533301,
  "k7": "0886"
}, {
  "id": 2834,
  "name": "福贡",
  "parent_id": 418,
  "k1": "f",
  "k2": "fg",
  "k3": "fugong",
  "k4": "",
  "k5": "县",
  "k6": 533323,
  "k7": "0886"
}, {
  "id": 2835,
  "name": "贡山",
  "parent_id": 418,
  "k1": "g",
  "k2": "gs",
  "k3": "gongshan",
  "k4": "独龙族怒族",
  "k5": "县",
  "k6": 533324,
  "k7": "0886"
}, {
  "id": 2836,
  "name": "兰坪",
  "parent_id": 418,
  "k1": "l",
  "k2": "lp",
  "k3": "lanping",
  "k4": "白族普米族",
  "k5": "县",
  "k6": 533325,
  "k7": "0886"
}, {
  "id": 2837,
  "name": "香格里拉",
  "parent_id": 419,
  "k1": "x",
  "k2": "xgll",
  "k3": "xianggelila",
  "k4": "",
  "k5": "市",
  "k6": 533421,
  "k7": "0887"
}, {
  "id": 2838,
  "name": "德钦",
  "parent_id": 419,
  "k1": "d",
  "k2": "dq",
  "k3": "deqin",
  "k4": "",
  "k5": "县",
  "k6": 533422,
  "k7": "0887"
}, {
  "id": 2839,
  "name": "维西",
  "parent_id": 419,
  "k1": "w",
  "k2": "wx",
  "k3": "weixi",
  "k4": "",
  "k5": "县",
  "k6": 533423,
  "k7": "0887"
}, {
  "id": 2840,
  "name": "隆阳",
  "parent_id": 420,
  "k1": "l",
  "k2": "ly",
  "k3": "longyang",
  "k4": "",
  "k5": "区",
  "k6": 530502,
  "k7": "0875"
}, {
  "id": 2841,
  "name": "施甸",
  "parent_id": 420,
  "k1": "s",
  "k2": "sd",
  "k3": "shidian",
  "k4": "",
  "k5": "县",
  "k6": 530521,
  "k7": "0875"
}, {
  "id": 2842,
  "name": "腾冲",
  "parent_id": 420,
  "k1": "t",
  "k2": "tc",
  "k3": "tengchong",
  "k4": "",
  "k5": "市",
  "k6": 530522,
  "k7": "0875"
}, {
  "id": 2843,
  "name": "龙陵",
  "parent_id": 420,
  "k1": "l",
  "k2": "ll",
  "k3": "longling",
  "k4": "",
  "k5": "县",
  "k6": 530523,
  "k7": "0875"
}, {
  "id": 2844,
  "name": "昌宁",
  "parent_id": 420,
  "k1": "c",
  "k2": "cn",
  "k3": "changning",
  "k4": "",
  "k5": "县",
  "k6": 530524,
  "k7": "0875"
}, {
  "id": 2845,
  "name": "城关",
  "parent_id": 421,
  "k1": "c",
  "k2": "cg",
  "k3": "chengguan",
  "k4": "",
  "k5": "区",
  "k6": 540102,
  "k7": "0891"
}, {
  "id": 2846,
  "name": "林周",
  "parent_id": 421,
  "k1": "l",
  "k2": "lz",
  "k3": "linzhou",
  "k4": "",
  "k5": "县",
  "k6": 540121,
  "k7": "0891"
}, {
  "id": 2847,
  "name": "当雄",
  "parent_id": 421,
  "k1": "d",
  "k2": "dx",
  "k3": "dangxiong",
  "k4": "",
  "k5": "县",
  "k6": 540122,
  "k7": "0891"
}, {
  "id": 2848,
  "name": "尼木",
  "parent_id": 421,
  "k1": "n",
  "k2": "nm",
  "k3": "nimu",
  "k4": "",
  "k5": "县",
  "k6": 540123,
  "k7": "0891"
}, {
  "id": 2849,
  "name": "曲水",
  "parent_id": 421,
  "k1": "q",
  "k2": "qs",
  "k3": "qushui",
  "k4": "",
  "k5": "县",
  "k6": 540124,
  "k7": "0891"
}, {
  "id": 2850,
  "name": "堆龙德庆",
  "parent_id": 421,
  "k1": "d",
  "k2": "dldq",
  "k3": "duilongdeqing",
  "k4": "",
  "k5": "区",
  "k6": 540125,
  "k7": "0891"
}, {
  "id": 2851,
  "name": "达孜",
  "parent_id": 421,
  "k1": "d",
  "k2": "dz",
  "k3": "dazi",
  "k4": "",
  "k5": "区",
  "k6": 540104,
  "k7": "0891"
}, {
  "id": 2852,
  "name": "墨竹工卡",
  "parent_id": 421,
  "k1": "m",
  "k2": "mzgk",
  "k3": "mozhugongka",
  "k4": "",
  "k5": "县",
  "k6": 540127,
  "k7": "0891"
}, {
  "id": 2853,
  "name": "卡若",
  "parent_id": 422,
  "k1": "k",
  "k2": "kr",
  "k3": "karuo",
  "k4": "",
  "k5": "区",
  "k6": 542121,
  "k7": "0895"
}, {
  "id": 2854,
  "name": "江达",
  "parent_id": 422,
  "k1": "j",
  "k2": "jd",
  "k3": "jiangda",
  "k4": "",
  "k5": "县",
  "k6": 542122,
  "k7": "0895"
}, {
  "id": 2855,
  "name": "贡觉",
  "parent_id": 422,
  "k1": "g",
  "k2": "gj",
  "k3": "gongjue",
  "k4": "",
  "k5": "县",
  "k6": 542123,
  "k7": "0895"
}, {
  "id": 2856,
  "name": "类乌齐",
  "parent_id": 422,
  "k1": "l",
  "k2": "lwq",
  "k3": "leiwuqi",
  "k4": "",
  "k5": "县",
  "k6": 542124,
  "k7": "0895"
}, {
  "id": 2857,
  "name": "丁青",
  "parent_id": 422,
  "k1": "d",
  "k2": "dq",
  "k3": "dingqing",
  "k4": "",
  "k5": "县",
  "k6": 542125,
  "k7": "0895"
}, {
  "id": 2858,
  "name": "察雅",
  "parent_id": 422,
  "k1": "c",
  "k2": "cy",
  "k3": "chaya",
  "k4": "",
  "k5": "县",
  "k6": 542126,
  "k7": "0895"
}, {
  "id": 2859,
  "name": "八宿",
  "parent_id": 422,
  "k1": "b",
  "k2": "bs",
  "k3": "basu",
  "k4": "",
  "k5": "县",
  "k6": 542127,
  "k7": "0895"
}, {
  "id": 2860,
  "name": "左贡",
  "parent_id": 422,
  "k1": "z",
  "k2": "zg",
  "k3": "zuogong",
  "k4": "",
  "k5": "县",
  "k6": 542128,
  "k7": "0895"
}, {
  "id": 2861,
  "name": "芒康",
  "parent_id": 422,
  "k1": "m",
  "k2": "mk",
  "k3": "mangkang",
  "k4": "",
  "k5": "县",
  "k6": 542129,
  "k7": "0895"
}, {
  "id": 2862,
  "name": "洛隆",
  "parent_id": 422,
  "k1": "l",
  "k2": "ll",
  "k3": "luolong",
  "k4": "",
  "k5": "县",
  "k6": 542132,
  "k7": "0895"
}, {
  "id": 2863,
  "name": "边坝",
  "parent_id": 422,
  "k1": "b",
  "k2": "bb",
  "k3": "bianba",
  "k4": "",
  "k5": "县",
  "k6": 542133,
  "k7": "0895"
}, {
  "id": 2864,
  "name": "乃东",
  "parent_id": 423,
  "k1": "n",
  "k2": "nd",
  "k3": "naidong",
  "k4": "",
  "k5": "区",
  "k6": 540502,
  "k7": "0893"
}, {
  "id": 2865,
  "name": "扎囊",
  "parent_id": 423,
  "k1": "z",
  "k2": "zn",
  "k3": "zhanang",
  "k4": "",
  "k5": "县",
  "k6": 540521,
  "k7": "0893"
}, {
  "id": 2866,
  "name": "贡嘎",
  "parent_id": 423,
  "k1": "g",
  "k2": "gg",
  "k3": "gongga",
  "k4": "",
  "k5": "县",
  "k6": 540522,
  "k7": "0893"
}, {
  "id": 2867,
  "name": "桑日",
  "parent_id": 423,
  "k1": "s",
  "k2": "sr",
  "k3": "sangri",
  "k4": "",
  "k5": "县",
  "k6": 540523,
  "k7": "0893"
}, {
  "id": 2868,
  "name": "琼结",
  "parent_id": 423,
  "k1": "q",
  "k2": "qj",
  "k3": "qiongjie",
  "k4": "",
  "k5": "县",
  "k6": 540524,
  "k7": "0893"
}, {
  "id": 2869,
  "name": "曲松",
  "parent_id": 423,
  "k1": "q",
  "k2": "qs",
  "k3": "qusong",
  "k4": "",
  "k5": "县",
  "k6": 540525,
  "k7": "0893"
}, {
  "id": 2870,
  "name": "措美",
  "parent_id": 423,
  "k1": "c",
  "k2": "cm",
  "k3": "cuomei",
  "k4": "",
  "k5": "县",
  "k6": 540526,
  "k7": "0893"
}, {
  "id": 2871,
  "name": "洛扎",
  "parent_id": 423,
  "k1": "l",
  "k2": "lz",
  "k3": "luozha",
  "k4": "",
  "k5": "县",
  "k6": 540527,
  "k7": "0893"
}, {
  "id": 2872,
  "name": "加查",
  "parent_id": 423,
  "k1": "j",
  "k2": "jc",
  "k3": "jiacha",
  "k4": "",
  "k5": "县",
  "k6": 540528,
  "k7": "0893"
}, {
  "id": 2873,
  "name": "隆子",
  "parent_id": 423,
  "k1": "l",
  "k2": "lz",
  "k3": "longzi",
  "k4": "",
  "k5": "县",
  "k6": 540529,
  "k7": "0893"
}, {
  "id": 2874,
  "name": "错那",
  "parent_id": 423,
  "k1": "c",
  "k2": "cn",
  "k3": "cuonei",
  "k4": "",
  "k5": "县",
  "k6": 540530,
  "k7": "0893"
}, {
  "id": 2875,
  "name": "浪卡子",
  "parent_id": 423,
  "k1": "l",
  "k2": "lkz",
  "k3": "langkazi",
  "k4": "",
  "k5": "县",
  "k6": 540531,
  "k7": "0893"
}, {
  "id": 2876,
  "name": "桑珠孜",
  "parent_id": 424,
  "k1": "s",
  "k2": "szz",
  "k3": "sangzhuzi",
  "k4": "",
  "k5": "区",
  "k6": 542301,
  "k7": "0892"
}, {
  "id": 2877,
  "name": "南木林",
  "parent_id": 424,
  "k1": "n",
  "k2": "nml",
  "k3": "nanmulin",
  "k4": "",
  "k5": "县",
  "k6": 542322,
  "k7": "0892"
}, {
  "id": 2878,
  "name": "江孜",
  "parent_id": 424,
  "k1": "j",
  "k2": "jz",
  "k3": "jiangzi",
  "k4": "",
  "k5": "县",
  "k6": 542323,
  "k7": "0892"
}, {
  "id": 2879,
  "name": "定日",
  "parent_id": 424,
  "k1": "d",
  "k2": "dr",
  "k3": "dingri",
  "k4": "",
  "k5": "县",
  "k6": 542324,
  "k7": "0892"
}, {
  "id": 2880,
  "name": "萨迦",
  "parent_id": 424,
  "k1": "s",
  "k2": "sj",
  "k3": "sajia",
  "k4": "",
  "k5": "县",
  "k6": 542325,
  "k7": "0892"
}, {
  "id": 2881,
  "name": "拉孜",
  "parent_id": 424,
  "k1": "l",
  "k2": "lz",
  "k3": "lazi",
  "k4": "",
  "k5": "县",
  "k6": 542326,
  "k7": "0892"
}, {
  "id": 2882,
  "name": "昂仁",
  "parent_id": 424,
  "k1": "a",
  "k2": "ar",
  "k3": "angren",
  "k4": "",
  "k5": "县",
  "k6": 542327,
  "k7": "0892"
}, {
  "id": 2883,
  "name": "谢通门",
  "parent_id": 424,
  "k1": "x",
  "k2": "xtm",
  "k3": "xietongmen",
  "k4": "",
  "k5": "县",
  "k6": 542328,
  "k7": "0892"
}, {
  "id": 2884,
  "name": "白朗",
  "parent_id": 424,
  "k1": "b",
  "k2": "bl",
  "k3": "bailang",
  "k4": "",
  "k5": "县",
  "k6": 542329,
  "k7": "0892"
}, {
  "id": 2885,
  "name": "仁布",
  "parent_id": 424,
  "k1": "r",
  "k2": "rb",
  "k3": "renbu",
  "k4": "",
  "k5": "县",
  "k6": 542330,
  "k7": "0892"
}, {
  "id": 2886,
  "name": "康马",
  "parent_id": 424,
  "k1": "k",
  "k2": "km",
  "k3": "kangma",
  "k4": "",
  "k5": "县",
  "k6": 542331,
  "k7": "0892"
}, {
  "id": 2887,
  "name": "定结",
  "parent_id": 424,
  "k1": "d",
  "k2": "dj",
  "k3": "dingjie",
  "k4": "",
  "k5": "县",
  "k6": 542332,
  "k7": "0892"
}, {
  "id": 2888,
  "name": "仲巴",
  "parent_id": 424,
  "k1": "z",
  "k2": "zb",
  "k3": "zhongba",
  "k4": "",
  "k5": "县",
  "k6": 542333,
  "k7": "0892"
}, {
  "id": 2889,
  "name": "亚东",
  "parent_id": 424,
  "k1": "y",
  "k2": "yd",
  "k3": "yadong",
  "k4": "",
  "k5": "县",
  "k6": 542334,
  "k7": "0892"
}, {
  "id": 2890,
  "name": "吉隆",
  "parent_id": 424,
  "k1": "j",
  "k2": "jl",
  "k3": "jilong",
  "k4": "",
  "k5": "县",
  "k6": 542335,
  "k7": "0892"
}, {
  "id": 2891,
  "name": "聂拉木",
  "parent_id": 424,
  "k1": "n",
  "k2": "nlm",
  "k3": "nielamu",
  "k4": "",
  "k5": "县",
  "k6": 542336,
  "k7": "0892"
}, {
  "id": 2892,
  "name": "萨嘎",
  "parent_id": 424,
  "k1": "s",
  "k2": "sg",
  "k3": "saga",
  "k4": "",
  "k5": "县",
  "k6": 542337,
  "k7": "0892"
}, {
  "id": 2893,
  "name": "岗巴",
  "parent_id": 424,
  "k1": "g",
  "k2": "gb",
  "k3": "gangba",
  "k4": "",
  "k5": "县",
  "k6": 542338,
  "k7": "0892"
}, {
  "id": 2894,
  "name": "双湖",
  "parent_id": 425,
  "k1": "s",
  "k2": "sh",
  "k3": "shuanghu",
  "k4": "",
  "k5": "县",
  "k6": 540630,
  "k7": "0896"
}, {
  "id": 2895,
  "name": "色尼",
  "parent_id": 425,
  "k1": "s",
  "k2": "sn",
  "k3": "seni",
  "k4": "",
  "k5": "区",
  "k6": 540602,
  "k7": "0896"
}, {
  "id": 2896,
  "name": "嘉黎",
  "parent_id": 425,
  "k1": "j",
  "k2": "jl",
  "k3": "jiali",
  "k4": "",
  "k5": "县",
  "k6": 540621,
  "k7": "0896"
}, {
  "id": 2897,
  "name": "比如",
  "parent_id": 425,
  "k1": "b",
  "k2": "br",
  "k3": "biru",
  "k4": "",
  "k5": "县",
  "k6": 540622,
  "k7": "0896"
}, {
  "id": 2898,
  "name": "聂荣",
  "parent_id": 425,
  "k1": "n",
  "k2": "nr",
  "k3": "nierong",
  "k4": "",
  "k5": "县",
  "k6": 540623,
  "k7": "0896"
}, {
  "id": 2899,
  "name": "安多",
  "parent_id": 425,
  "k1": "a",
  "k2": "ad",
  "k3": "anduo",
  "k4": "",
  "k5": "县",
  "k6": 540624,
  "k7": "0896"
}, {
  "id": 2900,
  "name": "申扎",
  "parent_id": 425,
  "k1": "s",
  "k2": "sz",
  "k3": "shenzha",
  "k4": "",
  "k5": "县",
  "k6": 540625,
  "k7": "0896"
}, {
  "id": 2901,
  "name": "索县",
  "parent_id": 425,
  "k1": "s",
  "k2": "sx",
  "k3": "suoxian",
  "k4": "",
  "k5": "",
  "k6": 540626,
  "k7": "0896"
}, {
  "id": 2902,
  "name": "班戈",
  "parent_id": 425,
  "k1": "b",
  "k2": "bg",
  "k3": "bange",
  "k4": "",
  "k5": "县",
  "k6": 540627,
  "k7": "0896"
}, {
  "id": 2903,
  "name": "巴青",
  "parent_id": 425,
  "k1": "b",
  "k2": "bq",
  "k3": "baqing",
  "k4": "",
  "k5": "县",
  "k6": 540628,
  "k7": "0896"
}, {
  "id": 2904,
  "name": "尼玛",
  "parent_id": 425,
  "k1": "n",
  "k2": "nm",
  "k3": "nima",
  "k4": "",
  "k5": "县",
  "k6": 540629,
  "k7": "0896"
}, {
  "id": 2905,
  "name": "普兰",
  "parent_id": 426,
  "k1": "p",
  "k2": "pl",
  "k3": "pulan",
  "k4": "",
  "k5": "县",
  "k6": 542521,
  "k7": "0897"
}, {
  "id": 2906,
  "name": "札达",
  "parent_id": 426,
  "k1": "z",
  "k2": "zd",
  "k3": "zhada",
  "k4": "",
  "k5": "县",
  "k6": 542522,
  "k7": "0897"
}, {
  "id": 2907,
  "name": "噶尔",
  "parent_id": 426,
  "k1": "g",
  "k2": "ge",
  "k3": "gaer",
  "k4": "",
  "k5": "县",
  "k6": 542523,
  "k7": "0897"
}, {
  "id": 2908,
  "name": "日土",
  "parent_id": 426,
  "k1": "r",
  "k2": "rt",
  "k3": "ritu",
  "k4": "",
  "k5": "县",
  "k6": 542524,
  "k7": "0897"
}, {
  "id": 2909,
  "name": "革吉",
  "parent_id": 426,
  "k1": "g",
  "k2": "gj",
  "k3": "geji",
  "k4": "",
  "k5": "县",
  "k6": 542525,
  "k7": "0897"
}, {
  "id": 2910,
  "name": "改则",
  "parent_id": 426,
  "k1": "g",
  "k2": "gz",
  "k3": "gaize",
  "k4": "",
  "k5": "县",
  "k6": 542526,
  "k7": "0897"
}, {
  "id": 2911,
  "name": "措勤",
  "parent_id": 426,
  "k1": "c",
  "k2": "cq",
  "k3": "cuoqin",
  "k4": "",
  "k5": "县",
  "k6": 542527,
  "k7": "0897"
}, {
  "id": 2912,
  "name": "巴宜",
  "parent_id": 427,
  "k1": "b",
  "k2": "by",
  "k3": "bayi",
  "k4": "",
  "k5": "区",
  "k6": 540402,
  "k7": "0894"
}, {
  "id": 2913,
  "name": "工布江达",
  "parent_id": 427,
  "k1": "g",
  "k2": "gbjd",
  "k3": "gongbujiangda",
  "k4": "",
  "k5": "县",
  "k6": 542621,
  "k7": "0894"
}, {
  "id": 2914,
  "name": "米林",
  "parent_id": 427,
  "k1": "m",
  "k2": "ml",
  "k3": "milin",
  "k4": "",
  "k5": "县",
  "k6": 542621,
  "k7": "0894"
}, {
  "id": 2915,
  "name": "墨脱",
  "parent_id": 427,
  "k1": "m",
  "k2": "mt",
  "k3": "motuo",
  "k4": "",
  "k5": "县",
  "k6": 542621,
  "k7": "0894"
}, {
  "id": 2916,
  "name": "波密",
  "parent_id": 427,
  "k1": "b",
  "k2": "bm",
  "k3": "bomi",
  "k4": "",
  "k5": "县",
  "k6": 542621,
  "k7": "0894"
}, {
  "id": 2917,
  "name": "察隅",
  "parent_id": 427,
  "k1": "c",
  "k2": "cy",
  "k3": "chayu",
  "k4": "",
  "k5": "县",
  "k6": 542621,
  "k7": "0894"
}, {
  "id": 2918,
  "name": "朗县",
  "parent_id": 427,
  "k1": "l",
  "k2": "lx",
  "k3": "langxian",
  "k4": "",
  "k5": "",
  "k6": 542621,
  "k7": "0894"
}, {
  "id": 2919,
  "name": "新城",
  "parent_id": 428,
  "k1": "x",
  "k2": "xc",
  "k3": "xincheng",
  "k4": "",
  "k5": "区",
  "k6": 610102,
  "k7": "029"
}, {
  "id": 2920,
  "name": "碑林",
  "parent_id": 428,
  "k1": "b",
  "k2": "bl",
  "k3": "beilin",
  "k4": "",
  "k5": "区",
  "k6": 610103,
  "k7": "029"
}, {
  "id": 2921,
  "name": "莲湖",
  "parent_id": 428,
  "k1": "l",
  "k2": "lh",
  "k3": "lianhu",
  "k4": "",
  "k5": "区",
  "k6": 610104,
  "k7": "029"
}, {
  "id": 2922,
  "name": "灞桥",
  "parent_id": 428,
  "k1": "b",
  "k2": "bq",
  "k3": "baqiao",
  "k4": "",
  "k5": "区",
  "k6": 610111,
  "k7": "029"
}, {
  "id": 2923,
  "name": "未央",
  "parent_id": 428,
  "k1": "w",
  "k2": "wy",
  "k3": "weiyang",
  "k4": "",
  "k5": "区",
  "k6": 610112,
  "k7": "029"
}, {
  "id": 2924,
  "name": "雁塔",
  "parent_id": 428,
  "k1": "y",
  "k2": "yt",
  "k3": "yanta",
  "k4": "",
  "k5": "区",
  "k6": 610113,
  "k7": "029"
}, {
  "id": 2925,
  "name": "阎良",
  "parent_id": 428,
  "k1": "y",
  "k2": "yl",
  "k3": "yanliang",
  "k4": "",
  "k5": "区",
  "k6": 610114,
  "k7": "029"
}, {
  "id": 2926,
  "name": "临潼",
  "parent_id": 428,
  "k1": "l",
  "k2": "lt",
  "k3": "lintong",
  "k4": "",
  "k5": "区",
  "k6": 610115,
  "k7": "029"
}, {
  "id": 2927,
  "name": "长安",
  "parent_id": 428,
  "k1": "c",
  "k2": "ca",
  "k3": "changan",
  "k4": "",
  "k5": "区",
  "k6": 610116,
  "k7": "029"
}, {
  "id": 2928,
  "name": "蓝田",
  "parent_id": 428,
  "k1": "l",
  "k2": "lt",
  "k3": "lantian",
  "k4": "",
  "k5": "县",
  "k6": 610122,
  "k7": "029"
}, {
  "id": 2929,
  "name": "周至",
  "parent_id": 428,
  "k1": "z",
  "k2": "zz",
  "k3": "zhouzhi",
  "k4": "",
  "k5": "县",
  "k6": 610124,
  "k7": "029"
}, {
  "id": 2930,
  "name": "鄠邑",
  "parent_id": 428,
  "k1": "h",
  "k2": "hy",
  "k3": "huyi",
  "k4": "",
  "k5": "区",
  "k6": 610118,
  "k7": "029"
}, {
  "id": 2931,
  "name": "高陵",
  "parent_id": 428,
  "k1": "g",
  "k2": "gl",
  "k3": "gaoling",
  "k4": "",
  "k5": "区",
  "k6": 610117,
  "k7": "029"
}, {
  "id": 2932,
  "name": "王益",
  "parent_id": 429,
  "k1": "w",
  "k2": "wy",
  "k3": "wangyi",
  "k4": "",
  "k5": "区",
  "k6": 610202,
  "k7": "0919"
}, {
  "id": 2933,
  "name": "印台",
  "parent_id": 429,
  "k1": "y",
  "k2": "yt",
  "k3": "yintai",
  "k4": "",
  "k5": "区",
  "k6": 610203,
  "k7": "0919"
}, {
  "id": 2934,
  "name": "耀州",
  "parent_id": 429,
  "k1": "y",
  "k2": "yz",
  "k3": "yaozhou",
  "k4": "",
  "k5": "区",
  "k6": 610204,
  "k7": "0919"
}, {
  "id": 2935,
  "name": "宜君",
  "parent_id": 429,
  "k1": "y",
  "k2": "yj",
  "k3": "yijun",
  "k4": "",
  "k5": "县",
  "k6": 610222,
  "k7": "0919"
}, {
  "id": 2936,
  "name": "渭滨",
  "parent_id": 430,
  "k1": "w",
  "k2": "wb",
  "k3": "weibin",
  "k4": "",
  "k5": "区",
  "k6": 610302,
  "k7": "0917"
}, {
  "id": 2937,
  "name": "金台",
  "parent_id": 430,
  "k1": "j",
  "k2": "jt",
  "k3": "jintai",
  "k4": "",
  "k5": "区",
  "k6": 610303,
  "k7": "0917"
}, {
  "id": 2938,
  "name": "陈仓",
  "parent_id": 430,
  "k1": "c",
  "k2": "cc",
  "k3": "chencang",
  "k4": "",
  "k5": "区",
  "k6": 610304,
  "k7": "0917"
}, {
  "id": 2939,
  "name": "凤翔",
  "parent_id": 430,
  "k1": "f",
  "k2": "fx",
  "k3": "fengxiang",
  "k4": "",
  "k5": "县",
  "k6": 610322,
  "k7": "0917"
}, {
  "id": 2940,
  "name": "岐山",
  "parent_id": 430,
  "k1": "q",
  "k2": "qs",
  "k3": "qishan",
  "k4": "",
  "k5": "县",
  "k6": 610323,
  "k7": "0917"
}, {
  "id": 2941,
  "name": "扶风",
  "parent_id": 430,
  "k1": "f",
  "k2": "ff",
  "k3": "fufeng",
  "k4": "",
  "k5": "县",
  "k6": 610324,
  "k7": "0917"
}, {
  "id": 2942,
  "name": "眉县",
  "parent_id": 430,
  "k1": "m",
  "k2": "mx",
  "k3": "meixian",
  "k4": "",
  "k5": "",
  "k6": 610326,
  "k7": "0917"
}, {
  "id": 2943,
  "name": "陇县",
  "parent_id": 430,
  "k1": "l",
  "k2": "lx",
  "k3": "longxian",
  "k4": "",
  "k5": "",
  "k6": 610327,
  "k7": "0917"
}, {
  "id": 2944,
  "name": "千阳",
  "parent_id": 430,
  "k1": "q",
  "k2": "qy",
  "k3": "qianyang",
  "k4": "",
  "k5": "县",
  "k6": 610328,
  "k7": "0917"
}, {
  "id": 2945,
  "name": "麟游",
  "parent_id": 430,
  "k1": "l",
  "k2": "ly",
  "k3": "linyou",
  "k4": "",
  "k5": "县",
  "k6": 610329,
  "k7": "0917"
}, {
  "id": 2946,
  "name": "凤县",
  "parent_id": 430,
  "k1": "f",
  "k2": "fx",
  "k3": "fengxian",
  "k4": "",
  "k5": "",
  "k6": 610330,
  "k7": "0917"
}, {
  "id": 2947,
  "name": "太白",
  "parent_id": 430,
  "k1": "t",
  "k2": "tb",
  "k3": "taibai",
  "k4": "",
  "k5": "县",
  "k6": 610331,
  "k7": "0917"
}, {
  "id": 2948,
  "name": "秦都",
  "parent_id": 431,
  "k1": "q",
  "k2": "qd",
  "k3": "qindu",
  "k4": "",
  "k5": "区",
  "k6": 610402,
  "k7": "029"
}, {
  "id": 2949,
  "name": "杨陵",
  "parent_id": 431,
  "k1": "y",
  "k2": "yl",
  "k3": "yangling",
  "k4": "",
  "k5": "区",
  "k6": 610403,
  "k7": "029"
}, {
  "id": 2950,
  "name": "渭城",
  "parent_id": 431,
  "k1": "w",
  "k2": "wc",
  "k3": "weicheng",
  "k4": "",
  "k5": "区",
  "k6": 610404,
  "k7": "029"
}, {
  "id": 2951,
  "name": "三原",
  "parent_id": 431,
  "k1": "s",
  "k2": "sy",
  "k3": "sanyuan",
  "k4": "",
  "k5": "县",
  "k6": 610422,
  "k7": "029"
}, {
  "id": 2952,
  "name": "泾阳",
  "parent_id": 431,
  "k1": "j",
  "k2": "jy",
  "k3": "jingyang",
  "k4": "",
  "k5": "县",
  "k6": 610423,
  "k7": "029"
}, {
  "id": 2953,
  "name": "乾县",
  "parent_id": 431,
  "k1": "q",
  "k2": "qx",
  "k3": "qianxian",
  "k4": "",
  "k5": "",
  "k6": 610424,
  "k7": "029"
}, {
  "id": 2954,
  "name": "礼泉",
  "parent_id": 431,
  "k1": "l",
  "k2": "lq",
  "k3": "liquan",
  "k4": "",
  "k5": "县",
  "k6": 610425,
  "k7": "029"
}, {
  "id": 2955,
  "name": "永寿",
  "parent_id": 431,
  "k1": "y",
  "k2": "ys",
  "k3": "yongshou",
  "k4": "",
  "k5": "县",
  "k6": 610426,
  "k7": "029"
}, {
  "id": 2956,
  "name": "彬州",
  "parent_id": 431,
  "k1": "b",
  "k2": "bz",
  "k3": "binzhou",
  "k4": "",
  "k5": "市",
  "k6": 610482,
  "k7": "029"
}, {
  "id": 2957,
  "name": "长武",
  "parent_id": 431,
  "k1": "c",
  "k2": "cw",
  "k3": "changwu",
  "k4": "",
  "k5": "县",
  "k6": 610428,
  "k7": "029"
}, {
  "id": 2958,
  "name": "旬邑",
  "parent_id": 431,
  "k1": "x",
  "k2": "xy",
  "k3": "xunyi",
  "k4": "",
  "k5": "县",
  "k6": 610429,
  "k7": "029"
}, {
  "id": 2959,
  "name": "淳化",
  "parent_id": 431,
  "k1": "c",
  "k2": "ch",
  "k3": "chunhua",
  "k4": "",
  "k5": "县",
  "k6": 610430,
  "k7": "029"
}, {
  "id": 2960,
  "name": "武功",
  "parent_id": 431,
  "k1": "w",
  "k2": "wg",
  "k3": "wugong",
  "k4": "",
  "k5": "县",
  "k6": 610431,
  "k7": "029"
}, {
  "id": 2961,
  "name": "兴平",
  "parent_id": 431,
  "k1": "x",
  "k2": "xp",
  "k3": "xingping",
  "k4": "",
  "k5": "市",
  "k6": 610481,
  "k7": "029"
}, {
  "id": 2962,
  "name": "临渭",
  "parent_id": 432,
  "k1": "l",
  "k2": "lw",
  "k3": "linwei",
  "k4": "",
  "k5": "区",
  "k6": 610502,
  "k7": "0913"
}, {
  "id": 2963,
  "name": "华州",
  "parent_id": 432,
  "k1": "h",
  "k2": "hz",
  "k3": "huazhou",
  "k4": "",
  "k5": "区",
  "k6": 610521,
  "k7": "0913"
}, {
  "id": 2964,
  "name": "潼关",
  "parent_id": 432,
  "k1": "t",
  "k2": "tg",
  "k3": "tongguan",
  "k4": "",
  "k5": "县",
  "k6": 610522,
  "k7": "0913"
}, {
  "id": 2965,
  "name": "大荔",
  "parent_id": 432,
  "k1": "d",
  "k2": "dl",
  "k3": "dali",
  "k4": "",
  "k5": "县",
  "k6": 610523,
  "k7": "0913"
}, {
  "id": 2966,
  "name": "合阳",
  "parent_id": 432,
  "k1": "h",
  "k2": "hy",
  "k3": "heyang",
  "k4": "",
  "k5": "县",
  "k6": 610524,
  "k7": "0913"
}, {
  "id": 2967,
  "name": "澄城",
  "parent_id": 432,
  "k1": "c",
  "k2": "cc",
  "k3": "chengcheng",
  "k4": "",
  "k5": "县",
  "k6": 610525,
  "k7": "0913"
}, {
  "id": 2968,
  "name": "蒲城",
  "parent_id": 432,
  "k1": "p",
  "k2": "pc",
  "k3": "pucheng",
  "k4": "",
  "k5": "县",
  "k6": 610526,
  "k7": "0913"
}, {
  "id": 2969,
  "name": "白水",
  "parent_id": 432,
  "k1": "b",
  "k2": "bs",
  "k3": "baishui",
  "k4": "",
  "k5": "县",
  "k6": 610527,
  "k7": "0913"
}, {
  "id": 2970,
  "name": "富平",
  "parent_id": 432,
  "k1": "f",
  "k2": "fp",
  "k3": "fuping",
  "k4": "",
  "k5": "县",
  "k6": 610528,
  "k7": "0913"
}, {
  "id": 2971,
  "name": "韩城",
  "parent_id": 432,
  "k1": "h",
  "k2": "hc",
  "k3": "hancheng",
  "k4": "",
  "k5": "市",
  "k6": 610581,
  "k7": "0913"
}, {
  "id": 2972,
  "name": "华阴",
  "parent_id": 432,
  "k1": "h",
  "k2": "hy",
  "k3": "huayin",
  "k4": "",
  "k5": "市",
  "k6": 610582,
  "k7": "0913"
}, {
  "id": 2973,
  "name": "宝塔",
  "parent_id": 433,
  "k1": "b",
  "k2": "bt",
  "k3": "baota",
  "k4": "",
  "k5": "区",
  "k6": 610602,
  "k7": "0911"
}, {
  "id": 2974,
  "name": "延长",
  "parent_id": 433,
  "k1": "y",
  "k2": "yc",
  "k3": "yanchang",
  "k4": "",
  "k5": "县",
  "k6": 610621,
  "k7": "0911"
}, {
  "id": 2975,
  "name": "延川",
  "parent_id": 433,
  "k1": "y",
  "k2": "yc",
  "k3": "yanchuan",
  "k4": "",
  "k5": "县",
  "k6": 610622,
  "k7": "0911"
}, {
  "id": 2976,
  "name": "子长",
  "parent_id": 433,
  "k1": "z",
  "k2": "zc",
  "k3": "zichang",
  "k4": "",
  "k5": "县",
  "k6": 610623,
  "k7": "0911"
}, {
  "id": 2977,
  "name": "安塞",
  "parent_id": 433,
  "k1": "a",
  "k2": "as",
  "k3": "ansai",
  "k4": "",
  "k5": "区",
  "k6": 610603,
  "k7": "0911"
}, {
  "id": 2978,
  "name": "志丹",
  "parent_id": 433,
  "k1": "z",
  "k2": "zd",
  "k3": "zhidan",
  "k4": "",
  "k5": "县",
  "k6": 610625,
  "k7": "0911"
}, {
  "id": 2979,
  "name": "吴起",
  "parent_id": 433,
  "k1": "w",
  "k2": "wq",
  "k3": "wuqi",
  "k4": "",
  "k5": "县",
  "k6": 610626,
  "k7": "0911"
}, {
  "id": 2980,
  "name": "甘泉",
  "parent_id": 433,
  "k1": "g",
  "k2": "gq",
  "k3": "ganquan",
  "k4": "",
  "k5": "县",
  "k6": 610627,
  "k7": "0911"
}, {
  "id": 2981,
  "name": "富县",
  "parent_id": 433,
  "k1": "f",
  "k2": "fx",
  "k3": "fuxian",
  "k4": "",
  "k5": "",
  "k6": 610628,
  "k7": "0911"
}, {
  "id": 2982,
  "name": "洛川",
  "parent_id": 433,
  "k1": "l",
  "k2": "lc",
  "k3": "luochuan",
  "k4": "",
  "k5": "县",
  "k6": 610629,
  "k7": "0911"
}, {
  "id": 2983,
  "name": "宜川",
  "parent_id": 433,
  "k1": "y",
  "k2": "yc",
  "k3": "yichuan",
  "k4": "",
  "k5": "县",
  "k6": 610630,
  "k7": "0911"
}, {
  "id": 2984,
  "name": "黄龙",
  "parent_id": 433,
  "k1": "h",
  "k2": "hl",
  "k3": "huanglong",
  "k4": "",
  "k5": "县",
  "k6": 610631,
  "k7": "0911"
}, {
  "id": 2985,
  "name": "黄陵",
  "parent_id": 433,
  "k1": "h",
  "k2": "hl",
  "k3": "huangling",
  "k4": "",
  "k5": "县",
  "k6": 610632,
  "k7": "0911"
}, {
  "id": 2986,
  "name": "汉台",
  "parent_id": 434,
  "k1": "h",
  "k2": "ht",
  "k3": "hantai",
  "k4": "",
  "k5": "区",
  "k6": 610702,
  "k7": "0916"
}, {
  "id": 2987,
  "name": "南郑",
  "parent_id": 434,
  "k1": "n",
  "k2": "nz",
  "k3": "nanzheng",
  "k4": "",
  "k5": "区",
  "k6": 610703,
  "k7": "0916"
}, {
  "id": 2988,
  "name": "城固",
  "parent_id": 434,
  "k1": "c",
  "k2": "cg",
  "k3": "chenggu",
  "k4": "",
  "k5": "县",
  "k6": 610722,
  "k7": "0916"
}, {
  "id": 2989,
  "name": "洋县",
  "parent_id": 434,
  "k1": "y",
  "k2": "yx",
  "k3": "yangxian",
  "k4": "",
  "k5": "",
  "k6": 610723,
  "k7": "0916"
}, {
  "id": 2990,
  "name": "西乡",
  "parent_id": 434,
  "k1": "x",
  "k2": "xx",
  "k3": "xixiang",
  "k4": "",
  "k5": "县",
  "k6": 610724,
  "k7": "0916"
}, {
  "id": 2991,
  "name": "勉县",
  "parent_id": 434,
  "k1": "m",
  "k2": "mx",
  "k3": "mianxian",
  "k4": "",
  "k5": "",
  "k6": 610725,
  "k7": "0916"
}, {
  "id": 2992,
  "name": "宁强",
  "parent_id": 434,
  "k1": "n",
  "k2": "nq",
  "k3": "ningqiang",
  "k4": "",
  "k5": "县",
  "k6": 610726,
  "k7": "0916"
}, {
  "id": 2993,
  "name": "略阳",
  "parent_id": 434,
  "k1": "l",
  "k2": "ly",
  "k3": "lu:eyang",
  "k4": "",
  "k5": "县",
  "k6": 610727,
  "k7": "0916"
}, {
  "id": 2994,
  "name": "镇巴",
  "parent_id": 434,
  "k1": "z",
  "k2": "zb",
  "k3": "zhenba",
  "k4": "",
  "k5": "县",
  "k6": 610728,
  "k7": "0916"
}, {
  "id": 2995,
  "name": "留坝",
  "parent_id": 434,
  "k1": "l",
  "k2": "lb",
  "k3": "liuba",
  "k4": "",
  "k5": "县",
  "k6": 610729,
  "k7": "0916"
}, {
  "id": 2996,
  "name": "佛坪",
  "parent_id": 434,
  "k1": "f",
  "k2": "fp",
  "k3": "foping",
  "k4": "",
  "k5": "县",
  "k6": 610730,
  "k7": "0916"
}, {
  "id": 2997,
  "name": "榆阳",
  "parent_id": 435,
  "k1": "y",
  "k2": "yy",
  "k3": "yuyang",
  "k4": "",
  "k5": "区",
  "k6": 610802,
  "k7": "0912"
}, {
  "id": 2998,
  "name": "神木",
  "parent_id": 435,
  "k1": "s",
  "k2": "sm",
  "k3": "shenmu",
  "k4": "",
  "k5": "市",
  "k6": 610881,
  "k7": "0912"
}, {
  "id": 2999,
  "name": "府谷",
  "parent_id": 435,
  "k1": "f",
  "k2": "fg",
  "k3": "fugu",
  "k4": "",
  "k5": "县",
  "k6": 610822,
  "k7": "0912"
}, {
  "id": 3000,
  "name": "横山",
  "parent_id": 435,
  "k1": "h",
  "k2": "hs",
  "k3": "hengshan",
  "k4": "",
  "k5": "区",
  "k6": 610823,
  "k7": "0912"
}, {
  "id": 3001,
  "name": "靖边",
  "parent_id": 435,
  "k1": "j",
  "k2": "jb",
  "k3": "jingbian",
  "k4": "",
  "k5": "县",
  "k6": 610824,
  "k7": "0912"
}, {
  "id": 3002,
  "name": "定边",
  "parent_id": 435,
  "k1": "d",
  "k2": "db",
  "k3": "dingbian",
  "k4": "",
  "k5": "县",
  "k6": 610825,
  "k7": "0912"
}, {
  "id": 3003,
  "name": "绥德",
  "parent_id": 435,
  "k1": "s",
  "k2": "sd",
  "k3": "suide",
  "k4": "",
  "k5": "县",
  "k6": 610826,
  "k7": "0912"
}, {
  "id": 3004,
  "name": "米脂",
  "parent_id": 435,
  "k1": "m",
  "k2": "mz",
  "k3": "mizhi",
  "k4": "",
  "k5": "县",
  "k6": 610827,
  "k7": "0912"
}, {
  "id": 3005,
  "name": "佳县",
  "parent_id": 435,
  "k1": "j",
  "k2": "jx",
  "k3": "jiaxian",
  "k4": "",
  "k5": "",
  "k6": 610828,
  "k7": "0912"
}, {
  "id": 3006,
  "name": "吴堡",
  "parent_id": 435,
  "k1": "w",
  "k2": "wb",
  "k3": "wubao",
  "k4": "",
  "k5": "县",
  "k6": 610829,
  "k7": "0912"
}, {
  "id": 3007,
  "name": "清涧",
  "parent_id": 435,
  "k1": "q",
  "k2": "qj",
  "k3": "qingjian",
  "k4": "",
  "k5": "县",
  "k6": 610830,
  "k7": "0912"
}, {
  "id": 3008,
  "name": "子洲",
  "parent_id": 435,
  "k1": "z",
  "k2": "zz",
  "k3": "zizhou",
  "k4": "",
  "k5": "县",
  "k6": 610831,
  "k7": "0912"
}, {
  "id": 3009,
  "name": "汉滨",
  "parent_id": 436,
  "k1": "h",
  "k2": "hb",
  "k3": "hanbin",
  "k4": "",
  "k5": "区",
  "k6": 610902,
  "k7": "0915"
}, {
  "id": 3010,
  "name": "汉阴",
  "parent_id": 436,
  "k1": "h",
  "k2": "hy",
  "k3": "hanyin",
  "k4": "",
  "k5": "县",
  "k6": 610921,
  "k7": "0915"
}, {
  "id": 3011,
  "name": "石泉",
  "parent_id": 436,
  "k1": "s",
  "k2": "sq",
  "k3": "shiquan",
  "k4": "",
  "k5": "县",
  "k6": 610922,
  "k7": "0915"
}, {
  "id": 3012,
  "name": "宁陕",
  "parent_id": 436,
  "k1": "n",
  "k2": "ns",
  "k3": "ningshan",
  "k4": "",
  "k5": "县",
  "k6": 610923,
  "k7": "0915"
}, {
  "id": 3013,
  "name": "紫阳",
  "parent_id": 436,
  "k1": "z",
  "k2": "zy",
  "k3": "ziyang",
  "k4": "",
  "k5": "县",
  "k6": 610924,
  "k7": "0915"
}, {
  "id": 3014,
  "name": "岚皋",
  "parent_id": 436,
  "k1": "l",
  "k2": "lg",
  "k3": "langao",
  "k4": "",
  "k5": "县",
  "k6": 610925,
  "k7": "0915"
}, {
  "id": 3015,
  "name": "平利",
  "parent_id": 436,
  "k1": "p",
  "k2": "pl",
  "k3": "pingli",
  "k4": "",
  "k5": "县",
  "k6": 610926,
  "k7": "0915"
}, {
  "id": 3016,
  "name": "镇坪",
  "parent_id": 436,
  "k1": "z",
  "k2": "zp",
  "k3": "zhenping",
  "k4": "",
  "k5": "县",
  "k6": 610927,
  "k7": "0915"
}, {
  "id": 3017,
  "name": "旬阳",
  "parent_id": 436,
  "k1": "x",
  "k2": "xy",
  "k3": "xunyang",
  "k4": "",
  "k5": "县",
  "k6": 610928,
  "k7": "0915"
}, {
  "id": 3018,
  "name": "白河",
  "parent_id": 436,
  "k1": "b",
  "k2": "bh",
  "k3": "baihe",
  "k4": "",
  "k5": "县",
  "k6": 610929,
  "k7": "0915"
}, {
  "id": 3019,
  "name": "商州",
  "parent_id": 437,
  "k1": "s",
  "k2": "sz",
  "k3": "shangzhou",
  "k4": "",
  "k5": "区",
  "k6": 611002,
  "k7": "0914"
}, {
  "id": 3020,
  "name": "洛南",
  "parent_id": 437,
  "k1": "l",
  "k2": "ln",
  "k3": "luonan",
  "k4": "",
  "k5": "县",
  "k6": 611021,
  "k7": "0914"
}, {
  "id": 3021,
  "name": "丹凤",
  "parent_id": 437,
  "k1": "d",
  "k2": "df",
  "k3": "danfeng",
  "k4": "",
  "k5": "县",
  "k6": 611022,
  "k7": "0914"
}, {
  "id": 3022,
  "name": "商南",
  "parent_id": 437,
  "k1": "s",
  "k2": "sn",
  "k3": "shangnan",
  "k4": "",
  "k5": "县",
  "k6": 611023,
  "k7": "0914"
}, {
  "id": 3023,
  "name": "山阳",
  "parent_id": 437,
  "k1": "s",
  "k2": "sy",
  "k3": "shanyang",
  "k4": "",
  "k5": "县",
  "k6": 611024,
  "k7": "0914"
}, {
  "id": 3024,
  "name": "镇安",
  "parent_id": 437,
  "k1": "z",
  "k2": "za",
  "k3": "zhenan",
  "k4": "",
  "k5": "县",
  "k6": 611025,
  "k7": "0914"
}, {
  "id": 3025,
  "name": "柞水",
  "parent_id": 437,
  "k1": "z",
  "k2": "zs",
  "k3": "zuoshui",
  "k4": "",
  "k5": "县",
  "k6": 611026,
  "k7": "0914"
}, {
  "id": 3026,
  "name": "城关",
  "parent_id": 438,
  "k1": "c",
  "k2": "cg",
  "k3": "chengguan",
  "k4": "",
  "k5": "区",
  "k6": 620102,
  "k7": "0931"
}, {
  "id": 3027,
  "name": "七里河",
  "parent_id": 438,
  "k1": "q",
  "k2": "qlh",
  "k3": "qilihe",
  "k4": "",
  "k5": "区",
  "k6": 620103,
  "k7": "0931"
}, {
  "id": 3028,
  "name": "西固",
  "parent_id": 438,
  "k1": "x",
  "k2": "xg",
  "k3": "xigu",
  "k4": "",
  "k5": "区",
  "k6": 620104,
  "k7": "0931"
}, {
  "id": 3029,
  "name": "安宁",
  "parent_id": 438,
  "k1": "a",
  "k2": "an",
  "k3": "anning",
  "k4": "",
  "k5": "区",
  "k6": 620105,
  "k7": "0931"
}, {
  "id": 3030,
  "name": "红古",
  "parent_id": 438,
  "k1": "h",
  "k2": "hg",
  "k3": "honggu",
  "k4": "",
  "k5": "区",
  "k6": 620111,
  "k7": "0931"
}, {
  "id": 3031,
  "name": "永登",
  "parent_id": 438,
  "k1": "y",
  "k2": "yd",
  "k3": "yongdeng",
  "k4": "",
  "k5": "县",
  "k6": 620121,
  "k7": "0931"
}, {
  "id": 3032,
  "name": "皋兰",
  "parent_id": 438,
  "k1": "g",
  "k2": "gl",
  "k3": "gaolan",
  "k4": "",
  "k5": "县",
  "k6": 620122,
  "k7": "0931"
}, {
  "id": 3033,
  "name": "榆中",
  "parent_id": 438,
  "k1": "y",
  "k2": "yz",
  "k3": "yuzhong",
  "k4": "",
  "k5": "县",
  "k6": 620123,
  "k7": "0931"
}, {
  "id": 3034,
  "name": "镜铁",
  "parent_id": 439,
  "k1": "j",
  "k2": "jt",
  "k3": "jingtie",
  "k4": "",
  "k5": "区",
  "k6": 620201,
  "k7": "0937"
}, {
  "id": 3035,
  "name": "长城",
  "parent_id": 439,
  "k1": "c",
  "k2": "cc",
  "k3": "changcheng",
  "k4": "",
  "k5": "区",
  "k6": 620201,
  "k7": "0937"
}, {
  "id": 3036,
  "name": "雄关",
  "parent_id": 439,
  "k1": "x",
  "k2": "xg",
  "k3": "xiongguan",
  "k4": "",
  "k5": "区",
  "k6": 620201,
  "k7": "0937"
}, {
  "id": 3037,
  "name": "金川",
  "parent_id": 440,
  "k1": "j",
  "k2": "jc",
  "k3": "jinchuan",
  "k4": "",
  "k5": "区",
  "k6": 620302,
  "k7": "0935"
}, {
  "id": 3038,
  "name": "永昌",
  "parent_id": 440,
  "k1": "y",
  "k2": "yc",
  "k3": "yongchang",
  "k4": "",
  "k5": "县",
  "k6": 620321,
  "k7": "0935"
}, {
  "id": 3039,
  "name": "白银",
  "parent_id": 441,
  "k1": "b",
  "k2": "by",
  "k3": "baiyin",
  "k4": "",
  "k5": "区",
  "k6": 620402,
  "k7": "0943"
}, {
  "id": 3040,
  "name": "平川",
  "parent_id": 441,
  "k1": "p",
  "k2": "pc",
  "k3": "pingchuan",
  "k4": "",
  "k5": "区",
  "k6": 620403,
  "k7": "0943"
}, {
  "id": 3041,
  "name": "靖远",
  "parent_id": 441,
  "k1": "j",
  "k2": "jy",
  "k3": "jingyuan",
  "k4": "",
  "k5": "县",
  "k6": 620421,
  "k7": "0943"
}, {
  "id": 3042,
  "name": "会宁",
  "parent_id": 441,
  "k1": "h",
  "k2": "hn",
  "k3": "huining",
  "k4": "",
  "k5": "县",
  "k6": 620422,
  "k7": "0943"
}, {
  "id": 3043,
  "name": "景泰",
  "parent_id": 441,
  "k1": "j",
  "k2": "jt",
  "k3": "jingtai",
  "k4": "",
  "k5": "县",
  "k6": 620423,
  "k7": "0943"
}, {
  "id": 3044,
  "name": "秦州",
  "parent_id": 442,
  "k1": "q",
  "k2": "qz",
  "k3": "qinzhou",
  "k4": "",
  "k5": "区",
  "k6": 620502,
  "k7": "0938"
}, {
  "id": 3045,
  "name": "麦积",
  "parent_id": 442,
  "k1": "m",
  "k2": "mj",
  "k3": "maiji",
  "k4": "",
  "k5": "区",
  "k6": 620503,
  "k7": "0938"
}, {
  "id": 3046,
  "name": "清水",
  "parent_id": 442,
  "k1": "q",
  "k2": "qs",
  "k3": "qingshui",
  "k4": "",
  "k5": "县",
  "k6": 620521,
  "k7": "0938"
}, {
  "id": 3047,
  "name": "秦安",
  "parent_id": 442,
  "k1": "q",
  "k2": "qa",
  "k3": "qinan",
  "k4": "",
  "k5": "县",
  "k6": 620522,
  "k7": "0938"
}, {
  "id": 3048,
  "name": "甘谷",
  "parent_id": 442,
  "k1": "g",
  "k2": "gg",
  "k3": "gangu",
  "k4": "",
  "k5": "县",
  "k6": 620523,
  "k7": "0938"
}, {
  "id": 3049,
  "name": "武山",
  "parent_id": 442,
  "k1": "w",
  "k2": "ws",
  "k3": "wushan",
  "k4": "",
  "k5": "县",
  "k6": 620524,
  "k7": "0938"
}, {
  "id": 3050,
  "name": "张家川",
  "parent_id": 442,
  "k1": "z",
  "k2": "zjc",
  "k3": "zhangjiachuan",
  "k4": "回族",
  "k5": "自治县",
  "k6": 620525,
  "k7": "0938"
}, {
  "id": 3051,
  "name": "凉州",
  "parent_id": 443,
  "k1": "l",
  "k2": "lz",
  "k3": "liangzhou",
  "k4": "",
  "k5": "区",
  "k6": 620602,
  "k7": "0935"
}, {
  "id": 3052,
  "name": "民勤",
  "parent_id": 443,
  "k1": "m",
  "k2": "mq",
  "k3": "minqin",
  "k4": "",
  "k5": "县",
  "k6": 620621,
  "k7": "0935"
}, {
  "id": 3053,
  "name": "古浪",
  "parent_id": 443,
  "k1": "g",
  "k2": "gl",
  "k3": "gulang",
  "k4": "",
  "k5": "县",
  "k6": 620622,
  "k7": "0935"
}, {
  "id": 3054,
  "name": "天祝",
  "parent_id": 443,
  "k1": "t",
  "k2": "tz",
  "k3": "tianzhu",
  "k4": "藏族",
  "k5": "自治县",
  "k6": 620623,
  "k7": "0935"
}, {
  "id": 3055,
  "name": "甘州",
  "parent_id": 444,
  "k1": "g",
  "k2": "gz",
  "k3": "ganzhou",
  "k4": "",
  "k5": "区",
  "k6": 620702,
  "k7": "0936"
}, {
  "id": 3056,
  "name": "肃南",
  "parent_id": 444,
  "k1": "s",
  "k2": "sn",
  "k3": "sunan",
  "k4": "裕固族",
  "k5": "自治县",
  "k6": 620721,
  "k7": "0936"
}, {
  "id": 3057,
  "name": "民乐",
  "parent_id": 444,
  "k1": "m",
  "k2": "ml",
  "k3": "minle",
  "k4": "",
  "k5": "县",
  "k6": 620722,
  "k7": "0936"
}, {
  "id": 3058,
  "name": "临泽",
  "parent_id": 444,
  "k1": "l",
  "k2": "lz",
  "k3": "linze",
  "k4": "",
  "k5": "县",
  "k6": 620723,
  "k7": "0936"
}, {
  "id": 3059,
  "name": "高台",
  "parent_id": 444,
  "k1": "g",
  "k2": "gt",
  "k3": "gaotai",
  "k4": "",
  "k5": "县",
  "k6": 620724,
  "k7": "0936"
}, {
  "id": 3060,
  "name": "山丹",
  "parent_id": 444,
  "k1": "s",
  "k2": "sd",
  "k3": "shandan",
  "k4": "",
  "k5": "县",
  "k6": 620725,
  "k7": "0936"
}, {
  "id": 3061,
  "name": "崆峒",
  "parent_id": 445,
  "k1": "k",
  "k2": "kt",
  "k3": "kongtong",
  "k4": "",
  "k5": "区",
  "k6": 620802,
  "k7": "0933"
}, {
  "id": 3062,
  "name": "泾川",
  "parent_id": 445,
  "k1": "j",
  "k2": "jc",
  "k3": "jingchuan",
  "k4": "",
  "k5": "县",
  "k6": 620821,
  "k7": "0933"
}, {
  "id": 3063,
  "name": "灵台",
  "parent_id": 445,
  "k1": "l",
  "k2": "lt",
  "k3": "lingtai",
  "k4": "",
  "k5": "县",
  "k6": 620822,
  "k7": "0933"
}, {
  "id": 3064,
  "name": "崇信",
  "parent_id": 445,
  "k1": "c",
  "k2": "cx",
  "k3": "chongxin",
  "k4": "",
  "k5": "县",
  "k6": 620823,
  "k7": "0933"
}, {
  "id": 3065,
  "name": "华亭",
  "parent_id": 445,
  "k1": "h",
  "k2": "ht",
  "k3": "huating",
  "k4": "",
  "k5": "市",
  "k6": 620881,
  "k7": "0933"
}, {
  "id": 3066,
  "name": "庄浪",
  "parent_id": 445,
  "k1": "z",
  "k2": "zl",
  "k3": "zhuanglang",
  "k4": "",
  "k5": "县",
  "k6": 620825,
  "k7": "0933"
}, {
  "id": 3067,
  "name": "静宁",
  "parent_id": 445,
  "k1": "j",
  "k2": "jn",
  "k3": "jingning",
  "k4": "",
  "k5": "县",
  "k6": 620826,
  "k7": "0933"
}, {
  "id": 3068,
  "name": "肃州",
  "parent_id": 446,
  "k1": "s",
  "k2": "sz",
  "k3": "suzhou",
  "k4": "",
  "k5": "区",
  "k6": 620902,
  "k7": "0937"
}, {
  "id": 3069,
  "name": "金塔",
  "parent_id": 446,
  "k1": "j",
  "k2": "jt",
  "k3": "jinta",
  "k4": "",
  "k5": "县",
  "k6": 620921,
  "k7": "0937"
}, {
  "id": 3070,
  "name": "瓜州",
  "parent_id": 446,
  "k1": "g",
  "k2": "gz",
  "k3": "guazhou",
  "k4": "",
  "k5": "县",
  "k6": 620922,
  "k7": "0937"
}, {
  "id": 3071,
  "name": "肃北",
  "parent_id": 446,
  "k1": "s",
  "k2": "sb",
  "k3": "subei",
  "k4": "蒙古族",
  "k5": "自治县",
  "k6": 620923,
  "k7": "0937"
}, {
  "id": 3072,
  "name": "阿克塞",
  "parent_id": 446,
  "k1": "a",
  "k2": "aks",
  "k3": "akesai",
  "k4": "哈萨克族",
  "k5": "自治县",
  "k6": 620924,
  "k7": "0937"
}, {
  "id": 3073,
  "name": "玉门",
  "parent_id": 446,
  "k1": "y",
  "k2": "ym",
  "k3": "yumen",
  "k4": "",
  "k5": "市",
  "k6": 620981,
  "k7": "0937"
}, {
  "id": 3074,
  "name": "敦煌",
  "parent_id": 446,
  "k1": "d",
  "k2": "dh",
  "k3": "dunhuang",
  "k4": "",
  "k5": "市",
  "k6": 620982,
  "k7": "0937"
}, {
  "id": 3075,
  "name": "西峰",
  "parent_id": 447,
  "k1": "x",
  "k2": "xf",
  "k3": "xifeng",
  "k4": "",
  "k5": "区",
  "k6": 621002,
  "k7": "0934"
}, {
  "id": 3076,
  "name": "庆城",
  "parent_id": 447,
  "k1": "q",
  "k2": "qc",
  "k3": "qingcheng",
  "k4": "",
  "k5": "县",
  "k6": 621021,
  "k7": "0934"
}, {
  "id": 3077,
  "name": "环县",
  "parent_id": 447,
  "k1": "h",
  "k2": "hx",
  "k3": "huanxian",
  "k4": "",
  "k5": "",
  "k6": 621022,
  "k7": "0934"
}, {
  "id": 3078,
  "name": "华池",
  "parent_id": 447,
  "k1": "h",
  "k2": "hc",
  "k3": "huachi",
  "k4": "",
  "k5": "县",
  "k6": 621023,
  "k7": "0934"
}, {
  "id": 3079,
  "name": "合水",
  "parent_id": 447,
  "k1": "h",
  "k2": "hs",
  "k3": "heshui",
  "k4": "",
  "k5": "县",
  "k6": 621024,
  "k7": "0934"
}, {
  "id": 3080,
  "name": "正宁",
  "parent_id": 447,
  "k1": "z",
  "k2": "zn",
  "k3": "zhengning",
  "k4": "",
  "k5": "县",
  "k6": 621025,
  "k7": "0934"
}, {
  "id": 3081,
  "name": "宁县",
  "parent_id": 447,
  "k1": "n",
  "k2": "nx",
  "k3": "ningxian",
  "k4": "",
  "k5": "",
  "k6": 621026,
  "k7": "0934"
}, {
  "id": 3082,
  "name": "镇原",
  "parent_id": 447,
  "k1": "z",
  "k2": "zy",
  "k3": "zhenyuan",
  "k4": "",
  "k5": "县",
  "k6": 621027,
  "k7": "0934"
}, {
  "id": 3083,
  "name": "安定",
  "parent_id": 448,
  "k1": "a",
  "k2": "ad",
  "k3": "anding",
  "k4": "",
  "k5": "区",
  "k6": 621102,
  "k7": "0932"
}, {
  "id": 3084,
  "name": "通渭",
  "parent_id": 448,
  "k1": "t",
  "k2": "tw",
  "k3": "tongwei",
  "k4": "",
  "k5": "县",
  "k6": 621121,
  "k7": "0932"
}, {
  "id": 3085,
  "name": "陇西",
  "parent_id": 448,
  "k1": "l",
  "k2": "lx",
  "k3": "longxi",
  "k4": "",
  "k5": "县",
  "k6": 621122,
  "k7": "0932"
}, {
  "id": 3086,
  "name": "渭源",
  "parent_id": 448,
  "k1": "w",
  "k2": "wy",
  "k3": "weiyuan",
  "k4": "",
  "k5": "县",
  "k6": 621123,
  "k7": "0932"
}, {
  "id": 3087,
  "name": "临洮",
  "parent_id": 448,
  "k1": "l",
  "k2": "lt",
  "k3": "lintao",
  "k4": "",
  "k5": "县",
  "k6": 621124,
  "k7": "0932"
}, {
  "id": 3088,
  "name": "漳县",
  "parent_id": 448,
  "k1": "z",
  "k2": "zx",
  "k3": "zhangxian",
  "k4": "",
  "k5": "",
  "k6": 621125,
  "k7": "0932"
}, {
  "id": 3089,
  "name": "岷县",
  "parent_id": 448,
  "k1": "m",
  "k2": "mx",
  "k3": "minxian",
  "k4": "",
  "k5": "",
  "k6": 621126,
  "k7": "0932"
}, {
  "id": 3090,
  "name": "武都",
  "parent_id": 449,
  "k1": "w",
  "k2": "wd",
  "k3": "wudu",
  "k4": "",
  "k5": "区",
  "k6": 621202,
  "k7": "0939"
}, {
  "id": 3091,
  "name": "成县",
  "parent_id": 449,
  "k1": "c",
  "k2": "cx",
  "k3": "chengxian",
  "k4": "",
  "k5": "",
  "k6": 621221,
  "k7": "0939"
}, {
  "id": 3092,
  "name": "文县",
  "parent_id": 449,
  "k1": "w",
  "k2": "wx",
  "k3": "wenxian",
  "k4": "",
  "k5": "",
  "k6": 621222,
  "k7": "0939"
}, {
  "id": 3093,
  "name": "宕昌",
  "parent_id": 449,
  "k1": "d",
  "k2": "dc",
  "k3": "dangchang",
  "k4": "",
  "k5": "县",
  "k6": 621223,
  "k7": "0939"
}, {
  "id": 3094,
  "name": "康县",
  "parent_id": 449,
  "k1": "k",
  "k2": "kx",
  "k3": "kangxian",
  "k4": "",
  "k5": "",
  "k6": 621224,
  "k7": "0939"
}, {
  "id": 3095,
  "name": "西和",
  "parent_id": 449,
  "k1": "x",
  "k2": "xh",
  "k3": "xihe",
  "k4": "",
  "k5": "县",
  "k6": 621225,
  "k7": "0939"
}, {
  "id": 3096,
  "name": "礼县",
  "parent_id": 449,
  "k1": "l",
  "k2": "lx",
  "k3": "lixian",
  "k4": "",
  "k5": "",
  "k6": 621226,
  "k7": "0939"
}, {
  "id": 3097,
  "name": "徽县",
  "parent_id": 449,
  "k1": "h",
  "k2": "hx",
  "k3": "huixian",
  "k4": "",
  "k5": "",
  "k6": 621227,
  "k7": "0939"
}, {
  "id": 3098,
  "name": "两当",
  "parent_id": 449,
  "k1": "l",
  "k2": "ld",
  "k3": "liangdang",
  "k4": "",
  "k5": "县",
  "k6": 621228,
  "k7": "0939"
}, {
  "id": 3099,
  "name": "临夏",
  "parent_id": 450,
  "k1": "l",
  "k2": "lx",
  "k3": "linxia",
  "k4": "",
  "k5": "市",
  "k6": 622901,
  "k7": "0930"
}, {
  "id": 3100,
  "name": "临夏",
  "parent_id": 450,
  "k1": "l",
  "k2": "lx",
  "k3": "linxia",
  "k4": "",
  "k5": "县",
  "k6": 622921,
  "k7": "0930"
}, {
  "id": 3101,
  "name": "康乐",
  "parent_id": 450,
  "k1": "k",
  "k2": "kl",
  "k3": "kangle",
  "k4": "",
  "k5": "县",
  "k6": 622922,
  "k7": "0930"
}, {
  "id": 3102,
  "name": "永靖",
  "parent_id": 450,
  "k1": "y",
  "k2": "yj",
  "k3": "yongjing",
  "k4": "",
  "k5": "县",
  "k6": 622923,
  "k7": "0930"
}, {
  "id": 3103,
  "name": "广河",
  "parent_id": 450,
  "k1": "g",
  "k2": "gh",
  "k3": "guanghe",
  "k4": "",
  "k5": "县",
  "k6": 622924,
  "k7": "0930"
}, {
  "id": 3104,
  "name": "和政",
  "parent_id": 450,
  "k1": "h",
  "k2": "hz",
  "k3": "hezheng",
  "k4": "",
  "k5": "县",
  "k6": 622925,
  "k7": "0930"
}, {
  "id": 3105,
  "name": "东乡族",
  "parent_id": 450,
  "k1": "d",
  "k2": "dxz",
  "k3": "dongxiangzu",
  "k4": "",
  "k5": "自治县",
  "k6": 622926,
  "k7": "0930"
}, {
  "id": 3106,
  "name": "积石山",
  "parent_id": 450,
  "k1": "j",
  "k2": "jss",
  "k3": "jishishan",
  "k4": "保安族东乡族撒拉族",
  "k5": "自治县",
  "k6": 622927,
  "k7": "0930"
}, {
  "id": 3107,
  "name": "合作",
  "parent_id": 451,
  "k1": "h",
  "k2": "hz",
  "k3": "hezuo",
  "k4": "",
  "k5": "市",
  "k6": 623001,
  "k7": "0941"
}, {
  "id": 3108,
  "name": "临潭",
  "parent_id": 451,
  "k1": "l",
  "k2": "lt",
  "k3": "lintan",
  "k4": "",
  "k5": "县",
  "k6": 623021,
  "k7": "0941"
}, {
  "id": 3109,
  "name": "卓尼",
  "parent_id": 451,
  "k1": "z",
  "k2": "zn",
  "k3": "zhuoni",
  "k4": "",
  "k5": "县",
  "k6": 623022,
  "k7": "0941"
}, {
  "id": 3110,
  "name": "舟曲",
  "parent_id": 451,
  "k1": "z",
  "k2": "zq",
  "k3": "zhouqu",
  "k4": "",
  "k5": "县",
  "k6": 623023,
  "k7": "0941"
}, {
  "id": 3111,
  "name": "迭部",
  "parent_id": 451,
  "k1": "d",
  "k2": "db",
  "k3": "diebu",
  "k4": "",
  "k5": "县",
  "k6": 623024,
  "k7": "0941"
}, {
  "id": 3112,
  "name": "玛曲",
  "parent_id": 451,
  "k1": "m",
  "k2": "mq",
  "k3": "maqu",
  "k4": "",
  "k5": "县",
  "k6": 623025,
  "k7": "0941"
}, {
  "id": 3113,
  "name": "碌曲",
  "parent_id": 451,
  "k1": "l",
  "k2": "lq",
  "k3": "liuqu",
  "k4": "",
  "k5": "县",
  "k6": 623026,
  "k7": "0941"
}, {
  "id": 3114,
  "name": "夏河",
  "parent_id": 451,
  "k1": "x",
  "k2": "xh",
  "k3": "xiahe",
  "k4": "",
  "k5": "县",
  "k6": 623027,
  "k7": "0941"
}, {
  "id": 3115,
  "name": "城东",
  "parent_id": 452,
  "k1": "c",
  "k2": "cd",
  "k3": "chengdong",
  "k4": "",
  "k5": "区",
  "k6": 630102,
  "k7": "0971"
}, {
  "id": 3116,
  "name": "城中",
  "parent_id": 452,
  "k1": "c",
  "k2": "cz",
  "k3": "chengzhong",
  "k4": "",
  "k5": "区",
  "k6": 630103,
  "k7": "0971"
}, {
  "id": 3117,
  "name": "城西",
  "parent_id": 452,
  "k1": "c",
  "k2": "cx",
  "k3": "chengxi",
  "k4": "",
  "k5": "区",
  "k6": 630104,
  "k7": "0971"
}, {
  "id": 3118,
  "name": "城北",
  "parent_id": 452,
  "k1": "c",
  "k2": "cb",
  "k3": "chengbei",
  "k4": "",
  "k5": "区",
  "k6": 630105,
  "k7": "0971"
}, {
  "id": 3119,
  "name": "大通",
  "parent_id": 452,
  "k1": "d",
  "k2": "dt",
  "k3": "datong",
  "k4": "回族土族",
  "k5": "自治县",
  "k6": 630121,
  "k7": "0971"
}, {
  "id": 3120,
  "name": "湟中",
  "parent_id": 452,
  "k1": "h",
  "k2": "hz",
  "k3": "huangzhong",
  "k4": "",
  "k5": "县",
  "k6": 630122,
  "k7": "0971"
}, {
  "id": 3121,
  "name": "湟源",
  "parent_id": 452,
  "k1": "h",
  "k2": "hy",
  "k3": "huangyuan",
  "k4": "",
  "k5": "县",
  "k6": 630123,
  "k7": "0971"
}, {
  "id": 3122,
  "name": "乐都",
  "parent_id": 453,
  "k1": "l",
  "k2": "ld",
  "k3": "ledu",
  "k4": "",
  "k5": "区",
  "k6": 630202,
  "k7": "0972"
}, {
  "id": 3123,
  "name": "平安",
  "parent_id": 453,
  "k1": "p",
  "k2": "pa",
  "k3": "pingan",
  "k4": "",
  "k5": "区",
  "k6": 632121,
  "k7": "0972"
}, {
  "id": 3124,
  "name": "民和",
  "parent_id": 453,
  "k1": "m",
  "k2": "mh",
  "k3": "minhe",
  "k4": "回族土族",
  "k5": "自治县",
  "k6": 632122,
  "k7": "0972"
}, {
  "id": 3125,
  "name": "互助",
  "parent_id": 453,
  "k1": "h",
  "k2": "hz",
  "k3": "huzhu",
  "k4": "土族",
  "k5": "自治县",
  "k6": 632126,
  "k7": "0972"
}, {
  "id": 3126,
  "name": "化隆",
  "parent_id": 453,
  "k1": "h",
  "k2": "hl",
  "k3": "hualong",
  "k4": "回族",
  "k5": "自治县",
  "k6": 632127,
  "k7": "0972"
}, {
  "id": 3127,
  "name": "循化",
  "parent_id": 453,
  "k1": "x",
  "k2": "xh",
  "k3": "xunhua",
  "k4": "撒拉族",
  "k5": "自治县",
  "k6": 632128,
  "k7": "0972"
}, {
  "id": 3128,
  "name": "门源",
  "parent_id": 454,
  "k1": "m",
  "k2": "my",
  "k3": "menyuan",
  "k4": "回族",
  "k5": "自治县",
  "k6": 632221,
  "k7": "0970"
}, {
  "id": 3129,
  "name": "祁连",
  "parent_id": 454,
  "k1": "q",
  "k2": "ql",
  "k3": "qilian",
  "k4": "",
  "k5": "县",
  "k6": 632222,
  "k7": "0970"
}, {
  "id": 3130,
  "name": "海晏",
  "parent_id": 454,
  "k1": "h",
  "k2": "hy",
  "k3": "haiyan",
  "k4": "",
  "k5": "县",
  "k6": 632223,
  "k7": "0970"
}, {
  "id": 3131,
  "name": "刚察",
  "parent_id": 454,
  "k1": "g",
  "k2": "gc",
  "k3": "gangcha",
  "k4": "",
  "k5": "县",
  "k6": 632224,
  "k7": "0970"
}, {
  "id": 3132,
  "name": "同仁",
  "parent_id": 455,
  "k1": "t",
  "k2": "tr",
  "k3": "tongren",
  "k4": "",
  "k5": "县",
  "k6": 632321,
  "k7": "0973"
}, {
  "id": 3133,
  "name": "尖扎",
  "parent_id": 455,
  "k1": "j",
  "k2": "jz",
  "k3": "jianzha",
  "k4": "",
  "k5": "县",
  "k6": 632322,
  "k7": "0973"
}, {
  "id": 3134,
  "name": "泽库",
  "parent_id": 455,
  "k1": "z",
  "k2": "zk",
  "k3": "zeku",
  "k4": "",
  "k5": "县",
  "k6": 632323,
  "k7": "0973"
}, {
  "id": 3135,
  "name": "河南",
  "parent_id": 455,
  "k1": "h",
  "k2": "hn",
  "k3": "henan",
  "k4": "蒙古族",
  "k5": "自治县",
  "k6": 632324,
  "k7": "0973"
}, {
  "id": 3136,
  "name": "共和",
  "parent_id": 456,
  "k1": "g",
  "k2": "gh",
  "k3": "gonghe",
  "k4": "",
  "k5": "县",
  "k6": 632521,
  "k7": "0974"
}, {
  "id": 3137,
  "name": "同德",
  "parent_id": 456,
  "k1": "t",
  "k2": "td",
  "k3": "tongde",
  "k4": "",
  "k5": "县",
  "k6": 632522,
  "k7": "0974"
}, {
  "id": 3138,
  "name": "贵德",
  "parent_id": 456,
  "k1": "g",
  "k2": "gd",
  "k3": "guide",
  "k4": "",
  "k5": "县",
  "k6": 632523,
  "k7": "0974"
}, {
  "id": 3139,
  "name": "兴海",
  "parent_id": 456,
  "k1": "x",
  "k2": "xh",
  "k3": "xinghai",
  "k4": "",
  "k5": "县",
  "k6": 632524,
  "k7": "0974"
}, {
  "id": 3140,
  "name": "贵南",
  "parent_id": 456,
  "k1": "g",
  "k2": "gn",
  "k3": "guinan",
  "k4": "",
  "k5": "县",
  "k6": 632525,
  "k7": "0974"
}, {
  "id": 3141,
  "name": "玛沁",
  "parent_id": 457,
  "k1": "m",
  "k2": "mq",
  "k3": "maqin",
  "k4": "",
  "k5": "县",
  "k6": 632621,
  "k7": "0975"
}, {
  "id": 3142,
  "name": "班玛",
  "parent_id": 457,
  "k1": "b",
  "k2": "bm",
  "k3": "banma",
  "k4": "",
  "k5": "县",
  "k6": 632622,
  "k7": "0975"
}, {
  "id": 3143,
  "name": "甘德",
  "parent_id": 457,
  "k1": "g",
  "k2": "gd",
  "k3": "gande",
  "k4": "",
  "k5": "县",
  "k6": 632623,
  "k7": "0975"
}, {
  "id": 3144,
  "name": "达日",
  "parent_id": 457,
  "k1": "d",
  "k2": "dr",
  "k3": "dari",
  "k4": "",
  "k5": "县",
  "k6": 632624,
  "k7": "0975"
}, {
  "id": 3145,
  "name": "久治",
  "parent_id": 457,
  "k1": "j",
  "k2": "jz",
  "k3": "jiuzhi",
  "k4": "",
  "k5": "县",
  "k6": 632625,
  "k7": "0975"
}, {
  "id": 3146,
  "name": "玛多",
  "parent_id": 457,
  "k1": "m",
  "k2": "md",
  "k3": "maduo",
  "k4": "",
  "k5": "县",
  "k6": 632626,
  "k7": "0975"
}, {
  "id": 3147,
  "name": "玉树",
  "parent_id": 458,
  "k1": "y",
  "k2": "ys",
  "k3": "yushu",
  "k4": "",
  "k5": "市",
  "k6": 632721,
  "k7": "0976"
}, {
  "id": 3148,
  "name": "杂多",
  "parent_id": 458,
  "k1": "z",
  "k2": "zd",
  "k3": "zaduo",
  "k4": "",
  "k5": "县",
  "k6": 632722,
  "k7": "0976"
}, {
  "id": 3149,
  "name": "治多",
  "parent_id": 458,
  "k1": "z",
  "k2": "zd",
  "k3": "zhiduo",
  "k4": "",
  "k5": "县",
  "k6": 632724,
  "k7": "0976"
}, {
  "id": 3150,
  "name": "囊谦",
  "parent_id": 458,
  "k1": "n",
  "k2": "nq",
  "k3": "nangqian",
  "k4": "",
  "k5": "县",
  "k6": 632725,
  "k7": "0976"
}, {
  "id": 3151,
  "name": "曲麻莱",
  "parent_id": 458,
  "k1": "q",
  "k2": "qml",
  "k3": "qumalai",
  "k4": "",
  "k5": "县",
  "k6": 632726,
  "k7": "0976"
}, {
  "id": 3154,
  "name": "茫崖",
  "parent_id": 459,
  "k1": "m",
  "k2": "my",
  "k3": "mangya",
  "k4": "",
  "k5": "市",
  "k6": 632803,
  "k7": "0977"
}, {
  "id": 3155,
  "name": "格尔木",
  "parent_id": 459,
  "k1": "g",
  "k2": "gem",
  "k3": "geermu",
  "k4": "",
  "k5": "市",
  "k6": 632801,
  "k7": "0977"
}, {
  "id": 3156,
  "name": "德令哈",
  "parent_id": 459,
  "k1": "d",
  "k2": "dlh",
  "k3": "delingha",
  "k4": "",
  "k5": "市",
  "k6": 632802,
  "k7": "0977"
}, {
  "id": 3157,
  "name": "乌兰",
  "parent_id": 459,
  "k1": "w",
  "k2": "wl",
  "k3": "wulan",
  "k4": "",
  "k5": "县",
  "k6": 632821,
  "k7": "0977"
}, {
  "id": 3158,
  "name": "都兰",
  "parent_id": 459,
  "k1": "d",
  "k2": "dl",
  "k3": "dulan",
  "k4": "",
  "k5": "县",
  "k6": 632822,
  "k7": "0977"
}, {
  "id": 3159,
  "name": "天峻",
  "parent_id": 459,
  "k1": "t",
  "k2": "tj",
  "k3": "tianjun",
  "k4": "",
  "k5": "县",
  "k6": 632823,
  "k7": "0977"
}, {
  "id": 3160,
  "name": "兴庆",
  "parent_id": 460,
  "k1": "x",
  "k2": "xq",
  "k3": "xingqing",
  "k4": "",
  "k5": "区",
  "k6": 640104,
  "k7": "0951"
}, {
  "id": 3161,
  "name": "西夏",
  "parent_id": 460,
  "k1": "x",
  "k2": "xx",
  "k3": "xixia",
  "k4": "",
  "k5": "区",
  "k6": 640105,
  "k7": "0951"
}, {
  "id": 3162,
  "name": "金凤",
  "parent_id": 460,
  "k1": "j",
  "k2": "jf",
  "k3": "jinfeng",
  "k4": "",
  "k5": "区",
  "k6": 640106,
  "k7": "0951"
}, {
  "id": 3163,
  "name": "永宁",
  "parent_id": 460,
  "k1": "y",
  "k2": "yn",
  "k3": "yongning",
  "k4": "",
  "k5": "县",
  "k6": 640121,
  "k7": "0951"
}, {
  "id": 3164,
  "name": "贺兰",
  "parent_id": 460,
  "k1": "h",
  "k2": "hl",
  "k3": "helan",
  "k4": "",
  "k5": "县",
  "k6": 640122,
  "k7": "0951"
}, {
  "id": 3165,
  "name": "灵武",
  "parent_id": 460,
  "k1": "l",
  "k2": "lw",
  "k3": "lingwu",
  "k4": "",
  "k5": "市",
  "k6": 640181,
  "k7": "0951"
}, {
  "id": 3166,
  "name": "大武口",
  "parent_id": 461,
  "k1": "d",
  "k2": "dwk",
  "k3": "dawukou",
  "k4": "",
  "k5": "区",
  "k6": 640202,
  "k7": "0952"
}, {
  "id": 3167,
  "name": "惠农",
  "parent_id": 461,
  "k1": "h",
  "k2": "hn",
  "k3": "huinong",
  "k4": "",
  "k5": "区",
  "k6": 640205,
  "k7": "0952"
}, {
  "id": 3168,
  "name": "平罗",
  "parent_id": 461,
  "k1": "p",
  "k2": "pl",
  "k3": "pingluo",
  "k4": "",
  "k5": "县",
  "k6": 640221,
  "k7": "0952"
}, {
  "id": 3169,
  "name": "红寺堡",
  "parent_id": 462,
  "k1": "h",
  "k2": "hsb",
  "k3": "hongsibao",
  "k4": "",
  "k5": "区",
  "k6": "",
  "k7": "0953"
}, {
  "id": 3170,
  "name": "利通",
  "parent_id": 462,
  "k1": "l",
  "k2": "lt",
  "k3": "litong",
  "k4": "",
  "k5": "区",
  "k6": 640302,
  "k7": "0953"
}, {
  "id": 3171,
  "name": "盐池",
  "parent_id": 462,
  "k1": "y",
  "k2": "yc",
  "k3": "yanchi",
  "k4": "",
  "k5": "县",
  "k6": 640323,
  "k7": "0953"
}, {
  "id": 3172,
  "name": "同心",
  "parent_id": 462,
  "k1": "t",
  "k2": "tx",
  "k3": "tongxin",
  "k4": "",
  "k5": "县",
  "k6": 640324,
  "k7": "0953"
}, {
  "id": 3173,
  "name": "青铜峡",
  "parent_id": 462,
  "k1": "q",
  "k2": "qtx",
  "k3": "qingtongxia",
  "k4": "",
  "k5": "市",
  "k6": 640381,
  "k7": "0953"
}, {
  "id": 3174,
  "name": "原州",
  "parent_id": 463,
  "k1": "y",
  "k2": "yz",
  "k3": "yuanzhou",
  "k4": "",
  "k5": "区",
  "k6": 640402,
  "k7": "0954"
}, {
  "id": 3175,
  "name": "西吉",
  "parent_id": 463,
  "k1": "x",
  "k2": "xj",
  "k3": "xiji",
  "k4": "",
  "k5": "县",
  "k6": 640422,
  "k7": "0954"
}, {
  "id": 3176,
  "name": "隆德",
  "parent_id": 463,
  "k1": "l",
  "k2": "ld",
  "k3": "longde",
  "k4": "",
  "k5": "县",
  "k6": 640423,
  "k7": "0954"
}, {
  "id": 3177,
  "name": "泾源",
  "parent_id": 463,
  "k1": "j",
  "k2": "jy",
  "k3": "jingyuan",
  "k4": "",
  "k5": "县",
  "k6": 640424,
  "k7": "0954"
}, {
  "id": 3178,
  "name": "彭阳",
  "parent_id": 463,
  "k1": "p",
  "k2": "py",
  "k3": "pengyang",
  "k4": "",
  "k5": "县",
  "k6": 640425,
  "k7": "0954"
}, {
  "id": 3179,
  "name": "沙坡头",
  "parent_id": 464,
  "k1": "s",
  "k2": "spt",
  "k3": "shapotou",
  "k4": "",
  "k5": "区",
  "k6": 640502,
  "k7": ""
}, {
  "id": 3180,
  "name": "中宁",
  "parent_id": 464,
  "k1": "z",
  "k2": "zn",
  "k3": "zhongning",
  "k4": "",
  "k5": "县",
  "k6": 640521,
  "k7": ""
}, {
  "id": 3181,
  "name": "海原",
  "parent_id": 464,
  "k1": "h",
  "k2": "hy",
  "k3": "haiyuan",
  "k4": "",
  "k5": "县",
  "k6": 640522,
  "k7": ""
}, {
  "id": 3182,
  "name": "天山",
  "parent_id": 465,
  "k1": "t",
  "k2": "ts",
  "k3": "tianshan",
  "k4": "",
  "k5": "区",
  "k6": 650102,
  "k7": "0991"
}, {
  "id": 3183,
  "name": "沙依巴克",
  "parent_id": 465,
  "k1": "s",
  "k2": "sybk",
  "k3": "shayibake",
  "k4": "",
  "k5": "区",
  "k6": 650103,
  "k7": "0991"
}, {
  "id": 3184,
  "name": "新市",
  "parent_id": 465,
  "k1": "x",
  "k2": "xs",
  "k3": "xinshi",
  "k4": "",
  "k5": "区",
  "k6": 650104,
  "k7": "0991"
}, {
  "id": 3185,
  "name": "水磨沟",
  "parent_id": 465,
  "k1": "s",
  "k2": "smg",
  "k3": "shuimogou",
  "k4": "",
  "k5": "区",
  "k6": 650105,
  "k7": "0991"
}, {
  "id": 3186,
  "name": "头屯河",
  "parent_id": 465,
  "k1": "t",
  "k2": "tth",
  "k3": "toutunhe",
  "k4": "",
  "k5": "区",
  "k6": 650106,
  "k7": "0991"
}, {
  "id": 3187,
  "name": "达坂城",
  "parent_id": 465,
  "k1": "d",
  "k2": "dbc",
  "k3": "dabancheng",
  "k4": "",
  "k5": "区",
  "k6": 650107,
  "k7": "0991"
}, {
  "id": 3188,
  "name": "米东",
  "parent_id": 465,
  "k1": "m",
  "k2": "md",
  "k3": "midong",
  "k4": "",
  "k5": "区",
  "k6": 650109,
  "k7": "0991"
}, {
  "id": 3189,
  "name": "乌鲁木齐",
  "parent_id": 465,
  "k1": "w",
  "k2": "wlmq",
  "k3": "wulumuqi",
  "k4": "",
  "k5": "县",
  "k6": 650121,
  "k7": "0991"
}, {
  "id": 3190,
  "name": "独山子",
  "parent_id": 466,
  "k1": "d",
  "k2": "dsz",
  "k3": "dushanzi",
  "k4": "",
  "k5": "区",
  "k6": 650202,
  "k7": "0990"
}, {
  "id": 3191,
  "name": "克拉玛依",
  "parent_id": 466,
  "k1": "k",
  "k2": "klmy",
  "k3": "kelamayi",
  "k4": "",
  "k5": "区",
  "k6": 650203,
  "k7": "0990"
}, {
  "id": 3192,
  "name": "白碱滩",
  "parent_id": 466,
  "k1": "b",
  "k2": "bjt",
  "k3": "baijiantan",
  "k4": "",
  "k5": "区",
  "k6": 650204,
  "k7": "0990"
}, {
  "id": 3193,
  "name": "乌尔禾",
  "parent_id": 466,
  "k1": "w",
  "k2": "weh",
  "k3": "wuerhe",
  "k4": "",
  "k5": "区",
  "k6": 650205,
  "k7": "0990"
}, {
  "id": 3194,
  "name": "高昌",
  "parent_id": 467,
  "k1": "g",
  "k2": "gc",
  "k3": "gaochang",
  "k4": "",
  "k5": "区",
  "k6": 652101,
  "k7": "0995"
}, {
  "id": 3195,
  "name": "鄯善",
  "parent_id": 467,
  "k1": "s",
  "k2": "ss",
  "k3": "shanshan",
  "k4": "",
  "k5": "县",
  "k6": 652122,
  "k7": "0995"
}, {
  "id": 3196,
  "name": "托克逊",
  "parent_id": 467,
  "k1": "t",
  "k2": "tkx",
  "k3": "tuokexun",
  "k4": "",
  "k5": "县",
  "k6": 652123,
  "k7": "0995"
}, {
  "id": 3197,
  "name": "伊州",
  "parent_id": 468,
  "k1": "y",
  "k2": "yz",
  "k3": "yizhou",
  "k4": "",
  "k5": "区",
  "k6": 650502,
  "k7": "0902"
}, {
  "id": 3198,
  "name": "巴里坤",
  "parent_id": 468,
  "k1": "b",
  "k2": "blk",
  "k3": "balikun",
  "k4": "哈萨克",
  "k5": "自治县",
  "k6": 650521,
  "k7": "0902"
}, {
  "id": 3199,
  "name": "伊吾",
  "parent_id": 468,
  "k1": "y",
  "k2": "yw",
  "k3": "yiwu",
  "k4": "",
  "k5": "县",
  "k6": 650522,
  "k7": "0902"
}, {
  "id": 3200,
  "name": "昌吉",
  "parent_id": 469,
  "k1": "c",
  "k2": "cj",
  "k3": "changji",
  "k4": "",
  "k5": "市",
  "k6": 652301,
  "k7": "0994"
}, {
  "id": 3201,
  "name": "阜康",
  "parent_id": 469,
  "k1": "f",
  "k2": "fk",
  "k3": "fukang",
  "k4": "",
  "k5": "市",
  "k6": 652302,
  "k7": "0994"
}, {
  "id": 3202,
  "name": "呼图壁",
  "parent_id": 469,
  "k1": "h",
  "k2": "htb",
  "k3": "hutubi",
  "k4": "",
  "k5": "县",
  "k6": 652323,
  "k7": "0994"
}, {
  "id": 3203,
  "name": "玛纳斯",
  "parent_id": 469,
  "k1": "m",
  "k2": "mns",
  "k3": "manasi",
  "k4": "",
  "k5": "县",
  "k6": 652324,
  "k7": "0994"
}, {
  "id": 3204,
  "name": "奇台",
  "parent_id": 469,
  "k1": "q",
  "k2": "qt",
  "k3": "qitai",
  "k4": "",
  "k5": "县",
  "k6": 652325,
  "k7": "0994"
}, {
  "id": 3205,
  "name": "吉木萨尔",
  "parent_id": 469,
  "k1": "j",
  "k2": "jmse",
  "k3": "jimusaer",
  "k4": "",
  "k5": "县",
  "k6": 652327,
  "k7": "0994"
}, {
  "id": 3206,
  "name": "木垒",
  "parent_id": 469,
  "k1": "m",
  "k2": "ml",
  "k3": "mulei",
  "k4": "哈萨克",
  "k5": "自治县",
  "k6": 652328,
  "k7": "0994"
}, {
  "id": 3207,
  "name": "阿拉山口",
  "parent_id": 470,
  "k1": "a",
  "k2": "alsk",
  "k3": "alashankou",
  "k4": "",
  "k5": "市",
  "k6": "",
  "k7": "0909"
}, {
  "id": 3208,
  "name": "博乐",
  "parent_id": 470,
  "k1": "b",
  "k2": "bl",
  "k3": "bole",
  "k4": "",
  "k5": "市",
  "k6": 652701,
  "k7": "0909"
}, {
  "id": 3209,
  "name": "精河",
  "parent_id": 470,
  "k1": "j",
  "k2": "jh",
  "k3": "jinghe",
  "k4": "",
  "k5": "县",
  "k6": 652722,
  "k7": "0909"
}, {
  "id": 3210,
  "name": "温泉",
  "parent_id": 470,
  "k1": "w",
  "k2": "wq",
  "k3": "wenquan",
  "k4": "",
  "k5": "县",
  "k6": 652723,
  "k7": "0909"
}, {
  "id": 3211,
  "name": "库尔勒",
  "parent_id": 471,
  "k1": "k",
  "k2": "kel",
  "k3": "kuerle",
  "k4": "",
  "k5": "市",
  "k6": 652801,
  "k7": "0996"
}, {
  "id": 3212,
  "name": "轮台",
  "parent_id": 471,
  "k1": "l",
  "k2": "lt",
  "k3": "luntai",
  "k4": "",
  "k5": "县",
  "k6": 652822,
  "k7": "0996"
}, {
  "id": 3213,
  "name": "尉犁",
  "parent_id": 471,
  "k1": "w",
  "k2": "wl",
  "k3": "weili",
  "k4": "",
  "k5": "县",
  "k6": 652823,
  "k7": "0996"
}, {
  "id": 3214,
  "name": "若羌",
  "parent_id": 471,
  "k1": "r",
  "k2": "rq",
  "k3": "ruoqiang",
  "k4": "",
  "k5": "县",
  "k6": 652824,
  "k7": "0996"
}, {
  "id": 3215,
  "name": "且末",
  "parent_id": 471,
  "k1": "q",
  "k2": "qm",
  "k3": "qiemo",
  "k4": "",
  "k5": "县",
  "k6": 652825,
  "k7": "0996"
}, {
  "id": 3216,
  "name": "焉耆",
  "parent_id": 471,
  "k1": "y",
  "k2": "yq",
  "k3": "yanqi",
  "k4": "回族",
  "k5": "自治县",
  "k6": 652826,
  "k7": "0996"
}, {
  "id": 3217,
  "name": "和静",
  "parent_id": 471,
  "k1": "h",
  "k2": "hj",
  "k3": "hejing",
  "k4": "",
  "k5": "县",
  "k6": 652827,
  "k7": "0996"
}, {
  "id": 3218,
  "name": "和硕",
  "parent_id": 471,
  "k1": "h",
  "k2": "hs",
  "k3": "heshuo",
  "k4": "",
  "k5": "县",
  "k6": 652828,
  "k7": "0996"
}, {
  "id": 3219,
  "name": "博湖",
  "parent_id": 471,
  "k1": "b",
  "k2": "bh",
  "k3": "bohu",
  "k4": "",
  "k5": "县",
  "k6": 652829,
  "k7": "0996"
}, {
  "id": 3220,
  "name": "阿克苏",
  "parent_id": 472,
  "k1": "a",
  "k2": "aks",
  "k3": "akesu",
  "k4": "",
  "k5": "市",
  "k6": 652901,
  "k7": ""
}, {
  "id": 3221,
  "name": "温宿",
  "parent_id": 472,
  "k1": "w",
  "k2": "ws",
  "k3": "wensu",
  "k4": "",
  "k5": "县",
  "k6": 652922,
  "k7": ""
}, {
  "id": 3222,
  "name": "库车",
  "parent_id": 472,
  "k1": "k",
  "k2": "kc",
  "k3": "kuche",
  "k4": "",
  "k5": "县",
  "k6": 652923,
  "k7": ""
}, {
  "id": 3223,
  "name": "沙雅",
  "parent_id": 472,
  "k1": "s",
  "k2": "sy",
  "k3": "shaya",
  "k4": "",
  "k5": "县",
  "k6": 652924,
  "k7": ""
}, {
  "id": 3224,
  "name": "新和",
  "parent_id": 472,
  "k1": "x",
  "k2": "xh",
  "k3": "xinhe",
  "k4": "",
  "k5": "县",
  "k6": 652925,
  "k7": ""
}, {
  "id": 3225,
  "name": "拜城",
  "parent_id": 472,
  "k1": "b",
  "k2": "bc",
  "k3": "baicheng",
  "k4": "",
  "k5": "县",
  "k6": 652926,
  "k7": ""
}, {
  "id": 3226,
  "name": "乌什",
  "parent_id": 472,
  "k1": "w",
  "k2": "ws",
  "k3": "wushen",
  "k4": "",
  "k5": "县",
  "k6": 652927,
  "k7": ""
}, {
  "id": 3227,
  "name": "阿瓦提",
  "parent_id": 472,
  "k1": "a",
  "k2": "awt",
  "k3": "awati",
  "k4": "",
  "k5": "县",
  "k6": 652928,
  "k7": ""
}, {
  "id": 3228,
  "name": "柯坪",
  "parent_id": 472,
  "k1": "k",
  "k2": "kp",
  "k3": "keping",
  "k4": "",
  "k5": "县",
  "k6": 652929,
  "k7": ""
}, {
  "id": 3229,
  "name": "阿图什",
  "parent_id": 473,
  "k1": "a",
  "k2": "ats",
  "k3": "atushen",
  "k4": "",
  "k5": "市",
  "k6": 653001,
  "k7": "0908"
}, {
  "id": 3230,
  "name": "阿克陶",
  "parent_id": 473,
  "k1": "a",
  "k2": "akt",
  "k3": "aketao",
  "k4": "",
  "k5": "县",
  "k6": 653022,
  "k7": "0908"
}, {
  "id": 3231,
  "name": "阿合奇",
  "parent_id": 473,
  "k1": "a",
  "k2": "ahq",
  "k3": "aheqi",
  "k4": "",
  "k5": "县",
  "k6": 653023,
  "k7": "0997"
}, {
  "id": 3232,
  "name": "乌恰",
  "parent_id": 473,
  "k1": "w",
  "k2": "wq",
  "k3": "wuqia",
  "k4": "",
  "k5": "县",
  "k6": 653024,
  "k7": "0908"
}, {
  "id": 3233,
  "name": "喀什",
  "parent_id": 474,
  "k1": "k",
  "k2": "ks",
  "k3": "kashen",
  "k4": "",
  "k5": "市",
  "k6": 653101,
  "k7": "0998"
}, {
  "id": 3234,
  "name": "疏附",
  "parent_id": 474,
  "k1": "s",
  "k2": "sf",
  "k3": "shufu",
  "k4": "",
  "k5": "县",
  "k6": 653121,
  "k7": "0998"
}, {
  "id": 3235,
  "name": "疏勒",
  "parent_id": 474,
  "k1": "s",
  "k2": "sl",
  "k3": "shule",
  "k4": "",
  "k5": "县",
  "k6": 653122,
  "k7": "0998"
}, {
  "id": 3236,
  "name": "英吉沙",
  "parent_id": 474,
  "k1": "y",
  "k2": "yjs",
  "k3": "yingjisha",
  "k4": "",
  "k5": "县",
  "k6": 653123,
  "k7": "0998"
}, {
  "id": 3237,
  "name": "泽普",
  "parent_id": 474,
  "k1": "z",
  "k2": "zp",
  "k3": "zepu",
  "k4": "",
  "k5": "县",
  "k6": 653124,
  "k7": "0998"
}, {
  "id": 3238,
  "name": "莎车",
  "parent_id": 474,
  "k1": "s",
  "k2": "sc",
  "k3": "shache",
  "k4": "",
  "k5": "县",
  "k6": 653125,
  "k7": "0998"
}, {
  "id": 3239,
  "name": "叶城",
  "parent_id": 474,
  "k1": "y",
  "k2": "yc",
  "k3": "yecheng",
  "k4": "",
  "k5": "县",
  "k6": 653126,
  "k7": "0998"
}, {
  "id": 3240,
  "name": "麦盖提",
  "parent_id": 474,
  "k1": "m",
  "k2": "mgt",
  "k3": "maigaiti",
  "k4": "",
  "k5": "县",
  "k6": 653127,
  "k7": "0998"
}, {
  "id": 3241,
  "name": "岳普湖",
  "parent_id": 474,
  "k1": "y",
  "k2": "yph",
  "k3": "yuepuhu",
  "k4": "",
  "k5": "县",
  "k6": 653128,
  "k7": "0998"
}, {
  "id": 3242,
  "name": "伽师",
  "parent_id": 474,
  "k1": "j",
  "k2": "js",
  "k3": "jiashi",
  "k4": "",
  "k5": "县",
  "k6": 653129,
  "k7": "0998"
}, {
  "id": 3243,
  "name": "巴楚",
  "parent_id": 474,
  "k1": "b",
  "k2": "bc",
  "k3": "bachu",
  "k4": "",
  "k5": "县",
  "k6": 653130,
  "k7": "0998"
}, {
  "id": 3244,
  "name": "塔什库尔干",
  "parent_id": 474,
  "k1": "t",
  "k2": "tskeg",
  "k3": "tashenkuergan",
  "k4": "塔吉克",
  "k5": "自治县",
  "k6": 653131,
  "k7": "0998"
}, {
  "id": 3245,
  "name": "和田",
  "parent_id": 475,
  "k1": "h",
  "k2": "ht",
  "k3": "hetian",
  "k4": "",
  "k5": "市",
  "k6": 653201,
  "k7": "0903"
}, {
  "id": 3246,
  "name": "和田",
  "parent_id": 475,
  "k1": "h",
  "k2": "ht",
  "k3": "hetian",
  "k4": "",
  "k5": "县",
  "k6": 653221,
  "k7": "0903"
}, {
  "id": 3247,
  "name": "墨玉",
  "parent_id": 475,
  "k1": "m",
  "k2": "my",
  "k3": "moyu",
  "k4": "",
  "k5": "县",
  "k6": 653222,
  "k7": "0903"
}, {
  "id": 3248,
  "name": "皮山",
  "parent_id": 475,
  "k1": "p",
  "k2": "ps",
  "k3": "pishan",
  "k4": "",
  "k5": "县",
  "k6": 653223,
  "k7": "0903"
}, {
  "id": 3249,
  "name": "洛浦",
  "parent_id": 475,
  "k1": "l",
  "k2": "lp",
  "k3": "luopu",
  "k4": "",
  "k5": "县",
  "k6": 653224,
  "k7": "0903"
}, {
  "id": 3250,
  "name": "策勒",
  "parent_id": 475,
  "k1": "c",
  "k2": "cl",
  "k3": "cele",
  "k4": "",
  "k5": "县",
  "k6": 653225,
  "k7": "0903"
}, {
  "id": 3251,
  "name": "于田",
  "parent_id": 475,
  "k1": "y",
  "k2": "yt",
  "k3": "yutian",
  "k4": "",
  "k5": "县",
  "k6": 653226,
  "k7": "0903"
}, {
  "id": 3252,
  "name": "民丰",
  "parent_id": 475,
  "k1": "m",
  "k2": "mf",
  "k3": "minfeng",
  "k4": "",
  "k5": "县",
  "k6": 653227,
  "k7": "0903"
}, {
  "id": 3253,
  "name": "伊宁",
  "parent_id": 476,
  "k1": "y",
  "k2": "yn",
  "k3": "yining",
  "k4": "",
  "k5": "市",
  "k6": 654002,
  "k7": "0999"
}, {
  "id": 3254,
  "name": "奎屯",
  "parent_id": 476,
  "k1": "k",
  "k2": "kt",
  "k3": "kuitun",
  "k4": "",
  "k5": "市",
  "k6": 654003,
  "k7": "0999"
}, {
  "id": 3255,
  "name": "伊宁",
  "parent_id": 476,
  "k1": "y",
  "k2": "yn",
  "k3": "yining",
  "k4": "",
  "k5": "县",
  "k6": 654021,
  "k7": "0999"
}, {
  "id": 3256,
  "name": "察布查尔锡伯",
  "parent_id": 476,
  "k1": "c",
  "k2": "cbcexb",
  "k3": "chabuchaerxibo",
  "k4": "",
  "k5": "自治县",
  "k6": 654022,
  "k7": "0999"
}, {
  "id": 3257,
  "name": "霍城",
  "parent_id": 476,
  "k1": "h",
  "k2": "hc",
  "k3": "huocheng",
  "k4": "",
  "k5": "县",
  "k6": 654023,
  "k7": "0999"
}, {
  "id": 3258,
  "name": "巩留",
  "parent_id": 476,
  "k1": "g",
  "k2": "gl",
  "k3": "gongliu",
  "k4": "",
  "k5": "县",
  "k6": 654024,
  "k7": "0999"
}, {
  "id": 3259,
  "name": "新源",
  "parent_id": 476,
  "k1": "x",
  "k2": "xy",
  "k3": "xinyuan",
  "k4": "",
  "k5": "县",
  "k6": 654025,
  "k7": "0999"
}, {
  "id": 3260,
  "name": "昭苏",
  "parent_id": 476,
  "k1": "z",
  "k2": "zs",
  "k3": "zhaosu",
  "k4": "",
  "k5": "县",
  "k6": 654026,
  "k7": "0999"
}, {
  "id": 3261,
  "name": "特克斯",
  "parent_id": 476,
  "k1": "t",
  "k2": "tks",
  "k3": "tekesi",
  "k4": "",
  "k5": "县",
  "k6": 654027,
  "k7": "0999"
}, {
  "id": 3262,
  "name": "尼勒克",
  "parent_id": 476,
  "k1": "n",
  "k2": "nlk",
  "k3": "nileke",
  "k4": "",
  "k5": "县",
  "k6": 654028,
  "k7": "0999"
}, {
  "id": 3263,
  "name": "塔城",
  "parent_id": 477,
  "k1": "t",
  "k2": "tc",
  "k3": "tacheng",
  "k4": "",
  "k5": "市",
  "k6": 654201,
  "k7": "0901"
}, {
  "id": 3264,
  "name": "乌苏",
  "parent_id": 477,
  "k1": "w",
  "k2": "ws",
  "k3": "wusu",
  "k4": "",
  "k5": "市",
  "k6": 654202,
  "k7": "0901"
}, {
  "id": 3265,
  "name": "额敏",
  "parent_id": 477,
  "k1": "e",
  "k2": "em",
  "k3": "emin",
  "k4": "",
  "k5": "县",
  "k6": 654221,
  "k7": "0901"
}, {
  "id": 3266,
  "name": "沙湾",
  "parent_id": 477,
  "k1": "s",
  "k2": "sw",
  "k3": "shawan",
  "k4": "",
  "k5": "县",
  "k6": 654223,
  "k7": "0901"
}, {
  "id": 3267,
  "name": "托里",
  "parent_id": 477,
  "k1": "t",
  "k2": "tl",
  "k3": "tuoli",
  "k4": "",
  "k5": "县",
  "k6": 654224,
  "k7": "0901"
}, {
  "id": 3268,
  "name": "裕民",
  "parent_id": 477,
  "k1": "y",
  "k2": "ym",
  "k3": "yumin",
  "k4": "",
  "k5": "县",
  "k6": 654225,
  "k7": "0901"
}, {
  "id": 3269,
  "name": "和布克赛尔",
  "parent_id": 477,
  "k1": "h",
  "k2": "hbkse",
  "k3": "hebukesaier",
  "k4": "蒙古",
  "k5": "自治县",
  "k6": 654226,
  "k7": "0901"
}, {
  "id": 3270,
  "name": "阿勒泰",
  "parent_id": 478,
  "k1": "a",
  "k2": "alt",
  "k3": "aletai",
  "k4": "",
  "k5": "市",
  "k6": 654301,
  "k7": "0906"
}, {
  "id": 3271,
  "name": "布尔津",
  "parent_id": 478,
  "k1": "b",
  "k2": "bej",
  "k3": "buerjin",
  "k4": "",
  "k5": "县",
  "k6": 654321,
  "k7": "0906"
}, {
  "id": 3272,
  "name": "富蕴",
  "parent_id": 478,
  "k1": "f",
  "k2": "fy",
  "k3": "fuyun",
  "k4": "",
  "k5": "县",
  "k6": 654322,
  "k7": "0906"
}, {
  "id": 3273,
  "name": "福海",
  "parent_id": 478,
  "k1": "f",
  "k2": "fh",
  "k3": "fuhai",
  "k4": "",
  "k5": "县",
  "k6": 654323,
  "k7": "0906"
}, {
  "id": 3274,
  "name": "哈巴河",
  "parent_id": 478,
  "k1": "h",
  "k2": "hbh",
  "k3": "habahe",
  "k4": "",
  "k5": "县",
  "k6": 654324,
  "k7": "0906"
}, {
  "id": 3275,
  "name": "青河",
  "parent_id": 478,
  "k1": "q",
  "k2": "qh",
  "k3": "qinghe",
  "k4": "",
  "k5": "县",
  "k6": 654325,
  "k7": "0906"
}, {
  "id": 3276,
  "name": "吉木乃",
  "parent_id": 478,
  "k1": "j",
  "k2": "jmn",
  "k3": "jimunai",
  "k4": "",
  "k5": "县",
  "k6": 654326,
  "k7": "0906"
}, {
  "id": 3277,
  "name": "松山",
  "parent_id": 485,
  "k1": "s",
  "k2": "ss",
  "k3": "songshan",
  "k4": "",
  "k5": "区",
  "k6": 6300100,
  "k7": "02"
}, {
  "id": 3278,
  "name": "信义",
  "parent_id": 485,
  "k1": "x",
  "k2": "xy",
  "k3": "xinyi",
  "k4": "",
  "k5": "区",
  "k6": 6300200,
  "k7": "02"
}, {
  "id": 3279,
  "name": "大安",
  "parent_id": 485,
  "k1": "d",
  "k2": "da",
  "k3": "daan",
  "k4": "",
  "k5": "区",
  "k6": 6300300,
  "k7": "02"
}, {
  "id": 3280,
  "name": "中山",
  "parent_id": 485,
  "k1": "z",
  "k2": "zs",
  "k3": "zhongshan",
  "k4": "",
  "k5": "区",
  "k6": 6300400,
  "k7": "02"
}, {
  "id": 3281,
  "name": "中正",
  "parent_id": 485,
  "k1": "z",
  "k2": "zz",
  "k3": "zhongzheng",
  "k4": "",
  "k5": "区",
  "k6": 6300500,
  "k7": "02"
}, {
  "id": 3282,
  "name": "大同",
  "parent_id": 485,
  "k1": "d",
  "k2": "dt",
  "k3": "datong",
  "k4": "",
  "k5": "区",
  "k6": 6300600,
  "k7": "02"
}, {
  "id": 3283,
  "name": "万华",
  "parent_id": 485,
  "k1": "w",
  "k2": "wh",
  "k3": "wanhua",
  "k4": "",
  "k5": "区",
  "k6": 6300700,
  "k7": "02"
}, {
  "id": 3284,
  "name": "文山",
  "parent_id": 485,
  "k1": "w",
  "k2": "ws",
  "k3": "wenshan",
  "k4": "",
  "k5": "区",
  "k6": 6300800,
  "k7": "02"
}, {
  "id": 3285,
  "name": "南港",
  "parent_id": 485,
  "k1": "n",
  "k2": "ng",
  "k3": "nangang",
  "k4": "",
  "k5": "区",
  "k6": 6300900,
  "k7": "02"
}, {
  "id": 3286,
  "name": "内湖",
  "parent_id": 485,
  "k1": "n",
  "k2": "nh",
  "k3": "neihu",
  "k4": "",
  "k5": "区",
  "k6": 6301000,
  "k7": "02"
}, {
  "id": 3287,
  "name": "士林",
  "parent_id": 485,
  "k1": "s",
  "k2": "sl",
  "k3": "shilin",
  "k4": "",
  "k5": "区",
  "k6": 6301100,
  "k7": "02"
}, {
  "id": 3288,
  "name": "北投",
  "parent_id": 485,
  "k1": "b",
  "k2": "bt",
  "k3": "beitou",
  "k4": "",
  "k5": "区",
  "k6": 6301200,
  "k7": "02"
}, {
  "id": 3289,
  "name": "盐埕",
  "parent_id": 486,
  "k1": "y",
  "k2": "yc",
  "k3": "yancheng",
  "k4": "",
  "k5": "区",
  "k6": 6400100,
  "k7": "07"
}, {
  "id": 3290,
  "name": "鼓山",
  "parent_id": 486,
  "k1": "g",
  "k2": "gs",
  "k3": "gushan",
  "k4": "",
  "k5": "区",
  "k6": 6400200,
  "k7": "07"
}, {
  "id": 3291,
  "name": "左营",
  "parent_id": 486,
  "k1": "z",
  "k2": "zy",
  "k3": "zuoying",
  "k4": "",
  "k5": "区",
  "k6": 6400300,
  "k7": "07"
}, {
  "id": 3292,
  "name": "楠梓",
  "parent_id": 486,
  "k1": "n",
  "k2": "nz",
  "k3": "nanzi",
  "k4": "",
  "k5": "区",
  "k6": 6400400,
  "k7": "07"
}, {
  "id": 3293,
  "name": "三民",
  "parent_id": 486,
  "k1": "s",
  "k2": "sm",
  "k3": "sanmin",
  "k4": "",
  "k5": "区",
  "k6": 6400500,
  "k7": "07"
}, {
  "id": 3294,
  "name": "新兴",
  "parent_id": 486,
  "k1": "x",
  "k2": "xx",
  "k3": "xinxing",
  "k4": "",
  "k5": "区",
  "k6": 6400600,
  "k7": "07"
}, {
  "id": 3295,
  "name": "前金",
  "parent_id": 486,
  "k1": "q",
  "k2": "qj",
  "k3": "qianjin",
  "k4": "",
  "k5": "区",
  "k6": 6400700,
  "k7": "07"
}, {
  "id": 3296,
  "name": "苓雅",
  "parent_id": 486,
  "k1": "l",
  "k2": "ly",
  "k3": "lingya",
  "k4": "",
  "k5": "区",
  "k6": 6400800,
  "k7": "07"
}, {
  "id": 3297,
  "name": "前镇",
  "parent_id": 486,
  "k1": "q",
  "k2": "qz",
  "k3": "qianzhen",
  "k4": "",
  "k5": "区",
  "k6": 6400900,
  "k7": "07"
}, {
  "id": 3298,
  "name": "旗津",
  "parent_id": 486,
  "k1": "q",
  "k2": "qj",
  "k3": "qijin",
  "k4": "",
  "k5": "区",
  "k6": 6401000,
  "k7": "07"
}, {
  "id": 3299,
  "name": "小港",
  "parent_id": 486,
  "k1": "x",
  "k2": "xg",
  "k3": "xiaogang",
  "k4": "",
  "k5": "区",
  "k6": 6401100,
  "k7": "07"
}, {
  "id": 3300,
  "name": "中正",
  "parent_id": 487,
  "k1": "z",
  "k2": "zz",
  "k3": "zhongzheng",
  "k4": "",
  "k5": "区",
  "k6": 1001701,
  "k7": "02"
}, {
  "id": 3301,
  "name": "七堵",
  "parent_id": 487,
  "k1": "q",
  "k2": "qd",
  "k3": "qidu",
  "k4": "",
  "k5": "区",
  "k6": 1001702,
  "k7": "02"
}, {
  "id": 3302,
  "name": "暖暖",
  "parent_id": 487,
  "k1": "n",
  "k2": "nn",
  "k3": "nuannuan",
  "k4": "",
  "k5": "区",
  "k6": 1001703,
  "k7": "02"
}, {
  "id": 3303,
  "name": "仁爱",
  "parent_id": 487,
  "k1": "r",
  "k2": "ra",
  "k3": "renai",
  "k4": "",
  "k5": "区",
  "k6": 1001704,
  "k7": "02"
}, {
  "id": 3304,
  "name": "中山",
  "parent_id": 487,
  "k1": "z",
  "k2": "zs",
  "k3": "zhongshan",
  "k4": "",
  "k5": "区",
  "k6": 1001705,
  "k7": "02"
}, {
  "id": 3305,
  "name": "安乐",
  "parent_id": 487,
  "k1": "a",
  "k2": "al",
  "k3": "anle",
  "k4": "",
  "k5": "区",
  "k6": 1001706,
  "k7": "02"
}, {
  "id": 3306,
  "name": "信义",
  "parent_id": 487,
  "k1": "x",
  "k2": "xy",
  "k3": "xinyi",
  "k4": "",
  "k5": "区",
  "k6": 1001707,
  "k7": "02"
}, {
  "id": 3307,
  "name": "大安",
  "parent_id": 488,
  "k1": "d",
  "k2": "da",
  "k3": "daan",
  "k4": "",
  "k5": "区",
  "k6": "",
  "k7": "04"
}, {
  "id": 3308,
  "name": "神冈",
  "parent_id": 488,
  "k1": "s",
  "k2": "sg",
  "k3": "shengang",
  "k4": "",
  "k5": "区",
  "k6": "",
  "k7": "04"
}, {
  "id": 3309,
  "name": "石冈",
  "parent_id": 488,
  "k1": "s",
  "k2": "sg",
  "k3": "shigang",
  "k4": "",
  "k5": "区",
  "k6": "",
  "k7": "04"
}, {
  "id": 3310,
  "name": "东势",
  "parent_id": 488,
  "k1": "d",
  "k2": "ds",
  "k3": "dongshi",
  "k4": "",
  "k5": "区",
  "k6": "",
  "k7": "04"
}, {
  "id": 3311,
  "name": "新社",
  "parent_id": 488,
  "k1": "x",
  "k2": "xs",
  "k3": "xinshe",
  "k4": "",
  "k5": "区",
  "k6": "",
  "k7": "04"
}, {
  "id": 3312,
  "name": "和平",
  "parent_id": 488,
  "k1": "h",
  "k2": "hp",
  "k3": "heping",
  "k4": "",
  "k5": "区",
  "k6": "",
  "k7": "04"
}, {
  "id": 3313,
  "name": "大肚",
  "parent_id": 488,
  "k1": "d",
  "k2": "dd",
  "k3": "dadu",
  "k4": "",
  "k5": "区",
  "k6": "",
  "k7": "04"
}, {
  "id": 3314,
  "name": "沙鹿",
  "parent_id": 488,
  "k1": "s",
  "k2": "sl",
  "k3": "shalu",
  "k4": "",
  "k5": "区",
  "k6": "",
  "k7": "04"
}, {
  "id": 3315,
  "name": "龙井",
  "parent_id": 488,
  "k1": "l",
  "k2": "lj",
  "k3": "longjing",
  "k4": "",
  "k5": "区",
  "k6": "",
  "k7": "04"
}, {
  "id": 3316,
  "name": "梧栖",
  "parent_id": 488,
  "k1": "w",
  "k2": "wq",
  "k3": "wuqi",
  "k4": "",
  "k5": "区",
  "k6": "",
  "k7": "04"
}, {
  "id": 3317,
  "name": "清水",
  "parent_id": 488,
  "k1": "q",
  "k2": "qs",
  "k3": "qingshui",
  "k4": "",
  "k5": "区",
  "k6": "",
  "k7": "04"
}, {
  "id": 3318,
  "name": "大甲",
  "parent_id": 488,
  "k1": "d",
  "k2": "dj",
  "k3": "dajia",
  "k4": "",
  "k5": "区",
  "k6": "",
  "k7": "04"
}, {
  "id": 3319,
  "name": "外埔",
  "parent_id": 488,
  "k1": "w",
  "k2": "wp",
  "k3": "waipu",
  "k4": "",
  "k5": "区",
  "k6": "",
  "k7": "04"
}, {
  "id": 3320,
  "name": "大雅",
  "parent_id": 488,
  "k1": "d",
  "k2": "dy",
  "k3": "daya",
  "k4": "",
  "k5": "区",
  "k6": "",
  "k7": "04"
}, {
  "id": 3321,
  "name": "潭子",
  "parent_id": 488,
  "k1": "t",
  "k2": "tz",
  "k3": "tanzi",
  "k4": "",
  "k5": "区",
  "k6": "",
  "k7": "04"
}, {
  "id": 3322,
  "name": "后里",
  "parent_id": 488,
  "k1": "h",
  "k2": "hl",
  "k3": "houli",
  "k4": "",
  "k5": "区",
  "k6": "",
  "k7": "04"
}, {
  "id": 3323,
  "name": "丰原",
  "parent_id": 488,
  "k1": "f",
  "k2": "fy",
  "k3": "fengyuan",
  "k4": "",
  "k5": "区",
  "k6": "",
  "k7": "04"
}, {
  "id": 3324,
  "name": "乌日",
  "parent_id": 488,
  "k1": "w",
  "k2": "wr",
  "k3": "wuri",
  "k4": "",
  "k5": "区",
  "k6": "",
  "k7": "04"
}, {
  "id": 3325,
  "name": "雾峰",
  "parent_id": 488,
  "k1": "w",
  "k2": "wf",
  "k3": "wufeng",
  "k4": "",
  "k5": "区",
  "k6": "",
  "k7": "04"
}, {
  "id": 3326,
  "name": "大里",
  "parent_id": 488,
  "k1": "d",
  "k2": "dl",
  "k3": "dali",
  "k4": "",
  "k5": "区",
  "k6": "",
  "k7": "04"
}, {
  "id": 3327,
  "name": "太平",
  "parent_id": 488,
  "k1": "t",
  "k2": "tp",
  "k3": "taiping",
  "k4": "",
  "k5": "区",
  "k6": "",
  "k7": "04"
}, {
  "id": 3328,
  "name": "中区",
  "parent_id": 488,
  "k1": "z",
  "k2": "zq",
  "k3": "zhongqu",
  "k4": "",
  "k5": "",
  "k6": 1001901,
  "k7": "04"
}, {
  "id": 3329,
  "name": "东区",
  "parent_id": 488,
  "k1": "d",
  "k2": "dq",
  "k3": "dongqu",
  "k4": "",
  "k5": "",
  "k6": 1001902,
  "k7": "04"
}, {
  "id": 3330,
  "name": "南区",
  "parent_id": 488,
  "k1": "n",
  "k2": "nq",
  "k3": "nanqu",
  "k4": "",
  "k5": "",
  "k6": 1001903,
  "k7": "04"
}, {
  "id": 3331,
  "name": "西区",
  "parent_id": 488,
  "k1": "x",
  "k2": "xq",
  "k3": "xiqu",
  "k4": "",
  "k5": "",
  "k6": 1001904,
  "k7": "04"
}, {
  "id": 3332,
  "name": "北区",
  "parent_id": 488,
  "k1": "b",
  "k2": "bq",
  "k3": "beiqu",
  "k4": "",
  "k5": "",
  "k6": 1001905,
  "k7": "04"
}, {
  "id": 3333,
  "name": "西屯",
  "parent_id": 488,
  "k1": "x",
  "k2": "xt",
  "k3": "xitun",
  "k4": "",
  "k5": "区",
  "k6": 1001906,
  "k7": "04"
}, {
  "id": 3334,
  "name": "南屯",
  "parent_id": 488,
  "k1": "n",
  "k2": "nt",
  "k3": "nantun",
  "k4": "",
  "k5": "区",
  "k6": 1001907,
  "k7": "04"
}, {
  "id": 3335,
  "name": "北屯",
  "parent_id": 488,
  "k1": "b",
  "k2": "bt",
  "k3": "beitun",
  "k4": "",
  "k5": "区",
  "k6": 1001908,
  "k7": "04"
}, {
  "id": 3336,
  "name": "东区",
  "parent_id": 489,
  "k1": "d",
  "k2": "dq",
  "k3": "dongqu",
  "k4": "",
  "k5": "",
  "k6": 1002101,
  "k7": "06"
}, {
  "id": 3337,
  "name": "南区",
  "parent_id": 489,
  "k1": "n",
  "k2": "nq",
  "k3": "nanqu",
  "k4": "",
  "k5": "",
  "k6": 1002102,
  "k7": "06"
}, {
  "id": 3338,
  "name": "北区",
  "parent_id": 489,
  "k1": "b",
  "k2": "bq",
  "k3": "beiqu",
  "k4": "",
  "k5": "",
  "k6": 1002104,
  "k7": "06"
}, {
  "id": 3339,
  "name": "安南",
  "parent_id": 489,
  "k1": "a",
  "k2": "an",
  "k3": "annan",
  "k4": "",
  "k5": "区",
  "k6": 1002106,
  "k7": "06"
}, {
  "id": 3340,
  "name": "安平",
  "parent_id": 489,
  "k1": "a",
  "k2": "ap",
  "k3": "anping",
  "k4": "",
  "k5": "区",
  "k6": 1002107,
  "k7": "06"
}, {
  "id": 3341,
  "name": "中西",
  "parent_id": 489,
  "k1": "z",
  "k2": "zx",
  "k3": "zhongxi",
  "k4": "",
  "k5": "区",
  "k6": 1002108,
  "k7": "06"
}, {
  "id": 3342,
  "name": "东区",
  "parent_id": 490,
  "k1": "d",
  "k2": "dq",
  "k3": "dongqu",
  "k4": "",
  "k5": "",
  "k6": 1001801,
  "k7": ""
}, {
  "id": 3343,
  "name": "北区",
  "parent_id": 490,
  "k1": "b",
  "k2": "bq",
  "k3": "beiqu",
  "k4": "",
  "k5": "",
  "k6": 1001802,
  "k7": ""
}, {
  "id": 3344,
  "name": "香山",
  "parent_id": 490,
  "k1": "x",
  "k2": "xs",
  "k3": "xiangshan",
  "k4": "",
  "k5": "区",
  "k6": 1001803,
  "k7": ""
}, {
  "id": 3345,
  "name": "东区",
  "parent_id": 491,
  "k1": "d",
  "k2": "dq",
  "k3": "dongqu",
  "k4": "",
  "k5": "",
  "k6": 1002001,
  "k7": "05"
}, {
  "id": 3346,
  "name": "西区",
  "parent_id": 491,
  "k1": "x",
  "k2": "xq",
  "k3": "xiqu",
  "k4": "",
  "k5": "",
  "k6": 1002002,
  "k7": "05"
}, {
  "id": 3347,
  "name": "板桥",
  "parent_id": 492,
  "k1": "b",
  "k2": "bq",
  "k3": "banqiao",
  "k4": "",
  "k5": "区",
  "k6": "",
  "k7": ""
}, {
  "id": 3348,
  "name": "瑞芳",
  "parent_id": 492,
  "k1": "r",
  "k2": "rf",
  "k3": "ruifang",
  "k4": "",
  "k5": "区",
  "k6": "",
  "k7": ""
}, {
  "id": 3349,
  "name": "八里",
  "parent_id": 492,
  "k1": "b",
  "k2": "bl",
  "k3": "bali",
  "k4": "",
  "k5": "区",
  "k6": "",
  "k7": ""
}, {
  "id": 3350,
  "name": "深坑",
  "parent_id": 492,
  "k1": "s",
  "k2": "sk",
  "k3": "shenkeng",
  "k4": "",
  "k5": "区",
  "k6": "",
  "k7": ""
}, {
  "id": 3351,
  "name": "三芝",
  "parent_id": 492,
  "k1": "s",
  "k2": "sz",
  "k3": "sanzhi",
  "k4": "",
  "k5": "区",
  "k6": "",
  "k7": ""
}, {
  "id": 3352,
  "name": "金山",
  "parent_id": 492,
  "k1": "j",
  "k2": "js",
  "k3": "jinshan",
  "k4": "",
  "k5": "区",
  "k6": "",
  "k7": ""
}, {
  "id": 3353,
  "name": "万里",
  "parent_id": 492,
  "k1": "w",
  "k2": "wl",
  "k3": "wanli",
  "k4": "",
  "k5": "区",
  "k6": "",
  "k7": ""
}, {
  "id": 3354,
  "name": "贡寮",
  "parent_id": 492,
  "k1": "g",
  "k2": "gl",
  "k3": "gongliao",
  "k4": "",
  "k5": "区",
  "k6": "",
  "k7": ""
}, {
  "id": 3355,
  "name": "石门",
  "parent_id": 492,
  "k1": "s",
  "k2": "sm",
  "k3": "shimen",
  "k4": "",
  "k5": "区",
  "k6": "",
  "k7": ""
}, {
  "id": 3356,
  "name": "双溪",
  "parent_id": 492,
  "k1": "s",
  "k2": "sx",
  "k3": "shuangxi",
  "k4": "",
  "k5": "区",
  "k6": "",
  "k7": ""
}, {
  "id": 3357,
  "name": "石碇",
  "parent_id": 492,
  "k1": "s",
  "k2": "sd",
  "k3": "shiding",
  "k4": "",
  "k5": "区",
  "k6": "",
  "k7": ""
}, {
  "id": 3358,
  "name": "坪林",
  "parent_id": 492,
  "k1": "p",
  "k2": "pl",
  "k3": "pinglin",
  "k4": "",
  "k5": "区",
  "k6": "",
  "k7": ""
}, {
  "id": 3359,
  "name": "乌来",
  "parent_id": 492,
  "k1": "w",
  "k2": "wl",
  "k3": "wulai",
  "k4": "",
  "k5": "区",
  "k6": "",
  "k7": ""
}, {
  "id": 3360,
  "name": "泰山",
  "parent_id": 492,
  "k1": "t",
  "k2": "ts",
  "k3": "taishan",
  "k4": "",
  "k5": "区",
  "k6": "",
  "k7": ""
}, {
  "id": 3361,
  "name": "五股",
  "parent_id": 492,
  "k1": "w",
  "k2": "wg",
  "k3": "wugu",
  "k4": "",
  "k5": "区",
  "k6": "",
  "k7": ""
}, {
  "id": 3362,
  "name": "莺歌",
  "parent_id": 492,
  "k1": "y",
  "k2": "yg",
  "k3": "yingge",
  "k4": "",
  "k5": "区",
  "k6": "",
  "k7": ""
}, {
  "id": 3363,
  "name": "中和",
  "parent_id": 492,
  "k1": "z",
  "k2": "zh",
  "k3": "zhonghe",
  "k4": "",
  "k5": "区",
  "k6": "",
  "k7": ""
}, {
  "id": 3364,
  "name": "新庄",
  "parent_id": 492,
  "k1": "x",
  "k2": "xz",
  "k3": "xinzhuang",
  "k4": "",
  "k5": "区",
  "k6": "",
  "k7": ""
}, {
  "id": 3365,
  "name": "三重",
  "parent_id": 492,
  "k1": "s",
  "k2": "sz",
  "k3": "sanzhong",
  "k4": "",
  "k5": "区",
  "k6": "",
  "k7": ""
}, {
  "id": 3366,
  "name": "新店",
  "parent_id": 492,
  "k1": "x",
  "k2": "xd",
  "k3": "xindian",
  "k4": "",
  "k5": "区",
  "k6": "",
  "k7": ""
}, {
  "id": 3367,
  "name": "土城",
  "parent_id": 492,
  "k1": "t",
  "k2": "tc",
  "k3": "tucheng",
  "k4": "",
  "k5": "区",
  "k6": "",
  "k7": ""
}, {
  "id": 3368,
  "name": "永和",
  "parent_id": 492,
  "k1": "y",
  "k2": "yh",
  "k3": "yonghe",
  "k4": "",
  "k5": "区",
  "k6": "",
  "k7": ""
}, {
  "id": 3369,
  "name": "芦洲",
  "parent_id": 492,
  "k1": "l",
  "k2": "lz",
  "k3": "luzhou",
  "k4": "",
  "k5": "区",
  "k6": "",
  "k7": ""
}, {
  "id": 3370,
  "name": "汐止",
  "parent_id": 492,
  "k1": "x",
  "k2": "xz",
  "k3": "xizhi",
  "k4": "",
  "k5": "区",
  "k6": "",
  "k7": ""
}, {
  "id": 3371,
  "name": "树林",
  "parent_id": 492,
  "k1": "s",
  "k2": "sl",
  "k3": "shulin",
  "k4": "",
  "k5": "区",
  "k6": "",
  "k7": ""
}, {
  "id": 3372,
  "name": "淡水",
  "parent_id": 492,
  "k1": "d",
  "k2": "ds",
  "k3": "danshui",
  "k4": "",
  "k5": "区",
  "k6": "",
  "k7": ""
}, {
  "id": 3373,
  "name": "三峡",
  "parent_id": 492,
  "k1": "s",
  "k2": "sx",
  "k3": "sanxia",
  "k4": "",
  "k5": "区",
  "k6": "",
  "k7": ""
}, {
  "id": 3374,
  "name": "林口",
  "parent_id": 492,
  "k1": "l",
  "k2": "lk",
  "k3": "linkou",
  "k4": "",
  "k5": "区",
  "k6": "",
  "k7": ""
}, {
  "id": 3375,
  "name": "平溪",
  "parent_id": 492,
  "k1": "p",
  "k2": "px",
  "k3": "pingxi",
  "k4": "",
  "k5": "区",
  "k6": "",
  "k7": ""
}, {
  "id": 3376,
  "name": "宜兰",
  "parent_id": 493,
  "k1": "y",
  "k2": "yl",
  "k3": "yilan",
  "k4": "",
  "k5": "市",
  "k6": 1000201,
  "k7": ""
}, {
  "id": 3377,
  "name": "罗东",
  "parent_id": 493,
  "k1": "l",
  "k2": "ld",
  "k3": "luodong",
  "k4": "",
  "k5": "镇",
  "k6": 1000202,
  "k7": ""
}, {
  "id": 3378,
  "name": "苏澳",
  "parent_id": 493,
  "k1": "s",
  "k2": "sa",
  "k3": "suao",
  "k4": "",
  "k5": "镇",
  "k6": 1000203,
  "k7": ""
}, {
  "id": 3379,
  "name": "头城",
  "parent_id": 493,
  "k1": "t",
  "k2": "tc",
  "k3": "toucheng",
  "k4": "",
  "k5": "乡",
  "k6": 1000204,
  "k7": ""
}, {
  "id": 3380,
  "name": "礁溪",
  "parent_id": 493,
  "k1": "j",
  "k2": "jx",
  "k3": "jiaoxi",
  "k4": "",
  "k5": "乡",
  "k6": 1000205,
  "k7": ""
}, {
  "id": 3381,
  "name": "壮围",
  "parent_id": 493,
  "k1": "z",
  "k2": "zw",
  "k3": "zhuangwei",
  "k4": "",
  "k5": "乡",
  "k6": 1000206,
  "k7": ""
}, {
  "id": 3382,
  "name": "员山",
  "parent_id": 493,
  "k1": "y",
  "k2": "ys",
  "k3": "yuanshan",
  "k4": "",
  "k5": "乡",
  "k6": 1000207,
  "k7": ""
}, {
  "id": 3383,
  "name": "冬山",
  "parent_id": 493,
  "k1": "d",
  "k2": "ds",
  "k3": "dongshan",
  "k4": "",
  "k5": "乡",
  "k6": 1000208,
  "k7": ""
}, {
  "id": 3384,
  "name": "五结",
  "parent_id": 493,
  "k1": "w",
  "k2": "wj",
  "k3": "wujie",
  "k4": "",
  "k5": "乡",
  "k6": 1000209,
  "k7": ""
}, {
  "id": 3385,
  "name": "三星",
  "parent_id": 493,
  "k1": "s",
  "k2": "sx",
  "k3": "sanxing",
  "k4": "",
  "k5": "乡",
  "k6": 1000210,
  "k7": ""
}, {
  "id": 3386,
  "name": "大同",
  "parent_id": 493,
  "k1": "d",
  "k2": "dt",
  "k3": "datong",
  "k4": "",
  "k5": "乡",
  "k6": 1000211,
  "k7": ""
}, {
  "id": 3387,
  "name": "南澳",
  "parent_id": 493,
  "k1": "n",
  "k2": "na",
  "k3": "nanao",
  "k4": "",
  "k5": "乡",
  "k6": 1000212,
  "k7": ""
}, {
  "id": 3388,
  "name": "桃园",
  "parent_id": 494,
  "k1": "t",
  "k2": "ty",
  "k3": "taoyuan",
  "k4": "",
  "k5": "市",
  "k6": 1000301,
  "k7": ""
}, {
  "id": 3389,
  "name": "中坜",
  "parent_id": 494,
  "k1": "z",
  "k2": "zl",
  "k3": "zhongli",
  "k4": "",
  "k5": "市",
  "k6": 1000302,
  "k7": ""
}, {
  "id": 3390,
  "name": "大溪",
  "parent_id": 494,
  "k1": "d",
  "k2": "dx",
  "k3": "daxi",
  "k4": "",
  "k5": "镇",
  "k6": 1000303,
  "k7": ""
}, {
  "id": 3391,
  "name": "杨梅",
  "parent_id": 494,
  "k1": "y",
  "k2": "ym",
  "k3": "yangmei",
  "k4": "",
  "k5": "镇",
  "k6": 1000304,
  "k7": ""
}, {
  "id": 3392,
  "name": "芦竹",
  "parent_id": 494,
  "k1": "l",
  "k2": "lz",
  "k3": "luzhu",
  "k4": "",
  "k5": "乡",
  "k6": 1000305,
  "k7": ""
}, {
  "id": 3393,
  "name": "大园",
  "parent_id": 494,
  "k1": "d",
  "k2": "dy",
  "k3": "dayuan",
  "k4": "",
  "k5": "乡",
  "k6": 1000306,
  "k7": ""
}, {
  "id": 3394,
  "name": "龟山",
  "parent_id": 494,
  "k1": "g",
  "k2": "gs",
  "k3": "guishan",
  "k4": "",
  "k5": "乡",
  "k6": 1000307,
  "k7": ""
}, {
  "id": 3395,
  "name": "八德",
  "parent_id": 494,
  "k1": "b",
  "k2": "bd",
  "k3": "bade",
  "k4": "",
  "k5": "市",
  "k6": 1000308,
  "k7": ""
}, {
  "id": 3396,
  "name": "龙潭",
  "parent_id": 494,
  "k1": "l",
  "k2": "lt",
  "k3": "longtan",
  "k4": "",
  "k5": "乡",
  "k6": 1000309,
  "k7": ""
}, {
  "id": 3397,
  "name": "平镇",
  "parent_id": 494,
  "k1": "p",
  "k2": "pz",
  "k3": "pingzhen",
  "k4": "",
  "k5": "市",
  "k6": 1000310,
  "k7": ""
}, {
  "id": 3398,
  "name": "新屋",
  "parent_id": 494,
  "k1": "x",
  "k2": "xw",
  "k3": "xinwu",
  "k4": "",
  "k5": "乡",
  "k6": 1000311,
  "k7": ""
}, {
  "id": 3399,
  "name": "观音",
  "parent_id": 494,
  "k1": "g",
  "k2": "gy",
  "k3": "guanyin",
  "k4": "",
  "k5": "乡",
  "k6": 1000312,
  "k7": ""
}, {
  "id": 3400,
  "name": "复兴",
  "parent_id": 494,
  "k1": "f",
  "k2": "fx",
  "k3": "fuxing",
  "k4": "",
  "k5": "乡",
  "k6": 1000313,
  "k7": ""
}, {
  "id": 3401,
  "name": "竹北",
  "parent_id": 495,
  "k1": "z",
  "k2": "zb",
  "k3": "zhubei",
  "k4": "",
  "k5": "市",
  "k6": 1000401,
  "k7": ""
}, {
  "id": 3402,
  "name": "竹东",
  "parent_id": 495,
  "k1": "z",
  "k2": "zd",
  "k3": "zhudong",
  "k4": "",
  "k5": "镇",
  "k6": 1000402,
  "k7": ""
}, {
  "id": 3403,
  "name": "新埔",
  "parent_id": 495,
  "k1": "x",
  "k2": "xp",
  "k3": "xinpu",
  "k4": "",
  "k5": "镇",
  "k6": 1000403,
  "k7": ""
}, {
  "id": 3404,
  "name": "关西",
  "parent_id": 495,
  "k1": "g",
  "k2": "gx",
  "k3": "guanxi",
  "k4": "",
  "k5": "镇",
  "k6": 1000404,
  "k7": ""
}, {
  "id": 3405,
  "name": "湖口",
  "parent_id": 495,
  "k1": "h",
  "k2": "hk",
  "k3": "hukou",
  "k4": "",
  "k5": "乡",
  "k6": 1000405,
  "k7": ""
}, {
  "id": 3406,
  "name": "新丰",
  "parent_id": 495,
  "k1": "x",
  "k2": "xf",
  "k3": "xinfeng",
  "k4": "",
  "k5": "乡",
  "k6": 1000406,
  "k7": ""
}, {
  "id": 3407,
  "name": "芎林",
  "parent_id": 495,
  "k1": "x",
  "k2": "xl",
  "k3": "xionglin",
  "k4": "",
  "k5": "乡",
  "k6": 1000407,
  "k7": ""
}, {
  "id": 3408,
  "name": "横山",
  "parent_id": 495,
  "k1": "h",
  "k2": "hs",
  "k3": "hengshan",
  "k4": "",
  "k5": "乡",
  "k6": 1000408,
  "k7": ""
}, {
  "id": 3409,
  "name": "北埔",
  "parent_id": 495,
  "k1": "b",
  "k2": "bp",
  "k3": "beipu",
  "k4": "",
  "k5": "乡",
  "k6": 1000409,
  "k7": ""
}, {
  "id": 3410,
  "name": "宝山",
  "parent_id": 495,
  "k1": "b",
  "k2": "bs",
  "k3": "baoshan",
  "k4": "",
  "k5": "乡",
  "k6": 1000410,
  "k7": ""
}, {
  "id": 3411,
  "name": "峨眉",
  "parent_id": 495,
  "k1": "e",
  "k2": "em",
  "k3": "emei",
  "k4": "",
  "k5": "乡",
  "k6": 1000411,
  "k7": ""
}, {
  "id": 3412,
  "name": "尖石",
  "parent_id": 495,
  "k1": "j",
  "k2": "js",
  "k3": "jianshi",
  "k4": "",
  "k5": "乡",
  "k6": 1000412,
  "k7": ""
}, {
  "id": 3413,
  "name": "五峰",
  "parent_id": 495,
  "k1": "w",
  "k2": "wf",
  "k3": "wufeng",
  "k4": "",
  "k5": "乡",
  "k6": 1000413,
  "k7": ""
}, {
  "id": 3414,
  "name": "苗栗",
  "parent_id": 496,
  "k1": "m",
  "k2": "ml",
  "k3": "miaoli",
  "k4": "",
  "k5": "市",
  "k6": 1000501,
  "k7": ""
}, {
  "id": 3415,
  "name": "苑里",
  "parent_id": 496,
  "k1": "y",
  "k2": "yl",
  "k3": "yuanli",
  "k4": "",
  "k5": "镇",
  "k6": 1000502,
  "k7": ""
}, {
  "id": 3416,
  "name": "通霄",
  "parent_id": 496,
  "k1": "t",
  "k2": "tx",
  "k3": "tongxiao",
  "k4": "",
  "k5": "镇",
  "k6": 1000503,
  "k7": ""
}, {
  "id": 3417,
  "name": "竹南",
  "parent_id": 496,
  "k1": "z",
  "k2": "zn",
  "k3": "zhunan",
  "k4": "",
  "k5": "镇",
  "k6": 1000504,
  "k7": ""
}, {
  "id": 3418,
  "name": "头份",
  "parent_id": 496,
  "k1": "t",
  "k2": "tf",
  "k3": "toufen",
  "k4": "",
  "k5": "镇",
  "k6": 1000505,
  "k7": ""
}, {
  "id": 3419,
  "name": "后龙",
  "parent_id": 496,
  "k1": "h",
  "k2": "hl",
  "k3": "houlong",
  "k4": "",
  "k5": "镇",
  "k6": 1000506,
  "k7": ""
}, {
  "id": 3420,
  "name": "卓兰",
  "parent_id": 496,
  "k1": "z",
  "k2": "zl",
  "k3": "zhuolan",
  "k4": "",
  "k5": "镇",
  "k6": 1000507,
  "k7": ""
}, {
  "id": 3421,
  "name": "大湖",
  "parent_id": 496,
  "k1": "d",
  "k2": "dh",
  "k3": "dahu",
  "k4": "",
  "k5": "乡",
  "k6": 1000508,
  "k7": ""
}, {
  "id": 3422,
  "name": "公馆",
  "parent_id": 496,
  "k1": "g",
  "k2": "gg",
  "k3": "gongguan",
  "k4": "",
  "k5": "乡",
  "k6": 1000509,
  "k7": ""
}, {
  "id": 3423,
  "name": "铜锣",
  "parent_id": 496,
  "k1": "t",
  "k2": "tl",
  "k3": "tongluo",
  "k4": "",
  "k5": "乡",
  "k6": 1000510,
  "k7": ""
}, {
  "id": 3424,
  "name": "南庄",
  "parent_id": 496,
  "k1": "n",
  "k2": "nz",
  "k3": "nanzhuang",
  "k4": "",
  "k5": "乡",
  "k6": 1000511,
  "k7": ""
}, {
  "id": 3425,
  "name": "头屋",
  "parent_id": 496,
  "k1": "t",
  "k2": "tw",
  "k3": "touwu",
  "k4": "",
  "k5": "乡",
  "k6": 1000512,
  "k7": ""
}, {
  "id": 3426,
  "name": "三义",
  "parent_id": 496,
  "k1": "s",
  "k2": "sy",
  "k3": "sanyi",
  "k4": "",
  "k5": "乡",
  "k6": 1000513,
  "k7": ""
}, {
  "id": 3427,
  "name": "西湖",
  "parent_id": 496,
  "k1": "x",
  "k2": "xh",
  "k3": "xihu",
  "k4": "",
  "k5": "乡",
  "k6": 1000514,
  "k7": ""
}, {
  "id": 3428,
  "name": "造桥",
  "parent_id": 496,
  "k1": "z",
  "k2": "zq",
  "k3": "zaoqiao",
  "k4": "",
  "k5": "乡",
  "k6": 1000515,
  "k7": ""
}, {
  "id": 3429,
  "name": "三湾",
  "parent_id": 496,
  "k1": "s",
  "k2": "sw",
  "k3": "sanwan",
  "k4": "",
  "k5": "乡",
  "k6": 1000516,
  "k7": ""
}, {
  "id": 3430,
  "name": "狮潭",
  "parent_id": 496,
  "k1": "s",
  "k2": "st",
  "k3": "shitan",
  "k4": "",
  "k5": "乡",
  "k6": 1000517,
  "k7": ""
}, {
  "id": 3431,
  "name": "泰安",
  "parent_id": 496,
  "k1": "t",
  "k2": "ta",
  "k3": "taian",
  "k4": "",
  "k5": "乡",
  "k6": 1000518,
  "k7": ""
}, {
  "id": 3432,
  "name": "彰化",
  "parent_id": 497,
  "k1": "z",
  "k2": "zh",
  "k3": "zhanghua",
  "k4": "",
  "k5": "市",
  "k6": 1000701,
  "k7": ""
}, {
  "id": 3433,
  "name": "鹿港",
  "parent_id": 497,
  "k1": "l",
  "k2": "lg",
  "k3": "lugang",
  "k4": "",
  "k5": "镇",
  "k6": 1000702,
  "k7": ""
}, {
  "id": 3434,
  "name": "和美",
  "parent_id": 497,
  "k1": "h",
  "k2": "hm",
  "k3": "hemei",
  "k4": "",
  "k5": "镇",
  "k6": 1000703,
  "k7": ""
}, {
  "id": 3435,
  "name": "线西",
  "parent_id": 497,
  "k1": "x",
  "k2": "xx",
  "k3": "xianxi",
  "k4": "",
  "k5": "乡",
  "k6": 1000704,
  "k7": ""
}, {
  "id": 3436,
  "name": "伸港",
  "parent_id": 497,
  "k1": "s",
  "k2": "sg",
  "k3": "shengang",
  "k4": "",
  "k5": "乡",
  "k6": 1000705,
  "k7": ""
}, {
  "id": 3437,
  "name": "福兴",
  "parent_id": 497,
  "k1": "f",
  "k2": "fx",
  "k3": "fuxing",
  "k4": "",
  "k5": "乡",
  "k6": 1000706,
  "k7": ""
}, {
  "id": 3438,
  "name": "秀水",
  "parent_id": 497,
  "k1": "x",
  "k2": "xs",
  "k3": "xiushui",
  "k4": "",
  "k5": "乡",
  "k6": 1000707,
  "k7": ""
}, {
  "id": 3439,
  "name": "花坛",
  "parent_id": 497,
  "k1": "h",
  "k2": "ht",
  "k3": "huatan",
  "k4": "",
  "k5": "乡",
  "k6": 1000708,
  "k7": ""
}, {
  "id": 3440,
  "name": "芬园",
  "parent_id": 497,
  "k1": "f",
  "k2": "fy",
  "k3": "fenyuan",
  "k4": "",
  "k5": "乡",
  "k6": 1000709,
  "k7": ""
}, {
  "id": 3441,
  "name": "员林",
  "parent_id": 497,
  "k1": "y",
  "k2": "yl",
  "k3": "yuanlin",
  "k4": "",
  "k5": "镇",
  "k6": 1000710,
  "k7": ""
}, {
  "id": 3442,
  "name": "溪湖",
  "parent_id": 497,
  "k1": "x",
  "k2": "xh",
  "k3": "xihu",
  "k4": "",
  "k5": "镇",
  "k6": 1000711,
  "k7": ""
}, {
  "id": 3443,
  "name": "田中",
  "parent_id": 497,
  "k1": "t",
  "k2": "tz",
  "k3": "tianzhong",
  "k4": "",
  "k5": "镇",
  "k6": 1000712,
  "k7": ""
}, {
  "id": 3444,
  "name": "大村",
  "parent_id": 497,
  "k1": "d",
  "k2": "dc",
  "k3": "dacun",
  "k4": "",
  "k5": "乡",
  "k6": 1000713,
  "k7": ""
}, {
  "id": 3445,
  "name": "埔盐",
  "parent_id": 497,
  "k1": "p",
  "k2": "py",
  "k3": "puyan",
  "k4": "",
  "k5": "乡",
  "k6": 1000714,
  "k7": ""
}, {
  "id": 3446,
  "name": "埔心",
  "parent_id": 497,
  "k1": "p",
  "k2": "px",
  "k3": "puxin",
  "k4": "",
  "k5": "乡",
  "k6": 1000715,
  "k7": ""
}, {
  "id": 3447,
  "name": "永靖",
  "parent_id": 497,
  "k1": "y",
  "k2": "yj",
  "k3": "yongjing",
  "k4": "",
  "k5": "乡",
  "k6": 1000716,
  "k7": ""
}, {
  "id": 3448,
  "name": "社头",
  "parent_id": 497,
  "k1": "s",
  "k2": "st",
  "k3": "shetou",
  "k4": "",
  "k5": "乡",
  "k6": 1000717,
  "k7": ""
}, {
  "id": 3449,
  "name": "二水",
  "parent_id": 497,
  "k1": "e",
  "k2": "es",
  "k3": "ershui",
  "k4": "",
  "k5": "乡",
  "k6": 1000718,
  "k7": ""
}, {
  "id": 3450,
  "name": "北斗",
  "parent_id": 497,
  "k1": "b",
  "k2": "bd",
  "k3": "beidou",
  "k4": "",
  "k5": "镇",
  "k6": 1000719,
  "k7": ""
}, {
  "id": 3451,
  "name": "二林",
  "parent_id": 497,
  "k1": "e",
  "k2": "el",
  "k3": "erlin",
  "k4": "",
  "k5": "镇",
  "k6": 1000720,
  "k7": ""
}, {
  "id": 3452,
  "name": "田尾",
  "parent_id": 497,
  "k1": "t",
  "k2": "tw",
  "k3": "tianwei",
  "k4": "",
  "k5": "乡",
  "k6": 1000721,
  "k7": ""
}, {
  "id": 3453,
  "name": "埤头",
  "parent_id": 497,
  "k1": "p",
  "k2": "pt",
  "k3": "pitou",
  "k4": "",
  "k5": "乡",
  "k6": 1000722,
  "k7": ""
}, {
  "id": 3454,
  "name": "芳苑",
  "parent_id": 497,
  "k1": "f",
  "k2": "fy",
  "k3": "fangyuan",
  "k4": "",
  "k5": "乡",
  "k6": 1000723,
  "k7": ""
}, {
  "id": 3455,
  "name": "大城",
  "parent_id": 497,
  "k1": "d",
  "k2": "dc",
  "k3": "dacheng",
  "k4": "",
  "k5": "乡",
  "k6": 1000724,
  "k7": ""
}, {
  "id": 3456,
  "name": "竹塘",
  "parent_id": 497,
  "k1": "z",
  "k2": "zt",
  "k3": "zhutang",
  "k4": "",
  "k5": "乡",
  "k6": 1000725,
  "k7": ""
}, {
  "id": 3457,
  "name": "溪州",
  "parent_id": 497,
  "k1": "x",
  "k2": "xz",
  "k3": "xizhou",
  "k4": "",
  "k5": "乡",
  "k6": 1000726,
  "k7": ""
}, {
  "id": 3458,
  "name": "南投",
  "parent_id": 498,
  "k1": "n",
  "k2": "nt",
  "k3": "nantou",
  "k4": "",
  "k5": "市",
  "k6": 1000801,
  "k7": ""
}, {
  "id": 3459,
  "name": "南投",
  "parent_id": 498,
  "k1": "n",
  "k2": "nt",
  "k3": "nantou",
  "k4": "",
  "k5": "镇",
  "k6": 1000802,
  "k7": ""
}, {
  "id": 3460,
  "name": "草屯",
  "parent_id": 498,
  "k1": "c",
  "k2": "ct",
  "k3": "caotun",
  "k4": "",
  "k5": "镇",
  "k6": 1000803,
  "k7": ""
}, {
  "id": 3461,
  "name": "竹山",
  "parent_id": 498,
  "k1": "z",
  "k2": "zs",
  "k3": "zhushan",
  "k4": "",
  "k5": "镇",
  "k6": 1000804,
  "k7": ""
}, {
  "id": 3462,
  "name": "集集",
  "parent_id": 498,
  "k1": "j",
  "k2": "jj",
  "k3": "jiji",
  "k4": "",
  "k5": "镇",
  "k6": 1000805,
  "k7": ""
}, {
  "id": 3463,
  "name": "名间",
  "parent_id": 498,
  "k1": "m",
  "k2": "mj",
  "k3": "mingjian",
  "k4": "",
  "k5": "乡",
  "k6": 1000806,
  "k7": ""
}, {
  "id": 3464,
  "name": "鹿谷",
  "parent_id": 498,
  "k1": "l",
  "k2": "lg",
  "k3": "lugu",
  "k4": "",
  "k5": "乡",
  "k6": 1000807,
  "k7": ""
}, {
  "id": 3465,
  "name": "中寮",
  "parent_id": 498,
  "k1": "z",
  "k2": "zl",
  "k3": "zhongliao",
  "k4": "",
  "k5": "乡",
  "k6": 1000808,
  "k7": ""
}, {
  "id": 3466,
  "name": "鱼池",
  "parent_id": 498,
  "k1": "y",
  "k2": "yc",
  "k3": "yuchi",
  "k4": "",
  "k5": "乡",
  "k6": 1000809,
  "k7": ""
}, {
  "id": 3467,
  "name": "国姓",
  "parent_id": 498,
  "k1": "g",
  "k2": "gx",
  "k3": "guoxing",
  "k4": "",
  "k5": "乡",
  "k6": 1000810,
  "k7": ""
}, {
  "id": 3468,
  "name": "水里",
  "parent_id": 498,
  "k1": "s",
  "k2": "sl",
  "k3": "shuili",
  "k4": "",
  "k5": "乡",
  "k6": 1000811,
  "k7": ""
}, {
  "id": 3469,
  "name": "信义",
  "parent_id": 498,
  "k1": "x",
  "k2": "xy",
  "k3": "xinyi",
  "k4": "",
  "k5": "乡",
  "k6": 1000812,
  "k7": ""
}, {
  "id": 3470,
  "name": "仁爱",
  "parent_id": 498,
  "k1": "r",
  "k2": "ra",
  "k3": "renai",
  "k4": "",
  "k5": "乡",
  "k6": 1000813,
  "k7": ""
}, {
  "id": 3471,
  "name": "斗六",
  "parent_id": 499,
  "k1": "d",
  "k2": "dl",
  "k3": "douliu",
  "k4": "",
  "k5": "市",
  "k6": 1000901,
  "k7": ""
}, {
  "id": 3472,
  "name": "斗南",
  "parent_id": 499,
  "k1": "d",
  "k2": "dn",
  "k3": "dounan",
  "k4": "",
  "k5": "镇",
  "k6": 1000902,
  "k7": ""
}, {
  "id": 3473,
  "name": "虎尾",
  "parent_id": 499,
  "k1": "h",
  "k2": "hw",
  "k3": "huwei",
  "k4": "",
  "k5": "镇",
  "k6": 1000903,
  "k7": ""
}, {
  "id": 3474,
  "name": "西螺",
  "parent_id": 499,
  "k1": "x",
  "k2": "xl",
  "k3": "xiluo",
  "k4": "",
  "k5": "镇",
  "k6": 1000904,
  "k7": ""
}, {
  "id": 3475,
  "name": "土库",
  "parent_id": 499,
  "k1": "t",
  "k2": "tk",
  "k3": "tuku",
  "k4": "",
  "k5": "镇",
  "k6": 1000905,
  "k7": ""
}, {
  "id": 3476,
  "name": "北港",
  "parent_id": 499,
  "k1": "b",
  "k2": "bg",
  "k3": "beigang",
  "k4": "",
  "k5": "镇",
  "k6": 1000906,
  "k7": ""
}, {
  "id": 3477,
  "name": "古坑",
  "parent_id": 499,
  "k1": "g",
  "k2": "gk",
  "k3": "gukeng",
  "k4": "",
  "k5": "乡",
  "k6": 1000907,
  "k7": ""
}, {
  "id": 3478,
  "name": "大埤",
  "parent_id": 499,
  "k1": "d",
  "k2": "dp",
  "k3": "dapi",
  "k4": "",
  "k5": "乡",
  "k6": 1000908,
  "k7": ""
}, {
  "id": 3479,
  "name": "莿桐",
  "parent_id": 499,
  "k1": "c",
  "k2": "ct",
  "k3": "citong",
  "k4": "",
  "k5": "乡",
  "k6": 1000909,
  "k7": ""
}, {
  "id": 3480,
  "name": "林内",
  "parent_id": 499,
  "k1": "l",
  "k2": "ln",
  "k3": "linnei",
  "k4": "",
  "k5": "乡",
  "k6": 1000910,
  "k7": ""
}, {
  "id": 3481,
  "name": "二仑",
  "parent_id": 499,
  "k1": "e",
  "k2": "el",
  "k3": "erlun",
  "k4": "",
  "k5": "乡",
  "k6": 1000911,
  "k7": ""
}, {
  "id": 3482,
  "name": "仑背",
  "parent_id": 499,
  "k1": "l",
  "k2": "lb",
  "k3": "lunbei",
  "k4": "",
  "k5": "乡",
  "k6": 1000912,
  "k7": ""
}, {
  "id": 3483,
  "name": "麦寮",
  "parent_id": 499,
  "k1": "m",
  "k2": "ml",
  "k3": "mailiao",
  "k4": "",
  "k5": "乡",
  "k6": 1000913,
  "k7": ""
}, {
  "id": 3484,
  "name": "东势",
  "parent_id": 499,
  "k1": "d",
  "k2": "ds",
  "k3": "dongshi",
  "k4": "",
  "k5": "乡",
  "k6": 1000914,
  "k7": ""
}, {
  "id": 3485,
  "name": "褒忠",
  "parent_id": 499,
  "k1": "b",
  "k2": "bz",
  "k3": "baozhong",
  "k4": "",
  "k5": "乡",
  "k6": 1000915,
  "k7": ""
}, {
  "id": 3486,
  "name": "台西",
  "parent_id": 499,
  "k1": "t",
  "k2": "tx",
  "k3": "taixi",
  "k4": "",
  "k5": "乡",
  "k6": 1000916,
  "k7": ""
}, {
  "id": 3487,
  "name": "元长",
  "parent_id": 499,
  "k1": "y",
  "k2": "yc",
  "k3": "yuanchang",
  "k4": "",
  "k5": "乡",
  "k6": 1000917,
  "k7": ""
}, {
  "id": 3488,
  "name": "四湖",
  "parent_id": 499,
  "k1": "s",
  "k2": "sh",
  "k3": "sihu",
  "k4": "",
  "k5": "乡",
  "k6": 1000918,
  "k7": ""
}, {
  "id": 3489,
  "name": "口湖",
  "parent_id": 499,
  "k1": "k",
  "k2": "kh",
  "k3": "kouhu",
  "k4": "",
  "k5": "乡",
  "k6": 1000919,
  "k7": ""
}, {
  "id": 3490,
  "name": "水林",
  "parent_id": 499,
  "k1": "s",
  "k2": "sl",
  "k3": "shuilin",
  "k4": "",
  "k5": "乡",
  "k6": 1000920,
  "k7": ""
}, {
  "id": 3491,
  "name": "太保",
  "parent_id": 500,
  "k1": "t",
  "k2": "tb",
  "k3": "taibao",
  "k4": "",
  "k5": "市",
  "k6": "",
  "k7": ""
}, {
  "id": 3492,
  "name": "朴子",
  "parent_id": 500,
  "k1": "p",
  "k2": "pz",
  "k3": "pozi",
  "k4": "",
  "k5": "市",
  "k6": "",
  "k7": ""
}, {
  "id": 3493,
  "name": "布袋",
  "parent_id": 500,
  "k1": "b",
  "k2": "bd",
  "k3": "budai",
  "k4": "",
  "k5": "镇",
  "k6": "",
  "k7": ""
}, {
  "id": 3494,
  "name": "大林",
  "parent_id": 500,
  "k1": "d",
  "k2": "dl",
  "k3": "dalin",
  "k4": "",
  "k5": "镇",
  "k6": 10010,
  "k7": ""
}, {
  "id": 3495,
  "name": "民雄",
  "parent_id": 500,
  "k1": "m",
  "k2": "mx",
  "k3": "minxiong",
  "k4": "",
  "k5": "乡",
  "k6": 1001001,
  "k7": ""
}, {
  "id": 3496,
  "name": "溪口",
  "parent_id": 500,
  "k1": "x",
  "k2": "xk",
  "k3": "xikou",
  "k4": "",
  "k5": "乡",
  "k6": 1001002,
  "k7": ""
}, {
  "id": 3497,
  "name": "新港",
  "parent_id": 500,
  "k1": "x",
  "k2": "xg",
  "k3": "xingang",
  "k4": "",
  "k5": "乡",
  "k6": 1001003,
  "k7": ""
}, {
  "id": 3498,
  "name": "六脚",
  "parent_id": 500,
  "k1": "l",
  "k2": "lj",
  "k3": "liujiao",
  "k4": "",
  "k5": "乡",
  "k6": 1001004,
  "k7": ""
}, {
  "id": 3499,
  "name": "东石",
  "parent_id": 500,
  "k1": "d",
  "k2": "ds",
  "k3": "dongshi",
  "k4": "",
  "k5": "乡",
  "k6": 1001005,
  "k7": ""
}, {
  "id": 3500,
  "name": "义竹",
  "parent_id": 500,
  "k1": "y",
  "k2": "yz",
  "k3": "yizhu",
  "k4": "",
  "k5": "乡",
  "k6": 1001006,
  "k7": ""
}, {
  "id": 3501,
  "name": "鹿草",
  "parent_id": 500,
  "k1": "l",
  "k2": "lc",
  "k3": "lucao",
  "k4": "",
  "k5": "乡",
  "k6": 1001007,
  "k7": ""
}, {
  "id": 3502,
  "name": "水上",
  "parent_id": 500,
  "k1": "s",
  "k2": "ss",
  "k3": "shuishang",
  "k4": "",
  "k5": "乡",
  "k6": 1001008,
  "k7": ""
}, {
  "id": 3503,
  "name": "中埔",
  "parent_id": 500,
  "k1": "z",
  "k2": "zp",
  "k3": "zhongpu",
  "k4": "",
  "k5": "乡",
  "k6": 1001009,
  "k7": ""
}, {
  "id": 3504,
  "name": "竹崎",
  "parent_id": 500,
  "k1": "z",
  "k2": "zq",
  "k3": "zhuqi",
  "k4": "",
  "k5": "乡",
  "k6": 1001010,
  "k7": ""
}, {
  "id": 3505,
  "name": "梅山",
  "parent_id": 500,
  "k1": "m",
  "k2": "ms",
  "k3": "meishan",
  "k4": "",
  "k5": "乡",
  "k6": 1001011,
  "k7": ""
}, {
  "id": 3506,
  "name": "番路",
  "parent_id": 500,
  "k1": "f",
  "k2": "fl",
  "k3": "fanlu",
  "k4": "",
  "k5": "乡",
  "k6": 1001012,
  "k7": ""
}, {
  "id": 3507,
  "name": "大埔",
  "parent_id": 500,
  "k1": "d",
  "k2": "dp",
  "k3": "dapu",
  "k4": "",
  "k5": "乡",
  "k6": 1001013,
  "k7": ""
}, {
  "id": 3508,
  "name": "阿里山",
  "parent_id": 500,
  "k1": "a",
  "k2": "als",
  "k3": "alishan",
  "k4": "",
  "k5": "乡",
  "k6": 1001014,
  "k7": ""
}, {
  "id": 3509,
  "name": "屏东",
  "parent_id": 501,
  "k1": "p",
  "k2": "pd",
  "k3": "pingdong",
  "k4": "",
  "k5": "市",
  "k6": 1001301,
  "k7": ""
}, {
  "id": 3510,
  "name": "潮州",
  "parent_id": 501,
  "k1": "c",
  "k2": "cz",
  "k3": "chaozhou",
  "k4": "",
  "k5": "镇",
  "k6": 1001302,
  "k7": ""
}, {
  "id": 3511,
  "name": "东港",
  "parent_id": 501,
  "k1": "d",
  "k2": "dg",
  "k3": "donggang",
  "k4": "",
  "k5": "镇",
  "k6": 1001303,
  "k7": ""
}, {
  "id": 3512,
  "name": "恒春",
  "parent_id": 501,
  "k1": "h",
  "k2": "hc",
  "k3": "hengchun",
  "k4": "",
  "k5": "镇",
  "k6": 1001304,
  "k7": ""
}, {
  "id": 3513,
  "name": "万丹",
  "parent_id": 501,
  "k1": "w",
  "k2": "wd",
  "k3": "wandan",
  "k4": "",
  "k5": "乡",
  "k6": 1001305,
  "k7": ""
}, {
  "id": 3514,
  "name": "长治",
  "parent_id": 501,
  "k1": "c",
  "k2": "cz",
  "k3": "changzhi",
  "k4": "",
  "k5": "乡",
  "k6": 1001306,
  "k7": ""
}, {
  "id": 3515,
  "name": "麟洛",
  "parent_id": 501,
  "k1": "l",
  "k2": "ll",
  "k3": "linluo",
  "k4": "",
  "k5": "乡",
  "k6": 1001307,
  "k7": ""
}, {
  "id": 3516,
  "name": "九如",
  "parent_id": 501,
  "k1": "j",
  "k2": "jr",
  "k3": "jiuru",
  "k4": "",
  "k5": "乡",
  "k6": 1001308,
  "k7": ""
}, {
  "id": 3517,
  "name": "里港",
  "parent_id": 501,
  "k1": "l",
  "k2": "lg",
  "k3": "ligang",
  "k4": "",
  "k5": "乡",
  "k6": 1001309,
  "k7": ""
}, {
  "id": 3518,
  "name": "盐埔",
  "parent_id": 501,
  "k1": "y",
  "k2": "yp",
  "k3": "yanpu",
  "k4": "",
  "k5": "乡",
  "k6": 1001310,
  "k7": ""
}, {
  "id": 3519,
  "name": "高树",
  "parent_id": 501,
  "k1": "g",
  "k2": "gs",
  "k3": "gaoshu",
  "k4": "",
  "k5": "乡",
  "k6": 1001311,
  "k7": ""
}, {
  "id": 3520,
  "name": "万峦",
  "parent_id": 501,
  "k1": "w",
  "k2": "wl",
  "k3": "wanluan",
  "k4": "",
  "k5": "乡",
  "k6": 1001312,
  "k7": ""
}, {
  "id": 3521,
  "name": "内埔",
  "parent_id": 501,
  "k1": "n",
  "k2": "np",
  "k3": "neipu",
  "k4": "",
  "k5": "乡",
  "k6": 1001313,
  "k7": ""
}, {
  "id": 3522,
  "name": "竹田",
  "parent_id": 501,
  "k1": "z",
  "k2": "zt",
  "k3": "zhutian",
  "k4": "",
  "k5": "乡",
  "k6": 1001314,
  "k7": ""
}, {
  "id": 3523,
  "name": "新埤",
  "parent_id": 501,
  "k1": "x",
  "k2": "xp",
  "k3": "xinpi",
  "k4": "",
  "k5": "乡",
  "k6": 1001315,
  "k7": ""
}, {
  "id": 3524,
  "name": "枋寮",
  "parent_id": 501,
  "k1": "f",
  "k2": "fl",
  "k3": "fangliao",
  "k4": "",
  "k5": "乡",
  "k6": 1001316,
  "k7": ""
}, {
  "id": 3525,
  "name": "新园",
  "parent_id": 501,
  "k1": "x",
  "k2": "xy",
  "k3": "xinyuan",
  "k4": "",
  "k5": "乡",
  "k6": 1001317,
  "k7": ""
}, {
  "id": 3526,
  "name": "崁顶",
  "parent_id": 501,
  "k1": "k",
  "k2": "kd",
  "k3": "kanding",
  "k4": "",
  "k5": "乡",
  "k6": 1001318,
  "k7": ""
}, {
  "id": 3527,
  "name": "林边",
  "parent_id": 501,
  "k1": "l",
  "k2": "lb",
  "k3": "linbian",
  "k4": "",
  "k5": "乡",
  "k6": 1001319,
  "k7": ""
}, {
  "id": 3528,
  "name": "南州",
  "parent_id": 501,
  "k1": "n",
  "k2": "nz",
  "k3": "nanzhou",
  "k4": "",
  "k5": "乡",
  "k6": 1001320,
  "k7": ""
}, {
  "id": 3529,
  "name": "佳冬",
  "parent_id": 501,
  "k1": "j",
  "k2": "jd",
  "k3": "jiadong",
  "k4": "",
  "k5": "乡",
  "k6": 1001321,
  "k7": ""
}, {
  "id": 3530,
  "name": "琉球",
  "parent_id": 501,
  "k1": "l",
  "k2": "lq",
  "k3": "liuqiu",
  "k4": "",
  "k5": "乡",
  "k6": 1001322,
  "k7": ""
}, {
  "id": 3531,
  "name": "车城",
  "parent_id": 501,
  "k1": "c",
  "k2": "cc",
  "k3": "checheng",
  "k4": "",
  "k5": "乡",
  "k6": 1001323,
  "k7": ""
}, {
  "id": 3532,
  "name": "满州",
  "parent_id": 501,
  "k1": "m",
  "k2": "mz",
  "k3": "manzhou",
  "k4": "",
  "k5": "乡",
  "k6": 1001324,
  "k7": ""
}, {
  "id": 3533,
  "name": "枋山",
  "parent_id": 501,
  "k1": "f",
  "k2": "fs",
  "k3": "fangshan",
  "k4": "",
  "k5": "乡",
  "k6": 1001325,
  "k7": ""
}, {
  "id": 3534,
  "name": "三地门",
  "parent_id": 501,
  "k1": "s",
  "k2": "sdm",
  "k3": "sandimen",
  "k4": "",
  "k5": "乡",
  "k6": 1001326,
  "k7": ""
}, {
  "id": 3535,
  "name": "雾台",
  "parent_id": 501,
  "k1": "w",
  "k2": "wt",
  "k3": "wutai",
  "k4": "",
  "k5": "乡",
  "k6": 1001327,
  "k7": ""
}, {
  "id": 3536,
  "name": "玛家",
  "parent_id": 501,
  "k1": "m",
  "k2": "mj",
  "k3": "majia",
  "k4": "",
  "k5": "乡",
  "k6": 1001328,
  "k7": ""
}, {
  "id": 3537,
  "name": "泰武",
  "parent_id": 501,
  "k1": "t",
  "k2": "tw",
  "k3": "taiwu",
  "k4": "",
  "k5": "乡",
  "k6": 1001329,
  "k7": ""
}, {
  "id": 3538,
  "name": "来义",
  "parent_id": 501,
  "k1": "l",
  "k2": "ly",
  "k3": "laiyi",
  "k4": "",
  "k5": "乡",
  "k6": 1001330,
  "k7": ""
}, {
  "id": 3539,
  "name": "春日",
  "parent_id": 501,
  "k1": "c",
  "k2": "cr",
  "k3": "chunri",
  "k4": "",
  "k5": "乡",
  "k6": 1001331,
  "k7": ""
}, {
  "id": 3540,
  "name": "狮子",
  "parent_id": 501,
  "k1": "s",
  "k2": "sz",
  "k3": "shizi",
  "k4": "",
  "k5": "乡",
  "k6": 1001332,
  "k7": ""
}, {
  "id": 3541,
  "name": "牡丹",
  "parent_id": 501,
  "k1": "m",
  "k2": "md",
  "k3": "mudan",
  "k4": "",
  "k5": "乡",
  "k6": 1001333,
  "k7": ""
}, {
  "id": 3542,
  "name": "卑南",
  "parent_id": 502,
  "k1": "b",
  "k2": "bn",
  "k3": "beinan",
  "k4": "",
  "k5": "乡",
  "k6": "",
  "k7": ""
}, {
  "id": 3543,
  "name": "台东",
  "parent_id": 502,
  "k1": "t",
  "k2": "td",
  "k3": "taidong",
  "k4": "",
  "k5": "市",
  "k6": 1001401,
  "k7": ""
}, {
  "id": 3544,
  "name": "成功",
  "parent_id": 502,
  "k1": "c",
  "k2": "cg",
  "k3": "chenggong",
  "k4": "",
  "k5": "镇",
  "k6": 1001402,
  "k7": ""
}, {
  "id": 3545,
  "name": "关山",
  "parent_id": 502,
  "k1": "g",
  "k2": "gs",
  "k3": "guanshan",
  "k4": "",
  "k5": "镇",
  "k6": 1001403,
  "k7": ""
}, {
  "id": 3546,
  "name": "鹿野",
  "parent_id": 502,
  "k1": "l",
  "k2": "ly",
  "k3": "luye",
  "k4": "",
  "k5": "乡",
  "k6": 1001405,
  "k7": ""
}, {
  "id": 3547,
  "name": "池上",
  "parent_id": 502,
  "k1": "c",
  "k2": "cs",
  "k3": "chishang",
  "k4": "",
  "k5": "乡",
  "k6": 1001406,
  "k7": ""
}, {
  "id": 3548,
  "name": "东河",
  "parent_id": 502,
  "k1": "d",
  "k2": "dh",
  "k3": "donghe",
  "k4": "",
  "k5": "乡",
  "k6": 1001407,
  "k7": ""
}, {
  "id": 3549,
  "name": "长滨",
  "parent_id": 502,
  "k1": "c",
  "k2": "cb",
  "k3": "changbin",
  "k4": "",
  "k5": "乡",
  "k6": 1001408,
  "k7": ""
}, {
  "id": 3550,
  "name": "太麻里",
  "parent_id": 502,
  "k1": "t",
  "k2": "tml",
  "k3": "taimali",
  "k4": "",
  "k5": "乡",
  "k6": 1001409,
  "k7": ""
}, {
  "id": 3551,
  "name": "大武",
  "parent_id": 502,
  "k1": "d",
  "k2": "dw",
  "k3": "dawu",
  "k4": "",
  "k5": "乡",
  "k6": 1001410,
  "k7": ""
}, {
  "id": 3552,
  "name": "绿岛",
  "parent_id": 502,
  "k1": "l",
  "k2": "ld",
  "k3": "lu:dao",
  "k4": "",
  "k5": "乡",
  "k6": 1001411,
  "k7": ""
}, {
  "id": 3553,
  "name": "海端",
  "parent_id": 502,
  "k1": "h",
  "k2": "hd",
  "k3": "haiduan",
  "k4": "",
  "k5": "乡",
  "k6": 1001412,
  "k7": ""
}, {
  "id": 3554,
  "name": "延平",
  "parent_id": 502,
  "k1": "y",
  "k2": "yp",
  "k3": "yanping",
  "k4": "",
  "k5": "乡",
  "k6": 1001413,
  "k7": ""
}, {
  "id": 3555,
  "name": "金峰",
  "parent_id": 502,
  "k1": "j",
  "k2": "jf",
  "k3": "jinfeng",
  "k4": "",
  "k5": "乡",
  "k6": 1001414,
  "k7": ""
}, {
  "id": 3556,
  "name": "达仁",
  "parent_id": 502,
  "k1": "d",
  "k2": "dr",
  "k3": "daren",
  "k4": "",
  "k5": "乡",
  "k6": 1001415,
  "k7": ""
}, {
  "id": 3557,
  "name": "兰屿",
  "parent_id": 502,
  "k1": "l",
  "k2": "ly",
  "k3": "lanyu",
  "k4": "",
  "k5": "乡",
  "k6": 1001416,
  "k7": ""
}, {
  "id": 3558,
  "name": "花莲",
  "parent_id": 503,
  "k1": "h",
  "k2": "hl",
  "k3": "hualian",
  "k4": "",
  "k5": "市",
  "k6": 1001501,
  "k7": ""
}, {
  "id": 3559,
  "name": "凤林",
  "parent_id": 503,
  "k1": "f",
  "k2": "fl",
  "k3": "fenglin",
  "k4": "",
  "k5": "镇",
  "k6": 1001502,
  "k7": ""
}, {
  "id": 3560,
  "name": "玉里",
  "parent_id": 503,
  "k1": "y",
  "k2": "yl",
  "k3": "yuli",
  "k4": "",
  "k5": "镇",
  "k6": 1001503,
  "k7": ""
}, {
  "id": 3561,
  "name": "新城",
  "parent_id": 503,
  "k1": "x",
  "k2": "xc",
  "k3": "xincheng",
  "k4": "",
  "k5": "乡",
  "k6": 1001504,
  "k7": ""
}, {
  "id": 3562,
  "name": "吉安",
  "parent_id": 503,
  "k1": "j",
  "k2": "ja",
  "k3": "jian",
  "k4": "",
  "k5": "乡",
  "k6": 1001505,
  "k7": ""
}, {
  "id": 3563,
  "name": "寿丰",
  "parent_id": 503,
  "k1": "s",
  "k2": "sf",
  "k3": "shoufeng",
  "k4": "",
  "k5": "乡",
  "k6": 1001506,
  "k7": ""
}, {
  "id": 3564,
  "name": "光复",
  "parent_id": 503,
  "k1": "g",
  "k2": "gf",
  "k3": "guangfu",
  "k4": "",
  "k5": "乡",
  "k6": 1001507,
  "k7": ""
}, {
  "id": 3565,
  "name": "丰滨",
  "parent_id": 503,
  "k1": "f",
  "k2": "fb",
  "k3": "fengbin",
  "k4": "",
  "k5": "乡",
  "k6": 1001508,
  "k7": ""
}, {
  "id": 3566,
  "name": "瑞穗",
  "parent_id": 503,
  "k1": "r",
  "k2": "rs",
  "k3": "ruisui",
  "k4": "",
  "k5": "乡",
  "k6": 1001509,
  "k7": ""
}, {
  "id": 3567,
  "name": "富里",
  "parent_id": 503,
  "k1": "f",
  "k2": "fl",
  "k3": "fuli",
  "k4": "",
  "k5": "乡",
  "k6": 1001510,
  "k7": ""
}, {
  "id": 3568,
  "name": "秀林",
  "parent_id": 503,
  "k1": "x",
  "k2": "xl",
  "k3": "xiulin",
  "k4": "",
  "k5": "乡",
  "k6": 1001511,
  "k7": ""
}, {
  "id": 3569,
  "name": "万荣",
  "parent_id": 503,
  "k1": "w",
  "k2": "wr",
  "k3": "wanrong",
  "k4": "",
  "k5": "乡",
  "k6": 1001512,
  "k7": ""
}, {
  "id": 3570,
  "name": "卓溪",
  "parent_id": 503,
  "k1": "z",
  "k2": "zx",
  "k3": "zhuoxi",
  "k4": "",
  "k5": "乡",
  "k6": 1001513,
  "k7": ""
}, {
  "id": 3571,
  "name": "马公",
  "parent_id": 504,
  "k1": "m",
  "k2": "mg",
  "k3": "magong",
  "k4": "",
  "k5": "市",
  "k6": 1001601,
  "k7": "07"
}, {
  "id": 3572,
  "name": "湖西",
  "parent_id": 504,
  "k1": "h",
  "k2": "hx",
  "k3": "huxi",
  "k4": "",
  "k5": "乡",
  "k6": 1001602,
  "k7": "07"
}, {
  "id": 3573,
  "name": "白沙",
  "parent_id": 504,
  "k1": "b",
  "k2": "bs",
  "k3": "baisha",
  "k4": "",
  "k5": "乡",
  "k6": 1001603,
  "k7": "07"
}, {
  "id": 3574,
  "name": "西屿",
  "parent_id": 504,
  "k1": "x",
  "k2": "xy",
  "k3": "xiyu",
  "k4": "",
  "k5": "乡",
  "k6": 1001604,
  "k7": "07"
}, {
  "id": 3575,
  "name": "望安",
  "parent_id": 504,
  "k1": "w",
  "k2": "wa",
  "k3": "wangan",
  "k4": "",
  "k5": "乡",
  "k6": 1001605,
  "k7": "07"
}, {
  "id": 3576,
  "name": "七美",
  "parent_id": 504,
  "k1": "q",
  "k2": "qm",
  "k3": "qimei",
  "k4": "",
  "k5": "乡",
  "k6": 1001606,
  "k7": "07"
}, {
  "id": 3577,
  "name": "双河",
  "parent_id": 31,
  "k1": "s",
  "k2": "sh",
  "k3": "shuanghe",
  "k4": "",
  "k5": "市",
  "k6": 659007,
  "k7": "0909"
}, {
  "id": 3578,
  "name": "海棠",
  "parent_id": 357,
  "k1": "h",
  "k2": "ht",
  "k3": "haitang",
  "k4": "",
  "k5": "区",
  "k6": "",
  "k7": "0898"
}, {
  "id": 3579,
  "name": "吉阳",
  "parent_id": 357,
  "k1": "j",
  "k2": "jy",
  "k3": "jiyang",
  "k4": "",
  "k5": "区",
  "k6": "",
  "k7": "0898"
}, {
  "id": 3580,
  "name": "天涯",
  "parent_id": 357,
  "k1": "t",
  "k2": "ty",
  "k3": "tianya",
  "k4": "",
  "k5": "区",
  "k6": "",
  "k7": "0898"
}, {
  "id": 3581,
  "name": "崖州",
  "parent_id": 357,
  "k1": "y",
  "k2": "yz",
  "k3": "yazhou",
  "k4": "",
  "k5": "区",
  "k6": "",
  "k7": "0898"
}, {
  "id": 3582,
  "name": "霍尔果斯",
  "parent_id": 476,
  "k1": "h",
  "k2": "hegs",
  "k3": "huoerguosi",
  "k4": "",
  "k5": "市",
  "k6": 654004,
  "k7": "0999"
}, {
  "id": 3583,
  "name": "前锋",
  "parent_id": 388,
  "k1": "q",
  "k2": "qf",
  "k3": "qianfeng",
  "k4": "",
  "k5": "区",
  "k6": "",
  "k7": "0826"
}, {
  "id": 3584,
  "name": "福绵",
  "parent_id": 350,
  "k1": "f",
  "k2": "fm",
  "k3": "fumian",
  "k4": "",
  "k5": "区",
  "k6": 450903,
  "k7": "0775"
}, {
  "id": 3585,
  "name": "可克达拉",
  "parent_id": 31,
  "k1": "k",
  "k2": "kdkl",
  "k3": "kedakela",
  "k4": "",
  "k5": "市",
  "k6": 659008,
  "k7": "0999"
}, {
  "id": 7036,
  "name": "龙华",
  "parent_id": 323,
  "k1": "l",
  "k2": "lh",
  "k3": "longhua",
  "k4": "",
  "k5": "区",
  "k6": 440309,
  "k7": "0755"
}, {
  "id": 7037,
  "name": "坪山",
  "parent_id": 323,
  "k1": "p",
  "k2": "ps",
  "k3": "pingshan",
  "k4": "",
  "k5": "区",
  "k6": 440310,
  "k7": "0755"
}, {
  "id": 7038,
  "name": "昆玉",
  "parent_id": 31,
  "k1": "k",
  "k2": "ky",
  "k3": "kunyu",
  "k4": "",
  "k5": "市",
  "k6": 659009,
  "k7": "0903"
}, {
  "id": 7039,
  "name": "平桂",
  "parent_id": 352,
  "k1": "p",
  "k2": "pg",
  "k3": "pinggui",
  "k4": "",
  "k5": "区",
  "k6": 451103,
  "k7": "0774"
}, {
  "id": 7040,
  "name": "巴什",
  "parent_id": 152,
  "k1": "b",
  "k2": "bs",
  "k3": "bashi",
  "k4": "",
  "k5": "区",
  "k6": 150603,
  "k7": "0477"
}, {
  "id": 7041,
  "name": "叶集",
  "parent_id": 231,
  "k1": "y",
  "k2": "yj",
  "k3": "yeji",
  "k4": "",
  "k5": "区",
  "k6": "",
  "k7": "0564"
}, {
  "id": 7042,
  "name": "光明",
  "parent_id": 323,
  "k1": "g",
  "k2": "gm",
  "k3": "guangming",
  "k4": "",
  "k5": "区",
  "k6": 440311,
  "k7": "0755"
}];
exports.default = _default;
},{}],"src/app.js":[function(require,module,exports) {
"use strict";

var _vue = _interopRequireDefault(require("vue"));

var _gButton = _interopRequireDefault(require("./g-button.vue"));

var _gIcon = _interopRequireDefault(require("./g-icon.vue"));

var _gButtonGrounp = _interopRequireDefault(require("./g-button-grounp.vue"));

var _gInput = _interopRequireDefault(require("./g-input.vue"));

var _gCol = _interopRequireDefault(require("./g-col.vue"));

var _gRow = _interopRequireDefault(require("./g-row.vue"));

var _gToast = _interopRequireDefault(require("./g-toast.vue"));

var _plugin = _interopRequireDefault(require("./plugin"));

var _gTab = _interopRequireDefault(require("./g-tab.vue"));

var _gTabHeader = _interopRequireDefault(require("./g-tab-header.vue"));

var _gTabBody = _interopRequireDefault(require("./g-tab-body.vue"));

var _gTabItem = _interopRequireDefault(require("./g-tab-item.vue"));

var _gTabPane = _interopRequireDefault(require("./g-tab-pane.vue"));

var _gPopover = _interopRequireDefault(require("./g-popover.vue"));

var _gCollapse = _interopRequireDefault(require("./g-collapse.vue"));

var _gCollapseItem = _interopRequireDefault(require("./g-collapse-item.vue"));

var _gCascader = _interopRequireDefault(require("./g-cascader.vue"));

var _gCascaderItem = _interopRequireDefault(require("./g-cascader-item.vue"));

var _db = _interopRequireDefault(require("./db.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//tab主件群
//popover组件
//collapse组件
//cascader组件
_vue.default.component('g-button', _gButton.default);

_vue.default.component('g-icon', _gIcon.default);

_vue.default.component('g-button-grounp', _gButtonGrounp.default);

_vue.default.component('g-input', _gInput.default);

_vue.default.component('g-row', _gRow.default);

_vue.default.component('g-col', _gCol.default);

_vue.default.use(_plugin.default); //tab组件群


_vue.default.component('g-tab', _gTab.default);

_vue.default.component('g-tab-header', _gTabHeader.default);

_vue.default.component('g-tab-body', _gTabBody.default);

_vue.default.component('g-tab-item', _gTabItem.default);

_vue.default.component('g-tab-pane', _gTabPane.default); //popover组件


_vue.default.component('g-popover', _gPopover.default); //collapse组件


_vue.default.component('g-collapse', _gCollapse.default);

_vue.default.component('g-collapse-item', _gCollapseItem.default); //cascader组件


_vue.default.component('g-cascader', _gCascader.default);

_vue.default.component('g-cascader-item', _gCascaderItem.default);

function ajax() {
  var parentId = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
  return new Promise(function (resolve, reject) {
    setTimeout(function () {
      var result = _db.default.filter(function (item) {
        return item.parent_id == parentId;
      });

      result.forEach(function (node) {
        if (_db.default.filter(function (item) {
          return item.parent_id == node.id;
        }).length > 0) {
          node.isLeaf = false;
        } else {
          node.isLeaf = true;
        }
      });
      resolve(result);
    }, 2000);
  });
}

new _vue.default({
  el: '#app',
  data: {
    message: 'hihi',
    loading1: false,
    loading2: true,
    loading3: false,
    loading4: false,
    inputValue: 9,
    selected: [],
    selectedTab: 'sports',
    collapseSelected: ['1', '2'],
    source: [],
    isShow: true,
    isShow2: true,
    isShow3: true,
    view: 'v-a',
    items: [1, 2, 3, 4, 5, 6],
    nextNum: 7
  },
  components: {
    'v-a': {
      template: '<div>Component A</div>'
    },
    'v-b': {
      template: '<div>Component B</div>'
    }
  },
  created: function created() {
    var _this = this;

    ajax(0).then(function (result) {
      _this.source = result;
    });
  },
  methods: {
    randomIndex: function randomIndex() {
      return Math.floor(Math.random() * this.items.length);
    },
    add: function add() {
      this.items.splice(this.randomIndex(), 0, this.nextNum++);
    },
    remove: function remove() {
      this.items.splice(this.randomIndex(), 1);
    },
    loadData: function loadData(item, updateSource) {
      var id = item.id;
      ajax(id).then(function (result) {
        updateSource(result);
      });
    },
    //xxx(){
    //    ajax(this.selected[0].id).then(result => {
    //        let lastLevelSelected = this.source.filter(item => item.id === this.selected[0].id)[0]
    //        //一开始没有申明的属性,用$set方法
    //        this.$set(lastLevelSelected,'children',result)
    //    })
    //},
    changeInput: function changeInput(e) {
      console.log(e);

      for (var _len = arguments.length, array = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
        array[_key - 1] = arguments[_key];
      }

      console.log(array);
    },
    onInput: function onInput(e) {
      console.log(e);
    },
    focusInput: function focusInput(e) {
      console.log(e);
    },
    blurInput: function blurInput(e) {
      console.log(e);
    },
    showToast1: function showToast1() {
      this.showToast('top');
    },
    showToast2: function showToast2() {
      this.showToast('center');
    },
    showToast3: function showToast3() {
      this.showToast('bottom');
    },
    showToast: function showToast(position) {
      //console.log(position)
      this.$toast("\u667A\u5546:".concat(parseInt(Math.random() * 100), "<a href=\"https://cn.vuejs.org/\" >\u5F88\u591A\u591A\u94B1\u591A\u591A\u5F88\u591A\u591A\u94B1\u591A\u591A\u5F88\u591A\u591A\u94B1\u591A\u591A\u5F88\u591A\u591A\u94B1\u591A\u591A\u5F88\u591A\u591A\u94B1\u591A\u591A\u5F88\u591A\u591A\u94B1\u591A\u591A\u5F88\u591A\u591A\u94B1\u591A\u591A\u5F88\u591A\u591A\u94B1\u591A\u591A\u5F88\u591A\u591A\u94B1\u591A\u591A</a>"), {
        position: position,
        closeButton: {
          text: '我知道用的Vue',
          enableHtml: true,
          callback: function callback(toast) {
            toast.log();
          }
        }
      });
    }
  }
});
},{"vue":"node_modules/vue/dist/vue.common.js","./g-button.vue":"src/g-button.vue","./g-icon.vue":"src/g-icon.vue","./g-button-grounp.vue":"src/g-button-grounp.vue","./g-input.vue":"src/g-input.vue","./g-col.vue":"src/g-col.vue","./g-row.vue":"src/g-row.vue","./g-toast.vue":"src/g-toast.vue","./plugin":"src/plugin.js","./g-tab.vue":"src/g-tab.vue","./g-tab-header.vue":"src/g-tab-header.vue","./g-tab-body.vue":"src/g-tab-body.vue","./g-tab-item.vue":"src/g-tab-item.vue","./g-tab-pane.vue":"src/g-tab-pane.vue","./g-popover.vue":"src/g-popover.vue","./g-collapse.vue":"src/g-collapse.vue","./g-collapse-item.vue":"src/g-collapse-item.vue","./g-cascader.vue":"src/g-cascader.vue","./g-cascader-item.vue":"src/g-cascader-item.vue","./db.js":"src/db.js"}],"C:/Users/38092/AppData/Roaming/npm/node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}

module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;

if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "49911" + '/');

  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);

          if (didAccept) {
            handled = true;
          }
        }
      }); // Enable HMR for CSS by default.

      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });

      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else {
        window.location.reload();
      }
    }

    if (data.type === 'reload') {
      ws.close();

      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);

  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID; // html encode message and stack trace

  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];

      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }

  if (checkedAssets[id]) {
    return;
  }

  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}

function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};

  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });

    return true;
  }
}
},{}]},{},["C:/Users/38092/AppData/Roaming/npm/node_modules/parcel-bundler/src/builtins/hmr-runtime.js","src/app.js"], null)
//# sourceMappingURL=/app.a6a4d504.js.map