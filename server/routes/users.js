const bcrypt = require("bcryptjs");
const mongoose = require("mongoose");
const express = require("express");
const router = express.Router();
const User = require("../database/models/user");
const Submission = require("../database/models/suggestedArticle");
const passport = require("../passport");
const middleware = require("../middleware");

router.post("/signup", middleware.notAuthenticate, async function(req, res) {
  console.log("user signup");

  const { email, password } = req.body;
  // ADD VALIDATION
  User.find({})
    .then(res => {
      if (res) {
        console.log(res);
      }
    })
    .catch(err => {
      console.log("Error in getting pro science");
      console.log(err);
    });

  User.findOne({ username: email }, async function(err, user) {
    if (err) {
      console.log("User.js post error: ", err);
      res.status(400).send({
        error: "User.js post error:"
      });
    } else if (user) {
      res.status(400).send({
        error: `Sorry, already a user with the username: ${email}`
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

router.get("/suggested_articles", middleware.isAdmin, (req, res) => {
  Submission.find({}, (err, articles) => {
    if (err) {
      console.log("No links to show", err);
      res.status(400).send({
        error: "No links to show"
      });
    } else {
      console.log(articles);
      res.json(articles);
    }
  });
});

router.post("/suggested_articles", middleware.loginRequired, (req, res) => {
  if (req.user) {
    const { link } = req.body;
    submission = new Submission({
      username: req.user.username,
      url: link
    });
    submission.save().then(result => {
      res.status(200).send();
    });
  }
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

router.post("/history", middleware.loginRequired, (req, res) => {
  console.log("inside history post");
  User.findById({ _id: req.user._id })
    .then(user => {
      const currentDate = new Date();

      console.log(currentDate.toString());
      console.log(currentDate.getDate());

      const article = req.body.article;
      console.log(article);

      const hist = {
        article: { title: article.title, bias: article.bias },
        date: currentDate
      };
      console.log("history:");
      console.log(hist);
      user.history.push(hist);
      //user.history.push(req.body);
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

router.get("/history", middleware.loginRequired, (req, res) => {
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

router.get("/dash", middleware.loginRequired, (req, res, next) => {
  console.log("===== user!!======");
  console.log(req.user);
  if (req.user) {
    res.json({ user: req.user });
  } else {
    res.json({ user: null });
  }
});
module.exports = router;
