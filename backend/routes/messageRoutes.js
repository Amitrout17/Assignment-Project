const express = require("express");
const {
  messageControllerMain,
  getPreviousMessages,
} = require("../controller/messageController");
const isAuthenticated = require("../middleware/auth");

const router = express.Router();

router.route("/message/new").post(isAuthenticated, messageControllerMain);
router.route("/message/get").post(isAuthenticated, getPreviousMessages);

module.exports = router;
