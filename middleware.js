module.exports = {
	loginRequired(req, res, next) {
		console.log(req.user + " at line 4");
		if (req.user) {
			return next();
		}
		req.flash("error", "Please Login First");
		return res.redirect("/auth/login");
	},

	notAuthenticate(req, res, next) {
		if (req.user) {
			return res.redirect("/dash");
		}
		next();
	},

	Index(req, res, next) {
		if (req.user) {
			return next();
		}
		const data = {};
		data.user = req.user;
		return res.render("index", data);
	}
};
