// Middle Wares For protected paths
// Sech as (/admin, /dashboard)

module.exports = {
  loginRequired(req, res, next) {
    if (req.user) {
      return next();
    }
    // req.flash("error", "Please Login First");
    return res.status(400).send("Please Login First");
  },

  isAdmin(req, res, next) {
    if (req.user) {
      if (req.user.username === "admin") {
        return next();
      }
      console.log(req.user);
      return res.status(400).send("Not authorized");
    }
    return res.status(400).send("Please Login First");
  },

  notAuthenticate(req, res, next) {
    if (req.user) {
      return res.status(200);
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
