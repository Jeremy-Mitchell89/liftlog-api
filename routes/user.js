const express = require("express");
var app = express();
const router = express.Router({ mergeParams: true });
const db = require("../models");

getUser = async function(req, res, next) {
  try {
    let user = await db.User.findById(req.params.userid);
    return res.status(200).json(user);
  } catch (err) {
    return next(err);
  }
};

router.route("/:userid").get(getUser);

module.exports = router;
