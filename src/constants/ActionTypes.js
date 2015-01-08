/*
 * React.js Starter Kit
 * Copyright (c) 2014 Konstantin Tarkus (@koistya), KriaSoft LLC.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

'use strict';

var keyMirror = require('react/lib/keyMirror');

var ActionTypes = keyMirror({

  // Page action types
  SET_CURRENT_PAGE: null,

  // Credentials actions types
  SET_CREDENTIALS: null,

  // Farms actions types
  CHANGE_FARMS: null,

  // ALerts actions types
  ADD_ALERT: null,
  DISMISS_ALERT: null

});

module.exports = ActionTypes;
