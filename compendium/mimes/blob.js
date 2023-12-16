'use strict';

const
	{ Schema } = require("../schema");

module.exports = class BlobSchema extends Schema {
	constructor(blob) {
		this.blob = blob;
	}
	
	get(k) {
		return new NumberSchema(this.text[k]);
	}
	set(k, v) {}
	del(k) {}
	has(k) {
		return k < this.text.length;
	}
	str() {
		return this.blob.toString();
	}
}
