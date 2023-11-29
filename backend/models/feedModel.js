const mongoose = require("mongoose");

const feedScheema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.ObjectId,
    ref: "user",
    required: true,
  },
  userName: {
    type: String,
  },
  userRole: {
    type: String,
  },
  userOrganization: {
    type: String,
  },
  image: {
    type: String,
  },
  userImage:{
    type:String,
  },
  content: {
    type: String,
    required: [true, "please Add content"],
  },
});

module.exports = mongoose.model("feed", feedScheema);
