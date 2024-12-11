const User = require("../models/userModel");
const Venue = require("../models/venueModel");

module.exports.createVenue = async (req, res) => {
  try {
    const { name, maxCapacity, location } = req.body;
    const userId = req.user._id;

    const user = await User.findById(userId);
    if (!user || (user.control !== "manager" && user.control !== "admin")) {
      return res.status(401).json({ message: "No access" });
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

module.exports.getVenue = async (req, res) => {
  try {
    const { venueId } = req.params;

    const venue = await Venue.findById(venueId).select("-events");
    if (!venue) {
      return res.status(400).json({ message: "Cannot find venue" });
    }

    return res.status(200).json({ message: "Fetched data", venue });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
    console.log(error);
  }
};

module.exports.updateVenue = async (req, res) => {
  try {
    const { name, location, maxCapacity } = req.body;
    const userId = req.user._id;
    const { venueId } = req.params;

    const user = await User.findById(userId);
    if (!user || (user.control !== "manager" && user.control !== "admin")) {
      return res.status(401).json({ message: "No access" });
    }

    const venue = await Venue.findById(venueId);
    if (!venue) {
      return res.status(400).json({ message: "Cannot find user" });
    }

    venue.name = name || venue.name;
    venue.location = location || venue.location;
    venue.capacity = maxCapacity || venue.capacity;

    await venue.save();
    res.status(200).json({ message: "Venue updated" });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
    console.log(error);
  }
};
