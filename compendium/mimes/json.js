'use strict';

const { Schema, VoidSchema } = require("../schema");

/**
 * Stringify JSON values as summaries.
**/
function stringify(v) {
	if(v === null) {
		return 'null';
	}
	else if(v === undefined) {
		return 'undefined';
	}
	else if(Array.isArray(v)) {
		if(v.length) {
			if(v.length === 1) {
				return `[ ${stringify(v[0])} ]`;
			}
			else {
				return "[ ... ]";
			}
		}
		else {
			return "[]";
		}
	}
	else if(typeof v === 'object') {
		if(Object.keys(v).length) {
			return "{ ... }";
		}
		else {
			return "{}";
		}
	}
	else {
		return JSON.stringify(v.toString());
	}
}

class JSONAttrSchema extends Schema {
	constructor(obj) {
		super();
		this.value = obj;
	}
	
	get(k) {
		if(k in this.value) {
			return new JSONAttrSchema(this.value[k]);
		}
		else {
			return new VoidSchema();
		}
	}
	set(k, v) { throw new Error(); }
	del(k) { throw new Error(); }
	has(k) {
		return k in this.value;
	}
	str() {
		if(typeof this.value === 'object') {
			let keys = Object.keys(this.value);
			if(keys.length) {
				let v = [];
				for(let k of keys) {
					v.push(`"${k}": ${stringify(this.value[k])}`);
				}
				
				return `{\n  ${v.join(',\n  ')}\n}`
			}
			else {
				return "{}";
			}
		}
		else {
			return this.value.toString();
		}
	}
}

class JSONSchema extends Schema {
	constructor(json) {
		super();
		this.value = JSON.parse(json);
	}
	
	get(k) {
		if(k in this.value) {
			return new JSONAttrSchema(this.value[k]);
		}
		else {
			return new VoidSchema();
		}
	}
	set(k, v) {
		if(typeof this.value === 'object') {
			try {
				this.value[k] = JSON.parse(v);
			}
			catch(e) {
				this.value[k] = v; // Use it as a string
			}
		}
	}
	del(k) {
		if(typeof this.value === 'object' && k in this.value) {
			delete this.value[k];
		}
	}
	has(k) {
		return k in this.value;
	}
	str() {
		let keys = Object.keys(this.value);
		if(keys.length) {
			let v = [];
			for(let k of keys) {
				v.push(`"${k}": ${stringify(this.value[k])}`);
			}
			
			return `{\n  ${v.join(',\n  ')}\n}`
		}
		else {
			return "{}";
		}
	}
}

module.exports = JSONSchema;
