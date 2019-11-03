const fs = require("fs");
const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware");
const User = require("../models/User");
const body_parser = require('body-parser')
let parsed_data;


// Get the dummy_data from JSON file
try {
	const data = fs.readFileSync('./public/dummy_data.json');
	parsed_data = JSON.parse(data);
	console.log("BLAST OFF!")
} catch (e) {
	parsed_data = {}
	console.log("Houston we have a problem")
}

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
			console.log(article.title);

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
	console.log(parsed_data)
	shuffleArray(data.dummy_data)
	res.render("questionable_sources", data);
})

// GET admin page
router.get("/admin", function (req, res, next) {
	const data = {};

	data.title = "admin";
	data.user = req.user;
	//data.allUsers = User.getAllUser();
	data.allUsers = User.JgetAllUser();
	res.render("admin", data);
});

//Delete user and render
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

router.get("/index/keywords", function(req, res, next){
	// //const query = req
	console.log("KEYWORDSEARCH");
	function random_dummy_data(){
		data.dummy_data = []

		// for each bias
		for (let bias in parsed_data) {
			// List of articles that have the bias
			const bias_list = parsed_data[bias]
			for (let i = 0; i < 2; i++) {
				// each article in the article list
				const article = bias_list[i]
				console.log(article.title);

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


			console.log("After the break")
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
							search_word = data.keywords[k]
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

module.exports = router;
