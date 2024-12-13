const User = require("../models/userModel");
const Event = require("../models/eventModel");
const formatDate = require("../util/formatDate");
const formatTime = require("../util/formatTime");
const inTimeRange = require("../util/inTimeRange");
const generateShortCode = require("../util/generateShortCode");
const compareDate = require("../util/compareDate");

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

    const today = formatDate(new Date());
    const currentTime = formatTime(new Date());
    const statusOfEventDate = compareDate(today, event.date);
    const statusOfEvent = inTimeRange(
      currentTime,
      event.startTime,
      event.endTime
    );

    if (
      statusOfEventDate === -1 ||
      (statusOfEventDate === 0 && statusOfEvent === -1)
    ) {
      event.attendance.push({
        id: user._id,
        description: { studentId, name, email, department, year },
      });
    } else {
      return res.status(400).json({ message: "Cannot register for event" });
    }

    await event.save();
    res.status(200).json({ message: "User registered fo event" });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
    console.log(error);
  }
};

module.exports.generateCode = async (req, res) => {
  try {
    const userId = req.user._id;
    const { eventId } = req.params;

    const user = await User.findById(userId);
    if (!user || user.control === "user") {
      return res.status(400).json({ message: "No access" });
    }

    const event = await Event.findById(eventId);
    if (!event) {
      return res.status(400).json({ message: "Cannot find event" });
    }

    if (event.attendanceCode) {
      return res
        .status(200)
        .json({ message: "Fetched code", code: event.attendanceCode });
    }

    const today = formatDate(new Date());
    const currentTime = formatTime(new Date());

    const statusOfEvent = inTimeRange(
      currentTime,
      event.startTime,
      event.endTime
    );
    const statusOfEventDate = compareDate(today, event.date);

    if (statusOfEventDate === -1) {
      return res
        .status(400)
        .json({ message: "Code can be generated once event starts" });
    } else if (statusOfEventDate === 1) {
      return res.status(400).json({ message: "Event ended" });
    } else {
      if (statusOfEvent === -1) {
        return res
          .status(400)
          .json({ message: "Code can be generated once event starts" });
      } else if (statusOfEvent === 1) {
        return res.status(400).json({ message: "Event ended" });
      }
    }

    const code = generateShortCode();
    event.attendanceCode = code;
    await event.save();

    res.status(201).json({ message: "Code created", code });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
    console.log(error);
  }
};

module.exports.markAttendance = async (req, res) => {
  try {
    const { eventId } = req.params;
    const { attendanceCode } = req.body;
    const userId = req.user._id;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(400).json({ message: "Cannot find user" });
    }

    const event = await Event.findById(eventId);
    if (!event) {
      return res.status(400).json({ message: "Cannot find event" });
    }

    const registeredUser = event.attendance.some(
      (attendee) => attendee.id.toString() === userId.toString()
    );
    if (!registeredUser) {
      return res
        .status(400)
        .json({ message: "User haven't registered for th event" });
    }

    const today = formatDate(new Date());
    if (event.date === today) {
      const currentTime = formatTime(new Date());
      const statusOfEvent = inTimeRange(
        currentTime,
        event.startTime,
        event.endTime
      );

      if (statusOfEvent === -1) {
        return res.status(400).json({ message: "The event has not started" });
      } else if (statusOfEvent === 1) {
        return res
          .status(400)
          .json({ message: "The event has already occured" });
      } else {
        if (!event.attendanceCode) {
          return res
            .status(500)
            .json({ message: "The code has not yet created" });
        } else {
          if (attendanceCode !== event.attendanceCode) {
            return res
              .status(400)
              .json({ message: "Incorrect attendance code" });
          } else {
            const updatedEvent = await Event.findOneAndUpdate(
              { _id: eventId, "attendance.id": userId },
              { $set: { "attendance.$.isPresent": true } },
              { new: true }
            );

            if (!updatedEvent) {
              return res
                .status(500)
                .json({ message: "Failed to mark attendance" });
            }

            return res
              .status(200)
              .json({ message: "Attendance marked success" });
          }
        }
      }
    } else {
      const statusOfEventDate = compareDate(today, event.date);

      if (statusOfEventDate === 1) {
        return res
          .status(400)
          .json({ message: "The event has already occured" });
      } else if (statusOfEventDate === -1) {
        return res.status(400).json({ message: "The event has not started" });
      }
    }
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
    console.log(error);
  }
};
