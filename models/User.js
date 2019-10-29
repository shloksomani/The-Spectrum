//const mongoose = require("mongoose");

//const model_name = "users";
const users = [];

function createUser(name, email, password) {
	let user1 = {
		name: user1,
		email: user1,
		password: user1,
		isAdmin: false
	};

	let user2 = {
		name: user2,
		email: user2,
		password: user2,
		isAdmin: false
	};

	let user3 = {
		name: user3,
		email: admin,
		password: admin,
		isAdmin: true
	};

	users.push(user1, user2, user3);
}

// Create schema for users
// const schmea = new mongoose.Schema({
//   email: {
//     type: String,
//     required: true,
//     index: true,
//     unique: true
//   },
//   name: {
//     type: String,
//     required: true
//   },
//   password: {
//     type: String,
//     required: true
//   },
//   date_created: {
//     type: Date,
//     default: Date.now()
//   }
// });

// module.exports = mongoose.model(model_name, schmea, model_name);
module.exports = createUser;
