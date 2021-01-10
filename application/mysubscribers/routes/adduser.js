var express = require("express");
var router = express.Router();
var cassandra = require("cassandra-driver");

var client = new cassandra.Client({
  contactPoints: ["127.0.0.1"],
  localDataCenter: "datacenter1",
  keyspace: "people",
});
client.connect(function (err, result) {
  console.log("adduser: cassandra connected");
});

router.get("/", function (req, res, next) {

    res.render("adduser.ejs");
});

//Add user POST
router.post("/", function (req, res) {
  var upsertUser =
    "INSERT INTO people.users(username, email, name, password) VALUES(?,?,?,?)";
  client.execute(
    upsertUser,
    [req.body.username, req.body.email, req.body.name, req.body.password],
    function (err, result) {
      if (err) {
        res.status(404).send({ msg: err });
      } else {
        console.log("User Added");
        res.redirect("/admin");
      }
    }
  );
});
module.exports = router;
