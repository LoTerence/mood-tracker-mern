const express = require("express");
const router = express.Router();

const { createUser, loginUser } = require("../controllers/auth");

router.post("/", createUser);

// logging in
router.post("/login", loginUser);

module.exports = router;
