const User = require("../models/userModel");
const Event = require("../models/eventModel");

module.exports.registerEvent = async (req, res) => {
  try {
    const { eventId } = req.params;
    const userId = req.user._id;
    const { studentId, name, email, department, year } = req.body;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(400).json({ message: "Cannot find user" });
    }

    const event = await Event.findById(eventId);
    if (!event) {
      return res.status(400).json({ message: "Cannot find event" });
    }

    if (user.email !== email) {
      return res.status(400).json({ message: "No access" });
    }

    const alreadyRegistered = event.attendance.some(
      (atttende) => atttende.id.toString() === userId.toString()
    );
    if (alreadyRegistered) {
      return res.status(409).json({ message: "User already registered" });
    }

    event.attendance.push({
      id: user._id,
      description: { studentId, name, email, department, year },
    });

    await event.save();
    res.status(200).json({ message: "User registered fo event" });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
    console.log(error);
  }
};
