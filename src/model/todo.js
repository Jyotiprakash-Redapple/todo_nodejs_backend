// @ts-nocheck
/**
 * @file_purpose  Todo
 * @author Jyoti Prakash
 * @Date_Created 25-05-2023
 * @Date_Modified 27-06-2023
 * @Updated_log ....!!
 */

const mongoose = require("mongoose");

const TodoSchema = new mongoose.Schema(
	{
		user: {
			type: mongoose.Schema.Types.ObjectId,
		},
		description: {
			type: String,
			required: true,
			max: 1000,
		},
	},
	{ timestamps: true }
);

mongoose.model("Todo", TodoSchema);
