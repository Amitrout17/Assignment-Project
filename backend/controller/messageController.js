const messageModel = require("../models/messageModel");
const notification = require("../models/notificationController");

exports.messageControllerMain = async (req, res) => {
  try {
    var isExist = await messageModel.findOne({
      senderId: req.user._id,
      recieverId: req.body.recieverId,
    });
    if (!isExist) {
      isExist = await messageModel.findOne({
        recieverId: req.user._id,
        senderId: req.body.recieverId,
      });
    }

    if (isExist) {
      const prevMessage = isExist.message;
      const message = {
        sender: req.user.name,
        message: req.body.message,
      };
      const newMessage = [...prevMessage, message];
      isExist.message = newMessage;
      await isExist.save();

      //sending notificaion

      await notification.create({
        userId: req.body.recieverId,
        message: `You have recieved a message from ${req.user.name}`,
      });

      return res.status(200).json({
        success: true,
        isExist,
      });
    } else {
      const newMessage = await messageModel.create({
        senderId: req.user._id,
        recieverId: req.body.recieverId,
        senderName: req.user.name,
        recieverName: req.body.recieverName,
        message: {
          sender: req.user.name,
          message: req.body.message,
        },
      });
      return res.status(200).json({
        success: true,
        newMessage,
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      errorMessage: error.message,
    });
  }
};

exports.getPreviousMessages = async (req, res) => {
  try {
    var prevMessage = await messageModel.findOne({
      senderId: req.user._id,
      recieverId: req.body.recieverId,
    });

    if (!prevMessage) {
      prevMessage = await messageModel.findOne({
        senderId: req.body.recieverId,
        recieverId: req.user._id,
      });
    }

    res.status(200).json({
      success: true,
      prevMessage,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      errorMessage: error.message,
    });
  }
};
