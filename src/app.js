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
var Route = Router.Route;
var NotFoundRoute = Router.NotFoundRoute;
var DefaultRoute = Router.DefaultRoute;

var Dispatcher = require('./core/Dispatcher');
var ActionTypes = require('./constants/ActionTypes');
var ExecutionEnvironment = require('react/lib/ExecutionEnvironment');


var App = require('./components/layout/App');
var Home = require('./components/pages/Index');
var Farms = require('./components/pages/Farms');
var Credentials = require('./components/pages/Credentials');


// Export React so the dev tools can find it
(window !== window.top ? window.top : window).React = React;

Dispatcher.register((payload) => {

  var action = payload.action;

  switch (action.actionType)
  {
    case ActionTypes.SET_CURRENT_PAGE:
      if (ExecutionEnvironment.canUseDOM) {
        document.title = action.page.title;
      }
      break;
  }

  return true; // No errors.  Needed by promise in Dispatcher.
});


var routes = (
  /* jshint ignore:start */
  <Route name="app" path="/" handler={App}>
    <Route name="farms" handler={Farms}/>
    <Route name="credentials" handler={Credentials}/>
    <DefaultRoute handler={Home}/>
  </Route>
  /* jshint ignore:end */
);

/* jshint ignore:start */
Router.run(routes, function (Handler) {
  React.render(<Handler/>, document.body);
});
/* jshint ignore:end */
