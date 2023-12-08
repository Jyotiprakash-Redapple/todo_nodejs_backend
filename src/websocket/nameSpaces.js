const roomNamespace = require("./roomNameSpaces");

const setupNamespaces = (io) => {
	roomNamespace(io);
};

module.exports = setupNamespaces;
