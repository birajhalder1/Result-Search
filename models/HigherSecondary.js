const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const HsSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  rollNumber: {
    type: String,
    required: true
  },
  board: {
    type: String,
    required: true
  },
  institution: {
    type: String,
    required: true
  },
  result: {
    type: String,
    required: true
  }
});
module.exports = HigherSecondary = mongoose.model("hs", HsSchema);
