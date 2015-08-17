'use strict';

var React = require('react/addons');
var AppStore = require('../stores/AppStore');
var AppActions = require('../actions/AppActions');
var _ = require('underscore/underscore');

// CSS
require('bootstrap/dist/css/bootstrap.css');
require('../styles/main.css');

/**
 * Retrieve the current TODO data from the TodoStore
 */
function getInitialState() {
    return {
        sourceMapUrl: AppStore.getSourceMapUrl(),
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

    _isManualSourceMapUrl: function () {
        var sourceMapUrl = AppStore.getSourceMapUrl();
        var defaultSourceMapsUrls = AppStore.getDefaultSourceMapsUrls();
        var isManualSourceMapUrl = _.chain(defaultSourceMapsUrls)
            .pluck('url')
            .contains(sourceMapUrl)
            .value();
        return isManualSourceMapUrl === false;
    },
    /**
     * Event handler htmlFor 'change' events coming from the TodoStore
     */
    _onChange: function () {
        this.setState(getInitialState());
    },
    _onChangeSourceMapUrl: function (event) {
        AppActions.updateSourceMapUrl(event.target.value);
    },
    _onChangeLine: function (event) {
        AppActions.updateLine(event.target.value);
    },
    _onChangeColumn: function (event) {
        AppActions.updateColumn(event.target.value);
    },
    _onSubmit: function (event) {
        event.preventDefault();
        AppActions.getOriginalSource(this.state.sourceMapUrl, this.state.line, this.state.column);
    },
    render: function () {
        var radios = AppStore.getDefaultSourceMapsUrls().map(_.bind(function (item, i) {
            return (
                <div className="radio" key={i}>
                    <label>
                        <input type="radio" name="sourceMapUrl" id={'sourceMapUrl' + i}
                               value={item.url}
                               checked={this.state.sourceMapUrl === item.url}
                               onChange={this._onChangeSourceMapUrl}/> {item.title}
                    </label>
                </div>
            );
        }, this));

        return (
            <div className="container">
                <div className="row">
                    <div className="col-sm-6">
                        <form>
                            <div className="form-group">
                                <label htmlFor="sourceMapUrl0">Source Map url</label>
                                {radios}
                                <div className="radio">
                                    <label>
                                        <input type="radio" name="sourceMapUrl" id="sourceMapUrlManual" value=""
                                               checked={this._isManualSourceMapUrl()}
                                               onChange={this._onChangeSourceMapUrl}/>

                                        <input id="sourcemap" type="text" value={this.state.sourceMapUrl}
                                               onChange={this._onChangeSourceMapUrl}
                                               disabled={!this._isManualSourceMapUrl()}
                                               className="form-control"/>
                                    </label>
                                </div>
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
							{this.state.originalSource}
						</pre>
                    </div>
                </div>
            </div>
        );
    }
});

module.exports = MinifierDebuggerToolApp;
