const messageModel = require("../models/messageModel");

exports.messageControllerMain = async (req, res) => {
  try {
    var isExist = await messageModel.findOne({
      senderId: req.body.senderId,
      recieverId: req.body.recieverId,
    });
    res.status(200).json({
      isExist,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      errorMessage: error.message,
    });
  }
};
