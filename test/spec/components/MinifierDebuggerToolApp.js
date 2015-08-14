'use strict';

describe('MinifierDebuggerToolApp', () => {
  let React = require('react/addons');
  let MinifierDebuggerToolApp, component;

  beforeEach(() => {
    let container = document.createElement('div');
    container.id = 'content';
    document.body.appendChild(container);

    MinifierDebuggerToolApp = require('components/MinifierDebuggerToolApp.js');
    component = React.createElement(MinifierDebuggerToolApp);
  });

  it('should create a new instance of MinifierDebuggerToolApp', () => {
    expect(component).toBeDefined();
  });
});
