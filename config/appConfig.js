const db = require("./dbConfig.json")[process.env.NODEENV];

const config = {};
//@ts-ignore
config.dbUrl = `mongodb+srv://${db.userName}:${db.password}@cluster0.zmo6ugy.mongodb.net/${db.dataBaseName}?retryWrites=true&w=majority`;
config.apiVersion = "/api/v1";
module.exports = config;
