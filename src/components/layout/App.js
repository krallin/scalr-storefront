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

var ReactRouterBootstrap = require('react-router-bootstrap');
var NavItemLink = ReactRouterBootstrap.NavItemLink;

var Bootstrap = require('react-bootstrap');
var Navbar = Bootstrap.Navbar;
var Nav = Bootstrap.Nav;
var NavItem = Bootstrap.NavItem;
var DropdownButton = Bootstrap.DropdownButton;
var MenuItem = Bootstrap.MenuItem;

var Alert = require('./AlertBlock');

var DefaultLayout = React.createClass({
  render() {
    // TODO - Container here
    return (
      /* jshint ignore:start */
      <div className="container">
        <Navbar>
          <Nav>
            <NavItemLink to="home">Home</NavItemLink>
            <NavItemLink to="farms">New</NavItemLink>
            <NavItemLink to="farms">Farms</NavItemLink>
            <NavItemLink to="credentials">Credentials</NavItemLink>
          </Nav>
        </Navbar>
        <Alert/>
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
  }
});

module.exports = DefaultLayout;
