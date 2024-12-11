const {
  createVenue,
  updateVenue,
  getVenue,
} = require("../controllers/venueController");
const authMiddleware = require("../middlewares/authMiddleware");

const router = require("express").Router();

router.post("/create", authMiddleware, createVenue);
router.get("/:venueId", getVenue);
router.put("/update/:venueId", authMiddleware, updateVenue);

module.exports = router;
