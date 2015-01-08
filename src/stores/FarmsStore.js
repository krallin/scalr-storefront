'use strict';

var Store = require('../core/Store');
var Dispatcher = require('../core/Dispatcher');
var ActionTypes = require('../constants/ActionTypes');

var _farms;  // List of farms

var FarmsStore = new Store({

  get() {
    return _farms || require('../constants/Settings').defaults.farms;
  },

  set(farms) {
    _farms = farms;
  }

});

FarmsStore.dispatcherToken = Dispatcher.register(payload => {

  var action = payload.action;

  if (action.actionType == ActionTypes.CHANGE_FARMS) {
    _farms = action.farms;
    FarmsStore.emitChange();
  }

});

module.exports = FarmsStore;
