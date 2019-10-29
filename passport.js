const passport = require("passport");
const User = require("./models/User");
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
		return done(null, getUserById(id));
	} catch (error) {
		done(error);
	}
});

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

passport.use(
	new LocalStrategy({
		passReqToCallback: true,
		usernameField: "email",
		passwordField: "password"
	}),
	async function(req, email, password, done) {
		const user = getUserByEmail(email);

		if (user != null) {
			const match = await bcrypt.compare(password, user.password);

			if (match) {
				/** All Set */
				return done(null, {
					id: userObj._id
				});
			} //end if
		} //end if

		// setting Error message in flash and calling callback
		req.flash("error", "Wrong Credentials");
		return done(null, false);
	}
);

module.exports = passport;
