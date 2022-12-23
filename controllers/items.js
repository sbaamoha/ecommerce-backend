const Item = require("../models/itemModel");
// fetch all products
const getAllProducts = async (req, res) => {
  try {
    const items = await Item.find({});
    if (!items) {
      throw new Error("cant fin any item");
    }
    res.status(200).json(items);
  } catch (error) {
    res.status(400).json({ error });
  }
};

// fetch single product
const getProduct = async (req, res) => {
  try {
    // console.log(req.params);
    const item = await Item.findOne({ _id: req.params["id"] });
    if (!item) {
      throw new Error("cant find this item");
    }
    res.status(200).json(item);
  } catch (error) {
    res.status(400).json({ error });
  }
};

// post a product
const postProduct = async (req, res) => {
  try {
    const item = await Item.create(req.body);
    if (!item) {
      throw new Error("cant post this item");
    }
    res.status(201).json({ success: true });
  } catch (error) {
    res.status(400).json({ error });
  }
};
// delete a post
const deleteProduct = async (req, res) => {
  try {
    const item = await Item.findOneAndDelete({ _id: req.params["id"] });
    if (!item) {
      throw new Error("cant delete or find this item");
    }
    res.status(201).json({ success: true });
  } catch (error) {
    res.status(400).json({ error });
  }
};

// edit product
const editProduct = async (req, res) => {
  try {
    const item = await Item.findOneAndUpdate(
      { _id: req.params["id"] },
      req.body
    );
    if (!item) {
      throw new Error("cant edit or find this item");
    }
    res.status(201).json({ success: true });
  } catch (error) {
    res.status(400).json({ error });
  }
};
module.exports = {
  getAllProducts,
  getProduct,
  postProduct,
  deleteProduct,
  editProduct,
};
