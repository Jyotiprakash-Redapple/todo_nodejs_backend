const responseLib = require("../lib/responseLib");
const Logger = require("../controller/logger");
const catcher = (fun) => {
	return async (req, res, next) => {
		try {
			await fun(req, res, next);
		} catch (e) {
			// Validate App Error

			if (e?.labelName === "AppError") {
				const apiResponce = responseLib.Generate(true, e.message, null);
				res.status(e.status);
				res.send(apiResponce);
				return;
			}

			// Error Logger Implement
			Logger.logErrorFile(`${e?.message}`, `${e.stack}`)
				.then(() => {
					console.log("Erorr Save In Database");
					const apiResponce = responseLib.Generate(true, e?.message, null);
					res.status(500);
					res.send(apiResponce);
					return;
				})
				.catch(() => {
					const apiResponce = responseLib.Generate(true, "Some Error Happen In Logger  Lebel", null);
					res.status(500);
					res.send(apiResponce);
					return;
				});
		}
	};
};

module.exports = catcher;
