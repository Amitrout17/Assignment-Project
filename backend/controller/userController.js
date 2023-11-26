const User = require("../models/userModel");
const JWT = require("jsonwebtoken");

exports.regiserUser = async (req, res, next) => {
  try {
    const user = await User.create({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
      phone: req.body.phone,
      organization: req.body.organization,
      role: req.body.role,
    });

    const jwtData = {
      id: user._id,
    };

    const token = JWT.sign(jwtData, process.env.JWT_SECRET);
    res.status(201).cookie("token", token).json({
      sucess: true,
      user,
      JWT_Token: token,
    });
  } catch (error) {
    res.status(400).json({
      sucess: false,
      message: "Some error occured, can not register user",
      error_msg: error,
    });
  }
};

exports.loginUser = async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({
      message: "Plz Enter Email & Password",
    });
  }

  const user = await User.findOne({ email: email });

  if (!user) {
    return res.status(401).json({
      message: "User Does not exist, Please SignUp",
    });
  } else {
    const passwordCheck = req.body.password === user.password ? true : false;

    if (!passwordCheck) {
      return res.status(401).json({ message: "Invalid Password" });
    }

    const jwtData = {
      id: user._id,
    };
    const token = JWT.sign(jwtData, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRE,
    });

    res.status(201).cookie("token", token).json({
      sucess: true,
      user,
      JWT_Token: token,
    });
  }
};

exports.logout = async (req, res, next) => {
  try {
    res.cookie("token", "logout");

    res.status(200).json({
      sucess: true,
      message: "Logged Out sucessfully",
    });
  } catch (error) {
    error;
  }
};

exports.getUserDetails = async (req, res) => {
  try {
    const user = await User.findOne({ _id: req.user.id });
    res.status(200).json({
      sucess: true,
      user,
    });

    res.stat;
  } catch (error) {
    res.status(500).json({
      sucess: false,
      error_msg: error,
    });
  }
};

exports.allUsers = async (req, res) => {
  try {
    const allUsers = await User.find();
    res.status(200).json({
      sucess: true,
      allUsers,
    });
  } catch (error) {
    res.status(500).json({
      sucess: false,
      error_msg: error.message,
    });
  }
};
