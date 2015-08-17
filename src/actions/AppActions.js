'use strict';

var AppDispatcher = require('../dispatcher/AppDispatcher');
var AppConstants = require('../constants/AppConstants');

var AppActions = {
	getOriginalSource: function(sourceMap, line, column) {
		AppDispatcher.dispatch({
			actionType: AppConstants.GET_ORIGINAL_SOURCE,
			sourceMap: sourceMap,
			line: line,
			column: column
		});
	},

	updateSourceMap: function(sourceMap) {
		AppDispatcher.dispatch({
			actionType: AppConstants.UPDATE_SOURCE_MAP_URL,
			sourceMap: sourceMap
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
