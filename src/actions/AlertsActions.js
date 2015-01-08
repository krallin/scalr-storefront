'use strict';

var Dispatcher = require('../core/Dispatcher');
var ActionTypes = require('../constants/ActionTypes');

module.exports = {

  /**
   * @param {int} alertId
   */
  dismissAlert(alertId) {
    Dispatcher.handleViewAction({
      actionType: ActionTypes.DISMISS_ALERT,
      alertId: alertId
    });
  },

  /**
   * @param {Alert} alert
   */
  addAlert(alert) {
    Dispatcher.handleViewAction({
      actionType: ActionTypes.ADD_ALERT,
      alert: alert
    });
  }

};
