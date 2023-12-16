'use strict';

/**
 * Base schema definition.
**/
class Schema {
	get(k) {}
	set(k, v) {}
	del(k) {}
	has(k) {}
	str() {}
}

/**
 * It's not empty, but we don't know how to access it.
**/
class UnknownSchema extends Schema {
	constructor(d) {
		super();
		this.description = d;
	}
	
	get(k) { return this }
	set(k, v) {}
	del(k) {}
	has(k) { return false }
	str() {
		return `[Data]${this.description}`;
	}
}

/**
 * The absence of data.
**/
class VoidSchema extends Schema {
	get(k) {
		return this;
	}
	set(k, v) {}
	del(k) {}
	has(k) {
		return false;
	}
	str() {
		return "[void]";
	}
}

module.exports = {
	Schema, UnknownSchema, VoidSchema
};
