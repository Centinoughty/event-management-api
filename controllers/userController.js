const jwt = require("jsonwebtoken");
const User = require("../models/userModel");
const { generateId } = require("../util/generateId");

module.exports.registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already found" });
    }

    let existingId;
    let id;
    do {
      id = generateId();
      existingId = await User.findOne({ userId: id });
    } while (existingId);

    const newUser = new User({
      userId: id,
      name,
      email,
      password,
    });

    await newUser.save();
    res.status(201).json({ message: "Account created" });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Cannot find user" });
    }

    if (!(await user.isMatchPassword(password))) {
      return res.status(401).json({ message: "Incorrect password" });
    }

    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET);
    res.status(200).json({ message: "Login success", token });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
    console.log(error);
  }
};

module.exports.updateUser = async (req, res) => {
  try {
    const { name } = req.body;
    const userId = req.user._id;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(400).json({ message: "Cannot find user" });
    }

    user.name = name || user.name;
    await user.save();

    res.status(200).json({ message: "Updated user success" });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
    console.log(error);
  }
};

module.exports.updateControl = async (req, res) => {
  try {
    const userId = req.user._id;
    const { email, newControl, id } = req.body;

    const user = await User.findById(userId);
    if (!user || user.control !== "admin") {
      return res.status(403).json({ message: "No access" });
    }

    const secondUser = await User.findOne({ email });
    if (!secondUser) {
      return res.status(400).json({ message: "Cannot find the user" });
    }

    secondUser.control = newControl || secondUser.control;
    secondUser.userId = id || secondUser.userId;
    await secondUser.save();
    res.status(200).json({ message: "User control updated" });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
    console.log(error);
  }
};
