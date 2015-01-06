'use strict';

var Store = require('../core/Store');
var Dispatcher = require('../core/Dispatcher');
var ActionTypes = require('../constants/ActionTypes');

/**
 * @typedef Credentials
 * @type {object}
 * @property {string} keyId
 * @property {string} keySecret
 */
var _credentials;


var LOCAL_STORAGE_VAR = 'scalrCredentials';

var fromLocalStorage = function () {
  return JSON.parse(localStorage[LOCAL_STORAGE_VAR]);
};

var toLocalStorage = function (credentials) {
  localStorage[LOCAL_STORAGE_VAR] = JSON.stringify(credentials);
};


var PageStore = new Store({

  /**
   * Gets metadata associated with the current page.
   * @returns {Credentials}
   */
  get() {
    // TODO - Error handling!
    return _credentials || fromLocalStorage() || require('../constants/Settings').defaults.credentials;
  },

  set(credentials) {
    _credentials = credentials;
    toLocalStorage(credentials);
  }

});

PageStore.dispatcherToken = Dispatcher.register(payload => {

  var action = payload.action;

  if (action.actionType == ActionTypes.SET_CREDENTIALS) {
    PageStore.set(action.credentials);
    PageStore.emitChange();
  }

});

module.exports = PageStore;
