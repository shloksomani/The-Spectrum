var express = require("express");
var router = express.Router();
var data = require("../data");
const mongoose = require("mongoose");
const parsed_data = {}
const {
  Article
  // daniel,
  //one_collection
} = require("../database/models/article");
mongoose.promise = Promise;

router.get("/data", function(req, res, next) {
  console.log("inside /data");

  let query = [
    Article.find({ bias: "left_bias" }), //0
    Article.find({ bias: "left_center_bias" }), //1
    Article.find({ bias: "least_bias" }), // 2
    Article.find({ bias: "right_center_bias" }), //3
    Article.find({ bias: "right_bias" }), // 4
    Article.find({ bias: "pro_science" }), // 5
    Article.find({ bias: "conspiracy_pseudoscience" }), //6
    Article.find({ bias: "questionable_sources" }), // 7
    Article.find({ bias: "satire" }) // 8
  ];
  Promise.all(query).then(results => {
    const data = {
      left_bias: results[0],
      left_center_bias: results[1],
      least_bias: results[2],
      right_center_bias: results[3],
      right_bias: results[4],
      pro_science: results[5],
      questionable_sources: results[7]
    };
    let bias = req.url.split("=")[1];
    if (find_bias(req.url) || bias === "") {
      if (req.user) {
        return res.status(200).send({ data: data, user: req.user });
      }
      return res.status(200).send({ data: data, user: null });
    } else {
      return res.status(200).send({ data: data, user: null });
    }
    })
    .catch(err => {
      console.log(err);
    });
  });

router.post("/keywords", (req, res) => {
  console.log("inside get/keywords");

  function random_dummy_data() {
    data.dummy_data = [];

    // for each bias
    for (let bias in parsed_data) {
      // List of articles that have the bias
      const bias_list = parsed_data[bias];
      for (let i = 0; i < 2; i++) {
        // each article in the article list
        const article = bias_list[i];

        data.dummy_data.push(article);
      }
    }
  }
  parsed_data = {};
  // get the query from url
  if (req.body) {
    console.log(req.body);

    let keywords_string = req.body.keywords.split(" ");
    console.log(keywords_string);

    if (keywords_string.length > 0) {
      parsed_data.keywords = keywords_string.filter(function(el) {
        return el !== "";
      });
      // for strings that are not empty, search through keywords in dummy data. If keyword in it. Add to array
      parsed_data.dummy_data = [];

      // for each bias
      for (let bias in data) {
        // List of articles that have the bias
        const bias_list = data[bias];
        for (let i = 0; i < bias_list.length; i++) {
          // each article in the article list
          const article = bias_list[i];
          for (let j = 0; j < article.keywords.length; j++) {
            // each keyword attributed to the article
            let keyword = article.keywords[j];
            // compare the users searched words to the articles keywords
            for (let k = 0; k < parsed_data.keywords.length; k++) {
              let search_word = parsed_data.keywords[k].toLowerCase();
              if (keyword == search_word) {
                // if they match, add the article to dummy data
                parsed_data.dummy_data.push(article);
              }
            }
          }
        }
      }
      res.status(200).send({ data: parsed_data.dummy_data });
    } else {
      res.status(404).send();
    }
  } else {
    res.status(404).send();
  }
});

router.get("/", (req, res, next) => {
  console.log("===== user!!======");
  console.log(req.user);
  if (req.user) {
    res.json({ user: req.user });
  } else {
    res.json({ user: null });
  }
});

find_bias = (url) => {
  let biasToFind = url.split("=")[1];
  let storedBiases = [
    "left_bias",
    "left_center_bias",
    "least_bias",
    "right_center_bias",
    "right_bias",
    "pro_science",
    "questionable_sources"
  ];
  let found = storedBiases.find(function(element) {
    return element === biasToFind;
  });
  return found ? true : false;
};

module.exports = router;
