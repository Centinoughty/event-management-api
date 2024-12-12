const { markAttendance } = require("../controllers/eventUserController");
const authMiddleware = require("../middlewares/authMiddleware");

const router = require("express").Router();

router.post("/mark-attendance/:eventId", authMiddleware, markAttendance);

module.exports = router;
