'use strict';

var _ = require('lodash');

var React = require('react/addons');

var Bootstrap = require('react-bootstrap');
var Label = Bootstrap.Label;

var STATUS_TO_STYLE = {
  Pending: 'warning',
  Initializing: 'warning',
  Running: 'success',
  Failed: 'danger'
};

var ServerBadge = React.createClass({
  render: function () {
    var server = this.props.server;
    var style = STATUS_TO_STYLE[server.status] || 'default';

    return (
      /* jshint ignore:start */
      <Label bsStyle={style}>{ server.status }</Label>
      /* jshint ignore:end */
    );
  }
});

module.exports = ServerBadge;
