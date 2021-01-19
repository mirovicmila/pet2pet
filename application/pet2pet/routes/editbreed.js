var express = require("express");
var router = express.Router();
var cassandra = require("cassandra-driver");
//<!-- id, breed, size, coat, color, description, image, lifespan, food -->

var client = new cassandra.Client({
  contactPoints: ["127.0.0.1"],
  localDataCenter: "datacenter1",
  keyspace: "pet2pet",
});
client.connect(function (err, result) {
  console.log("editbreed: cassandra connected");
});
var getBreedById = "SELECT * FROM pet2pet.breed WHERE id = ?";

router.get("/:id", function (req, res, next) {
  client.execute(getBreedById, [req.params.id], function (err, result) {
    if (err) {
      res.status(404).send({ msg: err });
    } else {

      res.render("editbreed.ejs", {
        id: result.rows[0].id,
        breed: result.rows[0].breed,
        size: result.rows[0].size,
        coat: result.rows[0].coat,
        color: result.rows[0].color,
        description: result.rows[0].description,
        image: result.rows[0].image,
        lifespan: result.rows[0].lifespan,
        food: result.rows[0].food,
        activitylevel: result.rows[0].activitylevel,
        playfulness: result.rows[0].playfulness,
        friendliness: result.rows[0].friendliness,
        intelligence: result.rows[0].intelligence,
        independence: result.rows[0].independence
      });
    }
  });
});

//Edit breed
router.post("/", function (req, res) {
  var upsertBreed =
    "INSERT INTO pet2pet.breed(id, breed, size, coat, color, description, image, lifespan, food, activitylevel, playfulness, friendliness, intelligence, independence) VALUES(?,?,?,?,?,?,?,?,?,?,?,?,?,?)";
  client.execute(
    upsertBreed,
    [req.body.id, req.body.breed, req.body.size, req.body.coat, req.body.color,req.body.description, req.body.image, req.body.lifespan, req.body.food, req.body.activitylevel, req.body.playfulness, req.body.friendliness, req.body.intelligence, req.body.independence],
    function (err, result) {
      if (err) {
        res.status(404).send({ msg: err });
      } else {
        res.redirect("/");
      }
    }
  );
});
module.exports = router;
