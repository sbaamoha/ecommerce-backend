const User = require("../models/userModel");

const loginUser = async (req, res) => {
  //console.log(req.body);
  try {
    const { email, password } = req.body;
    const user = await User.findByCredentials(email, password);
    if (!user) {
      throw new Error("error from loginUser controller");
    }
    const token = await user.generateAuthToken();
    res.status(201).json({ user, token });
  } catch (error) {
    res.status(400).json(error.message);
  }
};

const signUser = async (req, res) => {
  try {
    const user = new User(req.body);
    if (!user) {
      throw new Error("error");
    }
    await user.save();
    const token = await user.generateAuthToken();
    res.status(201).json({ user, token });
  } catch (error) {
    res.status(400).json(error.message);
  }
};

const logoutUser = async (req, res) => {
  try {
    console.log(req.user.tokens);
    req.user.tokens = req.user.tokens.filter((token) => {
      return token.token !== req.token;
    });
    await req.user.save();
    console.log(req.user.tokens);
    res.json(req.token);
  } catch (error) {
    res.status(500).json({ error });
  }
};
const logoutAll = async (req, res) => {
  req.user.tokens = [];
  await req.user.save();
  res.json(req.user.tokens);
};

module.exports = {
  loginUser,
  signUser,
  logoutUser,
  logoutAll,
};
