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

router.get("/breed/:id", function (req, res, next) {
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
        food: result.rows[0].food
      });
    }
  });
});

//Edit breed
router.post("/", function (req, res) {
  var upsertBreed =
    "INSERT INTO pet2pet.breed(id, breed, size, coat, color, description, image, lifetime, food) VALUES(?,?,?,?,?,?,?,?,?)";
  client.execute(
    upsertBreed,
    [req.body.id, req.body.breed, req.body.size, req.body.coat, req.body.color,req.body.description, req.body.image, req.body.lifetime, req.body.food],
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
