'use strict';

var MinifierDebuggerToolApp = require('./MinifierDebuggerToolApp');
var React = require('react');
var Router = require('react-router');
var Route = Router.Route;

var content = document.getElementById('content');

var Routes = (
  <Route handler={MinifierDebuggerToolApp}>
    <Route name="/" handler={MinifierDebuggerToolApp}/>
  </Route>
);

Router.run(Routes, function (Handler) {
  React.render(<Handler/>, content);
});
