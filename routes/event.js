const router = require("express").Router();
const { createEvent, updateEvent } = require("../controllers/eventController");
const authMiddleware = require("../middlewares/authMiddleware");

router.post("/create", authMiddleware, createEvent);
router.put("/update/:eventId", authMiddleware, updateEvent);

module.exports = router;
