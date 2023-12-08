const socket = require("../../www/socket/socket");
const nameSpaces = require("./nameSpaces");
let setSocket = (io) => {
	nameSpaces(io);
	io.on("error", (err) => {
		console.error("Socket error:", err);
	});
};

module.exports = {
	setSocket: setSocket,
};
