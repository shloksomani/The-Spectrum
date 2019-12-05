var express = require("express");
var router = express.Router();
//var data = require("../data");
const mongoose = require("mongoose");
let parsed_data = {};
const {
  Article
  // daniel,
  //one_collection
} = require("../database/models/article");
mongoose.promise = Promise;
function find_bias(url) {
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
}

router.get("/data", function(req, res, next) {
  console.log("inside /data");

  let query = [
    Article.find({
      bias: "left_bias",
      published: { $gt: new Date(new Date() - 24 * 3 * 60 * 60 * 1000) }
    }).limit(30), //0
    Article.find({
      bias: "left_center_bias",
      published: { $gt: new Date(new Date() - 24 * 60 * 3 * 60 * 1000) }
    }).limit(30), //1
    Article.find({
      bias: "least_bias",
      published: { $gt: new Date(new Date() - 24 * 60 * 60 * 3 * 1000) }
    }).limit(30), // 2
    Article.find({
      bias: "right_center_bias",
      published: { $gt: new Date(new Date() - 24 * 60 * 3 * 60 * 1000) }
    }).limit(30), //3
    Article.find({
      bias: "right_bias",
      published: { $gt: new Date(new Date() - 24 * 60 * 60 * 3 * 1000) }
    }).limit(30), // 4
    Article.find({
      bias: "pro_science",
      published: { $gt: new Date(new Date() - 24 * 60 * 60 * 3 * 1000) }
    }).limit(30), // 5
    Article.find({
      bias: "conspiracy_pseudoscience",
      published: { $gt: new Date(new Date() - 24 * 60 * 60 * 3 * 1000) }
    }).limit(30), //6
    Article.find({
      bias: "questionable_sources",
      published: { $gt: new Date(new Date() - 24 * 60 * 60 * 3 * 1000) }
    }).limit(30), // 7
    Article.find({
      bias: "satire",
      published: { $gt: new Date(new Date() - 24 * 60 * 3 * 60 * 1000) }
    }).limit(30) // 8
  ];
  Promise.all(query)
    .then(results => {
      const data = {
        left_bias: results[0],
        left_center_bias: results[1],
        least_bias: results[2],
        right_center_bias: results[3],
        right_bias: results[4],
        pro_science: results[5],
        questionable_sources: results[7]
      };
      parsed_data = data;
      let bias = req.url.split("=")[1];
      if (find_bias(req.url)) {
        if (req.user) {
          return res.status(200).send({ data: data.bias, user: req.user });
        }
        return res.status(200).send({ data: data.bias, user: null });
      } else if (bias === "") {
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
  if (req.body) {
    let keywords_string = req.body.keywords.split(" ");
    let search_results = {
      results: []
    };
    if (keywords_string.length > 0) {
      let search_words = keywords_string.filter(function(el) {
        return el !== "";
      });
      const data = parsed_data;

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
            for (let k = 0; k < search_words.length; k++) {
              let search_word = search_words[k].toLowerCase();
              if (keyword == search_word) {
                // if they match, add the article to dummy data
                search_results.results.push(article);
              }
            }
          }
        }
      }
      console.log(search_results.results);

      res.status(200).send({ data: search_results.results });
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

module.exports = router;
