var express = require("express");
var router = express.Router();
var cassandra = require("cassandra-driver");

var client = new cassandra.Client({
  contactPoints: ["127.0.0.1"],
  localDataCenter: "datacenter1",
  keyspace: "people",
});
client.connect(function (err, result) {
  console.log("login: cassandra connected");
});

router.get("/", function (req, res) {
  res.render("login.ejs");
});

router.post("/", function (req, res) {
    
  });

module.exports = router;
