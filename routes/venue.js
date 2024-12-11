const {
  createVenue,
  updateVenue,
  getVenue,
  getAllVenue,
  deleteVenue,
} = require("../controllers/venueController");
const authMiddleware = require("../middlewares/authMiddleware");

const router = require("express").Router();

router.post("/create", authMiddleware, createVenue);
router.get("/:venueId", getVenue);
router.get("/", getAllVenue);
router.put("/update/:venueId", authMiddleware, updateVenue);
router.delete("/:venueId", authMiddleware, deleteVenue);

module.exports = router;
