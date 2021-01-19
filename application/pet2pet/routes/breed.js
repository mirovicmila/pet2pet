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
var getSecondBreed = "SELECT * FROM pet2pet.similarBreeds WHERE idfirst = ? ALLOW FILTERING";
var getFirstBreed = "SELECT * FROM pet2pet.similarBreeds WHERE idsecond = ? ALLOW FILTERING";
var getAllBreeds = "SELECT * FROM pet2pet.breed";

router.get("/:id", function (req, res, next) {
    var idd, breedd, sizee, coatt, colorr, descriptionn, imagee, lifespann, foodd;
    
    var sveodgajivacnice;
    var slicneRase;
    var secondSlicneRase;
    var sverase;
    client.execute(getAllBreeds, function(err, result) {
      if(err){
        res.status(404).send({ msg: err });
      }
      else {
        sverase = result.rows;
      
    client.execute(getFirstBreed,[req.params.id], function (err, result){
      if(err){
        res.status(404).send({ msg: err });
      }
      else{
        secondSlicneRase = result.rows;
        var tacneSecondRase = [];
        secondSlicneRase.forEach(function(m) {
          sverase.forEach(function(sm){
            if(sm.id.toString() == m.idfirst.toString())
            {
              tacneSecondRase.push(m);
            }
          });
        });
        console.log("TACNE SECOND RASE:", tacneSecondRase);
    client.execute(getSecondBreed, [req.params.id], function (err, result) {
      if(err){
        res.status(404).send({ msg: err });
      }
      else {
        slicneRase = result.rows;
        console.log("slicneRase:",slicneRase);
        var tacneRase =[];
        slicneRase.forEach(function(m) {
          sverase.forEach(function(sm){
            if(sm.id.toString() == m.idsecond.toString())
            {
              tacneRase.push(m);
            }
          });
        });
        console.log("TACNE RASE", tacneRase);
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
        activitylevell= result.rows[0].activitylevel;
        playfulnesss= result.rows[0].playfulness;
        friendlinesss= result.rows[0].friendliness;
        intelligencee= result.rows[0].intelligence;
        independencee = result.rows[0].independence;

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
            activitylevel: activitylevell,
            playfulness: playfulnesss,
            friendliness: friendlinesss,
            intelligence: intelligencee,
            independence: independencee,
            catteries: tacneodgajivacnice,
            similarBreeds: tacneRase, 
            secondSimilarBreeds: tacneSecondRase
          });
        }
      });
    }
  });
}
});
}
});
}
});
}
});

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
