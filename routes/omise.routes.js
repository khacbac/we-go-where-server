const express = require("express");
const router = express.Router();
const { getOmiseRequestHeader } = require("../utils/omise.utils");
const fetch = require("node-fetch");
const apiEndpoint = "https://api.omise.co/";

//Get all Customer
router.get("/getCustomers", async (req, res) => {
  try {
    const jsonData = await fetch(`${apiEndpoint}customers`, {
      headers: getOmiseRequestHeader(),
    });
    const data = await jsonData.json();
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
