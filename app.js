require("dotenv").config();
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const errorHandler = require("./middleware/errHandler");
const itemsRoute = require("./routes/itemsRoutes");
const userRouter = require("./routes/userRouter");
const port = process.env.PORT || 4000;
app.use(express.json());
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE, PATCH");
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization,preflight"
  );
  next();
});

//app.use(errorHandler);
app.use("/", userRouter);
app.use("/", itemsRoute);

mongoose.set("strictQuery", false);
mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    app.listen(port);
  })
  .catch((err) => console.log(err));
