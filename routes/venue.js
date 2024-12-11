const { createVenue, updateVenue } = require("../controllers/venueController");
const authMiddleware = require("../middlewares/authMiddleware");

const router = require("express").Router();

router.post("/create", authMiddleware, createVenue);
router.put("/update/:venueId", authMiddleware, updateVenue);

module.exports = router;
