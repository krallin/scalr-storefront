'use strict';

var _ = require('lodash');

var React = require('react/addons');

var Bootstrap = require('react-bootstrap');
var Input = Bootstrap.Input;
var PageHeader = Bootstrap.PageHeader;
var ButtonToolbar = Bootstrap.ButtonToolbar;
var Button = Bootstrap.Button;
var Table = Bootstrap.Table;

var AlertsActions = require('../../actions/AlertsActions');
var FarmsActions = require('../../actions/FarmsActions');

var FarmsStore = require('../../stores/FarmsStore');
var FarmsMixin = require('../mixins/FarmsListMixin');


var TemplatesList = React.createClass({
  render: function() {
    var _this = this;

    var createItem = function(template) {

      var provisionThisTemplate = function () {
        _this.props.provisionTemplate(template);
        console.log(_this.props);
      };

      return (
        /* jshint ignore:start */
        <tr key={template.id}>
          <td>{template.name}</td>
          <td><Button bsStyle="success" onClick={provisionThisTemplate}>Provision</Button></td>
        </tr>
        /* jshint ignore:end */
      );

    };

    return (
      /* jshint ignore:start */
      <Table striped bordered condensed hover>
        <thead>
          <th>Name</th>
          <th>Actions</th>
        </thead>
        <tbody>
        {this.props.templates.map(createItem)}
        </tbody>
      </Table>
      /* jshint ignore:end */
    );
  }
});



var TemplatesPage = React.createClass({
  mixins: [React.addons.LinkedStateMixin, FarmsStore.Mixin, FarmsMixin],

  getTemplatesForState: function () {
    return {templates: _.filter(this.getFarmsForState().farms, function (farm) {
      return _.contains(farm.comments, 'IS_TEMPLATE');
    })};
  },

  getInitialState: function () {
    return _.merge({farmName: ''}, this.getTemplatesForState());
  },

  onChange: function () {
    this.setState(this.getTemplatesForState());
  },

  provisionTemplate: function (template) {
    FarmsActions.provisionTemplate(template, this.state.farmName);
  },

  handleSubmit: function (e) {
    e.preventDefault();
  },

  render: function () {
    return (
      /* jshint ignore:start */
      <div className="container">

        <div>
          <PageHeader>
            New Deployment
          </PageHeader>
        </div>

        <div>
            <form onSubmit={this.handleSubmit} className="form-horizontal">
              <Input labelClassName="col-xs-2" wrapperClassName="col-xs-10" type="text" label="Name" valueLink={this.linkState('farmName')} />
            </form>
        </div>

        <div>
          <PageHeader>
            Available Templates
          </PageHeader>
        </div>

        <div>
          <ButtonToolbar>
            <Button bsStyle="primary" onClick={this.doRefreshAction}>Refresh</Button>
          </ButtonToolbar>
        </div>

        <div>
          <TemplatesList templates={this.state.templates} provisionTemplate={this.provisionTemplate}/>
        </div>
      </div>
      /* jshint ignore:end */
    );
  }
});

module.exports = TemplatesPage;
