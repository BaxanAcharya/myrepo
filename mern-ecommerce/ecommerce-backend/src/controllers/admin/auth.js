const User = require("../../models/user");
const bcrypt = require("bcrypt");
const { generateToken } = require("../../common-middleware");
const { token } = require("morgan");

exports.signUp = async (req, res) => {
  const { firstName, lastName, email, password } = req.body;

  try {
    var user = await User.findOne({ email: email });
    //email duplication check
    if (user) {
      return res.status(400).json({
        message: "Admin already registered with this email...!!!",
      });
    }

    user = new User({
      email,
      firstName,
      lastName,
      username: Math.random().toString(),
      role: "admin",
    });
    //encrypt password
    const salt = await bcrypt.genSalt(10); //generate salt with 10
    //save password
    user.hashedPassword = await bcrypt.hash(password, salt); //use salt and password to hash password

    try {
      await user.save();

      res.status(201).json({
        message: "Admin created successfully....!!",
        // type: user.role,
        token: generateToken(user),
      });
    } catch (error) {
      console.log(error);
      res.status(400).json({
        message: error.message,
      });
    }
  } catch (error) {
    console.log(error);
    res.status(400).json({
      message: error.message,
    });
  }
};

exports.signIn = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email: email });
    if (!user)
      return res.status(400).json({ message: "Admin not found...!!!" });

    //user found compare the password
    const isMatch = await bcrypt.compare(password, user.hashedPassword);
    if (!isMatch)
      return res.status(400).json({ message: "Password do not match...!!!" });
    if (user.role != "admin") {
      return res
        .status(400)
        .json({ message: "You are not admin login faliure...!!!" });
    }
    res.cookie("token", token, { expiresIn: "3h" });
    res.status(200).json({
      message: "You are logged in",
      token: generateToken(user),
      user: {
        firstName: user.firstName,
        lastName: user.lastName,
        fullName: user.firstName + " " + user.lastName,
        email: user.email,
        role: user.role,
        _id: user._id,
      },
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      message: error.message,
    });
  }
};

exports.signOut = (req, res) => {
  try {
    res.clearCookie("token");
    res.status(200).json({
      message: "Signout success..!!!",
    });
  } catch (error) {
    console.log(error);
    res.send(400).json({
      message: error,
    });
  }
};
