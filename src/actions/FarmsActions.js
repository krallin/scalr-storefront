'use strict';

var _ = require('lodash');

var Dispatcher = require('../core/Dispatcher');
var ActionTypes = require('../constants/ActionTypes');
var CredentialsStore = require('../stores/CredentialsStore');

var AlertsActions = require('./AlertsActions');

var makeApiCall = require('../api/ApiClient');  // TODO - Actually create client.


module.exports = {

  refreshFarms() {
    var credentials = CredentialsStore.get();

    var apiCall = {
      credentials: credentials,
      name: 'FarmsList',
      apiParams: {}
    };

    makeApiCall(apiCall)
      .then(function (resp) {
        if (resp === undefined) {
          // The request completed, but the response was an API Error.
          // TODO: this is a bit ugly, need to find a better way to abort the promise.
          return;
        }

        var farmsList = Array.prototype.slice.call(resp.querySelectorAll('Item')).map(function (item) {
          // TODO - More elegant?
          return {
            id:     parseInt(item.querySelectorAll('ID')[0].textContent, 10),
            name:   item.querySelectorAll('Name')[0].textContent,
            status: parseInt(item.querySelectorAll('Status')[0].textContent, 10)
          };
        });

        AlertsActions.addAlert({
          level: 'success',
          title: 'Refreshed Farms List',
          message: _.template('loaded <%= farmCount %>', {farmCount: farmsList.length}),
          timeout: 2000
        });

        Dispatcher.handleViewAction({
          actionType: ActionTypes.CHANGE_FARMS,
          farms:      {items: farmsList}
        });

      });
  }

};
