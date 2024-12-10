const mongoose = require("mongoose");

const VenueSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    location: {
      type: String,
      required: true,
    },
    capacity: {
      type: Number,
      required: true,
      min: 0,
    },
    events: [{ type: mongoose.Schema.Types.ObjectId, ref: "event" }],
  },
  { timestamps: true }
);

module.exports = mongoose.model("venue", VenueSchema);
