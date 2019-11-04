//const mongoose = require("mongoose");

const fs = require('fs')

//const model_name = "users";
let users = [
	{
		name: "user1",
		email: "user1",
		password: "user1",
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

// if an email exists it will return true otherwise false
function findEmail(email) {
	// console.log(users + " in user.js line42");
	return JgetAllUser().filter(user => user.email === email).length !== 0 ? true : false;
}

// Find by email
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

function deleteUserById(id) {
	users = users.filter(user => user.id != id);
}

// Adding a user
function RepopulateJson(){
	JsaveUserToJSONFile(users)
}

// Adding a student
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


// Saving an array of students to a JSON file
const JsaveUserToJSONFile = (user) => {
	fs.writeFileSync('./models/users.json', JSON.stringify(user))
}

// Getting all students from the JSON file
const JgetAllUser = () => {
	try {
		const usersFromFile = fs.readFileSync('./models/users.json')
		return JSON.parse(usersFromFile)
	} catch (e) {
		return []
	}
}

// Getting a single student by an id
const JgetUserById = (id) => {
	const users = JgetAllUser()
	const userWithId = users.filter((user) => user.id === id)
	return userWithId
}

// Removing a student
const JremoveUser = (id) => {
	const users = JgetAllUser()
	const usersToKeep = users.filter((user) => user.id !== id)
	JsaveUserToJSONFile(usersToKeep)

	return users.length !== usersToKeep.length

}

//adding to user history
const JaddToHistory = (id, article) =>{
	const users = JgetAllUser()
	console.log("inside JaddToHistory");
	console.log(id);

	const userToChange = users.filter((user) => user.id === id)
	console.log(userToChange);
	userToChange[0].history.push(article)
	console.log(userToChange);
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
