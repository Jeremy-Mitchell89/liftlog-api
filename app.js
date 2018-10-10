require("dotenv").config();
var express = require("express");
var app = express();
var cors = require("cors");
var authroutes = require("./routes/auth");
var logRoutes = require("./routes/logs");
var movementroutes = require("./routes/movements");
var userRoutes = require("./routes/user");
var bodyParser = require("body-parser");
var errorHandler = require("./helpers/error");
const { loginRequired, ensureCorrectUser } = require("./middleware/auth");
const db = require("./models");
const PORT = 8081;
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static(__dirname + "/views"));
app.use(express.static(__dirname + "/public"));
app.use("/api", authroutes);
app.use("/api/users/:id/logs", loginRequired, ensureCorrectUser, logRoutes);

app.get("/api/logs", loginRequired, async function(req, res, next) {
  try {
    let logs = await db.Log.find()
      .populate("movements")
      .sort({ createdAt: "desc" })
      .populate("user", {
        username: true,
        profileImageUrl: true
      });
    return res.status(200).json(logs);
  } catch (err) {
    return next(err);
  }
});

app.use("/api/users/:id/logs/:logid/movements", movementroutes);
app.use("/api/users", userRoutes);

app.use(function(req, res, next) {
  let err = new Error("Not Found");
  err.status = 404;
  next(err);
});

app.use(errorHandler);

app.listen(PORT, function() {
  console.log(`App started on ${PORT}`);
});
