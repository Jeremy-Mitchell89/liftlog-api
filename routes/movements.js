const express = require("express");
const router = express.Router({ mergeParams: true });

const {
  createMovement,
  getMovement,
  deleteMovement
} = require("../helpers/movement");

///api/users/:id/logs/:logid/movements
router.route("/").post(createMovement);
router.route("/:movementid").get(getMovement);
router.route("/:movementid").delete(deleteMovement);

module.exports = router;
