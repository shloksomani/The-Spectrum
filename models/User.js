const mongoose = require("mongoose");

const model_name = "users";

const schmea = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    index: true,
    unique: true
  },
  name: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  date_created: {
    type: Date,
    default: Date.now()
  }
});

module.exports = mongoose.model(model_name, schmea, model_name);
