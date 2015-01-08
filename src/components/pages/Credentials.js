'use strict';

var React = require('react/addons');

var Bootstrap = require('react-bootstrap');
var PageHeader = Bootstrap.PageHeader;
var Input = Bootstrap.Input;

var CredentialsStore = require('../../stores/CredentialsStore');

var CredentialsActions = require('../../actions/CredentialsActions');
var AlertsActions = require('../../actions/AlertsActions');


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
    AlertsActions.addAlert({
      level: 'info',
      title: 'Credentials Saved',
      message: 'Done',
      timeout: 2000
    });
  },

  render: function () {
    return (
      /* jshint ignore:start */
      <div className="container">
        <PageHeader>
          Credentials
        </PageHeader>
        <div>
          <form onSubmit={this.handleSubmit} className="form-horizontal">
              <Input labelClassName="col-xs-2" wrapperClassName="col-xs-10" type="text" label="Key ID" valueLink={this.linkState('keyId')} />
              <Input labelClassName="col-xs-2" wrapperClassName="col-xs-10" type="password" label="Secret Key" valueLink={this.linkState('keySecret')} />
              <Input wrapperClassName="col-xs-offset-2 col-xs-10" type="submit" value="Save"/>
          </form>
        </div>
      </div>
      /* jshint ignore:end */
    );
  }

});

module.exports = CredentialsPage;
