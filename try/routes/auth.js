const express = require("express");
const router = express.Router();
const User = require("../models/User");
const bcrypt = require("bcryptjs");
const authMiddleware = require("../middleware");
// const User = require("../database/models/user");
const passport = require("../passport");

// // Get Request For Login
// router.get("/login", function(req, res) {
//   const data = {};

//   data.title = "Login";
//   data.errors = req.flash("error");
//   data.user = req.user;

//   // res.render("auth/login", data);
// });

// Get Request For Sign up
// router.get("/signup", authMiddleware.notAuthenticate, function(req, res) {
//   const data = {};

//   data.title = "Signup";
//   data.errors = req.flash("error");
//   data.user = req.user;

//   res.render("auth/signup", data);
// });

router.post("/logout", (req, res) => {
  console.log(req.user);
  if (req.user) {
    req.logout();
    res.status(200).send;
  } else {
    res.status(400).send;
  }
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

router.get("/dash", (req, res, next) => {
  console.log("===== user!!======");
  console.log(req.user);
  if (req.user) {
    res.json({ user: req.user });
  } else {
    res.json({ user: null });
  }
});

// exporting the passport to use in the routes
module.exports = function(passport) {
  router.post(
    "/login",
    passport.authenticate("local", {
      successRedirect: "/"
    }),
    async function(req, res) {
      // res.redirect("/dash");

      res.status(200).send;
    }
  );
  return router;
};
