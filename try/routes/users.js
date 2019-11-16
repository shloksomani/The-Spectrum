var express = require("express");
var router = express.Router();
const bcrypt = require("bcryptjs");
const User = require("../models/User");
var passport = require("../passport");
/* GET users listing. */
router.get("/", function(req, res, next) {
  res.send("respond with a resource");
});

router.post("/", async function(req, res, next) {
  console.log("in server post signup successful");
  console.log(req.body.email);
  //res.status(200).send();
  const existing = User.findEmail(req.body.email);
  // if true show error
  if (existing) {
    /** Set flash message and redirect to signup page */
    //req.flash("error", "User Already Exists");
    //return res.redirect("/auth/signup");
    res.status(500).send();
  }

  if (req.body.password != req.body.password2) {
    //req.flash("error", "Password do not match");
    //return res.redirect("/auth/signup");
    res.status(500).send();
  }

  //Hash password and save it into the array

  const salt = await bcrypt.genSalt(10);
  const password = await bcrypt.hash(req.body.password, salt);
  try {
    const newUser = User.JcreateUser(
      req.body.firstName,
      req.body.email,
      password,
      false
    );
    // req.logIn(newUser, function() {
    //   //res.redirect("/dash");
    //   res.status(200).send();
    // });
    res.status(200).send();
    // Passport stuff
  } catch (error) {
    console.log("In error");

    next(error);
  }
});

router.post(
  "/login",
  passport.authenticate("local", {
    failureRedirect: "/auth/logout",
    successRedirect: "/"
  }),
  async function(req, res) {
    //res.redirect("/dash");
    res.status(200).send();
  }
);

module.exports = router;
