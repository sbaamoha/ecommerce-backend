const mongoose = require("mongoose");

const itemSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
      minLength: 15,
    },
    price: {
      type: Number,
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
    },
    category: {
      type: String,
    },
    image: [
      {
        type: String,
      },
    ],
  },
  { timestamps: true }
);
module.exports = mongoose.model("Item", itemSchema);
