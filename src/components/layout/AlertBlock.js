'use strict';

var _ = require('lodash');

var React = require('react');

var AlertsStore = require('../../stores/AlertsStore');
var AlertsActions = require('../../actions/AlertsActions');

var Bootstrap = require('react-bootstrap');
var Alert = Bootstrap.Alert;

// TODO - Force a redraw when an alert is dismissed. Use a store.

var makeAlertEntity = function (alert, alertId) {
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
    var alerts = _.map(this.state.alerts, makeAlertEntity);

    return (
      /* jshint ignore:start */
      <div class="container">
        {alerts}
      </div>
      /* jshint ignore:end */
    );
  }
});

module.exports = AlertBlock;
