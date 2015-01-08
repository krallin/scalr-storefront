'use strict';

var AlertsActions = require('../actions/AlertsActions');

var assign = require('react/lib/Object.assign');
var sjcl = require('sjcl');
var moment = require('moment');

/**
 * @typedef ApiCall
 * @type {object}
 * @property {Credentials} credentials
 * @property {string} name
 * @property {object} apiParams
 */


var getKeyAuthParams = function (apiCall, timestamp) {
  var token = [apiCall.name, apiCall.credentials.keyId, timestamp].join(':');
  var hmac = new sjcl.misc.hmac(apiCall.credentials.keySecret);
  var signature = sjcl.codec.base64.fromBits(hmac.encrypt(token));

  return {
    AuthVersion: '3',
    KeyID: apiCall.credentials.keyId,
    Signature: signature
  };
};

var getLDAPAuthParams = function (apiCall, timestamp) {
  return {
    AuthType: 'LDAP',
    Login: 'TODO',
    Password: 'TODO'
  };
};

var authFunctions = {
  key: getKeyAuthParams,
  ldap: getLDAPAuthParams
};

var getAuthParams = function (apiCall) {
  var timestamp = moment.utc().format('yyyy-MM-dd HH:mm:ss');

  var authParams = {
    Timestamp: timestamp
  };

  // TODO!
  /* jshint ignore:start */
  var authFunction = authFunctions['key'];

  if (authFunction) {
    assign(authParams, authFunction(apiCall, timestamp));
  } else {
    // TODO !
    //console.log('Warning: no auth function found for auth type: \'%s\'', $scope.apiSettings.authType);
  }
  /* jshint ignore:end */

  return authParams;
};

var makeApiCall = function (apiCall) {
  var params = {
    Version: '2.3.0',
    Action: apiCall.name
  };

  // TODO
  //if ($scope.apiSettings.envId !== '') {
  //  params.EnvID = $scope.apiSettings.envId;
  //}

  assign(params, getAuthParams(apiCall));

  for (var key in apiCall.apiParams) {
    // TODO --> Arrays
    var value = apiCall.apiParams[key];
    if (value instanceof Array) {
      for (var i = 0; i < value.length; i++) {
        var subParam = value[i];
        params[key + '[' + encodeURIComponent(subParam.key) + ']'] = subParam.value;
      }
    } else {
      params[key] = value;
    }
  }

  // Returns a promise.
  // We have to require rewquest down here, because otherwise gulp-render tries to import it, which doesn't work because
  // gulp-render doesn't have a window.
  return require('reqwest')({
    url: 'https://api.scalr.com/',
    method: 'get',
    data: params,
    type: 'xml',
    crossOrigin: true
  })
    .then(function (resp) {
      var errors = Array.prototype.slice.call(resp.querySelectorAll('Error'));
      if (errors.length > 0) {
        var error = errors[0];
        console.log(error);
        AlertsActions.addAlert({
          level: 'danger',
          title: 'Invalid API request',
          message: error.querySelectorAll('Message')[0].textContent,
          timeout: 0
        });
        return;
      }
      return resp;
    },
    function (err, msg) {
      AlertsActions.addAlert({
        level: 'danger',
        title: 'An error occurred',
        message: err.status ? err.status : 'Network unavailable, or server didn\'t respond. Check JavaScript console.',
        timeout: 0
      });
    });
};

module.exports = makeApiCall;
