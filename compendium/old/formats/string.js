'use strict';

const
	NilDB = require("./nil"),
	Database = require("./database");

class StringDB extends Database {
	constructor(value) {
		this.value = value;
	}
	
	get(key) {
		return new NilDB();
	}
	
	set(key, val) {
		return;
	}
	
	del(key) {
		return;
	}
	
	toString() {
		return this.value;
	}
}

module.exports = StringDatabase;
