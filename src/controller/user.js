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
    "message": "User Created Successfully",
    "data": null
}
 *
 *
 * @functionError {Object} {
    "err": true,
    "message": "ValidationError: email must be a valid email",
    "data": null
}
 *
 */
const signUp = catcher(async (req, res, next) => {
	const { name, email, password } = req.body;

	//Validation
	if (!name || !email || !password) throw new AppEror("Entity Missing", 412);

	//Find user exist or not
	const user = await User.find({ email });
	if (user.length) throw new AppEror("User Already Exist Plz Log IN !", 412);
	const en_password = await passwordLib.Hash(password);

	//new User Create dataBase
	await User.create({ name, email, password: en_password });
	const apiResponse = responseLib.Generate(false, "User Created Successfully", null);
	res.status(200);
	res.send(apiResponse);
	return;
});

/**
 * @author Jyoti Prakash
 * @Date_Created
 * @Date_Modified
 * @function {Async} Request User sign Up
 * @functionName signIn
 * @functionPurpose
 *
 * @functionParam  email , password
 *
 * @functionSuccess {Object} {
    "err": false,
    "message": "User Sign  Successfully",
    "data": ******
}
 *
 *
 * @functionError {Object} {
    "err": true,
    "message": "ValidationError: email must be a valid email",
    "data": null
}
 *
 */
const signIn = catcher(async (req, res, next) => {
	const { email, password } = req.body;

	//Validation
	if (!email || !password) throw new AppEror("Entity Missing", 412);

	//Find user in data base
	const user = await User.findOne({ email });
	//If user not exit then chek whoami route malesious activity run useEffect
	if (!user) throw new AppEror("No User Exist, Created Account", 404);

	//decrypt password and check user
	const verifyPassword = await passwordLib.Verify(password, user.password);
	if (!verifyPassword) throw new AppEror("Invalid Password", 404);

	const token = await tokenLib.Generate(user, process.env.SECRET);
	const apiResponse = responseLib.Generate(false, "User Sign  Successfully", token);
	res.status(200);
	res.send(apiResponse);
	return;
});
const whoAmI = catcher(async (req, res, next) => {
	//Find user in data base
	const payload = await User.findById({ _id: req._user.id }).lean();

	//If user not exit then chek whoami route malesious activity run useEffect
	if (!payload) throw new AppEror("No User Exist, Created Account", 404);

	delete payload.password;
	delete payload.__v;
	delete payload.updatedAt;
	const apiResponse = responseLib.Generate(false, "User Sign  Successfully", payload);
	res.status(200);
	res.send(apiResponse);
	return;
});
module.exports = { signUp, signIn, whoAmI };
