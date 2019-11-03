const createError = require("http-errors");
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const session = require("express-session");
const body_parser = require('body-parser');
// Mongoose setup
// TODO: add mongoDb url from atlas
// const mongoose = require("mongoose");
// mongoose.set("useCreateIndex", true);
// mongoose
// 	.connect("URL", {
// 		useNewUrlParser: true,
// 		useUnifiedTopology: true
// 	})
// 	.then(() => console.log("database connected"))
// 	.catch(err => console.log(err));

// Calling in Users from Model
const User = require("./models/User");

// Passport Setup
/** Configured Passport */
const passport = require("./passport");

//Routes
const indexRouter = require("./routes/index");
const usersRouter = require("./routes/users");
const authRouter = require("./routes/auth");

const app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.locals.everyUser = User.getAllUser();

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

app.use("/auth", authRouter(passport));

// catch 404 and forward to error handler
app.use(function(req, res, next) {
	next(createError(404));
});

//allows nested objects to be parsed from url
app.use(body_parser.urlencoded({extended: true}))

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
