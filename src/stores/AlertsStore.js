/*
 * React.js Starter Kit
 * Copyright (c) 2014 Konstantin Tarkus (@koistya), KriaSoft LLC.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

'use strict';

var Store = require('../core/Store');
var Dispatcher = require('../core/Dispatcher');
var ActionTypes = require('../constants/ActionTypes');

/**
 * @typedef Alert
 * @type {object}
 * @property {string} level
 * @property {string} title
 * @property {string} message
 * @property {int} timeout
 */

var _alertCounter = 0;
var _alerts = {};

var add = function (alert) {
    _alerts[_alertCounter++] = alert;
};

var dismiss = function (alertId) {
  delete _alerts[alertId];
};

var AlertsStore = new Store({
  getAlerts () {
    return {alerts: _alerts};
  }
});

AlertsStore.dispatcherToken = Dispatcher.register(payload => {

  var action = payload.action;

  if (action.actionType == ActionTypes.ADD_ALERT) {
    add(action.alert);
    AlertsStore.emitChange();
  }

  if (action.actionType == ActionTypes.DISMISS_ALERT) {
    dismiss(action.alertId);
    AlertsStore.emitChange();
  }

});

module.exports = AlertsStore;
