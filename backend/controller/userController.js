const User = require("../models/userModel");
const JWT = require("jsonwebtoken");

exports.regiserUser = async (req, res, next) => {
  try {
    const filePath = `c:/Users/amitr/Desktop/linkedIn/backend/uploads/${req.files[0].filename}`;
    console.log(filePath);
    const user = await User.create({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
      phone: req.body.phone,
      organization: req.body.organization,
      role: req.body.role,
      image: `http://localhost:4000/uploads/${req.files[0].filename}`,
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

exports.addConnections = async (req, res) => {
  try {
    const user = await User.findOne({
      _id: req.user.id,
    });

    if (req.body.id === req.user.id) {
      return res.status(403).json({
        success: false,
        message: "Already Exist",
      });
    } else {
      const newConnection = {
        userId: req.body.id,
      };

      const oldConnections = user.connections;

      user.connections = [...oldConnections, newConnection];

      await user.save();

      res.status(200).json({
        success: true,
        user,
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      error_msg: error.message,
    });
  }
};

exports.viewConnections = async (req, res) => {
  try {
    const user = await User.findOne({
      _id: req.user.id,
    });

    var connections = user.connections.map((item) => item.userId);

    var connectionDetails = await Promise.all(
      connections.map(async (item) => {
        const data = await User.findOne({
          _id: item,
        });
        return {
          id: data._id,
          name: data.name,
          email: data.email,
          organization: data.organization,
          role: data.role,
        };
      })
    );

    res.status(200).json({
      success: true,
      connectionDetails,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error_msg: error.message,
    });
  }
};

exports.userRecomendation = async (req, res) => {
  try {
    const userId = req.user._id;

    const user = await User.findById(userId).populate("connections.userId");

    const userConnections = user.connections.map(
      (connection) => connection.userId
    );

    const connectionsOfConnections = await User.find({
      _id: { $in: userConnections },
    }).populate("connections.userId");

    const uniqueConnections = connectionsOfConnections.reduce(
      (acc, connectionOfConnection) => {
        connectionOfConnection.connections.forEach((connection) => {
          const connectionId = connection.userId.toString();
          if (
            !userConnections.includes(connectionId) &&
            connectionId !== userId
          ) {
            acc.push(connection.userId);
          }
        });
        return acc;
      },
      []
    );

    const uniqueConnectionsData = await User.find({
      _id: { $in: uniqueConnections, $ne: userId },
    });

    res.json(uniqueConnectionsData);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

