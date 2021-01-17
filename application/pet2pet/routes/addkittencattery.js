var express = require('express');
var router = express.Router();
var cassandra = require('cassandra-driver');
var client = new cassandra.Client({ contactPoints: ['127.0.0.1'], localDataCenter: 'datacenter1', keyspace: 'pet2pet' });
client.connect(function(err, result) 
{
  console.log('addkittencattery: cassandra connected');
});

var getAllCatteries = "SELECT * from pet2pet.cattery";
var getAllKittens = "SELECT * FROM pet2pet.kitten";

router.get("/", function (req, res, next) {
    var catteriess, kittenss;
    client.execute(getAllKittens, [], function (err, result) {
    if (err) {
      res.status(404).send({ msg: err });
    } 
    else {
        kittenss = result.rows;
        
        client.execute(getAllCatteries, [], function (err, result) {
            if (err) {
              res.status(404).send({ msg: err });
            } 
            else {
                catteriess = result.rows;
                console.log("get catteries:", catteriess, "get kittens:", kittenss);
                
                res.render("addkittencattery.ejs", {
                  kittens: kittenss,
                  catteries: catteriess
                });
            }
          });
    }
  });
});
          
/* POST Add KittenInCattery */
router.post('/', function(req, res){
    id = cassandra.types.uuid();

    var upsertKittenCattery = "INSERT INTO pet2pet.kittenInCattery(id, idCattery, catteryName, idKitten, kittenName) VALUES (?,?,?,?,?)";

    var catteryinfo = req.body.catteryInfo.split(':');//to je niz od 2 stringa, gde je prvi id, a drugi ime
    console.log("catteryinfo:", catteryinfo);
    var kitteninfo = req.body.kittenInfo.split(':');//to je niz od 2 stringa, gde je prvi id, a drugi ime
    console.log("kitteninfo:", kitteninfo);

    client.execute(upsertKittenCattery, [id, catteryinfo[0], catteryinfo[1], kitteninfo[0], kitteninfo[1]], 
        function(err, result){
            if(err) {
                res.status(404).send({msg: err});
            }
            else{
                console.log('Kitten in Cattery Added!');
                res.redirect('/');
            }
    });
});
module.exports = router;
