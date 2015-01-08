/*
 * React.js Starter Kit
 * Copyright (c) 2014 Konstantin Tarkus (@koistya), KriaSoft LLC.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

'use strict';

var React = require('react');

var HomePage = React.createClass({

  render() {
    return (
      /* jshint ignore:start */
      <div>
        <div className="jumbotron">
          <div className="container text-center">
            <h1>Scalr Storefront</h1>
            <p>Simplified user experience for Scalr</p>
          </div>
        </div>
        <div className="container">
          <div className="row">
            <div className="col-sm-4">
              <h3>Lorem Ipsum</h3>
              <dl>
                <dt><a href="https://github.com/scalr/">Stuff</a></dt>
                <dd>Description of the stuff</dd>
                <dt><a href="https://github.com/scalr/">More stuff</a></dt>
                <dd>More Description</dd>
              </dl>
            </div>
            <div className="col-sm-4">
              <h3>Lorem Ipsum</h3>
              <dl>
                <dt><a href="https://github.com/scalr/">Stuff</a></dt>
                <dd>Description of the stuff</dd>
                <dt><a href="https://github.com/scalr/">More stuff</a></dt>
                <dd>More Description</dd>
              </dl>
            </div>
            <div className="col-sm-4">
              <h3>Lorem Ipsum</h3>
              <p><a href="https://github.com/scalr/scalr">github.com/scalr/scalr</a></p>
            </div>
          </div>
        </div>
      </div>
      /* jshint ignore:end */
    );
  }

});

module.exports = HomePage;
