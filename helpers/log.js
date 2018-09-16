const db = require("../models");

exports.createLog = async function(req, res, next) {
  try {
    let log = await db.Log.create({
      title: req.body.title,
      notes: req.body.notes,
      date: req.body.date,
      user: req.params.id
    });
    let foundUser = await db.User.findById(req.params.id);
    foundUser.logs.push(log.id);
    await foundUser.save();
    let foundLog = await db.Log.findById(log._id).populate("user", {
      username: true,
      profileImageUrl: true
    });
    return res.status(200).json(foundLog);
  } catch (err) {
    return next(err);
  }
};

exports.getLog = async function(req, res, next) {
  try {
    let log = await db.Log.findById(req.params.log_id).populate("movements");
    return res.status(200).json(log);
  } catch (err) {
    return next(err);
  }
};
exports.deleteLog = async function(req, res, next) {
  try {
    let foundLog = await db.Log.findById(req.params.log_id);
    await foundLog.remove();
    return res.status(200).json(foundLog);
  } catch (err) {
    return next(err);
  }
};
