const mongoose = require("mongoose");

const dataSchema = new mongoose.Schema({
  email: {
    required: true,
    type: String,
    unique: true,
  },
  default_card: {
    required: false,
    type: String,
  },
  omiseId: {
    required: true,
    type: String,
  },
  description: {
    required: false,
    type: String,
  },
});

module.exports = mongoose.model("User", dataSchema);
