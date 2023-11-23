const express = require("express");
const router = express.Router();
const { getOmiseRequestHeader } = require("../utils/omise.utils");
const fetch = require("node-fetch");
const UserModel = require("../models/user.model");
const { isAuth } = require("../middleware/auth.middleware");
const apiEndpoint = "https://api.omise.co/";
const vaultEndpoint = "https://vault.omise.co/";

//Get cards
router.get("/getCards", isAuth, async (req, res) => {
  try {
    const user = req.user;
    const jsonData = await fetch(
      `${apiEndpoint}customers/${user.omiseId}/cards`,
      { headers: getOmiseRequestHeader() }
    );
    const data = await jsonData.json();
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// get card by ud
router.get("/getCard/:id", isAuth, async (req, res) => {
  try {
    const user = req.user;
    const jsonData = await fetch(
      `${apiEndpoint}customers/${user.omiseId}/cards/${req.params.id}`,
      { headers: getOmiseRequestHeader() }
    );
    const data = await jsonData.json();
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Create a card
router.post("/createToken", isAuth, async (req, res) => {
  try {
    const user = req.user;
    // create token
    const createTokenJsonData = await fetch(`${vaultEndpoint}tokens`, {
      headers: getOmiseRequestHeader("public"),
      method: "POST",
      cache: "no-cache",
      body: JSON.stringify(req.body),
    });
    const createToken = await createTokenJsonData.json();
    // attach to customer
    const attachCardJsonData = await fetch(
      `${apiEndpoint}customers/${user.omiseId}`,
      {
        headers: getOmiseRequestHeader(),
        method: "PATCH",
        cache: "no-cache",
        body: JSON.stringify({ card: createToken.id }),
      }
    );
    const attachedCard = await attachCardJsonData.json();
    res.json(attachedCard);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
