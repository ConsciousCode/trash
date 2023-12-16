'use strict';

class Index {
	constructor() {
		this.crumbs = [];
	}
	
	top() {
		return this.crumbs[this.crumbs.length - 1];
	}
	
	add(v) {
		this.crumbs.push(v);
	}
}

module.exports = { Index };
