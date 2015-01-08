/*
 * React.js Starter Kit
 * Copyright (c) 2014 Konstantin Tarkus (@koistya), KriaSoft LLC.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

'use strict';

var React = require('react');
var PageStore = require('../../stores/PageStore');
var Link = require('../common/Link');

var Navbar = require('react-bootstrap/Navbar');
var Nav = require('react-bootstrap/Nav');
var NavItem = require('react-bootstrap/NavItem');
var DropdownButton = require('react-bootstrap/DropdownButton');
var MenuItem = require('react-bootstrap/MenuItem');

/**
 * Retrieves the current page metadata from the PageStore.
 * @returns {{title: string}}
 */
function getState() {
  return {
    title: PageStore.get().title
  };
}

var DefaultLayout = React.createClass({

  // Magically binds DefaultLayout.onChange to PageStore.emitChange!
  mixins: [PageStore.Mixin],

  getInitialState() {
    return getState();
  },

  componentDidMount() {
    PageStore.emitChange();
  },

  render() {
    /* jshint ignore:start */
    var header = this.props.children.type.breadcrumb ? (
      <div className="container">
        <h2>{this.state.title}</h2>
        {this.props.children.type.breadcrumb}
      </div>
    ) : (
      <div className="jumbotron">
        <div className="container text-center">
          <h1>Scalr Storefront</h1>
          <p>Simplified user experience for Scalr</p>
        </div>
      </div>
    );
    /* jshint ignore:end */

    return (
      /* jshint ignore:start */
      <div>
        <Navbar className="navbar-top">
          <Nav>
            <NavItem>Home</NavItem>
            <NavItem></NavItem>
            <NavItem></NavItem>
          </Nav>
        </Navbar>
        {header}
        {this.props.children}
        <div className="navbar-footer">
          <div className="container">
            <p className="text-muted">
              <span>© Scalr</span>
              <span><Link to="/">Home</Link></span>
              <span><Link to="/farms">Farms</Link></span>
              <span><Link to="/credentials">Credentials</Link></span>
            </p>
          </div>
        </div>
      </div>
      /* jshint ignore:end */
    );
  },

  /**
   * Event handler for 'change' events coming from the PageStore.
   */
  onChange() {
    this.setState(getState());
  }
});

module.exports = DefaultLayout;
