const Event = require("../models/eventModel");

module.exports = async (
  venueId,
  date,
  startTime,
  endTime,
  excludedEventId = null
) => {
  const events = await Event.find({ venue: venueId, date });

  for (const event of events) {
    if (
      excludedEventId &&
      event._id.toString() === excludedEventId.toString()
    ) {
      continue;
    }

    if (
      (startTime <= event.startTime && endTime >= event.endTime) ||
      (endTime > event.startTime && endTime <= event.endTime) ||
      (startTime >= event.startTime && startTime < event.endTime)
    ) {
      return false;
    }
  }

  return true;
};
