const appConfig = require("../../config/appConfig");
const controller = require("../controller/development");
const validator = require("../middleware/validator");
const setRouter = (app) => {
	const { apiVersion } = appConfig;

	app.get(`${apiVersion}/dev/getAllUser`, validator.devGetAllUser, controller.getAllSignUpUser);
};

module.exports = {
	setRouter: setRouter,
};
