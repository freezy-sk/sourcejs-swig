'use strict';

var deepExtend = require('deep-extend');
var path = require('path');
var specUtils = require(path.join(global.pathToApp, 'core/lib/specUtils'));
var swig = require('swig');

// Module configuration
var globalConfig = global.opts.plugins && global.opts.plugins.swig ? global.opts.plugins.swig : {};
var config = {
    enabled: false,

    // Swig engine options
    swigDefaults: {
        cache: false,
        loader: swig.loaders.fs(global.app.get('user'))
    },

    // Public object is exposed to Front-end via options API.
    public: {}
};

// Overwriting base options
deepExtend(config, globalConfig);

// Configure Swig
swig.setDefaults(config.swigDefaults);

/**
 * Get HTML from response and parse Swig markup
 *
 * @param {object} req - Request object
 * @param {object} res - Response object
 * @param {function} next - The callback function
 */
exports.process = function (req, res, next) {
    if (!config.enabled) {
        next();
        return;
    }

    // Check if request is targeting right Spec file
    if (isValidSpecType(req)) {
        var html = swig.render(req.specData.renderedHtml, {
            locals: {
                specData: req.specData
            }
        });
        req.specData.renderedHtml = html;
    }

    next();
};

/**
 * Check if is valid Spec file
 *
 * @param {object} req - Request object
 * @returns {boolean}
 */
function isValidSpecType(req) {
    if (!req.specData) {
        return false;
    }

    if (req.specData.isSwig) {
        return true;
    }

    var specDir = specUtils.getFullPathToSpec(req.path);
    var specFilePath = specUtils.getSpecFromDir(specDir);

    return specFilePath.endsWith('.swig.html');
}
