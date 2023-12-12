const express = require("express");
const cors = require("cors");

// controller functions
const { loginUser, signupUser } = require("../controllers/userController");

const router = express.Router();

router.use(cors());

// Login route
router.post("/login", loginUser);

// Signup route
router.post("/signup", signupUser);

module.exports = router;
