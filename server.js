var express = require('express')
var app = express()
 
app.use(express.static(__dirname));
/*app.get('*', function (req, res) {
	console.log(req.url, __dirname);
	app.use(express.static("/"));
})*/


 
app.listen(3000)



