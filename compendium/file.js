'use strict';

const { Schema, UnknownSchema, VoidSchema } = require("./schema");
const
	mimetype = require("mime-type/with-db"),
	fs = require("fs"),
	path = require("path");

const MIMES = require("./mimes");

function load(f) {
	return fs.readSync()
}

function lookup_mime(path) {
	let m = mimetype.lookup(path);

	if(m) {
		if(m in MIMES) {
			return new MIMES[m](fs.readFileSync(path).toString());
		}
		
		let major = /^(.+?)\/.+$/.exec(m);
		if(m in MIMES) {
			return new MIMES[m](fs.readFileSync(path).toString());
		}
	}
	
	return new UnknownSchema(` (file ${path})`);
}

class DirectorySchema extends Schema {
	constructor(path) {
		super();
		
		this.path = path;
	}
	
	get(k) {
		if(k === '.') {
			return this;
		}
		
		let dir = fs.readdirSync(this.path), x = dir.indexOf(k);
		if(x === -1) {
			return new VoidSchema();
		}
		else {
			return new FileSchema(path.join(this.path, dir[x]));
		}
	}
	set(k, v) { this.mime.set(k, v) }
	del(k) { this.mime.del(k) }
	has(k) { return this.mime.has(k) }
	str() {
		let dir = fs.readdirSync(this.path);
		
		return `Directory [\n ${dir.join('\n ')}\n]`;
	}
}

class FileSchema extends Schema {
	constructor(path) {
		super();
		
		let stat = fs.statSync(path);
		
		if(stat.isDirectory()) {
			this.mime = new DirectorySchema(path);
		}
		else if(stat.isFile()) {
			this.mime = lookup_mime(path);
		}
		else {
			throw new Error("TODO: Implement non-file schemas");
		}
		
		this.path = path;
	}
	
	get(k) { return this.mime.get(k) }
	set(k, v) { this.mime.set(k, v) }
	del(k) { this.mime.del(k) }
	has(k) { return this.mime.has(k) }
	str() { return this.mime.str() }
}

module.exports = {
	FileSchema, DirectorySchema
};
