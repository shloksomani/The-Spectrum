var express = require("express");
var router = express.Router();
var data = require("../data");

/* GET home page. */
router.get("/data", function(req, res, next) {
  console.log(req.url);
  console.log(req.body);
  let bias = req.url.split("=")[1];
  if (find_bias(req.url)) {
    if (req.user) {
      return res.status(200).send({ data: data, user: req.user });
    }
    return res.status(200).send({ data: data[bias], user: null });
  } else {
    return res.status(200).send({ data: data, user: null });
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
