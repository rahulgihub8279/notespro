const mongoose = require("mongoose");
const UserNotes = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
  },
  title: {
    type: String,
    required: true,
    unique: false,
  },
  tag: {
    type: String,
    default: "General",
  },
  description: {
    type: String,
    required: true,
  },
});
module.exports = mongoose.model("notes", UserNotes);
