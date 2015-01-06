'use strict';

var Store = require('../core/Store');
var Dispatcher = require('../core/Dispatcher');
var ActionTypes = require('../constants/ActionTypes');

/**
 * @typedef Farms
 * @type {object}
 * @property {list} items
 */
var _farms;

var FarmStore = new Store({

  get() {
    return _farms || require('../constants/Settings').defaults.farms;
  },

  set(farms) {
    _farms = farms;
  }

});

FarmStore.dispatcherToken = Dispatcher.register(payload => {

  var action = payload.action;

  if (action.actionType == ActionTypes.CHANGE_FARMS) {
    _farms = action.farms;
    FarmStore.emitChange();
  }

});

module.exports = FarmStore;
