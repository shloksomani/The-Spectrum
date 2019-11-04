const passport = require("passport");
const User = require("./routes/index");
const bcrypt = require("bcryptjs");

const LocalStrategy = require("passport-local").Strategy;

/**
 * Called when user is added into the session.
 *
 * It stores only the unique id of the user into the session.
 *
 */
passport.serializeUser(function(user, done) {
	return done(null, user.id);
});

/**
 * Called when we need the values of the
 *
 * It takes the id into the session then finds the user in the database
 * and returns it.
 *
 */
passport.deserializeUser(async function(id, done) {
	try {
		//return done(null, User.getUserById(id));
    return done(null, User.getUserById(id));
	} catch (error) {
		done(error);
	}
});



passport.use(
	new LocalStrategy(
		{
			passReqToCallback: true,
			usernameField: "email",
			passwordField: "password"
		},
		async function(req, email, password, done) {
			// console.log(email + " in passport.js 82");

			const emailExist = User.findEmail(email);
			// console.log(userExist + " in passport.js 83");
			let match = false;
			const user = User.getUserObj(email);
			if (emailExist) {
				if (
					(email === "user" && password === "user") ||
					(email === "user2" && password === "user2")
				) {
					match = true;
				} else if (email === "admin" && password === "admin") {
					match = true;
				} else {
					match = await bcrypt.compare(password, user.password);
					// console.log(match + "in passport.js 87");
				}

				if (match) {
					/** All Set */
					return done(null, {
						id: user.id
					});
				} //end if
			} //end if

			// setting Error message in flash and calling callback
			req.flash("error", "Wrong Credentials");
			return done(null, false);
		}
	)
);

module.exports = passport;




/**
 * Passport Local Strategey
 *
 * 'passReqToCallback' is set to true to access req object and to set some flash messages
 * in case of any errors.
 */
// passport.use(
// 	new LocalStrategy(
// 		{
// passReqToCallback: true,
// usernameField: "email", // the desired username field you have defaults to 'username'
// passwordField: "password" // the desired password field you have defaults to 'password'
// 		},
// 		async function(req, email, password, done) {
// 			/**
// 			 * Find User
// 			 */
// 			const userObj = await User.findOne({ email: email });

// 			if (userObj && userObj._id) {
// 				/**
// 				 * Match Password
// 				 */
// 				const match = await bcrypt.compare(password, userObj.password);

// if (match) {
// 	/** All Set */
// 	return done(null, {
// 		id: userObj._id
// 	});
// }
// 			}

// 			/**
// 			 * Set error message in flash and call the callback.
// 			 */
// req.flash("error", "Wrong Credentials");
// return done(null, false);
// 		}
// 	)
// );
