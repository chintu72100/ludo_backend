const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    toLower: true,
  },
  password: {
    type: String,
    required: true,
  },
  token: {
    type: String,
  },
  highScore: {
    type: Number,
    default: 0,
  },
});

const User = new mongoose.model("userSchema", UserSchema);

module.exports = { User };
