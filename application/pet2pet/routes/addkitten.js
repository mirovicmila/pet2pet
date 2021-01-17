var express = require("express");
var router = express.Router();
var cassandra = require("cassandra-driver");
//id, breed, size, coat, color, description, image, lifespan, food -->

var client = new cassandra.Client({
  contactPoints: ["127.0.0.1"],
  localDataCenter: "datacenter1",
  keyspace: "pet2pet",
});
client.connect(function (err, result) {
  console.log("addkitten: cassandra connected");
});

router.get("/", function (req, res, next) {

    res.render("addkitten.ejs");
});
//<!-- id, name, birthday, mom, dad, gender, description, price, available -->

//Add breed POST
router.post("/", function (req, res) {
  var upsertBreed =
    "INSERT INTO pet2pet.kitten(id, name, birthday, mom, dad, gender, description, price, available) VALUES(?,?,?,?,?,?,?,?,?)";
  client.execute(
    upsertKitten,
    [req.body.id, req.body.name, req.body.birthday, req.body.mom, req.body.dad, req.body.gender, req.body.description, req.body.price, req.body.available],
    function (err, result) {
      if (err) {
        res.status(404).send({ msg: err });
      } else {
        console.log("Kitten Added");
        res.redirect("/admin");
      }
    }
  );
});
module.exports = router;
