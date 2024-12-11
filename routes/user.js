const {
  registerUser,
  loginUser,
  updateUser,
  updateControl,
} = require("../controllers/userController");
const authMiddleware = require("../middlewares/authMiddleware");

const router = require("express").Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.put("/update", authMiddleware, updateUser);
router.put("/update-control", authMiddleware, updateControl);

module.exports = router;
