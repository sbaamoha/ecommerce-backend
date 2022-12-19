const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const userModel = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      lowerCase: true,
      isAdmin: {
        type: Boolean,
        required: true,
        default: false,
      },
    },
    email: {
      type: String,
      lowerCase: true,
      required: true,
      trim: true,
      unique: true,
      // validate(value){
      //   if(!validator.isEmail(email)){
      //     throw new Error('email not validate! enter a validate email')
      //   }
      // }
    },
    password: {
      type: String,
      lowerCase: true,
      minLength: 7,
      trim: true,
    },
    tokens: [
      {
        type: String,
        required: true,
      },
    ],
  },
  {
    timestamps: true,
  }
);

userModel.methods.generateAuthToken = async function () {
  const token = jwt.sign(
    { _id: this._id.toString() },
    process.env.JWT_SECRET_KEY
  );
  this.tokens = [...this.tokens, token];
  await this.save();
  return token;
};

userModel.statics.findByCredentials = async function (email, password) {
  if (!email | !password) {
    throw new Error("enter a password and email");
  }
  const user = await this.findOne({ email });
  if (!user) {
    throw new Error("no user founded");
  }
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    throw new Error("password incorrect");
  }
  return user;
};
userModel.pre("save", async function (next) {
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 8);
  }
  next();
});
module.exports = mongoose.model("User", userModel);
