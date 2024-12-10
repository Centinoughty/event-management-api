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
