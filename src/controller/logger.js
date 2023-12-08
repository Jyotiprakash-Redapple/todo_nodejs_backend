const fs = require("fs");
const moment = require("moment");

const appendLoggerError = (fileName, log) => {
	return new Promise((resolve, reject) => {
		fs.readFile(`logger/${fileName}`, "utf-8", (err, data) => {
			if (err) {
				reject(err);
			} else {
				const logData = JSON.parse(data);
				logData.push(log);

				fs.writeFile(`logger/${fileName}`, JSON.stringify(logData), (err) => {
					if (err) {
						reject(err);
					} else {
						//@ts-ignore
						resolve();
					}
				});
			}
		});
	});
};

const logErrorFile = (message, stack) => {
	return new Promise(async (resolve, reject) => {
		try {
			const date = new Date();
			const log = {
				message: message,
				stack: stack,
				time: moment(date.getTime()).format("hh:mm A"),
			};

			const fileName = `${date.getDate()}-${date.getMonth()}-${date.getFullYear()}.json`;
			try {
				await fs.promises.access(`logger/${fileName}`, 0);
				await appendLoggerError(fileName, log);
				//@ts-ignore
				resolve();
			} catch (e) {
				await fs.promises.writeFile(`logger/${fileName}`, JSON.stringify([]));
				await appendLoggerError(fileName, log);
				//@ts-ignore
				resolve();
			}
		} catch (e) {
			reject(e);
		}
	});
};
module.exports = {
	logErrorFile: logErrorFile,
};
