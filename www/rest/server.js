const http = require("http");
const ws = require("../socket/socket");
const startServer = (app) => {
	const restPort = process.env.RESTPOSRT || 80;
	const restServer = http.createServer(app);
	restServer.listen(restPort);

	restServer.on("listening", () => {
		if (restPort !== 80) {
			console.log(`Server Start ${restPort}`);
			ws.startSocket(restServer);
		} else {
			console.log(`Server Start Default Port ${restPort}`);
		}
	});

	restServer.on("error", (e) => {
		console.log(`Server Listiening Error`, e);
		process.exit(1);
	});
};

module.exports = startServer;
