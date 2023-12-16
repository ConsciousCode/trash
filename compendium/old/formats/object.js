'use strict';

const
	Database = require("./database");

class ObjectDB extends Database {
	constructor(value) {
		this.data = value;
	}
	
	get(key) {
		if(typeof key === 'number') {
			return new ObjectDB(this.data[key]);
		}
		else if(typeof key === 'string') {
			if(key == 'size') {
				return new ObjectDB(this.data.length);
			}
		}
	}
	
	set(key, val) {
		this.data[key] = val;
	}
	
	del(key) {
		delete this.data[key];
	}
	
	toString() {
		if(Array.isArray(this.data)) {
			if(this.data.length == 0) {
				return '[]';
			}
			
			return `{ ${this.data.join('\n  ')} }`;
		}
		else {
			let keys = this.enum();
			if(keys.length == 0) {
				return "{}";
			}
			
			return `{ ${keys.join('\n  ')} }`;
		}
	}
}

module.exports = ObjectDatabase;
