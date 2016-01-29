'use strict';
var emitter = require('events').EventEmitter;
var zUtil = require('zenx-util');

module.exports = class ZenXServer {
	
	constructor(options) {
		
		zUtil.console.log('Starting ZenXServer on ' + options.bind + ':' + options.port + '...');
		
		// In case of no options
		!options && (options = {});
		
		// Load default configuration
		this.config = require('./src/defaultServerConfig.js');
		
		// Set initial status
		this.status = -1;
		
		// Overwrite defaults
		for(let option in options)
			this.config[option] = options[option];
		
		// Inherit event emitter
		emitter.call(this);
		
		// Start the server
		this.start();
		
		this.on('start', () => zUtil.console.log('Server started.'));
		
	}
	
}

module.exports.prototype.start = require('./src/start.js');
module.exports.prototype._makeExpressApp = require('./src/makeExpressApp.js');
module.exports.prototype._makeServer = require('./src/makeServer.js');
module.exports.prototype.stop = require('./src/stop.js');
module.exports.prototype.__proto__ = emitter.prototype;

// @todo Find out why this doen't work
//       var util = require("util");
//       util.inherits(module.exports, emitter);