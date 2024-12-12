const express = require("express");
const { connectDb } = require("./config/db");
require("dotenv").config();

const userRoute = require("./routes/user");
const venueRoute = require("./routes/venue");
const eventRoute = require("./routes/event");
const attendanceRoute = require("./routes/attendance");

const app = express();
const PORT = process.env.PORT;

app.use(express.json());

app.use("/api/user", userRoute);
app.use("/api/venue", venueRoute);
app.use("/api/event", eventRoute);
app.use("/api/attendance", attendanceRoute);

connectDb();
app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
