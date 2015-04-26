(function(window, angular, inject, undefined) {
  var h = window.h = {};

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
})(window, window.angular, window.inject);