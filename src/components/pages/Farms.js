'use strict';

var React = require('react/addons');

var Bootstrap = require('react-bootstrap');
var PageHeader = Bootstrap.PageHeader;
var ButtonToolbar = Bootstrap.ButtonToolbar;
var Button = Bootstrap.Button;
var Table = Bootstrap.Table;

var FarmsStore = require('../../stores/FarmsStore');
var FarmsActions = require('../../actions/FarmsActions');


var FarmsList = React.createClass({
  render: function() {
    var createItem = function(farm) {
      return (
        /* jshint ignore:start */
        <tr key={farm.id}>
          <td>{farm.id}</td>
          <td>{farm.name}</td>
          <td>{farm.status === 0 ? 'Stopped' : 'Running'}</td>
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
        </thead>
        <tbody>
        {this.props.items.map(createItem)}
        </tbody>
      </Table>
      /* jshint ignore:end */
    );
  }
});


var FarmsPage = React.createClass({
  mixins: [FarmsStore.Mixin],

  getInitialState: function () {
    return FarmsStore.get();
  },

  onChange: function () {
    this.setState(FarmsStore.get());
  },

  handleSubmit: function (e) {
    e.preventDefault();
    FarmsActions.refreshFarms();
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
            <Button bsStyle="primary" onClick={this.handleSubmit}>Refresh</Button>
          </ButtonToolbar>
        </div>

        <div>
          <FarmsList items={this.state.items} />
        </div>
      </div>
      /* jshint ignore:end */
    );
  },

  componentWillMount: function () {
    FarmsActions.refreshFarms();
  }

});

module.exports = FarmsPage;
