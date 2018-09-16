const db = require("../models");
const jwt = require("jsonwebtoken");

exports.signin = async function(req, res, next) {
  try {
    let user = await db.User.findOne({
      email: req.body.email
    });
    let { id, username, profileImageUrl } = user;
    let isMatch = await user.comparePassword(req.body.password);
    if (isMatch) {
      let token = jwt.sign(
        {
          id,
          username,
          profileImageUrl
        },
        process.env.SECRET_KEY
      );
      return res.status(200).json({
        id,
        username,
        profileImageUrl,
        token
      });
    } else {
      return next({
        status: 400,
        message: "Invalid Email/Password1."
      });
    }
  } catch (e) {
    return next({ status: 400, message: "Invalid Email/Password.1231" });
  }
};

exports.signup = async function(req, res, next) {
  try {
    let user = await db.User.create(req.body);
    let { id, username, profileImageUrl } = user;
    let token = jwt.sign(
      {
        id,
        username,
        profileImageUrl
      },
      process.env.SECRET_KEY
    );
    return res.status(200).json({
      id,
      username,
      profileImageUrl,
      token
    });
  } catch (err) {
    if (err.code == 11000) {
      err.message = "Sorry, that username and/or email is taken";
    }
    return next({
      status: 400,
      message: err.message
    });
  }
};

exports.createRoutine = async function(req, res, next) {
  try {
    let routine = await db.Log.create({
      title: req.body.title,
      notes: req.body.notes
    });
    let foundUser = await db.User.findById(req.params.id);
    founduser.logs.push(routine.id);
    await foundUser.save();
    let foundLog = await db.Log.findById(routine._id).populate("user", {
      username: true,
      profileImageUrl: true
    });
    return res.status(200).json(foundLog);
  } catch (err) {
    return next(err);
  }
};
