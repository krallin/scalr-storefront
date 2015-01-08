'use strict';

var React = require('react');

var AlertsStore = require('../../stores/AlertsStore');
var AlertsActions = require('../../actions/AlertsActions');

var Bootstrap = require('react-bootstrap');
var Alert = Bootstrap.Alert;

// TODO - Force a redraw when an alert is dismissed. Use a store.

var makeAlertEntity = function (alertId, alert) {

  var dismissAlert = function () {
    AlertsActions.dismissAlert(alertId);
  };

  return (
    /* jshint ignore:start */
    <Alert bsStyle={alert.level} onDismiss={dismissAlert} dismissAfter={alert.timeout} key={alertId}>
      <strong>{alert.title}</strong>: {alert.message}
    </Alert>
    /* jshint ignore:end */
  );

};

var AlertBlock = React.createClass({
  mixins: [AlertsStore.Mixin],

  getInitialState: function () {
    return AlertsStore.getAlerts();
  },

  onChange: function () {
    this.setState(AlertsStore.getAlerts());
  },

  render() {
    var alerts = [];

    for (var alertId in this.state.alerts) {
      // TODO - Needed?
      if (!this.state.alerts.hasOwnProperty(alertId)) {
        continue;
      }

      alerts.push(makeAlertEntity(alertId, this.state.alerts[alertId]));
    }

    return (
      /* jshint ignore:start */
      <div>
        {alerts}
      </div>
      /* jshint ignore:end */
    );
  }
});

module.exports = AlertBlock;
