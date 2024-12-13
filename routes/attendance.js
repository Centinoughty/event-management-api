const {
  markAttendance,
  generateCode,
  getAttendees,
} = require("../controllers/eventUserController");
const authMiddleware = require("../middlewares/authMiddleware");

const router = require("express").Router();

router.post("/generateCode/:eventId", authMiddleware, generateCode);
router.post("/mark-attendance/:eventId", authMiddleware, markAttendance);
router.get("/get-attendance/:eventId", authMiddleware, getAttendees);

module.exports = router;
