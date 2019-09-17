const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const WbscteSchema = new Schema({
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
module.exports = Wbscte = mongoose.model("wbscte", WbscteSchema);
