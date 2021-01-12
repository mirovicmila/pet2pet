var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var cassandra = require("cassandra-driver");
var bodyParser = require('body-parser');

var jesteadmin = false;
var ulogovanuser = false;

const users = [];
console.log(users);
var indexRouter = require("./routes/index");
var admin = require("./routes/admin");
var login = require("./routes/login");
var register = require("./routes/register");
var user = require("./routes/user");
var adduser = require("./routes/adduser");
var edituser = require("./routes/edituser");
var loggeduser = require("./routes/loggeduser");

var app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/admin", admin);
app.use("/login", login);
app.use("/register", register);
app.use("/user", user);
app.use("/adduser", adduser);
app.use("/edituser", edituser);
app.use("/loggeduser", loggeduser);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
