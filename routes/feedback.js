const {
  writeFeedback,
  getFeedback,
  getAllFeedback,
} = require("../controllers/feedbackController");
const authMiddleware = require("../middlewares/authMiddleware");

const router = require("express").Router();

router.post("/add/:eventId", authMiddleware, writeFeedback);
router.get("/get-feedback/:eventId", authMiddleware, getFeedback);
router.get("/get-all-feedback/:eventId", getAllFeedback);

module.exports = router;
