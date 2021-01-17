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
var getBreedById = "SELECT * FROM pet2pet.breed WHERE id = ?";
var getAllCatteries = "SELECT * FROM pet2pet.catteryInBreed WHERE idbreed = ? ALLOW FILTERING";
var getCatteries = "SELECT * FROM pet2pet.cattery";

router.get("/:id", function (req, res, next) {
    var idd, breedd, sizee, coatt, colorr, descriptionn, imagee, lifespann, foodd;
    
    var sveodgajivacnice;
    client.execute(getCatteries, function (err, result) {
      if(err) {
        res.status(404).send({ msg: err });
      }
      else {
        sveodgajivacnice = result.rows;
        console.log("sveodgajivacnice: ",sveodgajivacnice);
        
        client.execute(getBreedById, [req.params.id], function (err, result) {
        if (err) {
          res.status(404).send({ msg: err });
        } 
        else {
        idd = result.rows[0].id;
        breedd = result.rows[0].breed;
        sizee = result.rows[0].size;
        coatt = result.rows[0].coat;
        colorr = result.rows[0].color;
        descriptionn = result.rows[0].description;
        imagee = result.rows[0].image;
        lifespann = result.rows[0].lifespan;
        foodd = result.rows[0].food;

      client.execute(getAllCatteries, [req.params.id], function (err, result) {
        if (err) {
          res.status(404).send({ msg: err });
        } 
        else {
          console.log("get catteries (breed):", result.rows);
          var odgajivacnice = result.rows;
          var tacneodgajivacnice = [];
          odgajivacnice.forEach(function(o) { 
            sveodgajivacnice.forEach(function(so) { 
              console.log("id - idcattery", so.id.toString(), o.idcattery.toString())
              if(so.id.toString() == o.idcattery.toString()){
                tacneodgajivacnice.push(o);
              }
            })
          });
          console.log("tacneodgajivacnice", tacneodgajivacnice);
          res.render("breed.ejs", {
            id: idd,
            breed: breedd,
            size: sizee,
            coat: coatt,
            color: colorr,
            description: descriptionn,
            image: imagee,
            lifespan: lifespann,
            food: foodd,
            catteries: tacneodgajivacnice
          });
        }
      });
    }
  });
}
})
});

var deleteBreed = "DELETE FROM pet2pet.breed WHERE id = ?";
router.delete("/:id", function (req, res) {
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
