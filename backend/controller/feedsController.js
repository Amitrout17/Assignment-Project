const feeds = require("../models/feedModel");
const user = require("../models/userModel");

exports.newFeeds = async (req, res) => {
  try {
    const filePath = `c:/Users/amitr/Desktop/linkedIn/backend/uploads/${req.files[0].filename}`;

    const findUser = await user.findOne({
      _id: req.user._id,
    });
    const newFeed = await feeds.create({
      content: req.body.content,
      userId: req.user._id,
      userName: findUser.name,
      userOrganization: findUser.organization,
      userRole: findUser.role,
      image: `http://localhost:4000/uploads/${req.files[0].filename}`,
      userImage: req.user.image,
    });
    res.status(200).json({
      sucess: true,
      feed: newFeed,
    });
  } catch (error) {
    res.status(500).json({
      error_message: error.message,
    });
  }
};

exports.allFeed = async (req, res) => {
  try {
    const allFeed = await feeds.find();

    res.status(200).json({
      sucess: true,
      feed: allFeed,
    });
  } catch (error) {
    res.status(500).json({
      error_message: error.message,
    });
  }
};
