const mongoose = require("mongoose");
const userSchema = new mongoose.Schema({
  firstName: { type: String, required: true, minlength: 2, maxlength: 10 },
  lastName: { type: String, required: true, minlength: 2, maxlength: 10 },
  email: { type: String, required: true, unique: true, match: /@gmail\.com$/ },
  password: { type: String, required: true, minlength: 8 },
  mobile: { type: String, required: true, length: 10 },
  dos: { type: Date, required: true },
  remember: { type: Boolean, default: false },
});

module.exports = mongoose.model("User", userSchema);