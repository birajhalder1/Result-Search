const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const MadhyamikSchema = new Schema({
  name: {
    type: String
  },
  rollNumber: {
    type: String
  },
  board: {
    type: String
  },
  institution: {
    type: String
  },
  result: {
    type: String
  }
});
module.exports = Madhyamik = mongoose.model("madhyamik", MadhyamikSchema);
