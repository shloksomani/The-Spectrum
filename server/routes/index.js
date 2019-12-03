var express = require("express");
var router = express.Router();
var data1 = require("../data");
const mongoose = require("mongoose");
const { left, least_bias,left_center, right_center, daniel } = require("../database/models/article")
mongoose.promise = Promise;


/* GET home page. */
router.get("/data", function(req, res, next) {
  console.log(req.url);
  let bias = req.url.split("=")[1];
  let data = {}
  daniel.find().then(response=>{
    console.log("found daniel");
     
    console.log(response);
      
  }).catch(err=>{console.log(err);
  })
  // least_bias.find({}).then((response)=>{
  //   //console.log(res);
  //   //data["least_bias"] = res;
  //    res.status(200).send({ data: response, user: null });
  // }).catch((err)=>{
  //   console.log(err);   
  // })
  // // Fetching articles from DB from past 3 days
  // for (collection1 in mongoose.connection.collections){
    
  //   // check if it is a bias collection
  //   if (collection1 == 'user') {continue}
  //   mongoose.connection.collection(collection1, function(collection) {
  //     data[collection1] = collection.find({})
  //  // .toArray()
  //   .then(
  //       documents => {

  //         // get docs from past 3 days
  //         data.collection = documents;
  //         console.log(documents);
  //       },
  //       error => {
  //         log("Can't fetch articles for left bias", error);
  //       }
  //     ).catch(err=>{
  //         console.log("error in getting collections");
  //         console.log(err);
          
  //     })
  //   })
  // }
  
  console.log("DATATATA")
  console.log(data)
  // if (find_bias(req.url)) {
  //   if (req.user) {
  //     return res.status(200).send({ data: data, user: req.user });
  //   }
  //   return res.status(200).send({ data: data[bias], user: null });
  // } else {
  //   return res.status(200).send({ data: data, user: null });
  // }
  res.status(404).send()
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

    keywords_string = req.body.keywords.split(" ");
    console.log(keywords_string);

    if (keywords_string.length > 0) {
      parsed_data.keywords = keywords_string.filter(function(el) {
        return el != "";
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
            keyword = article.keywords[j];
            // compare the users searched words to the articles keywords
            for (let k = 0; k < parsed_data.keywords.length; k++) {
              search_word = parsed_data.keywords[k].toLowerCase();
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

find_bias = url => {
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
