'use strict';

var Dispatcher = require('../core/Dispatcher');
var ActionTypes = require('../constants/ActionTypes');

module.exports = {

  /**
   * Set metadata for the current page (title, description, keywords etc.).
   * @param {Credentials} credentials object.
   */
  setCredentials(credentials) {
    Dispatcher.handleViewAction({
      actionType: ActionTypes.SET_CREDENTIALS,
      credentials: credentials
    });
  }

};
