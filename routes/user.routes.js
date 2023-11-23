const express = require("express");

const router = express.Router();
const UserModel = require("../models/user.model");
const { isAuth } = require("../middleware/auth.middleware");

//Post Method
router.post("/post", async (req, res) => {
  const data = new UserModel({
    email: req.body.email,
    omiseId: req.body.omiseId,
    default_card: req.body.default_card,
    description: req.body.description,
  });

  try {
    const savedData = await data.save();
    res.status(200).json(savedData);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

//Get me
router.get("/getMe", isAuth, async (req, res) => {
  try {
    const user = req.user;
    const data = await UserModel.findById(user._id);
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
