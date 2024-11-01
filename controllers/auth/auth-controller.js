const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../../models/User");

// register
const registerUser = async (req, res) => {
  const { userName, email, password } = req.body;

  try {
    const checkUser = await User.findOne({ email });
    if (checkUser)
      return res.json({
        success: false,
        message: "User Already exists with the same email! Please try again",
      });
    const hashPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ userName, email, password: hashPassword });

    await newUser.save();
    res.status(200).json({
      success: true,
      message: "Registration successfully.",
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
const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const checkUser = await User.findOne({ email });
    if (!checkUser)
      return res.json({
        success: false,
        message: "User doesn't exists! Please register first",
      });
    /* console.log("Stored Hashed Password:", checkUser.password); */
    const pswdMatch = await bcrypt.compare(password, checkUser.password);
    /*  console.log(" Password Match:", checkUser.password); */
    if (!pswdMatch)
      return res.json({
        success: false,
        message: "Password is Incorrect, Please try again",
      });

    const token = jwt.sign(
      {
        id: checkUser._id,
        role: checkUser.role,
        email: checkUser.email,
      },
      "CLIENTS_SECRET_KEY",
      { expiresIn: "2h" }
    );
    res.cookie("token", token, { httpOnly: true, secure: false }).json({
      success: true,
      message: "You`r looged in successfully",
      user: {
        email: checkUser.email,
        role: checkUser.role,
        id: checkUser.id,
        userName: checkUser.userName,
      },
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({
      success: false,
      message: "some error occurred",
    });
  }
};

//logout
const logoutUser = (req, res) => {
  res.clearCookie("token").json({
    success: true,
    message: "Logged out successfully!",
  });
};

//auth middleware
const authMiddleware = async (req, res, next) => {
  const token = req.cookies.token;
  if (!token)
    return res.status(401).json({
      success: false,
      message: "Unauthorised user",
    });

  try {
    // console.log("before decode: ", token);
    const decoded = jwt.verify(token, "CLIENTS_SECRET_KEY");
    // console.log("after decode", decoded);
    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).json({
      success: false,
      message: "Unauthorised user!..",
    });
  }
};

module.exports = { registerUser, loginUser, logoutUser, authMiddleware };
