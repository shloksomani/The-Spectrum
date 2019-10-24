const express = require("express");
const router = express.Router();

const user = require("../models/User");

router.get("/login", function(req, res) {
	const data = {};

	data.title = "Login";
	data.errors = req.flash("error");
	data.user = req.user;

	res.render("auth/login", data);
});

router.get("/signup", function(req, res) {
	const data = {};

	data.title = "Signup";
	data.errors = req.flash("error");
	data.user = req.user;

	res.render("auth/signup", data);
});
