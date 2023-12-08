const appConfig = require("../../config/appConfig");

const validate = require("../middleware/validator");
const controller = require("../controller/todo");

const auth = require("../middleware/auth");
const setRouter = (app) => {
	const { apiVersion } = appConfig;

	app.post(`${apiVersion}/todo/add`, validate.addTodo, auth.isAuthorized, controller.addTodo);
	app.get(`${apiVersion}/todo/getAll`, validate.getAllTodo, auth.isAuthorized, controller.getAllTodo);
	app.post(`${apiVersion}/todo/modify`, validate.modifayTodo, auth.isAuthorized, controller.modifyTodo);
	app.post(`${apiVersion}/todo/delete`, validate.deleteTodo, auth.isAuthorized, controller.deleteTodo);
};

module.exports = {
	setRouter: setRouter,
};
