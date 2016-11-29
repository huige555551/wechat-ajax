var http = require('http');
var fs = require('fs');
var urlTool = require('url');
var path = require('path');
var querystring = require('querystring');
var mime = require("./mime").types;
var message =[]
http.createServer(function (req, res) {
	var pathname = urlTool.parse(req.url).pathname;
	if(pathname=="/updateMessage")
		updateMessage(req,res);
	else if(pathname=="/addMessage")
		addMessage(req,res);
	else sendHtml(req,res);
}).listen(8080);
console.log("Server is listening in 127.0.0.1:8080....");
function addMessage(req,res){
	req.setEncoding('utf8');
	req.on("data", function (chunk) {
		console.log("chunk",decodeURIComponent(chunk));
        var aMessage = querystring.parse(chunk);
  		console.log(aMessage);
  		message.push({"timed":aMessage.timed,"contents":aMessage.message})
     });
    updateMessage(req,res);
}

function sendHtml(req,res){
	var pathname = urlTool.parse(req.url).pathname;
	if(pathname=="/")
		pathname += "index.html"
	var realPath = "assets"+pathname;
	var ext = path.extname(realPath);
	ext = ext ? ext.slice(1) : 'unknown';
	var contentType = mime[ext] || "text/plain";
	res.setHeader("Content-Type", contentType);
	fs.readFile(realPath, "utf-8", function(err, file) {
		if (err) {
			res.writeHead(500, "Internal Server Error", {'Content-Type': 'text/plain'});
			res.end(err);
		}
		else{
			res.writeHead(200, "ok");
			res.write(file);
			res.end();
		}
	});
}
function updateMessage(req,res){
	req.setEncoding('utf8');
	req.on("data", function (chunk) {
		console.log("chunk",decodeURIComponent(chunk));
        var times = querystring.parse(chunk);
        res.writeHead(200, {"Content-Type": "text/plain"});
		console.log("message:",message);
  		res.write(JSON.stringify(message),'utf-8');
  		res.end();
  		console.log(times.timed);
     });

}
