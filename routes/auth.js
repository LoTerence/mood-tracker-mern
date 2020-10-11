const express = require("express");
const router = express.Router();

const { createUser, loginUser } = require("../controllers/auth");

router.post("/", createUser);

// logging in
router.post("/login", loginUser);

// TODO: add a log out user route (maybe can be done in client)

module.exports = router;
