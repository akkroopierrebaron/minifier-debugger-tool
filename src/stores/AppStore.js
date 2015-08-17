'use strict';

var AppDispatcher = require('../dispatcher/AppDispatcher');
var EventEmitter = require('events').EventEmitter;
var AppConstants = require('../constants/AppConstants');
var assign = require('object-assign');
var sourceMap = require('source-map/lib/source-map');
var request = require('superagent');

var CHANGE_EVENT = 'change';

var _defaultSourceMapsUrls = [
	{
		url: 'https://akkroo.com/app/abcdefghijkl/resources/js/minified/base.min.js',
		title: 'base.min.js (Production)'
	},
	{
		url: 'https://akkroo.com/app/abcdefghijkl/resources/js/minified/collections.min.js',
		title: 'collections.min.js (Production)'
	},
	{
		url: 'https://akkroo.com/app/abcdefghijkl/resources/js/minified/models.min.js',
		title: 'models.min.js (Production)'
	},
	{
		url: 'https://akkroo.com/app/abcdefghijkl/resources/js/minified/views.min.js',
		title: 'views.min.js (Production)'
	}
];

var _line = 0;
var _column = 0;
var _sourceMapUrl = _defaultSourceMapsUrls[0].url;
var _originalSource = {};

function _parseSourceMap(sourceMapUrl) {
	return request
		.get(sourceMapUrl)
		.end(function(err, res) {
			var string = res;
			var rawSourceMap = string.replace('sourceMappingURL=data:application/json;base64,', '');
			return rawSourceMap;
		});
}

function getOriginalSource(sourceMapUrl, line, column) {
	var rawSourceMap = _parseSourceMap(sourceMapUrl);
	var smc = new sourceMap.SourceMapConsumer(rawSourceMap);

	_originalSource = smc.originalPositionFor({
		line: line,
		column: column
	});
}


var AppStore = assign({}, EventEmitter.prototype, {
	/**
	 * Get the default source maps urls.
	 * @return {Array}
	 */
	getDefaultSourceMapsUrls: function() {
		return _defaultSourceMapsUrls;
	},

	getSourceMapUrl: function() {
		return _sourceMapUrl;
	},

	/**
	 * Get the line.
	 * @return {number}
	 */
	getLine: function() {
		return _line;
	},

	/**
	 * Get the column.
	 * @return {number}
	 */
	getColumn: function() {
		return _column;
	},

	/**
	 * Get the original source of the error.
	 * @return {object}
	 */
	getOriginalSource: function() {
		return _originalSource;
	},
	emitChange: function() {
		this.emit(CHANGE_EVENT);
	},

	/**
	 * @param {function} callback
	 */
	addChangeListener: function(callback) {
		this.on(CHANGE_EVENT, callback);
	},

	/**
	 * @param {function} callback
	 */
	removeChangeListener: function(callback) {
		this.removeListener(CHANGE_EVENT, callback);
	}
});

// Register callback to handle all updates
AppDispatcher.register(function(action) {
	switch (action.actionType) {
		case AppConstants.GET_ORIGINAL_SOURCE:
			var sourceMapUrl = action.sourceMapUrl;
			var line = action.line;
			var column = action.column;
			getOriginalSource(sourceMapUrl, line, column);
			AppStore.emitChange();
			break;

		case AppConstants.UPDATE_SOURCE_MAP_URL:
			_sourceMapUrl = action.sourceMapUrl;
			AppStore.emitChange();
			break;

		case AppConstants.UPDATE_LINE:
			_line = action.line;
			AppStore.emitChange();
			break;

		case AppConstants.UPDATE_COLUMN:
			_column = action.column;
			AppStore.emitChange();
			break;
		default:
		// no op
	}
});

module.exports = AppStore;
