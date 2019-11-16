var express = require("express");
var router = express.Router();
var data = require("../data");

/* GET home page. */
router.get("/", function(req, res, next) {
  console.log(data);
  return res.json(data);

  // res.render("index", { title: "Express" });
});

module.exports = router;
