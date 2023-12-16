'use strict';

const { Schema } = require("../schema");

module.exports = class TextSchema extends Schema {
	constructor(text) {
		this.text = text;
	}
	
	get(k) {
		return new TextSchema(this.text[k]);
	}
	set(k, v) {}
	del(k) {}
	has(k) {
		return k < this.text.length;
	}
	str() {
		return this.text;
	}
}
