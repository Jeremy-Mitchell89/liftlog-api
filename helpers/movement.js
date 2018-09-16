const db = require("../models");

exports.createMovement = async function(req, res, next) {
  try {
    let movement = await db.Movement.create({
      title: req.body.title,
      reps: req.body.reps,
      weight: req.body.weight,
      log: req.params.logid
    });
    let foundLog = await db.Log.findById(req.params.logid);
    foundLog.movements.push(movement.id);
    await foundLog.save();
    let foundMovement = await db.Movement.findById(movement.id).populate("log");
    return res.status(200).json(foundMovement);
  } catch (err) {
    return next(err);
  }
};

exports.getMovement = async function(req, res, next) {
  try {
    let movement = await db.Movement.findById(req.params.movementid);
    return res.status(200).json(movement);
  } catch (err) {
    return next(err);
  }
};

exports.deleteMovement = async function(req, res, next) {
  try {
    let foundMovement = await db.Movement.findById(req.params.movementid);
    await foundMovement.remove();
    return res.status(200).json(foundMovement);
  } catch (err) {
    return next(err);
  }
};
