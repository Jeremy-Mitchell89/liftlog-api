const express = require("express");
var app = express();
const router = express.Router({ mergeParams: true });
const db = require("../models");

getUser = async function(req, res, next) {
  try {
    let user = await db.User.findById(req.params.userid);
    return res.status(200).json({
      frontSquat: user.frontSquat,
      benchPress: user.benchPress,
      deadLift: user.deadLift,
      overheadPress: user.overheadPress,
      username: user.username,
      profileImageUrl: user.profileImageUrl,
      email: user.email,
      id: user.id
    });
  } catch (err) {
    return next(err);
  }
};

updateUser = async function(req, res, next) {
  try {
    let user = await db.User.findByIdAndUpdate(req.params.userid, {
      frontSquat: req.body.frontSquat,
      benchPress: req.body.benchPress,
      deadLift: req.body.deadLift,
      overheadPress: req.body.overheadPress
    });
    return res.status(200).json(user);
  } catch (err) {
    return next(err);
  }
};

router.route("/:userid").get(getUser);
router.route("/:userid").put(updateUser);

module.exports = router;
