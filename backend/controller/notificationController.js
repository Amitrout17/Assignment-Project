const notification = require("../models/notificationController");

exports.getNotification = async (req, res) => {
  try {
    const messages = await notification.find({
      userId: req.user.id,
    });
    res.status(200).json({
      success: true,
      messages,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};
