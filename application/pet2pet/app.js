var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var cassandra = require("cassandra-driver");
var bodyParser = require('body-parser');

var indexRouter = require("./routes/index");
var admin = require("./routes/admin");
var kitten = require("./routes/kitten");
var editkitten = require("./routes/editkitten");
var addkitten = require("./routes/addkitten");
var breed = require("./routes/breed");
var editbreed = require("./routes/editbreed");
var addbreed = require("./routes/addbreed");
var cattery = require ("./routes/cattery");
var editcattery = require("./routes/editcattery")
var addcattery = require("./routes/addcattery");

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
app.use("/cattery", cattery);
app.use("/addcattery", addcattery);
app.use("/editcattery", editcattery);
app.use("/breed", breed);
app.use("/addbreed", addbreed);
app.use("/editbreed", editbreed);
app.use("/kitten", kitten);
app.use("/addkitten", addkitten);
app.use("/editkitten", editkitten);

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
