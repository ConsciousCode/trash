'use strict';

const
	http = require("http"),
	mysql = require("mysql"),
	U = require("urlparse"),
	express = require("express"),
	app = express();

const sql = mysql.connect({
	username: "root",
	password: "PIrates314"
});

let
	index_route = express.Router(),
	user_route = express.Router();

index_route.get('/', (req, res) => res.render('index', {title: "Index"}));

app.use('/', index_route);
app.use('/~', user_route);
app.use(
app.get(/\/?~\/?[^\/]+)

http.createServer(function(req, res) {
	const UF = /\/?~\/([^\/]+):[!$()*+,\-.\/0-9:;=@A-Z[]^_`a-z{|}~/g;
	let url = U.parse(req.url);
	
	url.path
}).listen(80);
