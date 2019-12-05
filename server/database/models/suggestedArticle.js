const mongoose = require("mongoose");
const Schema = mongoose.Schema;
mongoose.promise = Promise;

// Define userSchema
const submission = new Schema({
  username: { type: String, unique: false, required: false },
  url: { type: String, unique: false, required: true }
});

const Submission = mongoose.model("Submission", submission);
module.exports = Submission;
