const User = require("../models/userModel");
const Venue = require("../models/venueModel");
const Event = require("../models/eventModel");
const isVenueAvailable = require("../util/isVenueAvailable");

module.exports.createEvent = async (req, res) => {
  try {
    const userId = req.user._id;
    let {
      title,
      description,
      date,
      startTime,
      time,
      endTime,
      venue,
      capacity,
      organizer,
      tags,
    } = req.body;

    const user = await User.findById(userId);
    if (!user || user.control === "user") {
      return res.status(401).json({ message: "No access" });
    }

    const existingVenue = await Venue.findOne({ name: venue });
    if (!existingVenue) {
      return res.status(400).json({ message: "Cannot find venue" });
    }

    const organizerDet = await User.findOne({ userId: organizer });
    if (!organizerDet || organizerDet.control === "user") {
      return res.status(400).json({ message: "Cannot find the organizer" });
    }

    startTime = time;
    if (!endTime) {
      const [startHour, startMinute] = startTime.split(":").map(Number);
      let endHour = startHour + 1;
      let endMinute = startMinute;
      if (endHour >= 24) {
        endHour -= 24;
      }

      endTime = `${String(endHour).padStart(2, "0")}:${String(
        endMinute
      ).padStart(2, "0")}`;
    }

    if (!isVenueAvailable(existingVenue._id, date, startTime, endTime)) {
      return res.status(400).json({ message: "Venue already booked" });
    }

    const newEvent = new Event({
      title,
      description,
      date,
      startTime,
      endTime,
      venue: existingVenue._id,
      capacity,
      organizer: organizerDet._id,
      tags,
    });

    await newEvent.save();
    res.status(201).json({ message: "Created event" });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
    console.log(error);
  }
};
