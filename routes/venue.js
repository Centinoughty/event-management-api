const { createVenue } = require("../controllers/venueController");
const authMiddleware = require("../middlewares/authMiddleware");

const router = require("express").Router();

router.post("/create", authMiddleware, createVenue);

module.exports = router;
