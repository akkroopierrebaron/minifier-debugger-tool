'use strict';

var AppDispatcher = require('../dispatcher/AppDispatcher');
var AppConstants = require('../constants/AppConstants');

var AppActions = {
	getOriginalSource: function(sourceMapUrl, line, column) {
		AppDispatcher.dispatch({
			actionType: AppConstants.GET_ORIGINAL_SOURCE,
			sourceMapUrl: sourceMapUrl,
			line: line,
			column: column
		});
	},

	updateSourceMapUrl: function(sourceMapUrl) {
		AppDispatcher.dispatch({
			actionType: AppConstants.UPDATE_SOURCE_MAP_URL,
			sourceMapUrl: sourceMapUrl
		});
	},

	updateLine: function(line) {
		AppDispatcher.dispatch({
			actionType: AppConstants.UPDATE_LINE,
			line: line
		});
	},

	updateColumn: function(column) {
		AppDispatcher.dispatch({
			actionType: AppConstants.UPDATE_COLUMN,
			column: column
		});
	}
};

module.exports = AppActions;
