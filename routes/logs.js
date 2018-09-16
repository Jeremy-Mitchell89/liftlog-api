const express = require("express");
const router = express.Router({ mergeParams: true });

const { createLog, getLog, deleteLog } = require("../helpers/log");
///api/users/:id/logs...
router.route("/").post(createLog);
router.route("/:log_id").get(getLog);
router.route("/:log_id").delete(deleteLog);

module.exports = router;
