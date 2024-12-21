const express = require("express");
const path = require("path");
const fs = require("fs");
const { connectDb } = require("./config/db");
require("dotenv").config();
require("./tasks/cronTask");

const userRoute = require("./routes/user");
const venueRoute = require("./routes/venue");
const eventRoute = require("./routes/event");
const attendanceRoute = require("./routes/attendance");
const feedbackRoute = require("./routes/feedback");
const logAccess = require("./middlewares/logAccess");

const app = express();
const PORT = process.env.PORT;

const logDir = path.join(__dirname, "/logs");
if (!fs.existsSync(logDir)) {
  fs.mkdirSync(logDir);
}

app.use(express.json());
app.use(logAccess);

app.use("/api/user", userRoute);
app.use("/api/venue", venueRoute);
app.use("/api/event", eventRoute);
app.use("/api/attendance", attendanceRoute);
app.use("/api/feedback", feedbackRoute);

connectDb();
app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
