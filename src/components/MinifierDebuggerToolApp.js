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
		defaultSourceMapsUrls: AppStore.getDefaultSourceMapsUrls(),
		sourceMapUrl: AppStore.getSourceMapUrl(),
		line: AppStore.getLine(),
		column: AppStore.getColumn(),
		originalSource: AppStore.getOriginalSource()
	};
}

var MinifierDebuggerToolApp = React.createClass({
	getInitialState: getInitialState,

	componentDidMount: function() {
		AppStore.addChangeListener(this._onChange);
	},

	componentWillUnmount: function() {
		AppStore.removeChangeListener(this._onChange);
	},
	/**
	 * Event handler for 'change' events coming from the TodoStore
	 */
	_onChange: function() {
		this.setState(getInitialState());
	},
	_onChangeSourceMapUrl: function(event) {
		AppActions.updateSourceMapUrl(event.target.value);
	},
	_onChangeLine: function(event) {
		AppActions.updateLine(event.target.value);
	},
	_onChangeColumn: function(event) {
		AppActions.updateColumn(event.target.value);
	},
	_onSubmit: function(event) {
		event.preventDefault();
		AppActions.getOriginalSource(this.state.sourceMapUrl, this.state.line, this.state.column);
	},
	render: function() {
		var that = this;
		var radios = this.state.defaultSourceMapsUrls.map(function(item, i) {
			return (
				<div className="radio">
					<label>
						<input type="radio" name="sourceMapUrl" id={"sourceMapUrl" +i}
							   value={item.url}
							   checked={that.state.sourceMapUrl === item.url}
							   onChange={that._onChangeSourceMapUrl}/> {item.title}
					</label>
				</div>
			)
		});
		var sourceMapUrlInput = this.state.sourceMapUrl === ""
			? (<input id="sourcemap" type="text" value={this.state.sourceMapUrl}
					  onChange={this._onChangeSourceMapUrl}
					  className="form-control"/>)
			: null;
		return (
			<div className="container">
				<div className="row">
					<div className="col-sm-6">
						<form>
							<div className="form-group">
								<label for="sourceMapUrl0">Source Map url</label>
								{radios}
								{sourceMapUrlInput}
							</div>
							<div className="form-group">
								<label for="line">Line</label>
								<input id="line" type="number" value={this.state.line}
									   onChange={this._onChangeLine}
									   className="form-control"/>
							</div>
							<div className="form-group">
								<label for="column">Column</label>
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
