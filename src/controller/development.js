const catcher = require("../util/catcher");
const AppEror = require("../lib/errorLib");
const mongoose = require("mongoose");
const User = mongoose.model("Users");
const responseLib = require("../lib/responseLib");
const passwordLib = require("../lib/passwordLib");
const tokenLib = require("../lib/tokenLib");

/**
 * @author Jyoti Prakash
 * @Date_Created
 * @Date_Modified
 * @function {Async} Request User sign Up
 * @functionName signUp
 * @functionPurpose
 *
 * @functionParam name , email , password
 *
 * @functionSuccess {Object} {
    "err": false,
    "message": "User Retrived Successfully",
    "data": null
}
 *
 *
 * @functionError {Object} {
    "err": true,
    "message": "",
    "data": null
}
 *
 */
const getAllSignUpUser = catcher(async (req, res, next) => {
	const { page = 1, pageSize = 6 } = req.query;

	// Calculate the number of documents to skip based on the current page and page size
	const skip = (page - 1) * pageSize;

	const totalUser = await User.find({});
	const allUser = await User.find({}).skip(skip).limit(parseInt(pageSize)).lean();
	const users = allUser.map((el) => {
		delete el.password;
		delete el.__v;
		delete el.updatedAt;
		return el;
	});
	const payload = {
		users,
		pageInfo: {
			currentPage: parseInt(page),
			pageSize: parseInt(pageSize),
		},
		totalCount: totalUser.length,
	};

	const apiResponse = responseLib.Generate(false, "User Created Successfully", payload);
	res.status(200);
	res.send(apiResponse);
	return;
});

module.exports = { getAllSignUpUser };
