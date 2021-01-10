var express = require("express");
var router = express.Router();
var cassandra = require("cassandra-driver");

var client = new cassandra.Client({
  contactPoints: ["127.0.0.1"],
  localDataCenter: "datacenter1",
  keyspace: "people",
});
client.connect(function (err, result) {
  console.log("admin: cassandra connected");
});
var getAllUsers = "SELECT * FROM people.users";

router.get("/", function (req, res, next) {

  client.execute(getAllUsers, [], function (err, result) {
    if (err) {
      res.status(404).send({ msg: err });
    } else {
      res.render("admin.ejs", {
        users: result.rows,
      });
    }
  });
});

module.exports = router;