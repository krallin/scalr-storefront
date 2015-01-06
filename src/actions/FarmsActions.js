'use strict';

var Dispatcher = require('../core/Dispatcher');
var ActionTypes = require('../constants/ActionTypes');
var CredentialsStore = require('../stores/CredentialsStore');

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
        var farmsList = Array.prototype.slice.call(resp.querySelectorAll('Item')).map(function (item) {
          // TODO - More elegant?
          return {
            id:     parseInt(item.querySelectorAll('ID')[0].textContent, 10),
            name:   item.querySelectorAll('Name')[0].textContent,
            status: parseInt(item.querySelectorAll('Status')[0].textContent, 10)
          };
        });

        Dispatcher.handleViewAction({
          actionType: ActionTypes.CHANGE_FARMS,
          farms:      {items: farmsList}
        });

      })
      .fail(function (err, msg) {
        console.log('Failed!', err, msg);
      });
  }

};
