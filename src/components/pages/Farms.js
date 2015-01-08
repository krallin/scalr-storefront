'use strict';

var _ = require('lodash');

var React = require('react/addons');

var Router = require('react-router');
var Link = Router.Link;

var Bootstrap = require('react-bootstrap');
var PageHeader = Bootstrap.PageHeader;
var ButtonToolbar = Bootstrap.ButtonToolbar;
var Button = Bootstrap.Button;
var Table = Bootstrap.Table;

var FarmsStore = require('../../stores/FarmsStore');
var FarmsMixin = require('../mixins/FarmsListMixin');


var FarmsList = React.createClass({
  render: function() {
    var createItem = function(farm) {
      var params = {farmId: farm.id}

      return (
        /* jshint ignore:start */
        <tr key={farm.id}>
          <td>{farm.id}</td>
          <td>{farm.name}</td>
          <td>{farm.status === 0 ? 'Stopped' : 'Running'}</td>
          <td><Link to="farm" params={params}>View</Link></td>
        </tr>
        /* jshint ignore:end */
      );
    };

    return (
      /* jshint ignore:start */
      <Table striped bordered condensed hover>
        <thead>
          <th>ID</th>
          <th>Name</th>
          <th>Status</th>
          <th>More</th>
        </thead>
        <tbody>
        {this.props.farms.map(createItem)}
        </tbody>
      </Table>
      /* jshint ignore:end */
    );
  }
});


var FarmsPage = React.createClass({
  title: 'Farms',

  mixins: [FarmsStore.Mixin, FarmsMixin],

  getInitialState: function () {
    return this.getFarmsForState();
  },

  onChange: function () {
    this.setState(this.getFarmsForState());
  },

  render: function () {
    return (
      /* jshint ignore:start */
      <div className="container">

        <div>
          <PageHeader>
            Active Farms
          </PageHeader>
        </div>

        <div>
          <ButtonToolbar>
            <Button bsStyle="primary" onClick={this.doRefreshAction}>Refresh</Button>
          </ButtonToolbar>
        </div>

        <div>
          <FarmsList farms={this.state.farms} />
        </div>
      </div>
      /* jshint ignore:end */
    );
  }
});

module.exports = FarmsPage;
