const Client = require('node-rest-client').Client;

var client = new Client();
client.get("http://localhost:8080/", function (data, response) {
	console.log('siva '+data);
});

var args = {
	data: { test: "hello" },
	headers: { "Content-Type": "application/json" }
};

client.post("http://localhost:8080/", args, function (data, response) {
	console.log('siva '+data);
});