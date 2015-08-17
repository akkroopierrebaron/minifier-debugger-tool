'use strict';

var React = require('react/addons');
var AppStore = require('../stores/AppStore');
var AppActions = require('../actions/AppActions');

// CSS
require('bootstrap/dist/css/bootstrap.css');
require('../styles/main.css');

/**
 * Retrieve the current TODO data from the TodoStore
 */
function getInitialState() {
    return {
        sourceMap: AppStore.getSourceMap(),
        line: AppStore.getLine(),
        column: AppStore.getColumn(),
        originalSource: AppStore.getOriginalSource()
    };
}

var MinifierDebuggerToolApp = React.createClass({
    getInitialState: getInitialState,

    componentDidMount: function () {
        AppStore.addChangeListener(this._onChange);
    },

    componentWillUnmount: function () {
        AppStore.removeChangeListener(this._onChange);
    },

    /**
     * Event handler htmlFor 'change' events coming from the TodoStore
     */
    _onChange: function () {
        this.setState(getInitialState());
    },
    _onChangeSourceMap: function (event) {
        AppActions.updateSourceMap(event.target.value);
    },
    _onChangeLine: function (event) {
        AppActions.updateLine(parseInt(event.target.value));
    },
    _onChangeColumn: function (event) {
        AppActions.updateColumn(parseInt(event.target.value));
    },
    _onSubmit: function (event) {
        event.preventDefault();
        AppActions.getOriginalSource(this.state.sourceMap, this.state.line, this.state.column);
    },
    render: function () {
        return (
            <div className="container">
                <div className="row">
                    <div className="col-sm-6">
                        <form>
                            <div className="form-group">
                                <label htmlFor="sourcemap">Source map (in base64)</label>
                                <textarea id="sourcemap" type="number" onChange={this._onChangeSourceMap}
                                          className="form-control" rows="15" placeholder="//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIkJhc2VWaWV3LmpzIiwiQXBwLmpzIi...">
                                    {this.state.sourceMap}
                                </textarea>
                            </div>
                            <div className="form-group">
                                <label htmlFor="line">Line</label>
                                <input id="line" type="number" value={this.state.line}
                                       onChange={this._onChangeLine}
                                       className="form-control"/>
                            </div>
                            <div className="form-group">
                                <label htmlFor="column">Column</label>
                                <input id="column" type="number" value={this.state.column}
                                       onChange={this._onChangeColumn} className="form-control"/>
                            </div>
                            <div className="form-group">
                                <button type="submit" className="btn btn-primary" onClick={this._onSubmit}>
                                    Submit
                                </button>
                            </div>
                        </form>
                    </div>
                    <div className="col-sm-6">
                        <h2>Result</h2>
						<pre>
							file : {this.state.originalSource.source} <br/>
							line : {this.state.originalSource.line} <br/>
							column : {this.state.originalSource.column} <br/>
						</pre>
                    </div>
                </div>
            </div>
        );
    }
});

module.exports = MinifierDebuggerToolApp;
