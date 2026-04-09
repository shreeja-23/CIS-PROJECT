const mongoose = require("mongoose");

const apiSchema = new mongoose.Schema({
  url: {
    type: String,
    required: true
  },
  method: {
    type: String,
    required: true
  },
  status: Number,
  responseTime: Number,
  responseData: mongoose.Schema.Types.Mixed,
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("ApiHistory", apiSchema);