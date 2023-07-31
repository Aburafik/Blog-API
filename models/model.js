const mongoose = require("mongoose");

const dataSchema = mongoose.Schema({
  title: {
    required: true,
    type: String,
  },
  description: {
    required: true,
    type: String,
  },

  image: {
    required: true,
    type: String,
  },
});

module.exports = mongoose.model("Data", dataSchema);
