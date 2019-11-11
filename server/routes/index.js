const fs = require("fs");
const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware");
const User = require("../models/User");
const Admin = require("../adminFunction/adminFunction")
const body_parser = require('body-parser')
let parsed_data;


// Will call database here to get the news summary 
// and will use it populate the pages dynamically 
// Get the dummy_data from JSON file
try {
	const data = fs.readFileSync('./public/dummy_data.json');
	parsed_data = JSON.parse(data);
	console.log("Welcome to \"The Spectrum\" ")
} catch (e) {
	parsed_data = {}
}

// To have shuffled news on any page
function shuffleArray(array) {
	for (var i = array.length - 1; i > 0; i--) {
		var j = Math.floor(Math.random() * (i + 1));
		var temp = array[i];
		array[i] = array[j];
		array[j] = temp;
	}
}

//repopulates json user array whenever server launches again
(function(){
	User.RepopulateJson();
})()

// GET home page.
router.get("/", function (req, res, next) {
	const data = {};
	// data.title = req.user.name;
	data.user = req.user;
	//data.dummy_data = parsed_data;
	data.dummy_data = []
	// randomize the order

	// for each bias
	for (let bias in parsed_data) {
		// List of articles that have the bias
		const bias_list = parsed_data[bias]
		for (let i = 0; i < 2; i++) {
			// each article in the article list
			const article = bias_list[i]
			data.dummy_data.push(article)
		}
	}
	shuffleArray(data.dummy_data)
	res.render("index", data);
});

// GET dashboard page.
router.get("/dash", authMiddleware.loginRequired, function (req, res, next) {
	const data = {};

	data.title = "dash";
	data.user = req.user;

	res.render("dash", data);
});

//GET left_biases
router.get("/left_bias", function (req, res, next) {
	const data = {};
	data.user = req.user;
	data.dummy_data = parsed_data.left_bias;
	shuffleArray(data.dummy_data)
	res.render("left_bias", data);
})

//GET left_center_bias
router.get("/left_center_bias", function (req, res, next) {
	const data = {};
	data.user = req.user;
	data.dummy_data = parsed_data.left_center_bias;
	shuffleArray(data.dummy_data)
	res.render("left_center_bias", data);
})

//GET least_biased
router.get("/least_bias", function (req, res, next) {
	const data = {};
	data.user = req.user;
	data.dummy_data = parsed_data.least_bias;
	shuffleArray(data.dummy_data)
	res.render("least_bias", data);
})

//GET right_center_bias
router.get("/right_center_bias", function (req, res, next) {
	const data = {};
	data.user = req.user;
	data.dummy_data = parsed_data.right_center_bias;
	shuffleArray(data.dummy_data)
	res.render("right_center_bias", data);
})

//GET right_bias
router.get("/right_bias", function (req, res, next) {
	const data = {};
	data.user = req.user;
	data.dummy_data = parsed_data.right_bias;
	shuffleArray(data.dummy_data)
	res.render("right_bias", data);
})

//GET pro_science
router.get("/pro_science", function (req, res, next) {
	const data = {};
	data.user = req.user;
	data.dummy_data = parsed_data.pro_science;
	shuffleArray(data.dummy_data)
	res.render("pro_science", data);
})

//GET questionable_sources
router.get("/questionable_sources", function (req, res, next) {
	const data = {};
	data.user = req.user;
	data.dummy_data = parsed_data.questionable_sources;
	shuffleArray(data.dummy_data)
	res.render("questionable_sources", data);
})

// GET admin page
router.get("/admin", authMiddleware.isAdmin ,function (req, res, next) {
	const data = {};

	data.title = "admin";
	data.user = req.user;
	//data.allUsers = User.getAllUser();
	data.allUsers = User.JgetAllUser();
	res.render("admin", data);
});

//Delete user and render admin
router.post("/admin", function (req, res, next) {
	const data = {};

	data.title = "admin";
	data.user = req.user;
	//data.allUsers = User.getAllUser();
	//data.allUsers = data.allUsers.filter(user => user.id != "2");
	const id = req.body.id.split(" ")[1]
	User.JremoveUser(id)
	data.allUsers = User.JgetAllUser();
	res.render("admin", data);
});

// Submit the URL for the Admin Approval
router.post("/dash", function (req, res, next) {
	const data = {};
	data.title = "dash";
	data.user = req.user;

	Admin.createObj(req.user[0].email, req.body.urlToSubmit)
	//data.allUsers = User.getAllUser();
	//data.allUsers = data.allUsers.filter(user => user.id != "2");
	res.redirect("/dash");
});

// Search Functionality
router.get("/index/keywords", function(req, res, next){

	function random_dummy_data(){
		data.dummy_data = []

		// for each bias
		for (let bias in parsed_data) {
			// List of articles that have the bias
			const bias_list = parsed_data[bias]
			for (let i = 0; i < 2; i++) {
				// each article in the article list
				const article = bias_list[i]

				data.dummy_data.push(article)
			}
		}
	}
	//console.log(location);
	data = {}
	data.user = req.user;
	// get the query from url
	if (req.url){
		keywords_string = req.url.split('=')[1]
		if (keywords_string != '') {
			data.keywords = keywords_string.split("+").filter(function(el) {
				return el != "";
			})
			// for strings that are not empty, search through keywords in dummy data. If keyword in it. Add to array
			data.dummy_data = []

			// for each bias
			for (let bias in parsed_data) {
				// List of articles that have the bias
				const bias_list = parsed_data[bias]
				for (let i = 0; i < bias_list.length; i++){
					// each article in the article list
					const article = bias_list[i]
					for (let j = 0; j < article.keywords.length; j++){
						// each keyword attributed to the article
						keyword = article.keywords[j]
						// compare the users searched words to the articles keywords
						for (let k = 0; k < data.keywords.length; k++){
							search_word = data.keywords[k].toLowerCase()
							if (keyword == search_word ){
								// if they match, add the article to dummy data
								data.dummy_data.push(article)
							}
						}
					}
				}
			}
		}
		else {
			random_dummy_data()
		}
	}
	else {
		random_dummy_data()
	}


	res.render("index", data);
})

//get user history
router.get("/user/history", function(req, res, next){
	const data = {};
	// data.title = req.user.name;
	data.user = req.user;
	//data.dummy_data = parsed_data;
	res.render("history", data)
})

//adds article to user history
router.post("/index/history", function(req, res, next){
	const article = req.body
	if(req.user){
	User.JaddToHistory(req.user[0].id, article)
}
res.redirect("/")
})
module.exports = router;
