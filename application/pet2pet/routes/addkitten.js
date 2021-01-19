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
  id = cassandra.types.uuid();
  var upsertKitten =
    "INSERT INTO pet2pet.kitten(id, name, birthday, mom, dad, gender, description, price, available, image) VALUES(?,?,?,?,?,?,?,?,?,?)";
  client.execute(
    upsertKitten,
    [id, req.body.name, req.body.birthday, req.body.mom, req.body.dad, req.body.gender, req.body.description, req.body.price, req.body.available, req.body.image],
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
