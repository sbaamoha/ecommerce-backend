const Cart = require("../models/cartModel");
const Item = require("../models/itemModel");

// get the cart
const getItemsInCart = async (req, res) => {
  try {
    const cart = await Cart.find({ owner: req.user._id });
    if (!cart) {
      throw new Error("cart is empty");
    }
    res.status(200).json({ cart });
  } catch (error) {
    res.status(200).json({ error });
  }
};

// add new item to cart
const addNewItemToCart = async (req, res) => {
  const owner = req.user._id;
  const { _id, quantity } = req.body;
  try {
    const cart = await Cart.findOne({ owner });
    const item = await Item.findOne({ _id });
    if (!item) {
      throw new Error("no item with this id");
    }
    const price = item.price;
    const title = item.title;
    const image = item.image;
    if (cart) {
      const itemIndex = cart.items.findIndex((item) => item.itemId == _id);
      if (itemIndex !== -1) {
        const product = cart.items[itemIndex];
        product.quantity += quantity;
        product.title = title;
        let bill = cart.items.reduce((a, n) => a + n.quantity * n.price, 0);
        cart.bill = bill;
        // something i think it dosent metter
        cart.items[itemIndex] = product;
        await cart.save();
        res.status(200).json(cart);
      } else {
        cart.items.push({
          ...item,
          itemId: _id,
          quantity,
          image,
          title,
          price: item.price,
        });
        cart.bill = cart.items.reduce((a, n) => a + n.quantity * n.price, 0);
        await cart.save();
        res.status(200).json(cart);
      }
    } else {
      const newCart = await Cart.create({
        owner,
        items: [
          {
            ...item,
            itemId: _id,
            image,
            title,
            price,
            quantity,
          },
        ],
        bill: price * quantity,
      });
      res.status(200).json(newCart);
    }
  } catch (error) {
    res.status(400).json(error.message);
  }
};

// delete and item from cart
const deleteItemFromCart = async (req, res) => {
  const _id = req.params.id;
  try {
    const item = await Item.findOne({ _id });
    // console.log(item);
    const cart = await Cart.findOne({ owner: req.user._id });
    // console.log(cart);
    if (!item || !cart) {
      throw new Error("no item or no cart");
    }
    const itemIndex = cart.items.findIndex(
      (itemCard) => itemCard.itemId === item._id
    );
    if (itemIndex > -1) {
      throw new Error("no item with this id ");
    }
    cart.items.splice(itemIndex, 1);
    cart.bill = cart.items.reduce((a, n) => a + n.quantity * n.price, 0);
    await cart.save();
    res.status(200).json(cart);
  } catch (error) {
    res.status(400).json(error.message);
  }
};
module.exports = { addNewItemToCart, getItemsInCart, deleteItemFromCart };
