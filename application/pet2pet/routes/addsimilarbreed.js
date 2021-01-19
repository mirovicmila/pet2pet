var express = require('express');
var router = express.Router();
var cassandra = require('cassandra-driver');
var client = new cassandra.Client({ contactPoints: ['127.0.0.1'], localDataCenter: 'datacenter1', keyspace: 'pet2pet' });
client.connect(function(err, result) 
{
  console.log('addsimilarbreed: cassandra connected');
});

// similarBreeds: id | idfirst | idsecond | namefirst | namesecond

//var getAllFirst = "SELECT * from pet2pet.breed";
var getAllBreeds = "SELECT * FROM pet2pet.breed";

router.get("/", function (req, res, next) {
    client.execute(getAllBreeds, [], function (err, result) {
    if (err) {
      res.status(404).send({ msg: err });
    } 
    else {
        secondd = result.rows;
        
        client.execute(getAllBreeds, [], function (err, result) {
            if (err) {
              res.status(404).send({ msg: err });
            } 
            else {
                firstt = result.rows;
                console.log("get first breed:", firstt, "get second breed:", secondd);
                
                res.render("addsimilarbreed.ejs", {
                  first: firstt,
                  second: secondd
                });
            }
          });
    }
  });
});
       // similarBreeds: id | idfirst | idsecond | namefirst | namesecond   
/* POST Add CatteryInBreed */
router.post('/', function(req, res){
    id = cassandra.types.uuid();

    var upsertCatteryBreed = "INSERT INTO pet2pet.similarBreeds(id, idfirst, namefirst, idsecond, namesecond) VALUES (?,?,?,?,?)";

    var firstinfo = req.body.firstInfo.split(':');//to je niz od 2 stringa, gde je prvi id, a drugi ime
    console.log("firstinfo:", firstinfo);
    var secondinfo = req.body.secondInfo.split(':');//to je niz od 2 stringa, gde je prvi id, a drugi ime
    console.log("secondinfo:", secondinfo);

    client.execute(upsertCatteryBreed, [id, firstinfo[0], firstinfo[1], secondinfo[0], secondinfo[1]], 
        function(err, result){
            if(err) {
                res.status(404).send({msg: err});
            }
            else{
                console.log('Similar Breed Added!');
                res.redirect('/');
            }
    });
});
module.exports = router;
