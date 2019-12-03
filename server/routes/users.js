const bcrypt = require("bcryptjs");
const mongoose = require("mongoose");
const express = require("express");
const router = express.Router();
const User = require("../database/models/user");
const passport = require("../passport");
const middleware = require("../middleware");

router.post("/signup", middleware.notAuthenticate, async function(req, res) {
  console.log("user signup");

  const { email, password } = req.body;
  // ADD VALIDATION
  User.findOne({ username: email }, async function(err, user) {
    if (err) {
      console.log("User.js post error: ", err);
      res.status(400).send({
        error: "User.js post error:"
      });
    } else if (user) {
      res.status(400).send({
        error: `Sorry, already a user with the username: ${username}`
      });
    } else {
      const salt = await bcrypt.genSalt(10);
      const passwd = await bcrypt.hash(req.body.password, salt);
      const newUser = new User({
        username: email,
        password: passwd,
        isAdmin: false,
        history: []
      });

      console.log(newUser);
      if (email === "admin" && password === "admin") {
        newUser.isAdmin = true;
      }
      newUser.save((err, savedUser) => {
        if (err) return res.json(err);
        // req.logIn(newUser, function() {
        //   res.status(200).send(savedUser);
        // });
        req.login(newUser, function() {
          return res.status(200).send();
        });
      });
    }
  });
});

router.get("/", (req, res, next) => {
  if (req.user) {
    res.json({ user: req.user });
  } else {
    res.json({ user: null });
  }
});

router.post(
  "/login",
  middleware.notAuthenticate,
  (req, res, next) => {
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
    res.status(200).send();
  }
);

router.post("/logout", (req, res) => {
  if (req.user) {
    console.log("in logout req.user is true");
    req.session.destroy(function(err) {
      res.status(200).send({ msg: "logging out" });
    });
  } else {
    console.log("in logout req.user is false");
    res.send({ msg: "no user to log out" });
  }
});

router.get("/all", middleware.isAdmin, (req, res) => {
  User.find({}, (err, users) => {
    if (err) {
      console.log("User.js post error: ", err);
      res.status(400).send({
        error: "User.js post error:"
      });
    } else {
      console.log(users);
      res.json(users);
    }
  });
});

router.post("/admin", middleware.isAdmin, (req, res) => {
  console.log("inside server post admin");
  console.log(req.body);
  const id = mongoose.mongo.ObjectID(req.body.id);
  console.log(id);
  //res.status(200).send();

  User.deleteOne({ _id: id })
    .then(user => {
      console.log(user);
      res.status(200).send();
    })
    .catch(err => {
      console.log(err);
    });
});

router.post("/history", (req, res) => {
  console.log("inside history post");
  User.findById({ _id: req.user._id })
    .then(user => {
      user.history.push(req.body);
      user.save((err, savedUser) => {
        if (err) {
          console.log(err);
        } else {
          console.log(savedUser);
        }
      });

      res.status(200).send();
    })
    .catch(err => {
      console.log(err);
    });
});

router.get("/history", (req, res) => {
  console.log("inside history get");
  User.findById({ _id: req.user._id })
    .then(user => {
      //res.send(user.history);
      res.json({ history: user.history });
    })
    .catch(err => {
      console.log(err);
    });
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
module.exports = router;
