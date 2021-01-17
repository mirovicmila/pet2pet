var express = require("express");
var router = express.Router();
var cassandra = require("cassandra-driver");

jesteadmin = true;
ulogovanuser = false;

var client = new cassandra.Client({
  contactPoints: ["127.0.0.1"],
  localDataCenter: "datacenter1",
  keyspace: "pet2pet",
});
client.connect(function (err, result) {
  console.log("admin: cassandra connected");
});
var getAllCatteries = "SELECT * FROM pet2pet.cattery";
var getAllBreeds = "SELECT * FROM pet2pet.breed";
var getAllKittens = "SELECT * FROM pet2pet.kitten";

router.get("/", function (req, res, next) {
  var breedss, kittenss, catteriess;
  
  client.execute(getAllCatteries, [], function (err, result) {
    if (err) {
      res.status(404).send({ msg: err });
    } 
    else {
        catteriess = result.rows;
        
        client.execute(getAllBreeds, [], function (err, result) {
            if (err) {
              res.status(404).send({ msg: err });
            } 
            else {
                breedss = result.rows;
                
                client.execute(getAllKittens, [], function (err, result) {
                    if (err) {
                      res.status(404).send({ msg: err });
                    } 
                    else {
                        kittenss = result.rows;
                        
                        console.log("breeds:", breedss, "catteriess:", catteriess, "kittenss: ", kittenss);
                        res.render("admin.ejs", {
                            kittens: result.rows,
                            breeds: breedss,
                            catteries: catteriess
                        });
                    }
                  });
            }
          });
    }
  });
});

router.post("/", function (req, res) {
    id = cassandra.types.uuid();
    var upsertBreed =
      "INSERT INTO pet2pet.breed(id,breed, size, coat, color, description, image, lifespan, food) VALUES(?,?,?,?,?,?,?,?,?)";
    client.execute(
      upsertBreed,
      [id, req.body.breed, req.body.size, req.body.coat, req.body.color, req.body.description, req.body.image, req.body.lifespan, req.body.food],
      function (err, result) {
        if (err) {
          res.status(404).send({ msg: err });
        } else {
          console.log("Breed Added");
          res.redirect("/admin");
        }
      }
    );
  });

  /*router.post("/", function (req, res) {
    id = cassandra.types.uuid();
    var upsertBreed =
      "INSERT INTO pet2pet.kitten(id,breed, size, coat, color, description, image, lifespan, food) VALUES(?,?,?,?,?,?,?,?,?)";
    client.execute(
      upsertBreed,
      [id, req.body.breed, req.body.size, req.body.coat, req.body.color, req.body.description, req.body.image, req.body.lifespan, req.body.food],
      function (err, result) {
        if (err) {
          res.status(404).send({ msg: err });
        } else {
          console.log("Breed Added");
          res.redirect("/admin");
        }
      }
    );
  });*/

module.exports = router;
