'use strict';

var _ = require('lodash');

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
  if (typeof localStorage === 'undefined') {
    return null;
  }
  try {
    var storedCredentials = JSON.parse(localStorage[LOCAL_STORAGE_VAR]);
    if (_.isObject(storedCredentials)) {
      return storedCredentials;
    }
  } catch (e) {}
  return {};
};

var toLocalStorage = function (credentials) {
  localStorage[LOCAL_STORAGE_VAR] = JSON.stringify(credentials);
};


var CredentialsStore = new Store({

  /**
   * @returns {Credentials}
   */
  get() {
    return _credentials || _.merge({},require('../constants/Settings').defaults.credentials, fromLocalStorage());
  },

  set(credentials) {
    _credentials = credentials;
    toLocalStorage(credentials);
  }

});

CredentialsStore.dispatcherToken = Dispatcher.register(payload => {

  var action = payload.action;

  if (action.actionType == ActionTypes.SET_CREDENTIALS) {
    CredentialsStore.set(action.credentials);
    CredentialsStore.emitChange();
  }

});

module.exports = CredentialsStore;
