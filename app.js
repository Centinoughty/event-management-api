const express = require("express");
const { connectDb } = require("./config/db");
require("dotenv").config();

const userRoute = require("./routes/user");
const venueRoute = require("./routes/venue");
const eventRoute = require("./routes/event");

const app = express();
const PORT = process.env.PORT;

app.use(express.json());

app.use("/api/user", userRoute);
app.use("/api/venue", venueRoute);
app.use("/api/event", eventRoute);

connectDb();
app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
