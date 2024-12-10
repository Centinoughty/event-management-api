const mongoose = require("mongoose");

const AttendanceSchema = new mongoose.Schema({
  id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
    required: true,
  },
  isPresent: {
    type: Boolean,
    default: false,
  },
});

const EventSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    date: {
      type: String,
      required: true,
    },
    startTime: {
      type: String,
      required: true,
    },
    endTime: {
      type: String,
      required: true,
    },
    venue: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "venue",
      required: true,
    },
    capacity: {
      type: Number,
      required: 0,
      min: 0,
    },
    organizer: {
      type: mongoose.Schema.ObjectId.ObjectId,
      ref: "user",
      required: true,
    },
    tags: {
      type: [String],
    },
    attendance: [AttendanceSchema],
  },
  { timestamps: true }
);

module.exports = mongoose.model("event", EventSchema);
