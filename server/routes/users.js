const bcrypt = require("bcryptjs");
const mongoose = require("mongoose");
const express = require("express");
const router = express.Router();
const User = require("../database/models/user");
const passport = require("../passport");

//adds user to DB after hashing password
router.post("/signup", async function(req, res) {
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
        res.json(savedUser);
      });
    }
  });
});

//gets user
router.get("/", (req, res, next) => {
  console.log("===== user!!======");
  console.log(req.user);
  if (req.user) {
    res.json({ user: req.user });
  } else {
    res.json({ user: null });
  }
});

//authenticates user via passport
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

//logs user out
router.post("/logout", (req, res) => {
  if (req.user) {
    req.logout();
    res.status(200).send({ msg: "logging out" });
  } else {
    res.send({ msg: "no user to log out" });
  }
});

//gets all users
router.get("/all", (req, res) => {
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

//deletes user upon admin removal
router.post("/admin", (req, res) => {
  console.log(req.body);
  const id = mongoose.mongo.ObjectID(req.body.id);
  console.log(id);

  User.deleteOne({ _id: id })
    .then(user => {
      console.log(user);
      res.status(200).send();
    })
    .catch(err => {
      console.log(err);
    });
});

//adds article to user history
router.post("/history", (req, res) => {
  User.findById({ _id: req.user._id })
    .then(user => {
      const currentDate = new Date();

      console.log(currentDate.toString());
      console.log(currentDate.getDate());

      const article = req.body;
      const hist = { article: article, date: currentDate };
      user.history.push(hist);
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

//gets history for particular user
router.get("/history", (req, res) => {
  User.findById({ _id: req.user._id })
    .then(user => {
      res.json({ history: user.history });
    })
    .catch(err => {
      console.log(err);
    });
});
module.exports = router;
