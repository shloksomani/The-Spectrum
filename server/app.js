//getting all modules
const express = require("express");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const session = require("express-session");
const dbConnection = require("./database");
const MongoStore = require("connect-mongo")(session);
const passport = require("./passport");
const cors = require("cors");
const app = express();
const PORT = 5000;
app.use(cors());

// Route requires
const user = require("./routes/users");

const indexRouter = require("./routes/index");

//const authRouter = require("./routes/auth"); - not currently using

// MIDDLEWARE
app.use(morgan("dev"));
app.use(
  bodyParser.urlencoded({
    extended: false
  })
);

//allows nested objects to be parsed from url
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

//Initializing passport and passport sessions
app.use(passport.initialize());
app.use(passport.session()); // calls the deserializeUser

// Routes
app.use("/", indexRouter);
app.use("/user", user);
// app.use("/auth", authRouter); - not currently using

// Starting Server
app.listen(PORT, () => {
  console.log(`App listening on PORT: ${PORT}`);
});
