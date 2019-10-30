const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware");

/* GET home page. */
router.get("/", authMiddleware.Index, function(req, res, next) {
	const data = {};

	data.title = req.user.name;
	data.user = req.user;

	res.render("index", data);
});

router.get("/dash", authMiddleware.loginRequired, function(req, res, next) {
	const data = {};

	data.title = "dash";
	data.user = req.user;

	res.render("dash", data);
});

module.exports = router;
