const fs = require("fs");
const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware");
const User = require("../models/User");
let parsed_data;

// Get the dummydata from JSON file
try {
	const data = fs.readFileSync('./public/dummydata.json');
	parsed_data =  JSON.parse(data);
	console.log("BLAST OFF!")
}catch(e){
	parsed_data = {}
	console.log("Houston we have a problem")
}

// GET home page.
router.get("/", function(req, res, next) {
	const data = {};
	// data.title = req.user.name;
	data.user = req.user;
	data.dummy_data = parsed_data;
	console.log(data.dummy_data)
	res.render("index", data);
});

// GET dashboard page.
router.get("/dash", authMiddleware.loginRequired, function(req, res, next) {
	const data = {};

	data.title = "dash";
	data.user = req.user;

	res.render("dash", data);
});

//GET left_biases
router.get("/left_bias", function (req, res, next) {
	const data = {};
	data.user = req.user;
	data.dummydata = parsed_data.left_bias;
	res.render("left_bias", data);
})

//GET left_center_bias
router.get("/left_center_bias", function (req, res, next) {
	const data = {};
	data.user = req.user;
	data.dummydata = parsed_data.left_bias;
	res.render("left_center_bias", data);
})

//GET least_biased
router.get("/least_biased", function (req, res, next) {
	const data = {};
	data.user = req.user;
	data.dummydata = parsed_data.left_bias;
	res.render("least_biased", data);
})

//GET right_center_bias
router.get("/right_center_bias", function (req, res, next) {
	const data = {};
	data.user = req.user;
	data.dummydata = parsed_data.left_bias;
	res.render("right_center_bias", data);
})

//GET right_bias
router.get("/right_bias", function (req, res, next) {
	const data = {};
	data.user = req.user;
	data.dummydata = parsed_data.left_bias;
	res.render("right_bias", data);
})

//GET pro_science
router.get("/pro_science", function (req, res, next) {
	const data = {};
	data.user = req.user;
	data.dummydata = parsed_data.left_bias;
	res.render("pro_science", data);
})

//GET questionable_sources
router.get("/questionable_sources", function (req, res, next) {
	const data = {};
	data.user = req.user;
	data.dummydata = parsed_data.left_bias;
	res.render("questionable_sources", data);
})

// GET admin page
router.get("/admin", function(req, res, next) {
	const data = {};

	data.title = "admin";
	data.user = req.user;
	data.allUsers = User.getAllUser();
	res.render("admin", data);
});

module.exports = router;
