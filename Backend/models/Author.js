const mongoose = require("mongoose");

const authorSchema = new mongoose.Schema({
  name: String,
  gmail: String,
  function: String,
  city: String,
  postalCode: String,
  date: {    
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Author", authorSchema);
