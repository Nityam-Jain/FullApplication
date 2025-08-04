const express = require("express");
const router = express.Router();
const { signup, login } = require("../controllers/userController");
const authMiddleware = require("../middleware/authMiddleware");

router.post("/signup", signup);
router.post("/login", login);

router.get("/protected", authMiddleware, (req, res) => {
  res.json({
    message: "You accessed a protected route!",
    user: req.user, // This contains the userId and email from the token
  });
});
module.exports = router;
