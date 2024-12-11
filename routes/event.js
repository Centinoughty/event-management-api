const router = require("express").Router();
const {
  createEvent,
  updateEvent,
  deleteEvent,
  getEvent,
  getAllEvents,
} = require("../controllers/eventController");
const authMiddleware = require("../middlewares/authMiddleware");

router.post("/create", authMiddleware, createEvent);
router.get("/", authMiddleware, getAllEvents);
router.get("/:eventId", getEvent);
router.put("/update/:eventId", authMiddleware, updateEvent);
router.delete("/:eventId", authMiddleware, deleteEvent);

module.exports = router;
