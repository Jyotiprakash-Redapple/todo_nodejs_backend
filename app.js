//@ts-ignore
const config = require("dotenv").config({ debug: process.env.DEBUG });
if (config.error) {
	console.log(config.error);
	throw config.error;
}

const express = require("express");
const fs = require("fs");

const startDb = require("./www/db/database");
const handleError = require("./src/middleware/errorHandeler");
const routeLogger = require("./src/middleware/routeLogger");

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Handel Option Call
app.use(routeLogger.logRemoteRoute);

//Handel Cors Issue
app.use((req, res, next) => {
	res.setHeader("Access-Control-Allow-Origin", "*");
	res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
	res.setHeader("Access-Control-Allow-Headers", "Authorization");
	res.setHeader("Access-Control-Allow-Credentials", "true");
	next();
});

// Compile Model
const schemaPath = "./src/model";
fs.readdirSync(schemaPath).forEach((file) => {
	if (file.endsWith(".js")) {
		require(`${schemaPath}/${file}`);
	}
});

//Route Comile
const routes = "./src/routes";
fs.readdirSync(routes).forEach((file) => {
	if (~file.indexOf(".js")) {
		const routePath = require(routes + "/" + file);
		routePath.setRouter(app);
	}
});

// Error handling middlewares
app.use(handleError.Global);
app.use(handleError.RouteNotFound);

// Start the database and the server
startDb(app, "mongo").catch((err) => {
	console.error(err.message);
	process.exit(1);
});
