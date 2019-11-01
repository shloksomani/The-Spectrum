const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware");
const User = require("../models/User");

// GET home page.
router.get("/", authMiddleware.Index, function(req, res, next) {
	const data = {};

	data.title = req.user.name;
	data.user = req.user;

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
