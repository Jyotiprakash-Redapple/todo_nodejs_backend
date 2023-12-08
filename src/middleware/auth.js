const catcher = require("../util/catcher");
const AppEror = require("../lib/errorLib");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const User = mongoose.model("Users");

const tokenLib = require("../lib/tokenLib");

const isAuthorized = catcher(async (req, res, next) => {
	const { authorization } = req.headers;

	if (!authorization) throw new AppEror("Authorization Header Empty", 413);

	const verify = await tokenLib.Verify(authorization, process.env.SECRET);

	if (!verify) throw new AppEror("Invalid User Log In Again", 412);

	//@ts-ignore
	const user = await User.findById({ _id: verify?.data?._id });
	if (!user) throw new AppEror("No User Exist, Created Account", 404);
	req._user = user;

	next();
});

module.exports = {
	isAuthorized,
};
