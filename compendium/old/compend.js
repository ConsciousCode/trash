const
	os = require("os"),
	path = require('path'),
	mime = require('mime');

const
	ObjectDB = require("./formats/object"),
	FileDB = require("./formats/file"),
	JSONDB = require("./formats/json"),
	RawDB = require("./formats/raw");

let rootd = path.join(os.homedir(), ".db");

module.exports = {
	default_mime: mime.default_type,
	mimes: {
		[mime.default_type]: RawDB
	},
	rootDir: rootf,
	root: new JSONDatabase(rootf),
	
	register: function(mimetype, handle) {
		this.mimes[mime] = handle;
	},
	openFile: function(fn) {
		let m = mime.lookup(fn);
		
		let handler = this.mimes[m];
		if(!handler) {
			// Try a more generic handler, eg image/svg+xml is also application/xml
			let x = /.+?\/.+?\+(.+?)$/.exec(m);
			if(x) {
				handler = this.mimes[mime.lookup(x[1])];
			}
			
			if(!handler) {
				handler = this.mimes[this.default_mime];
			}
		}
		
		return handler(fn);
	},
	resolve: function(path) {
		let db = this.root;
		for(let i = 0; i < p.length; ++i) {
			db = db.get(p[i]);
			if(typeof db === 'undefined') {
				throw new Error(`No such URI ${p.slice(0, i).join('/')}`);
			}
		}
		
		return db;
	},
	/**
	 * Like resolve, but creates entries instead of erroring
	**/
	touch: function(path) {
		let db = this.root;
		for(let i = 0; i < p.length; ++i) {
			db = db.get(p[i]) || db.set(p[i], {});
			if(typeof db === 'undefined') {
				db =
				throw new Error(`No such URI ${p.slice(0, i).join('/')}`);
			}
		}
		
		return db;
	}
}
