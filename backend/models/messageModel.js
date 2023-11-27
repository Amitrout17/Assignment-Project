const mongoose = require("mongoose");

const messageScheema = new mongoose.Schema({
  senderName: {
    type: String,
    required: [true, "please Enter a valid address"],
  },
  senderId: {
    type: mongoose.Schema.ObjectId,
  },
  recieverName: {
    type: String,
    required: [true, "please Enter a valid address"],
  },
  recieverId: {
    type: mongoose.Schema.ObjectId,
  },
  message: [
    {
      sender: {
        type: String,
      },
      message: {
        type: String,
      },
    },
  ],
});

module.exports = mongoose.model("message", messageScheema);
