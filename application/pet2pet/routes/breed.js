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
  console.log("breed: cassandra connected");
});
var getCatteryById = "SELECT * FROM pet2pet.catteries WHERE id = ?";

router.get("/breed/:id", function (req, res, next) {
    client.execute(getBreedById, [req.params.id], function (err, result) {
    if (err) {
      res.status(404).send({ msg: err });
    } else {
      res.render("breed.ejs", {
        id: result.rows[0].id,
        breed: result.rows[0].breed,
        size: result.rows[0].size,
        coat: result.rows[0].coat,
        color: result.rows[0].color,
        description: result.rows[0].description,
        image: result.rows[0].image,
        lifespan: result.rows[0].lifespan,
        food: result.rows[0].food,
      });
    }
  });
});

var deleteBreed = "DELETE FROM pet2pet.breed WHERE id = ?";
router.delete("/breed/:id", function (req, res) {
  client.execute(deleteBreed, [req.params.id], function (err, result) {
    if (err) {
      res.status(404).send({ msg: err });
    } else {
      res.json(result);
      console.log("Breed deleted!");
    }
  });
});
module.exports = router;
