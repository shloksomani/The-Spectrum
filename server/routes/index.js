var express = require("express");
var router = express.Router();
var data = require("../data");

/* GET home page. */
router.get("/data", function(req, res, next) {
  //console.log(data);
  console.log(req.user);
  // if (req.user) {
  //   return res.status(200).send({ user: req.user, data: data });
  // } else {
  //   return res.status(200).send({ user: null, data: data });
  // }
  if (req.user) {
    return res.status(200).send({ data: data, user: req.user });
  } else {
    return res.status(200).send({ data: data, user: null });
  }
  // res.render("index", { title: "Express" });

  //  try {
  //    axios
  //      .get("https://api.neoscan.io/api/main_net/v1/get_all_nodes")
  //      .then(data => res.status(200).send(data))
  //      .catch(err => res.send(err));
  //  } catch (err) {
  //    console.error("GG", err);
  //  }
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
