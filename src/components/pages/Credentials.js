'use strict';

var React = require('react/addons');
var Router = require('react-router');

var CredentialsStore = require('../../stores/CredentialsStore');
var CredentialsActions = require('../../actions/CredentialsActions');


var CredentialsPage = React.createClass({
  mixins: [React.addons.LinkedStateMixin, CredentialsStore.Mixin],

  getInitialState: function () {
    return CredentialsStore.get();
  },

  onChange: function () {
    this.setState(CredentialsStore.get());
  },

  handleSubmit: function (e) {
    e.preventDefault();
    CredentialsActions.setCredentials(this.state);
  },

  render: function () {
    return (
      /* jshint ignore:start */
      <div className="container">
        <form onSubmit={this.handleSubmit}>
          <input type="text" valueLink={this.linkState('keyId')} />
          <input type="text" valueLink={this.linkState('keySecret')} />
          <button>Save!</button>
        </form>
      </div>
      /* jshint ignore:end */
    );
  }

});

module.exports = CredentialsPage;
