const responseLib = require("../lib/responseLib");
const multer = require("multer");
const Logger = require("../controller/logger");
const globalError = (err, req, res, next) => {
	// Handel If Any App Label Error
	if (err?.labelName === "AppError") {
		const apiResponce = responseLib.Generate(true, err.message, null);
		res.status(err.status);
		res.send(apiResponce);
		return;
	}

	// Error Save In Local File
	Logger.logErrorFile(`${err?.message}`, `${err.stack}`)
		.then(() => {
			if (err instanceof multer.MulterError) {
				const apiResponce = responseLib.Generate(true, "Only Image File Uploded", null);
				res.status(500);
				res.send(apiResponce);
			} else {
				// Handel Global Error
				const apiResponce = responseLib.Generate(true, "Some Error Occored In Global Lebel", null);
				res.status(500);
				res.send(apiResponce);
			}
		})
		.catch(() => {
			// If any Error Happen Not Handel By Controller/Logger
			const apiResponce = responseLib.Generate(true, "Some Error Happen In Logger Lavel", null);
			res.status(500);
			res.send(apiResponce);
			return;
		});
};

const routeNotFound = (req, res) => {
	const apiResponce = responseLib.Generate(true, "Rouete Not Found", null);
	res.status(404);
	res.send(apiResponce);
};

module.exports = {
	Global: globalError,
	RouteNotFound: routeNotFound,
};
