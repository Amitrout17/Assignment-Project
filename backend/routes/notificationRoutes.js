const express = require("express");
const isAuthenticated = require("../middleware/auth");
const { getNotification } = require("../controller/notificationController");

const router = express.Router();

router.route("/notifications").post(isAuthenticated, getNotification);

module.exports = router;
