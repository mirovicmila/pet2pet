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
  console.log("editcattery: cassandra connected");
});
var getCatteryById = "SELECT * FROM pet2pet.cattery WHERE id = ?";

router.get("/cattery/:id", function (req, res, next) {
  client.execute(getCatteryById, [req.params.id], function (err, result) {
    if (err) {
      res.status(404).send({ msg: err });
    } else {
      res.render("editcattery.ejs", {
        id: result.rows[0].id,
        name: result.rows[0].name,
        address: result.rows[0].address,
        contact: result.rows[0].contact,
        description: result.rows[0].description, 
        workinghours: result.rows[0].workinghours,
        image: result.rows[0].image
      });
    }
  });
});

//Edit cattery
router.post("/", function (req, res) {
  var upsertCattery =
    "INSERT INTO pet2pet.cattery(id, name, address, contact, description, workinghours, image) VALUES(?,?,?,?,?,?,?)";
  client.execute(
    upsertCattery,
    [req.body.id, req.body.name, req.body.address, req.body.contact, req.body.description, req.body.workinghours, req.body.image],
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
