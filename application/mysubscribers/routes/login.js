var express = require("express");
var router = express.Router();
var cassandra = require("cassandra-driver");

jesteadmin = false;
ulogovanuser = false;

var client = new cassandra.Client({
  contactPoints: ["127.0.0.1"],
  localDataCenter: "datacenter1",
  keyspace: "people",
});
client.connect(function (err, result) {
  console.log("login: cassandra connected");
});

var getAllUsers = "SELECT * FROM people.users";
var pronadjenkorisnik=null;
var listausera;
 
router.get("/", function (req, res) {
  pronadjenkorisnik=null;
  client.execute(getAllUsers, [], function (err, result) {
    if (err) {
      res.status(404).send({ msg: err });
    } 
    else 
    {
      listausera = result.rows;
      res.render("login.ejs", {
        users: result.rows, 
        lozinka: "",
        loskorisnik: ""
      });
    }
  });    
});

router.post("/", function (req, res) {
  pronadjenkorisnik=null;
  listausera.forEach(element => {
    if(element.username == req.body.username) {
      pronadjenkorisnik = element;
    }
  });
  console.log("listausera", listausera);
  console.log("pronadjen: ", pronadjenkorisnik);
      if(pronadjenkorisnik!=null)
      {
        if(pronadjenkorisnik.password != req.body.password){
            console.log("pogresna lozinka!");
            res.render("login.ejs", {
              lozinka: "pogresna lozinka!",
              loskorisnik: ""
            });
            //res.redirect("/login");
        }
        else {
          console.log("lozinka je u redu!");
          ulogovanuser = true;
          jesteadmin = false;
          console.log("login-jesteadmin-ulogovanuser: ", jesteadmin, ulogovanuser);
          res.redirect("/loggeduser/"+pronadjenkorisnik.username);
        }
        
      }
      else
      {
        res.render("login.ejs", {
          lozinka: "",
          loskorisnik: "ne postoji korisnik"
        });
      }

});

module.exports = router;
