const router = require("express").Router();
const {
  createEvent,
  updateEvent,
  deleteEvent,
} = require("../controllers/eventController");
const authMiddleware = require("../middlewares/authMiddleware");

router.post("/create", authMiddleware, createEvent);
router.put("/update/:eventId", authMiddleware, updateEvent);
router.delete("/:eventId", authMiddleware, deleteEvent);

module.exports = router;
