const express = require("express");
const {
  loginUser,
  signUser,
  // logoutUser,
  logoutAll,
} = require("../controllers/user");
const auth = require("../middleware/auth");
const router = express.Router();

// router.post("/admin", adminLogin);
router.post("/user/login", loginUser);
// router.post("/user/logout", auth, logoutUser);
router.post("/user/logoutall", auth, logoutAll);
router.post("/user/signup", signUser);

module.exports = router;
