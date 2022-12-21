const express = require("express");
const {
  getItemsInCart,
  addNewItemToCart,
  deleteItemFromCart,
} = require("../controllers/carts");
const cartRoute = express.Router();
const auth = require("../middleware/auth");

// routes
cartRoute.get("/cart", auth, getItemsInCart);
cartRoute.post("/cart", auth, addNewItemToCart);
cartRoute.delete("/cart/:id", auth, deleteItemFromCart);

module.exports = cartRoute;
