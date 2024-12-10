const { registerUser } = require("../controllers/userController");

const router = require("express").Router();

router.post("/register", registerUser);

module.exports = router;
