(function(window, angular, $, inject, undefined) {
  var h = window.h = {};

  /**
   * Sets the jQuery function available as h.$, which is also used in some h.*
   * methods such as h.compile to wrap elements with. By default jQuery would
   * be found on the global window object if available. Setting this to false
   * tells angular-spec-helpers to not use jQuery at all and stick with the
   * angular.element function (note that angular.element may still be using
   * jQuery if jQuery is loaded before Angular). Setting it to true on the other
   * hand will restore the original behaviour which is to look for jQuery on the
   * global window object.
   * @param {function|boolean} jQuery The jQuery function to use, or true/false
   * to respectively use window.jQuery, or no jQuery at all.
   */
  h.useJQuery = function(jQuery) {
    h.$ = typeof jQuery === 'function' ? jQuery : (!!jQuery ? $ : null);

    if(!h.$) {
      h.$ = function() {
        throw new Error("jQuery is not available to angular-spec-helpers. " +
            "It either could not be found on the global window object, or " +
            "angular-spec-helpers has been instructed to not use jQuery " +
            "through a call to h.useJQuery(false)");
      };

      h.$.NA = true;
    }
  };

  h.useJQuery($);

  /**
   * Gets an Angular injectable (e.g. service, value, constant, etc)
   * @param {string} toInject The name of the injectable to inject
   * @returns {*} The injected service
   */
  h.inject = function(toInject) {
    var result = null;

    inject([toInject, function(injected) {
      result = injected;
    }]);

    return result;
  };

  /**
   * Gets an Angular Provider
   * @param {string} moduleName The name of the module that registers the
   * provider.
   * @param {string} providerName The name of the Provider to get. Specifying
   * the 'Provider' suffix is not necessary and will be added automatically.
   * @returns {*} The Provider object
   */
  h.getProvider = function(moduleName, providerName) {
    var provider;

    module(moduleName);

    if(providerName.indexOf('Provider') === -1) {
      providerName += 'Provider';
    }

    module([providerName, function(p) {
      provider = p;
    }]);

    inject();

    return provider;
  };

  /**
   * Triggers Angular's digest cycle on $rootScope
   */
  h.digest = function() {
    h.inject('$rootScope').$digest();
  };

  /**
   * Compiles a HTML template using Angular's $compile, links it to a scope,
   * triggers the digest, and returns the generated element. It Optionally
   * accepts a scope as the second parameter, or it will use the $rootScope.
   *
   * If jQuery is available as h.$, the resulting element will be wrapped as
   * a jQuery object, even if Angular is not using jQuery - useful for more
   * fluent test assertions, especially with chai-jquery.
   *
   * @param {string} template The template to pass to angular's $compile
   * @param {object} [scope] The scope to link to. If not provided, the
   * $rootScope will be used.
   * @returns {object} The generated element
   */
  h.compile = function(template, scope) {
    scope = scope || h.inject('$rootScope');
    var element = h.inject('$compile')(template)(scope);
    h.digest();

    if(h.$ && !h.$.NA) {
      element = h.$(element);
    }

    return element;
  };

  /**
   * Queries DOM elements using CSS selectors. Useful for projects that don't
   * include jQuery, as jqLite doesn't support querying by selectors.
   * @param root The root element to query from. Will be set to the root
   * document object if passed null or undefined.
   * @param selector The CSS selector to look for
   * @returns {*} The resulting element(s) wrapped as Angular elements.
   */
  h.queryDOM = function(root, selector) {
    if(!root) {
      root = document;
    } else if(root.html) {
      root = root[0];
    }

    return angular.element(root.querySelectorAll(selector));
  };
})(window, window.angular, window.jQuery, window.inject);