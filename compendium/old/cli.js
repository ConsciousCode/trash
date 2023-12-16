'use strict';

const
	compend = require("./compend");

function print_usage() {
	console.log("compend [get/new/del] target");
	console.log("         set target value");
}

if(sys.argv.length <= 2) {
	print_usage();
	process.exit(0);
}

let uri = sys.argv[2];
let crumbs = uri.split('/');
let owner = crumbs.slice(0, -1).join('/'), res = crumbs[crumbs.length - 1];

switch(sys.argv[1].toLowerCase()) {
	case 'get':
		console.log(
			compend.resolve(uri).dispaly()
		);
		break;
	case 'new':
		console.log(
			compend.touch(uri).display()
		)
		break;
	case 'del':
		console.log(
			compend.resolve(owner).del(res).display()
		)
		break;
	
	case 'set':
		if(sys.argv.length <= 3) {
			console.log("compend-set must have a value");
			process.exit(1);
		}
		else {
			console.log(
				compend.resolve(owner).set(res, sys.argv[3]).display()
			)
		}
	
	default:
		print_usage();
		process.exit(0);
}
