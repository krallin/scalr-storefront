/*
 * React.js Starter Kit
 * Copyright (c) 2014 Konstantin Tarkus (@koistya), KriaSoft LLC.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

'use strict';

var React = require('react');

var Router = require('react-router');
var Link = Router.Link;
var RouteHandler = Router.RouteHandler;


var Bootstrap = require('react-bootstrap');
var Navbar = Bootstrap.Navbar;
var Nav = Bootstrap.Nav;
var NavItem = Bootstrap.NavItem;
var DropdownButton = Bootstrap.DropdownButton;
var MenuItem = Bootstrap.MenuItem;

var PageStore = require('../../stores/PageStore');

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
        <RouteHandler/>
        <div className="navbar-footer">
          <div className="container">
            <p className="text-muted">
              <span>© Scalr</span>
              <span><Link to="app">Home</Link></span>
              <span><Link to="farms">Farms</Link></span>
              <span><Link to="credentials">Credentials</Link></span>
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
