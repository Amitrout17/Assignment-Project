const express = require("express");
const { newFeeds, allFeed } = require("../controller/feedsController");
const router = express.Router();
const { upload } = require("../config/fileupload");

const isAuthenticated = require("../middleware/auth");
const authrole = require("../middleware/authRole");

router.post("/feed/new", isAuthenticated, authrole, upload, newFeeds);
router.get("/feeds/all", allFeed);

module.exports = router;
