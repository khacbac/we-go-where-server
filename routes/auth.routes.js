const express = require("express");
const fetch = require("node-fetch");
const router = express.Router();
const UserModel = require("../models/user.model");
const { generateToken } = require("../utils/auth.utils");
const { getOmiseRequestHeader } = require("../utils/omise.utils");
const apiEndpoint = "https://api.omise.co/";
const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET;
const accessTokenLife = process.env.ACCESS_TOKEN_LIFE;

//create new user
router.post("/login", async (req, res) => {
  const email = req.body.email;
  if (!email) {
    return res.status(400).json({ message: "Missing email!" });
  }
  const findUser = await UserModel.findOne({ email });
  if (findUser) {
    const accessToken = await generateToken(
      { email },
      accessTokenSecret,
      accessTokenLife
    );
    return res.status(200).json({ user: findUser, accessToken });
  }
  const jsonData = await fetch(`${apiEndpoint}customers`, {
    headers: getOmiseRequestHeader(),
    method: "POST",
    cache: "no-cache",
    body: JSON.stringify({ email }),
  });
  const data = await jsonData.json();
  const user = new UserModel({
    email: data.email,
    omiseId: data.id,
    default_card: null,
    description: null,
  });
  const accessToken = await generateToken(
    { email },
    accessTokenSecret,
    accessTokenLife
  );
  await user.save();
  try {
    res.status(200).json({ user, accessToken });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;
