const joi = require("joi");
const AppEror = require("../lib/errorLib");
const removeLib = require("../lib/removeLib");
const checkLib = require("../lib/checkLib");
const catcher = require("../util/catcher");
const costumSignUpSchema = joi.object({
	name: joi
		.string()
		.regex(/^[a-zA-Z ]*$/, "only alphabet and space allowed")
		.required()
		.min(6)
		.max(20),
	email: joi
		.string()
		.email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } })
		.required(),
	password: joi.string().min(5).max(15).required(),
});

const costumSignInSchema = joi.object({
	email: joi
		.string()
		.email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } })
		.required(),
	password: joi.string().min(5).max(15).required(),
});

const costumAddTodoSchema = joi.object({
	description: joi.string().min(5).max(1000).required(),
});

const costumModifyTodoSchema = joi.object({
	todo_id: joi.string().required(),
	description: joi.string().min(5).max(1000).required(),
});

const costumDeleteTodoSchema = joi.object({
	todo_id: joi.string().required(),
});
const costumGetAllTodoSchema = joi.object({
	page: joi.number(),
	pageSize: joi.number(),
});
const signUp = catcher((req, res, next) => {
	if (checkLib.Empty(req.body)) {
		throw new AppEror("Empty Body Request", 404);
	}
	const validate = costumSignUpSchema.validate({ ...req.body });
	if (validate.hasOwnProperty("error")) {
		throw new AppEror(removeLib.Slash(`${validate.error}`), 404);
	} else {
		next();
	}
});

const signIn = catcher((req, res, next) => {
	if (checkLib.Empty(req.body)) {
		throw new AppEror("Empty Body Request", 404);
	}
	const validate = costumSignInSchema.validate({ ...req.body });
	if (validate.hasOwnProperty("error")) {
		throw new AppEror(removeLib.Slash(`${validate.error}`), 404);
	} else {
		next();
	}
});

const addTodo = catcher((req, res, next) => {
	if (checkLib.Empty(req.body)) {
		throw new AppEror("Empty Body Request", 404);
	}
	const validate = costumAddTodoSchema.validate({ ...req.body });
	if (validate.hasOwnProperty("error")) {
		throw new AppEror(removeLib.Slash(`${validate.error}`), 404);
	} else {
		next();
	}
});

const modifayTodo = catcher((req, res, next) => {
	if (checkLib.Empty(req.body)) {
		throw new AppEror("Empty Body Request", 404);
	}
	const validate = costumModifyTodoSchema.validate({ ...req.body });
	if (validate.hasOwnProperty("error")) {
		throw new AppEror(removeLib.Slash(`${validate.error}`), 404);
	} else {
		next();
	}
});

const deleteTodo = catcher((req, res, next) => {
	if (checkLib.Empty(req.body)) {
		throw new AppEror("Empty Body Request", 404);
	}
	const validate = costumDeleteTodoSchema.validate({ ...req.body });
	if (validate.hasOwnProperty("error")) {
		throw new AppEror(removeLib.Slash(`${validate.error}`), 404);
	} else {
		next();
	}
});

const getAllTodo = catcher((req, res, next) => {
	const { page = 1, pageSize = 6 } = req.query;
	const validate = costumGetAllTodoSchema.validate({ page, pageSize });
	if (validate.hasOwnProperty("error")) {
		throw new AppEror(removeLib.Slash(`${validate.error}`), 404);
	} else {
		next();
	}
});

const devGetAllUser = catcher((req, res, next) => {
	const { page = 1, pageSize = 6 } = req.query;
	const validate = costumGetAllTodoSchema.validate({ page, pageSize });
	if (validate.hasOwnProperty("error")) {
		throw new AppEror(removeLib.Slash(`${validate.error}`), 404);
	} else {
		next();
	}
});
module.exports = {
	signUp: signUp,
	signIn: signIn,
	addTodo: addTodo,
	modifayTodo: modifayTodo,
	deleteTodo: deleteTodo,
	getAllTodo: getAllTodo,
	devGetAllUser: devGetAllUser,
};
