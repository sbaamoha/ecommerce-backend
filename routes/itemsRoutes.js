const express = require("express");
const {
  getAllProducts,
  getProduct,
  postProduct,
  deleteProduct,
  editProduct,
} = require("../controllers/items");
const itemsRoute = new express.Router();

itemsRoute.get("/products", getAllProducts);
itemsRoute.get("/products/:id", getProduct);
itemsRoute.post("/products/", postProduct);
itemsRoute.delete("/products/:id", deleteProduct);
itemsRoute.patch("/products/:id", editProduct);

module.exports = itemsRoute;
