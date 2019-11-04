//const mongoose = require("mongoose");

const fs = require('fs')

// Initial Data Set
let users = [
	{
		name: "user",
		email: "user",
		password: "user",
		isAdmin: false,
		id: "1",
		history: []
	},

	{
		name: "user2",
		email: "user2",
		password: "user2",
		isAdmin: false,
		id: "2",
		history: []
	},

	{
		name: "user3",
		email: "admin",
		password: "admin",
		isAdmin: true,
		id: "0",
		history: []
	}
];


// Create a user and save it JSON
function createUser(name, email, password, isAdmin) {
	let user = {
		name: name,
		email: email,
		password: password,
		isAdmin: isAdmin,
		id: Date.now().toString(),
		history: []
	};

	users.push(user);
	return user;
}

// Find by email
// if an email exists it will return true otherwise false
function findEmail(email) {
	return JgetAllUser().filter(user => user.email === email).length !== 0 ? true : false;
}

// Getting the User Object
function getUserObj(email) {
	let userObj = JgetAllUser().find(o => o.email === email);
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

// Delete a User with specific id
function deleteUserById(id) {
	users = users.filter(user => user.id != id);
}

// Adding a user for the first time
// when the server starts to maintain the initial state
function RepopulateJson(){
	JsaveUserToJSONFile(users)
}

// Adding a User To JSON
function JcreateUser(name, email, password, isAdmin) {
	let user = {
		name: name,
		email: email,
		password: password,
		isAdmin: isAdmin,
		id: Date.now().toString(),
		history: []
	};
	userArr = JgetAllUser()
	userArr.push(user)
	users.push(user);
	JsaveUserToJSONFile(userArr)
	return user;
}


// Saving an array of user to a JSON file
const JsaveUserToJSONFile = (user) => {
	fs.writeFileSync('./models/users.json', JSON.stringify(user))
}

// Getting all user from the JSON file
const JgetAllUser = () => {
	try {
		const usersFromFile = fs.readFileSync('./models/users.json')
		return JSON.parse(usersFromFile)
	} catch (e) {
		return []
	}
}

// Getting a single user by an id
const JgetUserById = (id) => {
	const users = JgetAllUser()
	const userWithId = users.filter((user) => user.id === id)
	return userWithId
}

// Removing a user
const JremoveUser = (id) => {
	const users = JgetAllUser()
	const usersToKeep = users.filter((user) => user.id !== id)
	JsaveUserToJSONFile(usersToKeep)

	return users.length !== usersToKeep.length

}

//adding to user history
const JaddToHistory = (id, article) =>{
	const users = JgetAllUser()

	const userToChange = users.filter((user) => user.id === id)
	userToChange[0].history.push(article)
	JsaveUserToJSONFile(users)
}


module.exports = {
	createUser,
	findEmail,
	getUserObj,
	getAllUser,
	getUserById,
	deleteUserById,
	JcreateUser,
	JgetAllUser,
	JsaveUserToJSONFile,
	JgetUserById,
	JremoveUser,
	RepopulateJson,
	JaddToHistory
};
