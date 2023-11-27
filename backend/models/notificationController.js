const mongoose = require("mongoose");

const notificationScheema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.ObjectId,
    ref: "user",
    required: true,
  },
  notificatioins: [
    {
      message: {
        type: String,
      },
    },
  ],
});

module.exports = mongoose.model("notification", notificationScheema);
