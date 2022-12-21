const jwt = require("jsonwebtoken");
const User = require("../models/userModel");
//const Cookies = require("cookies");

const auth = async (req, res, next) => {
  try {
    // const token = req.cookie("token");
    const token = req.header("Authorization").replaceAll('"', "");
    // console.log(token);
    const decode = jwt.verify(token, process.env.JWT_SECRET_KEY);
    const user = await User.findOne({
      _id: decode._id,
    });

    if (!user) {
      throw new Error("no user with this token");
    }
    req.user = user;
    req.token = token;
    res.cookie = token;

    next();
  } catch (error) {
    res.status(401).json({ error: "cant auth" });
  }
};

module.exports = auth;
