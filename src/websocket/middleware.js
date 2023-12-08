const validateUser = (user) => {
	return user.username && user.roomId;
};

const validateMessage = (message) => {
	return message.roomId && message.message;
};

module.exports = {
	validateUser,
	validateMessage,
};
