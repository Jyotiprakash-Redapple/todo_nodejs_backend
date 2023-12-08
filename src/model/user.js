// @ts-nocheck
/**
 * @file_purpose  user document Filed
 * @author Jyoti Prakash
 * @Date_Created 25-05-2023
 * @Date_Modified 29-05-2023
 * @Updated_log add OTP
 */

const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
	{
		name: {
			type: String,
		},
		email: {
			type: String,
		},
		password: {
			type: String,
		},
	},
	{
		timestamps: true,
	}
);
mongoose.model("Users", userSchema);
