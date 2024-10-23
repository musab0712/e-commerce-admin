const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../../models/User");

// register
const registerUser = async (req, res) => {
  const { userName, email, password } = req.body;

  try {
    const hashPassword = bcrypt.hash(password, 99);
    const newUser = new User({ userName, email, password: hashPassword });

    await newUser.save();
    res.status(200).json({
      success: true,
      message: "User saved successfully.",
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({
      success: false,
      message: "some error occurred",
    });
  }
};

//login
const login = async (req, res) => {
  try {
  } catch (e) {
    console.log(e);
    res.status(500).json({
      success: false,
      message: "some error occurred",
    });
  }
};

//logout

//auth middleware

module.exports = { registerUser };
