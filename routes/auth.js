const express = require("express");
const router = express.Router();
const User = require("../models/User");
const bcrypt = require("bcryptjs");
const authMiddleware = require("../middleware");

// Get Request For Login
router.get("/login", authMiddleware.notAuthenticate, function(req, res) {
	const data = {};

	data.title = "Login";
	data.errors = req.flash("error");
	data.user = req.user;

	res.render("auth/login", data);
});

// Get Request For Sign up
router.get("/signup", authMiddleware.notAuthenticate, function(req, res) {
	const data = {};

	data.title = "Signup";
	data.errors = req.flash("error");
	data.user = req.user;

	res.render("auth/signup", data);
});

// Get Request For logout
router.get("/logout", function(req, res) {
	req.logout();
	res.redirect("/");
});

// Post Request For Signup
// Will call database here to store user
router.post("/signup", async function(req, res, next) {
	// check if user exist
	const existing = User.findEmail(req.body.email);
	// if true show error
	if (existing) {
		/** Set flash message and redirect to signup page */
		req.flash("error", "User Already Exists");
		return res.redirect("/auth/signup");
	}

	if (req.body.password != req.body.password2) {
		req.flash("error", "Password do not match");
		return res.redirect("/auth/signup");
	}

	//Hash password and save it into the array

	const salt = await bcrypt.genSalt(10);
	const password = await bcrypt.hash(req.body.password, salt);
	try {
		const newUser = User.JcreateUser(
			req.body.name,
			req.body.email,
			password,
			false
		);
		req.logIn(newUser, function() {
			res.redirect("/dash");
		});
		// Passport stuff
	} catch (error) {
		next(error);
	}
});

// exporting the passport to use in the routes 
module.exports = function(passport) {
	router.post(
		"/login",
		passport.authenticate("local", {
			failureRedirect: "/auth/login",
			successRedirect: "/dash"
		}),
		async function(req, res) {
			res.redirect("/dash");
		}
	);
	return router;
};
