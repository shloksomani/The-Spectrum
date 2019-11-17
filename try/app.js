// const createError = require("http-errors");
// const express = require("express");
// const path = require("path");
// const cookieParser = require("cookie-parser");
// const logger = require("morgan");
// const cors = require("cors");
// const session = require("express-session");
// const body_parser = require("body-parser");
// const User = require("./models/User");

// const indexRouter = require("./routes/index");
// const usersRouter = require("./routes/users");

// const authRouter = require("./routes/auth");

// const passport = require("./passport");

// const app = express();
// app.use(cors());
// // view engine setup
// app.set("views", path.join(__dirname, "views"));
// app.set("view engine", "jade");

// app.use(logger("dev"));
// app.use(express.json());
// app.use(express.urlencoded({ extended: false }));
// app.use(cookieParser());
// app.use(express.static(path.join(__dirname, "public")));

// app.use(
//   session({
//     secret: "secret key",
//     saveUninitialized: false,
//     resave: false
//   })
// );

// // Flash messages
// app.use(require("connect-flash")());

// // Initializing passport and passport sessions
// app.use(passport.initialize());
// app.use(passport.session());

// app.use("/", indexRouter);
// app.use("/users", usersRouter);
// app.use("/auth", authRouter(passport));
// // catch 404 and forward to error handler
// app.use(function(req, res, next) {
//   next(createError(404));
// });

// //allows nested objects to be parsed from url
// app.use(body_parser.urlencoded({ extended: true }));
// (function() {
//   User.RepopulateJson();
// })();
// // error handler

const express = require("express");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const session = require("express-session");
const dbConnection = require("./database");
const MongoStore = require("connect-mongo")(session);
const passport = require("./passport");
const app = express();
const PORT = 5000;
// Route requires
const user = require("./routes/users");

const indexRouter = require("./routes/index");
// const usersRouter = require("./routes/users");

const authRouter = require("./routes/auth");

// MIDDLEWARE
app.use(morgan("dev"));
app.use(
  bodyParser.urlencoded({
    extended: false
  })
);
app.use(bodyParser.json());

// Sessions
app.use(
  session({
    secret: "fraggle-rock", //pick a random string to make the hash that is generated secure
    store: new MongoStore({ mongooseConnection: dbConnection }),
    resave: false, //required
    saveUninitialized: false //required
  })
);

// Passport
app.use(passport.initialize());
app.use(passport.session()); // calls the deserializeUser

// Routes
app.use("/", indexRouter);
app.use("/user", user);
app.use("/auth", authRouter);

// app.use(function(err, req, res, next) {
//   // set locals, only providing error in development
//   res.locals.message = err.message;
//   res.locals.error = req.app.get("env") === "development" ? err : {};

//   // render the error page
//   res.status(err.status || 500);
//   res.render("error");
// });

// module.exports = app;

// Starting Server
app.listen(PORT, () => {
  console.log(`App listening on PORT: ${PORT}`);
});
