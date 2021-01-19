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
var getAllKittens = "SELECT * FROM pet2pet.kittenInCattery WHERE idcattery = ? ALLOW FILTERING";
var getKittens = "SELECT * FROM pet2pet.kitten";

router.get("/:id", function (req, res, next) {
  var idd, namee, addresss, contactt, descriptionn, workinghourss, imagee;
  //console.log("GET CATTERY");

  var svimacici;
  client.execute(getKittens, function (err, result) {
    if(err) {
      res.status(404).send({ msg: err });
    }
    else 
    {
      svimacici = result.rows;
      //console.log("svimacici", svimacici);
  client.execute(getCatteryById, [req.params.id], function (err, result) {
    if (err) {
      res.status(404).send({ msg: err });
    } 
    else {
      idd = result.rows[0].id;
      namee = result.rows[0].name;
      addresss = result.rows[0].address;
      contactt = result.rows[0].contact;
      descriptionn = result.rows[0].description;
      workinghourss = result.rows[0].workinghours;
      imagee = result.rows[0].image;
      
      client.execute(getAllKittens, [req.params.id], function (err, result) {

          if (err) {
            res.status(404).send({ msg: err });
          } 
          else {
            //console.log("get kittens (cattery):", result.rows);
            var macici = result.rows;
            var tacnimacici = [];
            macici.forEach(function(m) {
              //console.log("mace:", m);
              svimacici.forEach(function(sm){
                //console.log("id - idkitten", sm.id.toString(), m.idkitten.toString());
                if(sm.id.toString() == m.idkitten.toString())
                {
                  tacnimacici.push(m);
                }
              })
            });
            //console.log("tacnimacici", tacnimacici);
            res.render("cattery.ejs", {
              id: idd,
              name: namee,
              address: addresss,
              contact: contactt,
              description: descriptionn,
              workinghours: workinghourss,
              image: imagee,
              kittens: tacnimacici
            });
          }
      });
    }
  });
     
}
});
});

var deleteCattery = "DELETE FROM pet2pet.cattery WHERE id = ?";

router.delete("/:id", function (req, res) {
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
