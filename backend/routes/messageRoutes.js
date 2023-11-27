const express = require("express");
const { messageControllerMain } = require("../controller/messageController");

const router = express.Router();

router.route("/message/new").post(messageControllerMain);

module.exports = router;
