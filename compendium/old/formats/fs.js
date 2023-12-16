'use strict';

const
	fs = require('fs'),
	path = require('path');

const
	compend = require('../compend'),
	Database = require("./Database"),
	ObjectDB = require("./object");

class ChildrenDB extends Database {
	open(key) {
		return compend.openFile(path.join(this.dir, key));
	}
	
	get(key) {
		return this.open(key);
	}
	
	set(key, val) {
		this.open(key).set(val);
	}
	
	del(key) {
		fs.unlinkSync(path.join(this.dir, key));
	}
	
	enum() {
		return this.children;
	}
	
	display() {
		return this.children.join('\t');
	}
}

class FileSystemDB extends Database {
	constructor(dir) {
		this.dir = dir;
		this.sub = fs.readdirSync(dir);
		this.stat = fs.statSync(dir);
	}
	
	get(key) {
		if(typeof key === 'number') {
			return new ObjectDB(this.sub[key]);
		}
		else {
			switch(key) {
				case 'children':
					return new ChildrenDB(this);
				
				default:
					return new ObjectDB(this.stat[key]);
			}
		}
	}
	set(key, val) {
		/* Do nothing for now */
	}
	
	del(key) {
		/* Do nothing for now */
	}
	
	toString() {
		return this.sub.join('\t');
	}
}

module.exports = RawDB;
