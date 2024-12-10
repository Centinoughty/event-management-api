const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    control: {
      type: String,
      enum: ["user", "organizer", "manager", "admin"],
      default: "user",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("user", UserSchema);
