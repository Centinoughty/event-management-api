const User = require("../models/userModel");
const Venue = require("../models/venueModel");

module.exports.createVenue = async (req, res) => {
  try {
    const { name, maxCapacity, location } = req.body;
    const userId = req.user._id;

    const user = await User.findById(userId);
    if (!user || (user.control !== "manager" && user.control !== "admin")) {
      return res.status(400).json({ message: "No access" });
    }

    const existingVenue = await Venue.findOne({ name });
    if (existingVenue) {
      return res.status(409).json({ message: "Venue already exists" });
    }

    const newVenue = new Venue({
      name,
      capacity: maxCapacity,
      location,
    });

    await newVenue.save();
    res.status(201).json({ message: "Created venue" });
  } catch (error) {
    res.status(500).json({ message: "Internl Server Error" });
    console.log(error);
  }
};
