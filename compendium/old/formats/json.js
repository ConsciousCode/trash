'use strict';

const
	Database = require("./database"),
	ObjectDB = require("./object"),
	FileDB = require("./file");

class JSONFragment extends Database {
	constructor(name, root) {
		this.name = name;
		this.root = root;
	}
}

class JSONDB extends FileDatabase {
	constructor(name) {
		super(name);
		this.root = root;
		this.data = root;
	}
	
	get(key) {
		return new FileDB.Fragment(
			this, new ObjectDB(this.data[key])
		);
	}
	
	set(key, val) {
		this.data[key] = val;
		this.commit();
	}
	
	del(key) {
		delete this.data[key];
	}
	
	commit() {
		super.commit(JSON.stringify(this.root));
	}
	
	toString() {
		return JSON.stringify(this.data);
	}
}
