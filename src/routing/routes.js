'use strict';

var App = require('./../components/layout/App');
var Home = require('./../components/pages/Home');
var Farms = require('./../components/pages/Farms');
var Credentials = require('./../components/pages/Credentials');

var React = require('react');
var Router = require('react-router');
var Route = Router.Route;
var DefaultRoute = Router.DefaultRoute;


var routes = (
  /* jshint ignore:start */
  <Route name="app" path="/" handler={App}>
    <Route name="farms" handler={Farms}/>
    <Route name="credentials" handler={Credentials}/>
    <DefaultRoute name="home" handler={Home}/>
  </Route>
  /* jshint ignore:end */
);


module.exports = routes;
