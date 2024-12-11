const {
  registerUser,
  loginUser,
  updateUser,
} = require("../controllers/userController");
const authMiddleware = require("../middlewares/authMiddleware");

const router = require("express").Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.put("/update", authMiddleware, updateUser);

module.exports = router;
