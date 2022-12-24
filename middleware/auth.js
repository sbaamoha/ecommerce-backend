const jwt = require("jsonwebtoken");
const User = require("../models/userModel");
//const Cookies = require("cookies");

const auth = async (req, res, next) => {
  // console.log(req.headers.cookie);
  try {
    const list = {};
    const cookies = req.headers.cookie;

    cookies.split(`;`).forEach(function (cookie) {
      let [name, ...rest] = cookie.split(`=`);
      name = name?.trim();
      if (!name) return;
      const value = rest.join(`=`).trim();
      if (!value) return;
      list[name] = decodeURIComponent(value);
    });
    const token = list.token;
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
