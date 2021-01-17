var express = require("express");
var router = express.Router();
var cassandra = require("cassandra-driver");
//id, name, address, contact, description, workinghours, image -->

var client = new cassandra.Client({
  contactPoints: ["127.0.0.1"],
  localDataCenter: "datacenter1",
  keyspace: "pet2pet",
});
client.connect(function (err, result) {
  console.log("addcattery: cassandra connected");
});

router.get("/", function (req, res, next) {

    res.render("addcattery.ejs");
});

//Add cattery POST
router.post("/", function (req, res) {
  id = cassandra.types.uuid();

  var upsertCattery =
    "INSERT INTO pet2pet.cattery(id, name, address, contact, description, workinghours, image) VALUES(?,?,?,?,?,?,?)";
  client.execute(
    upsertCattery,
    [id, req.body.name, req.body.address, req.body.contact, req.body.description, req.body.workinghours, req.body.image],
    function (err, result) {
      if (err) {
        res.status(404).send({ msg: err });
      } else {
        console.log("cattery Added");
        res.redirect("/");
      }
    }
  );
});
module.exports = router;
