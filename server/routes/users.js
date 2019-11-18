// var express = require("express");
// var router = express.Router();
// const bcrypt = require("bcryptjs");
// const User = require("../models/User");
// var passport = require("../passport");
// /* GET users listing. */
// router.get("/", function(req, res, next) {
//   res.send("respond with a resource");
// });

// router.post("/", async function(req, res, next) {
//   console.log("in server post signup successful");
//   console.log(req.body.email);
//   //res.status(200).send();
//   const existing = User.findEmail(req.body.email);
//   // if true show error
//   if (existing) {
//     /** Set flash message and redirect to signup page */
//     //req.flash("error", "User Already Exists");
//     //return res.redirect("/auth/signup");
//     res.status(500).send();
//   }

//   if (req.body.password != req.body.password2) {
//     //req.flash("error", "Password do not match");
//     //return res.redirect("/auth/signup");
//     res.status(500).send();
//   }

//   //Hash password and save it into the array

//   const salt = await bcrypt.genSalt(10);
//   const password = await bcrypt.hash(req.body.password, salt);
//   try {
//     const newUser = User.JcreateUser(
//       req.body.firstName,
//       req.body.email,
//       password,
//       false
//     );
//     // req.logIn(newUser, function() {
//     //   //res.redirect("/dash");
//     //   res.status(200).send();
//     // });
//     res.status(200).send();
//     // Passport stuff
//   } catch (error) {
//     console.log("In error");

//     next(error);
//   }
// });

// // router.post(
// //   "/login",
// //   passport.authenticate(
// //     "local"
// //     //   failureRedirect: "/auth/logout",
// //     //   successRedirect: "/"
// //   ),
// //   async function(req, res) {
// //     //res.redirect("/dash");
// //     var userInfo = {
// //       username: req.user.username
// //     };
// //     // res.send(userInfo);
// //     // console.log(req.body);
// //     res.status(200).send();
// //   }
// // );

// module.exports = router;

const express = require("express");
const router = express.Router();
const User = require("../database/models/user");
const passport = require("../passport");

router.post("/signup", (req, res) => {
  console.log("user signup");

  const { email, password } = req.body;
  // ADD VALIDATION
  User.findOne({ username: email }, (err, user) => {
    console.log("Inside findOne fn");
    console.log(user);

    if (err) {
      console.log("User.js post error: ", err);
    } else if (user) {
      res.json({
        error: `Sorry, already a user with the username: ${username}`
      });
    } else {
      const newUser = new User({
        username: email,
        password: password
      });
      console.log("Inside post /signup");

      console.log(newUser);

      newUser.save((err, savedUser) => {
        if (err) return res.json(err);
        res.json(savedUser);
      });
    }
  });
});

router.get("/", (req, res, next) => {
  console.log("===== user!!======");
  console.log(req.user);
  if (req.user) {
    res.json({ user: req.user });
  } else {
    res.json({ user: null });
  }
});

router.post(
  "/login",
  function(req, res, next) {
    console.log("routes/user.js, login, req.body: ");
    console.log(req.body);
    next();
  },
  passport.authenticate("local"),
  (req, res) => {
    console.log("logged in", req.user);
    var userInfo = {
      username: req.user.username
    };
    res.send(userInfo);
  }
);

router.post("/logout", (req, res) => {
  if (req.user) {
    console.log("in logout req.user is true");
    req.logout();
    res.send({ msg: "logging out" });
  } else {
    console.log("in logout req.user is false");
    res.send({ msg: "no user to log out" });
  }
});

module.exports = router;
