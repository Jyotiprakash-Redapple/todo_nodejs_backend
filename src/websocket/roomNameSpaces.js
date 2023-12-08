const { validateUser, validateMessage } = require("./middleware");
module.exports = (io) => {
	const roomNamespace = io.of("/room");
	const rooms = {};
	roomNamespace.on("connection", (socket) => {
		console.log("A user connected:", socket.id);

		socket.on("join", (param) => {
			try {
				const user = JSON.parse(param);
				if (!validateUser(user)) {
					socket.emit("error", "Invalid user data");
					return;
				}

				const { username, roomId } = user;

				socket.join(roomId);
				if (!rooms[roomId]) {
					rooms[roomId] = [];
				}

				rooms[roomId].push({ id: socket.id, username });
				io.to(roomId).emit("userList", rooms[roomId]);
			} catch (e) {
				socket.emit("error", "Invalid data format");
			}
		});

		socket.on("message", (param) => {
			try {
				const msg = JSON.parse(param);
				if (!validateMessage(msg)) {
					socket.emit("error", "Invalid message data");
					return;
				}

				const { roomId, message } = msg;
				io.to(roomId).emit("message", { id: socket.id, message });
			} catch (e) {
				socket.emit("error", "Invalid data format");
			}
		});

		// Disconnect logic...

		socket.on("disconnect", () => {
			for (const roomId in rooms) {
				rooms[roomId] = rooms[roomId].filter((user) => user.id !== socket.id);
				io.to(roomId).emit("userList", rooms[roomId]);
			}
			console.log("A user disconnected:", socket.id);
		});
	});
};
