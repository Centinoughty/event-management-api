const router = require("express").Router();
const {
  createEvent,
  updateEvent,
  deleteEvent,
  getEvent,
} = require("../controllers/eventController");
const authMiddleware = require("../middlewares/authMiddleware");

router.post("/create", authMiddleware, createEvent);
router.get("/:eventId", getEvent);
router.put("/update/:eventId", authMiddleware, updateEvent);
router.delete("/:eventId", authMiddleware, deleteEvent);

module.exports = router;
