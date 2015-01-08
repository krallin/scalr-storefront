'use strict';

var React = require('react/addons');
var Router = require('react-router');

var FarmsStore = require('../../stores/FarmsStore');
var FarmsActions = require('../../actions/FarmsActions');


var FarmsList = React.createClass({
  render: function() {
    var createItem = function(item) {
      return (
        /* jshint ignore:start */
        <li key={item.id}>{item.name} ({item.status === 0 ? 'Stopped' : 'Running'})</li>
        /* jshint ignore:end */
      );
    };
    return (
      /* jshint ignore:start */
      <ul>{this.props.items.map(createItem)}</ul>
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
        <FarmsList items={this.state.items} />
        <form onSubmit={this.handleSubmit}>
          <button>Refresh!</button>
        </form>
      </div>
      /* jshint ignore:end */
    );
  }

});

module.exports = FarmsPage;
