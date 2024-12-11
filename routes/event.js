const router = require("express").Router();
const { createEvent } = require("../controllers/eventController");
const authMiddleware = require("../middlewares/authMiddleware");

router.post("/create", authMiddleware, createEvent);

module.exports = router;
