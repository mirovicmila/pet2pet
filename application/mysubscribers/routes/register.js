var express = require("express");
var router = express.Router();
var cassandra = require("cassandra-driver");

const users = [];

var client = new cassandra.Client({
  contactPoints: ["127.0.0.1"],
  localDataCenter: "datacenter1",
  keyspace: "people",
});
client.connect(function (err, result) {
  console.log("register: cassandra connected");
});

router.get("/", function (req, res) {
    res.render("register.ejs");
});

router.post('/', async(req, res)=>{
        var upsertUser = 
        "INSERT INTO people.users(username, email, name, password) values (?,?,?,?)";

        client.execute(
            upsertUser,
            [req.body.username, req.body.email, req.body.name, req.body.password],
            function(err, result){
                if(err) {
                    res.status(404).send({msg: err});
                    console.log("Greskaaaaaaaaaa");
                }
                else {
                    console.log("User created!");
                    res.redirect("/login");
                }
            }
         );
        
  });

module.exports = router;
