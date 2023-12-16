'use strict';

const
	Database = require("./Database"),
	ObjectDB = require("./object");

class RawDB extends Database {
	constructor(data) {
		this.data = Uint8Array.from(data);
	}
	
	get(key) {
		return new ObjectDB(this.data[key]);
	}
	set(key, val) {
		return this.data[key] = val;
	}
	del(key) {
		let d = this.data, na = new Uint8Array(d.length - 1);
		na.set(0, d.subarray(0, key));
		na.set(key, d.subarray(key + 1));
		
		this.data = na;
		return d;
	}
	
	toString() {
		let out = "";
		for(let i = 0; i < this.data.length; i += 8) {
			let sa = this.data.subarray(i, 8);
			
			for(let j = 0; j < sa.length; ++j) {
				out += sa[j].toString(16) + " ";
			}
			
			out += " ".repeat(8 - sa.length);
			
			for(let j = 0; j < sa.length; ++j) {
				if(sa[j] < 0x20) {
					out += '.';
				}
				else {
					out += Character.fromCharCode(sa[j]);
				}
			}
		}
		return out;
	}
}

module.exports = RawDB;
