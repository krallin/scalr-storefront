'use strict';

var React = require('react/addons');
var CredentialsStore = require('../../stores/CredentialsStore');
var PageActions = require('../../actions/PageActions');
var CredentialsActions = require('../../actions/CredentialsActions');
var App = require('../layout/App');
var Link = require('../common/Link');


var CredentialsPage = React.createClass({
  mixins: [React.addons.LinkedStateMixin, CredentialsStore.Mixin],

  statics: {
    layout: App,
    breadcrumb: (
      /* jshint ignore:start */
      <ol className="breadcrumb">
        <li><Link to="/">Home</Link></li>
        <li className="active">Credentials</li>
      </ol>
      /* jshint ignore:end */
    )
  },

  componentWillMount: function () {
    PageActions.set({title: 'Credentials'});
  },

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
