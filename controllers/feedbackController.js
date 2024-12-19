const User = require("../models/userModel");
const Event = require("../models/eventModel");

module.exports.writeFeedback = async (req, res) => {
  try {
    const { eventId } = req.params;
    const userId = req.user._id;
    const { feedback } = req.body;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(400).json({ message: "Cannot find user" });
    }

    const event = await Event.findById(eventId);
    if (!event) {
      return res.status(400).json({ message: "Cannot find event" });
    }

    const registeredUser = event.attendance.find(
      (attendee) => attendee._id.toString() === userId.toString()
    );

    if (!registeredUser) {
      return res.status(400).json({ message: "Cannot give feedback" });
    }

    if (!registeredUser.isPresent) {
      return res.status(400).json({ message: "Cannot write feedback" });
    }

    if (registeredUser.feedback) {
      return res.status(400).json({ message: "Feedback already given" });
    }

    if (!feedback) {
      return res.status(400).json({ message: "Feedback is required" });
    }

    registeredUser.feedback = feedback;
    await event.save();

    res.status(200).json({ message: "Feedback submitted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports.getFeedback = async (req, res) => {
  try {
    const { eventId } = req.params;
    const userId = req.user._id;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(400).json({ message: "Cannot find user" });
    }

    const event = await Event.findById(eventId);
    if (!event) {
      return res.status(400).json({ message: "Cannot find event" });
    }

    const registeredUser = event.attendance.find(
      (attendee) => attendee._id.toString() === userId.toString()
    );

    if (!registeredUser) {
      return res.status(400).json({ message: "User not registered" });
    }

    if (!registeredUser.feedback) {
      return res.status(400).json({ message: "User not given feedback" });
    }

    res.status(200).json({
      message: "Feedback fetched success",
      feedback: registeredUser.feedback,
    });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports.getAllFeedback = async (req, res) => {
  try {
    const { eventId } = req.params;
    const userId = req.user._id;

    const user = await User.findById(userId);
    if (!user || user.control === "user") {
      return res.status(401).json({ message: "No access" });
    }

    const event = await Event.findById(eventId);
    if (!event) {
      return res.status(400).json({ message: "Cannot find event" });
    }

    const feedbacks = event.attendance
      .filter((attendee) => attendee.feedback)
      .map((attendee) => ({
        userId: attendee.id,
        feedback: attendee.feedback,
      }));

    res
      .status(200)
      .json({ message: "Feedbacks fetched success", feedback: feedbacks });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};
