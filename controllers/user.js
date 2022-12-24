const User = require("../models/userModel");
//const Cookies = require("cookies");
const loginUser = async (req, res) => {
  //console.log(req.body);
  try {
    const { email, password } = req.body;
    // console.log(email, password);
    const user = await User.findByCredentials(email, password);
    if (!user) {
      throw new Error("error from loginUser controller");
    }
    const token = await user.generateAuthToken();
    res.cookie("token", token, {
      // httpOnly: true,
      maxAge: 1000 * 60 * 60 * 24,
      sameSite: "none",
      secure: process.env.NODE_ENV !== "development",
    });
    res.cookie("username", user.name, {
      maxAge: 1000 * 60 * 60 * 24,
      sameSite: "none",
      secure: process.env.NODE_ENV !== "development",
    });
    // console.log("ss");
    res.status(201).json({});
  } catch (error) {
    res.status(400).json({ error: error.message });
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
    res.cookie("token", token, {
      // httpOnly: true,
      maxAge: 1000 * 60 * 60 * 24,
      sameSite: "none",
      secure: process.env.NODE_ENV !== "development",
    });
    res.cookie("username", user.name, {
      maxAge: 1000 * 60 * 60 * 24,
      sameSite: "none",
      secure: process.env.NODE_ENV !== "development",
    });
    // console.log("ss");
    res.status(201).json({});
  } catch (error) {
    res.status(400).json(error.message);
  }
};

// const logoutUser = async (req, res) => {
//   try {
//     req.user.tokens = req.user.tokens.filter((token) => {
//       return token.token != req.token;
//     });
//     await req.user.save();
//     const cookies = new Cookies(req, res);
//     cookies.set("Set-Token", "", {
//       httpOnly: true,
//       path: "/",
//       secure: process.env.NODE_ENV !== "development",
//     });

//     res.json({ success: true });
//   } catch (error) {
//     res.status(500).json({ error: "success false" });
//   }
// };
const logoutAll = async (req, res) => {
  try {
    req.user.tokens = [];
    await req.user.save();
    res.json({ success: true });
  } catch (error) {
    res.status({ error: "cant logout" });
  }
};
// const adminLogin = async (req, res) => {
//   if (
//     req.body.email === "sbaamohe@gmail.com" &&
//     req.body.password === "sbaa123456---"
//   ) {
//     const user = await User.findOne({ email: req.body.email });
//     const token = await user.generateAuthToken();

//     res.status(201).json({ message: "welcome admin", token });
//   } else {
//     res.status(401).json({ message: "you are not admin" });
//   }
// };

module.exports = {
  loginUser,
  signUser,
  // logoutUser,
  logoutAll,
};
