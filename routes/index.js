const fs = require("fs");
const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware");
const User = require("../models/User");
let parsed_data;

// Get the dummydata from JSON file
try {
<<<<<<< Updated upstream
	const data = fs.readFileSync('./public/dummydata.json');
	parsed_data =  JSON.parse(data);
	console.log("BLAST OFF!")
}catch(e){
	parsed_data = {}
	console.log("Houston we have a problem")

=======
	const data = fs.readFileSync("./public/dummydata.json");
	parsed_data = JSON.parse(data);
	console.log("BLAST OFF!");
} catch (e) {
	parsed_data = {};
	console.log("Houston we have a problem");
>>>>>>> Stashed changes
}

// GET home page.
router.get("/", function(req, res, next) {
	const data = {};
	// data.title = req.user.name;
	data.user = req.user;
	data.dummy_data = parsed_data;
	//console.log(data.dummy_data)
	res.render("index", data);
});

// GET dashboard page.
router.get("/dash", authMiddleware.loginRequired, function(req, res, next) {
	const data = {};

	data.title = "dash";
	data.user = req.user;

	res.render("dash", data);
});

// GET admin page
router.get("/admin", function(req, res, next) {
	const data = {};

	data.title = "admin";
	data.user = req.user;
	data.allUsers = User.getAllUser();
	res.render("admin", data);
});

module.exports = router;
