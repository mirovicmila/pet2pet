var express = require("express");
var router = express.Router();
var cassandra = require("cassandra-driver");

jesteadmin = true;
ulogovanuser = false;

var client = new cassandra.Client({
  contactPoints: ["127.0.0.1"],
  localDataCenter: "datacenter1",
  keyspace: "pet2pet",
});
client.connect(function (err, result) {
  console.log("admin: cassandra connected");
});
var getAllCatteries = "SELECT * FROM pet2pet.cattery";

router.get("/", function (req, res, next) {
  
  client.execute(getAllCatteries, [], function (err, result) {
    if (err) {
      res.status(404).send({ msg: err });
    } else {
      res.render("admin.ejs", {
        catteries: result.rows,
      });
    }
  });
});

module.exports = router;