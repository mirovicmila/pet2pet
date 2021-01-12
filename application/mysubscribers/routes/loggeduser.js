var express = require("express");
var router = express.Router();
var cassandra = require("cassandra-driver");
var cloudinary = require('cloudinary').v2;


var client = new cassandra.Client({
  contactPoints: ["127.0.0.1"],
  localDataCenter: "datacenter1",
  keyspace: "people",
});
client.connect(function (err, result) {
  console.log("loggeduser: cassandra connected");
});


var getUserById = "SELECT * FROM people.users WHERE username = ?";
var korisnickoime="";
router.get("/:username", function (req, res, next) {
    console.log("loggeduser-jesteadmin-ulogovanuser",jesteadmin, ulogovanuser);
    client.execute(getUserById, [req.params.username], function (err, result) {
    if (err) {
      res.status(404).send({ msg: err });
    } else {
        korisnickoime = result.rows[0].username;
      res.render("loggeduser.ejs", {
        username: result.rows[0].username,
        email: result.rows[0].email,
        name: result.rows[0].name,
        password: result.rows[0].password,
        prikazipass: jesteadmin
      });
    }
  });
});

router.post("/", function(req, res){
});

module.exports = router;
