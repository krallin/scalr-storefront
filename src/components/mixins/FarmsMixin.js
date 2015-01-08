'use strict';
var _ = require('lodash');

var FarmsStore = require('../../stores/FarmsStore');
var FarmsActions = require('../../actions/FarmsActions');


var FarmsMixin = {

  getFarmsForState: function () {
    return {farms: FarmsStore.get()};
  },

  componentWillMount: function () {
    this.farms = FarmsStore.get();

    if (_.isEmpty(FarmsStore.get())) {
      FarmsActions.refreshFarms();
    }
  },

  doRefreshAction: function (e) {
    e.preventDefault();
    FarmsActions.refreshFarms();
  }
};

module.exports = FarmsMixin;
