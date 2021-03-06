'use strict';

var App = require('./../components/layout/App');
var Home = require('./../components/pages/Home');
var Farms = require('./../components/pages/Farms');
var Farm = require('./../components/pages/Farm');
var Credentials = require('./../components/pages/Credentials');
var New = require('./../components/pages/Templates');

var React = require('react');
var Router = require('react-router');
var Route = Router.Route;
var RouteHandler = Router.RouteHandler;
var DefaultRoute = Router.DefaultRoute;


var routes = (
  /* jshint ignore:start */
  <Route name="app" path="/" handler={App}>
    <DefaultRoute name="home" handler={Home}/>
    <Route name="new" handler={New}/>
    <Route name="farms" handler={RouteHandler}>
      <Route name="farm" path=":farmId" handler={Farm}/>
      <DefaultRoute handler={Farms}/>
    </Route>
    <Route name="credentials" handler={Credentials}/>
  </Route>
  /* jshint ignore:end */
);


module.exports = routes;
