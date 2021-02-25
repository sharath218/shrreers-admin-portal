const mysql = require("mysql");

const db = mysql.createPool({
	host: "shree.cfol9k7xibdx.us-east-2.rds.amazonaws.com",
	user: "admin",
	password: "password",
	database: "shreedb",

	// user: "root",
	// host: "localhost",
	// password: "password",
	// database: "shreersc_db",
});

module.exports = db;
