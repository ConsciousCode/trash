module.exports = {
	schemes: {},
	register: function(name, scheme) {
		this.schemes[name] = scheme;
	},
	resolve: function(path) {
		let scheme, m = /(?:([^\/:]+):)?(.+?)$/.exec(path);
		if(m) {
			scheme = this.schemes[scheme];
		}
		if(!scheme) {
			scheme = this.schemes.file;
		}
		return (scheme || this.schemes.file)
	}
}
