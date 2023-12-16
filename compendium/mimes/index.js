'use strict';

module.exports = {
	"application/octet-stream": require("./blob"),
	
	text: require("./text"),
	"application/json": require("./json"),
};
