const { connect, connection } = require("mongoose");
const startServer = require("../rest/server");

const startDb = (app, app_type) => {
	return new Promise((resolve, reject) => {
		try {
			switch (app_type) {
				case "mysql": {
					console.log("Database Not Defined ");
					break;
				}
				case "mongo": {
					console.log(`Node Enviroment ${process.env.NODEENV} AND Database Type ${process.env.DATABASETYPE}`);
					const dbConfig = require("../../config/dbConfig.json")[process.env.NODEENV];

					//@ts-ignore
					connect(`mongodb+srv://${dbConfig.userName}:${dbConfig.password}@cluster0.zmo6ugy.mongodb.net/${dbConfig.dataBaseName}?retryWrites=true&w=majority`);
					connection.on("error", (er) => {
						reject(er);
					});
					connection.on("open", (err) => {
						if (err) {
							reject(err);
						}
						console.log(`MongoDB Database Connected Host ${dbConfig.host}`);
						startServer(app);
					});
					connection.on("disconnected", () => {
						reject(new Error("MongoDB Database DisConnected"));
					});
					break;
				}
				default:
					{
						console.log("Not Connected To Any Database");
						reject(new Error("Invalid database type: " + app_type));
					}
					//@ts-ignore
					resolve();
			}
		} catch (e) {
			reject(e);
		}
	});
};
module.exports = startDb;
