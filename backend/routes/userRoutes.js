const express = require("express");
const {
  regiserUser,
  loginUser,
  getUserDetails,
  allUsers,
} = require("../controller/userController");

const router = express.Router();

const isAuthenticated = require("../middleware/auth");

router.route("/register").post(regiserUser);
router.route("/login").post(loginUser);
router.get("/user/details", isAuthenticated, getUserDetails);
router.get("/users/all", allUsers);

module.exports = router;
