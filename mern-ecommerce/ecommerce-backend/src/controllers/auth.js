const User = require("../models/user");
const bcrypt = require("bcrypt");
const { generateToken } = require("../common-middleware/index");

exports.signUp = async (req, res) => {
  const { firstName, lastName, email, password } = req.body;
  try {
    var user = await User.findOne({ email: email });
    //email duplication check
    if (user) {
      return res.status(400).json({
        message: "User already registered with this email",
      });
    }
    user = new User({
      email,
      firstName,
      lastName,
      username: Math.random().toString(),
    });
    //encrypt password
    const salt = await bcrypt.genSalt(10); //generate salt with 10
    //save password
    user.hashedPassword = await bcrypt.hash(password, salt); //use salt and password to hash password
    await user.save();

    res.status(201).json({
      message: "User created successfully....!!",
      // type: user.role,
      token: generateToken(user),
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: error.message,
    });
  }
};

exports.signIn = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email: email });
    if (!user) return res.status(400).json({ message: "User not found...!!!" });

    //user found compare the password
    const isMatch = await bcrypt.compare(password, user.hashedPassword);
    if (!isMatch)
      return res.status(400).json({ message: "Password do not match" });

    res.status(200).json({
      message: "You are logged in",
      // type: user.role,
      token: generateToken(user),
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: error.message,
    });
  }
};
