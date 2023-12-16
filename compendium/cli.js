'use strict';

const
	{ Index } = require("./compend"),
	{ DirectorySchema } = require("./file");

const
	path = require("path"),
	os = require("os");

const HOME = path.join(os.homedir(), ".db");

let uri = process.argv[2], crumbs = uri.split('/');

if(crumbs[0]) {
	let index = new Index();
	
	index.add(new DirectorySchema(HOME));
	
	for(let p of crumbs) {
		index.add(index.top().get(p));
	}
	
	console.log(index.top().str());
}
else {
	throw new Error("TODO: fs");
}
