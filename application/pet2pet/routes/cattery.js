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
  console.log("cattery: cassandra connected");
});
var getCatteryById = "SELECT * FROM pet2pet.cattery WHERE id = ?";

router.get("/cattery/:id", function (req, res, next) {
    client.execute(getCatteryById, [req.params.id], function (err, result) {
    if (err) {
      res.status(404).send({ msg: err });
    } else {
      res.render("cattery.ejs", {
        id: result.rows[0].id,
        address: result.rows[0].address,
        contact: result.rows[0].contact,
        description: result.rows[0].description,
        workingHours: result.rows[0].workingHours,
        image: result.rows[0].image
      });
    }
  });
});

var deleteCattery = "DELETE FROM pet2pet.cattery WHERE id = ?";
router.delete("/cattery/:id", function (req, res) {
  client.execute(deleteCattery, [req.params.id], function (err, result) {
    if (err) {
      res.status(404).send({ msg: err });
    } else {
      res.json(result);
      console.log("Cattery deleted!");
    }
  });
});
module.exports = router;
