var express = require("express");
var router = express.Router();
var cassandra = require("cassandra-driver");
//<!-- id, name, birthday, mom, dad, gender, description, price, available -->

var client = new cassandra.Client({
  contactPoints: ["127.0.0.1"],
  localDataCenter: "datacenter1",
  keyspace: "pet2pet",
});
client.connect(function (err, result) {
  console.log("kitten: cassandra connected");
});
//console.log(jesteadmin);
var getKittenById = "SELECT * FROM pet2pet.kitten WHERE id = ?";
//<!-- id, name, birthday, mom, dad, gender, description, price, available -->

router.get("/:id", function (req, res, next) {
    
    client.execute(getKittenById, [req.params.id], function (err, result) {
    if (err) {
      res.status(404).send({ msg: err });
    } else {
      res.render("kitten.ejs", {
        id: result.rows[0].id,
        name: result.rows[0].name,
        birthday: result.rows[0].birthday,
        mom: result.rows[0].mom,
        dad: result.rows[0].dad,
        gender: result.rows[0].gender,
        description: result.rows[0].description,
        price: result.rows[0].price,
        available: result.rows[0].available,
        image: result.rows[0].image
      });
    }
  });
});

var deleteKitten = "DELETE FROM pet2pet.kitten WHERE id = ?";
router.delete("/:id", function (req, res) {
  client.execute(deleteKitten, [req.params.id], function (err, result) {
    if (err) {
      res.status(404).send({ msg: err });
    } else {
      res.json(result);
      console.log("Kitten deleted!");
    }
  });
});
module.exports = router;
