//! Add Todo
//! Delete Todo
//! Modifay Todo
//! getAllTodo
const catcher = require("../util/catcher");
const AppEror = require("../lib/errorLib");
const mongoose = require("mongoose");
const Todo = mongoose.model("Todo");
const responseLib = require("../lib/responseLib");

/**
 * @author Jyoti Prakash
 * @Date_Created
 * @Date_Modified
 * @function {Async} Request User Add Todo
 * @functionName addTodo
 * @functionPurpose
 *
 * @functionParam  description
 *
 * @functionSuccess {Object} {
    "err": false,
    "message": "Todo Add Successfully",
    "data": {
        "user": "64fb00d7a9d338750088bae6",
        "description": " birth day date 21 aug 4 ",
        "_id": "64fb13c290c3291d2bc25ff0",
        "createdAt": "2023-09-08T12:29:54.432Z",
        "updatedAt": "2023-09-08T12:29:54.432Z",
        "__v": 0
    }
}
 *
 *
 * @functionError {Object} {
    "err": true,
    "message": "ValidationError: Descriptiomn must be a valid ",
    "data": null
}
 *
 */
const addTodo = catcher(async (req, res) => {
	const { description = undefined } = req.body;

	if (!description) throw new AppEror("Entity are required", 422);

	const newTodo = new Todo({
		description,
		user: req._user._id,
	});
	const payload = (await newTodo.save()).toObject();

	delete payload.__v;
	delete payload.createdAt;

	const apiResponse = responseLib.Generate(false, "Todo Add Successfully", payload);
	res.status(200);
	res.send(apiResponse);
	return;
});

/**
 * @author Jyoti Prakash
 * @Date_Created
 * @Date_Modified
 * @function {Async} Request User Modify Todo
 * @functionName modifyTodo
 * @functionPurpose
 *
 * @functionParam  description todo_id
 *
 * @functionSuccess {Object} {
    "err": false,
    "message": "Todo Modifay Successfully",
    "data": {
        "user": "64fb00d7a9d338750088bae6",
        "description": " birth day date 21 aug 4 ",
        "_id": "64fb13c290c3291d2bc25ff0",
        "createdAt": "2023-09-08T12:29:54.432Z",
        "updatedAt": "2023-09-08T12:29:54.432Z",
        "__v": 0
    }
}
 *
 *
 * @functionError {Object} {
    "err": true,
    "message": "ValidationError: Descriptiomn must be a valid ",
    "data": null
}
 *
 */
const modifyTodo = catcher(async (req, res, next) => {
	const { description, todo_id } = req.body;
	const findTodo = await Todo.find({ user: req._user._id, _id: todo_id });
	if (!findTodo.length) throw new AppEror("Todo Not Exist Current User ", 404);

	const payload = await Todo.findByIdAndUpdate(todo_id, { description }, { new: true }).lean();
	if (!payload) throw new AppEror("Todo Not Modify", 404);
	delete payload.__v;
	delete payload.createdAt;
	const apiResponse = responseLib.Generate(false, "Todo Modify Successfully", payload);
	res.status(200);
	res.send(apiResponse);
	return;
});

/**
 * @author Jyoti Prakash
 * @Date_Created
 * @Date_Modified
 * @function {Async} Request User Delete Todo
 * @functionName modifyTodo
 * @functionPurpose
 *
 * @functionParam  todo_id
 *
 * @functionSuccess {Object} {
    "err": false,
    "message": "Todo deleted Successfully",
    "data": null
}
 *
 *
 * @functionError {Object} {
    "err": true,
    "message": "ValidationError: Descriptiomn must be a valid ",
    "data": null
}
 *
 */
const deleteTodo = catcher(async (req, res, next) => {
	const { todo_id } = req.body;
	const findTodo = await Todo.find({ user: req._user._id, _id: todo_id });
	if (!findTodo.length) throw new AppEror("Todo Not Exist Current User ", 404);
	await Todo.findByIdAndDelete(todo_id);

	const apiResponse = responseLib.Generate(false, "Todo Delete Successfully", null);
	res.status(200);
	res.send(apiResponse);
	return;
});
/**
 * @author Jyoti Prakash
 * @Date_Created
 * @Date_Modified
 * @function {Async} Request User get All Todo
 * @functionName getAllTodo
 * @functionPurpose
 *
 * @functionParam  page , pegeSize
 *
 * @functionSuccess {Object} {
    "err": false,
    "message": "Todo Retrived Successfully",
    "data": {
        "todo": [
            {
                "_id": "64fb13c290c3291d2bc25ff0",
                "user": "64fb00d7a9d338750088bae6",
                "description": " birth day date 21 aug 4 ",
                "createdAt": "2023-09-08T12:29:54.432Z",
                "updatedAt": "2023-09-08T12:29:54.432Z",
                "__v": 0
            }
        ],
        "pageInfo": {
            "currentPage": 1,
            "pageSize": 6
        },
        "totalCount": 1
    }
}
 *
 *
 * @functionError {Object} {
    "err": true,
    "message": "ValidationError: Descriptiomn must be a valid ",
    "data": null
}
 *
 */
const getAllTodo = catcher(async (req, res, next) => {
	const { page = 1, pageSize = 6 } = req.query;

	// Calculate the number of documents to skip based on the current page and page size
	const skip = (page - 1) * pageSize;

	console.log(req._user._id, "if");
	const totalTodo = await Todo.find({ user: req._user._id }).lean();
	const todo = await Todo.find({ user: req._user._id }).skip(skip).limit(parseInt(pageSize)).lean();
	const allTodo = todo.map((el) => {
		delete el.__v;

		return el;
	});
	console.log(allTodo, "allTodo");
	const payload = {
		allTodo,
		pageInfo: {
			currentPage: parseInt(page),
			pageSize: parseInt(pageSize),
		},
		totalCount: totalTodo.length,
	};
	const apiResponse = responseLib.Generate(false, "Todo Retrived Successfully", payload);
	res.status(200);
	res.send(apiResponse);
	return;
});

// const findTodo = catcher(() => {});

module.exports = {
	addTodo,
	modifyTodo,
	deleteTodo,
	getAllTodo,
};
