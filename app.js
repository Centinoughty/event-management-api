const express = require("express");
const { connectDb } = require("./config/db");
require("dotenv").config();

const userRoute = require("./routes/user");

const app = express();
const PORT = process.env.PORT;

app.use(express.json());

app.use("/api/user", userRoute);

connectDb();
app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
