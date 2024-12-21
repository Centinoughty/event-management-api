const cron = require("node-cron");
const Event = require("../models/eventModel");
const formatTime = require("../util/formatTime");
const formatDate = require("../util/formatDate");
const compareDate = require("../util/compareDate");
const inTimeRange = require("../util/inTimeRange");

cron.schedule("0 * * * *", async () => {
  console.log("Checking events");

  try {
    const now = new Date();
    const today = formatDate(now);
    const currentTime = formatTime(now);
    const completedEvents = await Event.find({
      isCompleted: { $ne: true },
    });

    for (const event of completedEvents) {
      const { date, startTime, endTime } = event;

      const dateStatus = compareDate(today, date);
      const timeStatus = inTimeRange(currentTime, startTime, endTime);

      if (dateStatus === 1 || (dateStatus === 0 && timeStatus === 1)) {
        event.isCompleted = true;
        await event.save();
      }
    }
  } catch (error) {
    console.log(error);
  }
});
