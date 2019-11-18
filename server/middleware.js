// Middle Wares For protected paths
// Sech as (/admin, /dashboard)

module.exports = {
  loginRequired(req, res, next) {
    if (req.user) {
      return next();
    }
    req.flash("error", "Please Login First");
    return res.redirect("/auth/login");
  },

  isAdmin(req, res, next) {
    if (req.user) {
      if (req.user[0].id == "0") {
        return next();
      }
      return res.redirect("/");
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
