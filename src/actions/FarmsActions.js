'use strict';

var _ = require('lodash');

var Dispatcher = require('../core/Dispatcher');
var ActionTypes = require('../constants/ActionTypes');
var CredentialsStore = require('../stores/CredentialsStore');

var ReactBootstrap = require('react-bootstrap');
var Button = ReactBootstrap.Button;


var AlertsActions = require('./AlertsActions');

var makeApiCall = require('../api/ApiClient');  // TODO - Actually create client.


var refreshFarms = function (silent) {
  // If silent isn't passed, we assume we don't want silent.
  var logInfo = _.isUndefined(silent) && !silent;

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
          status: parseInt(item.querySelectorAll('Status')[0].textContent, 10),
          comments: item.querySelectorAll('Comments')[0].textContent
        };
      });

      if (logInfo) {
        AlertsActions.addAlert({
          level: 'info',
          title: 'Refreshed Farms List',
          message: _.template('loaded <%= farmCount %>', {farmCount: farmsList.length}),
          timeout: 2000
        });
      }

      Dispatcher.handleViewAction({
        actionType: ActionTypes.CHANGE_FARMS,
        farms:      farmsList
      });

    });
};

var launchFarm = function (farmId) {
  var credentials = CredentialsStore.get();

  var launchApiCall = {
    credentials: credentials,
    name: 'FarmLaunch',
    apiParams: {FarmID: farmId}
  };

  makeApiCall(launchApiCall)
    .then(function (resp) {
      if (resp === undefined) {
        // The request completed, but the response was an API Error.
        // TODO: this is a bit ugly, need to find a better way to abort the promise.
        return;
      }

      var doRedirect = function () {
        require('../routing/router').transitionTo('farms');
      };

      AlertsActions.addAlert({
        level: 'success',
        title: 'Done',
        /* jshint ignore:start */
        message: <div>
          Farm was launched.
          <Button bsStyle="link" onClick={doRedirect}>View it here</Button>
        </div>,
        /* jshint ignore:end */
        timeout: 4000
      });
    });

  // The Farm status will have changed, launch an async refresh.
  refreshFarms(true);

};

var provisionTemplate = function (template, farmName) {

  if (_.isEmpty(farmName)) {
    AlertsActions.addAlert({
      level: 'warning',
      title: 'Error',
      message: 'Please provide a name to provision a template.',
      timeout: 4000
    });

    return;
  }

  AlertsActions.addAlert({
    level: 'info',
    title: 'Starting',
    message: _.template('Provisioning "<%= template.name %>" as "<%= farmName %>"', {template: template, farmName: farmName}),
    timeout: 4000
  });

  var credentials = CredentialsStore.get();

  var cloneApiCall = {
    credentials: credentials,
    name: 'FarmClone',
    apiParams: {FarmID: template.id}
  };

  makeApiCall(cloneApiCall)
    .then(function (resp) {
      if (resp === undefined) {
        // The request completed, but the response was an API Error.
        // TODO: this is a bit ugly, need to find a better way to abort the promise.
        return;
      }

      var farmId = Array.prototype.slice.call(resp.querySelectorAll('FarmID'))[0].textContent;

      AlertsActions.addAlert({
        level: 'info',
        title: 'Progress',
        message: _.template('Clone created with ID "<%= farmId %>"', {farmId: farmId}),
        timeout: 10000  // TODO - Have a standard for level <-> timeout somewhere.
      });

      // A new farm will exist, launch an async refresh.
      refreshFarms(true);

      // Launch the farm
      launchFarm(farmId);

    });
};


module.exports = {
  refreshFarms: refreshFarms,
  provisionTemplate: provisionTemplate
};
