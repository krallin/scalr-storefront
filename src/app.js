/*
 * React.js Starter Kit
 * Copyright (c) 2014 Konstantin Tarkus (@koistya), KriaSoft LLC.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

'use strict';

var React = require('react');
var ExecutionEnvironment = require('react/lib/ExecutionEnvironment');

var router = require('./routing/router');

var Dispatcher = require('./core/Dispatcher');
var ActionTypes = require('./constants/ActionTypes');
var PageActions = require('./actions/PageActions');


// Export React so the dev tools can find it
(window !== window.top ? window.top : window).React = React;

// Update the page's title when the page changes. We set this here because it's only relevant when running in a
// browser.
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


/* jshint ignore:start */
router.run(function (Handler) {
  PageActions.set(Handler);  // TODO - Make it work.
  React.render(<Handler/>, document.body);
});
/* jshint ignore:end */
