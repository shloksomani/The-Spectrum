//const mongoose = require("mongoose");

//const model_name = "users";
let users = [
	{
		name: "user1",
		email: "shlok@test",
		password: "123456",
		isAdmin: false,
		id: "1"
	},

	{
		name: "user2",
		email: "user2",
		password: "user2",
		isAdmin: false,
		id: "2"
	},

	{
		name: "user3",
		email: "admin",
		password: "admin",
		isAdmin: true,
		id: "0"
	}
];

function createUser(name, email, password, isAdmin) {
	let user = {
		name: name,
		email: email,
		password: password,
		isAdmin: isAdmin,
		id: Date.now().toString()
	};

	users.push(user);
	return user;
}

// if an email exists it will return true otherwise false

function findEmail(email) {
	// console.log(users + " in user.js line42");
	return users.filter(user => user.email === email).length !== 0 ? true : false;
}

// Find by email
function getUserObj(email) {
	let userObj = users.find(o => o.email === email);
	// console.log(userObj + "in user.js line47");
	return userObj;
}

// Get all the User
function getAllUser() {
	return users;
}

// Find the user by id
function getUserById(id) {
	return users.filter(user => user.id === id);
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
module.exports = {
	createUser,
	findEmail,
	getUserObj,
	getAllUser,
	getUserById
};
