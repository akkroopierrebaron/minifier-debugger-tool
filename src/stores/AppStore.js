'use strict';

var AppDispatcher = require('../dispatcher/AppDispatcher');
var EventEmitter = require('events').EventEmitter;
var AppConstants = require('../constants/AppConstants');
var assign = require('object-assign');
var sourceMap = require('source-map/lib/source-map');

var CHANGE_EVENT = 'change';

var _line = 0;
var _column = 0;
var _sourceMap = '';
var _originalSource = {};

function _parseSourceMap(rawSourceMap) {
    var sm = rawSourceMap.replace('//# sourceMappingURL=data:application/json;base64,', '');
    return window.atob(sm);
}

function getOriginalSource(sm, line, column) {
    var rawSourceMap = _parseSourceMap(sm);
    var smc = new sourceMap.SourceMapConsumer(rawSourceMap);

    _originalSource = smc.originalPositionFor({
        line: line,
        column: column
    });
}


var AppStore = assign({}, EventEmitter.prototype, {
    getSourceMap: function () {
        return _sourceMap;
    },

    /**
     * Get the line.
     * @return {number}
     */
    getLine: function () {
        return _line;
    },

    /**
     * Get the column.
     * @return {number}
     */
    getColumn: function () {
        return _column;
    },

    /**
     * Get the original source of the error.
     * @return {object}
     */
    getOriginalSource: function () {
        return _originalSource;
    },
    emitChange: function () {
        this.emit(CHANGE_EVENT);
    },

    /**
     * @param {function} callback
     */
    addChangeListener: function (callback) {
        this.on(CHANGE_EVENT, callback);
    },

    /**
     * @param {function} callback
     */
    removeChangeListener: function (callback) {
        this.removeListener(CHANGE_EVENT, callback);
    }
});

// Register callback to handle all updates
AppDispatcher.register(function (action) {
    switch (action.actionType) {
        case AppConstants.GET_ORIGINAL_SOURCE:
            var sm = action.sourceMap;
            var line = action.line;
            var column = action.column;
            getOriginalSource(sm, line, column);
            AppStore.emitChange();
            break;

        case AppConstants.UPDATE_SOURCE_MAP_URL:
            _sourceMap = action.sourceMap;
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
