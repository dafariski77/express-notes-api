const User = require("../models/User");

const userLogin = async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password)
    return res.status(400).json({
      message: "Invalid Credentials",
    });

  const result = await User.findOne({ username });

  if (!result)
    return res.status(400).json({
      message: "Invalid Credentials",
    });

  const isPasswordCorrect = await result.comparePassword(password);

  if (!isPasswordCorrect)
    return res.status(400).json({
      message: "Invalid Credentials",
    });

  return result;
};

const userRegister = async (req, res) => {
  const { name, username, password, confirmPassword } = req.body;

  if (!confirmPassword)
    return res.status(400).json({ message: "confirmPassword is required!" });

  if (password !== confirmPassword)
    return res.status(400).json({ message: "Invalid Credentials" });

  const result = await User.create({
    name,
    username,
    password,
  });

  return result;
};

module.exports = { userLogin, userRegister };
