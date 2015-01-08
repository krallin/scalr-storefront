'use strict';

var _ = require('lodash');

var React = require('react/addons');
var Router = require('react-router');

var Bootstrap = require('react-bootstrap');
var PageHeader = Bootstrap.PageHeader;
var ButtonToolbar = Bootstrap.ButtonToolbar;
var Button = Bootstrap.Button;
var Table = Bootstrap.Table;
var Label = Bootstrap.Label;

var ServerBadge = require('../badges/ServerBadge');

var FarmsActions = require('../../actions/FarmsActions');
var FarmsStore = require('../../stores/FarmsStore');


var ServersList = React.createClass({
  render: function() {
    var createItem = function(server) {
      return (
        /* jshint ignore:start */
        <tr key={server.id}>
          <td>{server.name}</td>
          <td><ServerBadge server={server} /></td>
          <td>{server.internalIp}</td>
          <td>{server.externalIp}</td>
        </tr>
        /* jshint ignore:end */
      );
    };

    return (
      /* jshint ignore:start */
      <Table striped bordered condensed hover>
        <thead>
          <th>Name</th>
          <th>Status</th>
          <th>Internal IP</th>
          <th>External IP</th>
        </thead>
        <tbody>
        {this.props.servers.map(createItem)}
        </tbody>
      </Table>
      /* jshint ignore:end */
    );
  }
});


var FarmPage = React.createClass({
  mixins: [FarmsStore.Mixin, Router.State],

  getFarmId : function () {
    return this.getParams().farmId;
  },

  getFarm: function () {
    return FarmsStore.getDetails(this.getFarmId());
  },

  getStateForFarm: function () {
    return {
      farm: this.getFarm()
    };
  },

  getInitialState: function () {
    return this.getStateForFarm();
  },

  onChange: function () {
    this.setState(this.getStateForFarm());
  },

  componentWillReceiveProps: function () {
    this.setState(this.getStateForFarm());
  },

  render: function () {
    if (_.isEmpty(this.getFarm())) {
      return (
        /* jshint ignore:start */
        <div className="container">
          <div>
            <PageHeader>
              Please Wait... <small>Farm {this.getFarmId()} is loading.</small>
            </PageHeader>
          </div>
        </div>
        /* jshint ignore:end */
      )
    }

    return (
      /* jshint ignore:start */
      <div className="container">
        <div>
          <PageHeader>
            {this.state.farm.name}
            <Label bsStyle={this.state.farm.status === 0 ? 'default' : 'success'}>
                {this.state.farm.status === 0 ? 'Stopped' : 'Running'}
            </Label>
          </PageHeader>

          <div>
            <ServersList servers={this.state.farm.servers} />
          </div>
        </div>
      </div>
      /* jshint ignore:end */
    );
  },

  componentWillMount: function () {
    if (_.isEmpty(this.getFarm())) {
      FarmsActions.refreshFarm(this.getFarmId());
    }
  },

  componentDidMount: function () {
    var _this = this;
    this.refreshInterval = setInterval(function () {
      FarmsActions.refreshFarm(_this.getFarmId(), true)
    }, 5000);
  },

  componentWillUnmount: function () {
    clearInterval(this.refreshInterval);
  },

  doRefreshAction: function (e) {
    e.preventDefault();
    FarmsActions.refreshFarm(this.getFarmId());
  }
});

module.exports = FarmPage;
