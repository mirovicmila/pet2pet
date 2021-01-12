var express = require("express");
var router = express.Router();
var cassandra = require("cassandra-driver");

var client = new cassandra.Client({
  contactPoints: ["127.0.0.1"],
  localDataCenter: "datacenter1",
  keyspace: "people",
});
client.connect(function (err, result) {
  console.log("edituser: cassandra connected");
});
var getUserById = "SELECT * FROM people.users WHERE username = ?";
var korisnickoime="";
router.get("/:username", function (req, res, next) {
  client.execute(getUserById, [req.params.username], function (err, result) {
    if (err) {
      res.status(404).send({ msg: err });
    } else {
      korisnickoime = result.rows[0].username;
      console.log("edituser-jesteadmin-ulogovanuser", jesteadmin, ulogovanuser);
      res.render("edituser.ejs", {
        username: result.rows[0].username,
        email: result.rows[0].email,
        name: result.rows[0].name,
        password: result.rows[0].password,
        prikazipass: jesteadmin
      });
    }
  });
});

//Edit user
router.post("/", function (req, res) {
  var upsertUser =
    "INSERT INTO people.users(username, email, name, password) VALUES(?,?,?,?)";
  client.execute(
    upsertUser,
    [req.body.username, req.body.email, req.body.name, req.body.password],
    function (err, result) {
      if (err) {
        res.status(404).send({ msg: err });
      } else {
        if(jesteadmin) res.redirect("/admin");
        else res.redirect("/loggeduser/"+korisnickoime);
      }
    }
  );
});
module.exports = router;
