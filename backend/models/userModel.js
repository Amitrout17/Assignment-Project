const mongoose = require("mongoose");

const userScheema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "please enter a valid name"],
  },
  email: {
    type: String,
    required: [true, "please Enter a email"],
  },
  password: {
    type: String,
    required: [true, "please Enter a password"],
  },
  phone: {
    type: Number,
    required: [true, "Enter phone Number"],
  },
  organization: {
    type: String,
    required: [true, "Enter phone Number"],
  },
  role: {
    type: String,
    required: [true, "please Enter a valid address"],
  },
  connections: [
    {
      userId: {
        type: mongoose.Schema.ObjectId,
      },
    },
  ],
});

module.exports = mongoose.model("user", userScheema);
