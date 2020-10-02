const bcrypt = require("bcryptjs"); //hash users password
const jwt = require("jsonwebtoken"); //auth token that signifies user is logged in
const User = require("../models/user");
require("dotenv").config({ path: "../config/config.env" });

// function for signing tokens
const createAccessToken = (username) => {
  return jwt.sign(
    {
      username,
    },
    process.env.JWT_SECRET_KEY,
    {
      expiresIn: "2 days",
    }
  );
};

// @desc create a user
// @route POST /api/auth/
// @access public
exports.createUser = async (req, res) => {
  try {
    const { username, password } = req.body;

    if (password.length < 6) {
      return res.status(500).json({
        success: false,
        error: "Password length must be greater than 6 characters.",
      });
    }

    let newUser = new User({
      username,
      passwordHash: bcrypt.hashSync(password, 10),
      journal: [],
    });

    const data = await newUser.save();

    const token = createAccessToken(newUser.username);

    return res.status(201).json({
      success: true,
      message: "User was successfully registered",
      data,
      token,
    });
  } catch (err) {
    console.log(err);
    if (err.name === "MongoError") {
      return res.status(500).json({
        success: false,
        error: `User ${err.keyValue["username"]} already exists. Try logging in.`,
      });
    } else {
      return res.status(500).json({
        success: false,
        error: "Server Error",
      });
    }
  }
};

// @desc log a user in
// @route POST /api/auth/login
// @access public
exports.loginUser = async (req, res) => {
  try {
    const { username, password } = req.body;

    const user = await User.findOne({ username });

    if (!user) {
      return res.status(500).json({
        success: false,
        error: `No User with that username: ${username}`,
      });
    } else if (!bcrypt.compareSync(password, user.passwordHash)) {
      res.status(500).json({
        success: false,
        error: "Invalid Password",
      });
    }

    const token = createAccessToken(user.username);

    return res.status(201).json({
      success: true,
      message: "User was successfully logged in",
      data: user,
      token,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      success: false,
      error: err,
    });
  }
};
