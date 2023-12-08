const appConfig = require("../../config/appConfig");

const validate = require("../middleware/validator");
const controller = require("../controller/user");
const auth = require("../middleware/auth");
const setRouter = (app) => {
	const { apiVersion } = appConfig;

	app.post(`${apiVersion}/auth/signUp`, validate.signUp, controller.signUp);
	app.post(`${apiVersion}/auth/signIn`, validate.signIn, controller.signIn);
	app.get(`${apiVersion}/auth/whoAmI`, auth.isAuthorized, controller.whoAmI);
};

module.exports = {
	setRouter: setRouter,
};
