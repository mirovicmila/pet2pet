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
  console.log("addbreed: cassandra connected");
});

router.get("/", function (req, res, next) {

    res.render("addbreed.ejs");
});

//Add breed POST
router.post("/", function (req, res) {
  id = cassandra.types.uuid();
  var upsertBreed =
    "INSERT INTO pet2pet.breed(id,breed, size, coat, color, description, image, lifespan, food, activitylevel, playfulness, friendliness, intelligence, independence) VALUES(?,?,?,?,?,?,?,?,?,?,?,?,?,?)";
  client.execute(
    upsertBreed,
    [id, req.body.breed, req.body.size, req.body.coat, req.body.color, req.body.description, req.body.image, req.body.lifespan, req.body.food, req.body.activitylevel, req.body.playfulness, req.body.friendliness, req.body.intelligence, req.body.independence],
    function (err, result) {
      if (err) {
        res.status(404).send({ msg: err });
      } else {
        console.log("Breed Added");
        res.redirect("/admin");
      }
    }
  );
});
module.exports = router;
