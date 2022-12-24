require("dotenv").config();
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const errorHandler = require("./middleware/errHandler");
const itemsRoute = require("./routes/itemsRoutes");
const userRouter = require("./routes/userRouter");
const cartRoute = require("./routes/cartRoutes");
const cors = require("cors");
const cookieParser = require("cookie-parser");

const port = process.env.PORT || 4000;

const corsOptions = {
  credential: true,
  origin: process.env.FRONT_END,
};
app.use(cookieParser());
// app.use(cors(corsOptions));
app.use(express.json());
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE, PATCH");
  res.header("Access-Control-Allow-Origin", process.env.FRONT_END);
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With,X-HTTP-Method-Override, Content-Type, Accept"
  );
  res.header("Access-Control-Allow-Credentials", true);
  next();
});

//app.use(errorHandler);
app.use("/", userRouter);
app.use("/", itemsRoute);
app.use("/", cartRoute);

mongoose.set("strictQuery", false);
mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    app.listen(port);
  })
  .catch((err) => console.log(err));
