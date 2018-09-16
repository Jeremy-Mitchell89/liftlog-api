const express = require("express");
const router = express.Router();
const { signup, signin } = require("../helpers/lift");
///api
router.post("/signup", signup);
router.post("/signin", signin);
router.get("/test", function(req, res, next) {
  res.send("test");
});

module.exports = router;
