var express = require('express');
var router = express.Router();
var cassandra = require('cassandra-driver');
var client = new cassandra.Client({ contactPoints: ['127.0.0.1'], localDataCenter: 'datacenter1', keyspace: 'pet2pet' });
client.connect(function(err, result) 
{
  console.log('addcatterybreed: cassandra connected');
});

var getAllCatteries = "SELECT * from pet2pet.cattery";
var getAllBreeds = "SELECT * FROM pet2pet.breed";

router.get("/", function (req, res, next) {
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
                console.log("get catteries:", catteriess, "get breeds:", breedss);
                
                res.render("addcatterybreed.ejs", {
                  breeds: breedss,
                  catteries: catteriess
                });
            }
          });
    }
  });
});
          
/* POST Add CatteryInBreed */
router.post('/', function(req, res){
    id = cassandra.types.uuid();

    var upsertCatteryBreed = "INSERT INTO pet2pet.catteryInBreed(id, idBreed, breedName, idCattery, catteryName) VALUES (?,?,?,?,?)";

    var breedinfo = req.body.breedInfo.split(':');//to je niz od 2 stringa, gde je prvi id, a drugi ime
    console.log("breedinfo:", breedinfo);
    var catteryinfo = req.body.catteryInfo.split(':');//to je niz od 2 stringa, gde je prvi id, a drugi ime
    console.log("catteryinfo:", catteryinfo);

    client.execute(upsertCatteryBreed, [id, breedinfo[0], breedinfo[1], catteryinfo[0], catteryinfo[1]], 
        function(err, result){
            if(err) {
                res.status(404).send({msg: err});
            }
            else{
                console.log('CatteryInBreed Added!');
                res.redirect('/');
            }
    });
});
module.exports = router;
