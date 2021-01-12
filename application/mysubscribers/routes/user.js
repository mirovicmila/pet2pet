var express = require("express");
var router = express.Router();
var cassandra = require("cassandra-driver");

var client = new cassandra.Client({
  contactPoints: ["127.0.0.1"],
  localDataCenter: "datacenter1",
  keyspace: "people",
});
client.connect(function (err, result) {
  console.log("user: cassandra connected");
});
console.log(jesteadmin);
var getUserById = "SELECT * FROM people.users WHERE username = ?";

router.get("/:username", function (req, res, next) {
    console.log("user-jesteadmin-ulogovanuser",jesteadmin, ulogovanuser);
    client.execute(getUserById, [req.params.username], function (err, result) {
    if (err) {
      res.status(404).send({ msg: err });
    } else {
      res.render("user.ejs", {
        username: result.rows[0].username,
        email: result.rows[0].email,
        name: result.rows[0].name,
        password: result.rows[0].password,
        prikazipass: jesteadmin
      });
    }
  });
});

var deleteUser = "DELETE FROM people.users WHERE username = ?";
router.delete("/:username", function (req, res) {
  client.execute(deleteUser, [req.params.username], function (err, result) {
    if (err) {
      res.status(404).send({ msg: err });
    } else {
      res.json(result);
      console.log("Obrisan je!");
    }
  });
});
module.exports = router;
