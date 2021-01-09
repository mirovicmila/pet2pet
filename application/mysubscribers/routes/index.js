var express = require("express");
var router = express.Router();
var cassandra = require("cassandra-driver");

var client = new cassandra.Client({
  contactPoints: ["127.0.0.1"],
  localDataCenter: "datacenter1",
  keyspace: "people",
});
client.connect(function (err, result) {
  console.log("index: cassandra connected");
});
var getAllSubscribers = "SELECT * FROM people.subscribers";
/* GET home page. */
router.get("/", function (req, res, next) {
  //res.render("index", { title: "My subscribers" });
  client.execute(getAllSubscribers, [], function (err, result) {
    if (err) {
      res.status(404).send({ msg: err });
    } else {
      res.render("index.ejs", {
        subscribers: result.rows,
      });
    }
  });
});

module.exports = router;
