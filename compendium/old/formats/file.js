'use strict';

const
	Database = require("./database"),
	fs = require('fs');

class FileDB extends Database {
	constructor(f) {
		this.filename = f;
		fs.readFile(f, data => this.load(data));
	}
	
	/* get(key) */
	/* set(key, val) */
	/* del(key) */
	
	/* load(data) */
	
	commit(v) {
		fs.writeFile(this.filename, v);
	}
	
	static class Fragment extends Database {
		constructor(f, db) {
			this.filedb = f;
			this.db = db;
		}
		
		set(k, v) {
			this.db.set(k, v);
			filedb.commit();
		}
	}
}

module.exports = FileDB;
