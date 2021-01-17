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
  console.log("editkitten: cassandra connected");
});
var getKittenById = "SELECT * FROM pet2pet.kitten WHERE id = ?";
//<!-- id, name, birthday, mom, dad, gender, description, price, available -->

router.get("/:id", function (req, res, next) {
  client.execute(getKittenById, [req.params.id], function (err, result) {
    if (err) {
      res.status(404).send({ msg: err });
    } else {

      res.render("editkitten.ejs", {
        id: result.rows[0].id,
        name: result.rows[0].name,
        birthday: result.rows[0].birthday,
        mom: result.rows[0].mom,
        dad: result.rows[0].dad,
        gender: result.rows[0].gender,
        description: result.rows[0].description,
        price: result.rows[0].price,
        available: result.rows[0].available       
      });
    }
  });
});

//Edit kitten
router.post("/", function (req, res) {
  var upsertKitten =
    "INSERT INTO pet2pet.kitten(id, name, birthday, mom, dad, gender, description, price, available) VALUES(?,?,?,?, ?, ?, ?, ?, ?)";
  client.execute(
    upsertKitten,
    [req.body.id, req.body.name, req.body.birthday, req.body.mom, req.body.dad, req.body.gender, req.body.description, req.body.price, req.body.available],
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
