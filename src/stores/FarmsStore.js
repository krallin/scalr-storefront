'use strict';

var Store = require('../core/Store');
var Dispatcher = require('../core/Dispatcher');
var ActionTypes = require('../constants/ActionTypes');

var _farms;  // List of Farms.
var _farmDetails = {};  // Mapping of farm IDs to Farm details.

var FarmsStore = new Store({

  get() {
    return _farms || [];
  },

  getDetails (farmId) {
    return _farmDetails[farmId];
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

  if (action.actionType == ActionTypes.CHANGE_FARM) {
    _farmDetails[action.farmId] = action.farm;
    FarmsStore.emitChange();
  }

});

module.exports = FarmsStore;
