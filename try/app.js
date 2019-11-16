var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var cors = require("cors");
const session = require("express-session");
const body_parser = require("body-parser");

var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");
const User = require("./models/User");
const passport = require("./passport");

var app = express();
app.use(cors());
// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use(
  session({
    secret: "secret key",
    saveUninitialized: false,
    resave: false
  })
);

// Flash messages
app.use(require("connect-flash")());

// Initializing passport and passport sessions
app.use(passport.initialize());
app.use(passport.session());

app.use("/", indexRouter);
app.use("/users", usersRouter);
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

//allows nested objects to be parsed from url
app.use(body_parser.urlencoded({ extended: true }));
(function() {
  User.RepopulateJson();
})();
// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
